/**
 * Shared utilities for search components.
 *
 * Centralizes URL building, icon mapping, and filter labels
 * so they stay consistent across SearchModal, SearchPage,
 * SearchResults, SearchEmptyState, and SearchResultItem.
 */

import type { SearchFilter } from "./useSearch";

/** Build a URL for a search result or history item by type + slug. */
export function getResultUrl(type: string, slug: string): string {
  if (type === "page") {
    return `/${slug}`;
  }
  if (type === "token") {
    return `/tokens?search=${slug}`;
  }
  const prefix = type === "component" ? "components" : "examples";
  return `/${prefix}/${slug}`;
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
