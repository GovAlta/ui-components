# Icon button

A compact button with an icon and no text.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/icon-button

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | (none) | No | Action identifier passed in click events for event delegation patterns. |
| `actionArg` | string | (none) | No | Single argument value passed with the action in click events. |
| `actionArgs` | Record<string, unknown> | (none) | No | Multiple argument values passed with the action in click events. |
| `ariaLabel` | string | (none) | No | Sets the aria-label of the button. |
| `disabled` | boolean | (none) | No | Disables the button. |
| `icon` | GoabIconType | (none) | Yes | Sets the icon. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `size` | GoabIconSize | `medium` | No | Sets the size of button. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `theme` | GoabIconTheme | `outline` | No | Sets the theme of the icon inside the button. "outline" for stroked icons, "filled" for solid icons. |
| `title` | string | (none) | No | Sets the title of the button. |
| `type` | GoabIconButtonType | `default` | No | Sets the visual style of the button. |
| `variant` | GoabIconButtonVariant | `color` | No | Styles the button to show color, light, dark or destructive action. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Callback fired when the icon button is clicked. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | (none) | No | Action identifier passed in click events for event delegation patterns. |
| `actionArg` | string | (none) | No | Single argument value passed with the action in click events. |
| `actionArgs` | Record<string, unknown> | (none) | No | Multiple argument values passed with the action in click events. |
| `ariaLabel` | string | (none) | No | Sets the aria-label of the button. |
| `disabled` | boolean | (none) | No | Disables the button. |
| `icon` | GoabIconType | (none) | Yes | Sets the icon. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `size` | GoabIconSize | `medium` | No | Sets the size of button. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `theme` | GoabIconTheme | `outline` | No | Sets the icon theme. "outline" for stroked icons, "filled" for solid icons. |
| `title` | string | (none) | No | Sets the title of the button. |
| `type` | GoabIconButtonType | `default` | No | Sets the visual style of the button. |
| `variant` | GoabIconButtonVariant | (none) | No | Styles the button to show color, light, dark or destructive action. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Emits when the icon button is clicked. |

---

## Web Components

Tag: `goa-icon-button`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | (none) | No | Action identifier passed in click events for event delegation patterns. |
| `action-arg` | string | (none) | No | Single argument value passed with the action in click events. |
| `action-args` | Record<string, unknown> | `{}` | No | Multiple argument values passed with the action in click events. |
| `arialabel` | string | (none) | No | Sets the aria-label of the button. |
| `disabled` | boolean | `false` | No | Disables the button. |
| `icon` | GoabIconType | (none) | Yes | Sets the icon. |
| `inverted` | boolean | `false` | No | When true, inverts the icon colors for use on dark backgrounds. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `size` | IconSize | `medium` | No | Sets the size of button. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `theme` | IconTheme | `outline` | No | Sets the icon theme. 'outline' for stroked icons, 'filled' for solid icons. |
| `title` | string | (none) | No | Sets the title of the button. |
| `type` | "default" \| "tertiary" | `default` | No | Sets the visual style of the button. |
| `variant` | "color" \| "nocolor" \| "light" \| "dark" \| "destructive" | `color` | No | Styles the button to show color, light, dark or destructive action. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_click` | CustomEvent<{ event: Event }> | (none) |

---

## Usage guidance

### States

- **[Don't]** Avoid using disabled buttons. They have poor contrast and can confuse users.
- **[Don't]** Don't disable buttons or inputs without explaining why. Disabled controls can be confusing and users may not understand why they can't interact with an element.

### Types

- **[Don't]** Don't use Button for simple navigation (use Link), toggling state (use Toggle or Checkbox), or minor utility functions (use Icon Button).

### Positioning

- **[Do]** Use a button group when putting multiple buttons together.

### Usage

- **[Don't]** Don't use icon buttons for actions that are not easily understood.
- **[Do]** Use icon buttons for universal actions such as closing a modal window.

### Feedback

- **[Do]** Use tooltips to describe an icon button and provide clarity on what the icon button will do.
- **[Don't]** Don't use tooltips inconsistently; if one icon button has a tooltip, the rest of the icon buttons must also have tooltips.

---

## Accessibility guidance

### Screen Readers

- **[Don't]** Don't use icon-only elements without an accessible label
- **[Do]** Icon-only buttons must include a descriptive label for screen readers.

### Focus

- **[Don't]** Don't focus on just the icon within a button. Focus the button as a whole.

### Accessibility

- **[Do]** Use a tooltip to clearly indicate an icon button's function when there's no visible label.

---

## Examples

- [Copy to clipboard](/examples/copy-to-clipboard)
- [Show a label on an icon only button](/examples/show-a-label-on-an-icon-only-button)
- [Show multiple actions in a compact table](/examples/show-multiple-actions-in-a-compact-table)

---

## Related components

- [Button](/components/button): Carry out an important action or navigate to another page.
- [Icons](/components/icon): A simple and universal graphic symbol representing an action, object, or concept to help guide the user.
