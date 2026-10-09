# Button

Carry out an important action or navigate to another page.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/button

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | (none) | No | Action identifier passed in click events for event delegation patterns. |
| `actionArg` | string | (none) | No | Single argument value passed with the action in click events. |
| `actionArgs` | Record<string, unknown> | (none) | No | Multiple argument values passed with the action in click events. |
| `ariaLabel` | string | (none) | No | Sets the accessible name. Include the visible button text in the value. |
| `disabled` | boolean | (none) | No | When true, prevents user interaction and applies disabled styling. |
| `leadingIcon` | GoabIconType | (none) | No | Icon displayed before the button text. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `size` | "compact" \| "normal" | `normal` | No | Controls the size of the button. Use "compact" for inline actions or space-constrained layouts. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `trailingIcon` | GoabIconType | (none) | No | Icon displayed after the button text. |
| `type` | "primary" \| "secondary" \| "tertiary" \| "start" \| "text" | `primary` | No | Sets the visual style of the button. Use "primary" for main actions, "secondary" for alternative actions, "tertiary" for low-emphasis actions, "start" for prominent call-to-action buttons, and "text" for text-only buttons. |
| `variant` | "normal" \| "destructive" \| "inverse" \| "dark" | `normal` | No | Sets the color variant for semantic meaning. Use "destructive" for delete or irreversible actions, "inverse" for light-colored text on dark backgrounds, and "dark" for dark text color on text buttons only. Note: "dark" has no effect on non-text button types. |
| `width` | string | (none) | No | Sets a custom width for the button (e.g., "200px", "100%" or "fit-content"). |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Callback fired when the button is clicked. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | (none) | No | Action identifier passed in click events for event delegation patterns. |
| `actionArg` | string | (none) | No | Single argument value passed with the action in click events. |
| `actionArgs` | Record<string, unknown> | (none) | No | Multiple argument values passed with the action in click events. |
| `ariaLabel` | string | (none) | No | Sets the accessible name. Include the visible button text in the value. |
| `disabled` | boolean | (none) | No | Sets the disabled state. When true, prevents user interaction and applies disabled styling. |
| `leadingIcon` | GoabIconType | (none) | No | Sets the icon displayed before the button text. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `size` | "compact" \| "normal" | `normal` | No | Sets the size of the button. Use "compact" for inline actions or space-constrained layouts. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `trailingIcon` | GoabIconType | (none) | No | Icon displayed after the button text. |
| `type` | "primary" \| "secondary" \| "tertiary" \| "start" \| "text" | `primary` | No | Sets the visual style of the button. Use "primary" for main actions, "secondary" for alternative actions, "tertiary" for low-emphasis actions, "start" for prominent call-to-action buttons, and "text" for text-only buttons. |
| `variant` | "normal" \| "destructive" \| "inverse" \| "dark" | `normal` | No | Sets the color variant for semantic meaning. Use "destructive" for delete or irreversible actions, "inverse" for light-colored text on dark backgrounds, and "dark" for dark text color on text buttons only. Note: "dark" has no effect on non-text button types. |
| `width` | string | (none) | No | Sets a custom width for the button (e.g., "200px", "100%" or "fit-content"). |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Emits when the button is clicked. |

---

## Web Components

