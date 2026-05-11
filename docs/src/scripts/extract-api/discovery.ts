import * as fs from "fs";
import * as path from "path";
import { extractTagName } from "./svelte-parsers";

const slotTypeHintsByParentTag = new Map<string, SlotTypeHints>();

const INTERNAL_SLOT_NAMES = new Set(["version"]);

type FrameworkName = "react" | "angular" | "webComponents";

type SlotTypeHints = Partial<Record<FrameworkName, Record<string, string>>>;

interface ComponentManifest {
  hide: boolean;
  show: boolean;
  wrapperAlias: string | null;
  extraEvents: string[];
}

function parseComponentManifest(content: string): ComponentManifest {
  const manifest: ComponentManifest = {
    hide: false,
    show: false,
    wrapperAlias: null,
    extraEvents: [],
  };

  const scriptMatch = content.match(/<script\b[^>]*\blang=["']ts["'][^>]*>([\s\S]*?)<\/script>/);
  if (!scriptMatch) return manifest;

  const scriptBody = scriptMatch[1];
  const firstImportIdx = scriptBody.search(/^\s*import\b/m);
  const preamble = firstImportIdx === -1 ? scriptBody : scriptBody.slice(0, firstImportIdx);

  const docMatch = preamble.match(/\/\*\*([\s\S]*?)\*\//);
  if (!docMatch) return manifest;

  const raw = docMatch[1]
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .join("\n");

  if (/@docsHide\b/.test(raw)) manifest.hide = true;
  if (/@docsShow\b/.test(raw)) manifest.show = true;

  const aliasMatch = raw.match(/@docsWrapperAlias\s+(\S+)/);
  if (aliasMatch) manifest.wrapperAlias = aliasMatch[1];

  for (const match of raw.matchAll(/@docsEvent\s+(\S+)/g)) {
    manifest.extraEvents.push(match[1]);
  }

  return manifest;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function tagNameToGoabType(tagName: string): string {
  return `Goab${tagName
    .replace(/^goa-/, "")
    .split("-")
    .map((part) => capitalize(part))
    .join("")}`;
}

function inferSlotTypeHintsFromWrappers(
  workspaceRoot: string,
  parentTagName: string,
  slotNames: string[],
): SlotTypeHints {
  const cached = slotTypeHintsByParentTag.get(parentTagName);
  if (cached) return cached;

  const hints: SlotTypeHints = {
    react: {},
    angular: {},
    webComponents: {},
  };

  const allowedSlotNames = new Set(slotNames);
  const reactRoot = path.join(workspaceRoot, "libs/react-components/src/lib");

  if (!fs.existsSync(reactRoot)) {
    slotTypeHintsByParentTag.set(parentTagName, hints);
    return hints;
  }

  const stack = [reactRoot];
  const parentTagPrefix = `${parentTagName}-`;
  const tagPattern = /<\s*(goa-[a-z0-9-]+)\b([^>]*)>/gi;

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;

    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith(".tsx") || entry.name.includes(".spec.")) {
        continue;
      }

      const content = fs.readFileSync(fullPath, "utf-8");
      for (const match of content.matchAll(tagPattern)) {
        const childTagName = match[1];
        const attributes = match[2] || "";
        const slotMatch = attributes.match(/\bslot\s*=\s*["']([a-z0-9-]+)["']/i);
        if (!slotMatch) continue;
        const slotName = slotMatch[1];

        if (!childTagName.startsWith(parentTagPrefix)) continue;
        if (!allowedSlotNames.has(slotName)) continue;

        if (!hints.webComponents?.[slotName]) {
          hints.webComponents![slotName] = childTagName;
        }

        const wrapperType = tagNameToGoabType(childTagName);
        if (!hints.react?.[slotName]) {
          hints.react![slotName] = wrapperType;
        }
        if (!hints.angular?.[slotName]) {
          hints.angular![slotName] = wrapperType;
        }
      }
    }
  }

  slotTypeHintsByParentTag.set(parentTagName, hints);
  return hints;
}

function getAllComponentNames(
  uiComponentsPath: string,
  docsComponentContentPath: string,
): string[] {
  const componentNames = new Set<string>();
  const documentedComponentSlugs = new Set(
    fs
      .readdirSync(docsComponentContentPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => entry.name.replace(/\.mdx$/, "")),
  );

  const stack = [uiComponentsPath];

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
        entry.name.endsWith(".svelte") &&
        !entry.name.includes(".test.")
      ) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const slug = toKebabCase(path.basename(entry.name, ".svelte"));
        if (!extractTagName(content)) continue;

        const manifest = parseComponentManifest(content);
        if (manifest.hide) continue;

        if (documentedComponentSlugs.has(slug) || manifest.show) {
          componentNames.add(slug);
        }
      }
    }
  }

  return Array.from(componentNames).sort((a, b) => a.localeCompare(b));
}

export {
  getAllComponentNames,
  inferSlotTypeHintsFromWrappers,
  INTERNAL_SLOT_NAMES,
  parseComponentManifest,
  toKebabCase,
};

export type { SlotTypeHints };