/**
 * TokensGrid.tsx
 *
 * Data grid for design tokens with:
 * - Grid/List views (responsive to viewport)
 * - Column header sorting (list view)
 * - Category filtering via drawer
 * - Search with helper text
 * - Copy to clipboard
 *
 * Design pattern based on ExamplesGrid - Figma + workspace demo hybrid approach.
 */

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  GoabxButton,
  GoabxInput,
  GoabxFormItem,
  GoabxFilterChip,
  GoabxDrawer,
  GoabxCheckbox,
} from "@abgov/react-components/experimental";
import {
  GoabIconButton,
  GoabIcon,
  GoabDivider,
  GoabButtonGroup,
  GoabContainer,
  GoabCheckboxList,
  GoabTab,
  type GoabCheckboxListOnChangeDetail,
} from "@abgov/react-components";
import { useTwoLevelSort } from "../hooks/useTwoLevelSort";
import { useMobile } from "../hooks/useCompactToolbar";
import type { FlatToken } from "../lib/tokens";

interface FilterGroup {
  name: string;
  categories: string[];
}

interface TokensGridProps {
  tokens: FlatToken[];
  filterGroups: FilterGroup[];
}

// Badge type mapping for categories (using V2 extended colors)
function getCategoryBadgeType(
  category: string,
): "sky" | "pasture" | "sunset" | "lilac" | "prairie" | "dawn" {
  switch (category) {
    case "color":
      return "sky";
    case "spacing":
      return "pasture";
    case "typography":
      return "sunset";
    case "border":
      return "lilac";
    case "shadow":
      return "prairie";
    default:
      return "dawn";
  }
}

// Format category for display
function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

// Token syntax types
type TokenSyntax = "css" | "scss";

// Convert CSS variable name to SCSS variable name
function toScssSyntax(cssName: string): string {
  // --goa-color-primary → $goa-color-primary
  return cssName.replace(/^--/, "$");
}

