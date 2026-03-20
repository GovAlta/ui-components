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
  GoabxCheckboxList,
} from "@abgov/react-components/experimental";
import {
  GoabIconButton,
  GoabIcon,
  GoabDivider,
  GoabButtonGroup,
  GoabContainer,
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
): "sky" | "pasture" | "sunset" | "lilac" | "prairie" | "dawn" | "success" {
  switch (category.toLowerCase()) {
    // Colors
    case "color":
      return "sky";
    // Spacing
    case "space":
    case "spacing":
      return "pasture";
    // Typography
    case "fontfamily":
    case "fontsize":
    case "fontweight":
    case "lineheight":
    case "fontvariationsettings":
    case "typography":
      return "sunset";
    // Motion
    case "motioncurve":
    case "translate":
    case "motionduration":
    case "transition":
      return "success";
    // Borders
    case "border":
    case "borderradius":
    case "borderwidth":
      return "lilac";
    // Shadows
    case "shadow":
      return "prairie";
    // Icons & misc
    case "iconsize":
    case "opacity":
      return "dawn";
    default:
      return "sky";
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

  // Read URL search parameter on mount (e.g., /tokens?search=color)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    if (searchParam && !searchChips.includes(searchParam)) {
      setSearchChips([searchParam]);
    }
  }, []); // Only run on mount

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

  // Render token preview (color, opacity, etc.)
  const renderPreview = (token: FlatToken) => {
    const value = token.resolvedValue || token.value;
    if (token.isColor) {
      return (
        <div
          className="token-color-swatch"
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            backgroundColor: token.resolvedValue,
            border: "1px solid var(--goa-color-greyscale-200)",
          }}
          title={token.resolvedValue}
        />
      );
    }

    // Opacity tokens - show overlay on top of content to demonstrate the effect
    if (token.category === "opacity") {
      // Parse opacity value (e.g., "50%" -> 0.5, "0.9" -> 0.9)
      let opacity = 0.5;
      if (value.endsWith("%")) {
        opacity = parseFloat(value) / 100;
      } else {
        opacity = parseFloat(value);
      }

      return (
        <div
          className="token-opacity-swatch"
          style={{
            width: 48,
            height: 48,
            position: "relative",
          }}
          title={token.value}
        >
          {/* Back: blue square (content behind overlay) */}
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 32,
              height: 32,
              backgroundColor: "var(--goa-color-interactive-default)",
            }}
          />
          {/* Front: gray overlay at the specified opacity */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 32,
              height: 32,
              backgroundColor: "var(--goa-color-greyscale-700)",
              opacity: opacity,
            }}
          />
        </div>
      );
    }

    // Motion curve tokens - show image representing the curve type
    if (token.category === "motionCurve") {
      const getMotionCurveImage = (
        name: string,
      ):
        | "expressive"
        | "productive"
        | "expressive-exit"
        | "expressive-reveal"
        | "expressive-transform" => {
        if (name.endsWith("-expressive")) return "expressive";
        if (name.endsWith("-productive")) return "productive";
        if (name.endsWith("-expressive-exit")) return "expressive-exit";
        if (name.endsWith("-expressive-reveal")) return "expressive-reveal";
        if (name.endsWith("-expressive-transform")) return "expressive-transform";
        return "expressive";
      };
      return (
        <img
          src={`/images/foundations/motion/${getMotionCurveImage(token.name)}.svg`}
          alt={`${token.name} motion curve visualization`}
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
          }}
          title={token.value}
        />
      );
    }

    // Border radius tokens - show gray square with the radius applied
    if (token.category === "borderRadius") {
      return (
        <div
          className="token-radius-swatch"
          style={{
            width: 48,
            height: 48,
            borderRadius: value,
            backgroundColor: "var(--goa-color-greyscale-400)",
          }}
          title={token.value}
        />
      );
    }

    // Border width tokens - show horizontal line with the width applied
    if (token.category === "borderWidth") {
      return (
        <div
          className="token-border-width-swatch"
          style={{
            width: 48,
            height: value,
            backgroundColor: "var(--goa-color-greyscale-700)",
            borderRadius: 1,
          }}
          title={token.value}
        />
      );
    }

    // Space tokens - show two endpoints with a colored bar between them
    if (token.category === "space") {
      // Color mapping based on spacing size (use endsWith to avoid matching "-space-")
      const getSpacingColor = (name: string): string => {
        if (name.endsWith("-none")) return "var(--goa-color-greyscale-400)";
        if (name.endsWith("-3xs")) return "#f8a5a5"; // light red/pink
        if (name.endsWith("-2xs")) return "#a5e8e0"; // light teal
        if (name.endsWith("-xs")) return "#e0a5e8"; // light magenta
        if (name.endsWith("-s")) return "#a5d4f8"; // light blue
        if (name.endsWith("-m")) return "#f8cfa5"; // light orange
        if (name.endsWith("-l")) return "#a5e8c0"; // light green
        if (name.endsWith("-xl")) return "#f8f0a5"; // light yellow
        if (name.endsWith("-2xl")) return "#f8a5b5"; // light coral
        if (name.endsWith("-3xl")) return "#a5e8e8"; // light cyan
        if (name.endsWith("-4xl")) return "#c5f8a5"; // light lime
        return "var(--goa-color-interactive-default)";
      };

      return (
        <div
          className="token-space-swatch"
          style={{
            display: "flex",
            alignItems: "center",
            height: 24,
          }}
          title={token.value}
        >
          {/* Left endpoint */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "var(--goa-color-greyscale-300)",
              flexShrink: 0,
            }}
          />
          {/* Spacing bar */}
          <div
            style={{
              width: value,
              height: 16,
              backgroundColor: getSpacingColor(token.name),
              flexShrink: 0,
            }}
          />
          {/* Right endpoint */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "var(--goa-color-greyscale-300)",
              flexShrink: 0,
            }}
          />
        </div>
      );
    }

    // Icon size tokens - show plus icon with background sized to the token value
    if (token.category === "iconSize") {
      // Map token suffix to GoabIconSize ("1"-"6")
      const getIconSize = (name: string): "1" | "2" | "3" | "4" | "5" | "6" => {
        if (name.endsWith("-1")) return "1";
        if (name.endsWith("-2")) return "2";
        if (name.endsWith("-3")) return "3";
        if (name.endsWith("-4")) return "4";
        if (name.endsWith("-5")) return "5";
        if (name.endsWith("-6")) return "6";
        if (name.endsWith("-xs")) return "1";
        if (name.endsWith("-s")) return "2";
        if (name.endsWith("-m")) return "3";
        if (name.endsWith("-l")) return "4";
        if (name.endsWith("-xl")) return "5";
        return "3";
      };

      return (
        <div
          className="token-icon-size-swatch"
          style={{
            width: value,
            height: value,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--goa-color-emergency-light)",
          }}
          title={token.value}
        >
          <GoabIcon type="add" size={getIconSize(token.name)} />
        </div>
      );
    }

    // Shadow tokens - show white card with shadow on gray background
    if (token.category === "shadow") {
      return (
        <div
          className="token-shadow-swatch"
          style={{
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 4,
          }}
          title={token.value}
        >
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: "white",
              borderRadius: 8,
              border: "1px solid var(--goa-color-greyscale-100)",
              boxShadow: value,
            }}
          />
        </div>
      );
    }

    // Font weight tokens - show "Aa" at the weight
    if (token.category === "fontWeight") {
      return (
        <div
          className="token-font-weight-swatch"
          style={{
            fontWeight: value,
            fontFamily: "var(--goa-fontFamily-sans)",
            fontSize: "16px",
            color: "var(--goa-color-greyscale-700)",
          }}
          title={token.value}
        >
          Aa
        </div>
      );
    }

    // Letter spacing tokens - show "Aa" with the letter spacing
    if (token.category === "letterSpacing") {
      return (
        <div
          className="token-letter-spacing-swatch"
          style={{
            letterSpacing: `${value}px`,
            fontFamily: "var(--goa-fontFamily-sans)",
            fontSize: "16px",
            color: "var(--goa-color-greyscale-700)",
          }}
          title={token.value}
        >
          Aa
        </div>
      );
    }

    // Typography tokens - show "Aa" with all typography styles applied
    if (token.category === "typography") {
      // Parse the resolved value to get individual properties
      let typographyStyles: React.CSSProperties = {
        color: "var(--goa-color-greyscale-700)",
      };

      try {
        const parsed = JSON.parse(token.resolvedValue || "{}");
        if (parsed.fontFamily) typographyStyles.fontFamily = parsed.fontFamily;
        if (parsed.fontSize) typographyStyles.fontSize = parsed.fontSize;
        if (parsed.fontWeight) typographyStyles.fontWeight = parsed.fontWeight;
        if (parsed.lineHeight) typographyStyles.lineHeight = parsed.lineHeight;
        if (parsed.letterSpacing) typographyStyles.letterSpacing = parsed.letterSpacing;
      } catch {
        // Fallback if parsing fails
        typographyStyles.fontFamily = "var(--goa-fontFamily-sans)";
        typographyStyles.fontSize = "16px";
      }

      return (
        <div
          className="token-typography-swatch"
          style={typographyStyles}
          title={token.value}
        >
          Aa
        </div>
      );
    }

    // Font size tokens - show "Aa" at the actual size
    if (token.category === "fontSize") {
      return (
        <div
          className="token-font-size-swatch"
          style={{
            fontSize: value,
            fontFamily: "var(--goa-fontFamily-sans)",
            lineHeight: 1,
            color: "var(--goa-color-greyscale-700)",
          }}
          title={token.value}
        >
          Aa
        </div>
      );
    }

    // Font family tokens - show sample text in the font
    if (token.category === "fontFamily") {
      return (
        <div
          className="token-font-family-swatch"
          style={{
            fontFamily: value,
            fontSize: "14px",
            color: "var(--goa-color-greyscale-700)",
          }}
          title={token.value}
        >
          Abc 123
        </div>
      );
    }

    // Line height tokens - show two lines of "Ag" with the line-height applied
    if (token.category === "lineHeight") {
      return (
        <div
          className="token-line-height-swatch"
          style={{
            lineHeight: value,
            fontSize: "14px",
            color: "var(--goa-color-greyscale-700)",
          }}
          title={token.value}
        >
          Ag
          <br />
          Ag
        </div>
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
              icon="false"
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
            icon="false"
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
              initialTab={tokenSyntax === "css" ? 1 : 2}
              orientation="horizontal"
            >
              <goa-tab heading="CSS">
                <span />
              </goa-tab>
              <goa-tab heading="SCSS">
                <span />
              </goa-tab>
            </goa-tabs>
          </div>

          <div>
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
            <GoabxCheckboxList
              name="category"
              size="compact"
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
            </GoabxCheckboxList>
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
          background: var(--goa-color-greyscale-white);
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
          background: var(--goa-color-greyscale-white);
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

        /* Mobile: stack toolbar vertically */
        @media (max-width: 640px) {
          .tokens-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .tokens-search-section {
            min-width: unset;
          }

          .tokens-toolbar-actions {
            align-self: flex-start;
          }
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
