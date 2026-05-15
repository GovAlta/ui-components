/**
 * SearchPage.tsx
 *
 * Standalone inline search component for the /search page.
 * Reuses the same search logic and components as the modal,
 * but renders inline rather than in a modal overlay.
 *
 * Features:
 * - URL parameter support (?q=query)
 * - Full search functionality (filters, history, results)
 * - Accessible with proper ARIA attributes
 * - Screen reader announcements for results
 */

import { useState, useEffect, useCallback, useRef, useId, useMemo } from "react";
import {
  useSearch,
  type SearchFilter,
  type SearchResult,
  type ComponentEntry,
  type ExampleEntry,
} from "./useSearch";
import { useSearchHistory, type HistoryItem } from "./useSearchHistory";
import { SearchResults } from "./SearchResults";
import {
  SearchFilterHints,
  shouldShowFilterHints,
  parseFilterCommand,
  getFilteredOptions,
  type FilterOption,
} from "./SearchFilterHints";
import { getFilterLabel, getResultUrl } from "./search-utils";
import "./search.css";

interface SearchPageProps {
  /** Initial query from URL parameter */
  initialQuery?: string;
}

/**
 * Simple search icon (magnifying glass).
 */
function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

/**
 * Detect if user is on Mac for keyboard shortcut display.
 */
function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  return navigator.platform.toLowerCase().includes("mac");
}

