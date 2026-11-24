# Button group

Display multiple related actions stacked or in a horizontal row to help with arrangement and spacing.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/button-group

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `alignment` | "start" \| "end" \| "center" | `start` | No | Positions the button group in the page layout. |
| `gap` | "relaxed" \| "compact" | `relaxed` | No | Sets the spacing between buttons in the button group. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `alignment` | "start" \| "end" \| "center" | `start` | No | Positions the button group in the page layout. |
| `gap` | "relaxed" \| "compact" | (none) | No | Sets the spacing between buttons in the button group. |
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

- [Confirm a destructive action](/examples/confirm-a-destructive-action)

---

## Related components

- [Button](/components/button): Carry out an important action or navigate to another page.
