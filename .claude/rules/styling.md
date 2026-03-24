# Styling Standards

## Design Tokens

All styling uses CSS custom properties. No exceptions. No hardcoded colors, font sizes, border-radius, or spacing.

Token naming: `--goa-[component]-[variant]-[state]-[property]`

Use `rem` over `px` even when there is no token value (`20px` = `1.25rem`).

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

Prefer `gap` over margins between items. Remove redundant CSS properties. No consumer CSS customization by design (no `::part()`, no exposed custom properties).
