# Badge

Small labels which hold small amounts of information, system feedback, or states.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/badge

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Accessible label for screen readers. |
| `emphasis` | "subtle" \| "strong" | `strong` | No | Sets the visual emphasis. 'subtle' for less prominent, 'strong' for more emphasis. |
| `iconType` | GoabIconType | (none) | No | Icon type to display in the badge. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `size` | "medium" \| "large" | `medium` | No | Sets the size of the badge. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | "information" \| "success" \| "important" \| "emergency" \| "archived" \| "sky" \| "p… | (none) | Yes | Sets the context and colour of the badge. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `content` | No | Content displayed in the badge. Accepts a string or ReactNode for custom content. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | (none) | No | Sets the accessible label for screen readers. |
| `content` | string \| TemplateRef<unknown> | (none) | No | Sets the content displayed in the badge. Accepts a string or template for custom content. |
| `emphasis` | "subtle" \| "strong" | `strong` | No | Sets the visual emphasis. 'subtle' for less prominent, 'strong' for more emphasis. |
| `iconType` | GoabIconType | (none) | No | Sets the icon type to display in the badge. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `size` | "medium" \| "large" | `medium` | No | Sets the size of the badge. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `type` | "information" \| "success" \| "important" \| "emergency" \| "archived" \| "sky" \| "p… | (none) | Yes | Sets the context and colour of the badge. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `content` | No | Content displayed in the badge. Accepts a string or ngTemplate for custom content. |

---

## Web Components

Tag: `goa-badge`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialabel` | string | (none) | No | Accessible label for screen readers. |
| `content` | string | (none) | No | Content displayed in the badge. Use the content slot for custom HTML. |
| `emphasis` | "subtle" \| "strong" | `strong` | No | Sets the visual emphasis. 'subtle' for less prominent, 'strong' for more emphasis. |
| `icontype` | GoabIconType | (none) | No | Icon type to display in the badge. |
| `justify-content` | "center" \| "flex-start" \| "flex-end" \| "space-between" \| "" | (none) | No | justify-content value for the badge container. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `min-width` | string | (none) | No | min-width value for the badge container (e.g. "20px", "var(--goa-space-m)"). |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `size` | "medium" \| "large" | `medium` | No | Sets the size of the badge. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | "information" \| "important" \| "emergency" \| "success" \| "dark" \| "midtone" \| "l… | (none) | Yes | Defines the context and colour of the badge. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `content` | No | Content displayed in the badge. |

---

## Usage guidance

### Other

- **[Don't]** Don't use a primary button to edit a badge.
- **[Do]** Use badges for information and organization, not interactivity.
- **[Do]** Use a tertiary button next to a badge if it needs to be manually updated.

### Types

- **[Don't]** Don't style badges to look like buttons.
- **[Don't]** Don't use interactive colours. These are reserved for links, buttons, and other interactive elements.
- **[Do]** Match badge type to the status it represents
- **[Tip]** FilterChip is for removable filters that users can dismiss. For static labels or status indicators, use Badge instead.

### Content

- **[Do]** Use sentence case for badge text. Capitalize the first word only.
- **[Do]** Use short, concise text in badges.

---

## Accessibility guidance

### Screen Readers

- **[Don't]** Don't use icon-only elements without an accessible label
- **[Warning]** When using an icon-only badge, ariaLabel is required so screen readers can identify it.

---

## Examples

- [Show multiple tags together](/examples/show-multiple-tags-together)
- [Show status in a table](/examples/show-status-in-a-table)
- [Show status on a card](/examples/show-status-on-a-card)

---

## Related components

- [Callout](/components/callout): Communicate important information through a strong visual emphasis.
