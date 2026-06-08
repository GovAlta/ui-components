---
name: ds-evolution-reference
description: Use to answer questions about the Government of Alberta Design system evolution, including approved terminology, the migration timeline and support windows, version changes for Web components, Angular, and React, and what the change means for product teams. Source of truth for evolution terms, FAQs, and glossary definitions.
---

# DS evolution reference: terminology and FAQs

This file is the source of truth for design system evolution terminology and answers. Skills that write or answer questions about the evolution should pull terms and facts from here.

## Approved terms

Use one term per concept. Do not invent synonyms.

| Concept | Use this term | Avoid | Notes |
|---|---|---|---|
| The design system as a product | Government of Alberta Design System | Alberta Design System | Shorthand: GoA Design System in formal or public content, "Design system" in internal team writing. Spell out the full name on first use in public-facing content |
| The modernized system launching March 2026 | updated design system | DS 2.0, v2, new design system | |
| The existing system being replaced | legacy design system | DS 1.0, old system, current design system | Avoid "current" entirely. Its meaning drifts: since the March 2026 launch, "current" points to the updated system, not the legacy one |
| Revised global token set | tokens v2 | new tokens (when precision is needed) | |
| Tokens scoped to a component | component tokens | per-component tokens | |
| Framework-agnostic core elements | Web components | web parts | |
| Framework bindings | wrappers | adapters, shims | Angular and React wrappers |
| Reusable UI building blocks | components | widgets, controls | |
| Reusable cross-screen solutions | patterns | flows | |
| Opinionated starting points | templates | starters, boilerplates | |
| Bug fixes only, no new features | limited support | partial support | |
| The recommended upgrade period | migration window | upgrade window, transition period | March to September 2026 for active products |

## Frequently asked questions

### What does this mean for product teams?

The updated design system is now the official Government of Alberta (GoA) standard.

- New products starting after March 2026 should use the updated design system.
- Existing teams will receive documentation, guidance, and migration support to update their products.
- Products that no longer have an active product team building features or making fixes will not need to, or be in a position to, update to the updated design system.

### What do you mean by "templates"?

Templates are opinionated starting points that package layout, navigation, spacing, and example content for common service types, for example public-facing forms and workspace apps.

They are thoroughly documented, so teams can get a jump start on designing and building their products using a proven structure.

### Is there a migration window?

Ideally, all active teams migrate within six months of launch, by **September 2026**.

### What happens if I don't update?

You will miss out on new features and improvements, face growing compatibility gaps, and receive limited support. Delaying the update increases maintenance costs and risk, and your service will not meet the new standard.

#### March 2026 to September 2026

- Updates to Web components 2.x will continue during this period.
- No updates to Angular 4.x and React 6.x (no fixes or new features).
- The Angular and React major version update is small. Most of the effort will go toward aligning the non-design-system parts of your application to the updated visual design.

#### September 2026 onward

- No support for fixes or features for teams using Web components 2.x.
- No updates to Angular 4.x and React 6.x (no fixes or new features).
- Web components will undergo a major version update.

### We don't have a funded team assigned to our product. How do we stay aligned?

This is expected in some cases. Some products that no longer have an active product team building features or making fixes will not need to, or be in a position to, update. If no team is funded, you may remain on the legacy design system.

### Will the legacy design system be frozen after launch?

Functionally, yes. After March 2026, the legacy design system will receive bug and security fixes to the Web components only, until September 2026. After September, there will be no further support.

### How big is the upgrade?

It depends on your current use of the design system and the number of customizations. Typical tasks include replacing deprecated components, adjusting spacing and typography, and updating custom code to align with the updated visual design.

This is a significant update that involves effort across design, development, and testing. A migration guide will be available to teams before the official launch in March 2026 to smooth the update process.

### What we ask of teams

- **Plan early:** Pencil in your upgrade window now, ideally between March and September 2026.
- **Coordinate:** Work with your ministry or platform teams for support and governance.

---

## Glossary

### Updated design system

The modernized design system launching in March 2026. It includes an updated design language, new tokens, refreshed components, and ready-to-use templates. The updated design system is the standard from March 2026 onward.

### Legacy design system

The existing design system being replaced. During the March to September 2026 transition window it receives security and critical bug fixes, to Web components only. After September 2026, it is no longer supported.

### Design tokens

Named variables that capture reusable style decisions, for example colour, spacing, and typography. The updated design system introduces a revised token set ("tokens v2").

### Component tokens

Tokens scoped to a specific component, for example button padding or card shadow. They let the system tweak specific aspects of a component's design in isolation.

### Web components (core library)

Framework-agnostic custom elements that implement design system components. Most functionality lives here, and framework wrappers are built on top of this layer.

### Wrappers (Angular and React)

Thin framework bindings around the Web components that improve developer experience (types and props). Legacy design system wrappers receive no new features after the official launch in March 2026. Production wrappers for the updated design system ship at launch.

### Components

Reusable UI building blocks, for example button, menu, and date picker, that follow tokens, accessibility guidance, and interaction patterns.

### Patterns

Reusable solutions to common user tasks across screens, for example form validation, navigation, and error handling. Patterns are often composed of multiple components.

### Templates

Opinionated starting points for common service types, such as public-facing forms and workspace applications, packaging layout, navigation, spacing, and example content so teams can start fast.

### Public-form template

A template for step-by-step forms used by the public.

### Workspace template

A template for internal and productivity apps. It includes common structures like headers, navigation, data views, and task panels.

### Limited support

A support level that provides bug fixes only, with no new features. This applies to the legacy design system from March to September 2026.

### Migration guide

Step-by-step instructions for upgrading from the legacy design system to the updated design system.

### Migration window

A planned period when a product schedules and runs its upgrade. For active products, the recommended migration window is March to September 2026.

### Support window

The defined period a version receives fixes. For Web components 2.x, the support window is March to September 2026. There is no support after September 2026.

### Active product

A funded, maintained service that is shipping features and/or fixes. Active products are expected to migrate to the updated design system by September 2026.

### Ministry platform team

A ministry-level team that provides shared tooling, hosting, and hands-on help. Platform teams can support design system upgrades and coordinate adoption across products.
