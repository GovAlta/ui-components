/**
 * useSearch Hook
 *
 * Provides client-side full-text search using FlexSearch.
 * Fetches the pre-built search index and initializes FlexSearch with field weighting.
 *
 * Usage:
 *   const { search, isLoading, error } = useSearch();
 *   const results = search('button');
 */

import { useState, useEffect, useCallback, useRef } from "react";
import FlexSearch from "flexsearch";
import { withBase } from "@/lib/base-url";

// ============================================================================
// Types
// ============================================================================

export interface ComponentEntry {
  type: "component";
  id: string;
  name: string;
  description?: string;
  status: string;
  category: string;
  tags: string[];
  slug: string;
}

export interface ExampleEntry {
  type: "example";
  id: string;
  title: string;
  description?: string;
  status: string;
  categories: string[];
  tags: string[];
  components: string[];
  scale: string;
  userType: string;
  slug: string;
}

export interface TokenEntry {
  type: "token";
  id: string;
  title: string;
  description?: string;
  status: string;
  tags: string[];
  slug: string; // category slug (e.g., "color", "space")
  category?: string;
}

export interface PageEntry {
  type: "page";
  id: string;
  title: string;
  name?: string;
  description?: string;
  status: string;
  tags: string[];
  slug: string; // URL path (e.g., "get-started/developers")
  category: string; // e.g., "get started"
}

export type SearchEntry = ComponentEntry | ExampleEntry | TokenEntry | PageEntry;

/**
 * SearchResult is a SearchEntry with an additional score property.
 * Using intersection type (not interface extends) to properly work with union types.
 */
export type SearchResult = SearchEntry & {
  /** Search relevance score (higher = more relevant) */
  score: number;
};

/** Filter type for limiting search results */
export type SearchFilter = "component" | "example" | "token" | "page" | null;

interface UseSearchReturn {
  /** Search function - returns results sorted by relevance and status */
  search: (query: string, filter?: SearchFilter) => SearchResult[];
  /** Whether the search index is still loading */
  isLoading: boolean;
  /** Error message if index failed to load */
  error: string | null;
  /** All entries (for browsing without search) */
  entries: SearchEntry[];
}

// ============================================================================
// Status Priority
// ============================================================================

/**
 * Type priority for sorting results.
 * Pages first, then components, tokens, examples.
 * Lower number = higher priority (appears first).
 */
const TYPE_PRIORITY: Record<string, number> = {
  page: 0,
  component: 1,
  token: 2,
  example: 3,
};

function getTypePriority(type: string): number {
  return TYPE_PRIORITY[type] ?? 3;
}

/**
 * Status priority for sorting results.
 * Lower number = higher priority (appears first).
 */
const STATUS_PRIORITY: Record<string, number> = {
  stable: 0,
  published: 0,
  beta: 1,
  experimental: 2,
  draft: 3,
  deprecated: 4,
};

function getStatusPriority(status: string): number {
  return STATUS_PRIORITY[status] ?? 5;
}

// ============================================================================
// FlexSearch Setup
// ============================================================================

/**
 * Create a FlexSearch index with field weighting.
 *
 * FlexSearch uses a Document index to search across multiple fields.
 * We weight fields differently:
 * - name/title: highest (exact matches matter most)
 * - tags: high (categorization is important)
 * - description: medium
 * - components (for examples): medium
 */
function createSearchIndex() {
  // FlexSearch Document index for multi-field search
  return new FlexSearch.Document<SearchEntry, string[]>({
    // Tokenize for partial matching
    tokenize: "forward",
    // Enable scoring
    resolution: 9,
    // Document fields to index
    document: {
      id: "id",
      index: [
        // Primary fields (highest weight via boost)
        {
          field: "name",
          tokenize: "forward",
          resolution: 9,
        },
        {
          field: "title",
          tokenize: "forward",
          resolution: 9,
        },
        // Secondary fields
        {
          field: "description",
          tokenize: "forward",
          resolution: 5,
        },
        {
          field: "tags",
          tokenize: "forward",
          resolution: 7,
        },
        {
          field: "components",
          tokenize: "forward",
          resolution: 6,
        },
        {
          field: "category",
          tokenize: "strict",
          resolution: 4,
        },
        {
          field: "categories",
          tokenize: "strict",
        },
        // Content field - includes token names for token entries
        {
          field: "content",
          tokenize: "forward",
          resolution: 4, // Lower weight than title/name but still searchable
        },
      ],
      // Store these fields for retrieval
      // Using explicit field list for TypeScript compatibility
      store: [
        "id",
        "type",
        "name",
        "title",
        "description",
        "status",
        "category",
        "categories",
        "tags",
        "components",
        "scale",
        "userType",
        "slug",
      ],
    },
  });
}

// ============================================================================
// Module-level cache (persists across component mounts)
// ============================================================================

interface SearchCache {
  index: ReturnType<typeof createSearchIndex>;
  entryMap: Map<string, SearchEntry>;
  entries: SearchEntry[];
}

let searchCache: SearchCache | null = null;
let cachePromise: Promise<SearchCache> | null = null;

/**
 * Load and cache the search index. Returns cached data if available.
 */
