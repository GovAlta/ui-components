# Accordion

Let users show and hide sections of related content on a page.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/accordion

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | (none) | No | Sets the heading text. |
| `headingSize` | GoabAccordionHeadingSize | `small` | No | Sets the heading size of the accordion container heading. |
| `headingType` | GoabAccordionHeadingType | `normal` | No | Sets the accordion style variant. |
| `iconPosition` | GoabAccordionIconPosition | `left` | No | Sets the position of the expand/collapse icon. |
| `maxWidth` | string | `none` | No | Sets the maximum width of the accordion. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `open` | boolean | (none) | No | Sets the state of the accordion container open or closed. |
| `secondaryText` | string | (none) | No | Sets secondary text displayed alongside the heading. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | (open: boolean) => void | Callback fired when the accordion is opened or closed. Receives the new open state as a boolean. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Sets content rendered in the accordion heading, right-aligned before the expand/collapse icon. |
| `headingContent` | No | Sets content rendered within the accordion heading, alongside the heading text. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | (none) | No | Sets the heading text. |
| `headingSize` | GoabAccordionHeadingSize | (none) | No | Sets the heading size of the accordion container heading. |
| `headingType` | GoabAccordionHeadingType | (none) | No | Sets the accordion style variant. |
| `iconPosition` | GoabAccordionIconPosition | (none) | No | Sets the position of the expand/collapse icon. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the accordion. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `open` | boolean | (none) | No | Sets the state of the accordion container open or closed. |
| `secondaryText` | string | (none) | No | Sets secondary text. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | (event: boolean) => void | Emits when the accordion opens or closes. Emits the new open state as a boolean. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Sets content rendered in the accordion heading, right-aligned before the expand/collapse icon. |
| `headingContent` | No | Sets content rendered within the accordion heading, alongside the heading text. |

---

## Web Components

Tag: `goa-accordion`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | (none) | Yes | Sets the heading text. |
| `heading-type` | "normal" \| "filled" | `normal` | No | Sets the accordion style variant. @default "normal" |
| `headingsize` | "small" \| "medium" | `small` | No | Sets the heading size of the accordion container heading. |
| `iconposition` | "left" \| "right" | `left` | No | Sets the position of the expand/collapse icon. |
| `id` | string | (none) | No | Unique identifier for the accordion. |
| `maxwidth` | string | `none` | No | Sets the maximum width of the accordion. |
| `mb` | Spacing | `xs` | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `open` | boolean | `false` | No | Sets the state of the accordion container open or closed. |
| `secondarytext` | string | (none) | No | Sets secondary text. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_change` | CustomEvent<{ open: boolean }> | (none) |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Sets content rendered in the accordion heading, right-aligned before the expand/collapse icon. |
| `headingcontent` | No | Sets content rendered within the accordion heading, alongside the heading text. |

---

## Usage guidance

### Positioning

- **[Do]** Ensure accordion content is left-aligned with the heading, leaving white space on the left side of the container.

### Other

- **[Don't]** Don't hide key functionality in collapsed accordions. If content is critical to the workflow, it should be visible when the page loads.

### Content

- **[Don't]** Don't exceed 75 characters in line length within expanded accordion content.
- **[Do]** Use secondaryText for contextual information in accordions

---

## Examples

- [Expand or collapse part of a form](/examples/expand-or-collapse-part-of-a-form)
- [Hide and show many sections of information](/examples/hide-and-show-many-sections-of-information)
- [Case detail](/examples/workspace/case-detail): A single-record view for reviewing and acting on one case. Uses accordion sections, a table-of-contents sidebar, badges for status, and header actions for quick operations.

---

## Related components

- [Details](/components/details): Let users reveal more detailed information when they need it.
