# Text

Provides consistent sizing, spacing, and colour to written content.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/text

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `color` | "primary" \| "secondary" \| "light" \| "disabled" | `primary` | No | Sets the text colour to primary, secondary, light, or disabled. |
| `id` | string | (none) | No | Sets the id attribute on the element. |
| `maxWidth` | "none" \| string | `65ch` | No | Sets the max width. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `size` | "heading-2xl" \| "heading-xl" \| "heading-l" \| "heading-m" \| "heading-s" \| "headi… | (none) | No | Overrides the text size. |
| `tag` | "span" \| "div" \| "p" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" | (none) | No | The HTML element to render. Use semantic elements like 'h1'-'h6' for headings. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `children` | Yes | Content rendered inside the text element. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `color` | "primary" \| "secondary" \| "light" \| "disabled" | `primary` | No | Sets the text colour to primary, secondary, light, or disabled. |
| `id` | string | (none) | No | Sets the id attribute on the host element. |
| `maxWidth` | "none" \| string | `65ch` | No | Sets the max width. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `size` | "heading-2xl" \| "heading-xl" \| "heading-l" \| "heading-m" \| "heading-s" \| "headi… | (none) | No | Overrides the text size. |
| `tag` | "span" \| "div" \| "p" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" | (none) | No | The HTML element to render. Use semantic elements like 'h1'-'h6' for headings. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `default` | Yes | Content rendered inside the text element. |

---

## Web Components

Tag: `goa-text`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `as` | "span" \| "div" \| "p" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" | `div` | No | The HTML element to render. Use semantic elements like 'h1'-'h6' for headings. |
| `color` | "primary" \| "secondary" \| "light" \| "disabled" | `primary` | No | Sets the text colour to primary, secondary, light, or disabled. |
| `maxwidth` | string \| "none" | `65ch` | No | Sets the max width. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `size` | "heading-2xl" \| "heading-xl" \| "heading-l" \| "heading-m" \| "heading-s" \| "headi… | (none) | No | Overrides the text size. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `default` | Yes | Content rendered inside the text element. |

---

## Usage guidance

### Types

- **[Tip]** Use color='secondary' for supporting text that's less prominent than the main content.

---

## Accessibility guidance

### Screen Readers

- **[Warning]** Use semantic heading tags (h1-h5) with GoabText for proper document structure and screen reader navigation.

---

## Examples

- [Ask a user for an address](/examples/ask-a-user-for-an-address)
- [Ask a user for direct deposit information](/examples/ask-a-user-for-direct-deposit-information)
- [Card grid](/examples/card-grid)
- [Display user information](/examples/display-user-information)
- [Error pages](/examples/error-pages): Standard error screens for Government of Alberta services. Use when a user lands somewhere that is missing, forbidden, or broken so they understand what happened and what to do next.
- [Filter data in a table](/examples/filter-data-in-a-table)
- [Limit the width of helper text](/examples/limit-the-width-of-helper-text)
