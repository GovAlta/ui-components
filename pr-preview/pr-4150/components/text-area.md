# Text area

A multi-line field where users can input and edit text.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/text-area

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Defines how the text will be translated for the screen reader. If not specified it will fall back to the name. |
| `autoComplete` | string | (none) | No | Specifies the autocomplete attribute for the textarea input. |
| `countBy` | GoabTextAreaCountBy | (none) | No | Counting interval for characters or words, specifying whether to count every character or word. |
| `disabled` | boolean | (none) | No | Sets the input to a disabled state. |
| `error` | boolean | (none) | No | Sets the input to an error state. |
| `id` | string | (none) | No | Sets the id attribute on the textarea element. |
| `maxCount` | number | (none) | No | Maximum number of characters or words allowed. |
| `maxWidth` | string | `60ch` | No | Sets the maximum width of the text area. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `name` | string | (none) | Yes | Name of the input value that is received in the change event. |
| `placeholder` | string | (none) | No | Text displayed within the textarea when no value is set. |
| `readOnly` | boolean | (none) | No | Sets the input to a read only state. |
| `rows` | number | `3` | No | Sets the number of visible text rows. |
| `size` | GoabTextAreaSize | (none) | No | Sets the visual size variant of the text area. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `value` | string | (none) | No | Bound to the current value of the textarea. |
| `width` | string | `100%` | No | Sets the width of the text area. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (event: GoabTextAreaOnBlurDetail) => void | Callback fired when the textarea loses focus. |
| `onChange` | (event: GoabTextAreaOnChangeDetail) => void | Callback fired when the value of the textarea changes. |
| `onFocus` | (event: GoabTextAreaOnFocusDetail) => void | Callback fired when the textarea receives focus. |
| `onKeyPress` | (event: GoabTextAreaOnKeyPressDetail) => void | Callback fired when a key is pressed within the textarea. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Defines how the text will be translated for the screen reader. If not specified it will fall back to the name. |
| `autoComplete` | string | `on` | No | Specifies the autocomplete attribute for the textarea input. |
| `countBy` | GoabTextAreaCountBy | (none) | No | Counting interval for characters or words, specifying whether to count every character or word. |
| `disabled` | boolean | (none) | No | Sets the disabled state for the control. |
| `error` | boolean | (none) | No | Sets the error state for the control. |
| `id` | string | (none) | No | Sets the id attribute of the underlying web component. |
| `maxCount` | number | `-1` | No | Maximum number of characters or words allowed. |
| `maxWidth` | string | (none) | No | Maximum width of the text area. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `name` | string | (none) | No | Name of the input value that is received in the _change event. |
| `placeholder` | string | (none) | No | Text displayed within the input when no value is set. |
| `readOnly` | boolean | (none) | No | Sets the input to a read only state. |
| `rows` | number | `3` | No | Set the number of rows. |
| `size` | GoabTextAreaSize | `default` | No | Sets the size variant of the textarea. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `value` | string | (none) | No | Sets the control value used by Angular forms and one-way binding. |
| `width` | string | (none) | No | Width of the text area. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (event: GoabTextAreaOnBlurDetail) => void | Emits when the textarea loses focus. Emits the name and current value. |
| `onChange` | (event: GoabTextAreaOnChangeDetail) => void | Emits when the textarea value changes. Emits the name and new value. |
| `onFocus` | (event: GoabTextAreaOnFocusDetail) => void | Emits when the textarea receives focus. Emits the name and current value. |
| `onKeyPress` | (event: GoabTextAreaOnKeyPressDetail) => void | Emits when a key is pressed in the textarea. Emits the name, value, and key. |

---

## Web Components

Tag: `goa-text-area`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialabel` | string | (none) | No | Defines how the text will be translated for the screen reader. If not specified it will fall back to the name. |
| `autocomplete` | string | (none) | No | Specifies the autocomplete attribute for the textarea input. |
| `countby` | "character" \| "word" \| "" | (none) | No | Counting interval for characters or words, specifying whether to count every character or word. |
| `disabled` | boolean | `false` | No | Sets the input to a disabled state. Use [attr.disabled] with [formControl] |
| `error` | boolean | `false` | No | Sets the input to an error state |
| `maxcount` | number | `-1` | No | Maximum number of characters or words allowed |
| `maxwidth` | string | `60ch` | No | Maximum width of the text area |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `name` | string | (none) | Yes | Name of the input value that is received in the _change event. |
| `placeholder` | string | (none) | No | Text displayed within the input when no value is set. |
| `readonly` | boolean | `false` | No | Sets the input to a read only state. |
| `rows` | number | `3` | No | Set the number of rows. |
| `size` | "default" \| "compact" | `default` | No | (none) |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `value` | string | (none) | No | Bound to value |
| `width` | string | `100%` | No | Width of the text area. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_blur` | CustomEvent<{ name: string; value: string }> | (none) |
| `_change` | CustomEvent<{ name: string; value: string }> | (none) |
| `_focus` | CustomEvent<{ name: string; value: string }> | (none) |
| `_keyPress` | CustomEvent<{ name: string; value: string; key: string }> | (none) |

---

## Usage guidance

### States

- **[Don't]** Don't disable buttons or inputs without explaining why. Disabled controls can be confusing and users may not understand why they can't interact with an element.

### Other

- **[Do]** Use a form item wrapper on all inputs to add a label, helper text, error message, and more.

### Sizing

- **[Do]** Size text inputs based on the expected content length to help users understand what information is needed.

### Content

- **[Tip]** Use countBy='word' when suggesting a response length. Use countBy='character' when enforcing a hard limit.

### Types

- **[Do]** Use a text area to input content longer than a single line, such as descriptions, comments, or feedback.

---

## Examples

- [Add another item in a modal](/examples/add-another-item-in-a-modal)
- [Ask a long answer question with a maximum word count](/examples/ask-a-long-answer-question-with-a-maximum-word-count)
- [Question page](/examples/question-page): A question page presents one focused step in a multi-step form. Several variants adapt the shape: section titles, progress indicators, supporting context, expandable help, and grouped fields.
- [Review and action](/examples/review-and-action)

---

## Related components

- [Form item](/components/form-item): Wraps an input control with a text label, requirement label, helper text, and error text.
- [Input](/components/input): A single-line field where users can input and edit text.
