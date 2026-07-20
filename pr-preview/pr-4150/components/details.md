# Details

Let users reveal more detailed information when they need it.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/details

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | — | Yes | The title heading. |
| `maxWidth` | string | `75ch` | No | Sets the maximum width of the details. |
| `mb` | Spacing | — | No |  |
| `ml` | Spacing | — | No |  |
| `mr` | Spacing | — | No |  |
| `mt` | Spacing | — | No |  |
| `open` | boolean | — | No | Controls if details is expanded or not. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | — | Yes | The title heading. |
| `maxWidth` | string | — | No | Sets the maximum width of the details. |
| `mb` | Spacing | — | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | — | No | Sets the left margin spacing token. |
| `mr` | Spacing | — | No | Sets the right margin spacing token. |
| `mt` | Spacing | — | No | Sets the top margin spacing token. |
| `open` | boolean | — | No | Controls if details is expanded or not. |
| `testId` | string | — | No | Sets the data-testid attribute for automated testing. |

---

## Web Components

Tag: `goa-details`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | string | — | Yes | The title heading. |
| `maxwidth` | string | `75ch` | No | Sets the maximum width of the details. |
| `mb` | Spacing | — | No | Bottom margin. |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |
| `open` | boolean | `false` | No | Controls if details is expanded or not. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |

---

## Usage guidance

### Other

- ❌ **Don't:** Don't stack multiple details together. Use an accordion instead for sets of information.
- ✅ **Do:** Use details inline within a form to disclose more information as needed.

### Content

- ✅ **Do:** Use details to show more information or to help the user make a decision.
- ✅ **Do:** Keep content within 50-75 characters for optimal line length.

### Feedback

- ❌ **Don't:** Don't add more than 140 characters to a tooltip; for lengthy information use the details component.

---

## Examples

- [Ask a user for direct deposit information](/examples/ask-a-user-for-direct-deposit-information)
- [Question page](/examples/question-page): A question page presents one focused step in a multi-step form. Several variants adapt the shape: section titles, progress indicators, supporting context, expandable help, and grouped fields.

---

## Related components

- [Accordion](/components/accordion): Let users show and hide sections of related content on a page.
