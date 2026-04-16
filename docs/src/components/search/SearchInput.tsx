/**
 * SearchInput.tsx
 *
 * Search input field with:
 * - Search icon (leading)
 * - Close button (trailing)
 * - Keyboard hint badge showing ⌘K (desktop only)
 * - Auto-focus on mount
 */

import { useEffect, useRef } from "react";
import type { SearchFilter } from "./useSearch";
import { getFilterLabel } from "./search-utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose?: () => void;
  /** Currently active filter (if any) */
  activeFilter?: SearchFilter;
  /** The command that activated the filter (e.g., "/component") */
  activeCommand?: string | null;
  /** Called when user clicks to clear the filter */
  onClearFilter?: () => void;
  /** Forward arrow/enter keys to results navigation */
  onResultNav?: (key: string) => void;
  /** Whether to auto-focus the input on mount (default: true) */
  autoFocus?: boolean;
  /** Override the default placeholder text */
  placeholder?: string;
}

/**
 * Simple search icon (magnifying glass).
 * Using inline SVG to avoid external dependencies.
 */
function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={20}
      height={20}
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
 * Close icon (X).
 */
function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={18}
      height={18}
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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

export function SearchInput({
  value,
  onChange,
  onClose,
  activeFilter,
  activeCommand,
  onClearFilter,
  onResultNav,
  autoFocus = true,
  placeholder: placeholderOverride,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when mounted (can be disabled for inline usage)
  useEffect(() => {
    if (!autoFocus) return;
    // Small delay to ensure modal animation completes
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Escape closes the modal/dropdown
    if (e.key === "Escape") {
      e.preventDefault();
      onClose?.();
    }
    // Backspace on empty input clears the active filter
    if (e.key === "Backspace" && value === "" && activeFilter) {
      e.preventDefault();
      onClearFilter?.();
    }
    // Forward arrow/enter to results navigation
    if (
      onResultNav &&
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(e.key)
    ) {
      e.preventDefault();
      onResultNav(e.key);
    }
  };

  // Determine the placeholder text based on filter
  const placeholder = placeholderOverride
    ? placeholderOverride
    : activeFilter
      ? `Search ${getFilterLabel(activeFilter)}...`
      : "Search components and examples... (type / to filter)";

  return (
    <div className="search-input-container">
      {/* Search icon */}
      <span className="search-input-icon" aria-hidden="true">
        <SearchIcon />
      </span>

      {/* Active filter badge */}
      {activeFilter && (
        <button
          type="button"
          className="search-input-filter-badge"
          onClick={onClearFilter}
          aria-label={`Clear filter: ${getFilterLabel(activeFilter)}`}
        >
          <span className="search-input-filter-badge-text">
            {getFilterLabel(activeFilter)}
          </span>
          <span className="search-input-filter-badge-x" aria-hidden="true">
            ×
          </span>
        </button>
      )}

      {/* Input field */}
      <input
        ref={inputRef}
        type="text"
        className="search-input-field"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label="Search"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {/* Keyboard hint (desktop only, hidden via CSS on mobile, only in modal) */}
      {autoFocus && (
        <span className="search-input-hint" aria-hidden="true">
          <kbd className="search-input-kbd">{isMac() ? "⌘" : "Ctrl"}</kbd>
          <kbd className="search-input-kbd">K</kbd>
        </span>
      )}

      {/* Close button (hidden when onClose is not provided) */}
      {onClose && (
        <button
          type="button"
          className="search-input-close"
          onClick={onClose}
          aria-label="Close search"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
