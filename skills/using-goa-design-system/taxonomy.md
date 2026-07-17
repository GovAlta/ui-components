# GoA Design System: Layered Taxonomy

A fast lookup for this skill. Treat the docs site as the source of truth; this file is a cache for orientation.

## Contents

- Sizes
- Product types
- User type
- Intent → product type
- Aliases (slugs)
- Pages within each product (today)
- What this file is NOT

## Sizes

The five-value `size` enum, smallest to biggest:

| Size | Definition | Has page-like fields? |
|---|---|---|
| `interaction` | A single control or affordance behaving correctly | No |
| `section` | A composed region of a page | No |
| `page` | One full screen | Yes |
| `task` | A complete user job from intent to completion. Lives in the tasks collection | Yes |
| `product` | End-to-end digital product | Yes |

"Page-like fields" means the entry can carry: `previewUrl`, `reactSourceUrl`, `angularSourceUrl`, `sourceUrl`, `stackblitzUrl`, `frameworks: ("react" | "angular" | "web-components")[]`.

## Product types

Product types are a **content collection** (not just a field on examples). Each one has an introductory narrative, a hero image, demo URL, and listed components. Examples link to a product type via the `productType` field, constrained today to:

| Product type | Audience | Use for |
|---|---|---|
| `workspace` | Internal workers | Case management, dashboards, queues |
| `public-form` | Citizens | Form-first flows like applications and renewals |

Other product types (e.g. `error-pages`) may exist as example overviews without yet being a productTypes collection entry. When in doubt, query the productTypes collection via `goa-design-system:get`.

## User type

**Don't ask the developer for user type. Derive it.**

| Product type | User type |
|---|---|
| `workspace` | worker |
| `public-form` | citizen |
| (none / interaction-only) | both |

This derivation replaces the previous `userType` field on examples.

## Intent → product type

A fast routing table from common intent shapes to the product type they usually land in. When neither fits, name the gap rather than forcing one.

| Intent shape | Likely productType |
|---|---|
| "case management", "intake", "review and decide", "queue" | `workspace` |
| "apply for X", "register for Y" | `public-form` |
| "renew", "report status" | `public-form` |
| "claim", "request support" | `public-form` |
| "schedule X", "book a Y" | `public-form` (booking) or `workspace` (queue) |

## Aliases (slugs)

Old slugs are preserved in the `aliases` array on entries for search continuity and URL redirects. When a developer references a slug that doesn't resolve directly, look up entries whose `aliases` contains that slug. Common cases include:

- `confirm-that-an-application-was-submitted` → `result-page`
- `ask-a-user-one-question-at-a-time` → `question-page` (one of the nine inline variants)
- `give-more-information-before-asking-a-question-a` → `question-page`
- 9 question-page variants now live as inline sections inside `/examples/question-page/`
- 401, 404, 500 now live as inline sections inside `/examples/error-pages/`

The MCP should treat aliases as additional searchable IDs.

## Pages within each product (today)

Workspace product:
- `dashboard`
- `index-page`
- `case-detail`

Public-form product:
- `start-page`
- `task-list-page`
- `question-page` (with 9 inline variants)
- `review-page`
- `result-page`

Each is `size: page` with `productType: <product>`.

## What this file is NOT

- Not the spec for any component. Use `goa-design-system:get` on the component entry.
- Not the list of guidance atoms. Use `goa-design-system:search` and `goa-design-system:get`; the skill surfaces guidance during navigation.
- Not a versioned source of truth. When in doubt, query the docs site or the MCP.
