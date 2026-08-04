# Circular progress indicator

Provide feedback of progress to users while loading.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/circular-progress

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `message` | string | (none) | No | Loading message displayed below the progress indicator. |
| `progress` | number | (none) | No | Sets the progress value (0–100). When omitted, an infinite spinner is shown. |
| `size` | GoabCircularProgressSize | `large` | No | Sets the size of the progress indicator. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | GoabCircularProgressVariant | `inline` | No | Controls the display mode. 'fullscreen' stretches across the full screen; 'inline' is used within content. |
| `visible` | boolean | (none) | No | Controls visibility of the progress indicator, allowing a fade transition to be applied. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `message` | string | (none) | No | Loading message displayed under the progress indicator. |
| `progress` | number | (none) | No | Set the progress value. Setting this value will change the type from infinite to progress. |
| `size` | GoabCircularProgressSize | (none) | No | Size of the progress indicator. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | GoabCircularProgressVariant | (none) | No | Stretch across the full screen or use it inline. |
| `visible` | boolean | (none) | No | Show/hide the page loader. This allows for fade transition to be applied in each transition. |

---

## Web Components

Tag: `goa-circular-progress`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `message` | string | (none) | No | Loading message displayed under the progress indicator |
| `progress` | number | `-1` | No | Set the progress value. Setting this value will change the type from infinite to progress |
| `size` | "small" \| "large" | `large` | No | Size of the progress indicator |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | "fullscreen" \| "inline" | `inline` | No | Stretch across the full screen or use it inline |
| `visible` | boolean | `false` | No | Show/hide the page loader. This allows for fade transition to be applied in each transition. |

---

## Usage guidance

### Types

- **[Don't]** Don't use the fullscreen variant for quick operations. For anything under a second, use inline or Spinner. When part of a page is loading but the rest can show, use Skeleton to load progressively instead of blocking the whole view.
- **[Tip]** Pick the loading indicator that matches the context. Use CircularProgress with the inline variant for a section of the page that's loading. Use the fullscreen variant when the whole page is loading and the user can't do anything else yet. Use Skeleton when part of the page can show while the rest loads, so users see structure right away instead of an empty space.

### Other

- **[Do]** Choose the right loading indicator for your context.

### States

- **[Warning]** CircularProgress is hidden by default. Always set visible={true} to show it.

### Content

- **[Tip]** Provide a message prop to explain what operation is in progress, like "Loading your application" or "Saving changes."
- **[Don't]** Don't place a full sentence in the indicator's label.
- **[Do]** Keep loading messages short and concise.

---

## Related components

- [Linear progress indicator](/components/linear-progress): Provide visual feedback to users while loading.
