import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";

interface DocIndex {
  id: string;
  title: string;
  name?: string;  // For components - useSearch expects this
  description: string;
  content: string;
  component: string;
  filePath: string;
  urlPath: string;
  tags: string[];
  /** Entry type - must match what useSearch.ts expects */
  type: "component" | "example" | "token" | "page";
  /** URL slug for building links */
  slug: string;
  /** Status for sorting (stable, beta, etc.) */
  status?: string;
  /** Category for components */
  category?: string;
  /** Categories array for examples */
  categories?: string[];
}

interface FrontMatter {
  title?: string;
  tags?: string[];
  description?: string;
  [key: string]: any;
}

/**
 * Token category metadata for search entries
 */
interface TokenCategoryMeta {
  title: string;
  description: string;
  tags: string[];
}

/**
 * Metadata for each token category
 */
const TOKEN_CATEGORY_META: Record<string, TokenCategoryMeta> = {
  color: {
    title: "Color Tokens",
    description: "Color design tokens for text, backgrounds, borders, interactive elements, and status indicators",
    tags: ["token", "color", "design token", "palette", "theme"],
  },
  opacity: {
    title: "Opacity Tokens",
    description: "Opacity values for overlays, disabled states, and transparency effects",
    tags: ["token", "opacity", "transparency", "design token"],
  },
  borderRadius: {
    title: "Border Radius Tokens",
    description: "Border radius values for rounded corners on cards, buttons, and containers",
    tags: ["token", "border", "radius", "corners", "design token"],
  },
  borderWidth: {
    title: "Border Width Tokens",
    description: "Border width values for outlines, dividers, and component borders",
    tags: ["token", "border", "width", "stroke", "design token"],
  },
  space: {
    title: "Spacing Tokens",
    description: "Spacing values for margins, padding, and gaps between elements",
    tags: ["token", "space", "spacing", "margin", "padding", "gap", "design token"],
  },
  iconSize: {
    title: "Icon Size Tokens",
    description: "Standard icon sizes for consistent iconography across the design system",
    tags: ["token", "icon", "size", "design token"],
  },
  shadow: {
    title: "Shadow Tokens",
    description: "Box shadow values for elevation and depth effects on cards and modals",
    tags: ["token", "shadow", "elevation", "depth", "design token"],
  },
  typography: {
    title: "Typography Tokens",
    description: "Typography presets combining font family, size, weight, and line height",
    tags: ["token", "typography", "font", "text", "heading", "body", "design token"],
  },
  fontFamily: {
    title: "Font Family Tokens",
    description: "Font family values for the design system typefaces",
    tags: ["token", "font", "family", "typeface", "design token"],
  },
  fontSize: {
    title: "Font Size Tokens",
    description: "Font size values for text hierarchy and responsive typography",
    tags: ["token", "font", "size", "typography", "design token"],
  },
  fontWeight: {
    title: "Font Weight Tokens",
    description: "Font weight values for text emphasis and hierarchy",
    tags: ["token", "font", "weight", "bold", "design token"],
  },
  lineHeight: {
    title: "Line Height Tokens",
    description: "Line height values for readable text and proper vertical rhythm",
    tags: ["token", "line", "height", "leading", "typography", "design token"],
  },
  letterSpacing: {
    title: "Letter Spacing Tokens",
    description: "Letter spacing values for text tracking adjustments",
    tags: ["token", "letter", "spacing", "tracking", "typography", "design token"],
  },
};

/**
 * Categories to exclude from search (internal implementation details)
 */
const EXCLUDED_TOKEN_CATEGORIES = [
  "input",
  "border-none",
  "fontVariationSettings",
  "translate",
  "motionCurve",
  "motionDuration",
  "transition",
];

/**
 * Static page entries for docs pages (Get Started, Foundations, etc.)
 * These are manually defined since Astro pages don't have easily parseable metadata.
 */
