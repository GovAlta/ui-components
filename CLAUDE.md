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

### Always Follow These Rules

1. **Svelte is the source of truth** - Fix bugs in Svelte first, then update wrappers
2. **Design tokens first** - Use design tokens whenever possible; avoid hardcoding colors, spacing, or typography
3. **WCAG 2.2 AA** - Accessibility is mandatory, not optional
4. **All three frameworks** - Every component change needs React + Angular wrapper updates
5. **Tests required** - No component changes without corresponding test updates
6. **Backward compatibility** - Don't break existing implementations

### Props Conventions

| Framework     | Casing          | Boolean Example     | Event Example      |
| ------------- | --------------- | ------------------- | ------------------ |
| Web Component | lowercase       | `disabled="true"`   | `_click` event     |
| React         | camelCase       | `disabled={true}`   | `onClick` prop     |
| Angular       | camelCase input | `[disabled]="true"` | `(onClick)` output |

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

## Naming Conventions

### Components

| Context           | Convention      | Example         |
| ----------------- | --------------- | --------------- |
| Web Component tag | `goa-{name}`    | `<goa-button>`  |
| React component   | `Goab{Name}`    | `GoabButton`    |
| Angular selector  | `goab-{name}`   | `<goab-button>` |
| File (React)      | `{name}.tsx`    | `button.tsx`    |
| File (Angular)    | `{name}.ts`     | `button.ts`     |
| File (Svelte)     | `{Name}.svelte` | `Button.svelte` |

### Props/Attributes

| Type       | Web Component    | React         | Angular       |
| ---------- | ---------------- | ------------- | ------------- |
| Regular    | `leadingicon`    | `leadingIcon` | `leadingIcon` |
| Multi-word | `action-args`    | `actionArgs`  | `actionArgs`  |
| Boolean    | `"true"/"false"` | `true/false`  | `true/false`  |

### Spacing Values

Used for `mt`, `mr`, `mb`, `ml` props:

```
Numeric: "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
T-shirt: "none", "3xs", "2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"
```

---

## Design Tokens

All styling uses CSS custom properties from `@abgov/design-tokens`.

**Location:** `libs/web-components/src/assets/css/`

- `variables.css` - Custom property definitions
- `components.css` - Component-specific styles
- `fonts.css` - Typography
- `reset.css` - CSS reset

**Usage in Svelte:**

```svelte
<style>
  button {
    height: var(--goa-button-height);
    background-color: var(--goa-color-primary);
  }
</style>
```

**Design tokens first.** If a token doesn't exist for what you need, discuss with the team about adding one.

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

Web components receive all attributes as strings:

```tsx
// React: Convert boolean to string
disabled={disabled ? "true" : undefined}
```

### "Event not firing"

- Web component events use underscore prefix: `_click`, `_change`
- React/Angular wrappers expose as `onClick`, `onChange`
- Check the web component is dispatching with `dispatch()` utility

### "Styles not applying"

1. Check you're using CSS custom properties, not hardcoded values
2. Verify the component imports the correct CSS files
3. Check if the style is scoped correctly in Svelte

### "Tests failing after component update"

1. Run `npm run build` first - wrappers may need rebuilt
2. Check all three frameworks have updated tests
3. Verify types in `libs/common/` match the new props
