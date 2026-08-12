# Text

Provides consistent sizing, spacing, and colour to written content.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/text

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `color` | GoabTextColor | `primary` | No | Sets the text colour. |
| `id` | string | (none) | No | Sets the id attribute on the element. |
| `maxWidth` | GoabTextMaxWidth | `65ch` | No | Sets the max width. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `size` | GoabTextSize | (none) | No | Overrides the text size. |
| `tag` | GoabTextTextElement \| GoabTextHeadingElement | (none) | No | The HTML element to render. Use semantic elements like 'h1'-'h6' for headings. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `color` | GoabTextColor | (none) | No | Sets the text colour. |
| `id` | string | (none) | No | Sets the id attribute on the host element. |
| `maxWidth` | GoabTextMaxWidth | (none) | No | Sets the max width. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `size` | GoabTextSize | (none) | No | Overrides the text size. |
| `tag` | GoabTextTextElement \| GoabTextHeadingElement | (none) | No | The HTML element to render. Use semantic elements like 'h1'-'h6' for headings. |

---

## Web Components

Tag: `goa-text`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `as` | "span" \| "div" \| "p" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" | `div` | No | The HTML element to render. Use semantic elements like 'h1'-'h6' for headings. |
| `color` | "primary" \| "secondary" | `primary` | No | Sets the text colour. |
| `maxwidth` | string \| "none" | `65ch` | No | Sets the max width. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `size` | "heading-2xl" \| "heading-xl" \| "heading-l" \| "heading-m" \| "heading-s" \| "headi… | (none) | No | Overrides the text size. |

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