Tag: `goa-button`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | (none) | No | Action identifier passed in click events for event delegation patterns. |
| `action-arg` | string | (none) | No | Single argument value passed with the action in click events. |
| `action-args` | Record<string, unknown> | `{}` | No | Multiple argument values passed with the action in click events. |
| `arialabel` | string | (none) | No | Sets the accessible name. Include the visible button text in the value. |
| `disabled` | boolean | `false` | No | When true, prevents user interaction and applies disabled styling. |
| `leadingicon` | GoabIconType | (none) | No | Icon displayed before the button text. |
| `mb` | Spacing | (none) | No | Sets the bottom margin using design system spacing tokens. |
| `ml` | Spacing | (none) | No | Sets the left margin using design system spacing tokens. |
| `mr` | Spacing | (none) | No | Sets the right margin using design system spacing tokens. |
| `mt` | Spacing | (none) | No | Sets the top margin using design system spacing tokens. |
| `size` | "normal" \| "compact" | `normal` | No | Controls the size of the button. Use "compact" for inline actions or space-constrained layouts. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `trailingicon` | GoabIconType | (none) | No | Icon displayed after the button text. |
| `type` | "primary" \| "secondary" \| "tertiary" \| "start" \| "text" | `primary` | No | Sets the visual style of the button. Use "primary" for main actions, "secondary" for alternative actions, "tertiary" for low-emphasis actions, "start" for prominent call-to-action buttons, and "text" for text-only buttons. |
| `variant` | "normal" \| "destructive" \| "inverse" \| "dark" | `normal` | No | Sets the color variant for semantic meaning. Use "destructive" for delete or irreversible actions, "inverse" for light-colored text on dark backgrounds, and "dark" for dark text color on text buttons only. Note: "dark" has no effect on non-text button types. |
| `width` | string | (none) | No | Sets a custom width for the button (e.g., "200px", "100%" or "fit-content"). |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_click` | CustomEvent | Emits when the button is clicked. |

---

## Usage guidance

### States

- **[Don't]** Avoid using disabled buttons. They have poor contrast and can confuse users.
- **[Do]** Keep buttons enabled and use error handling to provide clear feedback when the user submits.
- **[Don't]** Don't disable buttons or inputs without explaining why. Disabled controls can be confusing and users may not understand why they can't interact with an element.

### Sizing

- **[Do]** Use compact buttons in dense spaces like tables or container title bars.
- **[Don't]** Don't use different button sizes in the same area to emphasize hierarchy.
- **[Don't]** Don't stack standard and full width buttons.
- **[Do]** Use full width buttons on mobile.

### Content

- **[Do]** Use one word to explain the function whenever possible, such as "Save", "Submit", or "Search".
- **[Do]** Use descriptive language in both modal content and button text to inform users of the resulting destructive action.
- **[Don't]** Don't use all uppercase or all lowercase to label buttons.
- **[Do]** Button labels should clearly describe what happens when clicked. Use specific verbs like "Submit application" or "Save draft" instead of generic labels like "OK" or "Click here".

### Types

- **[Do]** Use the destructive button variant for actions that cannot be easily undone, like permanently deleting data or removing a user from a system.
- **[Don't]** Don't use a destructive button to trigger a confirmation. Reserve destructive styling for the final action inside the modal.
- **[Don't]** Avoid using more than one primary button per page. Multiple primary buttons create visual competition and make it unclear which action is most important.
- **[Do]** Use a primary button for main actions and a secondary button for less important actions.
- **[Note]** Button types
- **[Do]** Use a button for actions that trigger functionality (submit, save, cancel). Use a link for navigation to different pages or external websites.
- **[Don't]** Don't use Button for simple navigation (use Link), toggling state (use Toggle or Checkbox), or minor utility functions (use Icon Button).
- **[Do]** Use a button when you need users to take a specific action, such as submitting a form, starting a process, or confirming a decision.

### Icons

- **[Do]** Use icons with a clear visual association to the action.
- **[Don't]** Don't use icons that don't have a clear visual association to the intended outcome.
- **[Do]** Use a text label with an icon, especially for public-facing applications and novice users.

### Positioning

- **[Don't]** Don't group more than 3 actions together. Consider using an overflow menu for additional options.
- **[Do]** Use a button group when putting multiple buttons together.

### Other

- **[Tip]** Use Link for navigation to other pages. Use Button for actions that change state or trigger functionality.

---

## Accessibility guidance

### Screen Readers

- **[Don't]** Don't read the icon class or description for icon buttons with labels. Screen readers should read the button label only.
- **[Do]** Icon-only buttons must include a descriptive label for screen readers.

### Focus

- **[Don't]** Don't focus on just the icon within a button. Focus the button as a whole.

---

## Examples

- [Button with Icon](/examples/button-with-icon)
- [Disabled button with a required field](/examples/disabled-button-with-a-required-field)
- [Search](/examples/search)

---

## Related components

- [Button group](/components/button-group): Display multiple related actions stacked or in a horizontal row to help with arrangement and spacing.
- [Icon button](/components/icon-button): A compact button with an icon and no text.
