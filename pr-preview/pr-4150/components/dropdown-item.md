# Dropdown Item

An individual option within a dropdown.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/dropdown-item

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `filter` | string | — | No | Rich item content. On selection, `label` is shown and `filter` defaults to the content's text. |
| `label` | string | — | No | Display label for the dropdown item. |
| `mountType` | GoabDropdownItemMountType | — | No | Controls how the item is registered with the parent dropdown. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `value` | string | — | Yes | The value submitted when this item is selected. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `filter` | string | — | No | Rich item content. On selection, `label` is shown and `filter` defaults to the content's text. |
| `label` | string | — | No | Display label for the dropdown item. |
| `mountType` | GoabDropdownItemMountType | — | No | Controls how the item is registered with the parent dropdown. |
| `name` | string | — | No | Sets the name attribute of the dropdown item. |
| `value` | string | — | No | The value submitted when this item is selected. |

---

## Web Components

Tag: `goa-dropdown-item`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `filter` | string | — | No | Additional text used to match this item in typeahead search, alongside the label. Defaults to the slotted content's text. |
| `label` | string | — | No | Display label for the dropdown item. |
| `mount` | "append" | "prepend" | "reset" | `reset` | No | Controls how the item is registered with the parent dropdown. |
| `value` | string | — | No | The value submitted when this item is selected. |

---

## Usage guidance

### Interaction

- 💡 **Tip:** A filterable dropdown searches an item's label and the text of its content, but not text rendered inside a nested component such as a Badge. Use the filter property to add those terms to the search.

### Types

- ⚠️ **Warning:** The native dropdown renders a native select element, which cannot contain HTML. Items with rich content fall back to their label, so set a label on every item that you also give content to.

---

## Accessibility guidance

### Accessibility

- ⚠️ **Warning:** Don't put buttons, links, inputs, or other interactive elements in an item's content. Each item is a listbox option, so nested controls are not in the tab order and cannot be reached by keyboard, and clicking one selects the item instead of activating the control. Use text, icons, and badges instead.

---

## Examples

- [Dynamically add an item to a dropdown list](/examples/dynamically-add-an-item-to-a-dropdown-list)
- [Dynamically change items in a dropdown list](/examples/dynamically-change-items-in-a-dropdown-list)
- [Question page](/examples/question-page): A question page presents one focused step in a multi-step form. Several variants adapt the shape: section titles, progress indicators, supporting context, expandable help, and grouped fields.
- [Show number of results per page](/examples/show-number-of-results-per-page)

---

## Related components

- [Dropdown](/components/dropdown): Present a list of options to the user to select from.
