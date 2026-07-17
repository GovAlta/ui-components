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
this app *is* the public form, so its root is the form's root. Note: the app
imports the compiled web components from `dist/`, so run `nx build
web-components` after any change to the Svelte layout below.

---

## READ THIS FIRST: a `goa-public-form` family already ships in libs/

While building the layout we found that a full public-form component family
**already exists and ships** in `libs/`:

- `goa-public-form` (`libs/web-components/src/components/form/Form.svelte`)
- `goa-public-form-page` (`.../form/FormPage.svelte`)
- `goa-public-form-summary` (`.../form/FormSummary.svelte`)
- `goa-public-form-task` / `goa-public-form-task-list`
- `PublicFormController` (`libs/common/src/lib/public-form-controller.ts`)
- `use-public-form-controller` hook + React + Angular wrappers

`goa-public-form-page` already has `heading`, `subHeading`, `sectionTitle`,
`backUrl`, `buttonText`, `buttonVisibility`, `summaryHeading` props: it does much
of what the gallery's hand-rolled `PublicFormLayout` + `FormSet` re-invent.

The gallery deliberately avoided this family (`"no GoabPublicForm"` in the repo
CLAUDE.md), building from primitives to act as a *spec* for future components.
But for a **real** form, the open question is: **build on the existing family,
or keep hand-rolling?** This reconciliation is the single biggest decision left
and should happen before much more of Section 1A is built.

---

## What is done

| Area | State | Files |
| --- | --- | --- |
| Nx app scaffold (port 4203) | Done | `project.json`, `vite.config.ts`, `tsconfig*`, `index.html`, `.eslintrc.json` |
| Entry + router split | Done | `src/main.tsx` (mount + router only), `src/app/app.tsx` (shell + route table) |
| App shell | Done | `src/app/app.tsx`: microsite alpha banner + app header + footer |
| Task-list home ("/") | Done | `src/routes/task-list.tsx` |
| `goa-public-form-page-layout` Svelte component | Done | `libs/web-components/src/components/public-form/PublicFormPageLayout.svelte` |
| React wrapper `GoabPublicFormPageLayout` | Done | `libs/react-components/src/lib/public-form/public-form-page-layout.tsx` (exported from react index) |
| `app/app.tsx` uses the wrapper | Done | header passed with NO maxContentWidth, to prove the layout auto-fills 704px |

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

---

## Key decisions and why (do not silently undo these)

1. **Separate Nx app, not a `demo/` folder in the gallery app.** A real form's
   root should be `/`, not `/public-form/demo`. Keeping it separate also means
   the gallery app is untouched.

2. **Config-driven router, one URL per question.** Each question is its own
   route (`/live-in-alberta`, `/date-of-birth`, ...) so browser back, refresh,
   bookmarking, and screen-reader page-change announcements all work. The route
   table is *generated* from a `QUESTIONS` config array (`QUESTIONS.map(...)`),
   not written by hand, so adding a question does not touch the router. This
   works identically in Angular (`Routes` is already a data array) so the
   approach is not React-only. Use the map-to-N-routes form, not a single
   `:questionId` param route (the param route does not remount the component on
   navigation, in both React and Angular).

3. **`ScrollToTop` stays at the framework layer, forever.** It depends on the
   router's location, and client-side navigation via `history.pushState` fires
   no event a web component could observe. It cannot move into the layout.

4. **The layout auto-sets the header width (`headerwidth`, default 704px).**
   `PublicFormPageLayout.svelte` reaches into its `header` slot on mount + on
   `slotchange`, finds a `goa-app-header`, and sets its `maxcontentwidth` **only
   if the consumer did not set one** (escape hatch). This was a deliberate
   choice, weighed against two rejected alternatives:
   - *Relay to app-header* ("tell app-header it is inside a public form"):
     rejected because it makes the foundational, widely-used app-header depend
     on this niche component (wrong dependency direction).
   - *Consumer sets 704 by hand*: rejected because then the layout does not
     serve its purpose of owning page alignment.
   The reach-in approach touches **zero** app-header code (safest for a
   sensitive, bug-history component) and keeps the escape hatch. Its one
   accepted tradeoff: the header width is set from outside the consumer's JSX
   ("spooky action") which can surprise a reader of `app.tsx`. This was an
   informed, accepted tradeoff, not an oversight.

5. **640 and 704 are two independent values, not one derived from the other.**
   The app-header's internal padding toggles between 0 and 96px depending on
   mode (`AppHeader.svelte` around lines 241/536), so `704` is not `640 + gutter`
   by any stable formula. Both live as explicit props on the layout
   (`contentwidth`, `headerwidth`); do not try to compute one from the other.

## Naming caveats

- `goa-public-form-page-layout` is one word off `goa-public-form-page` (an
  existing shipped component). It is **provisional**; rename when the family is
  reconciled (see the critical finding above). It currently sits in a new
  `components/public-form/` folder, deliberately kept out of `components/form/`.

## Section 1A Screener: the four known code gaps

The flow is a branching screener (see the Figma diagram). Generalize
`apps/prs/react/src/routes/public-form/examples/eligibility-task.tsx` (its `NEXT`
branch graph + `STEPS`/`resolveNext`/`reachable` walkers are the right shape)
into a pure-data `QUESTIONS` config. Four things the current gallery code cannot
yet express:

1. **Radio with N options.** `STEPS.field` is only `"yesno" | "text"`;
   `education-level` needs 5 options.
2. **Date of birth + 5 distinct validation errors** (empty, incomplete, invalid
   day, invalid year, outside range). `validation.ts` only has `required` /
   `pattern`.
3. **Multiple `result-not-eligible` messages.** `examples/ineligible.tsx`
   hardcodes one message; the diagram has 4. It must take the message as a prop.
4. **`helperText` and `Details` passthrough.** The `Question` component in the
   gallery does not pass `helperText` or a `GoabDetails` block through, both of
   which the diagram uses (`live-in-alberta` helper text, `current-employment`
   self-employed details).

The reusable gallery pieces (`FormSet`, `ErrorSummary` + `useErrorSummaryFocus`,
`validation.ts` schema, `FormSummary`, `ResultsPage`, the branch walkers) are
solid and should be reused rather than rebuilt.

Figma: Pattern - Public Form v1, node 3153-146050 (private; needs a Figma login
or exported screenshots).