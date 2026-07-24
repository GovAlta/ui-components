# Dropdown multiselect

Present a list of options to the user to select multiple values from.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/dropdown-multiselect

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Provides an accessible label when no visible label is associated. |
| `ariaLabelledBy` | string | (none) | No | References an external element that labels this component. |
| `disabled` | boolean | `false` | No | Disables the component. |
| `error` | boolean | `false` | No | Shows an error state. |
| `filterable` | boolean | (none) | No | Enables filtering of options by typing in the trigger. |
| `labelFormat` | GoabDropdownMultiselectLabelFormatOptions | `list` | No | The display label format of the closed dropdown. When 'count' the display label shows only "n items" in the label, when 'list' it shows a comma separated list of selected item labels. |
| `leadingIcon` | GoabIconType | (none) | No | Icon shown to the left of the dropdown input. |
| `maxHeight` | string | `276px` | No | Sets the maximum height of the dropdown content area. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `name` | string | (none) | Yes | Identifier for the group. Used in change events. |
| `placeholder` | string | (none) | No | Text shown when nothing is selected. |
| `showSelectAll` | boolean | `false` | No | Shows a "Select All" checkbox at the top of the options list. |
| `size` | GoabDropdownMultiselectSize | `default` | No | Sets the size variant. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `value` | string[] | (none) | No | Array of currently selected checkbox value. |
| `width` | string | (none) | No | Sets a fixed width for the component and popover panel. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | (detail: GoabDropdownMultiselectOnChangeDetail) => void | Callback fired when the selected value change. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Provides an accessible label when no visible label is associated. |
| `ariaLabelledBy` | string | (none) | No | References an external element that labels this component. |
| `disabled` | boolean | (none) | No | Sets the disabled state for the control. |
| `error` | boolean | (none) | No | Sets the error state for the control. |
| `filterable` | boolean | (none) | No | Enables filtering of options by typing in the trigger. |
| `id` | string | (none) | No | Sets the id attribute of the underlying web component. |
| `labelFormat` | GoabDropdownMultiselectLabelFormatOptions | `list` | No | The display label format of the closed dropdown. When 'count' the display label shows only "n items" in the label, when 'list' it shows a comma separated list of selected item labels. |
| `leadingIcon` | GoabIconType | (none) | No | Icon shown to the left of the dropdown input. |
| `maxHeight` | string | `276px` | No | Sets the maximum height of the dropdown content area. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `name` | string | (none) | Yes | Identifier for the group. Used in change events. |
| `placeholder` | string | (none) | No | Text shown when nothing is selected. |
| `showSelectAll` | boolean | `false` | No | Shows a "Select All" checkbox at the top of the options list. |
| `size` | GoabDropdownMultiselectSize | `default` | No | Sets the size variant. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `value` | string[] | (none) | No | Array of currently selected checkbox values. |
| `width` | string | (none) | No | Sets a fixed width for the component and popover panel. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | (event: GoabDropdownMultiselectOnChangeDetail) => void | Emits when the selected value change. |

---

## Web Components

Tag: `goa-dropdown-multiselect`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `aria-label` | string | (none) | No | Provides an accessible label when no visible label is associated. |
| `aria-labelledby` | string | (none) | No | References an external element that labels this component. |
| `disabled` | boolean | `false` | No | Disables the component. @default false |
| `error` | boolean | `false` | No | Shows an error state. @default false |
| `filterable` | boolean | `false` | No | Enables filtering of options by typing in the trigger. |
| `label-format` | "count" \| "list" | `list` | No | The display label format of the closed dropdown. When 'count' the display label shows only "n items" in the label, when 'list' it shows a comma separated list of selected item labels. @default "list" |
| `leading-icon` | GoabIconType | (none) | No | Icon shown to the left of the dropdown input. When "filterable" is true this can only be "search". |
| `max-height` | string | `276px` | No | Sets the maximum height of the dropdown content area. @default "276px" |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `name` | string | (none) | Yes | Identifier for the group. Used in change events. |
| `placeholder` | string | (none) | No | Text shown when nothing is selected. |
| `show-select-all` | boolean | `false` | No | Shows a "Select All" checkbox at the top of the options list. @default false |
| `size` | "default" \| "compact" | `default` | No | Sets the size variant. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `value` | string[] | `[]` | No | Array of currently selected checkbox values. |
| `width` | string | (none) | No | Sets a fixed width for the component and popover panel. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_change` | CustomEvent<{ name: string; value: string[]; labels: string[] }> | (none) |

---

## Related components

- [Checkbox list](/components/checkbox-list): A multiple selection input.
- [Form item](/components/form-item): Wraps an input control with a text label, requirement label, helper text, and error text.
