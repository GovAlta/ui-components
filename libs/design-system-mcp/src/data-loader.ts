/**
 * GoA Design System Data Loader
 *
 * Loads the generator's flat collection output:
 *   data/components/
 *   data/examples/
 *   data/guidance/
 *   data/foundations/
 *   data/get-started/
 *
 * The ui-components content-generators pipeline produces this shape from the
 * docs site. Each JSON file carries an explicit `id` field (canonical, can
 * contain "/" for nested ids); the filename is a flattened version of that id.
 */

import { existsSync } from 'fs';
import { readFile, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  InvertedIndex,
  IndexedItem,
  SearchCandidate,
  createSearchableText,
  extractTags,
} from './inverted-index';

/**
 * Resolve the data directory.
 *
 * Probes a handful of locations relative to the running entry point and
 * returns the first one that contains a `components/` subfolder. Handles
 * both production layouts (compiled `main.js` sitting next to `data/`) and
 * dev / script layouts (e.g. `npx tsx` on a script, where the entry point is
 * the script itself and `data/` is one level up). The npm bin is a symlink,
 * so the module's own folder is probed as well: `import.meta.url` resolves to
 * the real install location where `process.argv[1]` does not.
 *
 * Set `GOA_MCP_DATA_DIR` to override entirely.
 */
const moduleDir = dirname(fileURLToPath(import.meta.url));

function resolveDataDir(): string {
  if (process.env['GOA_MCP_DATA_DIR']) {
    return process.env['GOA_MCP_DATA_DIR'];
  }

  const candidates: string[] = [];
  const entry = process.argv[1];
  if (entry) {
    const mainDir = dirname(entry);
    // dist/main.js shim sits next to data/.
    candidates.push(join(mainDir, 'data'));
    // scripts/<name>.ts is one level under data/'s sibling.
    candidates.push(join(mainDir, '..', 'data'));
  }
  // Bundled main.js run through the npm bin: argv[1] is the .bin symlink, not
  // the real file, so probe beside this module too (import.meta.url is real).
  candidates.push(join(moduleDir, 'data'));
  // src/data-loader.ts → ../data when imported directly during dev.
  candidates.push(join(moduleDir, '..', 'data'));

  for (const candidate of candidates) {
    if (existsSync(join(candidate, 'components'))) return candidate;
  }
  // No probe matched; return the first guess so the caller's load attempt
  // surfaces a clear ENOENT instead of silently loading nothing.
  return candidates[0] ?? join(moduleDir, '..', 'data');
}

export interface SearchResult {
  id: string;
  collection: string;
  name?: string;
  summary?: string;
  preview?: string;
  score: number;
  aliases: string[];
  status?: string;
  size?: string;
  productType?: string;
  internal?: boolean;
  subcomponent?: boolean;
}

export interface SearchPage {
  /** Every match after filtering, before the page is cut to maxResults. */
  total: number;
  results: SearchResult[];
}

export interface SearchOptions {
  collection?: string;
  size?: string;
  productType?: string;
  framework?: string;
  status?: string;
  component?: string;
  maxResults?: number;
}

const COLLECTION_TO_TYPE: Record<string, string> = {
  components: 'component',
  examples: 'example',
  guidance: 'guidance',
  foundations: 'foundation',
  'get-started': 'get-started',
  productTypes: 'productType',
};

/** The field that holds a component's name in each framework. */
const FRAMEWORK_NAME_FIELD: Record<string, string> = {
  react: 'reactClassName',
  angular: 'angularSelector',
  'web-components': 'webComponentTag',
};

/**
 * A component comes in a framework when it has a name there. An example says
 * which frameworks it comes in; one with no list is unknown, not unsupported,
 * because the generator records only what it can see. Nothing else is tied to
 * a framework.
 */
function supportsFramework(item: IndexedItem, framework: string): boolean {
  if (item.type === 'component') {
    return Boolean(item.data[FRAMEWORK_NAME_FIELD[framework]]);
  }
  if (item.type !== 'example') return false;
  const frameworks = item.data.frameworks;
  return !Array.isArray(frameworks) || frameworks.includes(framework);
}

export class DataLoader {
  private index = new InvertedIndex();
  private aliasMap = new Map<string, string>(); // lowercase alias -> canonical id
  private examplesByComponent = new Map<string, string[]>(); // canonical component id -> example ids
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    const startTime = performance.now();
    process.stderr.write(`Loading GoA Design System data...\n`);

