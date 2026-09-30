# Popover

A small overlay that opens on demand, used in other components.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/popover

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `maxWidth` | string | `320px` | No | Sets the maximum width of the popover container. |
| `mb` | Spacing | (none) | No | (none) |
| `minWidth` | string | (none) | No | Sets the minimum width of the popover container. |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `padded` | boolean | `true` | No | Sets if the popover has padding. Use false when content needs to be flush with boundaries. |
| `position` | GoabPopoverPosition | `auto` | No | Provides control to where the popover content is positioned. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `target` | Yes | Sets the element used as the popover trigger. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `maxWidth` | string | `320px` | No | Sets the maximum width of the popover container. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `minWidth` | string | (none) | No | Sets the minimum width of the popover container. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `padded` | boolean | `true` | No | Sets if the popover has padding. Use false when content needs to be flush with boundaries. |
| `position` | GoabPopoverPosition | (none) | No | Provides control to where the popover content is positioned. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `target` | Yes | Sets the element used as the popover trigger. |

---

## Web Components

Tag: `goa-popover`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `borderradius` | string | `var(--goa-border-radius-m)` | No | Border radius of the popover window. |
| `disabled` | boolean | `false` | No | Disables the popover interaction. Used by parent components like Dropdown. |
| `focusborderwidth` | string | `var(--goa-border-width-l)` | No | Width of the focus outline border. |
| `height` | "full" \| "wrap-content" | `wrap-content` | No | Controls the height behavior. 'full' stretches to parent height, 'wrap-content' fits content. |
| `hoffset` | string | (none) | No | Additional horizontal offset added to the popover's position. |
| `maxwidth` | string \| "none" | `320px` | No | Sets the maximum width of the popover container. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `minwidth` | string | (none) | No | Sets the minimum width of the popover container. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `open` | boolean | `false` | No | Controls the open state of the popover programmatically. Used by Dropdown, AppHeaderMenu. |
| `padded` | boolean | `true` | No | Sets if the popover has padding. Use false when content needs to be flush with boundaries. |
| `position` | "above" \| "below" \| "right" \| "auto" | `auto` | No | Provides control to where the popover content is positioned. |
| `tabindex` | number | `0` | No | Sets the tabindex. Use -1 to skip tabbing when a parent handles keyboard events. |
| `testid` | string | `popover` | No | Sets a data-testid attribute for automated testing. |
| `voffset` | string | (none) | No | Additional vertical offset added to the popover's position. |
| `width` | string | (none) | No | Sets a fixed width for the popover container. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_close` | CustomEvent<void> | (none) |
| `_open` | CustomEvent<void> | (none) |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `target` | Yes | Sets the element used as the popover trigger. |

---

## Related components

- [Menu button](/components/menu-button): A button with more than one action.
- [Tooltip](/components/tooltip): A small popover that displays more information about an item.
