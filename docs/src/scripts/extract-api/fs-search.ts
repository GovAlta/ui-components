import * as fs from "fs";
import * as path from "path";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findFirstFileByName(root: string, targetName: string): string | null {
  if (!fs.existsSync(root)) return null;
  const stack = [root];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && entry.name === targetName) {
        return fullPath;
      }
    }
  }

  return null;
}

function findFirstFileContaining(
  root: string,
  extensions: string[],
  searchText: string,
): string | null {
  if (!fs.existsSync(root)) return null;
  const stack = [root];
  const searchPattern = new RegExp(
    `(?:<\\s*${escapeRegExp(searchText)}(?=[\\s>/])|["']${escapeRegExp(searchText)}["'])`,
  );

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (
        entry.isFile() &&
        extensions.some((ext) => entry.name.endsWith(ext)) &&
        !entry.name.includes(".spec.")
      ) {
        const content = fs.readFileSync(fullPath, "utf-8");
        if (searchPattern.test(content)) {
          return fullPath;
        }
      }
    }
  }

  return null;
}

function findFirstFileMatchingPattern(
  root: string,
  extensions: string[],
  pattern: RegExp,
): string | null {
  if (!fs.existsSync(root)) return null;
  const stack = [root];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (
        entry.isFile() &&
        extensions.some((ext) => entry.name.endsWith(ext)) &&
        !entry.name.includes(".spec.")
      ) {
        const content = fs.readFileSync(fullPath, "utf-8");
        if (pattern.test(content)) {
          return fullPath;
        }
      }
    }
  }

  return null;
}

export {
  escapeRegExp,
  findFirstFileByName,
  findFirstFileContaining,
  findFirstFileMatchingPattern,
};