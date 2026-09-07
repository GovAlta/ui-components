# Details

Let users reveal more detailed information when they need it.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/details

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | (none) | Yes | The title heading. |
| `maxWidth` | string | `75ch` | No | Sets the maximum width of the details. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `open` | boolean | (none) | No | Controls if details is expanded or not. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | (none) | Yes | The title heading. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the details. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `open` | boolean | (none) | No | Controls if details is expanded or not. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |

---

## Web Components

Tag: `goa-details`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | (none) | Yes | The title heading. |
| `maxwidth` | string | `75ch` | No | Sets the maximum width of the details. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `open` | boolean | `false` | No | Controls if details is expanded or not. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |

---

## Usage guidance

### Other

- **[Don't]** Don't stack multiple details together. Use an accordion instead for sets of information.
- **[Do]** Use details inline within a form to disclose more information as needed.

### Content

- **[Do]** Use details to show more information or to help the user make a decision.
- **[Do]** Keep content within 50-75 characters for optimal line length.

### Feedback

- **[Don't]** Don't add more than 140 characters to a tooltip; for lengthy information use the details component.

---

## Examples

- [Ask a user for direct deposit information](/examples/ask-a-user-for-direct-deposit-information)
- [Question page](/examples/question-page): A question page presents one focused step in a multi-step form. Several variants adapt the shape: section titles, progress indicators, supporting context, expandable help, and grouped fields.

---

## Related components

- [Accordion](/components/accordion): Let users show and hide sections of related content on a page.
