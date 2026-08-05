# React UI Components

[![npm version](https://img.shields.io/npm/v/@abgov/react-components?color=%230081a2&label=react-components&style=flat-square)](https://www.npmjs.com/package/@abgov/react-components)

React wrappers for the Government of Alberta Design System web components.

Supported React versions: 17, 18, and 19.

## Install

```bash
npm i @abgov/react-components @abgov/web-components @abgov/ui-components-common @abgov/design-tokens
```

## Register the web components

Import the underlying web components once in your application entry point, such as
`src/main.tsx`:

```typescript
import "@abgov/web-components";
```

## Add styles

Import the component styles and design tokens in your main stylesheet, such as
`src/index.css`:

```css
@import "@abgov/web-components/index.css";
@import "@abgov/design-tokens/dist/tokens.css";
```

## Add icons

Add Ionicons to the `<head>` of `index.html`:

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

## Use a component

```tsx
import { GoabButton } from "@abgov/react-components";

export function App() {
  return <GoabButton type="primary">Continue</GoabButton>;
}
```

See the [developer setup guide](https://design.alberta.ca/get-started/developers/setup/) and
[Government of Alberta Design System](https://design.alberta.ca) for more information.
