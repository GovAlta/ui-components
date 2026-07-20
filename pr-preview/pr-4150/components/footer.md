# Footer

Provides information related your service at the bottom of every page.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/footer

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `maxContentWidth` | string | — | No | The maximum width of the main content area. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `url` | string | `https://alberta.ca` | No | URL for the Government of Alberta logo link. Set to empty string to disable the link. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `maxContentWidth` | string | — | No | The maximum width of the main content area. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `url` | string | — | No | URL for the Government of Alberta logo link. Set to empty string to disable the link. |

---

## Web Components

Tag: `goa-footer`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `maxcontentwidth` | string | — | No | The maximum width of the main content area |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |
| `url` | string | `https://alberta.ca` | No | URL for the Government of Alberta logo link. Set to empty string to disable the link. |
| `version` | "1" | "2" | `1` | No | Design system version for styling. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `meta` | No |  |
| `nav` | No |  |

---

## Examples

- [Basic page layout](/examples/basic-page-layout)
- [Show links to navigation items](/examples/show-links-to-navigation-items)
- [Show quick links](/examples/show-quick-links)
