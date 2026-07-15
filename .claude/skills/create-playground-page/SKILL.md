---
name: create-playground-page
description: Use when adding a PR playground test page for a bug fix or feature in apps/prs. Covers the React and Angular wiring, which differ. Every PR needs BOTH a React and an Angular page so reviewers can verify the change in each framework.
---

# Skill: Create a PR playground page

Every fix or feature PR ships a playground page so reviewers can verify it visually. You need **both** a React and an Angular page. They wire up differently, and missing the Angular one is the most common gap.

Use the issue number throughout. Bugs go under `bugs/`, features under `features/`. Naming is `bug{N}` / `feat{N}`, no hyphen, where {N} is the issue number.

See `apps/prs/react/src/routes/README.md` for the canonical steps.

If not provided, ask the user whether this is a bug or a feature, and what the issue number is.

## React (route file and component in routes)

Files live flat in `apps/prs/react/src/routes/bugs/` (or `features/`).

1. Copy the route template: `cp apps/prs/react/src/routes/_TEMPLATE.tsx` to either `apps/prs/react/src/routes/bugs/bug{N}.tsx` or `apps/prs/react/src/routes/features/feat{N}.tsx`.
2. Rename the component inside the file from `TemplateRoute` to `Bug{N}Route` or `Feat{N}Route`.
3. Update header, GitHub link, and description
4. Add component imports and sample test cases

See `apps/prs/react/src/routes/README.md` for the canonical steps.

## Angular (folder + route.json + generated manifest)

Angular does NOT hand-wire routes in a main file. Each page is a folder with its own `.route.json`, and a build step regenerates the manifest.

1. Create the folder `apps/prs/angular/src/routes/bugs/bug{N}/` or `apps/prs/angular/src/routes/features/feat{N}/` with:
   - `bug{N}.component.ts`
   - `bug{N}.component.html`
   - `bug{N}.route.json` with `{ "title": "...", "path": "bugs/bug{N}", "id": "{N}", "type": "bug" }`
2. Copy an existing recent bug folder (for example `apps/prs/angular/src/routes/bugs/2547/`) as the pattern.
3. Copy the same examples from the React steps.

## Verify before committing

Run each playground and confirm the page loads and the side-menu link navigates:

```bash
npm run serve:prs:react
npm run serve:prs:angular
```
