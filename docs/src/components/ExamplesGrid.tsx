/**
 * ExamplesGrid.tsx
 *
 * Data grid for examples with:
 * - Grid/List views (responsive to viewport)
 * - Column header sorting (list view)
 * - Category/Scale/UserType filtering via drawer
 * - Search with helper text
 * - Grouping via settings popover
 *
 * Design pattern based on Figma + workspace demo hybrid approach.
 */

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { withBase } from "@/lib/base-url";
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
    categories: (
      | "content-layout"
      | "feedback-and-alerts"
      | "inputs-and-actions"
      | "forms"
      | "structure-and-navigation"
      | "technical"
    )[];
    scale: "interaction" | "task" | "page" | "product";
    userType: "citizen" | "worker" | "both";
    tags?: string[];
    components: string[];
    status: "published" | "draft" | "deprecated";
    previewImage?: string;
  };
  body?: string;
}

interface ExamplesGridProps {
  examples: Example[];
}

const DEFAULT_VISIBLE_COLUMNS = ["title", "scale", "category", "userType", "status"];

// Badge type mapping for scales (using V2 extended colors)
function getScaleBadgeType(
  scale: string,
): "sky" | "sunset" | "pasture" | "lilac" | "prairie" | "dawn" | "information" {
  switch (scale) {
    case "interaction":
      return "information";
    case "task":
      return "sunset";
    case "page":
      return "pasture";
    case "flow":
      return "lilac";
    case "product":
      return "prairie";
    default:
      return "dawn";
  }
}

// Badge type mapping for categories (using V2 extended colors)
function getCategoryBadgeType(
  category: string,
): "sky" | "pasture" | "dawn" | "lilac" | "prairie" | "default" {
  switch (category) {
    case "content-layout":
      return "sky";
    case "feedback-and-alerts":
      return "prairie";
    case "structure-and-navigation":
      return "lilac";
    case "inputs-and-actions":
      return "dawn";
    case "forms":
      return "pasture";
    case "technical":
      return "default";
    case "utilities":
      return "default";
    default:
      return "default";
  }
}