export function SearchPage({ initialQuery = "" }: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<SearchFilter>(null);
  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  const [hintSelectedIndex, setHintSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const announcementId = useId();

  const { search, isLoading, error, entries } = useSearch();
  const { history, addToHistory, clearHistory } = useSearchHistory();

  // Determine if we should show filter hints
  const showHints = shouldShowFilterHints(query);

  // Parse command and extract actual search query
  const parsed = parseFilterCommand(query);
  const searchQuery = parsed.filter ? parsed.query : query;
  const effectiveFilter = parsed.filter || activeFilter;

  // When a filter command is typed (e.g., "/example "), activate the filter and clear the command from input
  useEffect(() => {
    if (parsed.filter && parsed.command) {
      setActiveFilter(parsed.filter);
      setActiveCommand(parsed.command);
      setQuery(parsed.query); // Keep only the search term, remove the command
    }
  }, [parsed.filter, parsed.command, parsed.query]);

  // Run search when query changes
  // If filter is active but no query, show all items of that type
  const results = useMemo(
    () =>
      searchQuery.trim()
        ? search(searchQuery, effectiveFilter)
        : effectiveFilter
          ? entries
              .filter((e) => e.type === effectiveFilter)
              .map((e) => ({ ...e, score: 0 }))
          : [],
    [searchQuery, effectiveFilter, search, entries],
  );

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Update URL when query changes (without page reload)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) {
      url.searchParams.set("q", query);
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState({}, "", url.toString());
  }, [query]);

  /**
   * Handle filter selection from hints dropdown.
   */
  const handleFilterSelect = useCallback((option: FilterOption) => {
    setActiveFilter(option.filter);
    setActiveCommand(option.command);
    setQuery(""); // Clear input - the filter chip shows the active filter
    setHintSelectedIndex(0);
    inputRef.current?.focus();
  }, []);

  /**
   * Clear the active filter.
   */
  const clearFilter = useCallback(() => {
    setActiveFilter(null);
    setActiveCommand(null);
    setQuery("");
    inputRef.current?.focus();
  }, []);

  /**
   * Handle when a search result is clicked (for history tracking).
   */
  const handleResultClick = useCallback(
    (result: SearchResult) => {
      const title =
        result.type === "component"
          ? (result as ComponentEntry).name
          : (result as ExampleEntry).title;

      addToHistory({
        id: result.id,
        type: result.type,
        title,
        slug: result.slug,
        query: searchQuery || undefined,
      });
    },
    [addToHistory, searchQuery],
  );

  /**
   * Handle when a history item is clicked.
   */
  const handleHistoryClick = useCallback((item: HistoryItem) => {
    window.location.href = getResultUrl(item.type, item.slug);
  }, []);

  /**
   * Handle when a suggestion is clicked.
   */
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion);
  }, []);

  /**
   * Placeholder close function - not needed for inline but required by SearchResults
   */
  const handleClose = useCallback(() => {
    // No-op for inline search
  }, []);

  /**
   * Handle keyboard events on the search input.
   * Handles hint navigation (when hints are showing) and filter clearing.
   */
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace on empty input clears the active filter
    if (e.key === "Backspace" && query === "" && activeFilter) {
      e.preventDefault();
      clearFilter();
      return;
    }

    // Only handle hint navigation when hints are showing
    if (!showHints) return;

    const enabledOptions = getFilteredOptions(query).filter((opt) => !opt.disabled);
    if (enabledOptions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHintSelectedIndex((prev) =>
          prev < enabledOptions.length - 1 ? prev + 1 : prev,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHintSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;

      case "Enter":
        e.preventDefault();
        const selected = enabledOptions[hintSelectedIndex];
        if (selected) {
          handleFilterSelect(selected);
        }
        break;
    }
  };

  // Generate announcement text for screen readers
  const getAnnouncement = () => {
    if (isLoading) return "Loading search index...";
    if (error) return `Error loading search: ${error}`;
    if (!searchQuery.trim()) return "";
    if (results.length === 0) return `No results found for "${searchQuery}"`;
    return `Found ${results.length} result${results.length === 1 ? "" : "s"} for "${searchQuery}"`;
  };

  return (
    <div className="search-page" role="search" aria-label="Search the design system">
      {/* Screen reader announcement for results count */}
      <div
        id={announcementId}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {getAnnouncement()}
      </div>

      {/* Search input */}
      <div className="search-page-input-container">
        <span className="search-input-icon" aria-hidden="true">
          <SearchIcon />
        </span>

        {/* Active filter badge */}
        {effectiveFilter && (
          <button
            type="button"
            className="search-input-filter-badge"
            onClick={clearFilter}
            aria-label={`Clear filter: ${getFilterLabel(effectiveFilter)}`}
          >
            <span className="search-input-filter-badge-text">
              {getFilterLabel(effectiveFilter)}
            </span>
            <span className="search-input-filter-badge-x" aria-hidden="true">
              ×
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          type="text"
          className="search-input-field"
          placeholder={
            effectiveFilter
              ? `Search ${getFilterLabel(effectiveFilter)}...`
              : "Search components and examples... (type / to filter)"
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleInputKeyDown}
          aria-label="Search query"
          aria-describedby={announcementId}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        {/* Keyboard hint */}
        <span className="search-input-hint" aria-hidden="true">
          <span className="search-page-hint-text">
            or press <kbd className="search-input-kbd">{isMac() ? "⌘" : "Ctrl"}</kbd>
            <kbd className="search-input-kbd">K</kbd> anywhere
          </span>
        </span>
      </div>

      {/* Results container */}
      <div className="search-page-results">
        {showHints ? (
          <SearchFilterHints
            inputValue={query}
            onSelect={handleFilterSelect}
            selectedIndex={hintSelectedIndex}
            onSelectedIndexChange={setHintSelectedIndex}
          />
        ) : error ? (
          <div className="search-results">
            <div className="search-results-error" role="alert">
              <strong>Error loading search:</strong> {error}
              <p>
                Try refreshing the page. If the problem persists, search may be
                temporarily unavailable.
              </p>
            </div>
          </div>
        ) : (
          <SearchResults
            results={results}
            isLoading={isLoading}
            query={searchQuery}
            onClose={handleClose}
            history={history}
            onResultClick={handleResultClick}
            onHistoryClick={handleHistoryClick}
            onClearHistory={clearHistory}
            onSuggestionClick={handleSuggestionClick}
            activeFilter={effectiveFilter}
          />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
