# using-goa-design-system

The skill that turns "I'm building X for users" into the right Government of Alberta product type, templates, and components. It is the "how should I approach this" layer. The GoA design system MCP is the "what is this" layer underneath it.

## In a sentence

For anyone building with the design system: tell your AI what you're making in plain terms ("a renewal form for citizens", "a case queue for workers") and it works out the right GoA product type, the matching page and section templates, and the exact components with their props and gotchas, before it writes any code.

Under the hood: it is the composition layer to the MCP's knowledge layer. The MCP answers "what is this component"; this skill answers "I'm building this, how should I approach it," following the design system's service-first method so an AI tool uses our conventions by default.

## What it does

When you describe what you're building in user-facing terms, the skill walks the design system's structure top-down instead of jumping to a component:

1. Names the service type: what the user is trying to accomplish, in service language ("getting permission", "requesting information", "getting financial support"). This uses Kate Tarling's Common Service Types vocabulary.
2. Maps that to a product type: workspace (worker-facing) or public-form (citizen-facing), saying the translation out loud, and naming a gap if it does not fit cleanly.
3. Pulls the matching templates by size (interaction, section, page, task, product) from the MCP.
4. Pulls each component's real props, token references, and embedded guidance (the do's and don'ts) from the MCP, before any code is written.
5. Hands back the plan and the known gotchas first, names what it assumed, and flags decisions a person should make.

A guided descent: service, to product type, to template, to component, to tokens, with the MCP supplying the facts at each step.

## How it works

The MCP is the knowledge layer (facts, through its `search` and `get` tools). This skill is the composition layer (method: which questions to ask, in what order, and how to read the answers). It uses the MCP and never duplicates it. It carries no component specs, only the judgment for navigating to them. That is why it stays small, and why its facts stay current: they come live from the MCP.

The structure it walks:

- Service type: what the user is trying to accomplish (vocabulary layer)
- Product type: workspace (worker) or public-form (citizen)
- Example by size: interaction, section, page, task, product
- Components: the atomic UI building blocks
- Guidance atoms: the do's, don'ts, and tips tied to a component
- Tokens: spacing, color, and sizing values

## What makes it distinctive

- Service-first, not component-first. It establishes product type and template before reaching for a component, so the result follows the system's conventions instead of being correct-looking code that ignores them.
- Derives, does not interrogate. It infers worker-vs-citizen from the product type instead of asking.
- Advisory and transparent. It names its defaults ("I'll scaffold in React, the same works in Angular") and escalates real decisions to people.
- Same content, different lens. A designer gets design language; a developer gets technical language. It reframes, it does not withhold.
- Gotchas before code. It surfaces known failure modes up front, not at review time.
- Names gaps honestly. If no template captures the job, it says so and offers the closest pieces rather than forcing a near-miss.

## The shorthand: a librarian

You arrive with a fuzzy need ("I'm building an intake tool for caseworkers"). A component library hands you a pile of parts. This skill is the librarian: it works out what kind of thing you are really making, walks you to the right shelf, pulls the exact references with their specs, and warns you about the known pitfalls before you start.

## Using it

Install it, pointed at our repo:

```
npx skills add GovAlta/ui-components --skill using-goa-design-system
```

Then describe what you are building in plain terms, and the skill loads on its own when the work matches. Run `npx skills update` to pull the latest. It works alongside the GoA design system MCP, which supplies the live component facts.

## Good to know

- The service-type layer is vocabulary, not data yet. The skill leads with the Kate Tarling service types as a navigation lens; they are not a queryable layer in the MCP. As the service-mapping work formalizes them, the skill will get more opinionated about the building blocks each type expects.
- The bundled `taxonomy.md` is a cache. It is a fast lookup of sizes, product types, and current templates, and it can drift from the docs site. The docs site and the MCP are the source of truth. Keep `taxonomy.md` in sync when product types or templates change.
