# Footer

Provides information related your service at the bottom of every page.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/footer

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `maxContentWidth` | string | (none) | No | The maximum width of the main content area. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `url` | string | `https://alberta.ca` | No | URL for the Government of Alberta logo link. Set to empty string to disable the link. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `maxContentWidth` | string | (none) | No | The maximum width of the main content area. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `url` | string | (none) | No | URL for the Government of Alberta logo link. Set to empty string to disable the link. |

---

## Web Components

Tag: `goa-footer`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `maxcontentwidth` | string | (none) | No | The maximum width of the main content area |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `url` | string | `https://alberta.ca` | No | URL for the Government of Alberta logo link. Set to empty string to disable the link. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `meta` | No | (none) |
| `nav` | No | (none) |

---

## Examples

- [Basic page layout](/examples/basic-page-layout)
- [Show links to navigation items](/examples/show-links-to-navigation-items)
- [Show quick links](/examples/show-quick-links)
