import * as fs from "fs";
import * as path from "path";
import { paths } from "../config";
import { loadComponentApis } from "./component-apis";

export interface FrameworkIdentifiers {
  webComponentTag?: string;
  reactClassName?: string;
  angularSelector?: string;
  vueComponentName?: string;
  // All Goab class exports from the React wrapper file. First entry is the
  // canonical/primary name; the rest (rare in practice) ride along.
  reactClassNames: string[];
}

const REACT_LIB_DIR = "react-components/src/lib";
const ANGULAR_LIB_DIR = "angular-components/src/lib/components";

interface ReactWrapperInfo {
  file: string;
  classNames: string[];
}

/**
 * Derives framework identifiers per docs slug:
 *   - canonical Svelte file comes from extract-api's `extractedFrom`
 *     (already resolved via React-wrapper auto-derivation; see extract-api.ts)
 *   - that Svelte file's `<svelte:options customElement>` tag is the truth
 *     for `webComponentTag`
 *   - the React wrapper that declares that tag in its IntrinsicElements
 *     supplies the React class names
 *   - the Angular wrapper with the matching selector (`goab-<tag-stem>`)
 *     supplies the Angular selector
 *
 * Replaces the previous folder-conflation approach where every React/Angular
 * file inside `<folder>/` landed on a single slug derived from the folder
 * name. That caused sibling sub-components (e.g. `GoabMenuAction` next to
 * `GoabMenuButton`, or `GoabTableSortHeader` next to `GoabTable`) to leak
 * their tags/selectors/classes onto the parent slug.
 */
export function loadFrameworkIdentifiers(): Map<string, FrameworkIdentifiers> {
  const bySlug = new Map<string, FrameworkIdentifiers>();
  const apis = loadComponentApis();
  const tagToReact = buildReactWrapperIndex();
  const tagToAngular = buildAngularWrapperIndex();

  for (const [slug, api] of apis) {
    if (!api.extractedFrom) continue;
    const svelteFile = path.join(paths.workspaceRoot, api.extractedFrom);
    const tag = readSvelteCustomElementTag(svelteFile);
    if (!tag) continue;

    const react = tagToReact.get(tag);
    const angularSelector = tagToAngular.get(tag);

    bySlug.set(slug, {
      webComponentTag: tag,
      reactClassName: pickReactClassName(tag, react?.classNames ?? []),
      reactClassNames: react?.classNames ?? [],
      angularSelector,
      vueComponentName: tagToReactClassName(tag),
    });
  }

  return bySlug;
}

function buildReactWrapperIndex(): Map<string, ReactWrapperInfo> {
  const byTag = new Map<string, ReactWrapperInfo>();
  const root = path.join(paths.code.libs, REACT_LIB_DIR);
  if (!fs.existsSync(root)) return byTag;

  for (const tsxFile of walkSourceFiles(root, ".tsx")) {
    const content = fs.readFileSync(tsxFile, "utf8");
    const tags = extractIntrinsicTags(content);
    if (tags.length === 0) continue;
    const classNames = extractGoabComponentExports(content);
    if (classNames.length === 0) continue;
    for (const tag of tags) {
      // First wrapper found wins; siblings on the same tag would be a
      // structural anomaly to flag separately.
      if (!byTag.has(tag)) {
        byTag.set(tag, { file: tsxFile, classNames });
      }
    }
  }

  return byTag;
}

