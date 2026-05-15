/**
 * tokens.ts
 *
 * Utilities for processing design tokens from @abgov/design-tokens
 * into a flat structure suitable for display in a data grid.
 */

// Import the global design tokens JSON
// Note: This will be resolved at build time by Astro/Vite
import globalTokens from "@abgov/design-tokens-v2/data/goa-global-design-tokens.json";

/**
 * Flattened token structure for grid display
 */
export interface FlatToken {
  /** Full token name with CSS variable prefix (e.g., --goa-color-interactive-default) */
  name: string;
  /** Token value as defined (may be a reference like {color.greyscale.300}) */
  value: string;
  /** Resolved value for preview (follows references to get actual hex, etc.) */
  resolvedValue: string;
  /** Top-level category (e.g., color, space, typography) */
  category: string;
  /** Sub-category path (e.g., interactive/default) */
  path: string;
  /** Token type from the source (e.g., color, spacing) */
  type: string;
  /** Whether this is a color token (for preview rendering) */
  isColor: boolean;
  /** Description if available */
  description?: string;
}

/**
 * Token value object structure from the JSON
 */
interface TokenValue {
  value: string | number | object;
  type?: string;
  description?: string;
}

/**
 * Check if an object is a token value (has a 'value' property)
 */
function isTokenValue(obj: unknown): obj is TokenValue {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "value" in obj &&
    (typeof (obj as TokenValue).value === "string" ||
      typeof (obj as TokenValue).value === "number" ||
      typeof (obj as TokenValue).value === "object")
  );
}

/**
 * Convert a path array to a CSS variable name
 * e.g., ['color', 'interactive', 'default'] -> '--goa-color-interactive-default'
 */
function toKebabCase(segment: string): string {
  // Insert a hyphen between a lowercase/digit character and the following uppercase character, then lowercase the full segment.
  return segment.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function pathToCssVar(path: string[]): string {
  return `--goa-${path.map(toKebabCase).join("-")}`;
}

/**
 * Check if a value is a box-shadow object (has x, y, blur, spread, color)
 */
function isBoxShadowObject(
  value: unknown,
): value is { x: string; y: string; blur: string; spread: string; color: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "x" in value &&
    "y" in value &&
    "blur" in value &&
    "spread" in value &&
    "color" in value
  );
}

/**
 * Convert a box-shadow object to CSS syntax
 */
function boxShadowToCss(shadow: {
  x: string;
  y: string;
  blur: string;
  spread: string;
  color: string;
}): string {
  return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
}

/**
 * Format a token value for display
 */
function formatValue(value: string | number | object): string {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return String(value);
  }
  // Convert box-shadow objects to CSS syntax
  if (isBoxShadowObject(value)) {
    return boxShadowToCss(value);
  }
  // For complex values (like typography objects), stringify
  return JSON.stringify(value);
}

/**
 * Check if a value is a token reference (e.g., "{color.greyscale.300}")
 */
function isTokenReference(value: string): boolean {
  return value.startsWith("{") && value.endsWith("}");
}

/**
 * Parse a token reference path (e.g., "{color.greyscale.300}" -> ["color", "greyscale", "300"])
 */
function parseTokenReference(value: string): string[] {
  const path = value.slice(1, -1); // Remove { and }
  return path.split(".");
}

/**
 * Resolve a token reference to its actual value.
 * Follows references recursively until a concrete value is found.
 */
function resolveTokenReference(
  value: string,
  tokens: Record<string, unknown>,
  maxDepth = 10,
): string {
  if (maxDepth <= 0) return value; // Prevent infinite loops
  if (!isTokenReference(value)) return value;

  const path = parseTokenReference(value);
  let current: unknown = tokens;

  for (const key of path) {
    if (typeof current !== "object" || current === null) {
      return value; // Path not found, return original
    }
    current = (current as Record<string, unknown>)[key];
  }

  if (isTokenValue(current)) {
    const resolvedValue = formatValue(current.value);
    // Recursively resolve if the found value is also a reference
    if (typeof resolvedValue === "string" && isTokenReference(resolvedValue)) {
      return resolveTokenReference(resolvedValue, tokens, maxDepth - 1);
    }
    return resolvedValue;
  }

  return value; // Couldn't resolve, return original
}

/**
 * Check if a value is a typography object (has fontFamily, fontSize, etc.)
 */
function isTypographyObject(
  value: unknown,
): value is Record<string, string> {
  return (
    typeof value === "object" &&
    value !== null &&
    ("fontFamily" in value || "fontSize" in value || "fontWeight" in value)
  );
}

/**
 * Resolve a typography object by resolving each property's reference
 */
function resolveTypographyObject(
  value: Record<string, string>,
  tokens: Record<string, unknown>,
): Record<string, string> {
  const resolved: Record<string, string> = {};
  for (const [key, val] of Object.entries(value)) {
    if (typeof val === "string" && isTokenReference(val)) {
      resolved[key] = resolveTokenReference(val, tokens);
    } else {
      resolved[key] = val;
    }
  }
  return resolved;
}

