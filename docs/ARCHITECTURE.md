# Docs Site — How It Works

Practical guide for the team on how this site is built, where content comes from, and how to make changes.

**Location:** `ui-components/docs/` (not the old `ui-components-docs/` SPA)
**Stack:** Astro + MDX + React islands
**Dev server:** `npm run dev` → http://localhost:4203

---

## How the site is structured

The docs site pulls content from three types of sources:

```
Svelte source code                    Manual MDX content
(libs/web-components/)                (docs/src/content/)
        │                                     │
        ▼                                     ▼
  extract-api.ts                     Astro content collections
        │                          (components, guidance, examples)
        ▼                                     │
  generated/component-apis/*.json             │
        │                                     │
        └──────────────┬──────────────────────┘
                       ▼
              Astro static build
              (pages assembled from all sources)
```

### Content sources at a glance

| Content                              | Source                                                    | Automated?                    |
| ------------------------------------ | --------------------------------------------------------- | ----------------------------- |
| Component API (props, events, slots) | Extracted from Svelte → `generated/component-apis/*.json` | **Yes** — runs on every build |
| Component descriptions & metadata    | `src/content/components/*.mdx`                            | Manual                        |
| Guidance atoms (~130+)               | `src/content/guidance/*.mdx`                              | Manual                        |
| Examples (~80)                       | `src/content/examples/*/`                                 | Manual                        |
| Configuration previews (~65)         | `src/data/configurations/*.ts`                            | Manual (curated)              |
| Design tokens                        | `@abgov/design-tokens-v2` npm package                     | Yes (npm import)              |
| Search index                         | `search-index.json`                                       | Yes (build step)              |

---

## Build pipeline

```bash
npm run build
```

This runs three steps in sequence:

1. **`npm run extract-api`** — Runs `tsx src/scripts/extract-api.ts --all`. Scans every Svelte component in `libs/web-components/src/components/`, extracts props/events/slots, writes JSON to `docs/generated/component-apis/`.
2. **`astro check`** — TypeScript type checking.
3. **`astro build`** — Static site generation. Content collections are processed, dynamic routes are pre-rendered, output goes to `ui-components/dist/docs`.

The generated API JSON files are **committed to git** so changes are visible in PR diffs. They're also regenerated on every build to ensure freshness.

> **Note:** The `extract-api` step was added in PR #3513. If you're on a branch that predates this merge, you'll need to manually create or copy the JSON files in `docs/generated/component-apis/` for the dev server to show API data.

### Vite aliases

The site resolves monorepo packages directly via aliases in `astro.config.mjs`:

- `@abgov/react-components` → `libs/react-components/src/index.ts`
- `@abgov/web-components` → `dist/libs/web-components/`
- `@abgov/style` → `dist/libs/web-components/index.css`
- `@design-tokens` → `node_modules/@abgov/design-tokens-v2/dist`

**Important:** `@abgov/web-components` points to `dist/`, so you need to build web components first (`npm run build` from the root) for the docs site to work.

---

## Content collections

Defined in `src/content/config.ts`. Three collections:

### Components (`src/content/components/*.mdx`)

One MDX file per component. Mostly frontmatter — the page template pulls in API data, guidance, examples, and configurations automatically.

```yaml
---
name: Button
description: Carry out an important action or navigate to another page.
status: stable # stable | beta | deprecated | experimental
category: inputs-and-actions # determines nav section
tags: [action, submit]
relatedComponents: [button-group, icon-button]
figmaUrl: https://www.figma.com/...
githubUrl: https://github.com/...
webComponentTag: goa-button
reactClassName: GoabButton
angularSelector: goab-button
hidden: true # optional — hide from nav (used for subcomponents, deprecated, internal)
subcomponent: true # optional — show API on parent component page
---
```

The MDX body is usually empty. Any content you add appears at the bottom of the "Usage guidelines" tab.

**Subcomponents:** Some components are children that developers compose with a parent (e.g., Tab inside Tabs, Footer Nav Section inside Footer). These have `hidden: true` (not in nav) and `subcomponent: true` (API shown on parent page). The parent discovers subcomponents via its `relatedComponents` array. See "Add a subcomponent" below for how this works.

