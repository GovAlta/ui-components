/**
 * SearchFilterHints.tsx
 *
 * Dropdown shown when user types "/" in search input.
 * Displays available filter commands:
 * - /get-started (/g) - Filter to get started pages only
 * - /component (/c) - Filter to components only
 * - /example (/e) - Filter to examples only
 * - /token (/t) - Filter to design tokens only
 *
 * Supports keyboard navigation (↑↓) and selection (Enter/click).
 */

import { useEffect, useState } from 'react';
import type { SearchFilter } from './useSearch';

export interface FilterOption {
  /** Command to type (e.g., "/component") */
  command: string;
  /** Short alias (e.g., "/c") */
  alias: string;
  /** Display label */
  label: string;
  /** Description shown below label */
  description: string;
  /** Filter value to apply (null for disabled options) */
  filter: SearchFilter;
  /** Whether this option is disabled (coming soon) */
  disabled?: boolean;
}

/** Available filter commands */
export const FILTER_OPTIONS: FilterOption[] = [
  {
    command: '/get-started',
    alias: '/g',
    label: 'Get started',
    description: 'Search only get started pages',
    filter: 'page',
  },
  {
    command: '/component',
    alias: '/c',
    label: 'Components',
    description: 'Search only components',
    filter: 'component',
  },
  {
    command: '/example',
    alias: '/e',
    label: 'Examples',
    description: 'Search only examples',
    filter: 'example',
  },
  {
    command: '/token',
    alias: '/t',
    label: 'Tokens',
    description: 'Search only design tokens',
    filter: 'token',
  },
];

interface SearchFilterHintsProps {
  /** Current input value to filter hints */
  inputValue: string;
  /** Called when a filter is selected */
  onSelect: (option: FilterOption) => void;
  /** Currently selected index (for keyboard navigation) */
  selectedIndex: number;
  /** Callback to change selected index */
  onSelectedIndexChange: (index: number) => void;
}

/**
 * Check if input matches a filter command prefix.
 * Returns true if:
 * - Input is exactly "/"
 * - Input starts with "/" and partially matches a command or alias
 */
export function shouldShowFilterHints(inputValue: string): boolean {
  if (!inputValue.startsWith('/')) return false;

  // Exact "/" shows all hints
  if (inputValue === '/') return true;

  // Check if input matches any command prefix (but not a complete command with space)
  const hasSpace = inputValue.includes(' ');
  if (hasSpace) return false;

  const lower = inputValue.toLowerCase();
  return FILTER_OPTIONS.some(
    opt =>
      opt.command.toLowerCase().startsWith(lower) ||
      opt.alias.toLowerCase().startsWith(lower)
  );
}

/**
 * Parse a filter command from input.
 * Returns the filter and remaining query if a complete command is found.
 *
 * Examples:
 * - "/component button" → { filter: 'component', query: 'button' }
 * - "/c modal" → { filter: 'component', query: 'modal' }
 * - "button" → { filter: null, query: 'button' }
 */
export function parseFilterCommand(input: string): {
  filter: SearchFilter;
  query: string;
  command: string | null;
} {
  if (!input.startsWith('/')) {
    return { filter: null, query: input, command: null };
  }

  const spaceIndex = input.indexOf(' ');
  if (spaceIndex === -1) {
    // No space yet - could be typing a command
    return { filter: null, query: '', command: null };
  }

  const commandPart = input.slice(0, spaceIndex).toLowerCase();
  const queryPart = input.slice(spaceIndex + 1);

  // Find matching command
  for (const opt of FILTER_OPTIONS) {
    if (
      !opt.disabled &&
      (opt.command.toLowerCase() === commandPart ||
        opt.alias.toLowerCase() === commandPart)
    ) {
      return { filter: opt.filter, query: queryPart, command: opt.command };
    }
  }

  // No matching command - treat whole input as query
  return { filter: null, query: input, command: null };
}

/**
 * Get filtered options based on current input.
 */
export function getFilteredOptions(inputValue: string): FilterOption[] {
  if (inputValue === '/') {
    return FILTER_OPTIONS;
  }

  const lower = inputValue.toLowerCase();
  return FILTER_OPTIONS.filter(
    opt =>
      opt.command.toLowerCase().startsWith(lower) ||
      opt.alias.toLowerCase().startsWith(lower)
  );
}

export function SearchFilterHints({
  inputValue,
  onSelect,
  selectedIndex,
  onSelectedIndexChange,
}: SearchFilterHintsProps) {
  const options = getFilteredOptions(inputValue);

  // Reset selection when options change
  useEffect(() => {
    if (selectedIndex >= options.length) {
      onSelectedIndexChange(0);
    }
  }, [options.length, selectedIndex, onSelectedIndexChange]);

  // Don't render if no options match
  if (options.length === 0) {
    return null;
  }

  return (
    <div className="search-filter-hints" role="listbox">
      <div className="search-filter-hints-header">Filter by type</div>
      <ul className="search-filter-hints-list">
        {options.map((option, index) => (
          <li
            key={option.command}
            className={`search-filter-hints-item ${option.disabled ? 'search-filter-hints-item--disabled' : ''}`}
            data-selected={index === selectedIndex}
            role="option"
            aria-selected={index === selectedIndex}
            aria-disabled={option.disabled}
            onClick={() => {
              if (!option.disabled) {
                onSelect(option);
              }
            }}
            onMouseEnter={() => {
              if (!option.disabled) {
                onSelectedIndexChange(index);
              }
            }}
          >
            <div className="search-filter-hints-item-main">
              <span className="search-filter-hints-command">{option.command}</span>
              <span className="search-filter-hints-alias">({option.alias})</span>
            </div>
            <div className="search-filter-hints-description">
              {option.description}
            </div>
          </li>
        ))}
      </ul>
      <div className="search-filter-hints-footer">
        <kbd>↑↓</kbd> to navigate, <kbd>Enter</kbd> to select, <kbd>Esc</kbd> to cancel
      </div>
    </div>
  );
}

export default SearchFilterHints;
