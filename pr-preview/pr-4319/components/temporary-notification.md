# Temporary notification

A notification that appears at the bottom of the screen.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/temporary-notification

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `horizontalPosition` | SnackbarHorizontalPosition | `center` | No | Horizontal position of the notification container. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `verticalPosition` | SnackbarVerticalPosition | `bottom` | No | Vertical position of the notification container. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `horizontalPosition` | SnackbarHorizontalPosition | `center` | No | Horizontal position of the notification container. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `verticalPosition` | SnackbarVerticalPosition | `bottom` | No | Vertical position of the notification container. |

---

## Web Components

Tag: `goa-temporary-notification`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `horizontal-position` | "left" \| "center" \| "right" | `center` | No | Horizontal position of the notification container. |
| `testid` | string | (none) | Yes | Sets a data-testid attribute for automated testing. |
| `vertical-position` | "top" \| "bottom" | `bottom` | No | Vertical position of the notification container. |

---

## Static methods

### `TemporaryNotification.show(message, options)`

Displays a temporary notification from your component. Returns the notification's UUID, which you can use to dismiss it or update its progress.

**Returns:** string

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | string | Yes | The message to display in the notification. |
| `options.type` | GoabTemporaryNotificationType | No | The type of notification, which determines its styling and icon. Use "indeterminate" to show an animated progress bar while work of unknown length runs, or "progress" to show a progress bar you update with setProgress(). Defaults to "basic". |
| `options.duration` | "long" \| "medium" \| "short" \| number | No | How long the notification stays before it auto-dismisses: "short" (about 3 seconds), "medium" (about 4 seconds), "long" (about 6 seconds), or a number of milliseconds. Only "basic", "success", and "failure" notifications auto-dismiss (default "short"). "indeterminate" and "progress" notifications have no default duration and stay until you dismiss them. |
| `options.actionText` | string | No | Text for an action button. When set, the notification shows a button the user can select. |
| `options.action` | () => void | No | Function to run when the action button is selected. |
| `options.cancelUUID` | string | No | UUID of an existing notification to cancel when this one is shown. |

### `TemporaryNotification.dismiss(uuid)`

Hides a notification, using the UUID that show() returns.

**Returns:** void

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string | Yes | The UUID of the notification to dismiss. This is the value that show() returns. |

### `TemporaryNotification.setProgress(uuid, progress)`

Updates the progress shown on a progress notification, using the UUID that show() returns.

**Returns:** void

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string | Yes | The UUID of the progress notification to update. This is the value that show() returns. |
| `progress` | number | Yes | The progress to display, from 0 to 100. |

---

## Usage guidance

### Types

- **[Tip]** For temporary toast-style messages, use TemporaryNotification instead of Notification. Notification stays on screen until dismissed.
- **[Don't]** Don't show critical errors that require user action in a temporary notification. They auto-dismiss and can be missed. Use Callout or Notification instead.

---

## Examples

- [Show a notification](/examples/show-a-notification)
- [Show a notification with an action](/examples/show-a-notification-with-an-action)
- [Show a user progress](/examples/show-a-user-progress)
- [Show a user progress when the time is unknown](/examples/show-a-user-progress-when-the-time-is-unknown)

---

## Related components

- [Notification banner](/components/notification): Display important page level information or notifications.
