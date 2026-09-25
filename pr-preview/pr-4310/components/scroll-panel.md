# Scroll Panel

A bounded container with sticky header and footer slots that scrolls its body content when it overflows.

**Status:** stable | **Category:** Utilities | **Docs:** https://design.alberta.ca/components/scroll-panel

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `direction` | GoabScrollPanelDirectionType | (none) | No | The scroll direction(s). When content overflows, enables scrolling and shadow indicators for the specified direction(s). Accepts "vertical", "horizontal", or "both". Defaults to "vertical". |
| `height` | string | (none) | No | Sets the height of the panel. Accepts any valid CSS height value, including calc()/min()/clamp() and viewport units (e.g. "400px", "100%", "100vh", "calc(100vh - 4rem)"). Invalid values fall back to "100%". Defaults to "100%". The parent element must establish a height context for "100%" to resolve. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `footer` | No | Content rendered in the sticky footer region. |
| `header` | No | Content rendered in the sticky header region. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `direction` | GoabScrollPanelDirectionType | `vertical` | No | The scroll direction(s). When content overflows, enables scrolling and shadow indicators for the specified direction(s). Accepts "vertical", "horizontal", or "both". Defaults to "vertical". |
| `height` | string | (none) | No | Sets the height of the panel. Accepts any valid CSS height value, including calc()/min()/clamp() and viewport units (e.g. "400px", "100%", "100vh", "calc(100vh - 4rem)"). Invalid values fall back to "100%". Defaults to "100%". The parent element must establish a height context for "100%" to resolve. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `footer` | No | Content rendered in the sticky footer region. |
| `header` | No | Content rendered in the sticky header region. |

---

## Web Components

Tag: `goa-scroll-panel`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `direction` | "vertical" \| "horizontal" \| "both" | `vertical` | No | The scroll direction(s). When content overflows, enables scrolling and shadow indicators for the specified direction(s). Defaults to "vertical". |
| `height` | string | `100%` | No | Sets the height of the container. Accepts any valid CSS height value, including calc()/min()/clamp() and viewport units (e.g. "400px", "100%", "100vh", "calc(100vh - 4rem)"). Invalid values fall back to "100%". Defaults to "100%". The parent element must establish a height context for "100%" to resolve. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `footer` | No | Content rendered in the sticky footer region. |
| `header` | No | Content rendered in the sticky header region. |

---

## Usage guidance

### Usage

- **[Note]** Scroll panel keeps a header and footer in place while the content between them scrolls.

---

## Related components

- [Drawer](/components/drawer): A panel that slides in from the side of the screen to display additional content or actions without navigating away from the current view.
- [Modal](/components/modal): An overlay that appears in front of all other content, and requires a user to take an action before continuing.
- [Push Drawer](/components/push-drawer): A panel that pushes the main page content aside on desktop, falling back to an overlay drawer on smaller screens.
- [Notification Panel](/components/work-side-notification-panel): A notification center panel that displays notification items within a work side menu, with tabs for filtering by unread, urgent, and all notifications.
