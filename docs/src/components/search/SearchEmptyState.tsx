/**
 * SearchEmptyState.tsx
 *
 * Shown when the search input is empty.
 * Displays:
 * - Recent searches (if any) with clear option
 * - Quick links to common destinations
 */

import type { HistoryItem } from './useSearchHistory';
import { quickLinks } from './quick-links';

/** Map category slug to icon name (matches ComponentsSubMenu) */
const CATEGORY_ICONS: Record<string, string> = {
  'content-layout': 'grid',
  'feedback-and-alerts': 'notifications',
  'inputs-and-actions': 'create',
  'structure-and-navigation': 'browsers',
  'utilities': 'build',
};

/** Get icon for a history item based on type and category */
function getHistoryIcon(item: HistoryItem): string {
  if (item.type === 'example') {
    return 'browsers'; // Examples use browsers icon
  }
  // Components use their category icon
  return item.category ? CATEGORY_ICONS[item.category] || 'shapes' : 'shapes';
}

interface SearchEmptyStateProps {
  /** Recent search history */
  history: HistoryItem[];
  /** Called when user clicks a history item */
  onHistoryClick: (item: HistoryItem) => void;
  /** Called when user clicks "Clear history" */
  onClearHistory: () => void;
  /** Called when user clicks a quick link */
  onQuickLinkClick: () => void;
}

export function SearchEmptyState({
  history,
  onHistoryClick,
  onClearHistory,
  onQuickLinkClick,
}: SearchEmptyStateProps) {
  return (
    <div className="search-empty-state">
      {/* Recent searches section */}
      {history.length > 0 && (
        <section className="search-empty-section" aria-labelledby="recent-searches-heading">
          <div className="search-empty-header">
            <span id="recent-searches-heading" className="search-empty-title">Recent</span>
            <button
              type="button"
              className="search-empty-clear"
              onClick={onClearHistory}
              aria-label="Clear search history"
            >
              Clear
            </button>
          </div>
          <ul className="search-empty-list" aria-label="Recent searches">
            {history.map(item => (
              <li key={`${item.type}:${item.id}`}>
                <a
                  href={`/${item.type === 'component' ? 'components' : 'examples'}/${item.slug}`}
                  className="search-empty-item search-empty-history-item"
                  onClick={e => {
                    e.preventDefault();
                    onHistoryClick(item);
                  }}
                >
                  <span className="search-empty-icon" aria-hidden="true">
                    <goa-icon type={getHistoryIcon(item)} size="small" />
                  </span>
                  <span className="search-empty-item-title">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Quick links section */}
      <section className="search-empty-section" aria-labelledby="quick-links-heading">
        <div className="search-empty-header">
          <span id="quick-links-heading" className="search-empty-title">Quick Links</span>
        </div>
        <ul className="search-empty-list" aria-label="Quick links">
          {quickLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="search-empty-item search-empty-quick-link"
                onClick={onQuickLinkClick}
              >
                <span className="search-empty-icon" aria-hidden="true">
                  <goa-icon type={link.icon} size="small" />
                </span>
                <span className="search-empty-item-title">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default SearchEmptyState;
