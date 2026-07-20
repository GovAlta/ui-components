# Accordion

Let users show and hide sections of related content on a page.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/accordion

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | — | No | Sets the heading text. |
| `headingSize` | GoabAccordionHeadingSize | `small` | No | Sets the heading size of the accordion container heading. |
| `headingType` | GoabAccordionHeadingType | `normal` | No | Sets the accordion style variant. |
| `iconPosition` | GoabAccordionIconPosition | `left` | No | Sets the position of the expand/collapse icon. |
| `maxWidth` | string | `none` | No | Sets the maximum width of the accordion. |
| `mb` | Spacing | — | No |  |
| `ml` | Spacing | — | No |  |
| `mr` | Spacing | — | No |  |
| `mt` | Spacing | — | No |  |
| `open` | boolean | — | No | Sets the state of the accordion container open or closed. |
| `secondaryText` | string | — | No | Sets secondary text displayed alongside the heading. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |

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
| `heading` | string | — | No | Sets the heading text. |
| `headingSize` | GoabAccordionHeadingSize | — | No | Sets the heading size of the accordion container heading. |
| `headingType` | GoabAccordionHeadingType | — | No | Sets the accordion style variant. |
| `iconPosition` | GoabAccordionIconPosition | — | No | Sets the position of the expand/collapse icon. |
| `maxWidth` | string | — | No | Sets the maximum width of the accordion. |
| `mb` | Spacing | — | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | — | No | Sets the left margin spacing token. |
| `mr` | Spacing | — | No | Sets the right margin spacing token. |
| `mt` | Spacing | — | No | Sets the top margin spacing token. |
| `open` | boolean | — | No | Sets the state of the accordion container open or closed. |
| `secondaryText` | string | — | No | Sets secondary text. |
| `testId` | string | — | No | Sets the data-testid attribute for automated testing. |

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
| `heading` | string | — | Yes | Sets the heading text. |
| `heading-type` | "normal" | "filled" | `normal` | No | Sets the accordion style variant. @default "normal" |
| `headingsize` | "small" | "medium" | `small` | No | Sets the heading size of the accordion container heading. |
| `iconposition` | "left" | "right" | `left` | No | Sets the position of the expand/collapse icon. |
| `id` | string | — | No | Unique identifier for the accordion. |
| `maxwidth` | string | `none` | No | Sets the maximum width of the accordion. |
| `mb` | Spacing | `xs` | No | Bottom margin. |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |
| `open` | boolean | `false` | No | Sets the state of the accordion container open or closed. |
| `secondarytext` | string | — | No | Sets secondary text. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_change` | CustomEvent<{ open: boolean }> |  |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Sets content rendered in the accordion heading, right-aligned before the expand/collapse icon. |
| `headingcontent` | No | Sets content rendered within the accordion heading, alongside the heading text. |

---

## Usage guidance

### Positioning

- ✅ **Do:** Ensure accordion content is left-aligned with the heading, leaving white space on the left side of the container.

### Other

- ❌ **Don't:** Don't hide key functionality in collapsed accordions. If content is critical to the workflow, it should be visible when the page loads.

### Content

- ❌ **Don't:** Don't exceed 75 characters in line length within expanded accordion content.
- ✅ **Do:** Use secondaryText for contextual information in accordions

---

## Examples

- [Expand or collapse part of a form](/examples/expand-or-collapse-part-of-a-form)
- [Hide and show many sections of information](/examples/hide-and-show-many-sections-of-information)
- [Case detail](/examples/workspace/case-detail): A single-record view for reviewing and acting on one case. Uses accordion sections, a table-of-contents sidebar, badges for status, and header actions for quick operations.

---

## Related components

- [Details](/components/details): Let users reveal more detailed information when they need it.
