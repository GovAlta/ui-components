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
 * the script itself and `data/` is one level up).
 *
 * Set `GOA_MCP_DATA_DIR` to override entirely.
 */
const moduleDir = dirname(fileURLToPath(import.meta.url));

function resolveDataDir(): string {
  if (process.env.GOA_MCP_DATA_DIR) {
    return process.env.GOA_MCP_DATA_DIR;
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
}

export interface SearchOptions {
  collection?: string;
  size?: string;
  productType?: string;
  framework?: string;
  status?: string;
  component?: string;
  context?: string;
  maxResults?: number;
}

export class DataLoader {
  private index = new InvertedIndex();
  private aliasMap = new Map<string, string>(); // lowercase alias -> canonical id
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
  ): Promise<SearchResult[]> {
    const {
      collection,
      size,
      productType,
      framework,
      status,
      component,
      context,
      maxResults = 10,
    } = options;

    // Fetch a wider candidate set when filters are stacked, so the final
    // top-N after filtering still has room. Cheap because the index is O(1).
    const filterCount = [
      size,
      productType,
      framework,
      status,
      component,
      context,
    ].filter(Boolean).length;
    const candidatePoolMultiplier = 2 + filterCount;
    const candidates = this.index.search(
      query,
      maxResults * candidatePoolMultiplier,
    );

    const collectionToType: Record<string, string> = {
      components: 'component',
      examples: 'example',
      guidance: 'guidance',
      foundations: 'foundation',
      'get-started': 'get-started',
      productTypes: 'productType',
    };

    let filtered = candidates;
    if (collection) {
      const targetType = collectionToType[collection];
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
      filtered = filtered.filter((c) => {
        const frameworks = c.item.data.frameworks;
        return Array.isArray(frameworks) && frameworks.includes(framework);
      });
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
    if (context) {
      filtered = filtered.filter((c) => {
        const contexts = c.item.data.appliesTo?.contexts;
        return Array.isArray(contexts) && contexts.includes(context);
      });
    }

    const typeToCollection: Record<string, string> = {
      component: 'components',
      example: 'examples',
      guidance: 'guidance',
      foundation: 'foundations',
      'get-started': 'get-started',
      productType: 'productTypes',
    };

    return filtered.slice(0, maxResults).map((candidate) => {
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
        summary: data.summary || data.description || data.purpose,
        preview: this.createPreview(data),
        score: candidate.matchCount,
        aliases: Array.isArray(data.aliases) ? data.aliases : [],
      };
    });
  }

  /**
   * Find component IDs that list this example in their relatedExamples field.
   * Reverse lookup: examples don't list their components directly, but
   * components list the examples that use them.
   */
  findComponentsRelatedToExample(exampleId: string): string[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const components = this.index.getItemsByType('component' as any);
    return components
      .filter(
        (c) =>
          Array.isArray(c.data.relatedExamples) &&
          c.data.relatedExamples.includes(exampleId),
      )
      .map((c) => c.id);
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

    // Try direct lookup (exact id, then lowercased).
    const directItem =
      this.index.getItem(id) ?? this.index.getItem(id.toLowerCase());
    if (directItem && inCollection(directItem)) {
      return {
        id: directItem.id,
        collection: typeToCollection[directItem.type] || directItem.type,
        resolved_via: 'id',
        data: directItem.data,
      };
    }

    // Try explicit aliases recorded from data.aliases.
    const aliasedId = this.aliasMap.get(id.toLowerCase());
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

    // Try common id variations.
    const variations = [
      id.replace(/[-_]/g, ''),
      id
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .slice(1),
    ];

    for (const variation of variations) {
      const item =
        this.index.getItem(variation) ??
        this.index.getItem(variation.toLowerCase());
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
   * (goa-table, goab-table), casing, and legacy slugs recorded as aliases
   * (app-footer -> footer). Both the query and the stored refs run through
   * this, so a name in any form lines up with a ref stored in any form.
   */
  private normalizeComponentId(raw: string): string {
    const lower = raw.trim().toLowerCase();
    // Direct alias hit on the raw spelling (alias keys are stored lowercased,
    // e.g. "goabappfooter" -> "footer", "app-footer" -> "footer").
    const directAlias = this.aliasMap.get(lower);
    if (directAlias) return directAlias;
    // React PascalCase -> kebab, then drop the framework prefix.
    const kebab = raw
      .trim()
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
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

  private async loadFolder(folderPath: string, type: string): Promise<void> {
    try {
      const files = await readdir(folderPath);

      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        try {
          const filePath = join(folderPath, file);
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

          // Register aliases for `get` lookups.
          if (Array.isArray(data.aliases)) {
            for (const alias of data.aliases) {
              if (typeof alias === 'string' && alias.length > 0) {
                this.aliasMap.set(alias.toLowerCase(), id);
              }
            }
          }
        } catch {
          // Skip invalid files silently
        }
      }
    } catch {
      // Folder doesn't exist - that's okay
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
