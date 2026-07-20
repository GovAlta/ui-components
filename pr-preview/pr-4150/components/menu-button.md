# Menu button

A button with more than one action.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/menu-button

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | `Open menu` | No | Sets the aria-label for the icon button in icon-only mode. |
| `leadingIcon` | GoabIconType | — | No | Icon displayed before the button text. When no text is provided, displays as an icon button. |
| `maxWidth` | string | — | No | Maximum width of the dropdown menu. |
| `size` | GoabButtonSize | `normal` | No | Sets the size of the button. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `text` | string | — | No | The button label text. When provided, displays as a text button with a dropdown icon. |
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
| `ariaLabel` | string | — | No | Sets the aria-label for the icon button in icon-only mode. |
| `leadingIcon` | GoabIconType | — | No | Icon displayed before the button text. When no text is provided, displays as an icon button. |
| `maxWidth` | string | — | No | Maximum width of the dropdown menu. |
| `size` | GoabButtonSize | — | No | Sets the size of the button. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `text` | string | — | No | The button label text. When provided, displays as a text button with a dropdown icon. |
| `type` | GoabButtonType | — | No | The button style variant. |
| `variant` | GoabButtonVariant | — | No | Sets the color variant for semantic meaning. |

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
| `leading-icon` | GoabIconType | — | No | Icon displayed before the button text. When no text is provided, displays as an icon button. |
| `max-width` | string | — | Yes | Maximum width of the dropdown menu. |
| `size` | "normal" | "compact" | `normal` | No | Sets the size of the button. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |
| `text` | string | — | No | The button label text. When provided, displays as a text button with a dropdown icon. |
| `type` | "primary" | "secondary" | "tertiary" | `primary` | No | The button style variant. |
| `variant` | "normal" | "destructive" | `normal` | No | Sets the color variant for semantic meaning. |
| `version` | "1" | "2" | `1` | No | Design system version for styling. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_action` | CustomEvent<{ action?: string; size?: "normal" | "compact" }> |  |

---

## Usage guidance

### Other

- ❌ **Don't:** Don't use MenuButton for navigation menus. Use AppHeaderMenu or SideMenu for navigation. MenuButton is for action lists.

---

## Related components

- [Button](/components/button): Carry out an important action or navigate to another page.
- [Popover](/components/popover): A small overlay that opens on demand, used in other components.
