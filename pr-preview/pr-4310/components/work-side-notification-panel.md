# Notification Panel

A notification center panel that displays notification items within a work side menu, with tabs for filtering by unread, urgent, and all notifications.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/work-side-notification-panel

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `activeTab` | GoabWorkSideNotificationActiveTabType | `unread` | No | Sets the initially active tab. |
| `heading` | string | `Notifications` | No | Sets the panel heading text. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onMarkAllRead` | () => void | Callback fired when the "Mark all as read" button is clicked. |
| `onViewAll` | () => void | Callback fired when the "View all" button is clicked. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `activeTab` | GoabWorkSideNotificationActiveTabType | (none) | No | Sets the initially active tab in the notification panel. |
| `heading` | string | (none) | No | The heading text displayed at the top of the notification panel. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onMarkAllRead` | () => void | Emits when the user clicks "Mark all as read". |
| `onViewAll` | () => void | Emits when the user clicks "View all". |

---

## Web Components

Tag: `goa-work-side-notification-panel`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `active-tab` | "unread" \| "urgent" \| "all" | `unread` | No | (none) |
| `heading` | string | `Notifications` | No | (none) |
| `testid` | string | (none) | No | (none) |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_markAllRead` | CustomEvent<void> | (none) |
| `_viewAll` | CustomEvent<void> | (none) |

---

## Related components

- [Work Side Menu](/components/work-side-menu): Side menu variant for worker applications.
