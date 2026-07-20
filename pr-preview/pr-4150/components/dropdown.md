# Dropdown

Present a list of options to the user to select from.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/dropdown

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | — | No | Defines how the selected value will be translated for the screen reader. If not specified it will fall back to the name. |
| `ariaLabelledBy` | string | — | No | The aria-labelledby attribute identifies the element that labels the dropdown. Normally it is the id of the label. |
| `autoComplete` | string | — | No | Specifies the autocomplete attribute for the dropdown input. Native only. |
| `disabled` | boolean | — | No | Disables the dropdown control. |
| `error` | boolean | — | No | Shows an error state on the dropdown. |
| `filterable` | boolean | — | No | When true, allows filtering options by typing into the input field. |
| `id` | string | — | No | The id attribute for the dropdown element. |
| `leadingIcon` | GoabIconType | — | No | Icon shown to the left of the dropdown input. |
| `maxHeight` | string | `276px` | No | Maximum height of the dropdown menu. Non-native only. |
| `maxWidth` | string | — | No | Sets the maximum width of the dropdown. Use a CSS unit (px, %, ch, rem, em). |
| `mb` | Spacing | — | No |  |
| `ml` | Spacing | — | No |  |
| `mr` | Spacing | — | No |  |
| `mt` | Spacing | — | No |  |
| `name` | string | — | No | Identifier for the dropdown. Should be unique. |
| `native` | boolean | — | No | When true, renders the native select HTML element. |
| `placeholder` | string | — | No | The text displayed in the dropdown before a selection is made. Non-native only. |
| `size` | GoabDropdownSize | — | No | Sets the size of the dropdown. Compact reduces height for dense layouts. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `value` | string[] | string | — | No | The currently selected value(s) of the dropdown. |
| `width` | string | — | No | Overrides the autosized menu width. Non-native only. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (detail: GoabDropdownOnBlurDetail) => void | Callback fired when the dropdown loses focus. |
| `onChange` | (detail: GoabDropdownOnChangeDetail) => void | Callback fired when the selected value changes. |
| `onFocus` | (detail: GoabDropdownOnFocusDetail) => void | Callback fired when the dropdown receives focus. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | — | No | Defines how the selected value will be translated for the screen reader. If not specified it will fall back to the name. |
| `ariaLabelledBy` | string | — | No | The aria-labelledby attribute identifies the element(or elements) that labels the dropdown it is applied to. Normally it is the id of the label. |
| `autoComplete` | string | — | No | Specifies the autocomplete attribute for the dropdown input. Native only. |
| `disabled` | boolean | — | No | Sets the disabled state for the control. |
| `error` | boolean | — | No | Sets the error state for the control. |
| `filterable` | boolean | — | No | When true the dropdown will have the ability to filter options by typing into the input field. |
| `id` | string | — | No | Sets the id attribute of the underlying web component. |
| `leadingIcon` | GoabIconType | — | No | Icon shown to the left of the dropdown input. |
| `maxHeight` | string | — | No | Maximum height of the dropdown menu. Non-native only. |
| `maxWidth` | string | — | No | Sets the maximum width of the dropdown. Use a CSS unit (px, %, ch, rem, em). |
| `mb` | Spacing | — | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | — | No | Sets the left margin spacing token. |
| `mr` | Spacing | — | No | Sets the right margin spacing token. |
| `mt` | Spacing | — | No | Sets the top margin spacing token. |
| `name` | string | — | No | Identifier for the dropdown. Should be unique. |
| `native` | boolean | — | No | When true will render the native select HTML element. |
| `placeholder` | string | — | No | The text displayed for the dropdown before a selection is made. Non-native only. |
| `size` | GoabDropdownSize | `default` | No | Sets the size of the dropdown. Compact reduces height for dense layouts. |
| `testId` | string | — | No | Sets the data-testid attribute for automated testing. |
| `value` | string[] | string | — | No | Sets the control value used by Angular forms and one-way binding. |
| `width` | string | — | No | Overrides the autosized menu width. Non-native only. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (event: GoabDropdownOnBlurDetail) => void | Emits when the dropdown loses focus. |
| `onChange` | (event: GoabDropdownOnChangeDetail) => void | Emits when the user selects a value from the dropdown. Emits a GoabDropdownOnChangeDetail object with the new value. |
| `onFocus` | (event: GoabDropdownOnFocusDetail) => void | Emits when the dropdown receives focus. |

---

## Web Components

