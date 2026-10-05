# Input

A single-line field where users can input and edit text.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/input

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Sets the aria-label used by assistive technologies. |
| `ariaLabelledBy` | string | (none) | No | The aria-labelledby attribute identifies the element (or elements) that labels the input |
| `autoCapitalize` | "on" \| "off" \| "none" \| "sentences" \| "words" \| "characters" | (none) | No | Controls automatic capitalization behavior on supported mobile browsers. |
| `autoComplete` | string | (none) | No | Sets the autocomplete attribute for the input element. |
| `debounce` | number | (none) | No | Debounce delay in milliseconds before firing the change event. 0 means no debounce. |
| `disabled` | boolean | (none) | No | Sets the input disabled state. |
| `error` | boolean | (none) | No | Sets the error state styling. |
| `focused` | boolean | (none) | No | Sets focus on initial render or controlled updates. |
| `id` | string | (none) | No | Sets the id attribute of the input element. |
| `leadingIcon` | GoabIconType | (none) | No | Sets the icon shown before the value. |
| `max` | number \| string | (none) | No | Maximum value. Supports any number, or ISO 8601 format for date/datetime types. |
| `maxLength` | number | (none) | No | Sets the maximum number of characters. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `min` | number \| string | (none) | No | Minimum value. Supports any number, or ISO 8601 format for date/datetime types. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `name` | string | (none) | No | Name of input value that is received in event detail payloads. If omitted, a unique name is generated. |
| `placeholder` | string | (none) | No | Sets placeholder text when the input is empty. |
| `readonly` | boolean | (none) | No | Sets the readonly state. |
| `size` | "default" \| "compact" | `default` | No | Sets the input size. |
| `step` | number | `1` | No | How much a number or date value should change by. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `textAlign` | "left" \| "right" | `left` | No | Sets text alignment. |
| `trailingIcon` | GoabIconType | (none) | No | Sets the icon shown after the value. |
| `trailingIconAriaLabel` | string | (none) | No | Sets the aria-label for an interactive trailing icon. |
| `type` | "text" \| "password" \| "email" \| "number" \| "date" \| "datetime-local" \| "month" … | `text` | No | Sets the type of the input field. |
| `value` | string | (none) | No | Bound to the current value of the input field. |
| `variant` | "goa" \| "bare" | `goa` | No | Sets the visual style variant. |
| `width` | string | (none) | No | Sets the width of the input field. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (detail: GoabInputOnBlurDetail) => void | Callback fired when the input loses focus. Receives GoabInputOnBlurDetail. |
| `onChange` | (detail: GoabInputOnChangeDetail) => void | Callback fired when the input value changes. Receives GoabInputOnChangeDetail. |
| `onFocus` | (detail: GoabInputOnFocusDetail) => void | Callback fired when the input receives focus. Receives GoabInputOnFocusDetail. |
| `onKeyPress` | (detail: GoabInputOnKeyPressDetail) => void | Callback fired when a key is pressed in the input. Receives GoabInputOnKeyPressDetail. |
| `onTrailingIconClick` | () => void | Callback fired when the trailing icon is clicked. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `leadingContent` | No | Sets content in the leading slot. |
| `trailingContent` | No | Sets content in the trailing slot. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Defines how the input will be translated for the screen reader. |
| `ariaLabelledBy` | string | (none) | No | The aria-labelledby attribute identifies the element (or elements) that labels the input. |
| `autoCapitalize` | "on" \| "off" \| "none" \| "sentences" \| "words" \| "characters" | (none) | No | Controls whether and how text input is automatically capitalized as it is entered/edited by the user. This only works on mobile devices. |
| `autoComplete` | string | (none) | No | Specifies the autocomplete attribute for the input field. |
| `debounce` | number | (none) | No | Debounce delay in milliseconds before firing the change event. 0 means no debounce. |
| `disabled` | boolean | (none) | No | Sets the disabled state for the control. |
| `error` | boolean | (none) | No | Sets the error state for the control. |
| `focused` | boolean | (none) | No | Sets the cursor focus to the input. |
| `id` | string | (none) | No | Sets the id attribute of the underlying web component. |
| `leadingContent` | string \| TemplateRef<any> | (none) | No | Sets the leading content slot, accepting a string or template reference. |
| `leadingIcon` | GoabIconType | (none) | No | Icon shown to the left of the text. |
| `max` | string \| number | (none) | No | A string value that supports any number, or an ISO 8601 format if using the date or datetime type. |
| `maxLength` | number | (none) | No | Sets the maximum number of characters (as UTF-16 code units) the user can enter into the input. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `min` | string \| number | (none) | No | A string value that supports any number, or an ISO 8601 format if using the date or datetime type. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `name` | string | (none) | No | Name of input value that is received in the onChange event. If omitted, a unique name is generated. |
| `placeholder` | string | (none) | No | Text displayed within the input when no value is set. |
| `readonly` | boolean | (none) | No | Makes the input readonly. |
| `size` | "default" \| "compact" | `default` | No | Sets the size of the input. 'compact' reduces height for dense layouts. |
| `step` | number | (none) | No | How much a number or date should change by. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `textAlign` | "left" \| "right" | `left` | No | Sets the text alignment within the input field. |
| `trailingContent` | string \| TemplateRef<any> | (none) | No | Sets the trailing content slot, accepting a string or template reference. |
| `trailingIcon` | GoabIconType | (none) | No | Icon shown to the right of the text. |
| `trailingIconAriaLabel` | string | (none) | No | Aria label for the trailing icon. Use only when the trailing icon is interactive. |
| `type` | "text" \| "password" \| "email" \| "number" \| "date" \| "datetime-local" \| "month" … | `text` | No | Sets the type of the input field. |
| `value` | string | (none) | No | Sets the control value used by Angular forms and one-way binding. |
| `variant` | string | (none) | No | Sets the visual style variant. 'goa' for standard GoA styling, 'bare' for minimal styling. |
| `width` | string | (none) | No | Sets the width of the text input area. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (event: GoabInputOnBlurDetail) => void | Emits when the input loses focus. Emits blur detail including the current value. |
| `onChange` | (event: GoabInputOnChangeDetail) => void | Emits when the input value changes. Emits change detail including the new value. |
| `onFocus` | (event: GoabInputOnFocusDetail) => void | Emits when the input receives focus. Emits focus detail including the current value. |
| `onKeyPress` | (event: GoabInputOnKeyPressDetail) => void | Emits when a key is pressed in the input. Emits key press detail including the value and key pressed. |
| `onTrailingIconClick` | () => void | Emits when the trailing icon is clicked. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `leadingContent` | No | Sets content in the leading slot. |
| `trailingContent` | No | Sets content in the trailing slot. |

