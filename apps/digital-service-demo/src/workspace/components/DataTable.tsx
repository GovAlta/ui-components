import React, { ReactNode } from "react";
import { GoabxTable, GoabxTableSortHeader } from "@abgov/react-components/experimental";
import { GoabDataGrid, GoabSkeleton } from "@abgov/react-components";
import { GoabTableOnSortDetail } from "@abgov/ui-components-common";
import { TableColumn } from "../types/TableColumn";
import { ScrollContainer } from "./ScrollContainer";
import { useMenu } from "../contexts/MenuContext";
import { SortConfig } from "../utils/searchUtils";

export interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  skeletonRows?: number;
  onSort?: (event: GoabTableOnSortDetail) => void;
  sortConfig?: SortConfig; // Two-level sort config
  emptyState?: ReactNode;
  getRowKey: (item: T) => string;
  getRowSelected?: (item: T) => boolean;
  striped?: boolean;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  skeletonRows = 10,
  onSort,
  sortConfig,
  emptyState,
  getRowKey,
  getRowSelected,
  striped = true,
  onRowClick,
}: DataTableProps<T>) {
  const { isMobile } = useMenu();

  const renderSkeletonCell = (column: TableColumn<T>, rowIndex: number) => {
    switch (column.type) {
      case "checkbox":
      case "actions":
        return <GoabSkeleton type="thumbnail" size="1" />;
      case "badge":
        return <GoabSkeleton type="text" maxWidth="80px" />;
      case "text":
      case "link":
      default:
        return <GoabSkeleton type="text" maxWidth={`${50 + (rowIndex % 5) * 10}%`} />;
    }
  };

  const getCellClassName = (type: string) => {
    switch (type) {
      case "checkbox":
        return "goa-table-cell--checkbox";
      case "badge":
        return "goa-table-cell--badge";
      case "actions":
        return "goa-table-cell--actions";
      case "text":
      case "link":
      default:
        return "goa-table-cell--text";
    }
  };

  // Get sort direction for a column (checks both primary and secondary)
  const getColumnSortDirection = (columnKey: string): "asc" | "desc" | "none" => {
    if (sortConfig?.primary?.key === columnKey) {
      return sortConfig.primary.direction;
    }
    if (sortConfig?.secondary?.key === columnKey) {
      return sortConfig.secondary.direction;
    }
    return "none";
  };

  // Get sort order for a column ("1", "2", or undefined)
  const getColumnSortOrder = (columnKey: string): string | undefined => {
    // Only show numbers if there are two sorts active
    if (!sortConfig?.primary || !sortConfig?.secondary) {
      return undefined;
    }
    if (sortConfig.primary.key === columnKey) {
      return "1";
    }
    if (sortConfig.secondary.key === columnKey) {
      return "2";
    }
    return undefined;
  };

  const renderHeader = (column: TableColumn<T>) => {
    // Custom header render takes priority
    if (column.headerRender) {
      return column.headerRender();
    }
    if (column.sortable && column.header && onSort && sortConfig) {
      // Note: V2 GoabxTableSortHeader doesn't support sortOrder prop for two-level sort indicators
      // Only the primary sort column shows the direction indicator
      return (
        <GoabxTableSortHeader
          name={column.key}
          direction={getColumnSortDirection(column.key)}
        >
          {column.header}
        </GoabxTableSortHeader>
      );
    }
    return column.header || null;
  };

  return (
    <ScrollContainer>
      <div className="table-wrapper">
        <GoabDataGrid keyboardNav="table" keyboardIconPosition="right">
          <GoabxTable width="100%" onSort={onSort} variant="normal" striped={striped}>
            <thead>
              <tr data-grid="row">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    data-grid="cell"
                    className={
                      column.type === "checkbox" ? "goa-table-cell--checkbox" : undefined
                    }
                    style={column.type === "checkbox" ? { paddingBottom: 0 } : undefined}
                  >
                    {renderHeader(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(skeletonRows)].map((_, rowIndex) => (
                  <tr key={rowIndex} data-grid="row">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        data-grid="cell"
                        className={getCellClassName(column.type)}
                      >
                        {renderSkeletonCell(column, rowIndex)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : data.length === 0 && emptyState ? (
                <tr>
                  <td colSpan={columns.length} className="cases-empty-state-cell">
                    {emptyState}
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={getRowKey(item)}
                    data-grid="row"
                    aria-selected={getRowSelected?.(item) ? "true" : undefined}
                    onClick={(e) => {
                      if (!onRowClick) return;
                      // Don't trigger if clicking on interactive elements
                      const target = e.target as HTMLElement;
                      if (
                        target.closest("button") ||
                        target.closest("a") ||
                        target.closest('input[type="checkbox"]') ||
                        target.closest("goa-checkbox") ||
                        target.closest("goa-menu-button") ||
                        target.closest("goa-popover")
                      ) {
                        return;
                      }
                      onRowClick(item);
                    }}
                    style={{ cursor: onRowClick ? "pointer" : undefined }}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        data-grid="cell"
                        className={getCellClassName(column.type)}
                        style={
                          column.type === "text" || column.type === "link"
                            ? { whiteSpace: "nowrap" }
                            : undefined
                        }
                      >
                        {column.render?.(item, index)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </GoabxTable>
        </GoabDataGrid>
      </div>
    </ScrollContainer>
  );
}

export default DataTable;
