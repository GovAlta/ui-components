/**
 * Build a redirects map from `aliases` frontmatter on entries in the
 * examples and productTypes content collections.
 *
 * Each alias on an entry becomes a redirect from `/examples/${alias}` to
 * the entry's canonical URL. Both collections route under `/examples/`,
 * so product-type aliases (none today, but supported) also redirect there
 * via the [family] route.
 *
 * Imported from astro.config.mjs at config-load time. Sync fs reads keep
 * the function callable before the content collection pipeline runs.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = join(__dirname, "../..");

const COLLECTION_ROOTS = [
  join(DOCS_ROOT, "src/content/examples"),
  join(DOCS_ROOT, "src/content/productTypes"),
];

/**
 * Minimal YAML frontmatter parser. Mirrors the parser in
 * build-search-index.ts. Only handles the subset our content uses:
 * scalar values and list-of-strings for `aliases`.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const result = {};
  let currentKey = null;
  let currentArray = null;

  for (const line of match[1].split("\n")) {
    const arrayItem = line.match(/^\s+-\s+(.*)/);
    if (arrayItem && currentArray) {
      currentArray.push(arrayItem[1].trim());
      continue;
    }

    const kv = line.match(/^(\w+):\s*(.*)/);
    if (!kv) continue;

    if (currentKey && currentArray) {
      result[currentKey] = currentArray;
    }
    currentKey = kv[1];
    const value = kv[2].trim();
    if (value === "" || value === "|") {
      currentArray = [];
    } else {
      currentArray = null;
      result[currentKey] = value.replace(/^["']|["']$/g, "");
    }
  }

  if (currentKey && currentArray) {
    result[currentKey] = currentArray;
  }
  return result;
}

/**
 * Recursively find every `index.mdx` under a collection root, including
 * nested entries like `examples/workspace/dashboard/index.mdx`.
 */
function findIndexMdx(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (!statSync(path).isDirectory()) continue;
    const indexPath = join(path, "index.mdx");
    try {
      if (statSync(indexPath).isFile()) out.push(indexPath);
    } catch {
      // No index.mdx in this directory; keep recursing.
    }
    out.push(...findIndexMdx(path));
  }
  return out;
}

export function buildAliasRedirects() {
  const redirects = {};

  for (const root of COLLECTION_ROOTS) {
    try {
      statSync(root);
    } catch {
      continue;
    }

    for (const file of findIndexMdx(root)) {
      const fm = parseFrontmatter(readFileSync(file, "utf-8"));
      if (!Array.isArray(fm.aliases) || fm.aliases.length === 0) continue;

      const slug = relative(root, dirname(file));
      const target = `/examples/${slug}`;

      for (const alias of fm.aliases) {
        const from = `/examples/${alias}`;
        if (from === target) continue;
        redirects[from] = target;
      }
    }
  }

  return redirects;
}
