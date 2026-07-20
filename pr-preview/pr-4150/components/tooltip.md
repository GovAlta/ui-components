# Tooltip

A small popover that displays more information about an item.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/tooltip

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | string | ReactNode | — | No | The content of the tooltip. Accepts plain text or rich content. |
| `hAlign` | GoabTooltipHorizontalAlignment | `center` | No | Horizontal alignment of the tooltip relative to the child element. |
| `maxWidth` | string | — | No | Sets the maximum width of the tooltip. Must use 'px' unit. |
| `mb` | Spacing | — | No |  |
| `ml` | Spacing | — | No |  |
| `mr` | Spacing | — | No |  |
| `mt` | Spacing | — | No |  |
| `position` | GoabTooltipPosition | `top` | No | Position of the tooltip with respect to the child element. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `content` | No | The content of the tooltip. Accepts plain text or rich content. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | string | TemplateRef<unknown> | — | No | The content of the tooltip. |
| `hAlign` | GoabTooltipHorizontalAlignment | `center` | No | Horizontal alignment to the child element. |
| `maxWidth` | string | — | No | Sets the maximum width of the tooltip. Must use 'px' unit. |
| `mb` | Spacing | — | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | — | No | Sets the left margin spacing token. |
| `mr` | Spacing | — | No | Sets the right margin spacing token. |
| `mt` | Spacing | — | No | Sets the top margin spacing token. |
| `position` | GoabTooltipPosition | `top` | No | Position with respect to the child element. |
| `testId` | string | — | No | Sets the data-testid attribute for automated testing. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `content` | No | The content of the tooltip. Accepts plain text or rich content. |

---

## Web Components

Tag: `goa-tooltip`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | string | — | No | The content of the tooltip. |
| `halign` | "left" | "right" | "center" | `center` | No | Horizontal alignment to the child element. |
| `maxwidth` | string | — | No | Sets the maximum width of the tooltip. Must use 'px' unit. |
| `mb` | Spacing | — | No | Bottom margin. |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |
| `position` | "top" | "bottom" | "left" | "right" | `top` | No | Position with respect to the child element. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `content` | No | The content of the tooltip. Accepts plain text or rich content. |

---

## Usage guidance

### Other

- ❌ **Don't:** Don't use tooltips to communicate essential information such as required field indicators, error messages, critical instructions, or information needed to complete a task.
- ✅ **Do:** Use tooltips for additional context that enhances understanding, definitions of terms, or keyboard shortcuts.

### Feedback

- ✅ **Do:** Use tooltips to describe an icon button and provide clarity on what the icon button will do.
- ❌ **Don't:** Don't position a tooltip in a way that forces the user to scroll to view the tooltip content.
- ❌ **Don't:** Don't use tooltips inconsistently; if one icon button has a tooltip, the rest of the icon buttons must also have tooltips.
- ❌ **Don't:** Don't add more than 140 characters to a tooltip; for lengthy information use the details component.
- ❌ **Don't:** Don't position a tooltip too far from the element.
- ❌ **Don't:** Don't use tooltips for information that is vital to task completion.

---

## Examples

- [Copy to clipboard](/examples/copy-to-clipboard)
- [Show a label on an icon only button](/examples/show-a-label-on-an-icon-only-button)
- [Show full date in a tooltip](/examples/show-full-date-in-a-tooltip)

---

## Related components

- [Popover](/components/popover): A small overlay that opens on demand, used in other components.
