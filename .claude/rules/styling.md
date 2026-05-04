# Styling Standards

## Design Tokens

Colors, font sizes, border-radius, and spacing must use CSS custom properties (design tokens). Structural CSS properties like `display`, `position`, `overflow`, `cursor`, and `z-index` are naturally hardcoded.

Token naming: `--goa-[component]-[variant]-[state]-[property]`

Use `rem` over `px` even when there is no token value (`20px` = `1.25rem`).

## Token-First Changes

When changing component styling, work through the token layer. Don't remove CSS rules that reference component tokens.

**Change behavior by updating token values.** If a mobile tertiary button should become transparent, change the mobile token value to `transparent` in the token JSON. The CSS stays, the token drives the change. Removing the CSS breaks the customization contract for consumers who override that token.

**Component CSS should reference component tokens, not global tokens.** This is the standard we're aiming for. If you need a value in component CSS and no component token exists, create one that references the global token. Existing code doesn't always follow this — some components use global tokens directly. Don't refactor those during a bug fix, but do use component tokens for new CSS rules.

```css
/* Wrong: global token directly in component CSS */
background-color: var(--goa-color-greyscale-200);

/* Right: component token that references global */
background-color: var(--goa-button-tertiary-hover-color-bg);
```

The component token is defined in `button-design-tokens.json` and can reference the global:

```json
"button-tertiary-hover-color-bg": {
  "value": "{color.greyscale.200}"
}
```

This keeps the token architecture intact: global tokens feed component tokens, component tokens feed CSS. The layering also means consumers can technically override at the component token level via CSS cascade. This is intentional as a workaround, but not a promoted feature — the defaults should be used in nearly all cases.

## :host

Every component starts with:

```css
:host {
  box-sizing: border-box;
  font-family: var(--goa-font-family-sans);
}
```

## V2 Token Fallbacks (Mandatory)

Every V2 CSS variable must fall back to V1. This is the most repeated review feedback on V2 PRs.

```css
color: var(--goa-component-v2-token, var(--goa-v1-fallback));
```

## Class Binding

Variant classes use string interpolation. State classes use `class:` directive.

```svelte
<div class="goa-badge badge-{type}" class:v2={version === "2"} class:disabled={isDisabled}>
```

## Responsive

Use PostCSS aliases: `@media (--mobile) { ... }`. Breakpoints: mobile = 624px, tablet = 1024px.

## CSS Simplification

Prefer `gap` over margins between items. Remove redundant CSS properties. No promoted CSS customization API (no `::part()`, no documented custom properties for consumers). Token overrides via CSS cascade are possible by design but are a workaround, not a supported workflow.
