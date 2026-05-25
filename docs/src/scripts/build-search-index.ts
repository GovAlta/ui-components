/**
 * Build Search Index Script
 *
 * Extracts searchable content from MDX files and outputs a JSON index.
 * Run with: npm run build:search-index
 *
 * The index is consumed by useSearch.ts at runtime for client-side search.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join, basename, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Get directory paths relative to this script
// Script is in docs/src/scripts/, so go up two levels to docs/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '../..');

// Content directories
const COMPONENTS_DIR = join(ROOT, 'src/content/components');
const EXAMPLES_DIR = join(ROOT, 'src/content/examples');
const GET_STARTED_DIR = join(ROOT, 'src/content/get-started');
const PRODUCT_TYPES_DIR = join(ROOT, 'src/content/productTypes');
const OUTPUT_FILE = join(ROOT, 'public/search-index.json');

// ============================================================================
// Types
// ============================================================================

interface ComponentEntry {
  type: 'component';
  id: string;           // filename without .mdx
  name: string;
  description?: string;
  status: string;
  category: string;
  tags: string[];
  slug: string;
}

interface ExampleEntry {
  type: 'example';
  id: string;
  title: string;
  description?: string;
  status: string;
  size: string;              // "interaction" | "section" | "page" | "task" | "product"
  productType?: string;      // "workspace" | "public-form"
  tags: string[];
  components: string[];      // What components this example uses
  aliases: string[];         // Secondary slugs that surface this entry in search
  slug: string;
}

interface PageEntry {
  type: 'page';
  id: string;
  title: string;
  description?: string;
  status: string;
  category: string;     // High-level grouping for filter UI ("get started")
  tags: string[];       // Synthesized from section so queries like "developer setup" hit
  slug: string;         // URL path without leading slash (e.g. "get-started/developers/setup")
}

type SearchEntry = ComponentEntry | ExampleEntry | PageEntry;

// ============================================================================
// Frontmatter Parsing
// ============================================================================

/**
 * Extract YAML frontmatter from MDX content.
 *
 * MDX files have frontmatter between --- delimiters at the top:
 * ---
 * name: Button
 * status: stable
 * ---
 *
 * This is a simple parser that handles the common cases without
 * pulling in a full YAML library.
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const yamlContent = match[1];
  const body = content.slice(match[0].length).trim();

  // Simple YAML parser for our use case
  const frontmatter: Record<string, unknown> = {};
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  for (const line of yamlContent.split('\n')) {
    // Array item (starts with "  - ")
    if (line.match(/^\s+-\s+/)) {
      const value = line.replace(/^\s+-\s+/, '').trim();
      if (currentArray) {
        currentArray.push(value);
      }
      continue;
    }

    // Key-value pair
    const kvMatch = line.match(/^(\w+):\s*(.*)/);
    if (kvMatch) {
      // Save previous array if any
      if (currentKey && currentArray) {
        frontmatter[currentKey] = currentArray;
      }

      currentKey = kvMatch[1];
      const value = kvMatch[2].trim();

      // Check if this starts an array (empty value followed by array items)
      if (value === '' || value === '|') {
        currentArray = [];
      } else {
        currentArray = null;
        // Remove quotes if present
        frontmatter[currentKey] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  // Don't forget the last array
  if (currentKey && currentArray) {
    frontmatter[currentKey] = currentArray;
  }

  return { frontmatter, body };
}

/**
 * Extract the first paragraph from MDX body content.
 * Used as description for examples when not explicitly provided.
 */
function extractFirstParagraph(body: string): string | undefined {
  // Skip headings and empty lines, find first paragraph
  const lines = body.split('\n');
  let paragraph = '';

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines at start
    if (!paragraph && !trimmed) continue;

    // Skip headings
    if (trimmed.startsWith('#')) continue;

    // Found content
    if (trimmed) {
      paragraph += (paragraph ? ' ' : '') + trimmed;
    } else if (paragraph) {
      // Empty line after content = end of paragraph
      break;
    }
  }

  return paragraph || undefined;
}

function isHidden(frontmatter: Record<string, unknown>): boolean {
  return String(frontmatter.hidden ?? '').toLowerCase() === 'true';
}