### Guidance (`src/content/guidance/*.mdx`)

Atomic pieces of design knowledge — do's, don'ts, tips, warnings. These are linked to components via `appliesTo.components` and appear on those component pages automatically.

```yaml
---
id: accordion-content-left-aligned
type: do # do | dont | tip | warning | info
description: Ensure accordion content is left-aligned with the heading.
topic: positioning # determines which section on the page
tags: [accordion, alignment]
appliesTo:
  components: [accordion] # shows on these component pages
status: published # published | draft | deprecated
---
<Preview>
<goa-accordion heading="Personal information" open="true">
Content here...
</goa-accordion>
</Preview>
```

**Topics** determine where guidance appears on the component page. Only these values are recognized by the rendering code in `src/lib/content-queries.ts`:

- **Usage tab:** `types`, `states`, `sizing`, `icons`, `positioning`, `content`, `other`
- **Accessibility tab:** `screen-readers`, `keyboard`, `focus`

The schema in `config.ts` accepts additional topic values (usage, interaction, forms, layout, performance, accessibility, feedback), but any guidance using those topics will be **silently filtered out** and won't render on the page. Stick to the values above.

### Examples (`src/content/examples/*/`)

Each example is a folder with an `index.mdx` + framework code files:

```
src/content/examples/button-with-icon/
├── index.mdx              # Frontmatter + description
├── react.tsx              # React implementation
├── angular.html           # Angular template
├── angular.ts             # Angular component class
└── web-components.html    # Web components implementation
```

```yaml
# index.mdx frontmatter
---
id: button-with-icon
title: Button with Icon
categories: [inputs-and-actions] # content-layout | feedback-and-alerts | inputs-and-actions | forms | structure-and-navigation | technical
scale: interaction # interaction | task | page | service
userType: both # citizen | worker | both
tags: [icons, buttons]
components: [button, icon] # links this example to component pages
accessibilityNotes: |
  Button text provides the accessible name.
status: published
---
```

Example code is loaded at build time via Vite glob imports (`src/lib/example-code.ts`).

---

## Configuration previews

The interactive preview at the top of each component page (dropdown + live preview + code snippet).

**Files:** `src/data/configurations/<component-slug>.ts`
**Registry:** `src/data/configurations/index.ts`

Each file exports an object with preset configurations:

```typescript
export const buttonConfigurations: ComponentConfigurations = {
  componentSlug: "button",
  componentName: "Button",
  defaultConfigurationId: "basic",
  configurations: [
    {
      id: "basic",
      name: "Primary button",
      code: {
        react: `<GoabButton>Submit</GoabButton>`,
        angular: `<goab-button>Submit</goab-button>`,
        webComponents: `<goa-button version="2">Submit</goa-button>`,
      },
    },
    // ... more variants
  ],
};
```

**Note:** Most configuration code uses `Goab*` / `goab-*` prefixes. Some components also include V2-specific variants — check `libs/react-components/src/lib/` for the full list.

**Slots across frameworks:** Each configuration file contains code for all three frameworks, and slots work differently in each:

- **Web Components:** native `slot="name"` attribute — `<div slot="actions">...</div>`
- **React:** slots become JSX props — `actions={<div>...</div>}`
- **Angular:** slots become `TemplateRef` inputs with `ng-template` — `[actions]="actionsTemplate"` and `<ng-template #actionsTemplate>...</ng-template>`

This is a common source of errors when writing configuration code since all three are in the same file.

---

## How to: common changes

### Add a new component page

1. **Create the MDX file:**

   ```bash
   # Create src/content/components/my-component.mdx
   ```

   Add frontmatter with name, description, status, category, framework identifiers. See any existing file for the template.

2. **API data is automatic.** As long as the Svelte component exists in `libs/web-components/src/components/my-component/`, the build extracts its API. The slug must match the folder name.

3. **Add a configuration preview** (optional but recommended):
   - Create `src/data/configurations/my-component.ts`
   - Export a `ComponentConfigurations` object
   - Add the import + export to `src/data/configurations/index.ts`
   - Add the slug to the `configurationRegistry` object in the same file

4. The component appears in the nav and grid automatically. The side nav is built dynamically from the content collection — Astro queries all component MDX files, groups them by `category`, and passes the data to `ComponentsSubMenu` via `nav-categories.ts`. No hardcoded nav lists to update.

