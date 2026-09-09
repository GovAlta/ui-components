# Angular UI Components

[![npm version](https://img.shields.io/npm/v/@abgov/angular-components?color=%230081a2&label=angular-components&style=flat-square)](https://www.npmjs.com/package/@abgov/angular-components)

Angular wrappers for the Government of Alberta Design System web components.

Supported Angular versions: 18, 19, 20, and 21.

## Install

```bash
npm i @abgov/angular-components @abgov/web-components @abgov/ui-components-common
```

## Register the web components

Import the underlying web components once in your application entry point, before
bootstrapping the application:

```typescript
// src/main.ts
import "@abgov/web-components";
```

Keep your existing `bootstrapApplication` call after this import.

## Import wrapper components

The Angular wrappers are standalone components. Import each wrapper directly into the
standalone component that uses it:

```typescript
// src/app/app.ts
import { Component } from "@angular/core";
import { GoabButton } from "@abgov/angular-components";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [GoabButton],
  template: `<goab-button type="primary">Continue</goab-button>`,
})
export class App {}
```

`standalone: true` is shown explicitly for compatibility with Angular 18; it is the default
in newer Angular versions.

For an existing NgModule-based application, add each standalone wrapper component to that
module's `imports` array. `AngularComponentsModule` is only needed by applications that
still use the legacy `goaValue`, `goaValueList`, or `goaChecked` form directives.

## Add styles

Import the component styles in `src/styles.css`. This stylesheet includes the design tokens and dark theme overrides:

```css
@import "@abgov/web-components/index.css";
```

## Add icons

Add Ionicons to the `<head>` of `src/index.html`:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.esm.js"
></script>
<script
  nomodule
  src="https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.js"
></script>
```

See the [developer setup guide](https://design.alberta.ca/get-started/developers/setup/) and
[Government of Alberta Design System](https://design.alberta.ca) for more information.
