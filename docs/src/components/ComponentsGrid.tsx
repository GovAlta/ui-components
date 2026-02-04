/**
 * ComponentsGrid.tsx
 *
 * Data grid for components with:
 * - Grid/List views (responsive to viewport)
 * - Column header sorting (list view)
 * - Category/Status filtering via drawer
 * - Search with helper text
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
  GoabIcon,
  GoabDivider,
  GoabButtonGroup,
  GoabCheckboxList,
  GoabTab,
  type GoabCheckboxListOnChangeDetail,
} from "@abgov/react-components";
import { useTwoLevelSort } from "../hooks/useTwoLevelSort";
import { useMobile } from "../hooks/useCompactToolbar";
import { useViewSettings } from "../hooks/useViewSettings";

// Type for component data (matches Astro content collection)
export interface Component {
  slug: string;
  data: {
    name: string;
    description?: string;
    status: "stable" | "beta" | "deprecated" | "experimental";
    category:
      | "inputs-and-actions"
      | "content-layout"
      | "structure-and-navigation"
      | "feedback-and-alerts"
      | "utilities";
    tags?: string[];
    relatedComponents?: string[];
    webComponentTag?: string;
    reactClassName?: string;
    angularSelector?: string;
  };
}

interface ComponentsGridProps {
  components: Component[];
}

const DEFAULT_VISIBLE_COLUMNS = ["name", "description", "category", "status"];

// Badge type mapping for status (semantic)
function getStatusBadgeType(
  status: string,
): "success" | "warning" | "emergency" | "information" {
  switch (status) {
    case "stable":
      return "success";
    case "beta":
      return "information";
    case "experimental":
      return "warning";
    case "deprecated":
      return "emergency";
    default:
      return "information";
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

// Format category for display
function formatCategory(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Format status for display
function formatStatus(status: string): string {
  if (status === "stable") return "Available";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function ComponentsGrid({ components }: ComponentsGridProps) {
  // State
  const [searchValue, setSearchValue] = useState("");
  const [searchChips, setSearchChips] = useState<string[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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
  const [pendingFilters, setPendingFilters] = useState<{
    category: string[];
    status: string[];
  }>({ category: [], status: [] });
  const [appliedFilters, setAppliedFilters] = useState<{
    category: string[];
    status: string[];
  }>({ category: [], status: [] });

  // Hooks
  const { sortConfig, setSortConfig, sortByKey, clearSort, handleTableSort } =
    useTwoLevelSort();
  const isMobile = useMobile();
  const { viewSettings, setLayout } = useViewSettings({
    pageKey: "components",
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
    const categories = [...new Set(components.map((c) => c.data.category))].sort();
    const statuses = [...new Set(components.map((c) => c.data.status))].sort();
    return { categories, statuses };
  }, [components]);

  // View mode: 'card' = grid view, 'list' = list view (table)
  // On mobile, always use card view
  const viewMode = useMemo((): "card" | "list" => {
    if (isMobile) return "card";
    return viewSettings.layout === "list" ? "list" : "card";
  }, [isMobile, viewSettings.layout]);

  // Filter and sort components
  const filteredComponents = useMemo(() => {
    let result = components;

    // Apply search chips
    if (searchChips.length > 0) {
      result = result.filter((component) =>
        searchChips.every(
          (chip) =>
            component.data.name.toLowerCase().includes(chip.toLowerCase()) ||
            (component.data.description || "")
              .toLowerCase()
              .includes(chip.toLowerCase()) ||
            component.data.category.toLowerCase().includes(chip.toLowerCase()) ||
            (component.data.tags || []).some((tag) =>
              tag.toLowerCase().includes(chip.toLowerCase()),
            ) ||
            (component.data.webComponentTag || "")
              .toLowerCase()
              .includes(chip.toLowerCase()),
        ),
      );
    }

    // Apply category filters
    if (appliedFilters.category.length > 0) {
      result = result.filter((component) =>
        appliedFilters.category.includes(component.data.category),
      );
    }

    // Apply status filters
    if (appliedFilters.status.length > 0) {
      result = result.filter((component) =>
        appliedFilters.status.includes(component.data.status),
      );
    }

    // Apply sorting
    if (sortConfig.primary) {
      result = [...result].sort((a, b) => {
        const key = sortConfig.primary!.key;
        let aVal: string;
        let bVal: string;

        switch (key) {
          case "name":
            aVal = a.data.name;
            bVal = b.data.name;
            break;
          case "category":
            aVal = a.data.category;
            bVal = b.data.category;
            break;
          case "status":
            aVal = a.data.status;
            bVal = b.data.status;
            break;
          default:
            aVal = "";
            bVal = "";
        }

        const cmp = aVal.localeCompare(bVal);
        const dir = sortConfig.primary!.direction === "asc" ? 1 : -1;

        if (cmp !== 0) return cmp * dir;

        if (sortConfig.secondary) {
          const secKey = sortConfig.secondary.key;
          let secAVal: string;
          let secBVal: string;

          switch (secKey) {
            case "name":
              secAVal = a.data.name;
              secBVal = b.data.name;
              break;
            case "category":
              secAVal = a.data.category;
              secBVal = b.data.category;
              break;
            case "status":
              secAVal = a.data.status;
              secBVal = b.data.status;
              break;
            default:
              secAVal = "";
              secBVal = "";
          }

          const secDir = sortConfig.secondary.direction === "asc" ? 1 : -1;
          return secAVal.localeCompare(secBVal) * secDir;
        }

        return 0;
      });
    }

    return result;
  }, [components, searchChips, appliedFilters, sortConfig]);

  // Group components by category
  const groupedComponents = useMemo(() => {
    if (!viewSettings.groupBy) return null;

    const groups: { key: string; label: string; components: Component[] }[] = [];
    const groupMap = new Map<string, Component[]>();

    filteredComponents.forEach((component) => {
      let groupKey: string;
      switch (viewSettings.groupBy) {
        case "category":
          groupKey = component.data.category;
          break;
        case "status":
          groupKey = component.data.status;
          break;
        default:
          groupKey = "Unknown";
      }

      if (!groupMap.has(groupKey)) {
        groupMap.set(groupKey, []);
      }
      groupMap.get(groupKey)!.push(component);
    });

    const sortedKeys = Array.from(groupMap.keys()).sort();
    sortedKeys.forEach((key) => {
      let label: string;
      switch (viewSettings.groupBy) {
        case "category":
          label = formatCategory(key);
          break;
        case "status":
          label = formatStatus(key);
          break;
        default:
          label = key;
      }
      groups.push({ key, label, components: groupMap.get(key)! });
    });

    return groups;
  }, [filteredComponents, viewSettings.groupBy]);

  // Initialize expanded groups when grouping changes
  useEffect(() => {
    if (groupedComponents) {
      setExpandedGroups(new Set(groupedComponents.map((g) => g.key)));
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
  const togglePendingFilter = useCallback(
    (filterType: "category" | "status", value: string) => {
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
    const empty = { category: [], status: [] };
    setPendingFilters(empty);
    setAppliedFilters(empty);
  }, []);

  const removeAppliedFilter = useCallback(
    (filterType: "category" | "status", value: string) => {
      setAppliedFilters((prev) => ({
        ...prev,
        [filterType]: prev[filterType].filter((v) => v !== value),
      }));
    },
    [],
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

  // Render component card (grid view) - matches ExamplesGrid pattern
  const renderComponentCard = useCallback(
    (component: Component) => (
      <a
        key={component.slug}
        href={`/components/${component.slug}`}
        className="component-card-link"
      >
        <div className="component-card-content">
          {/* Thumbnail placeholder - V2 images needed */}
          <div className="component-card-thumbnail" aria-hidden="true" />

          {/* Title */}
          <h3 className="component-card-title">{component.data.name}</h3>

          {/* Description */}
          {component.data.description && (
            <p className="component-card-description">{component.data.description}</p>
          )}

          {/* Category badge only - status shown in table view */}
          <div className="component-card-badges">
            <goa-badge
              version="2"
              type={getCategoryBadgeType(component.data.category)}
              content={formatCategory(component.data.category)}
              emphasis="subtle"
            />
          </div>
        </div>
      </a>
    ),
    [],
  );

  // Render table row (list view)
  const renderTableRow = useCallback(
    (component: Component) => (
      <tr key={component.slug}>
        <td>
          <a href={`/components/${component.slug}`} className="component-table-link">
            {component.data.name}
          </a>
        </td>
        <td className="component-description-cell">
          {component.data.description || "—"}
        </td>
        <td>
          <goa-badge
            version="2"
            type={getCategoryBadgeType(component.data.category)}
            content={formatCategory(component.data.category)}
            emphasis="subtle"
          />
        </td>
        <td>
          <goa-badge
            version="2"
            type={getStatusBadgeType(component.data.status)}
            content={formatStatus(component.data.status)}
            emphasis="subtle"
          />
        </td>
      </tr>
    ),
    [],
  );

  const hasActiveFilters =
    searchChips.length > 0 ||
    appliedFilters.category.length > 0 ||
    appliedFilters.status.length > 0 ||
    sortConfig.primary;

  return (
    <div className="components-grid">
      {/* Sentinel for sticky detection - placed before toolbar */}
      <div ref={sentinelRef} className="components-sentinel" aria-hidden="true" />

      {/* Toolbar */}
      <div
        className={`components-toolbar ${isSticky ? "components-toolbar--sticky" : ""}`}
      >
        {/* Search input */}
        <div className="components-search-section">
          <GoabxFormItem
            helpText={!isSticky ? "Search by name, category, or tag" : undefined}
          >
            <GoabxInput
              name="componentSearch"
              value={searchValue}
              leadingIcon="search"
              width="100%"
              size="compact"
              onChange={(e) => setSearchValue(e.value)}
              onKeyPress={(e) => e.key === "Enter" && applySearch()}
            />
          </GoabxFormItem>
        </div>

        {/* View toggle + Filters */}
        <div className="components-toolbar-actions">
          {/*
           * TODO: Replace <goa-tabs> with GoabxTabs when wrapper exposes these props
           *
           * Using web component directly because GoabxTabs wrapper is missing:
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
              initialtab={viewMode === "card" ? 1 : 2}
              updateurl="false"
              stackonmobile="false"
            >
              <goa-tab heading="Grid">
                <span />
              </goa-tab>
              <goa-tab heading="List">
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
        <div className="components-chips">
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

          {/* Category filter chips */}
          {appliedFilters.category.map((cat) => (
            <GoabxFilterChip
              key={`cat-${cat}`}
              content={formatCategory(cat)}
              onClick={() => removeAppliedFilter("category", cat)}
            />
          ))}

          {/* Status filter chips */}
          {appliedFilters.status.map((status) => (
            <GoabxFilterChip
              key={`status-${status}`}
              content={formatStatus(status)}
              onClick={() => removeAppliedFilter("status", status)}
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
      <p className="components-count">
        {filteredComponents.length} component{filteredComponents.length !== 1 ? "s" : ""}
      </p>

      {/* List View (table) */}
      {viewMode === "list" && (
        <div className="components-table-wrapper">
          {/* Using web components directly for V2 styling - React wrappers don't pass version prop */}
          <goa-table ref={tableRef} version="2" width="100%" variant="normal">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>
                    <goa-table-sort-header
                      version="2"
                      name="name"
                      direction={getColumnSortDirection("name")}
                    >
                      Name
                    </goa-table-sort-header>
                  </th>
                  <th>Description</th>
                  <th>
                    <goa-table-sort-header
                      version="2"
                      name="category"
                      direction={getColumnSortDirection("category")}
                    >
                      Category
                    </goa-table-sort-header>
                  </th>
                  <th>
                    <goa-table-sort-header
                      version="2"
                      name="status"
                      direction={getColumnSortDirection("status")}
                    >
                      Status
                    </goa-table-sort-header>
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedComponents
                  ? groupedComponents.map((group) => (
                      <React.Fragment key={group.key}>
                        <tr
                          className="components-group-row"
                          onClick={() => toggleGroup(group.key)}
                        >
                          <td colSpan={4}>
                            <div className="components-group-header">
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
                                content={String(group.components.length)}
                                emphasis="subtle"
                              />
                            </div>
                          </td>
                        </tr>
                        {expandedGroups.has(group.key) &&
                          group.components.map(renderTableRow)}
                      </React.Fragment>
                    ))
                  : filteredComponents.map(renderTableRow)}
              </tbody>
            </table>
          </goa-table>
        </div>
      )}

      {/* Card View */}
      {viewMode === "card" && (
        <div className="components-card-view">
          {groupedComponents ? (
            groupedComponents.map((group) => (
              <div key={group.key} className="components-group">
                <button
                  className="components-group-btn"
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
                    content={String(group.components.length)}
                    emphasis="subtle"
                  />
                </button>
                {expandedGroups.has(group.key) && (
                  <div className="components-card-grid">
                    {group.components.map(renderComponentCard)}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="components-card-grid">
              {filteredComponents.map(renderComponentCard)}
            </div>
          )}
        </div>
      )}

      {/* Filter Drawer */}
      <GoabxDrawer
        heading="Filter components"
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
          {/* Category filter */}
          <GoabxFormItem label="Category">
            <GoabCheckboxList
              name="category"
              value={pendingFilters.category}
              onChange={(detail: GoabCheckboxListOnChangeDetail) =>
                setPendingFilters((prev) => ({ ...prev, category: detail.value }))
              }
            >
              {filterOptions.categories.map((category) => (
                <GoabxCheckbox
                  key={category}
                  name={category}
                  value={category}
                  text={formatCategory(category)}
                  size="compact"
                />
              ))}
            </GoabCheckboxList>
          </GoabxFormItem>

          {/* Status filter */}
          <GoabxFormItem label="Status">
            <GoabCheckboxList
              name="status"
              value={pendingFilters.status}
              onChange={(detail: GoabCheckboxListOnChangeDetail) =>
                setPendingFilters((prev) => ({ ...prev, status: detail.value }))
              }
            >
              {filterOptions.statuses.map((status) => (
                <GoabxCheckbox
                  key={status}
                  name={status}
                  value={status}
                  text={formatStatus(status)}
                  size="compact"
                />
              ))}
            </GoabCheckboxList>
          </GoabxFormItem>

          {(pendingFilters.category.length > 0 || pendingFilters.status.length > 0) && (
            <>
              <GoabDivider />
              <GoabxButton
                type="tertiary"
                size="compact"
                onClick={() => setPendingFilters({ category: [], status: [] })}
              >
                Clear all filters
              </GoabxButton>
            </>
          )}
        </div>
      </GoabxDrawer>

      <style>{`
        .components-grid {
          max-width: 100%;
        }

        /* Sentinel for sticky detection - invisible marker */
        .components-sentinel {
          height: 1px;
          margin-bottom: -1px;
        }

        /* Toolbar - single row layout */
        .components-toolbar {
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
        .components-toolbar--sticky {
          padding: var(--goa-space-s) 0;
          background: transparent;
        }

        .components-toolbar--sticky::before {
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

        .components-search-section {
          flex: 1;
          min-width: 200px;
        }

        /* Toolbar actions */
        .components-toolbar-actions {
          display: flex;
          align-items: flex-start;
          gap: var(--goa-space-m);
        }

        /* View toggle wrapper */
        .view-toggle-wrapper {
          margin-bottom: -20px; /* Compensate for goa-tabs internal margin */
        }

        .view-toggle-wrapper .tabs {
          margin-bottom: 0 !important;
        }

        /* Filter chips */
        .components-chips {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
          flex-wrap: wrap;
          margin-bottom: var(--goa-space-m);
        }

        .components-count {
          color: var(--goa-color-text-secondary);
          font: var(--goa-typography-body-s);
          margin-bottom: var(--goa-space-m);
        }

        /* Table/List view */
        .components-table-wrapper {
          overflow: auto;
        }

        .components-group-row {
          cursor: pointer;
          background-color: var(--goa-color-greyscale-100);
        }

        .components-group-row:hover {
          background-color: var(--goa-color-greyscale-200);
        }

        .components-group-header {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
        }

        .component-table-link {
          color: var(--goa-color-interactive-default);
          text-decoration: underline;
          font-weight: var(--goa-font-weight-bold);
        }

        .component-table-link:hover {
          text-decoration: none;
        }

        .component-description-cell {
          max-width: 400px;
          color: var(--goa-color-text-secondary);
        }

        /* Card/Grid view */
        .components-card-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--goa-space-l);
        }

        @media (max-width: 1200px) {
          .components-card-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
          .components-card-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 623px) {
          .components-card-grid {
            grid-template-columns: 1fr;
          }

          .view-toggle-wrapper {
            display: none;
          }
        }

        .component-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .component-card-content {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-s);
        }

        .component-card-thumbnail {
          aspect-ratio: 16 / 10;
          background: var(--goa-color-greyscale-200);
          border-radius: var(--goa-border-radius-m);
          margin-bottom: var(--goa-space-xs);
        }

        .component-card-title {
          margin: 0;
          font: var(--goa-typography-heading-xs);
          color: var(--goa-color-interactive-default);
          text-decoration: underline;
        }

        .component-card-title:hover {
          text-decoration: none;
        }

        .component-card-description {
          margin: 0;
          font: var(--goa-typography-body-s);
          color: var(--goa-color-text-secondary);
          line-height: 1.5;
        }

        .component-card-badges {
          display: flex;
          flex-wrap: wrap;
          gap: var(--goa-space-xs);
        }

        /* Groups */
        .components-group {
          margin-bottom: var(--goa-space-l);
        }

        .components-group-btn {
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

        .components-group-btn:hover {
          background-color: var(--goa-color-greyscale-100);
        }

        .components-group-btn:focus-visible {
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

      `}</style>
    </div>
  );
}

export default ComponentsGrid;
