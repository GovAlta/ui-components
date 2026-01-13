/**
 * tokens.ts
 *
 * Utilities for processing design tokens from @abgov/design-tokens
 * into a flat structure suitable for display in a data grid.
 */

// Import the global design tokens JSON
// Note: This will be resolved at build time by Astro/Vite
import globalTokens from '@abgov/design-tokens/data/goa-global-design-tokens.json';

/**
 * Flattened token structure for grid display
 */
export interface FlatToken {
  /** Full token name with CSS variable prefix (e.g., --goa-color-interactive-default) */
  name: string;
  /** Token value (resolved or raw) */
  value: string;
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
    typeof obj === 'object' &&
    obj !== null &&
    'value' in obj &&
    (typeof (obj as TokenValue).value === 'string' ||
      typeof (obj as TokenValue).value === 'number' ||
      typeof (obj as TokenValue).value === 'object')
  );
}

/**
 * Convert a path array to a CSS variable name
 * e.g., ['color', 'interactive', 'default'] -> '--goa-color-interactive-default'
 */
function pathToCssVar(path: string[]): string {
  return `--goa-${path.join('-')}`;
}

/**
 * Format a token value for display
 */
function formatValue(value: string | number | object): string {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return String(value);
  }
  // For complex values (like typography objects), stringify
  return JSON.stringify(value);
}

/**
 * Recursively flatten the nested token structure
 */
function flattenTokensRecursive(
  obj: Record<string, unknown>,
  path: string[] = [],
  results: FlatToken[] = []
): FlatToken[] {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...path, key];

    if (isTokenValue(value)) {
      // This is a leaf token
      const category = path[0] || key;
      const tokenPath = currentPath.slice(1).join('/');
      const tokenType = value.type || 'unknown';
      const isColor =
        tokenType === 'color' ||
        (typeof value.value === 'string' && value.value.startsWith('#'));

      results.push({
        name: pathToCssVar(currentPath),
        value: formatValue(value.value),
        category,
        path: tokenPath,
        type: tokenType,
        isColor,
        description: value.description,
      });
    } else if (typeof value === 'object' && value !== null) {
      // Recurse into nested object
      flattenTokensRecursive(value as Record<string, unknown>, currentPath, results);
    }
  }

  return results;
}

/**
 * Get all design tokens flattened for grid display
 */
export function getAllTokens(): FlatToken[] {
  return flattenTokensRecursive(globalTokens as Record<string, unknown>);
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
  'Border': ['borderRadius', 'borderWidth', 'border-none'],
  'Color': ['color'],
  'Typography': ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'typography'],
  'Icon': ['iconSize'],
  'Opacity': ['opacity'],
  'Shadow': ['shadow'],
  'Space': ['space'],
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
      t.value.toLowerCase().includes(term)
  );
}

/**
 * Sort tokens by name
 */
export function sortByName(tokens: FlatToken[], direction: 'asc' | 'desc' = 'asc'): FlatToken[] {
  return [...tokens].sort((a, b) => {
    const cmp = a.name.localeCompare(b.name);
    return direction === 'asc' ? cmp : -cmp;
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