    const dataDir = resolveDataDir();

    await this.loadFolder(join(dataDir, 'components'), 'component');
    await this.loadFolder(join(dataDir, 'examples'), 'example');
    await this.loadFolder(join(dataDir, 'guidance'), 'guidance');
    await this.loadFolder(join(dataDir, 'foundations'), 'foundation');
    await this.loadFolder(join(dataDir, 'get-started'), 'get-started');
    await this.loadFolder(join(dataDir, 'productTypes'), 'productType');

    this.buildComponentExampleIndex();

    this.initialized = true;

    const stats = this.index.getStats();
    const elapsed = performance.now() - startTime;
    process.stderr.write(
      `Loaded ${stats.totalItems} items in ${elapsed.toFixed(0)}ms\n`,
    );
  }

  /**
   * Search across all data
   */
  async search(
    query: string,
    options: SearchOptions = {},
  ): Promise<SearchPage> {
    const {
      collection,
      size,
      productType,
      framework,
      status,
      component,
      maxResults = 10,
    } = options;

    // Rank every match, filter, then take the page. Cutting the ranking
    // before filtering left filtered searches short or empty whenever the
    // wanted records ranked below the cut, and the index scores every match
    // anyway. An empty query lists everything the filters match, by id.
    const candidates: SearchCandidate[] = query.trim()
      ? this.index.search(query, Infinity)
      : this.index
          .getAllItems()
          .sort((a, b) => a.id.localeCompare(b.id))
          .map(
            (item): SearchCandidate => ({
              item,
              matchCount: 0,
              matchTypes: new Set(),
            }),
          );

    let filtered = candidates;
    if (collection) {
      const targetType = COLLECTION_TO_TYPE[collection];
      if (targetType) {
        filtered = candidates.filter((c) => c.item.type === targetType);
      } else {
        // Collection name not recognized — return empty rather than mixed.
        filtered = [];
      }
    }

    if (size) filtered = filtered.filter((c) => c.item.data.size === size);
    if (productType) {
      filtered = filtered.filter(
        (c) => c.item.data.productType === productType,
      );
    }
    if (framework) {
      filtered = filtered.filter((c) => supportsFramework(c.item, framework));
    }
    if (status) {
      filtered = filtered.filter((c) => c.item.data.status === status);
    }
    if (component) {
      filtered = filtered.filter((c) =>
        recordReferencesComponent(c.item, component, (raw) =>
          this.normalizeComponentId(raw),
        ),
      );
    }

    const typeToCollection: Record<string, string> = {
      component: 'components',
      example: 'examples',
      guidance: 'guidance',
      foundation: 'foundations',
      'get-started': 'get-started',
      productType: 'productTypes',
    };

    const results = filtered.slice(0, maxResults).map((candidate) => {
      const data = candidate.item.data;
      return {
        id: candidate.item.id,
        collection:
          typeToCollection[candidate.item.type] || candidate.item.type,
        name:
          data.componentName ||
          data.name ||
          data.title ||
          data.patternName ||
          candidate.item.id,
        summary:
          data.summary ||
          data.description ||
          data.purpose ||
          firstParagraph(data.body),
        preview: this.createPreview(data),
        score: candidate.matchCount,
        aliases: Array.isArray(data.aliases) ? data.aliases : [],
        status: data.status,
        size: data.size,
        productType: data.productType,
        internal: data.internal,
        subcomponent: data.subcomponent,
      };
    });
    return { total: filtered.length, results };
  }

  /**
   * The canonical id of a component named in any form (id, alias, React,
   * web component, Angular or display name), or undefined when no component
   * goes by that name.
   */
  resolveComponentId(raw: string): string | undefined {
    const item = this.index.getItem(this.normalizeComponentId(raw));
    return item?.type === 'component' ? item.id : undefined;
  }

  /**
   * The statuses the records in a collection carry, or those across every
   * collection. A status filter outside these can never match.
   */
  statusesIn(collection?: string): string[] {
    const type = collection ? COLLECTION_TO_TYPE[collection] : undefined;
    const statuses = new Set<string>();
    for (const item of this.index.getAllItems()) {
      if (type && item.type !== type) continue;
      if (typeof item.data.status === 'string') statuses.add(item.data.status);
    }
    return [...statuses].sort();
  }

  /**
   * Example ids that use a component, from the reverse index built at load
   * time. Accepts the component name in any form (see normalizeComponentId).
   */
  getExamplesForComponent(componentId: string): string[] {
    return (
      this.examplesByComponent.get(this.normalizeComponentId(componentId)) ?? []
    );
  }

  /**
   * Get item by ID. Returns a structured wrapper with id, collection,
   * resolved_via, and data — or null if not found.
   *
   * When `collection` is supplied, the lookup is scoped to that collection:
   * a match in any other collection is ignored, so the same id in two
   * collections resolves predictably. Without it, the first id/alias match
   * wins (no id is shared across collections in the current data).
   */
  get(
    id: string,
    options: { collection?: string } = {},
  ): {
    id: string;
    collection: string;
    resolved_via: 'id' | 'alias';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  } | null {
    const typeToCollection: Record<string, string> = {
      component: 'components',
      example: 'examples',
      guidance: 'guidance',
      foundation: 'foundations',
      'get-started': 'get-started',
      productType: 'productTypes',
    };
    const collectionToType: Record<string, string> = {
      components: 'component',
      examples: 'example',
      guidance: 'guidance',
      foundations: 'foundation',
      'get-started': 'get-started',
      productTypes: 'productType',
    };

    // Scope to a collection when asked. An unrecognized name matches nothing.
    let targetType: string | undefined;
    if (options.collection) {
      targetType = collectionToType[options.collection];
      if (!targetType) return null;
    }
    const inCollection = (item: IndexedItem): boolean =>
      !targetType || item.type === targetType;

    const key = id.trim();

    // Try direct lookup (exact id, then lowercased).
    const directItem =
      this.index.getItem(key) ?? this.index.getItem(key.toLowerCase());
    if (directItem && inCollection(directItem)) {
      return {
        id: directItem.id,
        collection: typeToCollection[directItem.type] || directItem.type,
        resolved_via: 'id',
        data: directItem.data,
      };
    }

    // Try explicit aliases recorded from data.aliases.
    const aliasedId = this.aliasMap.get(key.toLowerCase());
    if (aliasedId) {
      const item =
        this.index.getItem(aliasedId) ??
        this.index.getItem(aliasedId.toLowerCase());
      if (item && inCollection(item)) {
        return {
          id: item.id,
          collection: typeToCollection[item.type] || item.type,
          resolved_via: 'alias',
          data: item.data,
        };
      }
    }

    // Any other spelling of a name (DatePicker, date_picker, "Date picker",
    // <goa-date-picker>) goes through the normaliser the component filter
    // uses; the hyphen-free form still catches "drop-down" for "dropdown".
    const normalized = this.normalizeComponentId(key);
    const variations = [normalized, normalized.replace(/-/g, '')];

    for (const variation of variations) {
      const item = this.index.getItem(variation);
      if (item && inCollection(item)) {
        return {
          id: item.id,
          collection: typeToCollection[item.type] || item.type,
          resolved_via: 'alias',
          data: item.data,
        };
      }
    }

    return null;
  }

  /**
   * Collapse any framework spelling of a component name to its canonical id.
   * Handles React PascalCase (GoabTable), web-component / Angular prefixes
   * (goa-table, goab-table), display names ("Date picker"), markup
   * (<goa-table>), casing, and legacy slugs recorded as aliases
   * (app-footer -> footer). Both the query and the stored refs run through
   * this, so a name in any form lines up with a ref stored in any form.
   */
  private normalizeComponentId(raw: string): string {
    const cleaned = raw.trim().replace(/^<\/?\s*|\s*\/?>$/g, '');
    const lower = cleaned.toLowerCase();
    // Direct alias hit on the raw spelling (alias keys are stored lowercased,
    // e.g. "goabappfooter" -> "footer", "app-footer" -> "footer").
    const directAlias = this.aliasMap.get(lower);
    if (directAlias) return directAlias;
    // React PascalCase -> kebab, spaces and underscores -> hyphens, then drop
    // the framework prefix.
    const kebab = cleaned
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
      .replace(/^goab?-/, '');
    return this.aliasMap.get(kebab) ?? kebab;
  }

  /**
   * Get all items of a type
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getByType(type: string): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.index.getItemsByType(type as any).map((item) => item.data);
  }

  /**
   * Get index statistics
   */
  getStats() {
    return this.index.getStats();
  }

  // Private methods

  /**
   * Build the component -> examples reverse index from each example's
   * `components` list (the generator records the relationship on the example
   * side only). Runs once, after all folders are loaded, so alias
   * registration is complete before ids are normalized.
   */
  private buildComponentExampleIndex(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const examples = this.index.getItemsByType('example' as any);
    for (const example of examples) {
      if (!Array.isArray(example.data.components)) continue;
      for (const ref of example.data.components) {
        if (typeof ref !== 'string' || ref.length === 0) continue;
        const componentId = this.normalizeComponentId(ref);
        const list = this.examplesByComponent.get(componentId);
        if (!list) {
          this.examplesByComponent.set(componentId, [example.id]);
        } else if (!list.includes(example.id)) {
          list.push(example.id);
        }
      }
    }
  }

  /**
   * Load one collection. Every collection is required: a folder only goes
   * missing if the data was built or packaged wrong, and a server that
   * answers without part of its knowledge is worse than one that refuses to
   * start. The folder read sits outside the per-file try below so a
   * file-level failure propagates to the caller instead of being caught here.
   */
  private async loadFolder(folderPath: string, type: string): Promise<void> {
    let files: string[];
    try {
      files = await readdir(folderPath);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(
        `Unable to load required data folder '${folderPath}': ${message}`,
      );
    }

    let loaded = 0;
    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      const filePath = join(folderPath, file);
      try {
        const content = await readFile(filePath, 'utf8');
        const data = JSON.parse(content);

        // Prefer the explicit `id` field (new flat-shape data). Fall back to
        // legacy id-bearing fields, then the filename (with __ unflattened
        // back to / so nested ids like get-started/designers/* round-trip).
        const id =
          data.id ||
          data.componentName?.toLowerCase() ||
          data.patternId ||
          data.conceptId ||
          data.exampleId ||
          file.replace(/\.json$/, '').replace(/__/g, '/');

        const indexed: IndexedItem = {
          id,
          type: type as IndexedItem['type'],
          data,
          searchableText: createSearchableText(data),
          tags: extractTags(data),
          category: data.category,
        };

        this.index.addItem(indexed);
        loaded++;

        // Register aliases for `get` lookups.
        if (Array.isArray(data.aliases)) {
          for (const alias of data.aliases) {
            if (typeof alias === 'string' && alias.length > 0) {
              this.aliasMap.set(alias.toLowerCase(), id);
            }
          }
        }

        // A component also answers to every name a developer types: its
        // React, web component and Angular names and its display name.
        // Recorded aliases keep priority.
        if (type === 'component') {
          const names = [
            data.reactClassName,
            data.webComponentTag,
            data.angularSelector,
            data.name,
          ];
          for (const name of names) {
            if (typeof name !== 'string' || name.length === 0) continue;
            if (!this.aliasMap.has(name.toLowerCase())) {
              this.aliasMap.set(name.toLowerCase(), id);
            }
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        throw new Error(
          `Unable to load data file '${filePath}': ${message}`,
        );
      }
    }
    if (loaded === 0) {
      throw new Error(`Required data folder '${folderPath}' holds no records`);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private createPreview(data: any): string {
    const parts: string[] = [];

    if (data.category) parts.push(`[${data.category}]`);
    if (data.tags?.slice(0, 3).length) {
      parts.push(data.tags.slice(0, 3).join(', '));
    }
    if (data.commonUse?.[0]) {
      parts.push(data.commonUse[0]);
    }
    if (data.description) {
      parts.push(data.description.slice(0, 120));
    }

    return parts.join(' - ') || '';
  }
}

/** The first paragraph of a markdown body, skipping headings. */
export function firstParagraph(body: unknown): string | undefined {
  if (typeof body !== 'string') return undefined;
  const block = body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .find((b) => b.length > 0 && !b.startsWith('#'));
  return block ? block.replace(/\s+/g, ' ') : undefined;
}

function recordReferencesComponent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any,
  component: string,
  normalize: (raw: string) => string,
): boolean {
  const target = normalize(component);
  if (item.type === 'component') return normalize(item.id) === target;
  const data = item.data;
  if (
    Array.isArray(data.components) &&
    data.components.some((c: string) => normalize(c) === target)
  ) {
    return true;
  }
  const appliesTo = data.appliesTo?.components;
  if (
    Array.isArray(appliesTo) &&
    appliesTo.some((c: string) => normalize(c) === target)
  ) {
    return true;
  }
  return false;
}