/**
 * Recursively flatten the nested token structure
 */
function flattenTokensRecursive(
  obj: Record<string, unknown>,
  rootTokens: Record<string, unknown>,
  path: string[] = [],
  results: FlatToken[] = [],
): FlatToken[] {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...path, key];

    if (isTokenValue(value)) {
      // This is a leaf token
      const category = path[0] || key;
      const tokenPath = currentPath.slice(1).join("/");
      const tokenType = value.type || "unknown";

      // Keep original value, resolve for preview
      const rawValue = formatValue(value.value);
      let resolvedValue: string;

      // Handle typography objects specially - resolve each property
      if (isTypographyObject(value.value)) {
        const resolved = resolveTypographyObject(value.value as Record<string, string>, rootTokens);
        resolvedValue = JSON.stringify(resolved);
      } else {
        resolvedValue =
          typeof rawValue === "string" ? resolveTokenReference(rawValue, rootTokens) : rawValue;
      }

      const isColor =
        tokenType === "color" ||
        (typeof resolvedValue === "string" && resolvedValue.startsWith("#"));

      results.push({
        name: pathToCssVar(currentPath),
        value: rawValue, // Original value (may be a reference)
        resolvedValue, // Resolved value for preview
        category,
        path: tokenPath,
        type: tokenType,
        isColor,
        description: value.description,
      });
    } else if (typeof value === "object" && value !== null) {
      // Recurse into nested object
      flattenTokensRecursive(value as Record<string, unknown>, rootTokens, currentPath, results);
    }
  }

  return results;
}

/**
 * Component-specific token prefixes to exclude from the global tokens display.
 * These are implementation details, not meant for direct consumer use.
 */
const EXCLUDED_TOKEN_PREFIXES = ["--goa-input-", "--goa-border-none", "--goa-fontVariationSettings"];

/**
 * Get all design tokens flattened for grid display
 */
export function getAllTokens(): FlatToken[] {
  const tokensObj = globalTokens as Record<string, unknown>;
  const allTokens = flattenTokensRecursive(tokensObj, tokensObj);

  // Filter out component-specific tokens
  return allTokens.filter(
    (token) => !EXCLUDED_TOKEN_PREFIXES.some((prefix) => token.name.startsWith(prefix)),
  );
}

/**
 * Get unique categories from all tokens
 */
export function getCategories(): string[] {
  const tokens = getAllTokens();
  const categories = new Set(tokens.map((t) => t.category));
  return Array.from(categories).sort();
}

/**
 * Filter group definitions - maps display names to token categories
 * Categories must match the top-level keys in the token JSON
 */
export const FILTER_GROUPS: Record<string, string[]> = {
  Border: ["borderRadius", "borderWidth", "border-none"],
  Color: ["color"],
  Typography: ["fontFamily", "fontSize", "fontWeight", "lineHeight", "typography"],
  Icon: ["iconSize"],
  Opacity: ["opacity"],
  Motion: ["motionCurve", "transition", "translate", "motionDuration"],
  Shadow: ["shadow"],
  Space: ["space"],
};

/**
 * Get filter groups for the UI
 * Returns array of { name, categories } objects
 */
export function getFilterGroups(): { name: string; categories: string[] }[] {
  return Object.entries(FILTER_GROUPS).map(([name, categories]) => ({
    name,
    categories,
  }));
}

/**
 * Get the filter group name for a category
 */
export function getCategoryFilterGroup(category: string): string | undefined {
  for (const [groupName, categories] of Object.entries(FILTER_GROUPS)) {
    if (categories.includes(category)) {
      return groupName;
    }
  }
  return undefined;
}

/**
 * Filter tokens by category
 */
export function filterByCategory(tokens: FlatToken[], category: string): FlatToken[] {
  if (!category) return tokens;
  return tokens.filter((t) => t.category === category);
}

/**
 * Filter tokens by search term (matches against name, path, or value)
 */
export function filterBySearch(tokens: FlatToken[], search: string): FlatToken[] {
  if (!search) return tokens;
  const term = search.toLowerCase();
  return tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(term) ||
      t.path.toLowerCase().includes(term) ||
      t.value.toLowerCase().includes(term),
  );
}

/**
 * Sort tokens by name
 */
export function sortByName(
  tokens: FlatToken[],
  direction: "asc" | "desc" = "asc",
): FlatToken[] {
  return [...tokens].sort((a, b) => {
    const cmp = a.name.localeCompare(b.name);
    return direction === "asc" ? cmp : -cmp;
  });
}

/**
 * Group tokens by category
 */
export function groupByCategory(tokens: FlatToken[]): Map<string, FlatToken[]> {
  const groups = new Map<string, FlatToken[]>();

  for (const token of tokens) {
    const existing = groups.get(token.category) || [];
    existing.push(token);
    groups.set(token.category, existing);
  }

  return groups;
}

// Export the raw tokens for direct access if needed
export { globalTokens };
