# Checkbox

Let the user select one or more options.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/checkbox

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Defines how the text will be translated for the screen reader. If not specified it will fall back to the name. |
| `checked` | boolean | (none) | No | Marks the checkbox item as selected. |
| `description` | string \| React.ReactNode | (none) | No | Additional description text displayed below the checkbox label. |
| `disabled` | boolean | (none) | No | Disable this control. It will not receive focus or events. |
| `error` | boolean | (none) | No | Shows an error on the checkbox item. |
| `id` | string | (none) | No | Sets a unique id for the checkbox element. |
| `indeterminate` | boolean | (none) | No | Shows a mixed/partial selection state. Used for 'Select All' checkboxes when some items are selected. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the checkbox. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `name` | string | (none) | Yes | Unique name to identify the checkbox. |
| `revealAriaLabel` | string | (none) | No | Text announced by screen readers when the reveal slot content is displayed. |
| `size` | GoabCheckboxSize | `default` | No | Sets the size of the checkbox. 'compact' reduces spacing for dense layouts. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `text` | string | (none) | No | Label shown beside the checkbox. |
| `value` | string \| number \| boolean | (none) | No | The value binding. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (detail: GoabCheckboxOnBlurDetail) => void | Callback fired when the checkbox loses focus. |
| `onChange` | (detail: GoabCheckboxOnChangeDetail) => void | Callback fired when the checkbox selection changes. |
| `onFocus` | (detail: GoabCheckboxOnFocusDetail) => void | Callback fired when the checkbox receives focus. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `description` | No | Additional description text displayed below the checkbox label. |
| `reveal` | No | Content revealed when the checkbox is checked. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Defines how the text will be translated for the screen reader. If not specified it will fall back to the name. |
| `checked` | boolean | (none) | No | Marks the checkbox item as selected. |
| `description` | string \| TemplateRef<any> | (none) | No | Sets additional description content displayed below the checkbox label. Accepts plain text or a template. |
| `disabled` | boolean | (none) | No | Sets the disabled state for the control. |
| `error` | boolean | (none) | No | Sets the error state for the control. |
| `id` | string | (none) | No | Sets the id attribute of the underlying web component. |
| `indeterminate` | boolean | (none) | No | Shows a mixed/partial selection state. Used for 'Select All' checkboxes when some items are selected. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the checkbox. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `name` | string | (none) | No | Sets the name of the checkbox input for form submission. |
| `revealArialLabel` | string | (none) | No | Text announced by screen readers when the reveal slot content is displayed. |
| `size` | GoabCheckboxSize | `default` | No | Sets the size of the checkbox. 'compact' reduces spacing for dense layouts. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `text` | string | (none) | No | Label shown beside the checkbox. |
| `value` | string \| number \| boolean \| null | (none) | No | The value binding. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (event: GoabCheckboxOnBlurDetail) => void | Emits when the checkbox loses focus. |
| `onChange` | (event: GoabCheckboxOnChangeDetail) => void | Emits when the checkbox value changes. Emits the new checkbox state as a GoabCheckboxOnChangeDetail object. |
| `onFocus` | (event: GoabCheckboxOnFocusDetail) => void | Emits when the checkbox receives focus. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `description` | No | Additional description text displayed below the checkbox label. |
| `reveal` | No | Content revealed when the checkbox is checked. |

---

## Web Components

Tag: `goa-checkbox`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialabel` | string | (none) | No | Defines how the text will be translated for the screen reader. If not specified it will fall back to the name. |
| `checked` | boolean | `false` | No | Marks the checkbox item as selected. |
| `description` | string | (none) | No | Additional description text displayed below the checkbox label. |
| `disabled` | boolean | `false` | No | Disable this control. It will not receive focus or events. |
| `error` | boolean | `false` | No | Shows an error on the checkbox item. |
| `indeterminate` | boolean | `false` | No | Shows a mixed/partial selection state. Used for 'Select All' checkboxes when some items are selected. |
| `maxwidth` | string | `none` | No | Sets the maximum width of the checkbox. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `name` | string | (none) | Yes | Unique name to identify the checkbox. |
| `revealarialabel` | string | (none) | No | Text announced by screen readers when the reveal slot content is displayed. |
| `size` | "default" \| "compact" | `default` | No | Sets the size of the checkbox. 'compact' reduces spacing for dense layouts. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `text` | string | (none) | No | Label shown beside the checkbox. |
| `value` | string | (none) | No | The value binding. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_blur` | CustomEvent<{ name: string; value: string; checked: boolean }> | (none) |
| `_change` | CustomEvent<{ name: string; checked: boolean; value: string }> | (none) |
| `_focus` | CustomEvent<{ name: string; value: string; checked: boolean }> | (none) |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `description` | No | Additional description text displayed below the checkbox label. |
| `reveal` | No | Content revealed when the checkbox is checked. |

---

## Usage guidance

### Types

- **[Don't]** Don't use Button for simple navigation (use Link), toggling state (use Toggle or Checkbox), or minor utility functions (use Icon Button).

### Content

- **[Do]** Start all checkbox labels with a capital letter.
- **[Tip]** Use the description prop to add context on complex options where the label alone isn't enough.
- **[Don't]** Don't include punctuation after checkbox labels.

### Other

- **[Do]** Use checkboxes when the user can select more than one option.
- **[Do]** Use a form item wrapper on all inputs to add a label, helper text, error message, and more.

### Positioning

- **[Do]** Put the checkbox input to the left of the label.
- **[Do]** List checkbox options vertically.
- **[Don't]** Don't list options horizontally when showing more than two options.

### States

- **[Don't]** Don't disable buttons or inputs without explaining why. Disabled controls can be confusing and users may not understand why they can't interact with an element.

---

## Examples

- [Add and edit lots of filters](/examples/add-and-edit-lots-of-filters)
- [Filter a list using a push drawer](/examples/filter-a-list-using-a-push-drawer)
- [Include a link in the helper text of an option](/examples/include-a-link-in-the-helper-text-of-an-option)
- [Reveal input based on a selection](/examples/reveal-input-based-on-a-selection)
- [Select one or more from a list of options](/examples/select-one-or-more-from-a-list-of-options)

---

## Related components

- [Checkbox list](/components/checkbox-list): A multiple selection input.
- [Form item](/components/form-item): Wraps an input control with a text label, requirement label, helper text, and error text.
- [Radio](/components/radio-group): Allow users to select one option from a set.
