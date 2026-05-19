import * as fs from "fs";
import * as path from "path";
import { paths } from "../config";

export interface FrameworkIdentifiers {
  webComponentTag?: string;
  reactClassName?: string;
  angularSelector?: string;
  // All React export names found in the wrapper for this slug.
  // First entry is the canonical/primary name; the rest are aliases.
  reactClassNames: string[];
}

const WC_COMPONENTS_DIR = "web-components/src/components";
const REACT_LIB_DIR = "react-components/src/lib";
const ANGULAR_LIB_DIR = "angular-components/src/lib/components";

// Map is keyed by FOLDER NAME, which matches the doc slug for the
// vast majority of components. Code-identifiers (tag, React class, selector)
// found inside go into the record's fields. Divergence between folder name
// and the embedded tag (e.g. footer/ folder with goa-app-footer tag) is
// expected. The aliases transform turns those divergences into alias entries.

export function loadFrameworkIdentifiers(): Map<string, FrameworkIdentifiers> {
  const bySlug = new Map<string, FrameworkIdentifiers>();
  const getOrInit = (slug: string): FrameworkIdentifiers => {
    let r = bySlug.get(slug);
    if (!r) {
      r = { reactClassNames: [] };
      bySlug.set(slug, r);
    }
    return r;
  };

  // 1) Web components: walk libs/web-components/src/components/<folder>/<X>.svelte.
  // A folder can host more than one custom element (e.g. temporary-notification/
  // contains both goa-temp-notification and goa-temp-notification-ctrl). Gather
  // every tag so the React-side bridge can resolve aux tags to the parent slug;
  // the canonical webComponentTag stays the first one found.
  const wcRoot = path.join(paths.code.libs, WC_COMPONENTS_DIR);
  const tagToWcFolder = new Map<string, string>();
  if (fs.existsSync(wcRoot)) {
    for (const folder of fs.readdirSync(wcRoot, { withFileTypes: true })) {
      if (!folder.isDirectory()) continue;
      const tags = readWebComponentTags(path.join(wcRoot, folder.name));
      if (tags.length === 0) continue;
      const rec = getOrInit(folder.name);
      rec.webComponentTag = tags[0];
      for (const tag of tags) {
        if (!tagToWcFolder.has(tag)) tagToWcFolder.set(tag, folder.name);
      }
    }
  }

  // 2) React wrappers. Bucket by the IntrinsicElement tag declaration when
  // present (most reliable bridge to the web-component slug); fall back to
  // folder name for files that don't declare one.

  const reactRoot = path.join(paths.code.libs, REACT_LIB_DIR);
  if (fs.existsSync(reactRoot)) {
    for (const folder of fs.readdirSync(reactRoot, { withFileTypes: true })) {
      if (!folder.isDirectory()) continue;
      const folderPath = path.join(reactRoot, folder.name);

      for (const tsxFile of walkFiles(folderPath, ".tsx")) {
        if (tsxFile.endsWith(".spec.tsx") || tsxFile.endsWith(".test.tsx")) continue;
        const raw = fs.readFileSync(tsxFile, "utf8");
        const exports = extractReactExports(raw);
        if (exports.length === 0) continue;

        // Find any IntrinsicElement declarations in this file.
        const intrinsicTags = [...raw.matchAll(/IntrinsicElements\s*\{[\s\S]*?\}/g)]
          .flatMap((m) => [...m[0].matchAll(/"(goa-[a-z0-9-]+)"\s*:/g)])
          .map((m) => m[1]);

        // Determine the target slug: prefer the WC folder linked to the
        // tag (handles textarea/text-area mismatch); otherwise use the
        // React folder name as the slug.
        const targetSlugs = new Set<string>();
        for (const tag of intrinsicTags) {
          const wcFolder = tagToWcFolder.get(tag);
          if (wcFolder) targetSlugs.add(wcFolder);
        }
        if (targetSlugs.size === 0) targetSlugs.add(folder.name);

        for (const slug of targetSlugs) {
          const rec = getOrInit(slug);
          for (const name of exports) {
            if (!rec.reactClassNames.includes(name)) {
              rec.reactClassNames.push(name);
            }
          }
          if (!rec.reactClassName) rec.reactClassName = rec.reactClassNames[0];
        }
      }
    }
  }

  // 3) Angular selectors.
  const angularRoot = path.join(paths.code.libs, ANGULAR_LIB_DIR);
  if (fs.existsSync(angularRoot)) {
    for (const folder of fs.readdirSync(angularRoot, { withFileTypes: true })) {
      if (!folder.isDirectory()) continue;
      const selector = readAngularSelector(path.join(angularRoot, folder.name));
      if (selector) {
        const rec = getOrInit(folder.name);
        rec.angularSelector = selector;
      }
    }
  }

  return bySlug;
}

function readWebComponentTags(folderPath: string): string[] {
  const tags: string[] = [];
  for (const file of fs.readdirSync(folderPath)) {
    if (!file.endsWith(".svelte")) continue;
    if (file.includes(".test.")) continue;
    const raw = fs.readFileSync(path.join(folderPath, file), "utf8");
    // Two customElement forms in this codebase:
    //   <svelte:options customElement="goa-foo" />
    //   <svelte:options customElement={{ tag: "goa-foo", ... }} />
    const block = raw.match(/<svelte:options[\s\S]*?\/>/);
    if (!block) continue;
    const tagMatch = block[0].match(/["'](goa-[a-z0-9-]+)["']/);
    if (tagMatch && !tags.includes(tagMatch[1])) tags.push(tagMatch[1]);
  }
  return tags;
}

function readReactExports(folderPath: string): string[] {
  const names: string[] = [];
  for (const file of walkFiles(folderPath, ".tsx")) {
    if (file.endsWith(".spec.tsx") || file.endsWith(".test.tsx")) continue;
    const raw = fs.readFileSync(file, "utf8");
    for (const n of extractReactExports(raw)) {
      if (!names.includes(n)) names.push(n);
    }
  }
  return names;
}

function readAngularSelector(folderPath: string): string | undefined {
  for (const file of fs.readdirSync(folderPath)) {
    if (!file.endsWith(".ts")) continue;
    if (file.endsWith(".spec.ts") || file.endsWith(".test.ts")) continue;
    const raw = fs.readFileSync(path.join(folderPath, file), "utf8");
    const m = raw.match(/selector\s*:\s*["']goab-([a-z0-9-]+)["']/);
    if (m) return `goab-${m[1]}`;
  }
  return undefined;
}

function walkFiles(dir: string, ext: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full, ext));
    else if (entry.isFile() && entry.name.endsWith(ext)) out.push(full);
  }
  return out;
}

function extractReactExports(src: string): string[] {
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
      const asMatch = trimmed.match(/(?:[A-Za-z0-9_]+)\s+as\s+(Goab[A-Z][A-Za-z0-9]*)/);
      if (asMatch) {
        names.add(asMatch[1]);
        continue;
      }
      const direct = trimmed.match(/^(Goab[A-Z][A-Za-z0-9]*)$/);
      if (direct) names.add(direct[1]);
    }
  }
  return [...names];
}