### Add a subcomponent

Subcomponents are child components that developers compose with a parent (e.g., `<goa-tab>` inside `<goa-tabs>`). Their API appears on the parent's Properties tab under a separate heading.

**How it works:** The parent lists the subcomponent in its `relatedComponents`. The page template calls `getSubcomponents()`, which filters that list for entries with `subcomponent: true` and loads their extracted API data.

**Example: Tabs and Tab**

The parent (`tabs.mdx`) includes `tab` in its `relatedComponents`:

```yaml
# src/content/components/tabs.mdx
---
name: Tabs
status: stable
category: structure-and-navigation
relatedComponents:
  - tab # <-- this is how the parent discovers the subcomponent
webComponentTag: goa-tabs
---
```

The child (`tab.mdx`) marks itself as hidden and a subcomponent:

```yaml
# src/content/components/tab.mdx
---
name: Tab
status: stable
category: structure-and-navigation
hidden: true # not shown in nav
subcomponent: true # API appears on parent page
relatedComponents:
  - tabs
webComponentTag: goa-tab
---
```

Result: the Tabs page shows "Tab Props", "Tab Slots" (and "Tab Events" if any exist) with a "Subcomponent" badge on each heading.

**To add a new subcomponent:**

1. Create the subcomponent MDX file with `hidden: true` and `subcomponent: true`
2. Add its slug to the parent's `relatedComponents` array
3. Ensure API data exists. If the Svelte component has its own directory (`libs/web-components/src/components/my-sub/`), the extraction script handles it automatically. If it's a nested file inside the parent's directory (like `WorkSideMenuGroup.svelte` inside `work-side-menu/`), you need to manually create the API JSON in `generated/component-apis/my-sub.json`

**Current subcomponent mappings:**

| Parent         | Subcomponents                             |
| -------------- | ----------------------------------------- |
| Header         | App Header Menu                           |
| File uploader  | File Upload Card                          |
| Footer         | Footer Meta Section, Footer Nav Section   |
| Form stepper   | Form Step                                 |
| Menu button    | Menu Action                               |
| Radio          | Radio Item                                |
| Side menu      | Side Menu Group, Side Menu Heading        |
| Tabs           | Tab                                       |
| Work Side Menu | Work Side Menu Group, Work Side Menu Item |

### Hide a component from navigation

Set `hidden: true` in the component's MDX frontmatter. It won't appear in the nav or component grid, but the page still exists if you visit the URL directly.

### Add guidance for a component

1. Create `src/content/guidance/<descriptive-id>.mdx`
2. Set `appliesTo.components` to include the component slug(s)
3. Choose the right `type` (do/dont/tip/warning/info) and `topic`
4. The guidance appears automatically on those component pages, in the correct tab

One guidance atom can apply to multiple components — just list them all in `appliesTo.components`.

### Add a new example

1. Create a folder: `src/content/examples/my-example/`
2. Add `index.mdx` with frontmatter (id, title, categories, scale, components, etc.)
3. Add framework files:
   - `react.tsx` — React implementation
   - `angular.html` + `angular.ts` — Angular template and component
   - `web-components.html` — Web components HTML
4. List the component slugs in the `components` array — this links the example to those component pages
5. Generate a preview image (see below)

All three framework files are optional, but at least one is needed.

### Generate example preview images

Preview images show a screenshot of each example in the grid cards. To generate them:

```bash
cd ui-components/docs

# Generate for all examples (skips manually-provided ones)
npm run generate-previews -- --url http://localhost:4203

# Generate for a specific example
npm run generate-previews -- --url http://localhost:4203 my-example-slug
```

This requires the dev server to be running (`npm run dev`). Images are saved as WebP to `public/images/examples/`. Add `previewImage: /images/examples/my-example.webp` to the example's frontmatter.

**For modals, drawers, or notifications:** the script can't capture these well automatically. Take a manual screenshot (1280x800 viewport), save it as a PNG in `public/images/examples/`, update the frontmatter path to `.png`, and add the slug to the `SKIP_EXAMPLES` list in `src/scripts/generate-preview-images.ts`.

### Update a configuration preview

