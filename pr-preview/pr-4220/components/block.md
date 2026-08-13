# Block

Group components into a block with consistent space between.

**Status:** stable | **Category:** Utilities | **Docs:** https://design.alberta.ca/components/block

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `alignment` | GoabBlockAlignment | `normal` | No | Primary axis alignment of child components. |
| `direction` | GoabBlockDirection | `row` | No | Stacking direction of child components. |
| `gap` | Spacing | `m` | No | Spacing between items. Uses design system spacing tokens. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the block container. |
| `mb` | Spacing | (none) | No | (none) |
| `minWidth` | string | (none) | No | Sets the minimum width of the block container. |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `stretch` | boolean | `false` | No | When true, children fill the cross-axis (e.g. width in a column block) regardless of alignment. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `width` | string | (none) | No | Sets the width of the block container. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `alignment` | GoabBlockAlignment | (none) | No | Sets the primary axis alignment of child components. |
| `direction` | GoabBlockDirection | (none) | No | Sets the stacking direction of child components. |
| `gap` | Spacing | (none) | No | Sets the spacing between items. Uses design system spacing tokens. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the block container. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `minWidth` | string | (none) | No | Sets the minimum width of the block container. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `stretch` | boolean | (none) | No | When true, children fill the cross-axis (e.g. width in a column block) regardless of alignment. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `width` | string | (none) | No | Sets the width of the block container. Defaults to max-content. |

---

## Web Components

Tag: `goa-block`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `alignment` | "center" \| "start" \| "end" \| "normal" | `normal` | No | Primary axis alignment of child components. |
| `direction` | "row" \| "column" | `row` | No | Stacking direction of child components. |
| `gap` | Spacing | `m` | No | Spacing between items. Uses design system spacing tokens. |
| `max-width` | string | (none) | No | Sets the maximum width of the block container. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `min-width` | string | (none) | No | Sets the minimum width of the block container. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `stretch` | boolean | `false` | No | When true, children fill the cross-axis (e.g. width in a column block) regardless of alignment. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `width` | string | (none) | No | Sets the width of the block container. Defaults to max-content. |

---

## Usage guidance

### Other

- **[Tip]** Use Block for general layout and spacing. Use ButtonGroup for semantically related action buttons.
- **[Don't]** Don't use a container for general page layout. Containers are for visual emphasis and grouping content.

---

## Examples

- [Add a record using a drawer](/examples/add-a-record-using-a-drawer)
- [Ask a user for an address](/examples/ask-a-user-for-an-address)
- [Ask a user for an Indian registration number](/examples/ask-a-user-for-an-indian-registration-number)
- [Card view of case files](/examples/card-view-of-case-files)
- [Copy to clipboard](/examples/copy-to-clipboard)
- [Display user information](/examples/display-user-information)
- [Error pages](/examples/error-pages): Standard error screens for Government of Alberta services. Use when a user lands somewhere that is missing, forbidden, or broken so they understand what happened and what to do next.
- [Filter data in a table](/examples/filter-data-in-a-table)
- [Question page](/examples/question-page): A question page presents one focused step in a multi-step form. Several variants adapt the shape: section titles, progress indicators, supporting context, expandable help, and grouped fields.
- [Result page](/examples/result-page): A result page shown after a citizen has submitted a form, application, or task. Confirms success, explains what happens next, and points the user at any follow-up actions.
- [Review and action](/examples/review-and-action)
- [Search](/examples/search)
- [Show multiple actions in a compact table](/examples/show-multiple-actions-in-a-compact-table)
- [Show multiple tags together](/examples/show-multiple-tags-together)
- [Show number of results per page](/examples/show-number-of-results-per-page)
- [Dashboard](/examples/workspace/dashboard): Gives staff an overview of their work with counts, trends, and assigned items.

---

## Related components

- [Container](/components/container): Group information, create hierarchy, and show related information.
- [Page Block](/components/page-block): Full-width section with optional background.
