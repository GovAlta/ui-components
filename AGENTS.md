# AGENTS.md

Standards and workflows for AI coding agents working in this repo. Read the
relevant files below before making changes; they are the source of truth.

## Read first

1. `CLAUDE.md` (repo root): architecture, the wrapper pattern, development
   standards, props conventions, and the pre-PR checklist.
2. Every file in `.claude/rules/`: the detailed standards behind `CLAUDE.md`.

## Task workflows: `.claude/skills/`

Each subdirectory holds one step-by-step workflow for a specific task. List the
directory and read the `description` at the top of each `SKILL.md` (it says, in
"use when..." form, when the skill applies); follow any that match your task.

## Design system usage skills: `skills/`

Each subdirectory helps you build with the design system rather than change the
repo. Select the same way, by reading each `SKILL.md`'s `description`. These rely
on the `goa-design-system` MCP tools; skip this section if your tool does not
have them configured.
