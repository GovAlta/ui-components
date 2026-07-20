# Notification banner

Display important page level information or notifications.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/notification

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLive` | GoabAriaLiveType | `polite` | No | Indicates how assistive technology should handle updates to the live region. |
| `compact` | boolean | (none) | No | When true, reduces padding for a more compact notification. |
| `emphasis` | GoabNotificationEmphasis | `high` | No | Sets the visual prominence. 'high' for full background, 'low' for a bordered style. |
| `maxContentWidth` | string | `100%` | No | Maximum width of the content area. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabNotificationType | (none) | No | Define the context and colour of the notification. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onDismiss` | () => void | Callback fired when the notification is dismissed. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLive` | GoabAriaLiveType | (none) | No | Indicates how assistive technology should handle updates to the live region. |
| `compact` | boolean | (none) | No | When true, reduces padding for a more compact notification. |
| `emphasis` | GoabNotificationEmphasis | `high` | No | Sets the visual prominence. 'high' for full background, 'low' for medium. |
| `maxContentWidth` | string | (none) | No | Maximum width of the content area. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabNotificationType | `information` | No | Define the context and colour of the notification. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onDismiss` | () => void | Emits when the notification is dismissed. |

---

## Web Components

Tag: `goa-notification`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialive` | "assertive" \| "off" \| "polite" | `polite` | No | Indicates how assistive technology should handle updates to the live region. |
| `compact` | boolean | `false` | No | When true, reduces padding for a more compact notification. |
| `emphasis` | "high" \| "low" | `high` | No | Sets the visual prominence. 'high' for full background, 'filled' for medium. |
| `maxcontentwidth` | string | `100%` | No | Maximum width of the content area. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | "emergency" \| "important" \| "information" \| "event" | (none) | No | Define the context and colour of the notification. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_dismiss` | CustomEvent | (none) |

---

## Usage guidance

### Feedback

- **[Do]** Place your temporary notification above existing fixed position elements.
- **[Do]** Use a temporary notification to communicate actions that have just taken place to the user.
- **[Don't]** Never put critical actions or buttons inside a temporary notification as they will disappear automatically.
- **[Do]** Keep content short and concise.
- **[Don't]** Don't put critical actions for the user in a temporary notification as they automatically dismiss.
- **[Do]** End loading messages with an ellipsis to indicate that the action is ongoing.
- **[Don't]** Don't show multiple temporary notifications at the same time as it can overwhelm users before they time out.
- **[Do]** Only show one temporary notification at a time; subsequent ones appear after initial instances disappear.
- **[Don't]** Don't use a temporary notification for success states where important information is displayed for a user to reference since it will disappear.

### Types

- **[Tip]** For temporary toast-style messages, use TemporaryNotification instead of Notification. Notification stays on screen until dismissed.

---

## Examples

- [Notify the user of a future service outage](/examples/notify-the-user-of-a-future-service-outage)

---

## Related components

- [Callout](/components/callout): Communicate important information through a strong visual emphasis.
- [Temporary notification](/components/temporary-notification): A notification that appears at the bottom of the screen.