interface PageMeta {
  id: string;
  title: string;
  description: string;
  urlPath: string;
  tags: string[];
  category: string;
}

const PAGE_ENTRIES: PageMeta[] = [
  // Get Started pages
  {
    id: "get-started",
    title: "Get started",
    description: "Introduction to the GoA Design System early adopters program",
    urlPath: "get-started",
    tags: ["get started", "introduction", "onboarding"],
    category: "get started",
  },
  {
    id: "get-started-developers",
    title: "Get started as a developer",
    description: "Developer onboarding: package setup, template repo, branches, and compatibility",
    urlPath: "get-started/developers",
    tags: ["get started", "developer", "setup", "installation", "packages", "npm"],
    category: "get started",
  },
  {
    id: "get-started-designers",
    title: "Get started as a designer",
    description: "Designer onboarding: Figma libraries, BETA components, and illustration requests",
    urlPath: "get-started/designers",
    tags: ["get started", "designer", "figma", "libraries", "illustrations"],
    category: "get started",
  },
];

/**
 * Generate search index entries for static pages
 */
function generatePageEntries(): DocIndex[] {
  console.log("\nIndexing static pages...");

  const entries: DocIndex[] = PAGE_ENTRIES.map(page => ({
    id: page.id,
    title: page.title,
    name: page.title,
    description: page.description,
    content: "",
    component: "",
    filePath: `docs/src/pages/${page.urlPath}`,
    urlPath: page.urlPath,
    tags: page.tags,
    type: "page" as const,
    slug: page.urlPath,
    status: "stable",
    category: page.category,
  }));

  entries.forEach(e => console.log(`  ✓ Indexed: ${e.title}`));
  return entries;
}

/**
 * Convert a token path to CSS variable format
 */
function pathToCssVar(pathParts: string[]): string {
  return `--goa-${pathParts.join("-")}`;
}

/**
 * Check if an object is a token value (has a 'value' property)
 */
function isTokenValue(obj: unknown): obj is { value: unknown } {
  return typeof obj === "object" && obj !== null && "value" in obj;
}

/**
 * Recursively extract all token names from a category
 */
function extractTokenNames(
  obj: Record<string, unknown>,
  pathParts: string[] = [],
): string[] {
  const names: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...pathParts, key];

    if (isTokenValue(value)) {
      names.push(pathToCssVar(currentPath));
    } else if (typeof value === "object" && value !== null) {
      names.push(...extractTokenNames(value as Record<string, unknown>, currentPath));
    }
  }

  return names;
}

/**
 * Generate a human-readable description for a token based on its name
 */
function generateTokenDescription(tokenName: string, category: string): string {
  // Remove --goa- prefix and category for cleaner description
  const shortName = tokenName.replace(/^--goa-/, "").replace(new RegExp(`^${category}-?`), "");
  const categoryMeta = TOKEN_CATEGORY_META[category];
  const categoryLabel = categoryMeta?.title.replace(" Tokens", "").toLowerCase() || category;

  if (!shortName) {
    return `${categoryMeta?.title || category} design token`;
  }

  // Convert kebab-case to readable format
  const readable = shortName.replace(/-/g, " ");
  return `${categoryLabel} token: ${readable}`;
}

/**
 * Generate search index entries for design tokens
 * Creates both category entries (for browsing) and individual token entries (for direct search)
 */
