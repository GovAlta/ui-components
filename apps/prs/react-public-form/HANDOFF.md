# Public form template: handoff notes

Status of the `react-public-form` app and the `goa-public-form-page-layout`
component, for Thomas to continue. Written 2026-07-17.

This app builds a **real** public form (following the Figma "Pattern - Public
Form v1" diagram) out of reusable pieces, as opposed to the pattern gallery in
`apps/prs/react/src/routes/public-form/`, which showcases each UI pattern in
isolation. React only so far; Angular is not started.

## Run it

```
npm run serve:prs:react-public-form
```

`http://localhost:4203/` is the form's first page. There is no `/demo` prefix:
this app _is_ the public form, so its root is the form's root. Note: the app
imports the compiled web components from `dist/`, so run `nx build
web-components` after any change to the Svelte layout below.

---

## READ THIS FIRST: a `goa-public-form` family already ships in libs/

Current v0 public form components stayed on `libs/`:

- `goa-public-form` (`libs/web-components/src/components/form/Form.svelte`)
- `goa-public-form-page` (`.../form/FormPage.svelte`)
- `goa-public-form-summary` (`.../form/FormSummary.svelte`)
- `goa-public-form-task` / `goa-public-form-task-list`
- `PublicFormController` (`libs/common/src/lib/public-form-controller.ts`)
- `use-public-form-controller` hook + React + Angular wrappers

`goa-public-form-page` already has `heading`, `subHeading`, `sectionTitle`,
`backUrl`, `buttonText`, `buttonVisibility`, `summaryHeading` props: it does much
of what the gallery's hand-rolled `PublicFormLayout` + `FormSet` re-invent.

New components added under `libs/web-components/src/components/public-form/` (each
with a React wrapper), as new provisionally-named components rather than by
editing the shipped `form/` family, to avoid backward-compat risk:

- `goa-public-form-page-layout` — the page shell (see decision 4).
- `goa-public-form-task-section` — the task-list section card.
- `goa-public-form-task-item` — a task row (name, status, hint).

The section + item overlap the shipped `goa-public-form-task-list` /
`goa-public-form-task`; reconcile before promoting. `GoabPublicFormTaskStatus`
(`common.ts`) was widened with `in-progress`, so the shipped `Task.svelte` badge
falls to its default for that status until updated.

---

## What is done

| Area                                                  | State | Files                                                                                                                                    |
| ----------------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Nx app scaffold (port 4203)                           | Done  | `project.json`, `vite.config.ts`, `tsconfig*`, `index.html`, `.eslintrc.json`                                                            |
| Entry + router split                                  | Done  | `src/main.tsx` (mount + router only), `src/app/app.tsx` (shell + route table)                                                            |
| App shell                                             | Done  | `src/app/app.tsx`: microsite alpha banner + app header + footer                                                                          |
| Task-list home ("/")                                  | Done  | `src/routes/task-list.tsx`                                                                                                               |
| `goa-public-form-page-layout` Svelte component        | Done  | `libs/web-components/src/components/public-form/PublicFormPageLayout.svelte`                                                             |
| React wrapper `GoabPublicFormPageLayout`              | Done  | `libs/react-components/src/lib/public-form/public-form-page-layout.tsx` (exported from react index)                                      |
| `app/app.tsx` uses the wrapper                        | Done  | header passed with NO maxContentWidth, to prove the layout auto-fills 704px                                                              |
| `goa-public-form-task-section` Svelte + React wrapper | Done  | `.../public-form/PublicFormTaskSection.svelte` + `.../lib/public-form/public-form-task-section.tsx`; used by `task-list.tsx` SectionCard |
| `goa-public-form-task-item` Svelte + React wrapper    | Done  | `.../public-form/PublicFormTaskItem.svelte` + `.../lib/public-form/public-form-task-item.tsx`; the task row                              |

## What is NOT done (for Thomas)

Prioritized. Framework parity, then the flow.

1. **Angular wrapper for `goa-public-form-page-layout`.** Not started. This app
   is React-only. Template: an existing Angular layout wrapper under
   `libs/angular-components/src/lib/components/`.
2. **Header content vs the Figma "/" screenshot.** `app/app.tsx` currently
   renders `GoabAppHeader heading="Service name"` with no microsite banner. The
   Figma "/" (task-list) screenshot shows an **alpha microsite banner** ("This
   is a new Alberta Government service") and heading **"Apply for a service
   (Demo)"**. Add `GoabMicrositeHeader type="alpha"` above the app header and fix
   the heading text when wiring the real content. (Left as-is here to keep the
   wrapper change surgical.)
3. **Section 1A Screener flow.** Not started. See the gaps section below.
4. **Tests.** No unit test for the Svelte layout, no browser test. The layout's
   slot reach-in behavior (decision 4) in particular needs a browser test.