// Format category for display (sentence case)
function formatCategory(category: string): string {
  const words = category.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

// Format scale for display
function formatScale(scale: string): string {
  return scale.charAt(0).toUpperCase() + scale.slice(1);
}

// Format user type for display
function formatUserType(userType: string): string {
  if (userType === "both") return "Citizen and worker";
  return userType.charAt(0).toUpperCase() + userType.slice(1);
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
    category: [] as string[],
    scale: [] as string[],
    userType: [] as string[],
  };
  const [pendingFilters, setPendingFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters);

  // Read URL params on mount for initial filters (e.g. ?userType=citizen)
  const [urlFiltersApplied, setUrlFiltersApplied] = useState(false);
  useEffect(() => {
    if (urlFiltersApplied) return;
    const params = new URLSearchParams(window.location.search);
    const fromUrl = {
      category: params.get("category")?.split(",").filter(Boolean) ?? [],
      scale: params.get("scale")?.split(",").filter(Boolean) ?? [],
      userType: params.get("userType")?.split(",").filter(Boolean) ?? [],
    };
    if (fromUrl.category.length || fromUrl.scale.length || fromUrl.userType.length) {
      setPendingFilters(fromUrl);
      setAppliedFilters(fromUrl);
    }
    setUrlFiltersApplied(true);
  }, [urlFiltersApplied]);

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

  // Extract unique filter values
  const filterOptions = useMemo(() => {
    const categories = [...new Set(examples.flatMap((e) => e.data.categories))].sort(
      (a, b) => (a === "forms" ? -1 : b === "forms" ? 1 : a.localeCompare(b)),
    );
    const scales = [...new Set(examples.map((e) => e.data.scale))].sort((a, b) =>
      a === "product" ? 1 : b === "product" ? -1 : a.localeCompare(b),
    );
    const allUserTypes = [...new Set(examples.map((e) => e.data.userType))].sort(
      (a, b) => (a === "both" ? 1 : b === "both" ? -1 : a.localeCompare(b)),
    );
    const userTypes = allUserTypes.filter((ut) => ut !== "both");
    return { categories, scales, userTypes, allUserTypes };
  }, [examples]);

  // Slash commands derived from available filter values
  const slashCommands = useMemo((): SlashCommand[] => {
    const cmds: SlashCommand[] = [];
    filterOptions.scales.forEach((scale) => {
      cmds.push({
        id: `scale:${scale}`,
        label: formatScale(scale),
        group: "Scale",
        filterType: "scale",
        filterValue: scale,
        active: appliedFilters.scale.includes(scale),
      });
    });
    filterOptions.categories.forEach((cat) => {
      cmds.push({
        id: `category:${cat}`,
        label: formatCategory(cat),
        group: "Category",
        filterType: "category",
        filterValue: cat,
        active: appliedFilters.category.includes(cat),
      });
    });
    filterOptions.allUserTypes.forEach((ut) => {
      cmds.push({
        id: `userType:${ut}`,
        label: formatUserType(ut),
        group: "User Type",
        filterType: "userType",
        filterValue: ut,
        active:
          ut === "both"
            ? appliedFilters.userType.includes("citizen") &&
              appliedFilters.userType.includes("worker")
            : appliedFilters.userType.includes(ut),
      });
    });
    return cmds;
  }, [filterOptions, appliedFilters]);

  const handleSlashCommand = useCallback((cmd: SlashCommand) => {
    const filterType = cmd.filterType as "category" | "scale" | "userType";
    // "both" expands to citizen + worker
    if (filterType === "userType" && cmd.filterValue === "both") {
      setAppliedFilters((prev) => {
        const hasBoth =
          prev.userType.includes("citizen") && prev.userType.includes("worker");
        return {
          ...prev,
          userType: hasBoth
            ? prev.userType.filter((v) => v !== "citizen" && v !== "worker")
            : [...new Set([...prev.userType, "citizen", "worker"])],
        };
      });
      return;
    }
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

    // Apply category filters (OR logic - show if example has ANY of the selected categories)
    if (appliedFilters.category.length > 0) {
      result = result.filter((example) =>
        example.data.categories.some((cat) => appliedFilters.category.includes(cat)),
      );
    }

    // Apply scale filters
    if (appliedFilters.scale.length > 0) {
      result = result.filter((example) =>
        appliedFilters.scale.includes(example.data.scale),
      );
    }

    // Apply userType filters ("both" examples match either citizen or worker)
    if (appliedFilters.userType.length > 0) {
      result = result.filter((example) =>
        example.data.userType === "both"
          ? appliedFilters.userType.includes("citizen") ||
            appliedFilters.userType.includes("worker")
          : appliedFilters.userType.includes(example.data.userType),
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
          case "category":
            aVal = a.data.categories[0] || "";
            bVal = b.data.categories[0] || "";
            break;
          case "scale":
            aVal = a.data.scale;
            bVal = b.data.scale;
            break;
          case "userType":
            aVal = a.data.userType;
            bVal = b.data.userType;
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
            case "category":
              secAVal = a.data.categories[0] || "";
              secBVal = b.data.categories[0] || "";
              break;
            case "scale":
              secAVal = a.data.scale;
              secBVal = b.data.scale;
              break;
            case "userType":
              secAVal = a.data.userType;
              secBVal = b.data.userType;
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
        case "category":
          groupKey = example.data.categories[0] || "Uncategorized";
          break;
        case "scale":
          groupKey = example.data.scale;
          break;
        case "userType":
          groupKey = example.data.userType;
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
        case "category":
          label = formatCategory(key);
          break;
        case "scale":
          label = formatScale(key);
          break;
        case "userType":
          label = formatUserType(key);
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
    (filterType: "category" | "scale" | "userType", value: string) => {
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
    const empty = { category: [], scale: [], userType: [] };
    setPendingFilters(empty);
    setAppliedFilters(empty);
  }, []);

  const removeAppliedFilter = useCallback(
    (filterType: "category" | "scale" | "userType", value: string) => {
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
        href={withBase(`/examples/${example.slug}`)}
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
              type="lilac"
              content={formatScale(example.data.scale)}
              emphasis="subtle"
              icon="false"
            />
            {example.data.categories.map((cat) => (
              <goa-badge
                key={cat}
                version="2"
                type="sunset"
                content={formatCategory(cat)}
                emphasis="subtle"
                icon="false"
              />
            ))}
            {(example.data.userType === "both"
              ? ["citizen", "worker"]
              : [formatUserType(example.data.userType)]
            ).map((ut) => (
              <goa-badge
                key={ut}
                version="2"
                type="sky"
                content={ut}
                emphasis="subtle"
                icon="false"
              />
            ))}
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
          <a href={withBase(`/examples/${example.slug}`)} className="example-table-link">
            {example.data.title}
          </a>
        </td>
        <td>
          <div className="example-categories">
            {example.data.categories.map((cat) => (
              <goa-badge
                key={cat}
                version="2"
                type={getCategoryBadgeType(cat)}
                content={formatCategory(cat)}
                emphasis="subtle"
                icon="false"
              />
            ))}
          </div>
        </td>
        <td>
          <goa-badge
            version="2"
            type={getScaleBadgeType(example.data.scale)}
            content={formatScale(example.data.scale)}
            emphasis="subtle"
            icon="false"
          />
        </td>
        <td>{formatUserType(example.data.userType)}</td>
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
    appliedFilters.category.length > 0 ||
    appliedFilters.scale.length > 0 ||
    appliedFilters.userType.length > 0;

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

          {/* Category filter chips */}
          {appliedFilters.category.map((cat) => (
            <GoabFilterChip
              key={`cat-${cat}`}
              content={formatCategory(cat)}
              onClick={() => removeAppliedFilter("category", cat)}
            />
          ))}

          {/* Scale filter chips */}
          {appliedFilters.scale.map((scale) => (
            <GoabFilterChip
              key={`scale-${scale}`}
              content={formatScale(scale)}
              onClick={() => removeAppliedFilter("scale", scale)}
            />
          ))}

          {/* User type filter chips */}
          {appliedFilters.userType.map((ut) => (
            <GoabFilterChip
              key={`ut-${ut}`}
              content={formatUserType(ut)}
              onClick={() => removeAppliedFilter("userType", ut)}
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
                  <th>
                    <goa-table-sort-header
                      version="2"
                      name="category"
                      direction={getColumnSortDirection("category")}
                      sort-order={getColumnSortOrder("category")}
                    >
                      Category
                    </goa-table-sort-header>
                  </th>
                  <th>
                    <goa-table-sort-header
                      version="2"
                      name="scale"
                      direction={getColumnSortDirection("scale")}
                      sort-order={getColumnSortOrder("scale")}
                    >
                      Scale
                    </goa-table-sort-header>
                  </th>
                  <th style={{ minWidth: "140px" }}>
                    <goa-table-sort-header
                      version="2"
                      name="userType"
                      direction={getColumnSortDirection("userType")}
                      sort-order={getColumnSortOrder("userType")}
                    >
                      User Type
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
                          <td colSpan={5}>
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
              {/* Scale filter */}
              <div className="filter-group">
                <div className="filter-group-label">
                  Scale{" "}
                  <span
                    className="filter-swatch"
                    style={{ background: "#efe2fb", borderColor: "#e2d2fd" }}
                  />
                </div>
                <GoabCheckboxList
                  name="scale"
                  size="compact"
                  value={pendingFilters.scale}
                  onChange={(detail: GoabCheckboxListOnChangeDetail) =>
                    setPendingFilters((prev) => ({ ...prev, scale: detail.value }))
                  }
                >
                  {filterOptions.scales.map((scale) => (
                    <GoabCheckbox
                      key={scale}
                      name={scale}
                      value={scale}
                      text={formatScale(scale)}
                      size="compact"
                    />
                  ))}
                </GoabCheckboxList>
              </div>

              {/* Category filter */}
              <div className="filter-group">
                <div className="filter-group-label">
                  Category{" "}
                  <span
                    className="filter-swatch"
                    style={{ background: "#fcefd5", borderColor: "#f5ddad" }}
                  />
                </div>
                <GoabCheckboxList
                  name="category"
                  size="compact"
                  value={pendingFilters.category}
                  onChange={(detail: GoabCheckboxListOnChangeDetail) =>
                    setPendingFilters((prev) => ({ ...prev, category: detail.value }))
                  }
                >
                  {filterOptions.categories.map((category) => (
                    <GoabCheckbox
                      key={category}
                      name={category}
                      value={category}
                      text={formatCategory(category)}
                      size="compact"
                    />
                  ))}
                </GoabCheckboxList>
              </div>

              {/* User Type filter */}
              <div className="filter-group">
                <div className="filter-group-label">
                  User type{" "}
                  <span
                    className="filter-swatch"
                    style={{ background: "#e2f9f8", borderColor: "#bff0ee" }}
                  />
                </div>
                <GoabCheckboxList
                  name="userType"
                  size="compact"
                  value={pendingFilters.userType}
                  onChange={(detail: GoabCheckboxListOnChangeDetail) =>
                    setPendingFilters((prev) => ({ ...prev, userType: detail.value }))
                  }
                >
                  {filterOptions.userTypes.map((userType) => (
                    <GoabCheckbox
                      key={userType}
                      name={userType}
                      value={userType}
                      text={formatUserType(userType)}
                      size="compact"
                    />
                  ))}
                </GoabCheckboxList>
              </div>

              {(pendingFilters.category.length > 0 ||
                pendingFilters.scale.length > 0 ||
                pendingFilters.userType.length > 0) && (
                <>
                  <GoabDivider />
                  <GoabButton
                    type="tertiary"
                    size="compact"
                    onClick={() =>
                      setPendingFilters({ category: [], scale: [], userType: [] })
                    }
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
