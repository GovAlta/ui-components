# Header

Provide structure to help users find their way around the service.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/app-header

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `fullMenuBreakpoint` | number | (none) | No | Sets the breakpoint in px for the full menu to display. |
| `heading` | string | (none) | No | Set the service name to display in the app header. |
| `maxContentWidth` | string | (none) | No | Maximum width of the content area. |
| `secondaryText` | string | (none) | No | Secondary text displayed under the service name. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `url` | string | (none) | No | Set the URL to link from the alberta.ca logo. A full url is required. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onMenuClick` | () => void | Callback fired when the menu button is clicked. When provided, clicking the menu button dispatches a custom event instead of toggling the menu. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `banner` | No | Banner content displayed above the header. |
| `navigation` | No | Links and app header menus appear in the navigation bar below the header. Use plain links for single items and app header menu for grouped items with a dropdown. |
| `phase` | No | Phase badge content displayed beside the service name. |
| `utilities` | No | Actions like user account menus appear on the right side of the header. Use menu button for dropdowns with actions. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `fullMenuBreakpoint` | number | (none) | No | Sets the breakpoint in px for the full menu to display. |
| `heading` | string | (none) | No | Sets the service name to display in the app header. |
| `maxContentWidth` | string | (none) | No | Maximum width of the content area. |
| `secondaryText` | string | (none) | No | Secondary text displayed under the service name. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `url` | string | (none) | No | Sets the URL to link from the alberta.ca logo. A full url is required. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onMenuClick` | () => void | Emits when the menu button is clicked. Used for custom menu handling. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `banner` | No | Banner content displayed above the header. |
| `navigation` | No | Links and app header menus appear in the navigation bar below the header. Use plain links for single items and app header menu for grouped items with a dropdown. |
| `phase` | No | Phase badge content displayed beside the service name. |
| `utilities` | No | Actions like user account menus appear on the right side of the header. Use menu button for dropdowns with actions. |

---

## Web Components

Tag: `goa-app-header`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `fullmenubreakpoint` | number | `TABLET_BP` | No | Sets the breakpoint in px for the full menu to display. |
| `hasmenuclickhandler` | boolean | `false` | No | When true, clicking the menu button dispatches _menuClick event instead of toggling the menu. Use for custom menu handling. |
| `heading` | string | (none) | No | Set the service name to display in the app header. |
| `maxcontentwidth` | string | (none) | No | Maximum width of the content area. |
| `secondarytext` | string | (none) | No | V2 only: Secondary text displayed under the service name. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `url` | string | (none) | No | Set the URL to link from the alberta.ca logo. A full url is required. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_menuClick` | CustomEvent | (none) |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `banner` | No | Banner content displayed above the header. |
| `navigation` | No | Links and app header menus appear in the navigation bar below the header. Use plain links for single items and app header menu for grouped items with a dropdown. |
| `phase` | No | Phase badge content displayed beside the service name. |
| `utilities` | No | Actions like user account menus appear on the right side of the header. Use menu button for dropdowns with actions. |

---

## Usage guidance

### Positioning

- **[Tip]** Use consistent maxContentWidth with your page layout so the header aligns with the content below it.

### Content

- **[Warning]** Always provide a heading prop on AppHeader to identify your service. Without it, users won't know which service they're using.

---

## Examples

- [Basic page layout](/examples/basic-page-layout)
- [Header with navigation](/examples/header-with-navigation)

---

## Related components

- [Microsite header](/components/microsite-header): Communicate what stage the service is at, connect to Alberta.ca, and gather feedback on your service.
