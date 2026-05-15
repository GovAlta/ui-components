# Testing Standards

## Testing Tiers

| Tier | Framework | When to Use |
|------|-----------|-------------|
| WC Unit | Vitest + @testing-library/svelte | Prop rendering, basic state, margins |
| React Unit | Vitest + @testing-library/react | Wrapper prop transformation |
| React Browser | Vitest + Playwright (Chromium + Firefox) | Event behavior, interactions, shadow DOM |
| Angular | Jest + TestBed | Wrapper attribute binding, form integration |

**Browser tests for events, unit tests for props.**

## Enforced Patterns

**Locators are always truthy. Don't assert on them.**
`getBy*` always returns an object. `expect(el).toBeTruthy()` is meaningless. Assert on actual state instead.

**Declare locators outside `waitFor`.**
Putting locators inside `waitFor` defeats its purpose.

```typescript
// Bad
await vi.waitFor(() => {
  const el = result.getByTestId("button");
  expect(el).toHaveTextContent("Submit");
});

// Good
const el = result.getByTestId("button");
await vi.waitFor(() => {
  expect(el).toHaveTextContent("Submit");
});
```

**No timeout hacks.** Browser tests already retry. Default `waitFor` timeout is 1000ms.

**Use `click()`, not `dispatchEvent`** in browser tests.

**Use `data-testid` for selectors**, but prefer `getByText` when it makes the test more accessible.

**Tests must test what they claim.** If named "should show error state", assert on error state, not just element existence.

**Use `it()` not `test()`.**

## What to Test

Every component: basic rendering, all prop variants, event dispatch, margins, disabled state, `data-*` passthrough, ARIA where applicable.

V2 components need their own browser tests.

## Angular Testing

Use a test host component (test as a consumer would). `fakeAsync` + `tick()` for the `setTimeout(0)` pattern. Double `detectChanges()` (before and after `tick()`). Query via `By.css("goa-xxx")`.

## PR Playground Files

`feat{N}` not `feat-{N}` (no hyphen). Bug pages in `apps/prs/react/src/routes/bugs/`, features in `features/`.
