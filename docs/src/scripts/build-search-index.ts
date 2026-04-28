/**
 * Build Search Index Script
 *
 * Extracts searchable content from MDX files and outputs a JSON index.
 * Run with: npm run build:search-index
 *
 * The index is consumed by useSearch.ts at runtime for client-side search.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Get directory paths relative to this script
// Script is in docs/src/scripts/, so go up two levels to docs/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '../..');

// Content directories
const COMPONENTS_DIR = join(ROOT, 'src/content/components');
const EXAMPLES_DIR = join(ROOT, 'src/content/examples');
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
  size: string;              // "interaction" | "section" | "page" | "flow" | "product"
  productType?: string;      // "workspace" | "public-form"
  tags: string[];
  components: string[];      // What components this example uses
  aliases: string[];         // Secondary slugs that surface this entry in search
  slug: string;
}

type SearchEntry = ComponentEntry | ExampleEntry;

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
    if (frontmatter.hidden === true || frontmatter.hidden === 'true') {
      return null;
    }

    return {
      type: 'component',
      id,
      name: String(frontmatter.name || id),
      description: frontmatter.description ? String(frontmatter.description) : undefined,
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
 */
function processExample(filePath: string): ExampleEntry | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);

    // Get ID from directory name
    const dirName = basename(dirname(filePath));
    const id = String(frontmatter.id || dirName);

    // Extract description from body if not in frontmatter
    const description = frontmatter.description
      ? String(frontmatter.description)
      : extractFirstParagraph(body);

    return {
      type: 'example',
      id,
      title: String(frontmatter.title || id),
      description,
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
      slug: String(frontmatter.slug || id),
    };
  } catch (error) {
    console.error(`Error processing example ${filePath}:`, error);
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

  for (const entry of readdirSync(dir)) {
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
