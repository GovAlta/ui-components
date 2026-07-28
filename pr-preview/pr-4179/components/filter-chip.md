# Filter chip

Allow the user to enter information, filter content, and make selections.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/filter-chip

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Accessible content used to label the filter chip controls. |
| `error` | boolean | (none) | No | Shows an error state. |
| `iconTheme` | GoabFilterChipTheme | `outline` | No | Theme style of the leading icon. |
| `leadingIcon` | GoabIconType | (none) | No | Icon displayed at the start of the chip. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `secondaryText` | string | (none) | No | Secondary text displayed in a smaller size before the main content. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Callback fired when the filter chip is clicked to remove it. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `content` | Yes | Content displayed in the chip. Accepts a string or ReactNode for custom content. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Accessible content used to label the filter chip controls. |
| `content` | string \| TemplateRef<unknown> | (none) | No | Content displayed in the chip. Accepts a string or template for custom content. |
| `deletable` | boolean | (none) | No | Marks the chip as deletable. |
| `error` | boolean | (none) | No | Shows an error state. |
| `iconTheme` | GoabChipTheme | (none) | No | Sets the icon theme style for the filter chip. |
| `leadingIcon` | GoabIconType \| null | (none) | No | Icon displayed at the start of the chip. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `secondaryText` | string | (none) | No | Secondary text displayed in a smaller size before the main content. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Emits when the filter chip delete button is clicked. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `content` | Yes | Content displayed in the chip. Accepts a string or ngTemplate for custom content. |

---

## Web Components

Tag: `goa-filter-chip`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialabel` | string | (none) | No | Accessible content used to label the filter chip controls. |
| `content` | string | (none) | Yes | Content displayed in the chip. Use the content slot for custom HTML. |
| `error` | boolean | `false` | No | Shows an error state. |
| `leadingicon` | GoabIconType | (none) | No | Icon displayed at the start of the chip. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `secondarytext` | string | (none) | No | Secondary text displayed in a smaller size before the main content. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_click` | CustomEvent | (none) |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `content` | Yes | Content displayed in the chip. Accepts a string or ReactNode for custom content. |

---

## Usage guidance

### Types

- **[Tip]** FilterChip is for removable filters that users can dismiss. For static labels or status indicators, use Badge instead.

---

## Examples

- [Add a filter chip](/examples/add-a-filter-chip)
- [Filter data in a table](/examples/filter-data-in-a-table)
- [Remove a filter](/examples/remove-a-filter)
- [Type to create a new filter](/examples/type-to-create-a-new-filter)
- [Index page](/examples/workspace/index-page): The page staff land on to scan, filter, sort, and pick records to work on. The home of the workspace's daily queue.
