# UI Components - Development Guide

Development guidance for the GoA Design System UI Components monorepo.

---

## Quick Reference

| Library          | Location                   | Framework  | Naming             |
| ---------------- | -------------------------- | ---------- | ------------------ |
| Web Components   | `libs/web-components/`     | Svelte     | `goa-*` tags       |
| React Wrappers   | `libs/react-components/`   | React      | `Goab*` components |
| Angular Wrappers | `libs/angular-components/` | Angular    | `goab-*` selectors |
| Shared Types     | `libs/common/`             | TypeScript | Types + utilities  |

---

## Architecture: The Wrapper Pattern

Understanding this pattern is essential for working in this codebase.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Source of Truth                          │
│                                                                 │
│   libs/web-components/src/components/button/Button.svelte       │
│   - All logic, styling, and behavior                            │
│   - Compiles to <goa-button> custom element                     │
│   - Uses Svelte's customElement directive                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Framework Wrappers                        │
│                                                                 │
│   React: libs/react-components/src/lib/button/button.tsx        │
│   - Wraps <goa-button> element                                  │
│   - Transforms React props → web component attributes           │
│   - Handles React-specific event binding                        │
│                                                                 │
│   Angular: libs/angular-components/src/lib/components/button/   │
│   - Wraps <goa-button> element                                  │
│   - Uses @Input/@Output decorators                              │
│   - Integrates with Angular forms (ControlValueAccessor)        │
└─────────────────────────────────────────────────────────────────┘
```

**Key insight:** When fixing bugs or adding features, start with the Svelte component. The wrappers are thin layers that expose the web component to each framework.

---

## Development Standards

### Core Principles

1. **Svelte is the source of truth** - Fix bugs in Svelte first, then update wrappers
2. **Design tokens over hardcoded values** - No raw hex colors, px values, or font sizes. Use `rem` when no token exists.
3. **WCAG 2.2 AA** - Accessibility is mandatory, not optional
4. **All three frameworks** - Every component change needs React + Angular wrapper updates with matching props
5. **Tests required** - Browser tests for events/interactions, unit tests for props/rendering
6. **Backward compatibility** - Flag anything that could break existing consumers
7. **Scope discipline** - Every changed line justified by the ticket. Bugs found during dev get separate issues.

### Top Review Standards

These are the most frequently enforced rules during PR review. Violating these will result in review comments.

| # | Standard | Enforcer(s) |
|---|----------|-------------|
| 1 | Design tokens over hardcoded values | Vanessa, Benji, all |
| 2 | Scope discipline -- every changed line justified by ticket | Chris |
| 3 | Cross-framework consistency -- React/Angular match Svelte | Vanessa, Dustin |
| 4 | Browser tests for event/interaction behavior | Chris |
| 5 | Locator patterns -- declare outside `waitFor`, no truthy assertions | Chris |
| 6 | Prop naming describes behavior, not implementation | Chris |
| 7 | Use `rem` over `px` even without a token | Chris |
| 8 | No duplicate or redundant state variables | Chris |
| 9 | Use existing utilities (`performOnce`, `toBoolean`, etc.) | Chris |
| 10 | V2 CSS must include V1 token fallbacks | Benji |
| 11 | Tests must test what they claim -- meaningful assertions | Chris, Dustin |
| 12 | No `console.log` or commented-out code | All |
| 13 | Event details wrapped in objects for extensibility | Chris |
| 14 | JSDoc consistency -- `testid` format, no `version` docs, include defaults | Vanessa |
| 15 | Breaking change awareness | Dustin, Chris |

### Props Conventions

| Framework     | Casing          | Boolean Example     | Event Example      |
| ------------- | --------------- | ------------------- | ------------------ |
| Web Component | lowercase       | `disabled="true"`   | `_click` event     |
| React         | camelCase       | `disabled={true}`   | `onClick` prop     |
| Angular       | camelCase input | `[disabled]="true"` | `(onClick)` output |

### Pre-PR Checklist

Scan before opening a PR:

- [ ] Every changed line justified by the ticket
- [ ] No `console.log` or commented-out code
- [ ] All values from design tokens (zero hardcoded colors, sizes, spacing)
- [ ] `rem` used instead of `px` even without a token
- [ ] React and Angular wrappers updated to match Svelte changes
- [ ] Props match across all three frameworks (required/optional, naming, types)
- [ ] Unit tests for prop rendering and margins
- [ ] Browser tests for event/interaction behavior
- [ ] Tests test what they claim (meaningful assertions matching test name)
- [ ] Locators declared outside `waitFor`, no truthy assertions on locators
- [ ] V2 styles include V1 token fallbacks: `var(--goa-v2-token, var(--goa-v1-fallback))`
- [ ] JSDoc starts with "Sets the...", includes defaults, no `version` docs
- [ ] No breaking changes (or explicitly flagged if intentional)
- [ ] Commit message includes ticket number

---

## Common Development Workflows

### Updating an Existing Component

1. **Modify the Svelte component** (`libs/web-components/src/components/[name]/`)
   - Update logic, props, styling in `.svelte` file
   - Update tests in `.spec.ts`

2. **Update React wrapper** (`libs/react-components/src/lib/[name]/`)
   - Add/update props in interface
   - Handle prop transformation if needed
   - Update tests in `.spec.tsx`

3. **Update Angular wrapper** (`libs/angular-components/src/lib/components/[name]/`)
   - Add `@Input()` for new props
   - Add `@Output()` for new events
   - Update tests in `.spec.ts`

4. **Update shared types** if needed (`libs/common/src/lib/common.ts`)

5. **Run tests:**

   ```bash
   npm run build              # Build all libraries
   npm run test:pr            # Full PR validation
   ```

6. **Test in playgrounds:**
   ```bash
   npm run serve:prs:react
   npm run serve:prs:angular
   npm run serve:prs:web
   ```

### Adding a New Component

Follow the same structure as existing components. Each component needs:

**Web Component (Svelte):**

```
libs/web-components/src/components/[name]/
├── ComponentName.svelte         # Main implementation
├── ComponentName.spec.ts        # Unit tests
├── ComponentName.html-data.json # VS Code IntelliSense (optional)
└── doc.md                       # Documentation (optional)
```

**React Wrapper:**

```
libs/react-components/src/lib/[name]/
├── component-name.tsx           # Wrapper component
└── component-name.spec.tsx      # Tests
```

**Angular Wrapper:**

```
libs/angular-components/src/lib/components/[name]/
├── component-name.ts            # Wrapper component
└── component-name.spec.ts       # Tests
```

Don't forget to export from each library's `index.ts`.

---

## Testing

### Test Commands

```bash
# Watch modes (during development)
npm run test:unit:watch         # Unit tests only
npm run test:browser:watch      # Browser tests (Playwright)
npm run test:headless:watch     # Headless browser tests

