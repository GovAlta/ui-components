# Form item

Wraps an input control with a text label, requirement label, helper text, and error text.

**Status:** stable | **Category:** Utilities | **Docs:** https://design.alberta.ca/components/form-item

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `error` | string \| React.ReactNode | (none) | No | Error text displayed under the form field. Leave blank to indicate a valid field. Accepts a string or ReactNode for custom error content. |
| `helpText` | string \| React.ReactNode | (none) | No | Help text displayed under the form field to provide additional explanation. Accepts a string or ReactNode for custom help content. |
| `id` | string | (none) | No | Sets the id attribute on the form item element. |
| `label` | string | (none) | No | Creates a label for the form item. |
| `labelSize` | GoabFormItemLabelSize | `regular` | No | Sets the label size. 'regular' for standard, 'large' for emphasis. |
| `maxWidth` | string | `none` | No | Sets the maximum width of the form item. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `name` | string | (none) | No | Overrides the label value within the form-summary to provide a shorter description. For public-form use only. |
| `requirement` | GoabFormItemRequirement | (none) | No | Marks the field with an optional or required label indicator. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabFormItemType | (none) | No | Specifies the input type for appropriate message spacing. Used with checkbox-list or radio-group. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `error` | No | Error text displayed under the form field. Leave blank to indicate a valid field. Accepts a string or ReactNode for custom error content. |
| `helpText` | No | Help text displayed under the form field to provide additional explanation. Accepts a string or ReactNode for custom help content. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `error` | string \| TemplateRef<any> | (none) | No | Error text displayed under the form field. Leave blank to indicate a valid field. |
| `helpText` | string \| TemplateRef<any> | (none) | No | Help text displayed under the form field to provide additional explanation. |
| `id` | string | (none) | No | Sets the id attribute on the form item element. |
| `label` | string | (none) | No | Creates a label for the form item. |
| `labelSize` | GoabFormItemLabelSize | (none) | No | Sets the label size. 'regular' for standard, 'large' for emphasis. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the form item. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `name` | string | (none) | No | Overrides the label value within the form-summary to provide a shorter description. For public-form use only. |
| `requirement` | GoabFormItemRequirement | (none) | No | Marks the field with an optional or required label indicator. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `type` | GoabFormItemType | (none) | No | Specifies the input type for appropriate message spacing. Used with checkbox-list or radio-group. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `error` | No | Error text displayed under the form field. Leave blank to indicate a valid field. Accepts a string or ngTemplate for custom error content. |
| `helpText` | No | Help text displayed under the form field to provide additional explanation. Accepts a string or ngTemplate for custom help content. |

---

## Web Components

Tag: `goa-form-item`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `error` | string | (none) | No | Error text displayed under the form field. Leave blank to indicate a valid field. |
| `helptext` | string | (none) | No | Help text displayed under the form field to provide additional explanation. |
| `label` | string | (none) | No | Creates a label for the form item. |
| `labelsize` | "compact" \| "regular" \| "large" | `regular` | No | Sets the label size. 'compact' for dense layouts, 'regular' for standard, 'large' for emphasis. |
| `maxwidth` | string | `none` | No | Sets the maximum width of the form item. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `name` | string | `blank` | No | Overrides the label value within the form-summary. For public-form use only. |
| `requirement` | "optional" \| "required" | (none) | No | Marks the field with an optional or required label indicator. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | "text-input" \| "textarea" \| "checkbox-list" \| "radio-group" | (none) | No | Specifies the input type for appropriate message spacing. Used with checkbox-list or radio-group. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `error` | No | Error text displayed under the form field. Leave blank to indicate a valid field. Accepts a string or ReactNode for custom error content. |
| `helptext` | No | Help text displayed under the form field to provide additional explanation. Accepts a string or ReactNode for custom help content. |

---

## Usage guidance

### Other

- **[Do]** Use a form item wrapper on all inputs to add a label, helper text, error message, and more.

### Sizing

- **[Tip]** Use labelSize='large' when you want the question to act as the heading on the page. This is often the right choice when there's only one question on a page, so you don't end up with a separate heading and a question saying the same thing.

### Forms

- **[Don't]** Don't use the character counter for input fields where user entries typically have standard or predictable lengths.
- **[Do]** Use the character count only when there's a valid reason to limit the number of characters.
- **[Do]** Make empty text areas as tall as the content they are expected to contain.
- **[Do]** Ensure that the text area width is no longer than 75 characters per line; ideal line length is 45-75 characters.
- **[Don't]** Don't use a text area which is only one line high; instead, use text input if just one line is needed.
- **[Do]** If you suggest a specific length for an answer to a question, display a word count to help guide the user.

---

## Examples

- [Add a record using a drawer](/examples/add-a-record-using-a-drawer)
- [Add and edit lots of filters](/examples/add-and-edit-lots-of-filters)
- [Add another item in a modal](/examples/add-another-item-in-a-modal)
- [Ask a long answer question with a maximum word count](/examples/ask-a-long-answer-question-with-a-maximum-word-count)
- [Ask a user for a birthday](/examples/ask-a-user-for-a-birthday)
- [Ask a user for an address](/examples/ask-a-user-for-an-address)
- [Ask a user for an Indian registration number](/examples/ask-a-user-for-an-indian-registration-number)
- [Ask a user for direct deposit information](/examples/ask-a-user-for-direct-deposit-information)
- [Ask a user for dollar amounts](/examples/ask-a-user-for-dollar-amounts)
- [Confirm a change](/examples/confirm-a-change)
- [Disabled button with a required field](/examples/disabled-button-with-a-required-field)
- [Dynamically add an item to a dropdown list](/examples/dynamically-add-an-item-to-a-dropdown-list)
- [Dynamically change items in a dropdown list](/examples/dynamically-change-items-in-a-dropdown-list)
- [Filter a list using a push drawer](/examples/filter-a-list-using-a-push-drawer)
- [Filter data in a table](/examples/filter-data-in-a-table)
- [Include a link in the helper text of an option](/examples/include-a-link-in-the-helper-text-of-an-option)
- [Include descriptions for items in a checkbox list](/examples/include-descriptions-for-items-in-a-checkbox-list)
- [Limit the width of helper text](/examples/limit-the-width-of-helper-text)
- [Question page](/examples/question-page): A question page presents one focused step in a multi-step form. Several variants adapt the shape: section titles, progress indicators, supporting context, expandable help, and grouped fields.
- [Reset date picker field](/examples/reset-date-picker-field)
- [Reveal input based on a selection](/examples/reveal-input-based-on-a-selection)
- [Review and action](/examples/review-and-action)
- [Search](/examples/search)
- [Select one or more from a list of options](/examples/select-one-or-more-from-a-list-of-options)
- [Set a max width on a long radio item](/examples/set-a-max-width-on-a-long-radio-item)
- [Slotted error text in a form item](/examples/slotted-error-text-in-a-form-item)
- [Slotted helper text in a form item](/examples/slotted-helper-text-in-a-form-item)
- [Type to create a new filter](/examples/type-to-create-a-new-filter)

---

## Related components

- [Checkbox](/components/checkbox): Let the user select one or more options.
- [Checkbox list](/components/checkbox-list): A multiple selection input.
- [Date picker](/components/date-picker): Lets users select a date through a calendar without the need to manually type it in a field.
- [Dropdown](/components/dropdown): Present a list of options to the user to select from.
- [File uploader](/components/file-upload-input): Help users select and upload a file.
- [Input](/components/input): A single-line field where users can input and edit text.
- [Radio](/components/radio-group): Allow users to select one option from a set.
- [Text area](/components/text-area): A multi-line field where users can input and edit text.
