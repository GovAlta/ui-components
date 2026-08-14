# Link

Wraps an anchor element to add icons or margins.

**Status:** stable | **Category:** Utilities | **Docs:** https://design.alberta.ca/components/link

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | (none) | No | Custom action event name to dispatch when the link is clicked. |
| `actionArg` | string | (none) | No | Single argument to pass with the action event. Deprecated, use actionArgs instead. |
| `actionArgs` | Record<string, unknown> | (none) | No | Object of arguments to pass with the action event. |
| `color` | GoabLinkColor | `interactive` | No | Sets the color theme. 'interactive' for blue, 'dark' for black, 'light' for white text. |
| `leadingIcon` | GoabIconType | (none) | No | Icon displayed before the link text. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `size` | GoabLinkSize | `medium` | No | Sets the text size and corresponding icon size. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `trailingIcon` | GoabIconType | (none) | No | Icon displayed after the link text. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | (none) | No | Custom action event name to dispatch when the link is clicked. |
| `actionArg` | string | (none) | No | Single argument to pass with the action event (deprecated, use actionArgs). |
| `actionArgs` | Record<string, unknown> | (none) | No | Object of arguments to pass with the action event. |
| `color` | GoabLinkColor | `interactive` | No | Sets the color theme. 'interactive' for blue, 'dark' for black, 'light' for white text. |
| `leadingIcon` | GoabIconType | (none) | No | Icon displayed before the link text. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `size` | GoabLinkSize | `medium` | No | Sets the text size and corresponding icon size. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `trailingIcon` | GoabIconType | (none) | No | Icon displayed after the link text. |

---

## Web Components

Tag: `goa-link`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `action` | string | (none) | No | Custom action event name to dispatch when the link is clicked. |
| `action-arg` | string | (none) | No | Single argument to pass with the action event (deprecated, use actionArgs). |
| `action-args` | Record<string, unknown> | `{}` | No | Object of arguments to pass with the action event. |
| `color` | "interactive" \| "dark" \| "light" | `interactive` | No | Sets the color theme. 'interactive' for blue, 'dark' for black, 'light' for white text. |
| `leadingicon` | GoabIconType | (none) | No | Icon displayed before the link text. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `size` | "xsmall" \| "small" \| "medium" \| "large" | `medium` | No | Sets the text size and corresponding icon size. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `trailingicon` | GoabIconType | (none) | No | Icon displayed after the link text. |

---

## Usage guidance

### Types

- **[Do]** Use a button for actions that trigger functionality (submit, save, cancel). Use a link for navigation to different pages or external websites.
- **[Don't]** Don't use Button for simple navigation (use Link), toggling state (use Toggle or Checkbox), or minor utility functions (use Icon Button).

### Icons

- **[Tip]** Use trailingIcon='open' for links that go to external sites so users know they're leaving the service.

### Other

- **[Tip]** Use Link for navigation to other pages. Use Button for actions that change state or trigger functionality.

---

## Examples

- [Card grid](/examples/card-grid)
- [Error pages](/examples/error-pages): Standard error screens for Government of Alberta services. Use when a user lands somewhere that is missing, forbidden, or broken so they understand what happened and what to do next.
- [Link to an external page](/examples/link-to-an-external-page)
