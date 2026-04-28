/**
 * ExamplesGrid.tsx
 *
 * Data grid for examples with:
 * - Grid/List views (responsive to viewport)
 * - Column header sorting (list view)
 * - Type and productType filtering via drawer
 * - Search with helper text
 * - Grouping via settings popover
 *
 * Design pattern based on Figma + workspace demo hybrid approach.
 */

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  GoabButton,
  GoabButtonGroup,
  GoabCheckbox,
  GoabCheckboxList,
  type GoabCheckboxListOnChangeDetail,
  GoabDivider,
  GoabFilterChip,
  GoabFormItem,
  GoabIcon,
  GoabIconButton,
  GoabPushDrawer,
} from "@abgov/react-components";

import { useTwoLevelSort } from "../hooks/useTwoLevelSort";
import { useContainerNarrow } from "../hooks/useContainerWidth";
import { useViewSettings, type LayoutType } from "../hooks/useViewSettings";
import { InlineSearch, type SlashCommand } from "./search/InlineSearch";
import { useSearch } from "./search/useSearch";

// Type for example data (matches Astro content collection)
export interface Example {
  slug: string;
  data: {
    id: string;
    title: string;
    size: "interaction" | "section" | "page" | "flow" | "product";
    productType?: "workspace" | "public-form";
    tags?: string[];
    components: string[];
    status: "published" | "draft" | "deprecated";
    previewImage?: string;
    href?: string;
  };
  body?: string;
}

interface ExamplesGridProps {
  examples: Example[];
}

const DEFAULT_VISIBLE_COLUMNS = ["title", "size", "productType", "tags"];

// Badge type mapping for example sizes (using V2 extended colors)
function getSizeBadgeType(
  size: string,
): "dawn" | "information" | "pasture" | "sunset" | "prairie" {
  switch (size) {
    case "interaction":
      return "dawn";
    case "section":
      return "information";
    case "page":
      return "pasture";
    case "flow":
      return "sunset";
    case "product":
      return "prairie";
    default:
      return "information";
  }
}

// Badge type mapping for service types (using V2 extended colors)
function getProductTypeBadgeType(
  productType: string,
): "lilac" | "sunset" | "default" {
  switch (productType) {
    case "workspace":
      return "lilac";
    case "public-form":
      return "sunset";
    default:
      return "default";
  }
}

