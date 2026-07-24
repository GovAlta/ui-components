# Callout

Communicate important information through a strong visual emphasis.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/callout

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLive` | GoabCalloutAriaLive | `off` | No | Indicates how assistive technology should handle updates to the live region. |
| `emphasis` | GoabCalloutEmphasis | `medium` | No | Sets the visual prominence. 'high' for full background, 'medium' for subtle, 'low' for minimal. |
| `heading` | string | (none) | No | Callout heading text. |
| `iconTheme` | GoabCalloutIconTheme | `outline` | No | Sets the icon theme. 'outline' for stroked icons, 'filled' for solid icons. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the callout. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `size` | GoabCalloutSize | `large` | No | Sets the size of the callout. 'medium' has reduced padding and type size for compact areas. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabCalloutType | `information` | No | Sets the context and colour of the callout. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLive` | GoabCalloutAriaLive | `off` | No | Indicates how assistive technology should handle updates to the live region. |
| `emphasis` | GoabCalloutEmphasis | `medium` | No | Sets the visual prominence. 'high' for full background, 'medium' for subtle, 'low' for minimal. |
| `heading` | string | (none) | No | Callout heading text. |
| `iconTheme` | GoabCalloutIconTheme | `outline` | No | Sets the icon theme. 'outline' for stroked icons, 'filled' for solid icons. |
| `maxWidth` | string | (none) | No | Sets the maximum width of the callout. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `size` | GoabCalloutSize | `large` | No | Sets the size of the callout. 'medium' has reduced padding and type size for compact areas. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `type` | GoabCalloutType | `information` | No | Define the context and colour of the callout. |

---

## Web Components

Tag: `goa-callout`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialive` | "off" \| "assertive" \| "polite" | `off` | No | Indicates how assistive technology should handle updates to the live region. |
| `emphasis` | "high" \| "medium" \| "low" | `medium` | No | Sets the visual prominence. 'high' for full background, 'medium' for subtle, 'low' for minimal. |
| `heading` | string | (none) | No | Callout heading text. |
| `icontheme` | IconTheme | `outline` | No | Sets the icon theme. 'outline' for stroked icons, 'filled' for solid icons. |
| `maxwidth` | string | `none` | No | Sets the maximum width of the callout. |
| `mb` | Spacing | `l` | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `size` | "medium" \| "large" | `large` | No | Sets the size of the callout. 'medium' has reduced padding and type size for compact areas. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | "emergency" \| "important" \| "information" \| "event" \| "success" | (none) | Yes | Define the context and colour of the callout. |

---

## Usage guidance

### Sizing

- **[Do]** Use full width callouts with a maximum width of 700px.
- **[Do]** Use the medium callout on mobile to save space.

### Content

- **[Do]** Use inline links when additional information exists on another page.
- **[Don't]** Don't include too much content. Callouts should communicate one important piece of information.
- **[Do]** Keep callouts focused on one key message

### Other

- **[Don't]** Don't allow callouts to be dismissed.
- **[Don't]** Don't use callouts for form or field validation. Use error messages instead.

---

## Accessibility guidance

### Screen Readers

- **[Tip]** Use ariaLive='polite' for status updates. Use 'assertive' for urgent messages that should interrupt the user immediately.

---

## Examples

- [Result page](/examples/result-page): A result page shown after a citizen has submitted a form, application, or task. Confirms success, explains what happens next, and points the user at any follow-up actions.
- [Task list page](/examples/task-list-page): A page that provides structure for multiple steps in a service. Use a task list to outline the entire process and show the status of each task as users move through it.

---

## Related components

- [Badge](/components/badge): Small labels which hold small amounts of information, system feedback, or states.
- [Notification banner](/components/notification): Display important page level information or notifications.
