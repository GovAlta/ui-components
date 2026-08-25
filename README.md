# Government of Alberta UI Components

This repository contains the Government of Alberta Design System component libraries for Web Components, React, and Angular.

## Documentation

- Design system docs: [design.alberta.ca](https://design.alberta.ca)
- Developer setup: [design.alberta.ca/get-started/developers/setup](https://design.alberta.ca/get-started/developers/setup/)
- Contribution guidelines: [design.alberta.ca/get-started/contribute](https://design.alberta.ca/get-started/contribute/)
- Issue tracker: [github.com/GovAlta/ui-components/issues](https://github.com/GovAlta/ui-components/issues)

## Published packages

| Package | Use when | npm |
| --- | --- | --- |
| `@abgov/web-components` | You want framework-agnostic custom elements. | [npm](https://www.npmjs.com/package/@abgov/web-components) |
| `@abgov/react-components` | You are building a React application. | [npm](https://www.npmjs.com/package/@abgov/react-components) |
| `@abgov/angular-components` | You are building an Angular application. | [npm](https://www.npmjs.com/package/@abgov/angular-components) |
| `@abgov/ui-components-common` | You need shared types, event detail interfaces, or common utilities used by the component packages. | [npm](https://www.npmjs.com/package/@abgov/ui-components-common) |

`@abgov/styles` is deprecated. Import `@abgov/web-components/index.css` instead.

## Quick start

### Web Components (Vue)

Install the packages:

```bash
npm i @abgov/web-components
```

Register the custom elements in your app entry point, for example `src/main.js`:

```js
import "@abgov/web-components";
```

Import the component styles in your main stylesheet. This stylesheet includes the design tokens and dark theme overrides:

```css
@import "@abgov/web-components/index.css";
```

Add Ionicons to your `index.html` `<head>`:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.js"></script>
```

You can then use the components directly in markup:

```html
<goa-button type="primary">Continue</goa-button>
```

### React

Supported React versions: `17`, `18`, `19`.

Install the packages:

```bash
npm i @abgov/react-components @abgov/web-components @abgov/ui-components-common
```

Register the underlying web components in your app entry point, for example `src/main.tsx`:

```ts
import "@abgov/web-components";
```

Import the component styles in your main stylesheet. This stylesheet includes the design tokens and dark theme overrides:

```css
@import "@abgov/web-components/index.css";
```

Add Ionicons to your `index.html` `<head>`:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.js"></script>
```

Example:

```tsx
import { GoabButton } from "@abgov/react-components";

export function App() {
  return <GoabButton type="primary">Continue</GoabButton>;
}
```

### Angular

Supported Angular versions in the current docs: `18`, `19`, `20`, `21`.

Install the packages:

```bash
npm i @abgov/web-components @abgov/angular-components @abgov/ui-components-common
```

Add Ionicons to `src/index.html`:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.js"></script>
```

Update your app module:

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import "@abgov/web-components";
import { AngularComponentsModule } from "@abgov/angular-components";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularComponentsModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

If your Angular app uses standalone bootstrapping instead of `AppModule`, use the same package installs, web component import, styles, and Ionicons setup, then adapt the module example to your bootstrap configuration.

Import the component styles in `src/styles.css`. This stylesheet includes the design tokens and dark theme overrides:

```css
@import "@abgov/web-components/index.css";
```

## Local development

This repo uses Nx

Install dependencies:

```bash
npm install
```

Useful local commands:

- `npm run serve:docs` to run the docs site locally.
- `npm run dev:watch` to rebuild `web-components` while developing against a preview app.
- `npm run serve:prs:react` to run the React preview app.
- `npm run serve:prs:angular` to run the Angular preview app.
- `npm run test:pr` to run all tests (unit, browser, etc...).
- `npm run build` to build affected projects.
- `npm run validate` to run the full validation pipeline.

## Support and maintenance

This repository is provided as-is. There is no guarantee of ongoing maintenance, support, compatibility updates, or responses to issues or pull requests.

Point of contact: [Sheldon Bauld](sheldon.bauld@gov.ab.ca)

## License

MIT
