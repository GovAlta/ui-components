import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { parse as parseYaml } from "yaml";
import { paths } from "./config";

// `parseYaml` is a strict parser: it throws on malformed input. The loaders'
// own frontmatter parser is deliberately lenient (it skips bad lines so content
// authoring doesn't break), which makes it the wrong tool for validation, so a
// strict parser is used here to confirm emitted frontmatter is real YAML.

// Post-render validator for the generated Markdown bundle. It encodes the
// constraints the bundle must hold, so a regression is caught rather than
// shipped silently: no leaked code placeholders, no raw HTML/MDX outside code
// fences, no gutted (empty) code blocks, column-consistent tables, present
// frontmatter, and component-set parity with the MCP output.
//
// Pure: `verifyBundle()` returns the violations. The CLI entry at the bottom
// prints them and exits non-zero, and `verifyBundle` is exported so the
// generator can call it after writing output.

export interface Violation {
  file: string;
  line?: number;
  message: string;
}

const SENTINEL = "@@CODEMASK@@";
const TAG =
  /<\/?(goa-[a-z]+|[A-Z][A-Za-z0-9]+|div|span|p|h[1-6]|ul|ol|li|table|thead|tbody|tr|td|th|br|img|pre)\b/;
const FENCE = /^\s{0,3}(```|~~~)/;

function walkMarkdown(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkMarkdown(full));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out.sort();
}

// Real (unescaped) column count for a Markdown table row.
function columnCount(row: string): number {
  return row.replace(/\\\|/g, "").split("|").length - 2;
}

function checkFile(file: string, rel: string): Violation[] {
  const v: Violation[] = [];
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split("\n");

  if (text.includes(SENTINEL)) {
    v.push({ file: rel, message: "code placeholder was not restored" });
  }
  if (text.includes("`{`")) {
    v.push({ file: rel, message: "mangled inline template-literal code (`{`)" });
  }

  // Single fence-aware pass: raw-tag leakage outside fences + empty code fences.
  let inFence = false;
  let marker = "";
  let fenceContent = 0;
  let fenceStart = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fm = FENCE.exec(line);
    if (fm) {
      if (!inFence) {
        inFence = true;
        marker = fm[1];
        fenceContent = 0;
        fenceStart = i + 1;
      } else if (line.trim().startsWith(marker)) {
        if (fenceContent === 0) {
          v.push({ file: rel, line: fenceStart, message: "empty code fence (code may have been stripped)" });
        }
        inFence = false;
        marker = "";
      }
      continue;
    }
    if (inFence) {
      if (line.trim()) fenceContent++;
      continue;
    }
    // Ignore inline-backticked tag names like `<th>` — they are legitimate.
    if (TAG.test(line.replace(/`[^`]*`/g, ""))) {
      v.push({ file: rel, line: i + 1, message: `raw tag outside code fence: ${line.trim().slice(0, 60)}` });
    }
  }

  // A fence that never closed: the scan above then treats everything after it as
  // code and checks none of it, and the generator's code mask (which needs a
  // closing fence) would have stripped the contents. Fail rather than ship.
  if (inFence) {
    v.push({ file: rel, line: fenceStart, message: "unterminated code fence" });
  }

  // Table column consistency (escaped-pipe aware), skipping fenced regions.
  inFence = false;
  for (let i = 0; i < lines.length; i++) {
    if (FENCE.test(lines[i])) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const isRow = /^\s*\|.*\|\s*$/.test(lines[i]);
    const nextIsDivider = i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1]);
    if (isRow && nextIsDivider) {
      const header = columnCount(lines[i]);
      let j = i + 2;
      while (j < lines.length && /^\s*\|.*\|\s*$/.test(lines[j])) {
        if (columnCount(lines[j]) !== header) {
          v.push({ file: rel, line: j + 1, message: `table column mismatch (header has ${header})` });
        }
        j++;
      }
    }
  }

  // Frontmatter present, closed, and valid YAML. Index docs intentionally carry
  // none. Shape alone is not enough: a present-but-malformed block (bad quoting,
  // a leading "- ", a duplicate key) parses nowhere downstream, so it must fail
  // here rather than ship.
  if (!rel.endsWith("index.md")) {
    const fm = /^---\n([\s\S]*?)\n---\n/.exec(text);
    if (!fm) {
      v.push({ file: rel, message: "missing or unclosed frontmatter" });
    } else {
      try {
        parseYaml(fm[1], { uniqueKeys: true });
      } catch (e) {
        const msg = e instanceof Error ? e.message.split("\n")[0] : String(e);
        v.push({ file: rel, message: `invalid YAML frontmatter: ${msg}` });
      }
    }
  }

  return v;
}

function sortedIds(dir: string, ext: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((n) => n.endsWith(ext))
    .map((n) => n.slice(0, -ext.length))
    .sort();
}

export function verifyBundle(
  bundleDir: string = paths.output.mdBundle,
  mcpDir: string = paths.output.mcp,
): Violation[] {
  const violations: Violation[] = [];
  for (const file of walkMarkdown(bundleDir)) {
    violations.push(...checkFile(file, path.relative(bundleDir, file)));
  }

  // Component-set parity with the MCP output (the bundle's stated goal). Every
  // framework set must carry the same components the MCP does, so an AI sees the
  // same set whichever framework it loads. The framework dirs mirror the
  // generator's fixed set.
  const mcp = sortedIds(path.join(mcpDir, "components"), ".json");
  if (mcp.length) {
    for (const framework of ["react", "angular", "web-components"]) {
      const bundled = sortedIds(path.join(bundleDir, framework, "components"), ".md");
      if (mcp.join(",") !== bundled.join(",")) {
        violations.push({
          file: `(${framework} component set)`,
          message: `differs from MCP (mcp ${mcp.length}, bundle ${bundled.length})`,
        });
      }
    }
  }

  return violations;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const violations = verifyBundle();
  if (violations.length === 0) {
    process.stdout.write("[verify-bundle] OK: no violations\n");
    process.exit(0);
  }
  process.stderr.write(`[verify-bundle] ${violations.length} violation(s):\n`);
  for (const v of violations) {
    process.stderr.write(`  ${v.file}${v.line ? `:${v.line}` : ""} — ${v.message}\n`);
  }
  process.exit(1);
}
