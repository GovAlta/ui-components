// Minimal YAML-frontmatter parser tuned for the shapes used in this repo's
// content collections: scalars, arrays of strings, single-level nested
// objects, inline `[a, b]` arrays. Recursive descent: easier to reason about
// than the stack-based approach for nested objects.

export interface ParsedFrontmatter {
  data: Record<string, unknown>;
  body: string;
}

export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const lines = raw.split("\n");
  if (lines[0] !== "---") return { data: {}, body: raw };

  let endIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") {
      endIdx = i;
      break;
    }
  }
  if (endIdx === -1) return { data: {}, body: raw };

  const yamlLines = lines.slice(1, endIdx);
  const body = lines.slice(endIdx + 1).join("\n");
  const [data] = parseObject(yamlLines, 0, 0);
  return { data, body };
}

function leadingSpaces(line: string): number {
  return line.length - line.trimStart().length;
}

function isBlankOrComment(line: string | undefined): boolean {
  if (line === undefined) return true;
  const trimmed = line.trim();
  return trimmed === "" || trimmed.startsWith("#");
}

function nextContentLine(lines: string[], startIdx: number): number {
  let i = startIdx;
  while (i < lines.length && isBlankOrComment(lines[i])) i++;
  return i;
}

function parseObject(
  lines: string[],
  startIdx: number,
  expectedIndent: number,
): [Record<string, unknown>, number] {
  const obj: Record<string, unknown> = {};
  let i = startIdx;

  while (i < lines.length) {
    if (isBlankOrComment(lines[i])) {
      i++;
      continue;
    }
    const indent = leadingSpaces(lines[i]);
    if (indent < expectedIndent) break;
    if (indent > expectedIndent) {
      // Unexpected deeper indent at this scope. Skip defensively.
      i++;
      continue;
    }

    const trimmed = lines[i].trimStart();
    // Top-level array item shouldn't appear here (parseArray handles those).
    if (trimmed.startsWith("- ") || trimmed === "-") break;

    const colon = trimmed.indexOf(":");
    if (colon === -1) {
      i++;
      continue;
    }
    const key = trimmed.slice(0, colon).trim();
    const valueText = trimmed.slice(colon + 1).trim();

    if (valueText === "") {
      // Open scope: peek at next content line to decide array vs object.
      const nextIdx = nextContentLine(lines, i + 1);
      if (nextIdx >= lines.length) {
        i++;
        continue;
      }
      const nextIndent = leadingSpaces(lines[nextIdx]);
      if (nextIndent <= expectedIndent) {
        // Empty scope.
        i++;
        continue;
      }
      const nextTrimmed = lines[nextIdx].trimStart();
      if (nextTrimmed.startsWith("- ") || nextTrimmed === "-") {
        const [arr, consumed] = parseArray(lines, nextIdx, nextIndent);
        obj[key] = arr;
        i = consumed;
      } else {
        const [sub, consumed] = parseObject(lines, nextIdx, nextIndent);
        obj[key] = sub;
        i = consumed;
      }
    } else if (/^[|>][+-]?$/.test(valueText)) {
      // YAML block scalar: `|` keeps newlines, `>` folds them into spaces.
      const [text, consumed] = parseBlockScalar(
        lines,
        i + 1,
        expectedIndent,
        valueText[0] as "|" | ">",
      );
      obj[key] = text;
      i = consumed;
    } else if (valueText.startsWith("[") && valueText.endsWith("]")) {
      obj[key] = parseInlineArray(valueText);
      i++;
    } else {
      obj[key] = parseScalar(valueText);
      i++;
    }
  }

  return [obj, i];
}

function parseArray(
  lines: string[],
  startIdx: number,
  expectedIndent: number,
): [unknown[], number] {
  const arr: unknown[] = [];
  let i = startIdx;

  while (i < lines.length) {
    if (isBlankOrComment(lines[i])) {
      i++;
      continue;
    }
    const indent = leadingSpaces(lines[i]);
    if (indent < expectedIndent) break;
    if (indent > expectedIndent) {
      // Deeper than array item indent. Shouldn't happen for our shapes; skip.
      i++;
      continue;
    }
    const trimmed = lines[i].trimStart();
    if (!trimmed.startsWith("- ") && trimmed !== "-") break;

    const valueText = trimmed === "-" ? "" : trimmed.slice(2).trim();
    arr.push(parseScalar(valueText));
    i++;
  }

  return [arr, i];
}

function parseInlineArray(text: string): unknown[] {
  const inner = text.slice(1, -1).trim();
  if (!inner) return [];
  return inner.split(",").map((s) => parseScalar(s.trim()));
}

function parseBlockScalar(
  lines: string[],
  startIdx: number,
  parentIndent: number,
  style: "|" | ">",
): [string, number] {
  const collected: string[] = [];
  let blockIndent: number | null = null;
  let i = startIdx;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      collected.push("");
      i++;
      continue;
    }
    const indent = leadingSpaces(line);
    if (indent <= parentIndent) break;
    if (blockIndent === null) blockIndent = indent;
    collected.push(line.slice(blockIndent));
    i++;
  }

  // Clip chomping (YAML default): drop trailing blank lines.
  while (collected.length > 0 && collected[collected.length - 1] === "") {
    collected.pop();
  }

  const text =
    style === ">"
      ? collected.join(" ").replace(/\s+/g, " ").trim()
      : collected.join("\n");
  return [text, i];
}

function parseScalar(text: string): unknown {
  if (text === "") return "";
  if (text === "true") return true;
  if (text === "false") return false;
  if (text === "null" || text === "~") return null;
  if (/^-?\d+(\.\d+)?$/.test(text)) return Number(text);
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    return text.slice(1, -1);
  }
  return text;
}