function normalizeDescription(value: string | undefined): string | undefined {
  if (!value) return undefined;

  const withoutHtml = value.replace(/<[^>]+>/g, ' ');
  const withoutMarkdownLinks = withoutHtml.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
  const normalized = withoutMarkdownLinks.replace(/\s+/g, ' ').trim();

  return normalized || undefined;
}

// ============================================================================
// File Processing
// ============================================================================

/**
 * Process a component MDX file into a search entry.
 */
function processComponent(filePath: string): ComponentEntry | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter } = parseFrontmatter(content);

    const id = basename(filePath, '.mdx');

    // Skip hidden components
    if (isHidden(frontmatter)) {
      return null;
    }

    return {
      type: 'component',
      id,
      name: String(frontmatter.name || id),
      description: normalizeDescription(
        frontmatter.description ? String(frontmatter.description) : undefined,
      ),
      status: String(frontmatter.status || 'stable'),
      category: String(frontmatter.category || 'utilities'),
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
      slug: String(frontmatter.slug || id),
    };
  } catch (error) {
    console.error(`Error processing component ${filePath}:`, error);
    return null;
  }
}

/**
 * Process an example MDX file into a search entry.
 * Examples live in subdirectories: examples/[name]/index.mdx
 * or nested: examples/[family]/[page]/index.mdx
 *
 * The slug is derived from the path relative to EXAMPLES_DIR so that nested
 * entries (workspace/dashboard, etc.) get path-shaped slugs matching Astro's
 * content-collection routing. Frontmatter `id` is kept for stable cross-
 * references but no longer drives the URL.
 */
function processExample(filePath: string): ExampleEntry | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);

    // Skip hidden examples
    if (isHidden(frontmatter)) {
      return null;
    }

    // Slug = path within EXAMPLES_DIR (e.g., "workspace/dashboard", "start-page").
    // Use forward slashes on every OS so URLs are consistent.
    const slug = relative(EXAMPLES_DIR, dirname(filePath)).split(sep).join('/');
    const id = String(frontmatter.id || basename(dirname(filePath)));

    // Extract description from body if not in frontmatter
    const description = frontmatter.description
      ? String(frontmatter.description)
      : extractFirstParagraph(body);

    return {
      type: 'example',
      id,
      title: String(frontmatter.title || id),
      description: normalizeDescription(description),
      status: String(frontmatter.status || 'published'),
      size: String(frontmatter.size || 'section'),
      productType: frontmatter.productType
        ? String(frontmatter.productType)
        : undefined,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
      components: Array.isArray(frontmatter.components)
        ? frontmatter.components.map(String)
        : [],
      aliases: Array.isArray(frontmatter.aliases)
        ? frontmatter.aliases.map(String)
        : [],
      slug,
    };
  } catch (error) {
    console.error(`Error processing example ${filePath}:`, error);
    return null;
  }
}

/**
 * Synthesize search tags from a Get Started section.
 * Includes the singular form so a query like "developer setup" matches
 * a page whose section is "developers".
 */
function tagsForSection(section: string): string[] {
  const singular: Record<string, string> = {
    designers: 'designer',
    developers: 'developer',
  };
  const tags = [section];
  if (singular[section]) tags.push(singular[section]);
  return tags;
}

/**
 * Process a Get Started MDX file into a search entry.
 * The collection root holds the index page; nested folders are URL segments.
 */
function processGetStartedPage(filePath: string): PageEntry | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter } = parseFrontmatter(content);

    // Derive ID from path relative to the collection root, minus the extension.
    // e.g. "developers/setup.mdx" -> "developers/setup"
    // Normalize backslashes to forward slashes so Windows-built indexes still produce valid URLs.
    const relPath = filePath
      .slice(GET_STARTED_DIR.length + 1)
      .replace(/\.mdx$/, '')
      .replace(/\\/g, '/');

    // The index entry lives at /get-started, every other entry under /get-started/<id>.
    const slug = relPath === 'index' ? 'get-started' : `get-started/${relPath}`;

    const section = String(frontmatter.section || '');

    return {
      type: 'page',
      id: String(frontmatter.id || relPath),
      title: String(frontmatter.title || relPath),
      description: frontmatter.description ? String(frontmatter.description) : undefined,
      status: String(frontmatter.status || 'published'),
      category: 'get started',
      tags: section ? tagsForSection(section) : [],
      slug,
    };
  } catch (error) {
    console.error(`Error processing get-started page ${filePath}:`, error);
    return null;
  }
}

