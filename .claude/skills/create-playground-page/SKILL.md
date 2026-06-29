---
name: create-playground-page
description: Use when adding a PR playground test page for a bug fix or feature in apps/prs. Covers the React and Angular wiring, which differ. Every PR needs BOTH a React and an Angular page so reviewers can verify the change in each framework.
---

# Skill: Create a PR playground page

Every fix or feature PR ships a playground page so reviewers can verify it visually. You need **both** a React and an Angular page. They wire up differently, and missing the Angular one is the most common gap.

Use the issue number throughout. Bugs go under `bugs/`, features under `features/`. Naming is `bug{N}` / `feat{N}`, no hyphen.

## React (hand-wired)

Files live flat in `apps/prs/react/src/routes/bugs/` (or `features/`).

1. Copy the template: `cp apps/prs/react/src/routes/_TEMPLATE.tsx apps/prs/react/src/routes/bugs/bug{N}.tsx`
2. Rename the component to `Bug{N}Route` and fill in `ISSUE_NUMBER`, `ISSUE_TYPE`, `ISSUE_TITLE`, `ISSUE_DESCRIPTION` (paste the description from the GitHub issue).
3. Add test cases that demonstrate the fix or feature.
4. Wire it up in `apps/prs/react/src/main.tsx`:
   - add the import: `import { Bug{N}Route } from "./routes/bugs/bug{N}";`
   - add the route in numerical order: `<Route path="bugs/{N}" element={<Bug{N}Route />} />`
5. Add the side-menu link in `apps/prs/react/src/app.tsx` inside the right `GoabSideMenuGroup`: `<Link to="/bugs/bug{N}">{N} {short name}</Link>`.

See `apps/prs/react/src/routes/README.md` for the canonical steps.

## Angular (folder + route.json + generated manifest)

Angular does NOT hand-wire routes in a main file. Each page is a folder with its own `.route.json`, and a build step regenerates the manifest.

1. Create the folder `apps/prs/angular/src/routes/bugs/{N}/` with:
   - `bug{N}.component.ts`
   - `bug{N}.component.html`
   - `bug{N}.component.css` (if needed)
   - `bug{N}.route.json` with `{ "title": "...", "path": "bugs/{N}", "id": "{N}", "type": "bug" }`
2. Copy an existing recent bug folder (for example `apps/prs/angular/src/routes/bugs/2547/`) as the pattern.
3. The route manifest at `apps/prs/angular/src/app/generated/pr-route-manifest.generated.ts` is produced by `scripts/generate-angular-prs-route-manifest.js`. It runs as the `generate-route-manifest` target before build. Do not edit the generated file by hand. If your route does not appear, run the generate step (or a build) to regenerate it.

## Verify before committing

Run each playground and confirm the page loads and the side-menu link navigates:

```bash
npm run serve:prs:react
npm run serve:prs:angular
```
