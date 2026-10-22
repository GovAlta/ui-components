# Linear progress indicator

Provide visual feedback to users while loading.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/linear-progress

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Accessible label for the progress bar. |
| `ariaLabelledBy` | string | (none) | No | ID of the element that labels this progress bar. |
| `percentVisibility` | "visible" \| "hidden" \| undefined | `visible` | No | Controls visibility of the percentage text. |
| `progress` | number \| null | (none) | No | Progress value (0-100). When undefined, shows an indeterminate loading animation. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Accessible label for the progress bar. |
| `ariaLabelledBy` | string | (none) | No | ID of the element that labels this progress bar. |
| `percentVisibility` | "visible" \| "hidden" \| undefined | (none) | No | Controls visibility of the percentage text. |
| `progress` | number \| null \| undefined | (none) | No | Progress value (0-100). When undefined, shows an indeterminate loading animation. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |

---

## Web Components

Tag: `goa-linear-progress`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `aria-label` | string | (none) | No | Accessible label for the progress bar. |
| `aria-labelledby` | string | (none) | No | ID of the element that labels this progress bar. |
| `percent-visibility` | "visible" \| "hidden" | `visible` | No | Controls visibility of the percentage text. |
| `progress` | number | (none) | No | Progress value (0-100). When undefined, shows an indeterminate loading animation. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |

---

## Usage guidance

### States

- **[Don't]** Don't show a percentage for indeterminate progress. Showing '0%' when there's no known progress is confusing.

---

## Accessibility guidance

### Screen Readers

- **[Do]** Provide accessible labels for LinearProgress

---

## Related components

- [Circular progress indicator](/components/circular-progress): Provide feedback of progress to users while loading.
