# Table

A set of structured data that is easy for a user to scan, examine, and compare.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/table

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `sortMode` | GoabTableSortMode | `single` | No | Sort mode: "single" allows one column, "multi" allows up to 2 columns. |
| `striped` | boolean | (none) | No | When true, alternates row background colors for improved readability. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | GoabTableVariant | `normal` | No | A relaxed variant of the table with more vertical padding for the cells. |
| `width` | string | (none) | No | Width of the table. By default it will fit the enclosed content. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onMultiSort` | (detail: GoabTableOnMultiSortDetail) => void | Callback fired when multi-column sorting changes. |
| `onSort` | (detail: GoabTableOnSortDetail) => void | Callback fired when a single-column sort header is clicked. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `sortMode` | GoabTableSortMode | (none) | No | Sets sort mode: "single" allows one column, "multi" allows up to 2 columns. |
| `striped` | boolean | (none) | No | When true, alternates row background colors for improved readability. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `variant` | GoabTableVariant | (none) | No | Sets a relaxed variant of the table with more vertical padding for the cells. |
| `width` | string | (none) | No | Width of the table. By default it will fit the enclosed content. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onMultiSort` | (event: GoabTableOnMultiSortDetail) => void | Emits when multi-column sorting changes. Emits an array of sort entries as GoabTableOnMultiSortDetail. |
| `onSort` | (event: GoabTableOnSortDetail) => void | Emits when a table column is sorted. Emits the sort column and direction as GoabTableOnSortDetail. |

---

## Web Components

Tag: `goa-table`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `sort-mode` | "single" \| "multi" | `single` | No | Sort mode: "single" allows one column, "multi" allows up to 2 columns. |
| `striped` | boolean | `false` | No | When true, alternates row background colors for improved readability. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | "normal" \| "relaxed" | `normal` | No | A relaxed variant of the table with more vertical padding for the cells. |
| `width` | string | (none) | No | Width of the table. By default it will fit the enclosed content. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_multisort` | CustomEvent<{ sorts: { column: string; direction: "asc" \| "desc" }[] }> | (none) |
| `_sort` | CustomEvent<{ sortBy: string; sortDir: number }> | (none) |

---

## Usage guidance

### Types

- **[Tip]** Use variant='relaxed' for tables with longer content that needs more breathing room between rows.

---

## Accessibility guidance

### Screen Readers

- **[Do]** Use proper semantic HTML table structure (thead, tbody, tr, th, td) for accessibility.

---

## Examples

- [Display numbers in a table so they can be scanned easily](/examples/display-numbers-in-a-table-so-they-can-be-scanned-easily)
- [Display user information](/examples/display-user-information)
- [Filter a list using a push drawer](/examples/filter-a-list-using-a-push-drawer)
- [Filter data in a table](/examples/filter-data-in-a-table)
- [Review page](/examples/review-page): A review page lets a user check their answers at the end of a form or section before submitting. Each answer has a "change" link so the user can revise without starting over.
- [Set a specific tab to be active](/examples/set-a-specific-tab-to-be-active)
- [Show different views of data in a table](/examples/show-different-views-of-data-in-a-table)
- [Show multiple actions in a compact table](/examples/show-multiple-actions-in-a-compact-table)
- [Show number of results per page](/examples/show-number-of-results-per-page)
- [Show status in a table](/examples/show-status-in-a-table)
- [Sort data in a table](/examples/sort-data-in-a-table)
- [Task list page](/examples/task-list-page): A page that provides structure for multiple steps in a service. Use a task list to outline the entire process and show the status of each task as users move through it.

---

## Related components

- [Data Grid](/components/data-grid): Advanced table with sorting and selection.
- [Pagination](/components/pagination): Help users navigation between multiple pages or screens as part of a set.
