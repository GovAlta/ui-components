/**
 * GoA Design System MCP Server
 *
 * Runs locally over stdio. Ships as an npm package with its data generated
 * from the docs content pipeline at release, so the package version tells you
 * which design system release the answers describe.
 *
 * 2 focused tools:
 * - search: Find components, patterns, concepts, examples
 * - get: Get specific item details by ID
 *
 * Philosophy: Rich data, simple tools. The quality of knowledge determines
 * output quality.
 *
 * Logging: errors only, to stderr. stdout carries the MCP protocol, so no
 * diagnostic output may ever be written there. Query history is deliberately
 * not recorded.
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { DataLoader, firstParagraph } from './data-loader';

// ─── Error handling ─────────────────────────────────────────────────────────

interface ToolErrorResult {
  [x: string]: unknown;
  content: [{ type: 'text'; text: string }];
  isError: true;
}

/** Convert a handled error into an MCP tool-error response. */
function toolError(err: unknown): ToolErrorResult {
  const message = err instanceof Error ? err.message : String(err);
  process.stderr.write(`[design-system-mcp] Tool error: ${message}\n`);
  return {
    content: [{ type: 'text', text: JSON.stringify({ error: message }) }],
    isError: true,
  };
}

/**
 * Wrap a tool handler so unexpected throws land on stderr before the SDK
 * turns them into an error response. A silent failure is the worst outcome
 * for a local MCP: the assistant gets nothing back and confidently reports
 * that a component does not exist. The stderr line is what lets a team see
 * the server is broken on their machine.
 *
 * (Re-throwing is safe: McpServer wraps every tool handler in try/catch and
 * converts the throw into an isError response for the client.)
 */
function withErrorLogging<TArgs, TResult>(
  toolName: string,
  handler: (args: TArgs) => Promise<TResult>,
): (args: TArgs) => Promise<TResult> {
  return async (args: TArgs): Promise<TResult> => {
    try {
      return await handler(args);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      process.stderr.write(
        `[design-system-mcp] ${toolName} failed: ${message}\n`,
      );
      throw err;
    }
  };
}

// ─── Package version ────────────────────────────────────────────────────────

const moduleDir = dirname(fileURLToPath(import.meta.url));

/**
 * Read this package's own version so serverInfo reports the real published
 * version. semantic-release stamps package.json at release, after the bundle
 * is built, so the version must be read at runtime rather than baked in.
 * Probes the bundled layout (package.json beside main.js) then the source
 * layout (one level above src/); the name guard keeps an unrelated
 * package.json from matching. Falls back to the 0.0.0 placeholder.
 */
function resolvePackageVersion(): string {
  const candidates = [
    join(moduleDir, 'package.json'),
    join(moduleDir, '..', 'package.json'),
  ];
  for (const candidate of candidates) {
    try {
      const pkg = JSON.parse(readFileSync(candidate, 'utf8')) as {
        name?: string;
        version?: string;
      };
      if (pkg.name === '@abgov/design-system-mcp' && typeof pkg.version === 'string') {
        return pkg.version;
      }
    } catch {
      // Probe failed (no file there, or not JSON); try the next candidate.
    }
  }
  return '0.0.0';
}

// ─── Server ─────────────────────────────────────────────────────────────────

async function main() {
  const dataLoader = new DataLoader();
  await dataLoader.initialize();

  const itemCount = dataLoader.getStats().totalItems;

  const packageVersion = resolvePackageVersion();

  // One process, one stdio connection, one server instance. (The hosted
  // predecessor needed a factory to give each HTTP session its own instance;
  // stdio has no sessions.)
  const server = new McpServer({
    name: 'goa-design-system-mcp',
    version: packageVersion,
    description:
      'AI-native knowledge base for the Government of Alberta Design System. Provides component details, patterns, and implementation examples.',
  });

  registerTools(server, dataLoader);

  await server.connect(new StdioServerTransport());

  process.stderr.write(
    `GoA Design System MCP v${packageVersion} ready (${itemCount} items loaded)\n`,
  );
}