function generateTokenEntries(): DocIndex[] {
  const tokenPath = path.join(
    process.cwd(),
    "node_modules",
    "@abgov",
    "design-tokens-v2",
    "data",
    "goa-global-design-tokens.json",
  );

  if (!fs.existsSync(tokenPath)) {
    console.warn("  ⚠ Design tokens not found, skipping token indexing");
    return [];
  }

  const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));
  const entries: DocIndex[] = [];

  console.log("\nIndexing design tokens...");

  let totalIndividualTokens = 0;

  for (const [category, categoryTokens] of Object.entries(tokens)) {
    // Skip excluded categories
    if (EXCLUDED_TOKEN_CATEGORIES.includes(category)) {
      continue;
    }

    const meta = TOKEN_CATEGORY_META[category];
    if (!meta) {
      // Skip categories without metadata (likely internal)
      continue;
    }

    // Extract all token names in this category
    const tokenNames = extractTokenNames(
      { [category]: categoryTokens },
      [],
    );

    // Add category entry (for browsing by category)
    const categoryEntry: DocIndex = {
      id: `tokens-${category}`,
      title: meta.title,
      description: meta.description,
      content: tokenNames.join(" "),
      component: "",
      filePath: "design-tokens",
      urlPath: "tokens",
      tags: meta.tags,
      type: "token",
      slug: category,  // e.g., "color", "space" - used for building URL
      status: "stable",
      category: category,
    };
    entries.push(categoryEntry);

    // Add individual token entries (for direct search)
    for (const tokenName of tokenNames) {
      // Convert --goa-color-greyscale-100 to color-greyscale-100 for URL slug
      const tokenSlug = tokenName.replace(/^--goa-/, "");

      const tokenEntry: DocIndex = {
        id: `token-${tokenSlug}`,
        title: tokenName,  // Full CSS variable name: --goa-color-greyscale-100
        name: tokenName,
        description: generateTokenDescription(tokenName, category),
        content: "",  // Individual tokens don't need searchable content
        component: "",
        filePath: "design-tokens",
        urlPath: "tokens",
        tags: ["token", "design token", category],
        type: "token",
        slug: tokenSlug,  // Used for URL: /tokens?search=color-greyscale-100
        status: "stable",
        category: category,
      };
      entries.push(tokenEntry);
      totalIndividualTokens++;
    }

    console.log(`  ✓ Indexed: ${meta.title} (${tokenNames.length} tokens)`);
  }

  console.log(`  → Total individual tokens indexed: ${totalIndividualTokens}`);

  return entries;
}

