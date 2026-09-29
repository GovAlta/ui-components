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
import { DataLoader } from './data-loader';

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
    `Search the GoA Design System. Good for discovery: describe what you're trying to build ("worker case-management tool") or name something fuzzy ("table with filters"). For known IDs, use \`get\` instead. Filters narrow what comes back.

collection: components | guidance | examples | foundations | get-started | productTypes
size (examples): interaction (single gesture) | section (card-level) | page (full screen) | task (start to finish) | product (entire app)
productType (examples): workspace | public-form
framework (examples): react | angular | web-components
status: published | stable | deprecated
component (guidance scoping): a component named in any form (table, goa-table, GoabTable, app-footer)
context (guidance scoping): an example id like "case-detail"

Returns: { results: [{ id, collection, name, size?, productType?, summary, aliases }], next: { suggested_call, why } }`,
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
        .describe('Filter by framework support (examples only)'),
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
      context: z
        .string()
        .optional()
        .describe(
          "Scope guidance results to an example context id like 'case-detail'",
        ),
      limit: z
        .number()
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
        context?: string;
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
          context,
          limit = 10,
        } = args;
        const results = await dataLoader.search(query, {
          collection,
          size,
          productType,
          framework,
          status,
          component,
          context,
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
                  results: results.map((r) => ({
                    id: r.id,
                    collection: r.collection,
                    name: r.name || r.id,
                    summary: r.summary,
                    score: r.score,
                    aliases: r.aliases,
                  })),
                  next: buildSearchNext(results),
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
    `Fetch one item by ID or alias. Use for known IDs, or after \`search\` returns a high-confidence match. Aliases work too. Old slugs like "confirm-that-an-application-was-submitted" resolve to current entries ("result-page"). The response's resolved_via field tells you which path matched.

collection: components | guidance | examples | foundations | get-started | productTypes (optional; scopes the lookup to one collection. Omit it and the first id or alias match wins.)
detail: summary (default, ~1KB) | full (entire entry)

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
          const suggestions = await dataLoader.search(id, { maxResults: 5 });
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
          detail === 'summary' ? toSummaryEntry(result.data) : result.data;

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
                  next: buildGetNext(result.collection, result.id, result.data),
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
function toSummaryEntry(data: any): Record<string, unknown> {
  const summary: Record<string, unknown> = {
    name: data.componentName || data.name || data.patternName,
    summary: data.summary || data.description || data.purpose,
    status: data.status,
    size: data.size,
    productType: data.productType,
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
  results: { id: string; score: number }[],
): { suggested_call: string; why: string } | undefined {
  if (results.length === 0) return undefined;
  if (results.length === 1) {
    return {
      suggested_call: `get({ id: '${results[0].id}' })`,
      why: 'Single match. Fetch the full entry.',
    };
  }
  return {
    suggested_call: `get({ id: '${results[0].id}' })`,
    why: `Top match (score ${results[0].score}). Fetch its full entry.`,
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
): { suggested_calls: string[] } {
  const suggested_calls: string[] = [];

  if (collection === 'components') {
    suggested_calls.push(
      `search({ query: '${id}', collection: 'guidance', component: '${id}' })`,
    );
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