# Full validation (before PR)
npm run test:pr                 # Build + unit + headless

# Framework-specific
npm run test:angular            # Angular tests via Jest
```

### Test Framework by Library

| Library         | Framework                        | Location                         |
| --------------- | -------------------------------- | -------------------------------- |
| Web Components  | Vitest + @testing-library/svelte | `*.spec.ts` alongside component  |
| React           | Vitest + @testing-library/react  | `*.spec.tsx` alongside component |
| React (browser) | Vitest + Playwright              | `*.browser.spec.tsx`             |
| Angular         | Jest                             | `*.spec.ts` alongside component  |

---

## PR Testing Playground

The `apps/prs/` folder contains shared playgrounds for testing bugs and features. **When you submit a PR, you also submit your playground test page** so the team can test your changes and build on your test cases.

### Why This Matters

- Test pages are committed with your PR - they're shared artifacts, not throwaway code
- Reviewers use your test page to verify the fix/feature works
- Team members can add additional test cases if they find gaps
- The side menu item makes your test discoverable to everyone

### Structure

```
apps/prs/
├── react/           # React playground (primary)
├── angular/         # Angular playground
└── web/             # Web components playground
```

Test pages live in:

- `apps/prs/react/src/routes/bugs/` - for bug fixes
- `apps/prs/react/src/routes/features/` - for new features

### Creating a Test Page

1. **Copy the template:**

   ```bash
   # For bugs (use the GitHub issue number)
   cp apps/prs/react/src/routes/_TEMPLATE.tsx apps/prs/react/src/routes/bugs/bug{N}.tsx

   # For features
   cp apps/prs/react/src/routes/_TEMPLATE.tsx apps/prs/react/src/routes/features/feat{N}.tsx
   ```

2. **Update the file:**
   - Rename component to `Bug{N}Route` or `Feat{N}Route`
   - Update issue number, title, and paste the issue description from GitHub
   - Add test cases that demonstrate the fix/feature

3. **Wire it up:**
   - Add import to `main.tsx`
   - Add `<Route>` to `main.tsx` (keep numerical order)
   - **Add `<Link>` to `app.tsx` side menu** with format: `{issue number} {short name}`
     - Example: `2878 DatePicker onChange` or `1547 Tooltip positioning`

4. **Run the playground:**
   ```bash
   npm run serve:prs:react
   ```

### Test Page Checklist

- [ ] Route file in correct folder (`bugs/` or `features/`)
- [ ] Component renamed from `TemplateRoute`
- [ ] Issue details updated (number, title, description from GitHub)
- [ ] Test cases with clear descriptions
- [ ] Import added to `main.tsx`
- [ ] Route added to `main.tsx` (numerical order)
- [ ] **Link added to `app.tsx` side menu** with issue number + short name
- [ ] Page loads and navigation works

See `apps/prs/react/src/routes/README.md` for detailed instructions.

---

## Naming, Styling, and Detailed Standards

Detailed standards for component authoring, styling, framework wrappers, testing, and common utilities are in `.claude/rules/`. These auto-load into Claude Code sessions.

| Rules File | Covers |
|------------|--------|
| `component-authoring.md` | Script ordering, props, events, lifecycle, naming |
| `styling.md` | Tokens, V2 fallbacks, responsive, CSS patterns |
| `framework-wrappers.md` | React and Angular wrapper templates |
| `testing.md` | Test tiers, enforced patterns, Angular testing |
| `common-utilities.md` | Utility inventory, relay vs dispatch boundary |

---

## Folder Structure Reference

```
libs/
├── web-components/
│   ├── src/
│   │   ├── components/          # Svelte components
│   │   │   └── button/
│   │   │       ├── Button.svelte
│   │   │       └── Button.spec.ts
│   │   ├── assets/css/          # Design tokens CSS
│   │   ├── common/              # Shared utilities
│   │   └── index.ts             # Exports
│   ├── package.json
│   └── vite.config.js
│
├── react-components/
│   ├── src/
│   │   ├── lib/                 # React wrappers
│   │   │   └── button/
│   │   │       ├── button.tsx
│   │   │       └── button.spec.tsx
│   │   └── index.ts
│   └── package.json
│
├── angular-components/
│   ├── src/
│   │   └── lib/
│   │       └── components/      # Angular wrappers
│   │           └── button/
│   │               ├── button.ts
│   │               └── button.spec.ts
│   └── ng-package.json
│
└── common/
    └── src/
        └── lib/
            └── common.ts        # Shared types (GoabButtonType, etc.)

apps/
└── prs/                         # PR testing playgrounds
    ├── react/
    ├── angular/
    └── web/

playground/                      # Development playgrounds
├── react/
├── angular/
└── web/
```

---

## Common Issues & Solutions

### "Boolean prop not working"

Web components receive all attributes as strings. See `.claude/rules/component-authoring.md` for the boolean pattern. In React wrappers: `disabled={disabled ? "true" : undefined}`.

### "Event not firing"

Web component events use underscore prefix (`_click`, `_change`). Wrappers expose as `onClick`, `onChange`. Check the component is using `dispatch()` from `common/utils.ts`. See `.claude/rules/common-utilities.md` for the relay vs dispatch boundary.

### "Tests failing after component update"

1. Run `npm run build` first -- wrappers may need rebuilt
2. Check all three frameworks have updated tests
3. Verify types in `libs/common/` match the new props
