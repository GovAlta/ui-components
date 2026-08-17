# Modal

An overlay that appears in front of all other content, and requires a user to take an action before continuing.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/modal

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `calloutVariant` | GoabModalCalloutVariant | (none) | No | Sets the context and colour of the callout modal. Required when used as a callout type. |
| `maxWidth` | string | `60ch` | No | Set the max allowed width of the modal. |
| `open` | boolean | (none) | No | Controls if the modal is visible or not. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `transition` | GoabModalTransition | (none) | No | Sets the animation transition when opening/closing. 'fast' or 'slow' for animated, 'none' for instant. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClose` | () => void | Callback fired when the modal is closed. When provided, enables the close button and backdrop click-to-close behavior. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the modal's actions slot, typically action buttons. |
| `heading` | No | The heading text displayed at the top of the modal. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `calloutVariant` | GoabModalCalloutVariant | (none) | No | Define the context and colour of the callout modal. It is required when type is set to callout. |
| `closable` | boolean | `false` | No | Show close icon and allow clicking the background to close the modal. |
| `heading` | string \| TemplateRef<any> | (none) | No | The heading text displayed at the top of the modal. |
| `maxWidth` | string | (none) | No | Set the max allowed width of the modal. |
| `open` | boolean | (none) | No | Controls if modal is visible or not. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `transition` | GoabModalTransition | (none) | No | Sets the animation transition when opening/closing. 'fast' or 'slow' for animated, 'none' for instant. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClose` | () => void | Emits when the modal is closed. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the modal's actions slot, typically action buttons. |
| `heading` | No | The heading text displayed at the top of the modal. |

---

## Web Components

Tag: `goa-modal`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `calloutvariant` | "" | (none) | No | Define the context and colour of the callout modal. It is required when type is set to callout. |
| `closable` | boolean | `false` | No | Show close icon and allow clicking the background to close the modal. |
| `heading` | string | (none) | No | The heading text displayed at the top of the modal. |
| `maxwidth` | string | `60ch` | No | Set the max allowed width of the modal. |
| `open` | boolean | `false` | No | Controls if modal is visible or not. |
| `testid` | string | `modal` | No | Sets a data-testid attribute for automated testing. |
| `transition` | "fast" \| "slow" \| "none" | `none` | No | Sets the animation transition when opening/closing. 'fast' or 'slow' for animated, 'none' for instant. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_close` | CustomEvent | (none) |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the modal's actions slot, typically action buttons. |
| `heading` | No | The heading text displayed at the top of the modal. |

---

## Usage guidance

### Content

- **[Do]** Use descriptive language in both modal content and button text to inform users of the resulting destructive action.
- **[Do]** Use a concise and descriptive modal title that spans less than one line.
- **[Do]** Use descriptive language in content and button text for destructive actions.

### Types

- **[Do]** Use the destructive button variant for actions that cannot be easily undone, like permanently deleting data or removing a user from a system.
- **[Don't]** Don't use a destructive button to trigger a confirmation. Reserve destructive styling for the final action inside the modal.

### Other

- **[Tip]** Use closable=false for critical confirmations where the user must choose an explicit action, not just dismiss the dialog.

### Interaction

- **[Do]** Use a destructive button to indicate the final destructive action.
- **[Don't]** Don't provide both action buttons and a close button on the same modal.

---

## Examples

- [Add another item in a modal](/examples/add-another-item-in-a-modal)
- [Confirm a change](/examples/confirm-a-change)
- [Confirm a destructive action](/examples/confirm-a-destructive-action)
- [Confirm before navigating away](/examples/confirm-before-navigating-away)
- [Require user action before continuing](/examples/require-user-action-before-continuing)
- [Warn a user of a deadline](/examples/warn-a-user-of-a-deadline)

---

## Related components

- [Drawer](/components/drawer): A panel that slides in from the side of the screen to display additional content or actions without navigating away from the current view.
