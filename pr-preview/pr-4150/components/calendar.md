# Calendar

Visual calendar for date selection.

**Status:** stable | **Category:** Utilities | **Docs:** https://design.alberta.ca/components/calendar

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `max` | string | — | No | The maximum selectable date in YYYY-MM-DD format. Defaults to 5 years in the future. |
| `mb` | Spacing | — | No |  |
| `min` | string | — | No | The minimum selectable date in YYYY-MM-DD format. Defaults to 5 years in the past. |
| `ml` | Spacing | — | No |  |
| `mr` | Spacing | — | No |  |
| `mt` | Spacing | — | No |  |
| `name` | string | — | No | Name identifier for the calendar, included in change events. |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `value` | string | — | No | The currently selected date value in YYYY-MM-DD format. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | (details: GoabCalendarOnChangeDetail) => void | Callback fired when the selected date changes. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `max` | Date | string | undefined | — | No | The maximum selectable date in YYYY-MM-DD format. Defaults to 5 years in the future. |
| `mb` | Spacing | — | No | Sets the bottom margin spacing token. |
| `min` | Date | string | undefined | — | No | The minimum selectable date in YYYY-MM-DD format. Defaults to 5 years in the past. |
| `ml` | Spacing | — | No | Sets the left margin spacing token. |
| `mr` | Spacing | — | No | Sets the right margin spacing token. |
| `mt` | Spacing | — | No | Sets the top margin spacing token. |
| `name` | string | — | No | Name identifier for the calendar, included in change events. |
| `testId` | string | — | No | Sets the data-testid attribute for automated testing. |
| `value` | Date | string | — | No | The currently selected date value in YYYY-MM-DD format. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | (event: GoabCalendarOnChangeDetail) => void | Emits when the selected date changes. Emits the selected date details as GoabCalendarOnChangeDetail. |

---

## Web Components

Tag: `goa-calendar`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `bordered` | boolean | `true` | No | Shows a border around the calendar. Set to false when embedding within another component. |
| `max` | string | — | No | The maximum selectable date in YYYY-MM-DD format. Defaults to 5 years in the future. |
| `mb` | Spacing | — | No | Bottom margin. |
| `min` | string | — | No | The minimum selectable date in YYYY-MM-DD format. Defaults to 5 years in the past. |
| `ml` | Spacing | — | No | Left margin. |
| `mr` | Spacing | — | No | Right margin. |
| `mt` | Spacing | — | No | Top margin. |
| `name` | string | — | No | Name identifier for the calendar, included in change events. |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |
| `value` | string | — | No | The currently selected date value in YYYY-MM-DD format. |
| `version` | "1" | "2" | `1` | No | Design system version for styling. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_change` | CustomEvent<{ type: string; name: string; value: unknown }> |  |

---

## Related components

- [Date picker](/components/date-picker): Lets users select a date through a calendar without the need to manually type it in a field.
