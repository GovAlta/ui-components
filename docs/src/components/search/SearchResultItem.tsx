/**
 * SearchResultItem.tsx
 *
 * Renders a single search result with:
 * - Type icon: △ for components, □ for examples
 * - Breadcrumb showing category context
 * - Title (clickable link)
 * - Description (truncated)
 * - Status badge for non-stable content
 */

import type { SearchResult, ComponentEntry, ExampleEntry } from './useSearch';

interface SearchResultItemProps {
  result: SearchResult;
  isSelected: boolean;
  onClick?: () => void;
  /** Called when navigating to result, passes result info for history tracking */
  onNavigate?: (result: SearchResult) => void;
}

/**
 * Truncate text to a maximum length, adding ellipsis if needed.
 */
function truncate(text: string | undefined, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Get display name based on entry type.
 */
function getDisplayName(result: SearchResult): string {
  if (result.type === 'component') {
    return (result as ComponentEntry).name;
  }
  return (result as ExampleEntry).title;
}

/**
 * Build breadcrumb text from type and category.
 * Examples: "Components > Feedback" or "Examples > Forms"
 */
function getBreadcrumb(result: SearchResult): string {
  if (result.type === 'component') {
    const comp = result as ComponentEntry;
    return `Components > ${comp.category}`;
  }
  const example = result as ExampleEntry;
  const category = example.categories?.[0] || 'General';
  return `Examples > ${category}`;
}

/**
 * Build the URL for the result based on type.
 * Components: /components/{slug}
 * Examples: /examples/{slug}
 */
function getUrl(result: SearchResult): string {
  const prefix = result.type === 'component' ? 'components' : 'examples';
  return `/${prefix}/${result.slug}`;
}

/**
 * Get badge class for non-stable statuses.
 */
function getBadgeClass(status: string): string | null {
  switch (status) {
    case 'beta':
      return 'search-result-badge--beta';
    case 'draft':
      return 'search-result-badge--draft';
    case 'experimental':
      return 'search-result-badge--experimental';
    case 'deprecated':
      return 'search-result-badge--deprecated';
    default:
      return null;
  }
}

/**
 * Check if status should show a badge.
 * Stable/published items don't need badges.
 */
function shouldShowBadge(status: string): boolean {
  return !['stable', 'published'].includes(status);
}

export function SearchResultItem({ result, isSelected, onClick, onNavigate }: SearchResultItemProps) {
  const name = getDisplayName(result);
  const breadcrumb = getBreadcrumb(result);
  const url = getUrl(result);
  const description = truncate(result.description, 80);
  const badgeClass = getBadgeClass(result.status);
  const itemId = `search-result-${result.type}-${result.id}`;

  const handleClick = () => {
    onNavigate?.(result);
    onClick?.();
  };

  return (
    <li
      role="option"
      id={itemId}
      aria-selected={isSelected}
    >
      <a
        href={url}
        className="search-result-item"
        data-selected={isSelected}
        onClick={handleClick}
        tabIndex={0}
      >
        {/* Type icon */}
        <span
          className={`search-result-icon search-result-icon--${result.type}`}
          aria-hidden="true"
        />

        <div className="search-result-content">
          {/* Breadcrumb */}
          <div className="search-result-breadcrumb">{breadcrumb}</div>

          {/* Title with optional status badge */}
          <div className="search-result-title">
            {name}
            {shouldShowBadge(result.status) && badgeClass && (
              <span className={`search-result-badge ${badgeClass}`}>
                {result.status}
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <div className="search-result-description">{description}</div>
          )}
        </div>
      </a>
    </li>
  );
}

export default SearchResultItem;
