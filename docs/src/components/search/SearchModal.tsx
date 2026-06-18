/**
 * SearchModal.tsx
 *
 * Main search modal component that orchestrates:
 * - Backdrop (click to close)
 * - Modal container
 * - Focus trap when open
 * - Listens for goa-search-open custom event (from MobileHeader)
 * - Global Cmd+K / Ctrl+K listener to open
 *
 * Usage in Astro:
 *   <SearchModal client:only="react" />
 */

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  useSearch,
  type SearchFilter,
  type SearchResult,
  type ComponentEntry,
  type ExampleEntry,
} from "./useSearch";
import { useSearchHistory, type HistoryItem } from "./useSearchHistory";
import { SearchInput } from "./SearchInput";
import { SearchResults, type SearchResultsHandle } from "./SearchResults";
import {
  SearchFilterHints,
  FILTER_OPTIONS,
  shouldShowFilterHints,
  parseFilterCommand,
  getFilteredOptions,
  type FilterOption,
} from "./SearchFilterHints";
import { getResultUrl } from "./search-utils";
import "./search.css";

// ============================================================================
// SearchModalContent - Only mounts when modal is open
// ============================================================================

interface SearchModalContentProps {
  onClose: () => void;
  previousFocusRef: React.RefObject<HTMLElement | null>;
  initialFilter?: SearchFilter;
}

function SearchModalContent({
  onClose,
  previousFocusRef,
  initialFilter,
}: SearchModalContentProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<SearchFilter>(initialFilter ?? null);
  const [activeCommand, setActiveCommand] = useState<string | null>(() => {
    if (!initialFilter) return null;
    const option = FILTER_OPTIONS.find((opt) => opt.filter === initialFilter);
    return option?.command ?? null;
  });
  const [hintSelectedIndex, setHintSelectedIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchResultsRef = useRef<SearchResultsHandle>(null);

  // These hooks only run when the modal is open (component is mounted)
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

  // Run search when query changes (using the parsed query and filter)
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

  /**
   * Handle filter selection from hints dropdown.
   */
  const handleFilterSelect = useCallback((option: FilterOption) => {
    setActiveFilter(option.filter);
    setActiveCommand(option.command);
    setQuery(""); // Clear input - the filter chip shows the active filter
    setHintSelectedIndex(0);
  }, []);

  /**
   * Clear the active filter.
   */
  const clearFilter = useCallback(() => {
    setActiveFilter(null);
    setActiveCommand(null);
    setQuery("");
  }, []);

  /**
   * Close the modal and restore focus.
   * Note: scroll is restored in the outer SearchModal.closeModal()
   */
  const closeModal = useCallback(() => {
    onClose();
    setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 0);
  }, [onClose, previousFocusRef]);

  /**
   * Handle when a search result is clicked (for history tracking).
   */
  const handleResultClick = useCallback(
    (result: SearchResult) => {
      const title =
        result.type === "component"
          ? (result as ComponentEntry).name
          : (result as ExampleEntry).title;
      const category =
        result.type === "component" ? (result as ComponentEntry).category : undefined;

      addToHistory({
        id: result.id,
        type: result.type,
        title,
        slug: result.slug,
        category,
        query: searchQuery || undefined,
      });
    },
    [addToHistory, searchQuery],
  );

  /**
   * Handle when a history item is clicked.
   */
  const handleHistoryClick = useCallback(
    (item: HistoryItem) => {
      window.location.href = getResultUrl(item.type, item.slug);
      closeModal();
    },
    [closeModal],
  );

  /**
   * Handle when a suggestion is clicked.
   */
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion);
  }, []);

  /**
   * Handle backdrop click to close.
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  /**
   * Handle keyboard navigation for filter hints.
   */
  useEffect(() => {
    if (!showHints) return;

    const handleHintKeyDown = (e: KeyboardEvent) => {
      // Only handle when focus is on the search input — let other elements (close button, etc.) handle their own Enter
      const activeEl = document.activeElement;
      if (
        !activeEl ||
        !(activeEl instanceof HTMLInputElement && activeEl.type === "text")
      )
        return;

      // Get options filtered by input AND enabled status (same as displayed hints)
      const enabledOptions = getFilteredOptions(query).filter((opt) => !opt.disabled);
      if (enabledOptions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          e.stopPropagation();
          setHintSelectedIndex((prev) =>
            prev < enabledOptions.length - 1 ? prev + 1 : prev,
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          e.stopPropagation();
          setHintSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;

        case "Enter":
          e.preventDefault();
          e.stopPropagation();
          const selected = enabledOptions[hintSelectedIndex];
          if (selected) {
            handleFilterSelect(selected);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleHintKeyDown, true);
    return () => document.removeEventListener("keydown", handleHintKeyDown, true);
  }, [showHints, hintSelectedIndex, handleFilterSelect, query]);

  return (
    <div
      className="search-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Search the design system"
      aria-describedby="search-modal-description"
    >
      {/* @ts-expect-error - goa-focus-trap is a web component */}
      <goa-focus-trap open={true}>
        <div
          className="search-modal"
          ref={modalRef}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              closeModal();
            }
          }}
        >
          <span id="search-modal-description" className="sr-only">
            Use arrow keys to navigate results, Enter to select, Escape to close.
          </span>
          <SearchInput
            value={query}
            onChange={setQuery}
            onClose={closeModal}
            activeFilter={effectiveFilter}
            activeCommand={parsed.command || activeCommand}
            onClearFilter={clearFilter}
            onResultNav={(key) => searchResultsRef.current?.handleKeyDown(key)}
          />

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
                <strong>Unable to load search</strong>
                <p>
                  Please try refreshing the page. If the problem persists, search may be
                  temporarily unavailable.
                </p>
              </div>
            </div>
          ) : (
            <SearchResults
              ref={searchResultsRef}
              results={results}
              isLoading={isLoading}
              query={searchQuery}
              onClose={closeModal}
              history={history}
              onResultClick={handleResultClick}
              onHistoryClick={handleHistoryClick}
              onClearHistory={clearHistory}
              onSuggestionClick={handleSuggestionClick}
              activeFilter={effectiveFilter}
            />
          )}
        </div>
      </goa-focus-trap>
    </div>
  );
}

// ============================================================================
// SearchModal - Lightweight wrapper that handles open/close
// ============================================================================

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingFilter, setPendingFilter] = useState<SearchFilter>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /**
   * Open the search modal.
   */
  const openModal = useCallback((filter?: SearchFilter) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setPendingFilter(filter ?? null);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  /**
   * Close the search modal.
   */
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setPendingFilter(null);
    document.body.style.overflow = "";
  }, []);

  /**
   * Handle keyboard shortcut (Cmd+K / Ctrl+K).
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          closeModal();
        } else {
          openModal();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openModal, closeModal]);

  /**
   * Listen for goa-search-open custom event (from MobileHeader and SearchTrigger).
   */
  useEffect(() => {
    const handleSearchOpen = (e: Event) => {
      const filter = (e as CustomEvent).detail?.filter as SearchFilter | undefined;
      openModal(filter);
    };

    window.addEventListener("goa-search-open", handleSearchOpen);
    return () => window.removeEventListener("goa-search-open", handleSearchOpen);
  }, [openModal]);

  // Only render content when open - this is where lazy loading happens
  if (!isOpen) {
    return null;
  }

  return (
    <SearchModalContent
      onClose={closeModal}
      previousFocusRef={previousFocusRef}
      initialFilter={pendingFilter}
    />
  );
}

export default SearchModal;