---

## Web Components

Tag: `goa-input`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialabel` | string | (none) | No | Defines how the input will be translated for the screen reader. |
| `arialabelledby` | string | (none) | No | The aria-labelledby attribute identifies the element (or elements) that labels the input. |
| `autocapitalize` | "on" \| "off" \| "none" \| "sentences" \| "words" \| "characters" | `off` | No | Controls whether and how text input is automatically capitalized as it is entered/edited by the user. This only works on mobile devices. |
| `autocomplete` | string | (none) | No | Specifies the autocomplete attribute for the input field. |
| `debounce` | number | `0` | No | Debounce delay in milliseconds before firing the change event. 0 means no debounce. |
| `disabled` | boolean | `false` | No | Disables this input. The input will not receive focus or events. |
| `error` | boolean | `false` | No | Sets the input to an error state. |
| `focused` | boolean | `false` | No | Sets the cursor focus to the input. |
| `handletrailingiconclick` | boolean | `false` | No | Flag that will result in an icon button component being rendered instead of an icon. |
| `id` | string | (none) | No | Unique identifier for the input element. Used for label associations and accessibility. |
| `leadingicon` | GoabIconType | (none) | No | Icon shown to the left of the text. |
| `max` | string | (none) | No | A string value that supports any number, or an ISO 8601 format if using the date or datetime type. |
| `maxlength` | number | (none) | No | Defines the maximum number of characters (as UTF-16 code units) the user can enter into the input. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `min` | string | (none) | No | A string value that supports any number, or an ISO 8601 format if using the date or datetime type. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `name` | string | `generateRandomId()` | No | Name of input value that is received in the onChange event. If omitted, a unique name is generated. |
| `placeholder` | string | (none) | No | Text displayed within the input when no value is set. |
| `readonly` | boolean | `false` | No | Makes the input readonly. |
| `size` | "default" \| "compact" | `default` | No | Sets the size of the input. 'compact' reduces height for dense layouts. |
| `step` | number | `1` | No | How much a number or date should change by. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `textalign` | "left" \| "right" | `left` | No | Sets the text alignment within the input field. |
| `trailingicon` | GoabIconType | (none) | No | Icon shown to the right of the text. |
| `trailingiconarialabel` | string | (none) | No | Aria label for the trailing icon. Use only when the trailing icon is interactive. |
| `type` | "text" \| "number" \| "password" \| "email" \| "date" \| "datetime-local" \| "month" … | `text` | No | Sets the type of the input field. |
| `value` | string | (none) | No | Bound to value. |
| `variant` | "goa" \| "bare" | `goa` | No | Sets the visual style variant. 'goa' for standard GoA styling, 'bare' for minimal styling. |
| `width` | string | `30ch` | No | Sets the width of the text input area. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_blur` | CustomEvent<{ name: string; value: string }> | Emits when the input loses focus. |
| `_change` | CustomEvent<{ name: string; value: string }> | Emits when the input value changes. |
| `_focus` | CustomEvent<{ name: string; value: string }> | Emits when the input receives focus. |
| `_keyPress` | CustomEvent<{ name: string; value: string; key: string }> | Emits when a key is pressed in the input. |
| `_trailingIconClick` | CustomEvent | Emits when the trailing icon is clicked. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `leadingContent` | No | Sets content in the leading slot. |
| `trailingContent` | No | Sets content in the trailing slot. |