async function generateSearchIndex() {
  // Index component documentation from content folder
  const componentsPattern = "docs/src/content/components/*.mdx";
  const componentFiles = await glob(componentsPattern, {
    cwd: process.cwd(),
    nodir: true,
  });

  console.log(`Found ${componentFiles.length} component documentation files`);

  const index: DocIndex[] = [];

  for (const filePath of componentFiles) {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      const content = fs.readFileSync(fullPath, "utf-8");

      const componentName = extractComponentName(filePath);
      const { frontMatter, bodyContent } = parseFrontMatter(content);
      const title = frontMatter.name || frontMatter.title || extractTitle(bodyContent);
      const tags = frontMatter.tags || [];
      const description = frontMatter.description || extractDescription(bodyContent);

      const docEntry: DocIndex = {
        id: componentName,
        title: title || componentName,
        name: title || componentName,  // useSearch expects 'name' for components
        description,
        content: bodyContent,
        component: componentName,
        filePath: filePath,
        urlPath: `components/${componentName}`,
        tags: tags,
        type: "component",
        slug: componentName,
        status: frontMatter.status || "stable",
        category: frontMatter.category || "general",
      };

      index.push(docEntry);
      console.log(`  ✓ Indexed: ${componentName}`);
    } catch (error) {
      console.error(`  ✗ Error processing ${filePath}:`, error);
    }
  }

  // Index examples from content folder
  const examplesPattern = "docs/src/content/examples/*/index.mdx";
  const exampleFiles = await glob(examplesPattern, {
    cwd: process.cwd(),
    nodir: true,
  });

  console.log(`\nFound ${exampleFiles.length} example documentation files`);

  for (const filePath of exampleFiles) {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      const content = fs.readFileSync(fullPath, "utf-8");

      // Extract slug from path (e.g., "add-a-filter-chip" from "docs/src/content/examples/add-a-filter-chip/index.mdx")
      const pathParts = filePath.split(path.sep);
      const exampleSlug = pathParts[pathParts.length - 2];

      const { frontMatter, bodyContent } = parseFrontMatter(content);
      const title = frontMatter.title || exampleSlug;
      const tags = frontMatter.tags || [];
      const description = frontMatter.description || extractDescription(bodyContent);

      // Handle components field - could be array or undefined
      const components = Array.isArray(frontMatter.components)
        ? frontMatter.components.join(", ")
        : "";

      const docEntry: DocIndex = {
        id: `example-${exampleSlug}`,
        title: title,
        description,
        content: bodyContent,
        component: components,
        filePath: filePath,
        urlPath: `examples/${exampleSlug}`,
        tags: [...tags, "example", "pattern"],
        type: "example",
        slug: exampleSlug,
        status: frontMatter.status || "published",
        categories: Array.isArray(frontMatter.categories) ? frontMatter.categories : [],
      };

      index.push(docEntry);
      console.log(`  ✓ Indexed: ${title}`);
    } catch (error) {
      console.error(`  ✗ Error processing ${filePath}:`, error);
    }
  }

  // Add design token entries
  const tokenEntries = generateTokenEntries();
  index.push(...tokenEntries);

  // Add static page entries (Get Started, etc.)
  const pageEntries = generatePageEntries();
  index.push(...pageEntries);

  const outputPath = path.join(process.cwd(), "docs", "search-index.json");
  const publicOutputPath = path.join(
    process.cwd(),
    "docs",
    "public",
    "search-index.json",
  );

  const indexJson = JSON.stringify(index, null, 2);
  fs.writeFileSync(outputPath, indexJson, "utf-8");

  if (!fs.existsSync(path.join(process.cwd(), "docs", "public"))) {
    fs.mkdirSync(path.join(process.cwd(), "docs", "public"), { recursive: true });
  }
  fs.writeFileSync(publicOutputPath, indexJson, "utf-8");

  console.log(`\n✓ Search index generated successfully!`);
  console.log(`  Location: ${outputPath}`);
  console.log(`  Public location: ${publicOutputPath}`);
  console.log(`  Total entries: ${index.length}`);
}

function extractComponentName(filePath: string): string {
  const parts = filePath.split(path.sep);
  const fileName = parts[parts.length - 1];

  return fileName.replace(".mdx", "");
}

function extractTitle(content: string): string {
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) {
      return trimmed.substring(2).trim();
    }
  }

  return "";
}

// extract out the content between the h1 and first h2 tag
function extractDescription(content: string): string {
  const lines = content.split("\n");
  const desc: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) {
      continue;
    }
    if (trimmed.startsWith("## ")) {
      break;
    }
    desc.push(trimmed);
  }

  return desc.join(" ");
}

function parseFrontMatter(content: string): {
  frontMatter: FrontMatter;
  bodyContent: string;
} {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { frontMatter: {}, bodyContent: content };
  }

  const [, frontMatterText, bodyContent] = match;
  const frontMatter: FrontMatter = {};

  const lines = frontMatterText.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const colonIndex = trimmed.indexOf(":");
    if (colonIndex === -1) continue;

    const key = trimmed.substring(0, colonIndex).trim();
    const value = trimmed.substring(colonIndex + 1).trim();

    if (key === "tags") {
      try {
        const tagsMatch = value.match(/\[(.*?)\]/);
        if (tagsMatch) {
          frontMatter.tags = tagsMatch[1]
            .split(",")
            .map((tag) => tag.trim().replace(/['"]/g, ""))
            .filter((tag) => tag.length > 0);
        }
      } catch (error) {
        console.warn(`Failed to parse tags for line: ${line}`);
      }
    } else {
      frontMatter[key] = value.replace(/^['"]|['"]$/g, "");
    }
  }

  return { frontMatter, bodyContent };
}

generateSearchIndex().catch((error) => {
  console.error("Failed to generate search index:", error);
  process.exit(1);
});
