/**
 * Shared utilities for search components.
 *
 * Centralizes URL building, icon mapping, and filter labels
 * so they stay consistent across SearchModal, SearchPage,
 * SearchResults, SearchEmptyState, and SearchResultItem.
 */

import type { SearchFilter } from "./useSearch";
import { withBase } from "@/lib/base-url";

/**
 * URL query param that, when present on any page load, auto-opens the global
 * search modal. Used by the side menu's "All" item to land on the home page and
 * drop the user straight into global search. Named distinctly from the tokens
 * page's own `?search=` filter param to avoid collision.
 */
export const SEARCH_OPEN_PARAM = "openSearch";

/** Home URL that auto-opens global search on arrival. */
export function searchHomeUrl(): string {
  return withBase(`/?${SEARCH_OPEN_PARAM}=1`);
}

/** Build a URL for a search result or history item by type + slug. */
export function getResultUrl(type: string, slug: string): string {
  if (type === "page") {
    return withBase(`/${slug}`);
  }
  if (type === "token") {
    return withBase(`/tokens?search=${slug}`);
  }
  const prefix = type === "component" ? "components" : "examples";
  return withBase(`/${prefix}/${slug}`);
}

/** Get the GoA icon name for a search entry type. */
export function getTypeIcon(type: string): string {
  switch (type) {
    case "page":
      return "document-text";
    case "component":
      return "shapes";
    case "example":
      return "browsers";
    case "token":
      return "code-slash";
    default:
      return "document-text";
  }
}

/** Get the display label for a search filter type. */
export function getFilterLabel(filter: SearchFilter): string {
  switch (filter) {
    case "page":
      return "get started";
    case "component":
      return "components";
    case "example":
      return "examples";
    case "token":
      return "tokens";
    default:
      return "";
  }
}