function registerTools(server: McpServer, dataLoader: DataLoader) {
  server.tool(
    'search',
    `Search the GoA Design System. Good for discovery: describe what you're trying to build ("worker case-management tool") or name something fuzzy ("table with filters"). For known IDs, use \`get\` instead. Filters narrow what comes back; an empty query with a filter lists everything the filter matches.

collection: components | guidance | examples | foundations | get-started | productTypes
size (examples): interaction (single gesture) | section (card-level) | page (full screen) | task (start to finish) | product (entire app)
productType (examples): workspace | public-form
framework (components and examples): react | angular | web-components (examples with no recorded frameworks are kept)
status: stable | deprecated for components; published for everything else
component (guidance scoping): a component named in any form (table, goa-table, GoabTable, app-footer, "Date picker")

Returns: { total, results: [{ id, collection, name, status, size?, productType?, internal?, subcomponent?, summary, aliases }], next: { suggested_call, why } }
internal: rendered by another component; teams don't use it directly. subcomponent: used inside its parent component.`,
    {
      query: z.string().describe("What you're looking for"),
      collection: z
        .enum([
          'components',
          'guidance',
          'examples',
          'foundations',
          'get-started',
          'productTypes',
        ])
        .optional()
        .describe('Filter by content collection'),
      size: z
        .enum(['interaction', 'section', 'page', 'task', 'product'])
        .optional()
        .describe('Filter by size (examples only)'),
      productType: z
        .enum(['workspace', 'public-form'])
        .optional()
        .describe('Filter by product type (examples only)'),
      framework: z
        .enum(['react', 'angular', 'web-components'])
        .optional()
        .describe('Filter by framework support (components and examples)'),
      status: z
        .enum(['published', 'stable', 'deprecated'])
        .optional()
        .describe('Filter by lifecycle status'),
      component: z
        .string()
        .optional()
        .describe(
          "Scope results to a component, named in any form ('table', 'goa-table', 'GoabTable')",
        ),
      limit: z
        .number()
        .int()
        .min(1)
        .optional()
        .default(10)
        .describe('Max results (default: 10)'),
    },
    withErrorLogging(
      'search',
      async (args: {
        query: string;
        collection?: string;
        size?: string;
        productType?: string;
        framework?: string;
        status?: string;
        component?: string;
        limit?: number;
      }) => {
        const {
          query,
          collection,
          size,
          productType,
          framework,
          status,
          component,
          limit = 10,
        } = args;

        // Bad input answers with an error, never an empty success: an AI
        // reads an empty answer as "none exist".
        const hasFilter =
          collection || size || productType || framework || status || component;
        if (!query.trim() && !hasFilter) {
          return toolError(
            new Error(
              'Give a query to search for, or a filter to list what it matches.',
            ),
          );
        }
        // A filter that can't match its collection is bad input too.
        if (framework && collection && !['components', 'examples'].includes(collection)) {
          return toolError(
            new Error(
              `The framework filter applies to components and examples; ${collection} aren't tied to a framework. Leave framework out.`,
            ),
          );
        }
        if (status) {
          const used = dataLoader.valuesIn('status', collection);
          if (!used.includes(status)) {
            return toolError(
              new Error(
                `No ${collection ?? 'records'} are ${status}; ${collection ?? 'records'} are ${used.join(' or ')}.`,
              ),
            );
          }
        }
        // Only some records carry a size or a product type, and not every size
        // the schema allows is in use, so a value nothing carries is an error.
        for (const [label, field, value] of [
          ['size', 'size', size],
          ['product type', 'productType', productType],
        ] as const) {
          if (!value) continue;
          const used = dataLoader.valuesIn(field, collection);
          if (used.includes(value)) continue;
          const where = collection ?? 'records';
          return toolError(
            new Error(
              used.length > 0
                ? `No ${where} have ${label} ${value}; the ${label}s in use are ${used.join(', ')}.`
                : `No ${where} have a ${label}; only ${dataLoader.collectionsWith(field).join(' and ')} do.`,
            ),
          );
        }
        if (component && !dataLoader.resolveComponentId(component)) {
          const { results: near } = await dataLoader.search(component, {
            collection: 'components',
            maxResults: 5,
          });
          return toolError(
            new Error(
              `Unknown component '${component}'. ` +
                (near.length > 0
                  ? `Did you mean: ${near.map((s) => s.id).join(', ')}?`
                  : 'Search the components collection to find it.'),
            ),
          );
        }

        const { total, results } = await dataLoader.search(query, {
          collection,
          size,
          productType,
          framework,
          status,
          component,
          maxResults: limit,
        });

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  query,
                  count: results.length,
                  total,
                  results: results.map((r) => ({
                    id: r.id,
                    collection: r.collection,
                    name: r.name || r.id,
                    summary: r.summary,
                    status: r.status,
                    size: r.size,
                    productType: r.productType,
                    internal: r.internal,
                    subcomponent: r.subcomponent,
                    score: r.score,
                    aliases: r.aliases,
                  })),
                  next: buildSearchNext(results, total),
                },
                null,
                2,
              ),
            },
          ],
        };
      },
    ),
  );

  server.tool(
    'get',
    `Fetch one item by ID or any name it goes by: an alias, or a component's React, web component, Angular or display name (GoabDropdown, goa-dropdown, "Date picker"). Use for known IDs, or after \`search\` returns a high-confidence match. Old slugs like "confirm-that-an-application-was-submitted" resolve to current entries ("result-page"). The response's resolved_via field tells you which path matched.

collection: components | guidance | examples | foundations | get-started | productTypes (optional; scopes the lookup to one collection. Omit it and the first id or alias match wins.)
detail: summary (default, ~1KB) | full (entire entry, including an example's code for each framework)

Returns: { id, collection, resolved_via, entry, related: { components, examples, guidance }, next: { suggested_calls } }`,
    {
      id: z
        .string()
        .describe('Item ID or alias (from search results or known name)'),
      collection: z
        .enum([
          'components',
          'guidance',
          'examples',
          'foundations',
          'get-started',
          'productTypes',
        ])
        .optional()
        .describe('Scope the lookup to one collection (optional)'),
      detail: z
        .enum(['summary', 'full'])
        .optional()
        .default('summary')
        .describe("Output detail level (default: 'summary')"),
    },
    withErrorLogging(
      'get',
      async (args: {
        id: string;
        collection?: string;
        detail?: 'summary' | 'full';
      }) => {
        const { id, collection, detail = 'summary' } = args;
        const result = dataLoader.get(id, { collection });

        if (!result) {
          const { results: suggestions } = id.trim()
            ? await dataLoader.search(id, { maxResults: 5 })
            : { results: [] };
          return toolError(
            new Error(
              `Item '${id}' not found. ` +
                (suggestions.length > 0
                  ? `Did you mean: ${suggestions.map((s) => s.id).join(', ')}?`
                  : 'Use search to find available items.'),
            ),
          );
        }

        const entry =
          detail === 'summary'
            ? toSummaryEntry(result.data, result.id)
            : result.data;

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  id: result.id,
                  collection: result.collection,
                  resolved_via: result.resolved_via,
                  entry,
                  related: buildGetRelated(
                    result.collection,
                    result.id,
                    result.data,
                    dataLoader,
                  ),
                  next: buildGetNext(
                    result.collection,
                    result.id,
                    result.data,
                    dataLoader,
                  ),
                },
                null,
                2,
              ),
            },
          ],
        };
      },
    ),
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toSummaryEntry(data: any, id: string): Record<string, unknown> {
  const summary: Record<string, unknown> = {
    name:
      data.componentName || data.name || data.title || data.patternName || id,
    summary:
      data.summary ||
      data.description ||
      data.purpose ||
      firstParagraph(data.body),
    status: data.status,
    internal: data.internal,
    subcomponent: data.subcomponent,
    size: data.size,
    productType: data.productType,
    demoUrl: data.demoUrl,
    aliases: data.aliases,
  };
  return Object.fromEntries(
    Object.entries(summary).filter(([, v]) => v !== undefined),
  );
}

