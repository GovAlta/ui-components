# Badge

Small labels which hold small amounts of information, system feedback, or states.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/badge

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | — | No | Accessible label for screen readers. |
| `content` | string | — | No | Text label of the badge. |
| `emphasis` | GoabBadgeEmphasis | `strong` | No | Sets the visual emphasis. 'subtle' for less prominent, 'strong' for more emphasis. |
| `iconType` | GoabIconType | — | No | Icon type to display in the badge. |
| `mb` | Spacing | — | No |  |
| `ml` | Spacing | — | No |  |
| `mr` | Spacing | — | No |  |
| `mt` | Spacing | — | No |  |
| `size` | GoabBadgeSize | `medium` | No | Sets the size of the badge. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabBadgeType | — | Yes | Sets the context and colour of the badge. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | string | — | No | Sets the accessible label for screen readers. |
| `content` | string | — | No | Sets the text label of the badge. |
| `emphasis` | GoabBadgeEmphasis | `strong` | No | Sets the visual emphasis. 'subtle' for less prominent, 'strong' for more emphasis. |
| `iconType` | GoabIconType | — | No | Sets the icon type to display in the badge. |
| `mb` | Spacing | — | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | — | No | Sets the left margin spacing token. |
| `mr` | Spacing | — | No | Sets the right margin spacing token. |
| `mt` | Spacing | — | No | Sets the top margin spacing token. |
| `size` | GoabBadgeSize | `medium` | No | Sets the size of the badge. |
| `testId` | string | — | No | Sets the data-testid attribute for automated testing. |
| `type` | GoabBadgeType | — | No | Sets the context and colour of the badge. |

---

## Web Components

Tag: `goa-badge`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `arialabel` | string | — | No | Accessible label for screen readers. |
| `content` | string | — | No | Text label of the badge. |
| `emphasis` |  | `strong` | No | Sets the visual emphasis. 'subtle' for less prominent, 'strong' for more emphasis. |
| `icontype` | GoabIconType | — | No | Icon type to display in the badge. |
| `justify-content` | "center" | "flex-start" | "flex-end" | "space-between" | "" | — | No | justify-content value for the badge container. |
| `mb` | Spacing | — | No | Bottom margin. |
| `min-width` | string | — | No | min-width value for the badge container (e.g. "20px", "var(--goa-space-m)"). |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |
| `size` | "medium" | "large" | `medium` | No | Sets the size of the badge. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |
| `type` | "information" | "important" | "emergency" | "success" | "dark" | "midtone" | "l… | — | Yes | Defines the context and colour of the badge. |
| `version` | "1" | "2" | `1` | No | Design system version for styling. |

---

## Usage guidance

### Other

- ❌ **Don't:** Don't use a primary button to edit a badge.
- ✅ **Do:** Use badges for information and organization, not interactivity.
- ✅ **Do:** Use a tertiary button next to a badge if it needs to be manually updated.

### Types

- ❌ **Don't:** Don't style badges to look like buttons.
- ❌ **Don't:** Don't use interactive colours. These are reserved for links, buttons, and other interactive elements.
- ✅ **Do:** Match badge type to the status it represents
- 💡 **Tip:** FilterChip is for removable filters that users can dismiss. For static labels or status indicators, use Badge instead.

### Content

- ✅ **Do:** Use sentence case for badge text. Capitalize the first word only.
- ✅ **Do:** Use short, concise text in badges.

---

## Accessibility guidance

### Screen Readers

- ❌ **Don't:** Don't use icon-only elements without an accessible label
- ⚠️ **Warning:** When using an icon-only badge, ariaLabel is required so screen readers can identify it.

---

## Examples

- [Card view of case files](/examples/card-view-of-case-files)
- [Expand or collapse part of a form](/examples/expand-or-collapse-part-of-a-form)
- [Filter a list using a push drawer](/examples/filter-a-list-using-a-push-drawer)
- [Filter data in a table](/examples/filter-data-in-a-table)
- [Set a specific tab to be active](/examples/set-a-specific-tab-to-be-active)
- [Show different views of data in a table](/examples/show-different-views-of-data-in-a-table)
- [Show multiple actions in a compact table](/examples/show-multiple-actions-in-a-compact-table)
- [Show multiple tags together](/examples/show-multiple-tags-together)
- [Show status in a table](/examples/show-status-in-a-table)
- [Show status on a card](/examples/show-status-on-a-card)
- [Task list page](/examples/task-list-page): A page that provides structure for multiple steps in a service. Use a task list to outline the entire process and show the status of each task as users move through it.
- [Case detail](/examples/workspace/case-detail): A single-record view for reviewing and acting on one case. Uses accordion sections, a table-of-contents sidebar, badges for status, and header actions for quick operations.
- [Dashboard](/examples/workspace/dashboard): Gives staff an overview of their work with counts, trends, and assigned items.
- [Index page](/examples/workspace/index-page): The page staff land on to scan, filter, sort, and pick records to work on. The home of the workspace's daily queue.

---

## Related components

- [Callout](/components/callout): Communicate important information through a strong visual emphasis.
