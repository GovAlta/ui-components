# Filter chip

Allow the user to enter information, filter content, and make selections.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/filter-chip

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | string | — | Yes | Text label of the chip. |
| `error` | boolean | — | No | Shows an error state. |
| `iconTheme` | GoabFilterChipTheme | `outline` | No | Theme style of the leading icon. |
| `leadingIcon` | GoabIconType | — | No | Icon displayed at the start of the chip. |
| `mb` | Spacing | — | No |  |
| `ml` | Spacing | — | No |  |
| `mr` | Spacing | — | No |  |
| `mt` | Spacing | — | No |  |
| `secondaryText` | string | — | No | Secondary text displayed in a smaller size before the main content. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Callback fired when the filter chip is clicked to remove it. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | string | — | No | Text label of the chip. |
| `deletable` | boolean | — | No | Marks the chip as deletable. |
| `error` | boolean | — | No | Shows an error state. |
| `iconTheme` | GoabChipTheme | — | No | Sets the icon theme style for the filter chip. |
| `leadingIcon` | GoabIconType | null | — | No | Icon displayed at the start of the chip. |
| `mb` | Spacing | — | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | — | No | Sets the left margin spacing token. |
| `mr` | Spacing | — | No | Sets the right margin spacing token. |
| `mt` | Spacing | — | No | Sets the top margin spacing token. |
| `secondaryText` | string | — | No | Secondary text displayed in a smaller size before the main content. |
| `testId` | string | — | No | Sets the data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Emits when the filter chip delete button is clicked. |

---

## Web Components

Tag: `goa-filter-chip`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialabel` | string | — | No | Accessible label for the filter chip. Defaults to content with 'removable' suffix. |
| `content` | string | — | Yes | Text label of the chip. |
| `error` | boolean | `false` | No | Shows an error state. |
| `leadingicon` | GoabIconType | — | No | Icon displayed at the start of the chip. |
| `mb` | Spacing | — | No | Bottom margin. |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |
| `secondarytext` | string | — | No | Secondary text displayed in a smaller size before the main content. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |
| `version` | "1" | "2" | `1` | No | Design system version for styling. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_click` | CustomEvent |  |

---

## Usage guidance

### Types

- 💡 **Tip:** FilterChip is for removable filters that users can dismiss. For static labels or status indicators, use Badge instead.

---

## Examples

- [Add a filter chip](/examples/add-a-filter-chip)
- [Filter data in a table](/examples/filter-data-in-a-table)
- [Remove a filter](/examples/remove-a-filter)
- [Type to create a new filter](/examples/type-to-create-a-new-filter)
- [Index page](/examples/workspace/index-page): The page staff land on to scan, filter, sort, and pick records to work on. The home of the workspace's daily queue.
