# Page Block

Full-width section with optional background.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/page-block

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `width` | GoabPageBlockSize | `full` | No | Maximum width of the content area. Use "full" for 100% width or a CSS dimension like "1200px". |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `width` | GoabPageBlockSize | (none) | No | Maximum width of the content area. Use "full" for 100% width or a CSS dimension like "1200px". |

---

## Web Components

Tag: `goa-page-block`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `width` | "full" \| string | `full` | No | Maximum width of the content area. Use "full" for 100% width or a CSS dimension like "1200px". |

---

## Usage guidance

### Other

- **[Tip]** GoabPageBlock with a width prop is one way to constrain main content within OneColumnLayout. It gives you a quick, consistent content width without having to handle that yourself.

---

## Examples

- [Basic page layout](/examples/basic-page-layout)
- [Error pages](/examples/error-pages): Standard error screens for Government of Alberta services. Use when a user lands somewhere that is missing, forbidden, or broken so they understand what happened and what to do next.

---

## Related components

- [Block](/components/block): Group components into a block with consistent space between.
- [Container](/components/container): Group information, create hierarchy, and show related information.
