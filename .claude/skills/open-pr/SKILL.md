---
name: open-pr
description: Use when opening a pull request for a fix or feature in GovAlta/ui-components. Covers rebasing onto latest dev (to avoid stale-branch CI failures), filling the PR template, the draft-and-do-not-mark-ready convention, and commit and PR message style.
---

# Skill: Open a pull request

## 1. Rebase onto latest dev first

Rebase before opening the PR, and before every subsequent push. A branch that has fallen behind `dev` fails CI checks (for example Docs Freshness) even when the diff is correct.

```bash
git fetch origin
git rebase origin/dev
```

Resolve conflicts, re-run the relevant tests, then push.

## 2. One focused commit

One fix or feature per PR, ideally one commit. Amend or squash follow-ups rather than stacking noise.

Commit message: `fix(#{N}): short imperative description` (or `feat(#{N}): ...`, `chore(#{N}): ...`). Include the issue number. The branch name does not need the issue number.

## 3. Fill the PR template in full

- **Before / After** section, with screenshots for any visual change.
- **Steps needed to test**, numbered.
- Check the template boxes you have actually done (setup steps read, unit tests created, tested in React and Angular).
- Include `Fixes #{N}` in the body so the issue closes on merge.
- Attach or link the React and Angular playground pages (see the `create-playground-page` skill).

## 4. Open as draft, do not mark ready

Open the PR in **draft** state. Do not mark it ready for review. The person who owns the work verifies the diff and marks it ready themselves.

If `gh` is unavailable, push the branch and report that the PR must be opened manually.

## 5. Style

No em dashes or en dashes anywhere in the commit message or PR body. Use periods, commas, or colons.
