# Tab

Individual tab within a tabs component.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/tab

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `disabled` | boolean | — | No | When true, disables the tab so it cannot be selected. |
| `heading` | string | React.ReactNode | — | No | The text label for this tab. Can also pass React nodes for custom heading content. |
| `slug` | string | — | No | URL-friendly identifier for the tab, used for hash-based navigation. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `heading` | No | The text label for this tab. Can also pass React nodes for custom heading content. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `disabled` | boolean | — | No | When true, disables the tab. |
| `heading` | string | TemplateRef<any> | — | No | The text label for this tab. Can also use the heading slot for custom content. |
| `slug` | string | — | No | Sets the URL slug for the tab. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `heading` | No | The text label for this tab. Can also pass React nodes for custom heading content. |

---

## Web Components

Tag: `goa-tab`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `disabled` | boolean | `false` | No |  |
| `heading` | string | — | No | The text label for this tab. Can also use the heading slot for custom content. |
| `open` | boolean | `false` | No | Whether this tab is currently selected/active. |
| `slug` | string | — | No |  |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `heading` | No | The text label for this tab. Can also pass React nodes for custom heading content. |

---

## Examples

- [Set a specific tab to be active](/examples/set-a-specific-tab-to-be-active)
- [Show different views of data in a table](/examples/show-different-views-of-data-in-a-table)

---

## Related components

- [Tabs](/components/tabs): Let users navigate between related sections of content, displaying one section at a time.
