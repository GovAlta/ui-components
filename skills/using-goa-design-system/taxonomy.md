# GoA Design System: Layered Taxonomy

A fast lookup for this skill. Treat the docs site as the source of truth; this file is a cache for orientation.

## Contents

- Sizes
- Product types
- User type
- Service types (vocabulary layer)
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

## Service types (vocabulary layer)

A service type names what a citizen or worker is trying to accomplish in service terms. The Kate Tarling "Common Service Types" framework names nine:

1. Registering, providing, or reporting information
2. Requesting, sharing, or checking information
3. Paying for something
4. Getting financial support or claiming something
5. Getting permission to do something
6. Scheduling something
7. Buying or ordering something
8. Becoming something
9. Protecting something

**They are not modelled in the design system schema yet, but the skill leads with this framing.** When intent is recognizable in service-type terms, name it explicitly using this vocabulary as the first navigation step, then map to a `productType` as the next explicit step. When the framework is formalized in the schema (likely via a separate service-mapping data source), the skill will become more opinionated about expected building blocks per type.

Map intent to productType:

| Intent shape | Service type (informal) | Likely productType |
|---|---|---|
| "case management", "intake", "review and decide", "queue" | Requesting / sharing information; sometimes Getting permission | `workspace` |
| "apply for X", "register for Y" | Getting permission, Becoming something | `public-form` |
| "renew", "report status" | Registering / providing information | `public-form` |
| "claim", "request support" | Getting financial support | `public-form` |
| "schedule X", "book a Y" | Scheduling something | `public-form` (booking) or `workspace` (queue) |

Don't promote service types into a structured field; use them as intent vocabulary until the framework is formally adopted in the schema.

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
