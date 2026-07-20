# Checkbox list

A multiple selection input.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/checkbox-list

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `disabled` | boolean | (none) | No | Disables all checkboxes in the list. |
| `error` | boolean | (none) | No | Shows an error state on all checkboxes in the list. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the checkbox list container. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `name` | string | (none) | Yes | The name for the checkbox list group. Used as group identifier in change events. |
| `size` | "default" \| "compact" | `default` | No | Sets the size of the checkbox list. 'compact' reduces spacing between items. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `value` | string[] | (none) | No | Array of currently selected checkbox values. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (detail: GoabCheckboxListOnBlurDetail) => void | Callback fired when focus leaves all checkboxes in the list. |
| `onChange` | (detail: GoabCheckboxListOnChangeDetail) => void | Callback fired when the selected values change. |
| `onFocus` | (detail: GoabCheckboxListOnFocusDetail) => void | Callback fired when focus enters any checkbox in the list. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `disabled` | boolean | (none) | No | Sets the disabled state for the control. |
| `error` | boolean | (none) | No | Sets the error state for the control. |
| `id` | string | (none) | No | Sets the id attribute of the underlying web component. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the checkbox list container. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `name` | string | (none) | No | The name for the checkbox list group. Used as group identifier in change events. |
| `size` | GoabCheckboxSize | `default` | No | Sets the size of the checkbox list. 'compact' reduces spacing between items. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `value` | string[] | (none) | No | Array of currently selected checkbox values. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onBlur` | (event: GoabCheckboxListOnBlurDetail) => void | Emits when focus leaves all checkboxes in the list. |
| `onChange` | (event: GoabCheckboxListOnChangeDetail) => void | Emits when a checkbox selection changes. Emits the change detail including name, value array, and event. |
| `onFocus` | (event: GoabCheckboxListOnFocusDetail) => void | Emits when focus enters any checkbox in the list. |

---

## Web Components

Tag: `goa-checkbox-list`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `disabled` | boolean | `false` | No | Disables all checkboxes in the list. |
| `error` | boolean | `false` | No | Shows an error state on all checkboxes in the list. |
| `maxwidth` | string | `none` | No | Sets the maximum width of the checkbox list container. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `name` | string | (none) | Yes | The name for the checkbox list group. Used as group identifier in change events. |
| `size` | "default" \| "compact" | `default` | No | Sets the size of the checkbox list. 'compact' reduces spacing between items. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `value` | string[] | `[]` | No | Array of currently selected checkbox values. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_blur` | CustomEvent<{ name: string }> | (none) |
| `_change` | CustomEvent<{ name: string; value: string[]; labels: string[] }> | (none) |
| `_focus` | CustomEvent<{ name: string }> | (none) |

---

## Usage guidance

### Content

- **[Tip]** Use the description prop to add context on complex options where the label alone isn't enough.

### Other

- **[Do]** Use a form item wrapper on all inputs to add a label, helper text, error message, and more.

---

## Examples

- [Add and edit lots of filters](/examples/add-and-edit-lots-of-filters)
- [Filter a list using a push drawer](/examples/filter-a-list-using-a-push-drawer)

---

## Related components

- [Checkbox](/components/checkbox): Let the user select one or more options.
- [Form item](/components/form-item): Wraps an input control with a text label, requirement label, helper text, and error text.