/**
 * Build a hint for the most likely next call after a search response.
 */
function buildSearchNext(
  results: { id: string }[],
  total: number,
): { suggested_call: string; why: string } | undefined {
  if (results.length === 0) return undefined;
  return {
    suggested_call: `get({ id: '${results[0].id}' })`,
    why:
      total === 1
        ? 'Single match. Fetch it.'
        : `First of ${total} matches. Fetch it.`,
  };
}

/**
 * Build a hint for the most likely next call after a get response.
 */
function buildGetNext(
  collection: string,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  dataLoader: DataLoader,
): { suggested_calls: string[] } {
  const suggested_calls: string[] = [];

  if (collection === 'components') {
    // Its guidance is already listed in full under related, so the useful
    // next step is an example of the component in use.
    const example = dataLoader.getExamplesForComponent(id)[0];
    if (example) suggested_calls.push(`get({ id: '${example}' })`);
  } else if (collection === 'examples') {
    if (
      Array.isArray(data.relatedExamples) &&
      data.relatedExamples.length > 0
    ) {
      suggested_calls.push(`get({ id: '${data.relatedExamples[0]}' })`);
    }
  }

  return { suggested_calls };
}

/**
 * Build the related block for a get response.
 *
 * For components: relatedComponents are read directly; examples are
 * reverse-looked-up from each example's own components list; guidance ids on
 * the component are resolved against the guidance collection and returned as
 * lightweight summaries so an agent can act without a second round-trip per
 * atom.
 * For examples: components are read directly; relatedExamples surface as
 * sibling examples.
 * For guidance and product types: the components they apply to or are built
 * from, as canonical ids.
 */
