# Component Authoring Standards

## Script Section Order

Every Svelte component script follows this order:

1. Imports
2. Validators (`typeValidator` declarations)
3. Type declarations
4. Exported props (ordered: required > content > state > visual > a11y > version > margins)
5. Private state (underscore prefix: `_rootEl`, `_isOpen`)
6. Reactive declarations (`$:`)
7. Lifecycle (`onMount`, `onDestroy`)
8. Event handlers / functions

## Universal Props

Every component must include:

- `testid: string = ""` with `data-testid={testid}` on root element
- `mt, mr, mb, ml: Spacing = null` with `style={calculateMargin(mt, mr, mb, ml)}`
- `version: "1" | "2" = "1"` with `class:v2={version === "2"}`

## Boolean Props

Web component attributes are always strings. Boolean props: `export let disabled: string = "false"` with `$: isDisabled = toBoolean(disabled)`.

Note: `toBoolean("")` returns `true` (HTML attribute semantics).

## Enum Props

Always use `typeValidator` for enum/union props. Use the object form `{ required: true }` over the boolean shorthand.

```typescript
const [Types, validateType] = typeValidator("Button type", ["primary", "secondary"], { required: true });
type ButtonType = (typeof Types)[number];
export let type: ButtonType = "primary";
onMount(() => { validateType(type); });
```

## Events

- External (for consumers): `dispatch(_rootEl, "_change", { name, value }, { bubbles: true })`
- Internal (between DS components): `relay()` / `receive()` -- never use `dispatch()` for parent-child coordination
- Event details must be objects (for future extensibility), not bare values
- Use separate events for separate operations

## Lifecycle

- Validate all typeValidators in `onMount`
- rootEl event listeners auto-clean on removal. Do NOT add removeEventListener for rootEl in onDestroy.
- document/window listeners DO need cleanup in onDestroy.

## Slots

Slot names are lowercase. Check existence before rendering with `$$slots`. Use **props** for simple text, **slots** for rich content, both when either should work:

```svelte
{#if $$slots.heading}
  <slot name="heading" />
{:else if heading}
  <span>{heading}</span>
{/if}
```

Use `getSlottedChildren()` from `common/utils.ts` to access child elements in slots.

## Naming

- Prop names: always lowercase (`leadingicon` not `leadingIcon`)
- Private state: underscore prefix (`_isOpen`)
- Functions: must have verbs (`handleClick`, `getMenuLinks`)
- Size values: use `"default"` not `"regular"`
- Locale: `en-CA` always
