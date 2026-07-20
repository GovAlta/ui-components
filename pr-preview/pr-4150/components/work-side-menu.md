# Work Side Menu

Side menu variant for worker applications.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/work-side-menu

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | (none) | Yes | The application name displayed in the header. |
| `open` | boolean | (none) | No | Controls whether the side menu is expanded or collapsed. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `url` | string | (none) | Yes | URL for the header link. Clicking the logo/heading navigates to this URL. |
| `userName` | string | (none) | No | User's name displayed in the profile section. |
| `userSecondaryText` | string | (none) | No | Secondary text displayed below the user's name, such as role or email. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onNavigate` | (path: string) => void | Callback fired when a menu item is navigated, providing the target URL path. |
| `onToggle` | () => void | Callback fired when the side menu is toggled open or closed. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `accountContent` | No | Content rendered in the account/profile slot. |
| `primaryContent` | No | Content rendered in the primary navigation slot. |
| `secondaryContent` | No | Content rendered in the secondary navigation slot. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | (none) | Yes | The application name displayed in the header. |
| `open` | boolean | (none) | No | Controls whether the side menu is expanded or collapsed. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `url` | string | (none) | Yes | URL for the header link. Clicking the logo/heading navigates to this URL. |
| `userName` | string | (none) | No | User's name displayed in the profile section. |
| `userSecondaryText` | string | (none) | No | Secondary text displayed below the user's name, such as role or email. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onNavigate` | (event: string) => void | Emits when a navigation link is clicked. Emits the URL as a string. |
| `onToggle` | () => void | Emits when the side menu is toggled open or closed. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `accountContent` | No | Content rendered in the account/profile slot. |
| `primaryContent` | No | Content rendered in the primary navigation slot. |
| `secondaryContent` | No | Content rendered in the secondary navigation slot. |

---

## Web Components

Tag: `goa-work-side-menu`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | (none) | Yes | The application name displayed in the header. |
| `open` | boolean | `false` | No | Controls whether the side menu is expanded or collapsed. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `url` | string | (none) | Yes | URL for the header link. Clicking the logo/heading navigates to this URL. |
| `user-name` | string | (none) | No | User's name displayed in the profile section. |
| `user-secondary-text` | string | (none) | No | Secondary text displayed below the user's name, such as role or email. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_navigate` | CustomEvent<{ url: string }> | (none) |
| `_toggle` | CustomEvent<{ open: boolean }> | (none) |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `account` | No | Content rendered in the account/profile slot. |
| `primary` | No | Content rendered in the primary navigation slot. |
| `secondary` | No | Content rendered in the secondary navigation slot. |

---

## Usage guidance

### Other

- **[Tip]** Use WorkSideMenu when the experience is in worker mode: a productive, power-user tool where users move through dense work efficiently. This isn't only about government staff. Some citizen-facing services are also worker mode, like a contractor who files permits daily. Don't use WorkSideMenu in simplified, guided experiences like public forms.

---

## Examples

- [Index page](/examples/workspace/index-page): The page staff land on to scan, filter, sort, and pick records to work on. The home of the workspace's daily queue.

---

## Related components

- [Side menu](/components/side-menu): A side navigation that helps the user navigate between pages.
- [Notification Panel](/components/work-side-notification-panel): A notification center panel that displays notification items within a work side menu, with tabs for filtering by unread, urgent, and all notifications.
