# Table Sort Header

Sortable column header used inside a table to let users sort rows by that column.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/table-sort-header

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `direction` | GoabTableSortDirection | `none` | No | Sets the sort direction indicator. |
| `name` | string | — | No | Column name identifier for sorting. |
| `sortOrder` | GoabTableSortOrder | — | No | Sort order number for multi-column sort display. Used for displaying priority numbers when multiple columns are sorted. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `direction` | GoabTableSortDirection | `none` | No | Sets the sort direction indicator. |
| `name` | string | — | No | Column name identifier for sorting. |
| `sortOrder` | GoabTableSortOrder | — | No | Sort order number for multi-column sort display ("1", "2", etc). |

---

## Web Components

Tag: `goa-table-sort-header`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `direction` | "asc" | "desc" | "none" | `none` | No | Sets the sort direction indicator. |
| `name` | string | — | No | Column name identifier for sorting. |
| `sort-order` | "0" | "1" | "2" | `0` | No | Sort order number for multi-column sort display ("1", "2", etc). |
| `version` | "1" | "2" | `1` | No | Design system version for styling. |

---

## Examples

- [Sort data in a table](/examples/sort-data-in-a-table)

---

## Related components

- [Table](/components/table): A set of structured data that is easy for a user to scan, examine, and compare.
