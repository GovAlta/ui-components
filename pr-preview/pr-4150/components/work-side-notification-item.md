# Notification Item

Individual notification card within a notification panel, with read/unread states, priority levels, and type badges.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/work-side-notification-item

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `description` | string | — | Yes | The body text content of the notification card. |
| `priority` | GoabWorkSideNotificationPriority | `normal` | No | Sets the urgency level of the notification. |
| `readStatus` | GoabWorkSideNotificationReadStatus | `unread` | No | Indicates whether the notification has been read or is unread. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `timestamp` | string | — | No | ISO timestamp string representing when the notification occurred. |
| `title` | string | — | No | Title text displayed in the notification card header. |
| `type` | GoabWorkSideNotificationItemType | `default` | No | Sets the visual type/style of the notification item. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Callback fired when the notification item is clicked. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `description` | string | — | Yes | The description text of the notification item. |
| `priority` | GoabWorkSideNotificationPriority | — | No | Sets the priority level of the notification. |
| `readStatus` | GoabWorkSideNotificationReadStatus | — | No | Indicates whether the notification is read or unread. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `timestamp` | string | — | No | The timestamp for when the notification was created. |
| `title` | string | — | No | The title text of the notification item. |
| `type` | GoabWorkSideNotificationItemType | — | No | Sets the visual style of the notification item. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Emits when the notification item is clicked. |

---

## Web Components

Tag: `goa-work-side-notification-item`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `description` | string | — | No |  |
| `priority` | "normal" | "urgent" | `normal` | No |  |
| `read-status` | "read" | "unread" | `unread` | No |  |
| `testid` | string | — | No |  |
| `timestamp` | string | — | No |  |
| `title` | string | — | No |  |
| `type` | "default" | "success" | "critical" | "warning" | "info" | `default` | No |  |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_click` | CustomEvent<void> |  |
| `_notificationItemRead` | CustomEvent<{ el: unknown; readStatus: unknown }> |  |

---

## Related components

- [Notification Panel](/components/work-side-notification-panel): A notification center panel that displays notification items within a work side menu, with tabs for filtering by unread, urgent, and all notifications.
