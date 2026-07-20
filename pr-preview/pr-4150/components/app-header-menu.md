# App Header Menu

Menu items within the app header.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/app-header-menu

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | — | Yes | The menu heading text displayed as the dropdown trigger. |
| `leadingIcon` | GoabIconType | — | No | Icon displayed before the heading text. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | — | No | The menu heading text displayed as the dropdown trigger. |
| `leadingIcon` | GoabIconType | — | No | Icon displayed before the heading text. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |

---

## Web Components

Tag: `goa-app-header-menu`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | — | Yes | The menu heading text displayed as the dropdown trigger. |
| `leadingicon` | GoabIconType | — | Yes | Icon displayed before the heading text. |
| `testid` | string | `rootEl` | No | Sets a data-testid attribute for automated testing. |
| `type` | "primary" | "secondary" | `primary` | No | The menu style variant. Primary uses bold text, secondary uses regular weight. |
| `version` | "1" | "2" | `1` | No | Design system version for styling. |

---

## Examples

- [Header with navigation](/examples/header-with-navigation)

---

## Related components

- [Header](/components/app-header): Provide structure to help users find their way around the service.
