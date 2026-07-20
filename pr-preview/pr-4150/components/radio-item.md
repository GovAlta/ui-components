# Radio Item

Individual radio option within a group.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/radio-item

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | — | No | Defines how this option will be announced by screen readers. |
| `compact` | boolean | — | No | Reduces spacing for dense layouts. |
| `description` | string | React.ReactNode | — | No | Additional description text displayed below the label. |
| `disabled` | boolean | — | No | Disables this radio option. Also disabled if the parent RadioGroup is disabled. |
| `error` | boolean | — | No | Shows an error state on this radio option. |
| `label` | string | — | No | The display label for this radio option. Falls back to value if not provided. |
| `maxWidth` | string | — | No | Sets the maximum width of this radio item. |
| `mb` | Spacing | — | No |  |
| `ml` | Spacing | — | No |  |
| `mr` | Spacing | — | No |  |
| `mt` | Spacing | — | No |  |
| `name` | string | — | No | The name of the radio group. Inherited from the parent RadioGroup if not set. |
| `revealAriaLabel` | string | — | No | Text announced by screen readers when the reveal content is displayed. |
| `value` | string | — | No | The value of this radio option. Will be emitted when selected. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `description` | No | Additional description text displayed below the label. |
| `reveal` | No | Content revealed below the radio option when it is selected. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | — | No | Defines how this option will be announced by screen readers. |
| `compact` | boolean | — | No | Enables compact layout for the radio item, reducing spacing for dense layouts. |
| `description` | string | TemplateRef<any> | — | No | Additional description text displayed below the label. |
| `disabled` | boolean | — | No | Disables this radio option. Also disabled if the parent RadioGroup is disabled. |
| `error` | boolean | — | No | Shows an error state on this radio option. |
| `label` | string | — | No | The display label for this radio option. Falls back to value if not provided. |
| `maxWidth` | string | — | No | Sets the maximum width of this radio item. |
| `mb` | Spacing | — | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | — | No | Sets the left margin spacing token. |
| `mr` | Spacing | — | No | Sets the right margin spacing token. |
| `mt` | Spacing | — | No | Sets the top margin spacing token. |
| `name` | string | — | No | The name of the radio group. Inherited from the parent RadioGroup if not set. |
| `revealAriaLabel` | string | — | No | Text announced by screen readers when the reveal slot content is displayed. |
| `testId` | string | — | No | Sets the data-testid attribute for automated testing. |
| `value` | string | — | No | The value of this radio option. Will be emitted when selected. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `description` | No | Additional description text displayed below the label. |
| `reveal` | No | Content revealed below the radio option when it is selected. |

---

## Web Components

Tag: `goa-radio-item`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialabel` | string | — | No | Defines how this option will be announced by screen readers. |
| `description` | string | — | No | Additional description text displayed below the label. |
| `disabled` | boolean | `false` | No | Disables this radio option. Also disabled if the parent RadioGroup is disabled. |
| `error` | boolean | `false` | No | Shows an error state on this radio option. |
| `label` | string | — | No | The display label for this radio option. Falls back to value if not provided. |
| `maxwidth` | string | `none` | No | Sets the maximum width of this radio item. |
| `mb` | Spacing | — | No | Bottom margin. |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |
| `name` | string | — | No | The name of the radio group. Inherited from the parent RadioGroup if not set. |
| `revealarialabel` | string | — | No | Text announced by screen readers when the reveal slot content is displayed. |
| `value` | string | — | Yes | The value of this radio option. Will be emitted when selected. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_radioItemChange` | CustomEvent<{ value: string; label: string }> |  |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `description` | No | Additional description text displayed below the label. |
| `reveal` | No | Content revealed below the radio option when it is selected. |

---

## Usage guidance

### Content

- 💡 **Tip:** Use the description prop to add context on radio options where the label alone isn't enough to explain the choice.

### Other

- 💡 **Tip:** Use the reveal slot to show additional content when a radio option is selected, like a follow-up question or input field.
- 💡 **Tip:** Always use RadioGroup as the parent for sets of RadioItem children. Don't try to build radio button sets manually.

---

## Accessibility guidance

### Screen Readers

- ⚠️ **Warning:** When using the reveal slot, set revealAriaLabel so screen readers announce the newly visible content.

---

## Examples

- [Include descriptions for items in a checkbox list](/examples/include-descriptions-for-items-in-a-checkbox-list)
- [Question page](/examples/question-page): A question page presents one focused step in a multi-step form. Several variants adapt the shape: section titles, progress indicators, supporting context, expandable help, and grouped fields.
- [Reveal input based on a selection](/examples/reveal-input-based-on-a-selection)
- [Set a max width on a long radio item](/examples/set-a-max-width-on-a-long-radio-item)

---

## Related components

- [Radio](/components/radio-group): Allow users to select one option from a set.
