/**
 * SearchNoResults.tsx
 *
 * Shown when a search query returns no matches.
 * Displays:
 * - "No results found" message with the query
 * - Suggestions section with popular search terms
 */

import { popularSearches } from "./quick-links";

interface SearchNoResultsProps {
  /** The search query that had no results */
  query: string;
  /** Called when user clicks a suggestion */
  onSuggestionClick: (suggestion: string) => void;
}

export function SearchNoResults({ query, onSuggestionClick }: SearchNoResultsProps) {
  return (
    <div className="search-no-results">
      {/* No results message */}
      <div className="search-no-results-message">
        No results found for "<span className="search-no-results-query">{query}</span>"
      </div>

      {/* Suggestions */}
      <section className="search-no-results-suggestions">
        <div className="search-no-results-suggestions-header">Try searching for</div>
        <ul className="search-no-results-suggestions-list">
          {popularSearches.map((term) => (
            <li key={term}>
              <button
                type="button"
                className="search-no-results-suggestion"
                onClick={() => onSuggestionClick(term)}
              >
                {term}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default SearchNoResults;
