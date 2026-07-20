# Work Side Menu Item

Individual menu item within the work side menu.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/work-side-menu-item

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `current` | boolean | — | No | When true, indicates this is the currently active menu item. |
| `divider` | boolean | — | No | When true, displays a divider line above this menu item. |
| `icon` | string | — | No | Icon displayed before the menu item label. |
| `label` | string | — | Yes | The text label displayed for the menu item. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `url` | string | — | No | The URL the menu item links to. When absent, renders as a button instead of a link. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `popoverContent` | No | Content rendered inside the popover panel attached to this menu item. |
| `trailingContent` | No | Content rendered after the label in the trailing area of the menu item. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `current` | boolean | — | No | When true, indicates this is the currently active menu item. |
| `divider` | boolean | — | No | When true, displays a divider line above this menu item. |
| `icon` | string | — | No | Icon displayed before the menu item label. |
| `label` | string | — | Yes | The text label displayed for the menu item. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `url` | string | — | No | The URL the menu item links to. Optional — when absent, renders as a button instead of a link. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `popoverContent` | No | Content rendered inside the popover panel attached to this menu item. |
| `trailingContent` | No | Content rendered after the label in the trailing area of the menu item. |

---

## Web Components

Tag: `goa-work-side-menu-item`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `current` | boolean | `false` | No | When true, indicates this is the currently active menu item. |
| `divider` | boolean | `false` | No | When true, displays a divider line above this menu item. |
| `icon` | GoabIconType | — | No | Icon displayed before the menu item label. |
| `label` | string | — | Yes | The text label displayed for the menu item. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |
| `url` | string | — | No | The URL the menu item links to. Optional — when absent, renders as a button instead of a link. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `popoverContent` | No | Content rendered inside the popover panel attached to this menu item. |
| `trailingContent` | No | Content rendered after the label in the trailing area of the menu item. |

---

## Related components

- [Work Side Menu](/components/work-side-menu): Side menu variant for worker applications.
