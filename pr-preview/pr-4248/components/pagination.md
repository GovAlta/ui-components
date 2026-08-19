# Pagination

Help users navigation between multiple pages or screens as part of a set.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/pagination

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `itemCount` | number | (none) | Yes | Total number of data items within all pages. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `pageNumber` | number | (none) | Yes | The current page being viewed (non-zero based). |
| `perPageCount` | number | `10` | No | Number of data items shown per page. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | "all" \| "links-only" | `all` | No | Controls which nav controls are visible. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | (detail: GoabPaginationOnChangeDetail) => void | Callback fired when the user navigates to a different page. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `itemCount` | number | (none) | Yes | Total number of data items within all pages. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `pageNumber` | number | (none) | Yes | The current page being viewed (non-zero based). |
| `perPageCount` | number | `10` | No | Number of data items shown per page. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `variant` | GoabPaginationVariant | `all` | No | Controls which nav controls are visible. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | (event: GoabPaginationOnChangeDetail) => void | Emits when the page changes. Emits the new page number as part of the change detail. |

---

## Web Components

Tag: `goa-pagination`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `itemcount` | number | (none) | Yes | Total number of data items within all pages. |
| `mb` | Spacing | `m` | No | Bottom margin. |
| `ml` | Spacing | `none` | No | Left margin. |
| `mr` | Spacing | `none` | No | Right margin. |
| `mt` | Spacing | `none` | No | Top margin. |
| `pagenumber` | number | (none) | Yes | The current page being viewed (non-zero based). |
| `perpagecount` | number | `10` | No | Number of data items shown per page. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | "all" \| "links-only" | `all` | No | Controls which nav controls are visible. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_change` | CustomEvent<{ page: number }> | (none) |

---

## Usage guidance

### Interaction

- **[Do]** Disable the Previous button on the first page, and the Next button on the last page.

### Layout

- **[Do]** Ensure the pagination component is the full width of the table or content it's connected to.

### Types

- **[Tip]** Use variant='links-only' for a simpler mobile-friendly pagination with just previous and next buttons.

---

## Examples

- [Show number of results per page](/examples/show-number-of-results-per-page)

---

## Related components

- [Data Grid](/components/data-grid): Advanced table with sorting and selection.
- [Table](/components/table): A set of structured data that is easy for a user to scan, examine, and compare.
