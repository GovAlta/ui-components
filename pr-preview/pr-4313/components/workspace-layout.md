# Workspace Layout

A full-page layout for workspace-style applications that wraps your content responsively.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/workspace-layout

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onScrollStateChange` | (detail: GoabWorkspaceLayoutOnScrollStateChangeDetail) => void | Called whenever the internal scroll state changes (no-scroll → at-top → middle → at-bottom) |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `pageFooter` | No | Content rendered in the sticky page footer region. |
| `pageHeader` | No | Content rendered in the sticky page header region. |
| `pushDrawer` | No | A GoabPushDrawer rendered as a sibling of the main card, inside the same workspace shell. Use this slot when the page needs a push drawer alongside the workspace layout — it gives the drawer the shell-level height and flex context it expects, so the consumer does not have to wrap the layout in their own flex container. The side menu is not pushed; only the card is. |
| `sideMenu` | No | Content rendered in the side navigation region (e.g. work-side-menu). |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onScrollStateChange` | (event: GoabWorkspaceLayoutOnScrollStateChangeDetail) => void | Emitted whenever the internal scroll state changes (no-scroll → at-top → middle → at-bottom). |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `pageFooter` | No | Content rendered in the sticky page footer region. |
| `pageHeader` | No | Content rendered in the sticky page header region. |
| `pushDrawer` | No | A GoabPushDrawer rendered as a sibling of the main card, inside the same workspace shell. Use this slot when the page needs a push drawer alongside the workspace layout — it gives the drawer the shell-level height and flex context it expects, so the consumer does not have to wrap the layout in their own flex container. The side menu is not pushed; only the card is. |
| `sideMenu` | No | Content rendered in the side navigation region (e.g. work-side-menu). |

---

## Web Components

Tag: `goa-workspace-layout`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_scrollStateChange` | CustomEvent<{ state: 'no-scroll' \| 'at-top' \| 'middle' \| 'at-bottom'; isScrollable: boolean }> | (none) |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `page-footer` | No | Content rendered in the sticky page footer region. |
| `page-header` | No | Content rendered in the sticky page header region. |
| `push-drawer` | No | A GoabPushDrawer rendered as a sibling of the main card, inside the same workspace shell. Use this slot when the page needs a push drawer alongside the workspace layout — it gives the drawer the shell-level height and flex context it expects, so the consumer does not have to wrap the layout in their own flex container. The side menu is not pushed; only the card is. |
| `side-menu` | No | Content rendered in the side navigation region (e.g. work-side-menu). |

---

## Usage guidance

### Layout

- **[Tip]** The workspace layout fills the viewport, so host it directly in the router outlet, not inside another scrolling container.

### Interaction

- **[Note]** Read the layout's scroll state to respond as people scroll, such as collapsing the header or recording when someone reaches the bottom of a list.

### Usage

- **[Do]** Use the workspace layout for worker tools where pages share a side menu and people scroll long content while header and footer actions stay in reach.

---

## Related components

- [Drawer](/components/drawer): A panel that slides in from the side of the screen to display additional content or actions without navigating away from the current view.
- [Push Drawer](/components/push-drawer): A panel that pushes the main page content aside on desktop, falling back to an overlay drawer on smaller screens.
- [Scroll Panel](/components/scroll-panel): A bounded container with sticky header and footer slots that scrolls its body content when it overflows.
- [Work Side Menu](/components/work-side-menu): Side menu variant for worker applications.
