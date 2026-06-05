---
name: "create-component"
description: "Create a new design system component"
---

To create a new component you will have to use the following steps:

- Create a new web-component in `libs/web-components/src/components/{component-name}/{component-name}.svelte`
- Add an export reference to the component in `libs/web-components/src/index.ts`
- Create a new React wrapper in `libs/react-components/src/lib/{component-name}/{component-name}.tsx`
- Add an export reference to the component in `libs/react-components/src/index.ts`
- Create a new Angular wrapper in `libs/angular-components/src/lib/components/{component-name}/{component-name}.ts`
- Add an export reference to the component in `libs/angular-components/src/lib/components/index.ts`
- Create a new test file for the web-component in `libs/web-components/src/components/{component-name}/{component-name}.test.ts`
- Create a new browser test file in `libs/react-components/specs/{component-name}.browser.spec.tsx`
- Create the documentation meta page in `docs/src/content/components/{component-name}.mdx`
- Create the documentation examples page in `docs/src/data/configurations/{component-name}.ts`

Make sure to follow the rules including `component-authoring`, `common-utilities`, `testing`, `framework-wrappers` when creating the component and its tests.