Tag: `goa-dropdown`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialabel` | string | — | No | Defines how the selected value will be translated for the screen reader. If not specified it will fall back to the name. |
| `arialabelledby` | string | — | No | The aria-labelledby attribute identifies the element(or elements) that labels the dropdown it is applied to. Normally it is the id of the label. |
| `autocomplete` | string | — | No | Specifies the autocomplete attribute for the dropdown input. Native only. |
| `disabled` | boolean | `false` | No | Disable this control. |
| `error` | boolean | `false` | No | Show an error state. |
| `filterable` | boolean | `false` | No | When true the dropdown will have the ability to filter options by typing into the input field. |
| `leadingicon` | GoabIconType | — | No | Icon shown to the left of the dropdown input. |
| `maxheight` | string | `276px` | No | Maximum height of the dropdown menu. Non-native only. |
| `maxwidth` | string | — | No | Sets the maximum width of the dropdown. Use a CSS unit (px, %, ch, rem, em). |
| `mb` | Spacing | — | No | Bottom margin. |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |
| `name` | string | — | Yes | Identifier for the dropdown. Should be unique. |
| `native` | boolean | `false` | No | When true will render the native select HTML element. |
| `placeholder` | string | — | No | The text displayed for the dropdown before a selection is made. Non-native only. |
| `size` | "default" | "compact" | `default` | No | Sets the size of the dropdown. Compact reduces height for dense layouts. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |
| `value` | string | — | No | Stores the value of the item selected from the dropdown. |
| `version` | "1" | "2" | `1` | No | Design system version for styling. |
| `width` | string | — | No | Overrides the autosized menu width. Non-native only. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_blur` | CustomEvent<{ name: string }> |  |
| `_change` | CustomEvent<{ name?: string; value?: string; event: Event }> |  |
| `_focus` | CustomEvent<{ name: string }> |  |

---

## Usage guidance

### States

- ❌ **Don't:** Don't disable buttons or inputs without explaining why. Disabled controls can be confusing and users may not understand why they can't interact with an element.

### Sizing

- ✅ **Do:** Define dropdown widths based on the widest dropdown in the form.
- ✅ **Do:** Use the default width for dropdowns. The dropdown automatically sets its width based on the length of the options.

### Positioning

- ❌ **Don't:** Don't allow the dropdown menu to hide below the viewport.

### Content

- ❌ **Don't:** Don't truncate labels. Longer labels should wrap to the next line.
- ❌ **Don't:** Don't use placeholder text as a label

### Interaction

- 💡 **Tip:** A filterable dropdown searches an item's label and the text of its content, but not text rendered inside a nested component such as a Badge. Use the filter property to add those terms to the search.

### Types

- ⚠️ **Warning:** The native dropdown renders a native select element, which cannot contain HTML. Items with rich content fall back to their label, so set a label on every item that you also give content to.

### Other

- ✅ **Do:** Use a form item wrapper on all inputs to add a label, helper text, error message, and more.

---

## Accessibility guidance

### Screen Readers

- ⚠️ **Warning:** When a Dropdown is not wrapped in a FormItem, set ariaLabel to provide an accessible name. Without it, screen readers won't be able to identify the dropdown.

### Accessibility

- ⚠️ **Warning:** Don't put buttons, links, inputs, or other interactive elements in an item's content. Each item is a listbox option, so nested controls are not in the tab order and cannot be reached by keyboard, and clicking one selects the item instead of activating the control. Use text, icons, and badges instead.

---

## Examples

- [Add a record using a drawer](/examples/add-a-record-using-a-drawer)
- [Add and edit lots of filters](/examples/add-and-edit-lots-of-filters)
- [Add another item in a modal](/examples/add-another-item-in-a-modal)
- [Ask a user for an address](/examples/ask-a-user-for-an-address)
- [Dynamically add an item to a dropdown list](/examples/dynamically-add-an-item-to-a-dropdown-list)
- [Dynamically change items in a dropdown list](/examples/dynamically-change-items-in-a-dropdown-list)
- [Filter a list using a push drawer](/examples/filter-a-list-using-a-push-drawer)
- [Question page](/examples/question-page): A question page presents one focused step in a multi-step form. Several variants adapt the shape: section titles, progress indicators, supporting context, expandable help, and grouped fields.
- [Review and action](/examples/review-and-action)
- [Show number of results per page](/examples/show-number-of-results-per-page)

---

## Related components

- [Form item](/components/form-item): Wraps an input control with a text label, requirement label, helper text, and error text.
- [Input](/components/input): A single-line field where users can input and edit text.