export function TokensGrid({ tokens, filterGroups }: TokensGridProps) {
  // State
  const [searchValue, setSearchValue] = useState("");
  const [searchChips, setSearchChips] = useState<string[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [tokenSyntax, setTokenSyntax] = useState<TokenSyntax>("css");

  // Ref for sticky detection sentinel
  const sentinelRef = useRef<HTMLDivElement>(null);
  // Ref for table (to handle sort events from web component)
  const tableRef = useRef<HTMLElement>(null);
  // TODO: Remove tabsRef when GoabxTabs wrapper exposes updateUrl and stackOnMobile props
  const tabsRef = useRef<HTMLElement>(null);

  // Detect when toolbar becomes sticky using IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is not intersecting (scrolled out of view), toolbar is sticky
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Filter state
  const [pendingFilters, setPendingFilters] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  // Hooks
  const { sortConfig, setSortConfig, sortByKey, clearSort, handleTableSort } =
    useTwoLevelSort();
  const isMobile = useMobile();

  // Listen for table sort events (from goa-table web component)
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const handleSort = (e: Event) => {
      const detail = (e as CustomEvent<{ sortBy: string; sortDir: "asc" | "desc" }>)
        .detail;
      handleTableSort(detail);
    };

    table.addEventListener("_sort", handleSort);
    return () => table.removeEventListener("_sort", handleSort);
  }, [handleTableSort]);

  // TODO: Remove this useEffect when GoabxTabs wrapper exposes updateUrl and stackOnMobile props
  // Using goa-tabs web component directly because GoabxTabs wrapper is missing these props
  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    const handleChange = (e: Event) => {
      const detail = (e as CustomEvent<{ tab: number }>).detail;
      if (detail.tab === 1) {
        setTokenSyntax("css");
      } else if (detail.tab === 2) {
        setTokenSyntax("scss");
      }
    };

    tabs.addEventListener("_change", handleChange);
    return () => tabs.removeEventListener("_change", handleChange);
  }, []);

  // View mode: 'list' (table) on desktop, 'card' on mobile
  // No user toggle - automatically switches based on viewport
  const viewMode = useMemo((): "card" | "list" => {
    return isMobile ? "card" : "list";
  }, [isMobile]);

  // Filter and sort tokens
  const filteredTokens = useMemo(() => {
    let result = tokens;

    // Apply search chips
    if (searchChips.length > 0) {
      result = result.filter((token) =>
        searchChips.every(
          (chip) =>
            token.name.toLowerCase().includes(chip.toLowerCase()) ||
            token.value.toLowerCase().includes(chip.toLowerCase()) ||
            token.category.toLowerCase().includes(chip.toLowerCase()),
        ),
      );
    }

    // Apply filter groups (expand group names to categories)
    if (appliedFilters.length > 0) {
      const allowedCategories = appliedFilters.flatMap((filterName) => {
        const group = filterGroups.find((g) => g.name === filterName);
        return group ? group.categories : [];
      });
      result = result.filter((token) => allowedCategories.includes(token.category));
    }

    // Apply sorting
    if (sortConfig.primary) {
      result = [...result].sort((a, b) => {
        const key = sortConfig.primary!.key as keyof FlatToken;
        const aVal = String(a[key] || "");
        const bVal = String(b[key] || "");
        const cmp = aVal.localeCompare(bVal);
        const dir = sortConfig.primary!.direction === "asc" ? 1 : -1;

        if (cmp !== 0) return cmp * dir;

        if (sortConfig.secondary) {
          const secKey = sortConfig.secondary.key as keyof FlatToken;
          const secAVal = String(a[secKey] || "");
          const secBVal = String(b[secKey] || "");
          const secDir = sortConfig.secondary.direction === "asc" ? 1 : -1;
          return secAVal.localeCompare(secBVal) * secDir;
        }

        return 0;
      });
    }

    return result;
  }, [tokens, searchChips, appliedFilters, sortConfig, filterGroups]);

  // Search handlers
  const applySearch = useCallback(() => {
    const trimmed = searchValue.trim();
    if (trimmed && !searchChips.includes(trimmed)) {
      setSearchChips((prev) => [...prev, trimmed]);
      setSearchValue("");
    }
  }, [searchValue, searchChips]);

  const removeSearchChip = useCallback((chip: string) => {
    setSearchChips((prev) => prev.filter((c) => c !== chip));
  }, []);

  // Filter handlers
  const togglePendingFilter = useCallback((category: string) => {
    setPendingFilters((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  }, []);

  const applyFilters = useCallback(() => {
    setAppliedFilters(pendingFilters);
    setFilterDrawerOpen(false);
  }, [pendingFilters]);

  const clearAllFilters = useCallback(() => {
    setPendingFilters([]);
    setAppliedFilters([]);
  }, []);

  const removeAppliedFilter = useCallback((category: string) => {
    setAppliedFilters((prev) => prev.filter((c) => c !== category));
  }, []);

  // Get formatted token name based on current syntax
  const getFormattedTokenName = useCallback(
    (cssName: string): string => {
      return tokenSyntax === "scss" ? toScssSyntax(cssName) : cssName;
    },
    [tokenSyntax],
  );

  // Copy to clipboard (copies the formatted name)
  const copyToClipboard = useCallback(
    async (tokenName: string) => {
      try {
        const formattedName = getFormattedTokenName(tokenName);
        await navigator.clipboard.writeText(formattedName);
        setCopiedToken(tokenName);
        setTimeout(() => setCopiedToken(null), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    },
    [getFormattedTokenName],
  );

  // Clear all filters, search, and sort
  const clearAll = useCallback(() => {
    setSearchChips([]);
    clearAllFilters();
    clearSort();
  }, [clearAllFilters, clearSort]);

  // Get sort direction for column headers
  const getColumnSortDirection = useCallback(
    (columnKey: string): "asc" | "desc" | "none" => {
      if (sortConfig.primary?.key === columnKey) {
        return sortConfig.primary.direction;
      }
      if (sortConfig.secondary?.key === columnKey) {
        return sortConfig.secondary.direction;
      }
      return "none";
    },
    [sortConfig],
  );

  // Get sort order indicator ("1" or "2") for column headers
  const getColumnSortOrder = useCallback(
    (columnKey: string): string | undefined => {
      // Only show numbers if there are two sorts active
      if (!sortConfig.primary || !sortConfig.secondary) {
        return undefined;
      }
      if (sortConfig.primary.key === columnKey) {
        return "1";
      }
      if (sortConfig.secondary.key === columnKey) {
        return "2";
      }
      return undefined;
    },
    [sortConfig],
  );

  // Render color preview
  const renderPreview = (token: FlatToken) => {
    if (token.isColor) {
      return (
        <div
          className="token-color-swatch"
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            backgroundColor: token.value,
            border: "1px solid var(--goa-color-greyscale-200)",
          }}
          title={token.value}
        />
      );
    }
    return <span className="token-no-preview">—</span>;
  };

  // Render token card (grid view)
  const renderTokenCard = useCallback(
    (token: FlatToken) => (
      <div key={token.name} className="token-card">
        <GoabContainer type="interactive" padding="compact" mb="none">
          <div className="token-card-content">
            <div className="token-card-main">
              {renderPreview(token)}
              <div className="token-card-info">
                <code className="token-name">{getFormattedTokenName(token.name)}</code>
                <span className="token-value">{token.value}</span>
              </div>
              <GoabIconButton
                icon={copiedToken === token.name ? "checkmark" : "copy"}
                size="small"
                variant="dark"
                ariaLabel={`Copy ${getFormattedTokenName(token.name)}`}
                onClick={() => copyToClipboard(token.name)}
              />
            </div>
            <goa-badge
              version="2"
              type={getCategoryBadgeType(token.category)}
              content={formatCategory(token.category)}
              emphasis="subtle"
            />
          </div>
        </GoabContainer>
      </div>
    ),
    [copiedToken, copyToClipboard, getFormattedTokenName],
  );

  // Render table row (list view)
  const renderTableRow = useCallback(
    (token: FlatToken) => (
      <tr key={token.name}>
        <td>{renderPreview(token)}</td>
        <td>
          <code className="token-name">{getFormattedTokenName(token.name)}</code>
        </td>
        <td>
          <code className="token-value">{token.value}</code>
        </td>
        <td>
          <goa-badge
            version="2"
            type={getCategoryBadgeType(token.category)}
            content={formatCategory(token.category)}
            emphasis="subtle"
          />
        </td>
        <td>
          <GoabIconButton
            icon={copiedToken === token.name ? "checkmark" : "copy"}
            size="small"
            variant="dark"
            ariaLabel={`Copy ${getFormattedTokenName(token.name)}`}
            onClick={() => copyToClipboard(token.name)}
          />
        </td>
      </tr>
    ),
    [copiedToken, copyToClipboard, getFormattedTokenName],
  );

  const hasActiveFilters =
    searchChips.length > 0 || appliedFilters.length > 0 || sortConfig.primary;

  return (
    <div className="tokens-grid">
      {/* Sentinel for sticky detection - placed before toolbar */}
      <div ref={sentinelRef} className="tokens-sentinel" aria-hidden="true" />

      {/* Toolbar */}
      <div className={`tokens-toolbar ${isSticky ? "tokens-toolbar--sticky" : ""}`}>
        {/* Search input */}
        <div className="tokens-search-section">
          <GoabxFormItem
            helpText={!isSticky ? "Search by name, value, or category" : undefined}
          >
            <GoabxInput
              name="tokenSearch"
              value={searchValue}
              leadingIcon="search"
              width="100%"
              size="compact"
              onChange={(e) => setSearchValue(e.value)}
              onKeyPress={(e) => e.key === "Enter" && applySearch()}
            />
          </GoabxFormItem>
        </div>

        {/* Syntax toggle + Filters */}
        <div className="tokens-toolbar-actions">
          {/*
           * TODO: Replace <goa-tabs> with GoabxTabs when wrapper exposes these props
           *
           * Using web component directly because GoabxTabs wrapper is missing:
           * - updateUrl prop (we need false to avoid polluting browser history)
           * - stackOnMobile prop (we need false for compact toggle)
           *
           * When fixed, remove: tabsRef, useEffect for _change event, goa-tabs from global.d.ts
           */}
          <div className="syntax-toggle-wrapper">
            <goa-tabs
              ref={tabsRef}
              version="2"
              variant="segmented"
              initialtab={tokenSyntax === "css" ? 1 : 2}
              updateurl="false"
              stackonmobile="false"
            >
              <goa-tab heading="CSS">
                <span />
              </goa-tab>
              <goa-tab heading="SCSS">
                <span />
              </goa-tab>
            </goa-tabs>
          </div>

          <GoabxButton
            type="secondary"
            leadingIcon="filter-lines"
            size="compact"
            onClick={() => {
              setPendingFilters(appliedFilters);
              setFilterDrawerOpen(true);
            }}
          >
            Filters
          </GoabxButton>
        </div>
      </div>

      {/* Active filters chips */}
      {hasActiveFilters && (
        <div className="tokens-chips">
          <GoabIcon
            type="filter-lines"
            size="small"
            fillColor="var(--goa-color-text-secondary)"
          />

          {/* Sort chips */}
          {sortConfig.primary && (
            <GoabxFilterChip
              content={sortConfig.primary.key}
              leadingIcon={
                sortConfig.primary.direction === "asc" ? "arrow-up" : "arrow-down"
              }
              secondaryText={sortConfig.secondary ? "1st" : undefined}
              onClick={() =>
                setSortConfig({ primary: sortConfig.secondary, secondary: null })
              }
            />
          )}
          {sortConfig.secondary && (
            <GoabxFilterChip
              content={sortConfig.secondary.key}
              leadingIcon={
                sortConfig.secondary.direction === "asc" ? "arrow-up" : "arrow-down"
              }
              secondaryText="2nd"
              onClick={() => setSortConfig((prev) => ({ ...prev, secondary: null }))}
            />
          )}

          {/* Search chips */}
          {searchChips.map((chip) => (
            <GoabxFilterChip
              key={chip}
              content={chip}
              onClick={() => removeSearchChip(chip)}
            />
          ))}

          {/* Filter group chips */}
          {appliedFilters.map((filterName) => (
            <GoabxFilterChip
              key={filterName}
              content={filterName}
              onClick={() => removeAppliedFilter(filterName)}
            />
          ))}

          <a
            href="#"
            className="clear-all-link"
            onClick={(e) => {
              e.preventDefault();
              clearAll();
            }}
          >
            Clear all
          </a>
        </div>
      )}

      {/* Results count */}
      <p className="tokens-count">
        {filteredTokens.length} token{filteredTokens.length !== 1 ? "s" : ""}
      </p>

      {/* List View (table) */}
      {viewMode === "list" && (
        <div className="tokens-table-wrapper">
          {/* Using web components directly for V2 styling - React wrappers don't pass version prop */}
          <goa-table ref={tableRef} version="2" width="100%" variant="normal">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Preview</th>
                  <th style={{ minWidth: 320 }}>
                    <goa-table-sort-header
                      version="2"
                      name="name"
                      direction={getColumnSortDirection("name")}
                    >
                      Token
                    </goa-table-sort-header>
                  </th>
                  <th>Value</th>
                  <th>
                    <goa-table-sort-header
                      version="2"
                      name="category"
                      direction={getColumnSortDirection("category")}
                    >
                      Category
                    </goa-table-sort-header>
                  </th>
                  <th style={{ width: 60 }}></th>
                </tr>
              </thead>
              <tbody>{filteredTokens.map(renderTableRow)}</tbody>
            </table>
          </goa-table>
        </div>
      )}

      {/* Card View (mobile only) */}
      {viewMode === "card" && (
        <div className="tokens-card-view">
          <div className="tokens-card-grid">{filteredTokens.map(renderTokenCard)}</div>
        </div>
      )}

      {/* Filter Drawer */}
      <GoabxDrawer
        heading="Filter tokens"
        position="right"
        open={filterDrawerOpen}
        maxSize="300px"
        onClose={() => setFilterDrawerOpen(false)}
        actions={
          <GoabButtonGroup alignment="start" gap="compact">
            <GoabxButton type="primary" size="compact" onClick={applyFilters}>
              Apply filters
            </GoabxButton>
            <GoabxButton
              type="tertiary"
              size="compact"
              onClick={() => setFilterDrawerOpen(false)}
            >
              Cancel
            </GoabxButton>
          </GoabButtonGroup>
        }
      >
        <div className="filter-drawer-content">
          <GoabxFormItem label="Category">
            <GoabCheckboxList
              name="category"
              value={pendingFilters}
              onChange={(detail: GoabCheckboxListOnChangeDetail) =>
                setPendingFilters(detail.value)
              }
            >
              {filterGroups.map((group) => (
                <GoabxCheckbox
                  key={group.name}
                  name={group.name}
                  value={group.name}
                  text={group.name}
                  size="compact"
                />
              ))}
            </GoabCheckboxList>
          </GoabxFormItem>

          {pendingFilters.length > 0 && (
            <>
              <GoabDivider />
              <GoabxButton
                type="tertiary"
                size="compact"
                onClick={() => setPendingFilters([])}
              >
                Clear all filters
              </GoabxButton>
            </>
          )}
        </div>
      </GoabxDrawer>

      <style>{`
        .tokens-grid {
          max-width: 100%;
        }

        /* Sentinel for sticky detection - invisible marker */
        .tokens-sentinel {
          height: 1px;
          margin-bottom: -1px;
        }

        /* Toolbar - single row layout */
        .tokens-toolbar {
          position: sticky;
          top: 0;
          z-index: 1;
          background: white;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: var(--goa-space-m);
          padding: var(--goa-space-m) 0;
          margin-bottom: 12px;
          transition: padding 0.15s ease;
        }

        /* When sticky - add shadow */
        .tokens-toolbar--sticky {
          padding: var(--goa-space-s) 0;
          background: transparent;
        }

        .tokens-toolbar--sticky::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: -9999px;
          right: -9999px;
          background: white;
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
          z-index: -1;
        }

        .tokens-search-section {
          flex: 1;
          min-width: 200px;
        }

        /* Toolbar actions */
        .tokens-toolbar-actions {
          display: flex;
          align-items: flex-start;
          gap: var(--goa-space-m);
        }

        /* Syntax toggle wrapper */
        .syntax-toggle-wrapper {
          margin-bottom: -20px; /* Compensate for goa-tabs internal margin */
        }

        .syntax-toggle-wrapper .tabs {
          margin-bottom: 0 !important;
        }

        /* Filter chips */
        .tokens-chips {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
          flex-wrap: wrap;
          margin-bottom: var(--goa-space-m);
        }

        .tokens-count {
          color: var(--goa-color-text-secondary);
          font: var(--goa-typography-body-s);
          margin-bottom: var(--goa-space-m);
        }

        /* Table/List view */
        .tokens-table-wrapper {
          overflow: auto;
        }

        .token-name {
          font-size: var(--goa-font-size-2);
          word-break: break-all;
        }

        .token-value {
          font-size: var(--goa-font-size-2);
          color: var(--goa-color-text-secondary);
          word-break: break-all;
        }

        .token-no-preview {
          color: var(--goa-color-text-secondary);
        }

        /* Card/Grid view */
        .tokens-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--goa-space-m);
        }


        .token-card-content {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-s);
        }

        .token-card-main {
          display: flex;
          align-items: center;
          gap: var(--goa-space-m);
        }

        .token-card-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-2xs);
        }

        .token-card-info .token-name {
          word-break: break-all;
        }

        /* Clear all link */
        .clear-all-link {
          color: var(--goa-color-interactive-default);
          font: var(--goa-typography-body-s);
        }

        /* Filter drawer */
        .filter-drawer-content {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-l);
        }

        .filter-checkboxes {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-xs);
        }

      `}</style>
    </div>
  );
}

export default TokensGrid;
