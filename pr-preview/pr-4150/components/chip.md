# Chip

Compact element for labels, tags, or selections.

**Status:** deprecated | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/chip

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `mb` | Spacing | — | No |  |
| `ml` | Spacing | — | No |  |
| `mr` | Spacing | — | No |  |
| `mt` | Spacing | — | No |  |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Callback fired when the chip is clicked or deleted. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `mb` | Spacing | — | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | — | No | Sets the left margin spacing token. |
| `mr` | Spacing | — | No | Sets the right margin spacing token. |
| `mt` | Spacing | — | No | Sets the top margin spacing token. |
| `testId` | string | — | No | Sets the data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Emits when the chip is clicked. |

---

## Web Components

Tag: `goa-chip`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `mb` | Spacing | — | No | Bottom margin. |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_click` | CustomEvent |  |

---

## Related components

- [Badge](/components/badge): Small labels which hold small amounts of information, system feedback, or states.
- [Filter chip](/components/filter-chip): Allow the user to enter information, filter content, and make selections.
