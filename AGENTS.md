# AGENTS.md

Guidance for AI coding agents working in this repository.

This repo keeps its development standards and workflows in a set of Markdown
files. Claude Code loads them automatically; other tools do not. If you are any
agent other than Claude Code, read the files below before making changes. They
are the source of truth, so this file points to them rather than repeating them
(a copy here would drift out of date).

## Read first

1. `CLAUDE.md` (repo root) — architecture, the wrapper pattern, development
   standards, props conventions, and the pre-PR checklist.
2. Every file in `.claude/rules/` — the detailed standards that back up
   `CLAUDE.md`:
   - `component-authoring.md` — Svelte component structure, props, events, naming.
   - `styling.md` — design tokens, V2 fallbacks, responsive patterns, CSS.
   - `framework-wrappers.md` — React and Angular wrapper templates.
   - `testing.md` — test tiers and enforced test patterns.
   - `common-utilities.md` — shared utilities to use instead of reinventing.

## Task workflows: `.claude/skills/`

Each skill is a step-by-step workflow for a specific contributor task. When your
task matches one, read that skill's `SKILL.md` (in its own directory under
`.claude/skills/`) and follow it.

- `fix-bug` — pick up a small, triaged style or refinement bug from the backlog.
- `write-wrapper` — write or update a React or Angular wrapper for a web component.
- `create-component` — create a new design system component across all frameworks.
- `create-playground-page` — add the React and Angular PR playground test pages.
- `writing-specs` — locator conventions for writing component tests and specs.
- `open-pr` — rebase, fill the PR template, and open as a draft.
- `write-issue` — file a new GitHub issue with the right template, labels, and type.
- `write-design-system-content` — write or revise longer-form website content.
- `ds-evolution-reference` — source of truth for design system evolution terms and FAQs.

## Design system usage skills: `skills/`

These help you build with the design system rather than change the repo itself.
These rely on the `goa-design-system` MCP tools. If your tool does not have
those tools configured, skip this section.

- `using-goa-design-system` — go from a user-facing intent to the right
  components, guidance, and tokens.
- `content-design` — design user-facing service copy for its reader (citizen or
  worker).

## The rule of thumb

`CLAUDE.md` and `.claude/rules/` tell you the standards. `.claude/skills/` and
`skills/` tell you the procedures. Read the relevant ones before you write code,
and keep every changed line justified by the task you were given.
