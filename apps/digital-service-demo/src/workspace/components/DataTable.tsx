import React, { ReactNode } from "react";
import { GoabxTable, GoabxTableSortHeader } from "@abgov/react-components/experimental";
import { GoabxBadge } from "@abgov/react-components/experimental";
import { GoabDataGrid, GoabSkeleton, GoabIcon } from "@abgov/react-components";
import { GoabTableOnMultiSortDetail } from "@abgov/ui-components-common";
import { TableColumn } from "../types/TableColumn";
import { ScrollContainer } from "./ScrollContainer";

export interface DataTableGroup<T> {
  key: string;
  label: string;
  items: T[];
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  groups?: DataTableGroup<T>[];
  collapsedGroups?: Set<string>;
  onToggleGroup?: (groupKey: string) => void;
  isLoading?: boolean;
  skeletonRows?: number;
  onMultiSort?: (detail: GoabTableOnMultiSortDetail) => void;
  emptyState?: ReactNode;
  getRowKey: (item: T) => string;
  getRowSelected?: (item: T) => boolean;
  striped?: boolean;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  groups,
  collapsedGroups,
  onToggleGroup,
  isLoading = false,
  skeletonRows = 10,
  onMultiSort,
  emptyState,
  getRowKey,
  getRowSelected,
  striped = true,
  onRowClick,
}: DataTableProps<T>) {
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

  const renderHeader = (column: TableColumn<T>) => {
    if (column.headerRender) {
      return column.headerRender();
    }
    if (column.sortable && column.header) {
      return (
        <GoabxTableSortHeader name={column.key}>{column.header}</GoabxTableSortHeader>
      );
    }
    return column.header || null;
  };

  const renderDataRow = (item: T, index: number) => (
    <tr
      key={getRowKey(item)}
      data-grid="row"
      aria-selected={getRowSelected?.(item) ? "true" : undefined}
      onClick={(e) => {
        if (!onRowClick) return;
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
  );

  return (
    <ScrollContainer>
      <div className="table-wrapper">
        <GoabDataGrid keyboardNav="table" keyboardIconPosition="right">
          <GoabxTable
            width="100%"
            sortMode="multi"
            onMultiSort={onMultiSort}
            variant="normal"
            striped={striped}
          >
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
              ) : (groups || data).length === 0 && emptyState ? (
                <tr>
                  <td colSpan={columns.length} className="cases-empty-state-cell">
                    {emptyState}
                  </td>
                </tr>
              ) : groups ? (
                groups.map((group) => {
                  const isCollapsed = collapsedGroups?.has(group.key) ?? false;
                  return (
                    <React.Fragment key={group.key}>
                      <tr
                        className="table-group-row"
                        onClick={() => onToggleGroup?.(group.key)}
                        style={{ cursor: "pointer" }}
                      >
                        <td colSpan={columns.length}>
                          <div className="table-group-row__content">
                            <GoabIcon
                              type={isCollapsed ? "chevron-forward" : "chevron-down"}
                              size="small"
                            />
                            <span className="table-group-row__label">{group.label}</span>
                            <GoabxBadge
                              type="information"
                              content={String(group.items.length)}
                              emphasis="subtle"
                            />
                          </div>
                        </td>
                      </tr>
                      {!isCollapsed &&
                        group.items.map((item, index) => renderDataRow(item, index))}
                    </React.Fragment>
                  );
                })
              ) : (
                data.map((item, index) => renderDataRow(item, index))
              )}
            </tbody>
          </GoabxTable>
        </GoabDataGrid>
      </div>
    </ScrollContainer>
  );
}

export default DataTable;