async function loadSearchIndex(): Promise<SearchCache> {
  // Return cached data if available
  if (searchCache) {
    return searchCache;
  }

  // Return pending promise if already loading
  if (cachePromise) {
    return cachePromise;
  }

  // Fetch and build the index
  cachePromise = (async () => {
    const response = await fetch(withBase("/search-index.json"));

    if (!response.ok) {
      throw new Error(`Failed to load search index: ${response.status}`);
    }

    const data: SearchEntry[] = await response.json();

    // Create the FlexSearch index
    const index = createSearchIndex();

    // Add all entries to the index
    const entryMap = new Map<string, SearchEntry>();
    for (const entry of data) {
      // FlexSearch needs a unique ID - combine type and id
      const uniqueId = `${entry.type}:${entry.id}`;
      entryMap.set(uniqueId, entry);

      // Add to index with the data FlexSearch needs
      index.add({
        ...entry,
        id: uniqueId,
        tags: entry.tags,
        name:
          entry.type === "component"
            ? (entry as ComponentEntry).name
            : entry.type === "page"
              ? (entry as PageEntry).name || ""
              : "",
        category:
          entry.type === "component"
            ? (entry as ComponentEntry).category
            : entry.type === "page"
              ? (entry as PageEntry).category
              : "",
        title:
          entry.type === "example"
            ? (entry as ExampleEntry).title
            : entry.type === "token"
              ? (entry as TokenEntry).title
              : entry.type === "page"
                ? (entry as PageEntry).title
                : "",
        categories: entry.type === "example" ? (entry as ExampleEntry).categories : [],
        components: entry.type === "example" ? (entry as ExampleEntry).components : [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }

    searchCache = { index, entryMap, entries: data };
    return searchCache;
  })().catch((error) => {
    // Clear the cached promise so the next call will retry
    cachePromise = null;
    throw error;
  });

  return cachePromise;
}

// ============================================================================
// Hook
// ============================================================================

export function useSearch(): UseSearchReturn {
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use ref for the index to avoid re-renders
  const indexRef = useRef<ReturnType<typeof createSearchIndex> | null>(null);
  // Map for quick entry lookup
  const entryMapRef = useRef<Map<string, SearchEntry>>(new Map());

  // Load the search index on mount (uses cache if available)
  useEffect(() => {
    // If cache exists, use it immediately
    if (searchCache) {
      indexRef.current = searchCache.index;
      entryMapRef.current = searchCache.entryMap;
      setEntries(searchCache.entries);
      setIsLoading(false);
      return;
    }

    // Otherwise, load the index
    loadSearchIndex()
      .then((cache) => {
        indexRef.current = cache.index;
        entryMapRef.current = cache.entryMap;
        setEntries(cache.entries);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load search index:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setIsLoading(false);
      });
  }, []);

  /**
   * Search for entries matching the query.
   *
   * Returns results sorted by:
   * 1. Search relevance score (from FlexSearch)
   * 2. Status priority (stable/published first)
   *
   * @param query - Search query string
   * @param filter - Optional filter to limit results to 'component' or 'example'
   */
  const search = useCallback(
    (query: string, filter?: SearchFilter, limit: number = 500): SearchResult[] => {
      if (!indexRef.current || !query.trim()) {
        return [];
      }

      // Search across all indexed fields
      // FlexSearch returns results per field, we need to merge them
      const searchResults = indexRef.current.search(query, {
        limit,
        enrich: true,
      });

      // Collect unique results with scores
      const scoreMap = new Map<string, number>();

      // FlexSearch returns array of field results
      for (const fieldResult of searchResults) {
        // Each field result has a `result` array
        const results = fieldResult.result;
        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          // Result can be string, number, or object with id property
          const id =
            typeof result === "string" || typeof result === "number"
              ? String(result)
              : (result as { id: string }).id;
          // Score based on position (earlier = higher score) and field
          // Field importance is already handled by resolution
          const positionScore = 1 - (i / results.length) * 0.5;
          const currentScore = scoreMap.get(id) || 0;
          scoreMap.set(id, currentScore + positionScore);
        }
      }

      // Convert to results array with scoring boosts
      const queryLower = query.toLowerCase().trim();

      const results: SearchResult[] = [];
      for (const [id, score] of scoreMap) {
        const entry = entryMapRef.current.get(id);
        if (entry) {
          let finalScore = score;

          // Exact name match boost: if query matches component/example/token name exactly
          // "button" query + "Button" component = exact match = big boost
          const entryName =
            entry.type === "component"
              ? (entry as ComponentEntry).name
              : entry.type === "token"
                ? (entry as TokenEntry).title
                : (entry as ExampleEntry).title;

          if (entryName.toLowerCase() === queryLower) {
            // Exact match - this is almost certainly what they want
            finalScore += 10;
          } else if (entryName.toLowerCase().startsWith(queryLower)) {
            // Name starts with query - also a strong signal
            // "but" query + "Button" component = starts with = medium boost
            finalScore += 3;
          }

          // Small boost for components over examples (tiebreaker)
          if (entry.type === "component") {
            finalScore += 0.5;
          }

          results.push({
            ...entry,
            score: finalScore,
          });
        }
      }

      // Sort by: score (includes type boost) → status
      results.sort((a, b) => {
        // First by score (component boost already included)
        const scoreDiff = b.score - a.score;
        if (Math.abs(scoreDiff) > 0.05) {
          return scoreDiff;
        }

        // Then by status priority (stable/published first)
        const aPriority = getStatusPriority(a.status);
        const bPriority = getStatusPriority(b.status);
        return aPriority - bPriority;
      });

      // Apply filter if specified
      if (filter) {
        return results.filter((result) => result.type === filter);
      }

      return results;
    },
    [],
  );

  return {
    search,
    isLoading,
    error,
    entries,
  };
}

export default useSearch;
