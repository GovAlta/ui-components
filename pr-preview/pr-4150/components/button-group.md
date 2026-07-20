# Button group

Display multiple related actions stacked or in a horizontal row to help with arrangement and spacing.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/button-group

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `alignment` | GoabButtonGroupAlignment | (none) | Yes | Positions the button group in the page layout. |
| `gap` | GoabButtonGroupGap | `relaxed` | No | Sets the spacing between buttons in the button group. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `alignment` | GoabButtonGroupAlignment | (none) | No | Positions the button group in the page layout. |
| `gap` | GoabButtonGroupGap | (none) | No | Sets the spacing between buttons in the button group. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |

---

## Web Components

Tag: `goa-button-group`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `alignment` | "start" \| "end" \| "center" | `start` | No | Positions the button group in the page layout. |
| `gap` | "relaxed" \| "compact" | `relaxed` | No | Sets the spacing between buttons in the button group. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |

---

## Usage guidance

### Other

- **[Tip]** Use Block for general layout and spacing. Use ButtonGroup for semantically related action buttons.

### Sizing

- **[Don't]** Don't use different button sizes in the same area to emphasize hierarchy.
- **[Don't]** Don't stack standard and full width buttons.
- **[Do]** Use full width buttons on mobile.
- **[Tip]** Match gap to button size. Use 'relaxed' gap with normal-sized buttons and 'compact' gap with compact buttons.

### Positioning

- **[Don't]** Don't group more than 3 actions together. Consider using an overflow menu for additional options.
- **[Do]** Use a button group when putting multiple buttons together.
- **[Tip]** Use 'end' alignment for modal action buttons so they sit at the bottom right, following the natural reading flow.

### Types

- **[Do]** Use a primary button for main actions and a secondary button for less important actions.
- **[Note]** Button types

---

## Examples

- [Add a record using a drawer](/examples/add-a-record-using-a-drawer)
- [Add and edit lots of filters](/examples/add-and-edit-lots-of-filters)
- [Add another item in a modal](/examples/add-another-item-in-a-modal)
- [Ask a user for an address](/examples/ask-a-user-for-an-address)
- [Button with Icon](/examples/button-with-icon)
- [Confirm a change](/examples/confirm-a-change)
- [Confirm a destructive action](/examples/confirm-a-destructive-action)
- [Confirm before navigating away](/examples/confirm-before-navigating-away)
- [Disabled button with a required field](/examples/disabled-button-with-a-required-field)
- [Question page](/examples/question-page): A question page presents one focused step in a multi-step form. Several variants adapt the shape: section titles, progress indicators, supporting context, expandable help, and grouped fields.
- [Require user action before continuing](/examples/require-user-action-before-continuing)
- [Reset date picker field](/examples/reset-date-picker-field)
- [Result page](/examples/result-page): A result page shown after a citizen has submitted a form, application, or task. Confirms success, explains what happens next, and points the user at any follow-up actions.
- [Review page](/examples/review-page): A review page lets a user check their answers at the end of a form or section before submitting. Each answer has a "change" link so the user can revise without starting over.
- [Show a label on an icon only button](/examples/show-a-label-on-an-icon-only-button)
- [Warn a user of a deadline](/examples/warn-a-user-of-a-deadline)

---

## Related components

- [Button](/components/button): Carry out an important action or navigate to another page.
