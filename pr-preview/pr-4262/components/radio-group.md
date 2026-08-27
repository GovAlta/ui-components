# Radio

Allow users to select one option from a set.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/radio-group

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Defines how the radio group will be announced by screen readers. |
| `disabled` | boolean | (none) | No | Disables all radio items in the group. |
| `error` | boolean | (none) | No | Shows an error state on all radio items in the group. |
| `id` | string | (none) | No | The identifier for the radio group element. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `name` | string | (none) | Yes | The name for the radio group. Used for accessibility and change events. |
| `orientation` | GoabRadioGroupOrientation | `vertical` | No | Sets the layout direction. 'vertical' stacks items, 'horizontal' places them in a row. |
| `size` | GoabRadioGroupSize | `default` | No | Sets the size of all radio items. 'compact' reduces spacing for dense layouts. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `value` | string | (none) | No | The currently selected value in the radio group. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (detail: GoabRadioGroupOnBlurDetail) => void | Callback fired when focus leaves all radio items in the group. |
| `onChange` | (detail: GoabRadioGroupOnChangeDetail) => void | Callback fired when the selected radio item changes. |
| `onFocus` | (detail: GoabRadioGroupOnFocusDetail) => void | Callback fired when focus enters any radio item in the group. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Defines how the radio group will be announced by screen readers. |
| `disabled` | boolean | (none) | No | Sets the disabled state for the control. |
| `error` | boolean | (none) | No | Sets the error state for the control. |
| `id` | string | (none) | No | Sets the id attribute of the underlying web component. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `name` | string | (none) | No | The name for the radio group. Used for accessibility and change events. |
| `orientation` | GoabRadioGroupOrientation | (none) | No | Sets the layout direction. 'vertical' stacks items, 'horizontal' places them in a row. |
| `size` | GoabRadioGroupSize | `default` | No | Sets the size of all radio items. 'compact' reduces spacing for dense layouts (V2 only). |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `value` | string | (none) | No | The currently selected value in the radio group. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (event: GoabRadioGroupOnBlurDetail) => void | Emits when focus leaves all radio items in the group. |
| `onChange` | (event: GoabRadioGroupOnChangeDetail) => void | Emits when the selected radio item changes. Emits the name, value, and event of the selected item. |
| `onFocus` | (event: GoabRadioGroupOnFocusDetail) => void | Emits when focus enters any radio item in the group. |

---

## Web Components

Tag: `goa-radio-group`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialabel` | string | (none) | No | Defines how the radio group will be announced by screen readers. |
| `disabled` | boolean | `false` | No | Disables all radio items in the group. |
| `error` | boolean | `false` | No | Shows an error state on all radio items in the group. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `name` | string | (none) | Yes | The name for the radio group. Used for accessibility and change events. |
| `orientation` | "vertical" \| "horizontal" | `vertical` | No | Sets the layout direction. 'vertical' stacks items, 'horizontal' places them in a row. |
| `size` | "default" \| "compact" | `default` | No | Sets the size of all radio items. 'compact' reduces spacing for dense layouts (V2 only). |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `value` | string | (none) | Yes | The currently selected value in the radio group. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_blur` | CustomEvent<{ name: string }> | (none) |
| `_change` | CustomEvent<{ name: string; value: string; label: string }> | (none) |
| `_focus` | CustomEvent<{ name: string }> | (none) |

---

## Usage guidance

### States

- **[Don't]** Don't disable buttons or inputs without explaining why. Disabled controls can be confusing and users may not understand why they can't interact with an element.

### Other

- **[Do]** Use a form item wrapper on all inputs to add a label, helper text, error message, and more.
- **[Tip]** Use the reveal slot to show additional content when a radio option is selected, like a follow-up question or input field.
- **[Tip]** Always use RadioGroup as the parent for sets of RadioItem children. Don't try to build radio button sets manually.

### Content

- **[Tip]** Use the description prop to add context on radio options where the label alone isn't enough to explain the choice.
- **[Don't]** Don't include a period after a radio label.

### Usage

- **[Don't]** Don't use radios when there are more than 7 options - use a dropdown instead.

### Interaction

- **[Don't]** Don't nest multiple layers of conditionally revealed questions.
- **[Don't]** Don't preselect radio items - users might miss the question or submit the wrong answer.

### Layout

- **[Do]** Consider horizontal listing when presenting 2-3 short options like Yes/No.

---

## Accessibility guidance

### Screen Readers

- **[Warning]** When using the reveal slot, set revealAriaLabel so screen readers announce the newly visible content.

---

## Examples

- [Add a record using a drawer](/examples/add-a-record-using-a-drawer)
- [Add and edit lots of filters](/examples/add-and-edit-lots-of-filters)
- [Include descriptions for items in a checkbox list](/examples/include-descriptions-for-items-in-a-checkbox-list)
- [Question page](/examples/question-page): A question page presents one focused step in a multi-step form. Several variants adapt the shape: section titles, progress indicators, supporting context, expandable help, and grouped fields.
- [Reveal input based on a selection](/examples/reveal-input-based-on-a-selection)
- [Review and action](/examples/review-and-action)
- [Set a max width on a long radio item](/examples/set-a-max-width-on-a-long-radio-item)

---

## Related components

- [Checkbox](/components/checkbox): Let the user select one or more options.
- [Form item](/components/form-item): Wraps an input control with a text label, requirement label, helper text, and error text.
