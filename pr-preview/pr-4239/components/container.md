# Container

Group information, create hierarchy, and show related information.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/container

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `accent` | GoabContainerAccent | `filled` | No | Sets the style of accent on the container. |
| `maxHeight` | string | (none) | No | Sets the maximum height of the container. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the container. |
| `mb` | Spacing | (none) | No | (none) |
| `minHeight` | string | (none) | No | Sets the minimum height of the container. |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `padding` | GoabContainerPadding | `relaxed` | No | Sets the amount of white space in the container. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabContainerType | `interactive` | No | Sets the container and accent bar styling. |
| `width` | GoabContainerWidth | `full` | No | Sets the width of the container. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the container's actions area, typically buttons or controls. |
| `title` | No | Content rendered in the container's title/heading area. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `accent` | GoabContainerAccent | `filled` | No | Sets the style of accent on the container. |
| `maxHeight` | string | (none) | No | Sets the maximum height of the container. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the container. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `minHeight` | string | (none) | No | Sets the minimum height of the container. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `padding` | GoabContainerPadding | `relaxed` | No | Sets the amount of white space in the container. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `type` | GoabContainerType | `interactive` | No | Sets the container and accent bar styling. |
| `width` | GoabContainerWidth | `full` | No | Sets the width of the container. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the container's actions area, typically buttons or controls. |
| `title` | No | Content rendered in the container's title/heading area. |

---

## Web Components

Tag: `goa-container`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `accent` | "thick" \| "thin" \| "filled" | `filled` | No | Sets the style of accent on the container. |
| `maxheight` | string | (none) | No | Sets the maximum height of the container. |
| `maxwidth` | string | `none` | No | Sets the maximum width of the container. |
| `mb` | Spacing | `m` | No | Bottom margin. |
| `minheight` | string | (none) | No | Sets the minimum height of the container. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `padding` | "relaxed" \| "compact" | `relaxed` | No | Sets the amount of white space in the container. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | "interactive" \| "info" \| "error" \| "success" \| "important" \| "non-interactive" | `interactive` | No | Sets the container and accent bar styling. |
| `width` | "full" \| "content" | `full` | No | Sets the width of the container. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the container's actions area, typically buttons or controls. |
| `title` | No | Content rendered in the container's title/heading area. |

---

## Usage guidance

### Types

- **[Tip]** Use accent='thick' when you need a header area with a title or actions on a container.

### Other

- **[Don't]** Don't use a container for general page layout. Containers are for visual emphasis and grouping content.

---

## Examples

- [Card grid](/examples/card-grid)
- [Card view of case files](/examples/card-view-of-case-files)
- [Confirm a change](/examples/confirm-a-change)
- [Display user information](/examples/display-user-information)
- [Review and action](/examples/review-and-action)
- [Show full date in a tooltip](/examples/show-full-date-in-a-tooltip)
- [Show status on a card](/examples/show-status-on-a-card)
- [Type to create a new filter](/examples/type-to-create-a-new-filter)
- [Dashboard](/examples/workspace/dashboard): Gives staff an overview of their work with counts, trends, and assigned items.

---

## Related components

- [Block](/components/block): Group components into a block with consistent space between.
- [Grid](/components/grid): Arrange a number of components into a responsive grid pattern.