---

## Usage guidance

### States

- **[Don't]** Don't disable buttons or inputs without explaining why. Disabled controls can be confusing and users may not understand why they can't interact with an element.

### Other

- **[Do]** Use a form item wrapper on all inputs to add a label, helper text, error message, and more.

### Types

- **[Do]** Use the appropriate input type for your context to give a better experience.
- **[Do]** Use a text area to input content longer than a single line, such as descriptions, comments, or feedback.

### Content

- **[Don't]** Don't use placeholder text as a label

### Sizing

- **[Do]** Size text inputs based on the expected content length to help users understand what information is needed.

### Forms

- **[Don't]** Don't use a text area which is only one line high; instead, use text input if just one line is needed.

---

## Examples

- [Ask a user for an address](/examples/ask-a-user-for-an-address)
- [Ask a user for an Indian registration number](/examples/ask-a-user-for-an-indian-registration-number)
- [Ask a user for direct deposit information](/examples/ask-a-user-for-direct-deposit-information)
- [Ask a user for dollar amounts](/examples/ask-a-user-for-dollar-amounts)
- [Disabled button with a required field](/examples/disabled-button-with-a-required-field)
- [Filter data in a table](/examples/filter-data-in-a-table)
- [Limit the width of helper text](/examples/limit-the-width-of-helper-text)
- [Search](/examples/search)
- [Type to create a new filter](/examples/type-to-create-a-new-filter)

---

## Related components

- [Dropdown](/components/dropdown): Present a list of options to the user to select from.
- [Form item](/components/form-item): Wraps an input control with a text label, requirement label, helper text, and error text.
- [Text area](/components/text-area): A multi-line field where users can input and edit text.