function buildAngularWrapperIndex(): Map<string, string> {
  const byTag = new Map<string, string>();
  const root = path.join(paths.code.libs, ANGULAR_LIB_DIR);
  if (!fs.existsSync(root)) return byTag;

  for (const tsFile of walkSourceFiles(root, ".ts")) {
    const content = fs.readFileSync(tsFile, "utf8");
    const selectorMatch = content.match(/selector\s*:\s*["']goab-([a-z0-9-]+)["']/);
    if (!selectorMatch) continue;
    const stem = selectorMatch[1];
    const selector = `goab-${stem}`;
    // Read the web component tag the template actually renders rather than
    // deriving it from the selector stem. They diverge for wrappers like
    // goab-temporary-notification-ctrl, whose tag is goa-temp-notification-ctrl.
    const tagMatch = content.match(/<(goa-[a-z0-9-]+)/);
    if (!tagMatch) continue;
    const tag = tagMatch[1];
    // One tag can have several wrappers (goa-input <- goab-input and
    // goab-input-number). Prefer the wrapper whose selector stem matches the
    // tag stem; otherwise keep the first seen, which covers the divergent
    // goab-temporary-notification-ctrl -> goa-temp-notification-ctrl case.
    const tagStem = tag.replace(/^goa-/, "");
    if (!byTag.has(tag) || stem === tagStem) {
      byTag.set(tag, selector);
    }
  }

  return byTag;
}

function readSvelteCustomElementTag(svelteFile: string): string | undefined {
  if (!fs.existsSync(svelteFile)) return undefined;
  const content = fs.readFileSync(svelteFile, "utf8");
  // Two `customElement` forms in this codebase:
  //   <svelte:options customElement="goa-foo" />
  //   <svelte:options customElement={{ tag: "goa-foo", ... }} />
  const simple = content.match(/customElement\s*=\s*["'](goa-[a-z0-9-]+)["']/);
  if (simple) return simple[1];
  const object = content.match(/customElement\s*=\s*\{\{\s*tag\s*:\s*["'](goa-[a-z0-9-]+)["']/);
  if (object) return object[1];
  return undefined;
}

function extractIntrinsicTags(src: string): string[] {
  return [...src.matchAll(/IntrinsicElements\s*\{[\s\S]*?\}/g)]
    .flatMap((m) => [...m[0].matchAll(/["'](goa-[a-z0-9-]+)["']\s*:/g)])
    .map((m) => m[1]);
}

function extractGoabComponentExports(src: string): string[] {
  // Goab classes that are components (functions or constants), not types.
  // Filters out *Props/*Detail/*Event type exports.
  const names = new Set<string>();
  for (const m of src.matchAll(/export\s+function\s+(Goab[A-Z][A-Za-z0-9]*)/g)) {
    names.add(m[1]);
  }
  for (const m of src.matchAll(/export\s+const\s+(Goab[A-Z][A-Za-z0-9]*)\s*[:=]/g)) {
    names.add(m[1]);
  }
  for (const block of src.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const part of block[1].split(",")) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      const asMatch = trimmed.match(/[A-Za-z0-9_]+\s+as\s+(Goab[A-Z][A-Za-z0-9]*)/);
      if (asMatch) {
        names.add(asMatch[1]);
        continue;
      }
      const direct = trimmed.match(/^(Goab[A-Z][A-Za-z0-9]*)$/);
      if (direct) names.add(direct[1]);
    }
  }
  return [...names].filter(
    (n) => !n.endsWith("Props") && !n.endsWith("Detail") && !n.endsWith("Event"),
  );
}

/** Canonical React class for a tag: `goa-dropdown-item` -> `GoabDropdownItem`. */
function tagToReactClassName(tag: string): string {
  const pascal = tag
    .replace(/^goa-/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  return `Goab${pascal}`;
}

/**
 * Pick the React class for a tag. A wrapper file can export more than one Goab
 * component (e.g. a deprecated alias declared before the real one), so prefer
 * the class whose name matches the tag and fall back to the first export.
 */
function pickReactClassName(
  tag: string,
  classNames: string[],
): string | undefined {
  if (classNames.length === 0) return undefined;
  const canonical = tagToReactClassName(tag);
  return classNames.includes(canonical) ? canonical : classNames[0];
}

function walkSourceFiles(root: string, ext: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(root)) return out;
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && entry.name.endsWith(ext)) {
        if (entry.name.endsWith(`.spec${ext}`)) continue;
        if (entry.name.endsWith(`.test${ext}`)) continue;
        out.push(full);
      }
    }
  }
  return out;
}
