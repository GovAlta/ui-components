# GoA Design System skills

AI skills for building Government of Alberta services with the design system. Each one is a `SKILL.md` folder following the [Agent Skills open standard](https://agentskills.io), so it works across Claude Code, Cursor, GitHub Copilot, and other tools that read the format.

A skill is plain-Markdown guidance your AI loads on its own when the work matches. It rides on top of the GoA design system MCP, which supplies the live component facts.

## Skills

| Skill | What it does |
|---|---|
| [`using-goa-design-system`](./using-goa-design-system/) | Turns "I'm building X for users" into the right product type, templates, and components. The navigator. |
| [`content-design`](./content-design/) | Designs user-facing words for their reader, a citizen or a worker. The writer. |

Each skill folder has a `SKILL.md` (the instructions your AI reads) and a `README.md` (what it is, for humans).

## Install

Add a skill, pointed at this repo:

```
npx skills add GovAlta/ui-components --skill using-goa-design-system
npx skills add GovAlta/ui-components --skill content-design
```

It loads on its own when your work matches. Pair it with the GoA design system MCP for the live component facts.

## Stay current

The skills track this repo's `dev` branch, so you can keep them up to date:

```
npx skills update
```

To update automatically, add `npx skills update -g -y` to a SessionStart hook in your AI tool and they refresh every session. An update only lands when a skill's own files change, so everyday repo activity won't churn what you have.

## Contributing

Edit skills here; consuming teams pull from this folder. Skill updates reach teams on the skill's own cadence, independent of component releases.
