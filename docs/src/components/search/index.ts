/**
 * Search Module
 *
 * Exports the search components, hooks, and types.
 */

// Hooks and types
export {
  useSearch,
  default as useSearchDefault,
  type ComponentEntry,
  type ExampleEntry,
  type SearchEntry,
  type SearchResult,
} from "./useSearch";

export { useSearchHistory, type HistoryItem } from "./useSearchHistory";

// Components
export { SearchModal, default as SearchModalDefault } from "./SearchModal";
export { SearchPage, default as SearchPageDefault } from "./SearchPage";
export { SearchInput } from "./SearchInput";
export { SearchResults } from "./SearchResults";
export { SearchResultItem } from "./SearchResultItem";
export { SearchEmptyState } from "./SearchEmptyState";
export { SearchNoResults } from "./SearchNoResults";

// Config
export { quickLinks, popularSearches, type QuickLink } from "./quick-links";
