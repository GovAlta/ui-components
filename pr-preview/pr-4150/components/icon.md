# Icons

A simple and universal graphic symbol representing an action, object, or concept to help guide the user.

**Status:** stable | **Category:** Utilities | **Docs:** https://design.alberta.ca/components/icon

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | — | No | Defines how the icon will be announced by screen readers. |
| `fillColor` | string | — | No | Sets a custom fill color for the icon. Accepts any valid CSS color value. |
| `inverted` | string | boolean | — | No | When true, inverts the icon colors for use on dark backgrounds. |
| `mb` | Spacing | — | No |  |
| `ml` | Spacing | — | No |  |
| `mr` | Spacing | — | No |  |
| `mt` | Spacing | — | No |  |
| `opacity` | number | `1` | No | Sets the opacity of the icon from 0 (transparent) to 1 (opaque). |
| `role` | string | `img` | No | Sets the ARIA role for the icon. Use 'presentation' for decorative icons. |
| `size` | GoabIconSize | `medium` | No | Sets the size of the icon. Accepts numeric (1-6) or named sizes. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `theme` | GoabIconTheme | `outline` | No | Sets the icon theme. 'outline' shows stroked icons, 'filled' shows solid icons. |
| `title` | string | — | No | Adds an accessible title to the icon SVG. Used by screen readers. |
| `type` | GoabIconType | GoabIconOverridesType | — | Yes | The icon type to display. See GoabIconType for available icons. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | — | No | Defines how the icon will be announced by screen readers. |
| `fillColor` | string | — | No | Sets a custom fill color for the icon. Accepts any valid CSS color value. |
| `inverted` | boolean | — | No | When true, inverts the icon colors for use on dark backgrounds. |
| `mb` | Spacing | — | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | — | No | Sets the left margin spacing token. |
| `mr` | Spacing | — | No | Sets the right margin spacing token. |
| `mt` | Spacing | — | No | Sets the top margin spacing token. |
| `opacity` | number | — | No | Sets the opacity of the icon from 0 (transparent) to 1 (opaque). |
| `role` | string | — | No | Sets the ARIA role for the icon. Use 'presentation' for decorative icons. |
| `size` | GoabIconSize | `medium` | No | Sets the size of the icon. Accepts numeric (1-6) or named sizes. |
| `testId` | string | — | No | Sets the data-testid attribute for automated testing. |
| `theme` | GoabIconTheme | — | No | Sets the icon theme. 'outline' shows stroked icons, 'filled' shows solid icons. |
| `title` | string | — | No | Adds an accessible title to the icon SVG. Used by screen readers. |
| `type` | GoabIconType | GoabIconOverridesType | — | Yes | The icon type to display. See GoabIconType for available icons. |

---

## Web Components

Tag: `goa-icon`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariacontrols` | string | — | No | Identifies the element(s) whose contents or presence are controlled by this icon. |
| `ariaexpanded` | string | — | No | Indicates whether the element controlled by this icon is expanded or collapsed. |
| `arialabel` | string | — | No | Defines how the icon will be announced by screen readers. |
| `fillcolor` | string | — | No | Sets a custom fill color for the icon. Accepts any valid CSS color value. |
| `inverted` | boolean | `false` | No | When true, inverts the icon colors for use on dark backgrounds. |
| `mb` | Spacing | — | No | Bottom margin. |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |
| `opacity` | number | `1` | No | Sets the opacity of the icon from 0 (transparent) to 1 (opaque). |
| `role` | string | `img` | No | Sets the ARIA role for the icon. Defaults to 'img'. Use 'presentation' for decorative icons. |
| `size` | "1" | "2" | "3" | "4" | "5" | "6" | "2xsmall" | "xsmall" | "small" | "medium" |… | `medium` | No | Sets the size of the icon. Accepts numeric (1-6) or named sizes. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |
| `theme` | "outline" | "filled" | `outline` | No | Sets the icon theme. 'outline' shows stroked icons, 'filled' shows solid icons. |
| `title` | string | — | No | Adds an accessible title to the icon SVG. Used by screen readers. |
| `type` | GoabIconType | — | Yes | The icon type to display. See GoAIconType for available icons. |

---

## Accessibility guidance

### Screen Readers

- ❌ **Don't:** Don't use icon-only elements without an accessible label

---

## Examples

- [Button with Icon](/examples/button-with-icon)
- [Error pages](/examples/error-pages): Standard error screens for Government of Alberta services. Use when a user lands somewhere that is missing, forbidden, or broken so they understand what happened and what to do next.

---

## Related components

- [Icon button](/components/icon-button): A compact button with an icon and no text.