Edit the relevant file in `src/data/configurations/<slug>.ts`. Each configuration has an `id`, `name`, and `code` with React/Angular/Web Components snippets.

### Add/update a component thumbnail

Place an SVG in `docs/public/thumbnails/<slug>.svg`. The components grid references these.

---

## Key files reference

| What                    | Where                                    |
| ----------------------- | ---------------------------------------- |
| Astro config            | `docs/astro.config.mjs`                  |
| Content schemas         | `docs/src/content/config.ts`             |
| Component page template | `docs/src/pages/components/[slug].astro` |
| Example page template   | `docs/src/pages/examples/[slug].astro`   |
| Content query helpers   | `docs/src/lib/content-queries.ts`        |
| Example code loader     | `docs/src/lib/example-code.ts`           |
| API extraction script   | `docs/src/scripts/extract-api.ts`        |
| Configuration registry  | `docs/src/data/configurations/index.ts`  |
| Configuration types     | `docs/src/data/configurations/types.ts`  |
| JSX workarounds         | `docs/src/global.d.ts`                   |
| Layouts                 | `docs/src/layouts/`                      |
| Generated API JSON      | `docs/generated/component-apis/`         |

---

## How component pages are assembled

The page template (`src/pages/components/[slug].astro`) pulls from six sources:

1. **MDX content** — renders the component's `.mdx` file (mostly frontmatter-driven)
2. **Extracted API** — `getComponentApi(slug)` loads from `generated/component-apis/<slug>.json`
3. **Subcomponent APIs** — `getSubcomponents(relatedComponents)` finds entries with `subcomponent: true` and loads their API data
4. **Guidance** — `getGuidanceForComponent(slug)` filters guidance where `appliesTo.components` includes this slug, then splits into usage vs accessibility topics
5. **Examples** — `getExamplesForComponent(slug)` filters examples where `components` includes this slug
6. **Configurations** — `getComponentConfigurations(slug)` looks up from the registry

These are rendered into four tabs: Properties (including subcomponent APIs), Examples, Usage guidelines, Accessibility.

---

## Framework preference sync

The site has a framework preference switcher (React / Angular / Web Components). The choice is stored in `localStorage` and synced across tabs via `CustomEvent`. See `src/lib/framework-preference.ts`.

Configuration previews and example code tabs both respect this preference — change it once and it applies everywhere.

---

## Workarounds and known issues

### `global.d.ts` — JSX type workarounds

When a React wrapper doesn't support a V2 feature yet, we declare the raw web component in JSX so TypeScript doesn't error. Each entry has a tracking issue:

- `goa-badge` — V2 types not in wrapper ([#3385](https://github.com/GovAlta/ui-components/issues/3385))
- `goa-table` — V2 styling issues ([#3384](https://github.com/GovAlta/ui-components/issues/3384))
- `goa-table-sort-header` — missing sortOrder prop
- `goa-tabs` / `goa-tab` — missing updateUrl and stackOnMobile props

When the wrapper is fixed, remove the corresponding `global.d.ts` entry and switch to the React wrapper.

### Design tokens V2

The docs site uses V2 tokens via an npm alias:

```json
"@abgov/design-tokens-v2": "npm:@abgov/design-tokens@^2.0.0"
```

Referenced in code as `@design-tokens` (Vite alias). This lets us use V2 tokens while the main package is still at V1 for other consumers.

### `client:only="react"` hydration

Some React components (like `ConfigurationPreview`) use `client:only="react"` instead of `client:load`. This avoids SSR hydration mismatches with web components. If you see React state issues during SSR, this is the fix.

### Web components need a build

The docs site resolves `@abgov/web-components` to `dist/libs/web-components/`. If you're seeing missing components in dev, run a build from the repo root first:

```bash
cd /path/to/ui-components
npm run build
```

---

## What's still planned

- **Wrapper-based extraction** — Extract React/Angular prop names from wrappers too, not just Svelte. Blocked on [#3361](https://github.com/GovAlta/ui-components/issues/3361).
- **Automated example screenshots** — Generate preview images for the examples grid automatically.
- **MCP JSON generation** — Generate the MCP server's knowledge base from the docs site content, closing the loop between docs and AI tooling.