// Format size for display (sentence case, hyphens to spaces)
function formatSize(size: string): string {
  return size
    .split("-")
    .map((word, i) => (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

// Format service type for display ("public-form" -> "Public form")
function formatProductType(productType: string): string {
  return productType
    .split("-")
    .map((word, i) => (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export function ExamplesGrid({ examples }: ExamplesGridProps) {
  // State
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Ref for sticky detection sentinel
  const gridRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  // Ref for table (to handle sort events from web component)
  const tableRef = useRef<HTMLElement>(null);
  // TODO: Remove tabsRef when GoabTabs wrapper exposes updateUrl and stackOnMobile props
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
  const emptyFilters = {
    size: [] as string[],
    productType: [] as string[],
  };
  const [pendingFilters, setPendingFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters);

  // Read URL params first, then sessionStorage, on mount. sessionStorage
  // persists the user's last filter selection within the tab so navigating
  // away from /examples/ and back via the breadcrumb keeps their filters.
  const FILTER_STORAGE_KEY = "examples-grid-filters";
  const [urlFiltersApplied, setUrlFiltersApplied] = useState(false);
  useEffect(() => {
    if (urlFiltersApplied) return;
    const params = new URLSearchParams(window.location.search);
    const fromUrl = {
      size: params.get("size")?.split(",").filter(Boolean) ?? [],
      productType: params.get("productType")?.split(",").filter(Boolean) ?? [],
    };
    if (fromUrl.size.length || fromUrl.productType.length) {
      setPendingFilters(fromUrl);
      setAppliedFilters(fromUrl);
    } else {
      try {
        const stored = sessionStorage.getItem(FILTER_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as typeof emptyFilters;
          if (parsed.size?.length || parsed.productType?.length) {
            setPendingFilters(parsed);
            setAppliedFilters(parsed);
          }
        }
      } catch {
        // ignore malformed storage
      }
    }
    setUrlFiltersApplied(true);
  }, [urlFiltersApplied]);

  // Persist applied filters to sessionStorage so they survive navigation
  // away from /examples/ and back. Cleared when the user clears all filters.
  useEffect(() => {
    if (!urlFiltersApplied) return;
    try {
      if (appliedFilters.size.length || appliedFilters.productType.length) {
        sessionStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(appliedFilters));
      } else {
        sessionStorage.removeItem(FILTER_STORAGE_KEY);
      }
    } catch {
      // ignore storage write failure (e.g. private mode)
    }
  }, [appliedFilters, urlFiltersApplied]);

  // Hooks
  const { sortConfig, setSortConfig, sortByKey, clearSort, handleTableSort } =
    useTwoLevelSort();
  const isContainerNarrow = useContainerNarrow(gridRef, 780);
  const { search, isLoading, error } = useSearch();
  const { viewSettings, setLayout } = useViewSettings({
    pageKey: "examples",
    defaultLayout: "card", // 'card' = grid view
    defaultColumns: DEFAULT_VISIBLE_COLUMNS,
  });

  // Listen for table sort events (from goa-table web component)
  // Also explicitly set version="2" attribute since React may not set it correctly on custom elements
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    // Explicitly set version attribute for V2 styling (React doesn't always set attributes on custom elements)
    table.setAttribute("version", "2");

    const handleMultiSort = (e: Event) => {
      const detail = (
        e as CustomEvent<{ sorts: { column: string; direction: "asc" | "desc" }[] }>
      ).detail;
      const sorts = detail.sorts;
      setSortConfig({
        primary: sorts[0]
          ? { key: sorts[0].column, direction: sorts[0].direction }
          : null,
        secondary: sorts[1]
          ? { key: sorts[1].column, direction: sorts[1].direction }
          : null,
      });
    };

    table.addEventListener("_multisort", handleMultiSort);
    return () => table.removeEventListener("_multisort", handleMultiSort);
  }, [setSortConfig, viewSettings.layout]);

  // TODO: Remove this useEffect when GoabTabs wrapper exposes updateUrl and stackOnMobile props
  // Using goa-tabs web component directly because GoabTabs wrapper is missing these props
  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    const handleChange = (e: Event) => {
      const detail = (e as CustomEvent<{ tab: number }>).detail;
      if (detail.tab === 1) {
        setLayout("card"); // Grid view
      } else if (detail.tab === 2) {
        setLayout("list"); // List view
      }
    };

    tabs.addEventListener("_change", handleChange);
    return () => tabs.removeEventListener("_change", handleChange);
  }, [setLayout]);

  // Expanded groups state
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Extract unique filter values. Sizes order from smallest to largest.
  const SIZE_ORDER = ["interaction", "section", "page", "flow", "product"];
  const filterOptions = useMemo(() => {
    const sizes = [...new Set(examples.map((e) => e.data.size))].sort(
      (a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b),
    );
    const productTypes = [
      ...new Set(
        examples
          .map((e) => e.data.productType)
          .filter((st): st is "workspace" | "public-form" => !!st),
      ),
    ].sort();
    return { sizes, productTypes };
  }, [examples]);

  // Slash commands derived from available filter values
  const slashCommands = useMemo((): SlashCommand[] => {
    const cmds: SlashCommand[] = [];
    filterOptions.sizes.forEach((size) => {
      cmds.push({
        id: `size:${size}`,
        label: formatSize(size),
        group: "Size",
        filterType: "size",
        filterValue: size,
        active: appliedFilters.size.includes(size),
      });
    });
    filterOptions.productTypes.forEach((productType) => {
      cmds.push({
        id: `productType:${productType}`,
        label: formatProductType(productType),
        group: "Product type",
        filterType: "productType",
        filterValue: productType,
        active: appliedFilters.productType.includes(productType),
      });
    });
    return cmds;
  }, [filterOptions, appliedFilters]);

  const handleSlashCommand = useCallback((cmd: SlashCommand) => {
    const filterType = cmd.filterType as "size" | "productType";
    setAppliedFilters((prev) => {
      const current = prev[filterType];
      return {
        ...prev,
        [filterType]: current.includes(cmd.filterValue)
          ? current.filter((v) => v !== cmd.filterValue)
          : [...current, cmd.filterValue],
      };
    });
  }, []);

  // View mode: 'card' = grid view, 'list' = list view
  // On mobile, always use grid view (cards)
  const viewMode = useMemo(
    (): "card" | "list" => (viewSettings.layout === "list" ? "list" : "card"),
    [viewSettings.layout],
  );

  // Auto-switch to card view when container transitions to narrow
  const wasNarrowRef = useRef(false);
  useEffect(() => {
    const becameNarrow = isContainerNarrow && !wasNarrowRef.current;
    wasNarrowRef.current = isContainerNarrow;
    if (becameNarrow && viewSettings.layout === "list") {
      setLayout("card");
      if (tabsRef.current) {
        tabsRef.current.setAttribute("initialtab", "1");
      }
    }
  }, [isContainerNarrow, viewSettings.layout, setLayout]);

  // Filter and sort examples
  const filteredExamples = useMemo(() => {
    let result = examples;

    // Apply search filter
    if (searchQuery.trim()) {
      const searchResults = search(searchQuery, "example");
      const matchingSlugs = new Set(searchResults.map((r) => r.slug));
      const slugOrder = new Map(searchResults.map((r, i) => [r.slug, i]));
      result = result
        .filter((e) => matchingSlugs.has(e.slug))
        .sort((a, b) => (slugOrder.get(a.slug) ?? 0) - (slugOrder.get(b.slug) ?? 0));
    }

    // Apply type filters
    if (appliedFilters.size.length > 0) {
      result = result.filter((example) =>
        appliedFilters.size.includes(example.data.size),
      );
    }

    // Apply productType filters (entries without productType are excluded when filter is active)
    if (appliedFilters.productType.length > 0) {
      result = result.filter((example) =>
        example.data.productType
          ? appliedFilters.productType.includes(example.data.productType)
          : false,
      );
    }

    // Apply sorting
    if (sortConfig.primary) {
      result = [...result].sort((a, b) => {
        const key = sortConfig.primary!.key;
        const dir = sortConfig.primary!.direction === "asc" ? 1 : -1;

        let aVal: string;
        let bVal: string;

        switch (key) {
          case "title":
            aVal = a.data.title;
            bVal = b.data.title;
            break;
          case "size":
            aVal = a.data.size;
            bVal = b.data.size;
            break;
          case "productType":
            aVal = a.data.productType ?? "";
            bVal = b.data.productType ?? "";
            break;
          default:
            aVal = "";
            bVal = "";
        }

        const cmp = aVal.localeCompare(bVal);
        if (cmp !== 0) return cmp * dir;

        if (sortConfig.secondary) {
          const secKey = sortConfig.secondary.key;
          const secDir = sortConfig.secondary.direction === "asc" ? 1 : -1;

          let secAVal: string;
          let secBVal: string;

          switch (secKey) {
            case "title":
              secAVal = a.data.title;
              secBVal = b.data.title;
              break;
            case "size":
              secAVal = a.data.size;
              secBVal = b.data.size;
              break;
            case "productType":
              secAVal = a.data.productType ?? "";
              secBVal = b.data.productType ?? "";
              break;
            default:
              secAVal = "";
              secBVal = "";
          }

          return secAVal.localeCompare(secBVal) * secDir;
        }

        return 0;
      });
    }

    return result;
  }, [examples, appliedFilters, sortConfig, searchQuery, search]);

  // Group examples
  const groupedExamples = useMemo(() => {
    if (!viewSettings.groupBy) return null;

    const groups: { key: string; label: string; examples: Example[] }[] = [];
    const groupMap = new Map<string, Example[]>();

    filteredExamples.forEach((example) => {
      let groupKey: string;
      switch (viewSettings.groupBy) {
        case "size":
          groupKey = example.data.size;
          break;
        case "productType":
          groupKey = example.data.productType ?? "Universal";
          break;
        default:
          groupKey = "Unknown";
      }

      if (!groupMap.has(groupKey)) {
        groupMap.set(groupKey, []);
      }
      groupMap.get(groupKey)!.push(example);
    });

    const sortedKeys = Array.from(groupMap.keys()).sort();
    sortedKeys.forEach((key) => {
      let label: string;
      switch (viewSettings.groupBy) {
        case "size":
          label = formatSize(key);
          break;
        case "productType":
          label = key === "Universal" ? "Universal" : formatProductType(key);
          break;
        default:
          label = key;
      }
      groups.push({ key, label, examples: groupMap.get(key)! });
    });

    return groups;
  }, [filteredExamples, viewSettings.groupBy]);

  // Initialize expanded groups when grouping changes
  useEffect(() => {
    if (groupedExamples) {
      setExpandedGroups(new Set(groupedExamples.map((g) => g.key)));
    }
  }, [viewSettings.groupBy]);

  const toggleGroup = useCallback((groupKey: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupKey)) {
        next.delete(groupKey);
      } else {
        next.add(groupKey);
      }
      return next;
    });
  }, []);

  // Filter handlers
  const togglePendingFilter = useCallback(
    (filterType: "size" | "productType", value: string) => {
      setPendingFilters((prev) => ({
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter((v) => v !== value)
          : [...prev[filterType], value],
      }));
    },
    [],
  );

  const applyFilters = useCallback(() => {
    setAppliedFilters(pendingFilters);
    setFilterDrawerOpen(false);
  }, [pendingFilters]);

  const clearAllFilters = useCallback(() => {
    const empty = { size: [], productType: [] };
    setPendingFilters(empty);
    setAppliedFilters(empty);
  }, []);

  const removeAppliedFilter = useCallback(
    (filterType: "size" | "productType", value: string) => {
      setAppliedFilters((prev) => ({
        ...prev,
        [filterType]: prev[filterType].filter((v) => v !== value),
      }));
    },
    [],
  );

  // Clear all filters, sort, and search
  const clearAll = useCallback(() => {
    setSearchQuery("");
    clearAllFilters();
    clearSort();
  }, [clearAllFilters, clearSort]);

  // Render example card (grid view)
  const renderExampleCard = useCallback(
    (example: Example) => (
      <a
        key={example.slug}
        href={example.data.href ?? `/examples/${example.slug}`}
        className="example-card-link"
      >
        <div className="example-card-content">
          {example.data.previewImage ? (
            <img
              className="example-card-thumbnail"
              src={example.data.previewImage}
              alt=""
              loading="lazy"
            />
          ) : (
            <div className="example-card-thumbnail" aria-hidden="true" />
          )}

          {/* Title */}
          <h3 className="example-card-title">{example.data.title}</h3>

          {/* Description */}
          {example.body &&
            (() => {
              const firstLine = example.body.split("\n")[0].replace(/^#+\s*/, "");
              return (
                <p className="example-card-description">
                  {firstLine.substring(0, 120)}
                  {firstLine.length > 120 ? "..." : ""}
                </p>
              );
            })()}

          {/* Metadata badges */}
          <div className="example-card-badges">
            <goa-badge
              version="2"
              type={getSizeBadgeType(example.data.size)}
              content={formatSize(example.data.size)}
              emphasis="subtle"
              icon="false"
            />
            {example.data.productType && (
              <goa-badge
                version="2"
                type={getProductTypeBadgeType(example.data.productType)}
                content={formatProductType(example.data.productType)}
                emphasis="subtle"
                icon="false"
              />
            )}
            {example.data.tags?.slice(0, 3).map((tag) => (
              <goa-badge
                key={tag}
                version="2"
                type="default"
                content={tag.replace(/-/g, " ")}
                emphasis="subtle"
                icon="false"
              />
            ))}
          </div>
        </div>
      </a>
    ),
    [],
  );

  // Render table row (for list view)
  const renderTableRow = useCallback(
    (example: Example) => (
      <tr key={example.slug}>
        <td>
          <a
            href={example.data.href ?? `/examples/${example.slug}`}
            className="example-table-link"
          >
            {example.data.title}
          </a>
        </td>
        <td>
          <goa-badge
            version="2"
            type={getSizeBadgeType(example.data.size)}
            content={formatSize(example.data.size)}
            emphasis="subtle"
            icon="false"
          />
        </td>
        <td>
          {example.data.productType && (
            <goa-badge
              version="2"
              type={getProductTypeBadgeType(example.data.productType)}
              content={formatProductType(example.data.productType)}
              emphasis="subtle"
              icon="false"
            />
          )}
        </td>
        <td>
          <div className="example-tags">
            {example.data.tags?.slice(0, 3).map((tag) => (
              <goa-badge
                key={tag}
                version="2"
                type="default"
                content={tag}
                emphasis="subtle"
                icon="false"
              />
            ))}
          </div>
        </td>
      </tr>
    ),
    [],
  );

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

  const hasActiveFilters =
    appliedFilters.size.length > 0 || appliedFilters.productType.length > 0;

  return (
    <div className="examples-grid" ref={gridRef}>
      {/* Sentinel for sticky detection - placed before toolbar */}
      <div ref={sentinelRef} className="examples-sentinel" aria-hidden="true" />

      {/* Toolbar */}
      <div className={`examples-toolbar ${isSticky ? "examples-toolbar--sticky" : ""}`}>
        {/* Search input - filters the grid directly */}
        <div className="examples-search-section">
          <InlineSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery("")}
            placeholder="Search or type / to filter..."
            commands={slashCommands}
            onCommandSelect={handleSlashCommand}
            isLoading={isLoading}
            error={error}
          />
        </div>

        {/* View toggle + Filters */}
        <div className="examples-toolbar-actions">
          {/*
           * TODO: Replace <goa-tabs> with GoabTabs when wrapper exposes these props
           *
           * Using web component directly because GoabTabs wrapper is missing:
           * - updateUrl prop (we need false to avoid polluting browser history)
           * - stackOnMobile prop (we need false for compact view toggle)
           *
           * When fixed, remove: tabsRef, useEffect for _change event, goa-tabs from global.d.ts
           */}
          <div className="view-toggle-wrapper">
            <goa-tabs
              ref={tabsRef}
              version="2"
              variant="segmented"
              initialTab={viewMode === "card" ? 1 : 2}
              orientation="horizontal"
            >
              <goa-tab heading="Grid">
                <span />
              </goa-tab>
              <goa-tab heading="List">
                <span />
              </goa-tab>
            </goa-tabs>
          </div>

          <span className="filter-btn-desktop">
            <GoabButton
              type="secondary"
              leadingIcon="filter-lines"
              size="compact"
              onClick={() => {
                if (filterDrawerOpen) {
                  setFilterDrawerOpen(false);
                } else {
                  setPendingFilters(appliedFilters);
                  setFilterDrawerOpen(true);
                }
              }}
            >
              Filters
            </GoabButton>
          </span>
          <span className="filter-btn-mobile">
            <GoabIconButton
              icon="filter-lines"
              size="medium"
              variant="dark"
              onClick={() => {
                if (filterDrawerOpen) {
                  setFilterDrawerOpen(false);
                } else {
                  setPendingFilters(appliedFilters);
                  setFilterDrawerOpen(true);
                }
              }}
            />
          </span>
        </div>
      </div>

      {/* Active filters chips */}
      {hasActiveFilters && (
        <div className="examples-chips">
          <GoabIcon
            type="filter-lines"
            size="small"
            fillColor="var(--goa-color-text-secondary)"
          />

          {/* Sort chips */}
          {sortConfig.primary && (
            <GoabFilterChip
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
            <GoabFilterChip
              content={sortConfig.secondary.key}
              leadingIcon={
                sortConfig.secondary.direction === "asc" ? "arrow-up" : "arrow-down"
              }
              secondaryText="2nd"
              onClick={() => setSortConfig((prev) => ({ ...prev, secondary: null }))}
            />
          )}

          {/* Size filter chips */}
          {appliedFilters.size.map((size) => (
            <GoabFilterChip
              key={`size-${size}`}
              content={formatSize(size)}
              onClick={() => removeAppliedFilter("size", size)}
            />
          ))}

          {/* Product type filter chips */}
          {appliedFilters.productType.map((productType) => (
            <GoabFilterChip
              key={`st-${productType}`}
              content={formatProductType(productType)}
              onClick={() => removeAppliedFilter("productType", productType)}
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
      <p className="examples-count">
        {filteredExamples.length} example{filteredExamples.length !== 1 ? "s" : ""}
      </p>

      {/* List View (table) */}
      {viewMode === "list" && (
        <div
          className="examples-table-wrapper"
          onScroll={(e) => {
            const el = e.currentTarget;
            const table = el.querySelector("goa-table") as HTMLElement;
            if (!table) return;
            const inset = parseFloat(getComputedStyle(table).marginLeft) || 0;
            const maxScroll = el.scrollWidth - el.clientWidth;
            const leftShadow = el.querySelector(
              ".examples-table-scroll-shadow-left",
            ) as HTMLElement;
            const rightShadow = el.querySelector(
              ".examples-table-scroll-shadow-right",
            ) as HTMLElement;
            if (leftShadow) leftShadow.style.opacity = el.scrollLeft > inset ? "1" : "0";
            if (rightShadow)
              rightShadow.style.opacity = el.scrollLeft < maxScroll - inset ? "1" : "0";
          }}
          ref={(el) => {
            if (!el) return;
            requestAnimationFrame(() => {
              const table = el.querySelector("goa-table") as HTMLElement;
              if (!table) return;
              const inset = parseFloat(getComputedStyle(table).marginLeft) || 0;
              const maxScroll = el.scrollWidth - el.clientWidth;
              const rightShadow = el.querySelector(
                ".examples-table-scroll-shadow-right",
              ) as HTMLElement;
              if (rightShadow && maxScroll > inset) rightShadow.style.opacity = "1";
            });
          }}
        >
          <div className="examples-table-scroll-shadow-left" aria-hidden="true" />
          {/* Using web components directly for V2 styling - React wrappers don't pass version prop */}
          <goa-table
            ref={tableRef}
            version="2"
            width="100%"
            variant="normal"
            sort-mode="multi"
          >
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "320px" }}>
                    <goa-table-sort-header
                      version="2"
                      name="title"
                      direction={getColumnSortDirection("title")}
                      sort-order={getColumnSortOrder("title")}
                    >
                      Name
                    </goa-table-sort-header>
                  </th>
                  <th style={{ width: "120px" }}>
                    <goa-table-sort-header
                      version="2"
                      name="size"
                      direction={getColumnSortDirection("size")}
                      sort-order={getColumnSortOrder("size")}
                    >
                      Size
                    </goa-table-sort-header>
                  </th>
                  <th style={{ minWidth: "140px" }}>
                    <goa-table-sort-header
                      version="2"
                      name="productType"
                      direction={getColumnSortDirection("productType")}
                      sort-order={getColumnSortOrder("productType")}
                    >
                      Product type
                    </goa-table-sort-header>
                  </th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                {groupedExamples
                  ? groupedExamples.map((group) => (
                      <React.Fragment key={group.key}>
                        <tr
                          className="examples-group-row"
                          onClick={() => toggleGroup(group.key)}
                        >
                          <td colSpan={4}>
                            <div className="examples-group-header">
                              <GoabIcon
                                type={
                                  expandedGroups.has(group.key)
                                    ? "chevron-down"
                                    : "chevron-forward"
                                }
                                size="small"
                              />
                              <strong>{group.label}</strong>
                              <goa-badge
                                version="2"
                                type="default"
                                content={String(group.examples.length)}
                                emphasis="subtle"
                              />
                            </div>
                          </td>
                        </tr>
                        {expandedGroups.has(group.key) &&
                          group.examples.map(renderTableRow)}
                      </React.Fragment>
                    ))
                  : filteredExamples.map(renderTableRow)}
              </tbody>
            </table>
          </goa-table>
          <div className="examples-table-scroll-shadow-right" aria-hidden="true" />
        </div>
      )}

      {/* Card View */}
      {viewMode === "card" && (
        <div className="examples-card-view">
          {groupedExamples ? (
            groupedExamples.map((group) => (
              <div key={group.key} className="examples-group">
                <button
                  className="examples-group-btn"
                  onClick={() => toggleGroup(group.key)}
                >
                  <GoabIcon
                    type={
                      expandedGroups.has(group.key) ? "chevron-down" : "chevron-forward"
                    }
                    size="small"
                  />
                  <strong>{group.label}</strong>
                  <goa-badge
                    version="2"
                    type="dark"
                    content={String(group.examples.length)}
                    emphasis="subtle"
                  />
                </button>
                {expandedGroups.has(group.key) && (
                  <div className="examples-card-grid">
                    {group.examples.map(renderExampleCard)}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="examples-card-grid">
              {filteredExamples.map(renderExampleCard)}
            </div>
          )}
        </div>
      )}

      {/* Filter Push Drawer - portaled to layout level */}
      {typeof document !== "undefined" &&
        document.getElementById("push-drawer-portal") &&
        createPortal(
          <GoabPushDrawer
            heading="Filter examples"
            open={filterDrawerOpen}
            width="300px"
            onClose={() => setFilterDrawerOpen(false)}
            actions={
              <GoabButtonGroup alignment="start" gap="compact">
                <GoabButton type="primary" size="compact" onClick={applyFilters}>
                  Apply filters
                </GoabButton>
                <GoabButton
                  type="tertiary"
                  size="compact"
                  onClick={() => setFilterDrawerOpen(false)}
                >
                  Cancel
                </GoabButton>
              </GoabButtonGroup>
            }
          >
            <div className="filter-drawer-content">
              {/* Size filter */}
              <div className="filter-group">
                <div className="filter-group-label">Size</div>
                <GoabCheckboxList
                  name="size"
                  size="compact"
                  value={pendingFilters.size}
                  onChange={(detail: GoabCheckboxListOnChangeDetail) =>
                    setPendingFilters((prev) => ({ ...prev, size: detail.value }))
                  }
                >
                  {filterOptions.sizes.map((size) => (
                    <GoabCheckbox
                      key={size}
                      name={size}
                      value={size}
                      text={formatSize(size)}
                      size="compact"
                    />
                  ))}
                </GoabCheckboxList>
              </div>

              {/* Product type filter */}
              <div className="filter-group">
                <div className="filter-group-label">Product type</div>
                <GoabCheckboxList
                  name="productType"
                  size="compact"
                  value={pendingFilters.productType}
                  onChange={(detail: GoabCheckboxListOnChangeDetail) =>
                    setPendingFilters((prev) => ({ ...prev, productType: detail.value }))
                  }
                >
                  {filterOptions.productTypes.map((productType) => (
                    <GoabCheckbox
                      key={productType}
                      name={productType}
                      value={productType}
                      text={formatProductType(productType)}
                      size="compact"
                    />
                  ))}
                </GoabCheckboxList>
              </div>

              {(pendingFilters.size.length > 0 ||
                pendingFilters.productType.length > 0) && (
                <>
                  <GoabDivider />
                  <GoabButton
                    type="tertiary"
                    size="compact"
                    onClick={() => setPendingFilters({ size: [], productType: [] })}
                  >
                    Clear all filters
                  </GoabButton>
                </>
              )}
            </div>
          </GoabPushDrawer>,
          document.getElementById("push-drawer-portal")!,
        )}

      <style>{`
        .examples-grid {
          max-width: 100%;
          container-type: inline-size;
        }

        /* Sentinel for sticky detection - invisible marker */
        .examples-sentinel {
          height: 1px;
          margin-bottom: -1px;
        }

        /* Toolbar - single row layout */
        .examples-toolbar {
          position: sticky;
          top: 0;
          z-index: 1;
          background: var(--goa-color-greyscale-white);
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: var(--goa-space-m);
          padding: var(--goa-space-m) 0 var(--goa-space-xs);
          transition: padding 0.15s ease;
        }

        /* When sticky - add shadow */
        .examples-toolbar--sticky {
          padding: var(--goa-space-s) 0 var(--goa-space-xs);
          margin-bottom: 0;
          background: transparent;
        }

        .examples-toolbar--sticky::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
          right: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
          background: var(--goa-color-greyscale-white);
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
          z-index: -1;
        }

        .examples-search-section {
          flex: 1;
          min-width: 200px;
        }

        /* Toolbar actions */
        .examples-toolbar-actions {
          display: flex;
          align-items: flex-start;
          gap: var(--goa-space-m);
          min-height: 40px;
        }

        /* Narrow container: stack toolbar vertically */
        @container (max-width: 640px) {
          .examples-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .examples-search-section {
            min-width: unset;
          }

          .examples-toolbar-actions {
            align-self: flex-start;
          }
        }

        /* Filter button: desktop shows text, mobile shows icon-only */
        .filter-btn-mobile { display: none; }

        @media (max-width: 623px) {
          .filter-btn-desktop { display: none; }
          .filter-btn-mobile { display: contents; }

          .examples-toolbar {
            flex-direction: row !important;
            align-items: flex-start !important;
          }

          .examples-search-section {
            min-width: 0 !important;
          }
        }

        /* View toggle wrapper - tabs used as segmented toggle, hide content area */
        .view-toggle-wrapper {
          overflow: hidden;
          max-height: 40px;
        }

        /* Filter chips */
        .examples-chips {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
          flex-wrap: wrap;
          padding-top: var(--goa-space-2xs);
          margin-bottom: var(--goa-space-l);
        }

        .examples-count {
          color: var(--goa-color-text-secondary);
          font: var(--goa-typography-body-s);
          margin-top: var(--goa-space-m);
          margin-bottom: var(--goa-space-m);
        }

        /* Horizontal scroll container for table - bleeds into card padding */
        /* TODO: Remove calc workaround when goa-table V2 gets box-sizing: border-box */
        .examples-table-wrapper {
          display: flex;
          align-items: stretch;
          overflow-x: auto;
          margin-left: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
          margin-right: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
        }

        .examples-table-wrapper > * {
          flex-grow: 1;
          min-width: max-content;
        }

        .examples-table-wrapper goa-table {
          width: calc(100% - 2px) !important;
          margin-left: var(--card-padding-h, var(--goa-space-2xl));
          margin-right: var(--card-padding-h, var(--goa-space-2xl));
        }

        .examples-table-scroll-shadow-left,
        .examples-table-scroll-shadow-right {
          position: sticky;
          width: 8px;
          min-width: 8px;
          flex-shrink: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .examples-table-scroll-shadow-left {
          left: 0;
          margin-right: -8px;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.08), transparent);
        }

        .examples-table-scroll-shadow-right {
          right: 0;
          margin-left: -8px;
          background: linear-gradient(to left, rgba(0, 0, 0, 0.08), transparent);
        }

        .examples-group-row {
          cursor: pointer;
          background-color: var(--goa-color-greyscale-100);
        }

        .examples-group-row:hover {
          background-color: var(--goa-color-greyscale-200);
        }

        .examples-group-header {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
        }

        .example-table-link {
          color: var(--goa-color-interactive-default);
          text-decoration: underline;
        }

        .example-table-link:hover {
          text-decoration: none;
        }

        .example-category-badges {
          display: flex;
          flex-wrap: wrap;
          gap: var(--goa-space-xs);
        }

        .example-tags,
        .example-categories {
          display: flex;
          flex-wrap: wrap;
          gap: var(--goa-space-xs);
        }

        /* Card/Grid view */
        .examples-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          column-gap: var(--goa-space-l);
          row-gap: var(--goa-space-xl);
        }

        @media (max-width: 623px) {
          .examples-card-grid {
            grid-template-columns: 1fr;
          }

          .view-toggle-wrapper {
            display: none;
          }
        }

        .example-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .example-card-content {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-s);
        }

        img.example-card-thumbnail {
          aspect-ratio: 16 / 10;
          width: 100%;
          object-fit: contain;
          border-radius: var(--goa-border-radius-m);
          border: 1px solid var(--goa-color-greyscale-200);
          margin-bottom: var(--goa-space-2xs);
        }

        div.example-card-thumbnail {
          aspect-ratio: 16 / 10;
          background: var(--goa-color-greyscale-200);
          border-radius: var(--goa-border-radius-m);
          margin-bottom: var(--goa-space-xs);
        }

        .example-card-title {
          margin: 0;
          font: var(--goa-typography-heading-xs);
          color: var(--goa-color-interactive-default);
          text-decoration: underline;
        }

        .example-card-title:hover {
          text-decoration: none;
        }

        .example-card-badges {
          display: flex;
          flex-wrap: wrap;
          gap: var(--goa-space-xs);
        }

        .example-card-description {
          margin: 0;
          font: var(--goa-typography-body-s);
          color: var(--goa-color-text-secondary);
          line-height: 1.5;
        }

        /* Groups */
        .examples-group {
          margin-bottom: var(--goa-space-l);
        }

        .examples-group-btn {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
          background: none;
          border: none;
          padding: var(--goa-space-s) 0;
          cursor: pointer;
          width: 100%;
          text-align: left;
          font: var(--goa-typography-heading-xs);
        }

        .examples-group-btn:hover {
          background-color: var(--goa-color-greyscale-100);
        }

        .examples-group-btn:focus-visible {
          outline: 2px solid var(--goa-color-interactive-focus);
          outline-offset: 2px;
          border-radius: var(--goa-border-radius-s);
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

        .filter-group-label {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
          font: var(--goa-typography-body-m);
          font-weight: var(--goa-font-weight-bold);
          margin-bottom: var(--goa-space-s);
        }

        .filter-swatch {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 3px;
          border: 1px solid;
          flex-shrink: 0;
        }

      `}</style>
    </div>
  );
}

export default ExamplesGrid;
