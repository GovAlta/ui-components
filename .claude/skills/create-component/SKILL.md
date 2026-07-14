---
name: "create-component"
description: "Create a new design system component"
---

To create a new component you will have to use the following steps:

- Create a new web-component in `libs/web-components/src/components/{component-name}/{ComponentName}.svelte` (use kebab-case for the folder name and PascalCase for the file name)
- Add an export reference to the component in `libs/web-components/src/index.ts`
- Create a new React wrapper in `libs/react-components/src/lib/{component-name}/{component-name}.tsx` (use kebab-case for the folder name and file name)
- Create a new React wrapper spec file in `libs/react-components/src/lib/{component-name}/{component-name}.test.ts` with tests for passing values to the web-component and receiving events from the web-component
- Add an export reference to the component in `libs/react-components/src/index.ts`
- Create a new Angular wrapper in `libs/angular-components/src/lib/components/{component-name}/{component-name}.ts` (use kebab-case for the folder name and file name)
- Create a new Angular wrapper spec file in `libs/angular-components/src/lib/components/{component-name}/{component-name}.test.ts` with tests for passing values to the web-component and receiving events from the web-component
- Add an export reference to the component in `libs/angular-components/src/lib/components/index.ts`
- Create a new test file for the web-component in `libs/web-components/src/components/{component-name}/{ComponentName}.spec.ts`
- Create a new browser test file in `libs/react-components/specs/{component-name}.browser.spec.tsx`
- Create the documentation meta page in `docs/src/content/components/{component-name}.mdx`
- Create the documentation examples page in `docs/src/data/configurations/{component-name}.ts`

Make sure to follow the rules including `component-authoring`, `common-utilities`, `testing`, `framework-wrappers` when creating the component and its tests.create-playground-page.
Create the playground pages for the component using the `create-playground-page` skill.

All behaviour and logic should be in the Svelte web-component, the React and Angular framework wrappers should be as thin as possible.
The framework wrappers should not contain any logic, and should only pass props/events to/from the web-component.
