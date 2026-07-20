# Form Step

Individual step in a multi-step form.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/form-step

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `status` | GoabFormStepStatus | — | No | The completion status of the step. Affects visual styling and icons. |
| `text` | string | — | Yes | The step label text displayed to users. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `status` | GoabFormStepStatus | — | No | The completion status of the step. Affects visual styling and icons. |
| `text` | string | — | No | The step label text displayed to users. |

---

## Web Components

Tag: `goa-form-step`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `last` | boolean | `false` | No | Whether this is the last step in the form stepper. Affects styling when complete. |
| `status` | "complete" | "incomplete" | "not-started" | — | No | The completion status of the step. Affects visual styling and icons. |
| `text` | string | — | Yes | The step label text displayed to users. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_click` | CustomEvent<{ step: unknown }> |  |
