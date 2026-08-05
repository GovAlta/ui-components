# Data Grid

Advanced table with sorting and selection.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/data-grid

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `keyboardIconPosition` | "left" \| "right" | `left` | No | Position of the keyboard navigation indicator icon. |
| `keyboardIconVisibility` | "visible" \| "hidden" | `visible` | No | Controls visibility of the keyboard navigation indicator icon. |
| `keyboardNav` | "layout" \| "table" | (none) | Yes | Navigation mode. 'table' navigates like a table (up/down between rows), 'layout' allows wrapping between rows with left/right arrows. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `keyboardIconPosition` | "left" \| "right" | `left` | No | Position of the keyboard navigation indicator icon. |
| `keyboardIconVisibility` | "visible" \| "hidden" | `visible` | No | Controls visibility of the keyboard navigation indicator icon. Use "visible" to show or "hidden" to hide. |
| `keyboardNav` | "layout" \| "table" | (none) | Yes | Navigation mode. "table" navigates like a table (up/down between rows), "layout" allows wrapping between rows with left/right arrows. |

---

## Web Components

Tag: `goa-data-grid`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `keyboard-icon-position` | "left" \| "right" | `left` | No | Position of the keyboard navigation indicator icon. |
| `keyboard-icon-visibility` | "visible" \| "hidden" | `visible` | No | Controls visibility of the keyboard navigation indicator icon. Use "visible" to show or "hidden" to hide. |
| `keyboard-nav` | "layout" \| "table" | `table` | No | Navigation mode. "table" navigates like a table (up/down between rows), "layout" allows wrapping between rows with left/right arrows. |

---

## Accessibility guidance

### Keyboard

- **[Do]** Add data-grid attributes to rows and cells for keyboard navigation to work.

---

## Examples

- [Index page](/examples/workspace/index-page): The page staff land on to scan, filter, sort, and pick records to work on. The home of the workspace's daily queue.

---

## Related components

- [Pagination](/components/pagination): Help users navigation between multiple pages or screens as part of a set.
- [Table](/components/table): A set of structured data that is easy for a user to scan, examine, and compare.
