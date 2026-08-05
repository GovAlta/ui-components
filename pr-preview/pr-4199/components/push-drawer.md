# Push Drawer

A panel that pushes the main page content aside on desktop, falling back to an overlay drawer on smaller screens.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/push-drawer

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string \| ReactNode | (none) | No | Sets the heading text or custom heading content. |
| `open` | boolean | (none) | No | Controls the open/closed state of the push drawer. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `width` | string | `492px` | No | Sets the width of the push drawer panel. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClose` | () => void | Callback fired when the push drawer is closed. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the actions slot, typically action buttons. |
| `heading` | No | Sets the heading text or custom heading content. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string \| TemplateRef<any> | (none) | No | Sets the heading text or template for the push drawer. |
| `open` | boolean | (none) | No | Sets the open state of the push drawer. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `width` | string | (none) | No | Sets the width of the push drawer panel. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClose` | () => void | Emits when the push drawer closes. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the actions slot, typically action buttons. |
| `heading` | No | Sets the heading text or custom heading content. |

---

## Web Components

Tag: `goa-push-drawer`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | (none) | No | (none) |
| `open` | boolean | `false` | No | (none) |
| `testid` | string | (none) | No | (none) |
| `width` | string | `492px` | No | (none) |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_close` | CustomEvent<void> | (none) |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the actions slot, typically action buttons. |
| `heading` | No | Sets the heading text or custom heading content. |

---

## Usage guidance

### Other

- **[Tip]** The actions slot is optional. Include Save or Cancel buttons when the drawer content requires explicit confirmation. Omit them when changes apply immediately, like live filtering.
- **[Don't]** Don't use a push drawer for tasks that require the user's full attention. Use a regular drawer instead — it blocks interaction with the background and focuses the user on the task.
- **[Tip]** On screens narrower than 1024px, the push drawer automatically falls back to an overlay drawer. Design content that works well in both layouts.
- **[Do]** Use a push drawer when users need to reference or interact with page content while the panel is open, such as filtering a list, viewing record details, or adjusting settings.

---

## Examples

- [Filter a list using a push drawer](/examples/filter-a-list-using-a-push-drawer)

---

## Related components

- [Drawer](/components/drawer): A panel that slides in from the side of the screen to display additional content or actions without navigating away from the current view.
