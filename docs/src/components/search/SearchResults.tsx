/**
 * SearchResults.tsx
 *
 * Container for search results with:
 * - Keyboard navigation (↑↓ to move, Enter to select)
 * - Progressive loading (15 results initially, "Show more" for rest)
 * - Loading, empty, and initial states
 */

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useId,
  useImperativeHandle,
  forwardRef,
} from "react";
import type {
  SearchResult,
  ComponentEntry,
  ExampleEntry,
  SearchFilter,
} from "./useSearch";
import type { HistoryItem } from "./useSearchHistory";
import { SearchResultItem } from "./SearchResultItem";
import { SearchEmptyState } from "./SearchEmptyState";
import { SearchNoResults } from "./SearchNoResults";
import { getResultUrl } from "./search-utils";

export interface SearchResultsHandle {
  /** Handle arrow/enter keyboard navigation from the search input */
  handleKeyDown: (key: string) => void;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
  onClose: () => void;
  /** Recent search history */
  history: HistoryItem[];
  /** Called when a search result is clicked (for history tracking) */
  onResultClick: (result: SearchResult) => void;
  /** Called when user clicks a history item */
  onHistoryClick: (item: HistoryItem) => void;
  /** Called to clear search history */
  onClearHistory: () => void;
  /** Called when user clicks a suggestion to search for it */
  onSuggestionClick: (suggestion: string) => void;
  /** Active filter - when set with empty query, show all items of that type */
  activeFilter?: SearchFilter;
}

/** Number of results to show initially */
const INITIAL_LIMIT = 15;
/** How many more to show on each "Show more" click */
const PAGE_SIZE = 15;

export const SearchResults = forwardRef<SearchResultsHandle, SearchResultsProps>(
  function SearchResults(
    {
      results,
      isLoading,
      query,
      onClose,
      history,
      onResultClick,
      onHistoryClick,
      onClearHistory,
      onSuggestionClick,
      activeFilter,
    },
    ref,
  ) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [displayLimit, setDisplayLimit] = useState(INITIAL_LIMIT);
    const listRef = useRef<HTMLUListElement>(null);
    const listboxId = useId();
    const announcementId = useId();

    // Reset selection when results change
    useEffect(() => {
      setSelectedIndex(0);
      setDisplayLimit(INITIAL_LIMIT);
    }, [results]);

    // Results to display (limited by displayLimit)
    const displayedResults = results.slice(0, displayLimit);
    const hasMore = results.length > displayLimit;

    /**
     * Handle keyboard navigation by key name.
     * Called by the search input via ref — no listeners needed here.
     */
    const handleKeyDown = useCallback(
      (key: string) => {
        if (displayedResults.length === 0) return;

        switch (key) {
          case "ArrowDown":
            setSelectedIndex((prev) =>
              prev < displayedResults.length - 1 ? prev + 1 : prev,
            );
            break;

          case "ArrowUp":
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
            break;

          case "Enter":
            const selected = displayedResults[selectedIndex];
            if (selected) {
              onResultClick(selected);
              window.location.href = getResultUrl(selected.type, selected.slug);
              onClose();
            }
            break;
        }
      },
      [displayedResults, selectedIndex, onClose, onResultClick],
    );

    // Expose navigation to parent via ref
    useImperativeHandle(ref, () => ({ handleKeyDown }), [handleKeyDown]);

    // Scroll selected item into view
    useEffect(() => {
      if (listRef.current) {
        const selected = listRef.current.querySelector('[data-selected="true"]');
        if (selected) {
          selected.scrollIntoView({ block: "nearest" });
        }
      }
    }, [selectedIndex]);

    const handleShowMore = () => {
      setDisplayLimit((prev) => prev + PAGE_SIZE);
    };

    // Loading state
    if (isLoading) {
      return (
        <div className="search-results">
          <div className="search-results-loading" role="status" aria-live="polite">
            <span>Loading search...</span>
          </div>
        </div>
      );
    }

    // Initial state (no query and no filter) - show empty state with history and quick links
    // When a filter is active, show all items of that type instead
    if (!query.trim() && !activeFilter) {
      return (
        <div className="search-results">
          <SearchEmptyState
            history={history}
            onHistoryClick={onHistoryClick}
            onClearHistory={onClearHistory}
            onQuickLinkClick={onClose}
          />
        </div>
      );
    }

    // No results - show suggestions
    if (results.length === 0) {
      return (
        <div className="search-results">
          <SearchNoResults query={query} onSuggestionClick={onSuggestionClick} />
        </div>
      );
    }

    // Get the active descendant ID for accessibility
    const activeResult = displayedResults[selectedIndex];
    const activeDescendantId = activeResult
      ? `search-result-${activeResult.type}-${activeResult.id}`
      : undefined;

    return (
      <div className="search-results">
        {/* Screen reader announcement for results count */}
        <div
          id={announcementId}
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {results.length > 0
            ? `${results.length} result${results.length === 1 ? "" : "s"} found`
            : query.trim()
              ? "No results found"
              : ""}
        </div>

        <ul
          id={listboxId}
          className="search-results-list"
          ref={listRef}
          role="listbox"
          aria-label="Search results"
          aria-activedescendant={activeDescendantId}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              const items =
                listRef.current?.querySelectorAll<HTMLElement>("a.search-result-item");
              if (!items || items.length === 0) return;
              const currentIndex = Array.from(items).indexOf(e.target as HTMLElement);
              const fromIndex = currentIndex >= 0 ? currentIndex : selectedIndex;
              const nextIndex =
                e.key === "ArrowDown"
                  ? Math.min(fromIndex + 1, items.length - 1)
                  : Math.max(fromIndex - 1, 0);
              items[nextIndex].focus();
              setSelectedIndex(nextIndex);
            }
            // Enter: don't intercept — let the focused <a> navigate natively
          }}
        >
          {displayedResults.map((result, index) => (
            <SearchResultItem
              key={`${result.type}:${result.id}`}
              result={result}
              isSelected={index === selectedIndex}
              onClick={onClose}
              onNavigate={onResultClick}
            />
          ))}
        </ul>

        {hasMore && (
          <div className="search-results-more">
            <button
              type="button"
              className="search-results-more-button"
              onClick={handleShowMore}
            >
              Show more ({results.length - displayLimit} remaining)
            </button>
          </div>
        )}
      </div>
    );
  },
);

export default SearchResults;
