# Spinner

Loading indicator for async operations.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/spinner

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `invert` | boolean | — | No | When true, inverts colors for use on dark backgrounds. |
| `progress` | number | — | No | Progress value (0-100). When set to 0 or greater, shows a progress spinner instead of infinite. |
| `size` | GoabSpinnerSize | — | Yes | Sets the size of the spinner. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabSpinnerType | — | Yes | Sets the spinner animation type. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `invert` | boolean | — | No | When true, inverts colors for use on dark backgrounds. |
| `progress` | number | — | No | Progress value (0-100). When >= 0, shows a progress spinner instead of infinite. |
| `size` | GoabSpinnerSize | — | No | Sets the size of the spinner. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabSpinnerType | — | No | Sets the spinner type. |

---

## Web Components

Tag: `goa-spinner`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `invert` | boolean | `false` | No | When true, inverts colors for use on dark backgrounds. |
| `progress` | number | `-1` | No | Progress value (0-100). When >= 0, shows a progress spinner instead of infinite. |
| `size` | "small" | "medium" | "large" | "xlarge" | — | Yes | Sets the size of the spinner. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |

---

## Related components

- [Circular progress indicator](/components/circular-progress): Provide feedback of progress to users while loading.
- [Linear progress indicator](/components/linear-progress): Provide visual feedback to users while loading.
