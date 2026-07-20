# Menu Action

Individual action item within a menu button.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/menu-action

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | — | Yes | Action identifier included in the click event. |
| `icon` | GoabIconType | — | No | Icon displayed before the text. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `text` | string | — | Yes | Display text for the menu action. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | — | Yes | Action identifier included in the click event. |
| `icon` | GoabIconType | — | No | Icon displayed before the text. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `text` | string | — | Yes | Display text for the menu action. |

---

## Web Components

Tag: `goa-menu-action`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | `default` | No | Action identifier included in the click event. |
| `icon` | GoabIconType | — | No | Icon displayed before the text. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |
| `text` | string | — | No | Display text for the menu action. |

---

## Related components

- [Menu button](/components/menu-button): A button with more than one action.
