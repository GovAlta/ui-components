# Tabs

Let users navigate between related sections of content, displaying one section at a time.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/tabs

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `initialTab` | number | (none) | No | The initially active tab (1-based index). If not set, the first tab is active. |
| `navigation` | GoabTabsNavigation | `hash` | No | Controls URL navigation mode on tab change. |
| `orientation` | GoabTabsOrientation | `auto` | No | Tab layout orientation. "auto" stacks vertically on mobile, "horizontal" keeps horizontal on all screen sizes. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | GoabTabsVariant | `default` | No | Visual style variant. "segmented" shows pill-style tabs with animation. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | (detail: GoabTabsOnChangeDetail) => void | Callback fired when the active tab changes. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `initialTab` | number | (none) | No | The initially active tab (1-based index). If not set, the first tab is active. |
| `navigation` | GoabTabsNavigation | (none) | No | Sets the navigation mode for tab switching. "hash" updates the URL hash when switching tabs. |
| `orientation` | GoabTabsOrientation | (none) | No | Tab layout orientation. "auto" stacks vertically on mobile (default), "horizontal" keeps horizontal on all screen sizes. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | GoabTabsVariant | (none) | No | Visual style variant. "segmented" shows pill-style tabs with animation. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | (event: GoabTabsOnChangeDetail) => void | Emits when the active tab changes. Emits the new tab index as GoabTabsOnChangeDetail. |

---

## Web Components

Tag: `goa-tabs`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `initialtab` | number | `-1` | No | The initially active tab (1-based index). If not set, the first tab is active. |
| `navigation` | "hash" \| "none" | `hash` | No | (none) |
| `orientation` | "auto" \| "horizontal" | `auto` | No | Tab layout orientation. "auto" stacks vertically on mobile, "horizontal" keeps horizontal on all screen sizes. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | "default" \| "segmented" | `default` | No | Visual style variant. "segmented" shows pill-style tabs with animation. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_change` | CustomEvent<{ tab: number }> | (none) |

---

## Usage guidance

### Usage

- **[Don't]** Don't use tabs to indicate progress.
- **[Don't]** Don't use tabs if users need to see content from multiple tabs simultaneously.
- **[Don't]** Avoid nesting tabs inside other tabs.

### Content

- **[Don't]** Don't truncate tab labels - use short labels instead.

### Interaction

- **[Do]** Always have one of the tabs pre-selected on page load.

---

## Examples

- [Activate a specific tab with a button](/examples/activate-a-specific-tab-with-a-button)
- [Set a specific tab to be active](/examples/set-a-specific-tab-to-be-active)
- [Show different views of data in a table](/examples/show-different-views-of-data-in-a-table)
- [Index page](/examples/workspace/index-page): The page staff land on to scan, filter, sort, and pick records to work on. The home of the workspace's daily queue.
