# Footer Nav Section

Navigation links section in footer.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/footer-nav-section

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | — | No | The section heading displayed above the navigation links. |
| `maxColumnCount` | number | `1` | No | Maximum number of columns to display links in on larger screens. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | — | No | The section heading displayed above the navigation links. |
| `maxColumnCount` | number | `1` | No | Maximum number of columns to display links in on larger screens. |
| `slot` | "nav" | — | Yes | Sets the slot to "nav" to render the section in the correct footer position. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |

---

## Web Components

Tag: `goa-footer-nav-section`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | — | No | The section heading displayed above the navigation links. |
| `maxcolumncount` | number | `1` | No | Maximum number of columns to display links in on larger screens. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |

---

## Examples

- [Show links to navigation items](/examples/show-links-to-navigation-items)

---

## Related components

- [Footer](/components/footer): Provides information related your service at the bottom of every page.
- [Link](/components/link): Wraps an anchor element to add icons or margins.
