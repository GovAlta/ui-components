# Form

Container for form inputs and validation.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/form

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | string | — | No | A name identifier for the form. Useful for debugging complex forms with multiple nested forms. |
| `status` | GoabPublicFormStatus | `complete` | No | The initialization status of the form. Set to "initializing" while loading external state, then "complete" when ready. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onComplete` | (event: GoabFormState) => void | Callback fired when the form is completed. |
| `onInit` | (event: Event) => void | Callback fired when the form is initialized. |
| `onStateChange` | (event: GoabFormState) => void | Callback fired when the form state changes. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | string | — | No | A name identifier for the form. Useful for debugging complex forms with multiple nested forms. |
| `status` | GoabPublicFormStatus | `complete` | No | The initialization status of the form. Set to "initializing" while loading external state, then "complete" when ready. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onComplete` | (event: GoabFormState) => void | Emits when the form is complete. Emits the form state. |
| `onInit` | (event: Event) => void | Emits when the form is initialized. |
| `onStateChange` | (event: GoabFormState) => void | Emits when the form state changes. Emits the updated form state. |

---

## Web Components

Tag: `goa-form`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | string | `[name] not set` | No | A name identifier for the form. Useful for debugging complex forms with multiple nested forms. |
| `status` | "initializing" | "complete" | `complete` | No | The initialization status of the form. Set to "initializing" while loading external state, then "complete" when ready. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_init` | CustomEvent<{ el: unknown }> |  |

---

## Related components

- [Form item](/components/form-item): Wraps an input control with a text label, requirement label, helper text, and error text.