function buildGetRelated(
  collection: string,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  dataLoader: DataLoader,
): {
  components: { id: string }[];
  examples: { id: string }[];
  guidance: GuidanceRelatedEntry[];
} {
  const components: { id: string }[] = [];
  const examples: { id: string }[] = [];
  const guidance: GuidanceRelatedEntry[] = [];

  if (collection === 'components') {
    if (Array.isArray(data.relatedComponents)) {
      data.relatedComponents.forEach((cid: string) =>
        components.push({ id: cid }),
      );
    }
    dataLoader
      .getExamplesForComponent(id)
      .forEach((eid) => examples.push({ id: eid }));
    if (Array.isArray(data.relatedGuidance)) {
      for (const gid of data.relatedGuidance) {
        const entry = resolveGuidanceSummary(gid, dataLoader);
        if (entry) guidance.push(entry);
      }
    }
  } else if (collection === 'examples') {
    if (Array.isArray(data.components)) {
      data.components.forEach((cid: string) => components.push({ id: cid }));
    }
    if (Array.isArray(data.relatedExamples)) {
      data.relatedExamples.forEach((eid: string) => examples.push({ id: eid }));
    }
  } else if (collection === 'guidance' || collection === 'productTypes') {
    const refs =
      collection === 'guidance' ? data.appliesTo?.components : data.components;
    if (Array.isArray(refs)) {
      for (const ref of refs) {
        const cid =
          typeof ref === 'string'
            ? dataLoader.resolveComponentId(ref)
            : undefined;
        if (cid && !components.some((c) => c.id === cid)) {
          components.push({ id: cid });
        }
      }
    }
  }

  return { components, examples, guidance };
}

interface GuidanceRelatedEntry {
  id: string;
  type?: string;
  topic?: string;
  description?: string;
}

function resolveGuidanceSummary(
  guidanceId: string,
  dataLoader: DataLoader,
): GuidanceRelatedEntry | null {
  const hit = dataLoader.get(guidanceId, { collection: 'guidance' });
  if (!hit) return { id: guidanceId };
  const data = hit.data;
  return {
    id: hit.id,
    type: data.type,
    topic: data.topic,
    description: data.description,
  };
}

main().catch((error) => {
  process.stderr.write(`[design-system-mcp] Server failed to start: ${error}\n`);
  process.exit(1);
});
