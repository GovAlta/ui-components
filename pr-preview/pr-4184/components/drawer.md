# Drawer

A panel that slides in from the side of the screen to display additional content or actions without navigating away from the current view.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/drawer

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string \| ReactNode | (none) | No | The heading text displayed at the top of the drawer. Accepts a string or a ReactNode for custom heading content. |
| `maxSize` | GoabDrawerSize | (none) | No | Sets max height on bottom position, sets width on left and right position. |
| `open` | boolean | (none) | No | Whether the drawer is open. |
| `position` | GoabDrawerPosition | (none) | Yes | The position of the drawer. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClose` | () => void | Callback fired when the drawer requests to be closed. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Action elements rendered in the drawer footer slot. |
| `heading` | No | The heading text displayed at the top of the drawer. Accepts a string or a ReactNode for custom heading content. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string \| TemplateRef<any> | (none) | No | The heading text displayed at the top of the drawer. |
| `maxSize` | GoabDrawerSize | (none) | No | Sets max height on bottom position, sets width on left and right position. |
| `open` | boolean | (none) | Yes | Whether the drawer is open. |
| `position` | GoabDrawerPosition | (none) | Yes | The position of the drawer. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClose` | () => void | Emits when the drawer is closed. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Action elements rendered in the drawer footer slot. |
| `heading` | No | The heading text displayed at the top of the drawer. Accepts a string or a ngTemplate for custom heading content. |

---

## Web Components

Tag: `goa-drawer`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `close-button-visibility` | "visible" \| "hidden" | `visible` | No | Controls visibility of the close button and header. |
| `heading` | string | (none) | No | The heading text displayed at the top of the drawer. |
| `maxsize` | DrawerSize | (none) | No | Sets max height on bottom position, sets width on left and right position. |
| `open` | boolean | `false` | No | Whether the drawer is open. |
| `position` | DrawerPosition | (none) | No | The position of the drawer. |
| `testid` | string | `drawer` | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_close` | CustomEvent<void> | (none) |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Action elements rendered in the drawer footer slot. |
| `heading` | No | The heading text displayed at the top of the drawer. Accepts a string or a ReactNode for custom heading content. |

---

## Usage guidance

### Types

- **[Tip]** Use position='right' for forms and detail panels. Use position='bottom' for mobile-friendly bottom sheets.

### Other

- **[Don't]** Don't use a push drawer for tasks that require the user's full attention. Use a regular drawer instead — it blocks interaction with the background and focuses the user on the task.

---

## Examples

- [Add a record using a drawer](/examples/add-a-record-using-a-drawer)
- [Add and edit lots of filters](/examples/add-and-edit-lots-of-filters)
- [Case detail](/examples/workspace/case-detail): A single-record view for reviewing and acting on one case. Uses accordion sections, a table-of-contents sidebar, badges for status, and header actions for quick operations.

---

## Related components

- [Modal](/components/modal): An overlay that appears in front of all other content, and requires a user to take an action before continuing.
- [Push Drawer](/components/push-drawer): A panel that pushes the main page content aside on desktop, falling back to an overlay drawer on smaller screens.
