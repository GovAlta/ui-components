#!/usr/bin/env node
/**
 * add-jsdocs.js
 *
 * Reads JSDoc comments from the Svelte source-of-truth components and injects
 * them into the corresponding React (.tsx) and Angular (.ts) wrapper files.
 *
 * Only adds JSDoc where it is missing — safe to run multiple times.
 *
 * Usage:
 *   node scripts/add-jsdocs.js [--dry-run]
 *
 * Options:
 *   --dry-run  Print which files would change without writing to disk
 */
'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Configuration ────────────────────────────────────────────────────────────

const ROOT           = path.resolve(__dirname, '..');
const DRY_RUN        = process.argv.includes('--dry-run');

const SVELTE_DIR      = path.join(ROOT, 'libs/web-components/src/components');
const REACT_DIR       = path.join(ROOT, 'libs/react-components/src/lib');
const ANGULAR_LIB_DIR = path.join(ROOT, 'libs/angular-components/src/lib/components');
const ANGULAR_EXP_DIR = path.join(ROOT, 'libs/angular-components/src/experimental');

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Convert a kebab-case or snake_case string to PascalCase. */
function toPascalCase(str) {
  return str
    .split(/[-_]/)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

/** Recursively walk a directory, returning files that match the predicate. */
function findFiles(dir, predicate) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(full, predicate));
    } else if (predicate(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

// ─── Svelte Prop Parsing ──────────────────────────────────────────────────────

/**
 * Convert the raw default-value expression from Svelte source into the string
 * that should appear after @default in the wrapper JSDoc.
 *
 * Returns null when the value should be omitted (null, undefined, or a complex
 * expression that cannot be represented as a simple literal).
 *
 * @param {string|undefined} expr
 * @returns {string|null}
 */
function extractDefault(expr) {
  if (expr === undefined || expr === null) return null;
  const trimmed = expr.trim().replace(/;$/, '').trim();

  // Explicitly absent / optional
  if (trimmed === 'null' || trimmed === 'undefined') return null;

  // Svelte stores booleans as string attributes ("false"/"true") but wrappers
  // expose them as real booleans — normalise here.
  if (trimmed === '"false"') return 'false';
  if (trimmed === '"true"')  return 'true';

  // String literal (e.g. "primary", "xs", "none", "1")
  if (/^"[^"]*"$/.test(trimmed)) return trimmed;

  // Number literal
  if (/^\d+(\.\d+)?$/.test(trimmed)) return trimmed;

  // Boolean literal
  if (trimmed === 'false' || trimmed === 'true') return trimmed;

  // Empty object / array — common defaults
  if (trimmed === '{}' || trimmed === '[]') return trimmed;

  // Anything else (function call, complex expression, type cast…) — skip.
  return null;
}

/**
 * @typedef {Object} PropInfo
 * @property {string}      description   JSDoc description text (may start with "@deprecated …")
 * @property {string|null} defaultValue  Formatted @default value, or null
 * @property {boolean}     isRequired    True when Svelte JSDoc contained @required
 * @property {boolean}     isDeprecated  True when description begins with @deprecated
 */

/**
 * Parse the public props from a Svelte component file.
 *
 * @param   {string} filePath
 * @returns {Map<string, PropInfo>}  keyed by lower-cased prop name
 */
function parseSvelteProps(filePath) {
  const lines   = fs.readFileSync(filePath, 'utf8').split('\n');
  const props   = new Map();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match any `export let propName` regardless of what follows (:, ?, !, =)
    const exportMatch = line.match(/^\s*export\s+let\s+(\w+)\s*(?:[?!:=])/);
    if (!exportMatch) continue;

    const propName = exportMatch[1];

    // Extract default value: everything after `= ` up to end of line / semicolon
    const defaultMatch = line.match(/=\s*(.+?)(?:\s*;)?\s*$/);
    const defaultValue = defaultMatch ? extractDefault(defaultMatch[1]) : null;

    // Look backwards for a single-line JSDoc comment immediately preceding the
    // `export let` line (blank lines are skipped).
    let jsdocText = null;
    let j = i - 1;
    while (j >= 0 && lines[j].trim() === '') j--;

    if (j >= 0) {
      const prev = lines[j].trim();
      // Svelte always uses /** … */ on a single line for prop comments.
      if (prev.startsWith('/**') && prev.endsWith('*/')) {
        jsdocText = prev;
      }
    }

    if (!jsdocText) continue; // No JSDoc — nothing to propagate

    // Extract comment body (between /** and */)
    const inner = jsdocText
      .replace(/^\/\*\*/, '')
      .replace(/\*\/$/, '')
      .trim();

    if (inner.includes('@internal')) continue; // Private implementation detail — skip

    const isRequired   = inner.includes('@required');
    const isDeprecated = inner.trimStart().startsWith('@deprecated');

    // Build clean description: strip @required tag (it will become a JSDoc tag);
    // leave @deprecated in place because it IS a JSDoc tag itself.
    const description = inner
      .replace(/@required\s*/g, '')
      .trim();

    props.set(propName.toLowerCase(), {
      description,
      defaultValue,
      isRequired,
      isDeprecated,
    });
  }

  return props;
}

// ─── JSDoc Building ───────────────────────────────────────────────────────────

/**
 * Build the JSDoc block to insert immediately before a wrapper prop.
 *
 * Uses a single-line comment when no tags are needed, multi-line otherwise.
 *
 * @param {PropInfo} info
 * @param {string}   indent       Leading whitespace to match the surrounding code
 * @param {boolean}  withRequired Whether to emit a @required tag
 * @returns {string}
 */
function buildJsDoc(info, indent, withRequired) {
  const { description, defaultValue, isRequired } = info;

  const tags = [];
  if (withRequired && isRequired) tags.push('@required');
  if (defaultValue !== null)      tags.push(`@default ${defaultValue}`);

  if (tags.length === 0) {
    return `${indent}/** ${description} */`;
  }

  return [
    `${indent}/**`,
    `${indent} * ${description}`,
    ...tags.map(t => `${indent} * ${t}`),
    `${indent} */`,
  ].join('\n');
}

// ─── Wrapper File Processing ──────────────────────────────────────────────────

/**
 * Process a single wrapper file: locate props that lack a JSDoc comment and
 * inject the corresponding description extracted from the Svelte source.
 *
 * @param {string}                filePath
 * @param {Map<string, PropInfo>} svelteProps
 * @param {'angular'|'react'}     kind
 * @returns {boolean}  true when the file was (or would be) modified
 */
function processWrapperFile(filePath, svelteProps, kind) {
  const original = fs.readFileSync(filePath, 'utf8');
  const lines    = original.split('\n');
  const output   = [];
  let modified   = false;

  // React: only annotate props inside the exported `GoabXxxProps` interface,
  // not inside the internal `WCProps` interface.
  let inPublicInterface = false;
  let interfaceDepth    = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // ── React: track which interface we're inside ──────────────────────────
    if (kind === 'react') {
      if (/^export\s+interface\s+Goab\w+Props/.test(line)) {
        inPublicInterface = true;
        interfaceDepth    = 0;
      }
      if (inPublicInterface) {
        interfaceDepth += (line.match(/\{/g) || []).length;
        interfaceDepth -= (line.match(/\}/g) || []).length;
        if (interfaceDepth <= 0 && output.length > 0) inPublicInterface = false;
      }
    }

    // ── Identify the prop name for this line ──────────────────────────────
    let propName = null;

    if (kind === 'angular') {
      // @Input() propName[?!]: Type  OR  @Input({ … }) propName[?!]: Type
      const m = line.match(/@Input\b[^)]*\)\s+(\w+)[?!]?\s*[=:]/);
      if (m) propName = m[1];
    } else if (kind === 'react' && inPublicInterface) {
      // propName[?]: Type;   or   readonly propName[?]: Type;
      // (must be indented — top-level keyword lines won't be indented)
      const m = line.match(/^\s+(?:readonly\s+)?(\w+)\??\s*:/);
      if (m && !line.trim().startsWith('//')) propName = m[1];
    }

    if (propName) {
      // Check whether the immediately preceding output line is already a JSDoc
      const prev        = output.length > 0 ? output[output.length - 1] : '';
      const prevTrimmed = prev.trim();
      const hasJsDoc    = prevTrimmed.endsWith('*/') || prevTrimmed.startsWith('/**');

      if (!hasJsDoc) {
        const info = svelteProps.get(propName.toLowerCase());
        if (info) {
          const indent = line.match(/^(\s*)/)[1];
          // For `@Input({ required: true })` the decorator already encodes
          // the requirement in TypeScript — no need to duplicate @required.
          const withRequired = kind === 'react' || !line.includes('required: true');
          output.push(buildJsDoc(info, indent, withRequired));
          modified = true;
        }
      }
    }

    output.push(line);
  }

  if (modified) {
    const newContent = output.join('\n');
    if (DRY_RUN) {
      console.log(`[dry-run] Would update: ${path.relative(ROOT, filePath)}`);
    } else {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated: ${path.relative(ROOT, filePath)}`);
    }
  }

  return modified;
}

// ─── Svelte File Discovery ────────────────────────────────────────────────────

/**
 * Given a wrapper file path, locate the corresponding Svelte source file.
 *
 * Strategy:
 *   1. Extract the component directory from the wrapper path.
 *   2. Convert the wrapper file's base name to PascalCase and look for
 *      `{PascalCase}.svelte` inside the matching Svelte component folder.
 *   3. If that doesn't exist, fall back to the single .svelte file in the
 *      folder (when there is exactly one).
 *   4. If there are multiple .svelte files, try the PascalCase of the
 *      directory name itself.
 *
 * @param   {string}      wrapperPath
 * @returns {string|null} Absolute path to the Svelte file, or null
 */
function findSvelteFile(wrapperPath) {
  // Determine which base directory the wrapper lives under
  const baseDir =
    wrapperPath.includes(`${path.sep}experimental${path.sep}`) ||
    wrapperPath.includes('/experimental/')
      ? ANGULAR_EXP_DIR
      : wrapperPath.includes(`${path.sep}react-components${path.sep}`) ||
        wrapperPath.includes('/react-components/')
        ? REACT_DIR
        : ANGULAR_LIB_DIR;

  const rel   = path.relative(baseDir, wrapperPath);
  const parts = rel.split(path.sep);
  if (parts.length < 2) return null;

  const componentDir = parts[0];                                    // e.g. "menu-button"
  const fileName     = path.basename(wrapperPath, path.extname(wrapperPath)); // e.g. "menu-action"

  const svelteDir = path.join(SVELTE_DIR, componentDir);
  if (!fs.existsSync(svelteDir)) return null;

  // 1. Exact PascalCase match: menu-action.ts → MenuAction.svelte
  const pascalName = toPascalCase(fileName);
  const exact      = path.join(svelteDir, `${pascalName}.svelte`);
  if (fs.existsSync(exact)) return exact;

  // 2. Single .svelte file in the directory
  const svFiles = fs.readdirSync(svelteDir).filter(f => f.endsWith('.svelte'));
  if (svFiles.length === 1) return path.join(svelteDir, svFiles[0]);

  // 3. Multiple .svelte files — try the directory's PascalCase name
  const dirPascal = toPascalCase(componentDir);
  const dirMatch  = path.join(svelteDir, `${dirPascal}.svelte`);
  if (fs.existsSync(dirMatch)) return dirMatch;

  return null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function run() {
  if (DRY_RUN) console.log('Running in dry-run mode — no files will be written.\n');

  // Collect all wrapper files
  const isWrapperTs  = n => n.endsWith('.ts')  && !n.endsWith('.spec.ts')  && n !== 'index.ts';
  const isWrapperTsx = n => n.endsWith('.tsx') && !n.endsWith('.spec.tsx') && n !== 'index.tsx';

  const angularFiles = [
    ...findFiles(ANGULAR_LIB_DIR, isWrapperTs),
    ...findFiles(ANGULAR_EXP_DIR, isWrapperTs),
  ].filter(f => !f.endsWith('base.component.ts'));

  const reactFiles = findFiles(REACT_DIR, isWrapperTsx);

  let updatedCount = 0;

  for (const wrapperFile of [...angularFiles, ...reactFiles]) {
    const svelteFile = findSvelteFile(wrapperFile);
    if (!svelteFile) continue;

    const svelteProps = parseSvelteProps(svelteFile);
    if (svelteProps.size === 0) continue;

    const kind    = wrapperFile.endsWith('.tsx') ? 'react' : 'angular';
    const changed = processWrapperFile(wrapperFile, svelteProps, kind);
    if (changed) updatedCount++;
  }

  console.log(`\nDone. ${updatedCount} file(s) ${DRY_RUN ? 'would be ' : ''}updated.`);
}

run();
