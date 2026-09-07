# Menu button

A button with more than one action.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/menu-button

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | `Open menu` | No | Sets the aria-label for the icon button in icon-only mode. |
| `leadingIcon` | GoabIconType | (none) | No | Icon displayed before the button text. When no text is provided, displays as an icon button. |
| `maxWidth` | string | (none) | No | Maximum width of the dropdown menu. |
| `size` | GoabButtonSize | `normal` | No | Sets the size of the button. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `text` | string | (none) | No | The button label text. When provided, displays as a text button with a dropdown icon. |
| `type` | GoabButtonType | `primary` | No | The button style variant. |
| `variant` | GoabButtonVariant | `normal` | No | Sets the color variant for semantic meaning. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onAction` | (detail: GoabMenuButtonOnActionDetail) => void | Callback fired when a menu action is selected. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Sets the aria-label for the icon button in icon-only mode. |
| `leadingIcon` | GoabIconType | (none) | No | Icon displayed before the button text. When no text is provided, displays as an icon button. |
| `maxWidth` | string | (none) | No | Maximum width of the dropdown menu. |
| `size` | GoabButtonSize | (none) | No | Sets the size of the button. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `text` | string | (none) | No | The button label text. When provided, displays as a text button with a dropdown icon. |
| `type` | GoabButtonType | (none) | No | The button style variant. |
| `variant` | GoabButtonVariant | (none) | No | Sets the color variant for semantic meaning. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onAction` | (event: GoabMenuButtonOnActionDetail) => void | Emits when a menu action is clicked. Emits the action detail. |

---

## Web Components

Tag: `goa-menu-button`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `aria-label` | string | `Open menu` | No | Sets the aria-label for the icon button in icon-only mode. |
| `leading-icon` | GoabIconType | (none) | No | Icon displayed before the button text. When no text is provided, displays as an icon button. |
| `max-width` | string | (none) | Yes | Maximum width of the dropdown menu. |
| `size` | "normal" \| "compact" | `normal` | No | Sets the size of the button. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `text` | string | (none) | No | The button label text. When provided, displays as a text button with a dropdown icon. |
| `type` | "primary" \| "secondary" \| "tertiary" | `primary` | No | The button style variant. |
| `variant` | "normal" \| "destructive" | `normal` | No | Sets the color variant for semantic meaning. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_action` | CustomEvent<{ action?: string; size?: "normal" \| "compact" }> | (none) |

---

## Usage guidance

### Other

- **[Don't]** Don't use MenuButton for navigation menus. Use AppHeaderMenu or SideMenu for navigation. MenuButton is for action lists.

---

## Related components

- [Button](/components/button): Carry out an important action or navigate to another page.
- [Popover](/components/popover): A small overlay that opens on demand, used in other components.
