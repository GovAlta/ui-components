# Common Utilities — Use These, Don't Reinvent Them

All utilities are in `libs/web-components/src/common/`. Always check here before writing your own.

## utils.ts

| Function | Purpose |
|----------|---------|
| `typeValidator(msg, values, opts)` | Creates runtime validator + TypeScript type from same array |
| `toBoolean(value)` | String to boolean (`"false"` -> false, `""` -> true) |
| `fromBoolean(value)` | Boolean to string (`true` -> `"true"`) |
| `dispatch(el, name, detail, opts)` | External consumer events (underscore-prefixed names) |
| `relay(el, name, data, opts)` | Internal parent-child messaging (form components) |
| `receive(el, handler)` | Listen for internal relay messages |
| `getSlottedChildren(rootEl)` | Get elements assigned to a slot |
| `announceToScreenReader(text)` | Temporary aria-live announcement |
| `performOnce(timeoutId, action, delay)` | Debounce |
| `validateRequired(name, props)` | Check required props have values |
| `findFirstFocusableNode(nodes)` | Find first focusable element (supports shadow DOM) |
| `generateRandomId()` | 7-char random alphanumeric |
| `clamp(value, min, max)` | Numeric clamping |
| `watch(fn, deps)` | Explicit dependency tracking for `$:` blocks |
| `styles(...css)` | Conditional style string builder |

## styling.ts

| Function | Purpose |
|----------|---------|
| `calculateMargin(mt, mr, mb, ml)` | Converts Spacing values to inline margin styles |
| `Spacing` type | `"none" \| "3xs" \| "2xs" \| "xs" \| "s" \| "m" \| "l" \| "xl" \| "2xl" \| "3xl" \| "4xl" \| null` |

## Other files

| File | Purpose |
|------|---------|
| `context-store.ts` | Cross-shadow-DOM context API (replaces Svelte's native context) |
| `calendar-date.ts` | Timezone-safe date class for DatePicker/Calendar |
| `no-scroll.ts` | Body scroll lock action for Modal/Drawer |
| `breakpoints.ts` | `MOBILE_BP` (624px), `TABLET_BP` (1024px) |
| `validators.ts` | `isValidDimension()` for CSS dimension strings |
| `urls.ts` | URL matching for navigation active state |

## relay() vs dispatch() — The Boundary Rule

- `relay()` / `receive()`: Internal, between DS components only. Uses single `"msg"` event with action discriminator. For form parent-child coordination.
- `dispatch()`: External, for consumer applications. Named events with underscore prefix (`_click`, `_change`).

If the message is between two DS components, use relay. If it's for the consuming app, use dispatch.
