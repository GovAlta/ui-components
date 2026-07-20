# Text

Provides consistent sizing, spacing, and colour to written content.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/text

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `color` | GoabTextColor | `primary` | No | Sets the text colour. |
| `id` | string | — | No | Sets the id attribute on the element. |
| `maxWidth` | GoabTextMaxWidth | `65ch` | No | Sets the max width. |
| `mb` | Spacing | — | No |  |
| `ml` | Spacing | — | No |  |
| `mr` | Spacing | — | No |  |
| `mt` | Spacing | — | No |  |
| `size` | GoabTextSize | — | No | Overrides the text size. |
| `tag` | GoabTextTextElement | GoabTextHeadingElement | — | No | The HTML element to render. Use semantic elements like 'h1'-'h6' for headings. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `color` | GoabTextColor | — | No | Sets the text colour. |
| `id` | string | — | No | Sets the id attribute on the host element. |
| `maxWidth` | GoabTextMaxWidth | — | No | Sets the max width. |
| `mb` | Spacing | — | No | Bottom margin. |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |
| `size` | GoabTextSize | — | No | Overrides the text size. |
| `tag` | GoabTextTextElement | GoabTextHeadingElement | — | No | The HTML element to render. Use semantic elements like 'h1'-'h6' for headings. |

---

## Web Components

Tag: `goa-text`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `as` | "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | `div` | No | The HTML element to render. Use semantic elements like 'h1'-'h6' for headings. |
| `color` | "primary" | "secondary" | `primary` | No | Sets the text colour. |
| `maxwidth` | string | "none" | `65ch` | No | Sets the max width. |
| `mb` | Spacing | — | No | Bottom margin. |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |
| `size` | "heading-2xl" | "heading-xl" | "heading-l" | "heading-m" | "heading-s" | "headi… | — | No | Overrides the text size. |

---

## Usage guidance

### Types

- 💡 **Tip:** Use color='secondary' for supporting text that's less prominent than the main content.

---

## Accessibility guidance

### Screen Readers

- ⚠️ **Warning:** Use semantic heading tags (h1-h5) with GoabText for proper document structure and screen reader navigation.

---

## Examples

- [Ask a user for an address](/examples/ask-a-user-for-an-address)
- [Ask a user for direct deposit information](/examples/ask-a-user-for-direct-deposit-information)
- [Card grid](/examples/card-grid)
- [Display user information](/examples/display-user-information)
- [Error pages](/examples/error-pages): Standard error screens for Government of Alberta services. Use when a user lands somewhere that is missing, forbidden, or broken so they understand what happened and what to do next.
- [Filter data in a table](/examples/filter-data-in-a-table)