/**
 * Process a productType MDX file into a search entry.
 *
 * ProductTypes are the "starting points" for each kind of digital service
 * (workspace, public-form). Their overview pages live at /examples/[slug]/
 * via the [family]/index.astro route, so we synthesize them into the same
 * search shape as page-scale examples with size="product". This replaces
 * the hand-authored stub entries that previously lived in examples/.
 */
function processProductType(filePath: string): ExampleEntry | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);

    const slug = relative(PRODUCT_TYPES_DIR, dirname(filePath))
      .split(sep)
      .join('/');
    const id = String(frontmatter.id || slug);

    // Summary may contain inline HTML formatting (br, span) for the overview
    // page. Take the prose before the first tag — enough for search results,
    // which truncate to ~80 chars anyway, and safer than regex-stripping.
    const description = frontmatter.summary
      ? String(frontmatter.summary).split('<')[0].trim()
      : frontmatter.description
        ? String(frontmatter.description)
        : extractFirstParagraph(body);

    return {
      type: 'example',
      id,
      title: String(frontmatter.title || id),
      description,
      status: String(frontmatter.status || 'published'),
      size: 'product',
      productType: undefined,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
      components: Array.isArray(frontmatter.components)
        ? frontmatter.components.map(String)
        : [],
      aliases: Array.isArray(frontmatter.aliases)
        ? frontmatter.aliases.map(String)
        : [],
      slug,
    };
  } catch (error) {
    console.error(`Error processing productType ${filePath}:`, error);
    return null;
  }
}

/**
 * Recursively find all MDX files in a directory.
 */
function findMdxFiles(dir: string): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return files;
  }

  // Sort so file order is stable across machines and filesystems. The freshness
  // hook compares regenerated output byte-for-byte, so traversal order (and thus
  // the order of entries in the index) must be deterministic.
  for (const entry of readdirSync(dir).sort()) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findMdxFiles(fullPath));
    } else if (entry.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

// ============================================================================
// Main
// ============================================================================

function main() {
  console.log('Building search index...\n');

  const entries: SearchEntry[] = [];

  // Process components
  console.log('Processing components...');
  const componentFiles = findMdxFiles(COMPONENTS_DIR);
  for (const file of componentFiles) {
    const entry = processComponent(file);
    if (entry) {
      entries.push(entry);
    }
  }
  console.log(`  Found ${componentFiles.length} files, indexed ${entries.filter(e => e.type === 'component').length} components`);

  // Process examples
  console.log('Processing examples...');
  const exampleFiles = findMdxFiles(EXAMPLES_DIR);
  const exampleCount = entries.length;
  for (const file of exampleFiles) {
    const entry = processExample(file);
    if (entry) {
      entries.push(entry);
    }
  }
  console.log(`  Found ${exampleFiles.length} files, indexed ${entries.length - exampleCount} examples`);

  // Process Get Started pages
  console.log('Processing get-started pages...');
  const getStartedFiles = findMdxFiles(GET_STARTED_DIR);
  const getStartedCount = entries.length;
  for (const file of getStartedFiles) {
    const entry = processGetStartedPage(file);
    if (entry) {
      entries.push(entry);
    }
  }
  console.log(`  Found ${getStartedFiles.length} files, indexed ${entries.length - getStartedCount} pages`);

  // Process productTypes (workspace, public-form, etc.) — surfaced as
  // size:product overview entries so the same Cmd-K query that finds a
  // page-scale entry also finds the introductory page for its product type.
  console.log('Processing productTypes...');
  const productTypeFiles = findMdxFiles(PRODUCT_TYPES_DIR);
  const productTypeCountBefore = entries.length;
  for (const file of productTypeFiles) {
    const entry = processProductType(file);
    if (entry) {
      entries.push(entry);
    }
  }
  console.log(`  Found ${productTypeFiles.length} files, indexed ${entries.length - productTypeCountBefore} productTypes`);

  // Ensure public directory exists
  const publicDir = dirname(OUTPUT_FILE);
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }

  // Write output
  writeFileSync(OUTPUT_FILE, JSON.stringify(entries, null, 2));
  console.log(`\nWrote ${entries.length} entries to ${OUTPUT_FILE}`);

  // Show sample
  console.log('\nSample entries:');
  console.log(JSON.stringify(entries.slice(0, 2), null, 2));
}

main();
