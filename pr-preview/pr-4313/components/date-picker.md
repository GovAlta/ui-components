# Date picker

Lets users select a date through a calendar without the need to manually type it in a field.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/date-picker

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `disabled` | boolean | (none) | No | Disables the date picker. |
| `error` | boolean | (none) | No | Sets the input to an error state. |
| `max` | string | (none) | No | Sets the latest allowed date as an ISO date string (yyyy-mm-dd). |
| `mb` | Spacing | (none) | No | (none) |
| `min` | string | (none) | No | Sets the earliest allowed date as an ISO date string (yyyy-mm-dd). |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `name` | string | (none) | No | Name of the date field. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabDatePickerInputType | `calendar` | No | Sets the date picker type. 'calendar' shows a calendar popup, 'input' shows just a date input. |
| `value` | string | (none) | No | Sets the calendar date as an ISO date string (yyyy-mm-dd). |
| `width` | string | (none) | No | Sets the width of the date picker input. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (detail: GoabDatePickerOnBlurDetail) => void | Callback fired when focus leaves all of the date picker's internal fields. |
| `onChange` | (detail: GoabDatePickerOnChangeDetail) => void | Callback fired when the selected date changes. |
| `onFocus` | (detail: GoabDatePickerOnFocusDetail) => void | Callback fired when focus enters any of the date picker's internal fields. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `disabled` | boolean | (none) | No | Sets the disabled state for the control. |
| `error` | boolean | (none) | No | Sets the error state for the control. |
| `id` | string | (none) | No | Sets the id attribute of the underlying web component. |
| `max` | string | (none) | No | Sets the latest allowed date as an ISO date string (yyyy-mm-dd). |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `min` | string | (none) | No | Sets the earliest allowed date as an ISO date string (yyyy-mm-dd). |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `name` | string | (none) | No | Sets the name of the date field. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `type` | GoabDatePickerInputType | `calendar` | No | Sets the date picker type. 'calendar' shows a calendar popup, 'input' shows just a date input. |
| `value` | string | (none) | No | Sets the calendar date as an ISO date string (yyyy-mm-dd). |
| `width` | string | (none) | No | Sets the width of the date picker input. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (event: GoabDatePickerOnBlurDetail) => void | Emits when focus leaves all of the date picker's internal fields. |
| `onChange` | (event: GoabDatePickerOnChangeDetail) => void | Emits when the selected date changes. Emits the date picker change detail including name and value. |
| `onFocus` | (event: GoabDatePickerOnFocusDetail) => void | Emits when focus enters any of the date picker's internal fields. |

---

## Web Components

Tag: `goa-date-picker`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `disabled` | boolean | `false` | No | Disables the date picker. |
| `error` | boolean | `false` | No | Sets the input to an error state. |
| `max` | string | (none) | No | Sets the latest allowed date as an ISO date string (yyyy-mm-dd). |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `min` | string | (none) | No | Sets the earliest allowed date as an ISO date string (yyyy-mm-dd). |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `name` | string | (none) | No | Name of the date field. |
| `size` | "default" \| "compact" | `default` | No | Sets the size of the date picker. 'compact' reduces height for dense layouts. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | "calendar" \| "input" | `calendar` | No | Sets the date picker type. 'calendar' shows a calendar popup, 'input' shows just a date input. |
| `value` | string | (none) | No | Sets the calendar date as an ISO date string (yyyy-mm-dd). |
| `width` | string | (none) | No | Sets the width of the date picker input. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_blur` | CustomEvent<{ name: string }> | (none) |
| `_change` | CustomEvent<{ name: string; value: Date \| string \| null; valueStr: string }> | (none) |
| `_focus` | CustomEvent<{ name: string }> | (none) |

---

## Usage guidance

### Types

- **[Do]** Use the calendar date picker for selecting dates relative to today, or when seeing the day of week is helpful.
- **[Do]** Use the input date picker for known dates far in the past or future, such as a birthday.
- **[Tip]** DatePicker handles most date inputs. Use type='input' (a dropdown for month and text inputs for day and year) for known dates like birthdays, far in the past or far in the future. Use type='calendar' (a popup calendar) for dates closer to the current day when the user is picking from available days, like booking or scheduling.

### Other

- **[Do]** Indicate unavailable dates to help users avoid invalid selections.
- **[Do]** Use a form item wrapper on all inputs to add a label, helper text, error message, and more.

### States

- **[Tip]** Set appropriate min and max dates for your use case. A birthdate field should limit to past dates, a booking field to future dates.
- **[Don't]** Don't disable buttons or inputs without explaining why. Disabled controls can be confusing and users may not understand why they can't interact with an element.

---

## Examples

- [Ask a user for a birthday](/examples/ask-a-user-for-a-birthday)
- [Confirm a change](/examples/confirm-a-change)
- [Reset date picker field](/examples/reset-date-picker-field)

---

## Related components

- [Form item](/components/form-item): Wraps an input control with a text label, requirement label, helper text, and error text.
- [Input](/components/input): A single-line field where users can input and edit text.
