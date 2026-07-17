---
name: using-goa-design-system
description: Use when building or scoping a screen, page, or feature with the Government of Alberta Design System starting from a user-facing intent ("worker tool for case management", "public form for licence renewal", "error page for payment failure") rather than from a specific component or token.
---

# Using the GoA Design System

## Overview

The GoA design system has a layered structure: **product types** (workspace, public-form) → **examples by size** (interaction, section, page, task, product) → **components**, **guidance atoms**, **tokens**. This skill navigates from a user-facing intent down to the right artifacts. The MCP tools (`goa-design-system:search`, `goa-design-system:get`) are the knowledge layer; this skill is the composition layer — it walks the layered structure, surfaces guidance, and confirms specs by reading entries with `goa-design-system:get`.

## When to use

- A developer describes what they're building in user terms ("intake process", "case-management tool", "renewal form")
- A team is scoping a new screen and needs to know what product type and templates apply
- A reviewer is checking whether a screen uses the right layered structure

When NOT to use:

- The developer already names a specific component (`goa-button`, `goa-form-item`) → go straight to MCP `goa-design-system:get`
- Purely token math (sizing, color values) → `goa-design-system:get` the component to see its token references
- A single guidance-atom question → `goa-design-system:search` and `goa-design-system:get` directly

## The layered structure

| Layer           | What it is                                                                          | Examples                                                |
| --------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Product type    | The kind of digital product the service is realized as (its own content collection) | `workspace` (worker), `public-form` (citizen)           |
| Example by size | Scale of artifact                                                                   | `interaction` → `section` → `page` → `task` → `product` |
| Components      | Atomic UI building blocks                                                           | `goa-button`, `goa-form-item`, `goa-table`              |
| Guidance atoms  | Do/don't/tip/warning/info linked to component + topic                               | "use goa-block for spacing, not goa-container"          |
| Tokens          | Sizing, color, spacing values                                                       | `--goa-space-m`, `--goa-color-text-default`             |

Public services typically have two sides: a **citizen-facing** side (applying, renewing, checking) and a **worker-facing** side (processing, reviewing, managing). When the intent names one side, name it. When the intent could apply to either, name both. The product type follows from which side the developer is building for.

`task` is the unit for a complete user job — between a single page and a full product. When an intent is task-shaped (a complete job the user is trying to do), look for it in the tasks collection before composing from pages and components alone.

For full enumeration of sizes, product types, and aliases, see `taxonomy.md`.

## Navigation pattern

1. Read the intent. Determine which side of the service it's for — citizen-facing or worker-facing — and map to a product type: worker tools → `workspace`, citizen-facing form flows → `public-form` (see the routing table in `taxonomy.md`). If the intent doesn't map cleanly to today's product types, name the gap rather than forcing a fit.
2. `goa-design-system:get` the product type from the productTypes collection to surface its summary, demo URL, and listed components.
3. `goa-design-system:search` filtered by `size` and `productType` for sections, non-canonical pages, or filtered queries (step 2 already lists the canonical pages).
4. For each template, `goa-design-system:get` the entry to surface its components, source URLs, preview, and embedded guidance. For each component, `goa-design-system:get` to confirm props, types, and token references before generating code.
5. If a task entry matches the intent, surface it. If no task captures it, name the gap and offer the closest pages so the developer can compose the job themselves.
6. Surface result and gotchas to the developer before generating code. Apply the Decision calibration principles below: name what was defaulted (transparency) and frame through the developer's lens.

## When to use which MCP tool

The MCP is intentionally narrow. Guidance and specs are not separate tools; the skill surfaces them by reading component and template entries with `goa-design-system:get`.

| Tool                       | Use for                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `goa-design-system:search` | Open-ended discovery across the layered structure; supports filters on `size`, `productType`, `status`, etc.                                      |
| `goa-design-system:get`    | Fetching a known entity by ID, alias, or name. Returns the entry's full record — components, sources, props, token references, embedded guidance. |

## Decision calibration

Two principles when responding:

**1. Default transparently, not silently.** When making a choice on the user's behalf (file scaffolding, default props, framework selection), name what was defaulted with a short explanation and a way to override. The line between "matters to decide" and "doesn't matter" is too blurry without full user context, so transparency is the safer floor. Example: "I'll use React for the scaffold; the same patterns work in Angular if you'd prefer."

For consequential choices that warrant team coordination (state-management architecture, content patterns, conventions that affect the whole project), don't default at all. Name the decision and point to who should make it. Example: "this is a state-management architecture decision worth talking through with a developer on your team" or "this is a content-pattern decision worth aligning with a designer."

**2. Frame through the user's lens, but show both layers.** A designer asking sees the full picture (design intent AND a basic sketch of implementation), framed in design language: user goals, interactions, accessibility, patterns. A developer asking sees the full picture too (implementation intent AND the design rationale behind it), framed in technical language: implementation paths, integration, types. Same content, different lens. Don't withhold one layer because the question signals the other; do reframe the language so it lands in the user's perspective.

## Common mistakes

- **Skipping the product type layer.** Going straight to components produces correct-looking code that ignores the system's layered conventions.
- **Asking for user type.** Don't. Derive from product type.
- **Inventing tokens.** Always reference the actual token; never hardcode a value. If a value doesn't fit, use a component-level override; tokens themselves are referenced, not modified by teams.
- **Treating guidance atoms as optional.** They encode known failure modes; surface them before code, not after review.
- **Returning "not found" on an old slug.** Old slugs live in the `aliases` array on entries; treat aliases as additional lookup keys. See `taxonomy.md` for examples.
- **Pretending every job has a task entry.** Many do, but not all. When no task matches, surface the closest pages and name the gap, rather than approximating from a near-miss task.
