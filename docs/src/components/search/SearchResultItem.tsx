/**
 * SearchResultItem.tsx
 *
 * Renders a single search result with:
 * - Type icon matching sidebar icons (shapes, browsers, code-slash)
 * - Breadcrumb showing category context
 * - Title (clickable link)
 * - Description (truncated)
 * - Status badge for non-stable content
 */

import type {
  SearchResult,
  ComponentEntry,
  ExampleEntry,
  TokenEntry,
  PageEntry,
} from "./useSearch";
import { getTypeIcon, getResultUrl } from "./search-utils";

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
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

/**
 * Get display name based on entry type.
 */
function getDisplayName(result: SearchResult): string {
  if (result.type === "component") {
    return (result as ComponentEntry).name;
  }
  if (result.type === "token") {
    return (result as TokenEntry).title;
  }
  if (result.type === "page") {
    return (result as PageEntry).title;
  }
  return (result as ExampleEntry).title;
}

/**
 * Format a kebab-case or lowercase string to Title Case.
 * "inputs-and-actions" → "Inputs and Actions"
 * "get started" → "Get Started"
 */
function formatCategory(raw: string): string {
  const smallWords = new Set(["and", "or", "the", "in", "of", "for", "to", "a", "an"]);
  return raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .split(" ")
    .map((word, i) =>
      i === 0 || !smallWords.has(word)
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word,
    )
    .join(" ");
}

/**
 * Build breadcrumb text from type and category.
 * Examples: "Components > Feedback" or "Examples > Forms"
 */
function getBreadcrumb(result: SearchResult): string {
  if (result.type === "page") {
    const page = result as PageEntry;
    return page.category ? formatCategory(page.category) : "Pages";
  }
  if (result.type === "component") {
    const comp = result as ComponentEntry;
    return `Components > ${formatCategory(comp.category)}`;
  }
  if (result.type === "token") {
    const token = result as TokenEntry;
    if (token.category) {
      return `Design Tokens > ${formatCategory(token.category)}`;
    }
    return "Design Tokens";
  }
  const example = result as ExampleEntry;
  if (example.productType) {
    return `Examples > ${formatCategory(example.productType)}`;
  }
  return `Examples > ${formatCategory(example.size)}`;
}

/**
 * Get badge class for non-stable statuses.
 */
function getBadgeClass(status: string): string | null {
  switch (status) {
    case "beta":
      return "search-result-badge--beta";
    case "draft":
      return "search-result-badge--draft";
    case "experimental":
      return "search-result-badge--experimental";
    case "deprecated":
      return "search-result-badge--deprecated";
    default:
      return null;
  }
}

/**
 * Check if status should show a badge.
 * Stable/published items don't need badges.
 */
function shouldShowBadge(status: string): boolean {
  return !["stable", "published"].includes(status);
}

export function SearchResultItem({
  result,
  isSelected,
  onClick,
  onNavigate,
}: SearchResultItemProps) {
  const name = getDisplayName(result);
  const breadcrumb = getBreadcrumb(result);
  const url = getResultUrl(result.type, result.slug);
  const description = truncate(result.description, 80);
  const badgeClass = getBadgeClass(result.status);
  const itemId = `search-result-${result.type}-${result.id}`;

  const handleClick = () => {
    onNavigate?.(result);
    onClick?.();
  };

  return (
    <li role="option" id={itemId} aria-selected={isSelected}>
      <a
        href={url}
        className="search-result-item"
        data-selected={isSelected}
        onClick={handleClick}
        tabIndex={0}
      >
        {/* Type icon - matches sidebar navigation icons */}
        <span className="search-result-icon" aria-hidden="true">
          <goa-icon type={getTypeIcon(result.type)} size="small" />
        </span>

        <div className="search-result-content">
          {/* Breadcrumb */}
          <div className="search-result-breadcrumb">{breadcrumb}</div>

          {/* Title with optional status badge */}
          <div className="search-result-title">
            {name}
            {shouldShowBadge(result.status) && badgeClass && (
              <span className={`search-result-badge ${badgeClass}`}>{result.status}</span>
            )}
          </div>

          {/* Description */}
          {description && <div className="search-result-description">{description}</div>}
        </div>
      </a>
    </li>
  );
}

export default SearchResultItem;
