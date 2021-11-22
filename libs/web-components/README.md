# goa-web-components

## Linking to other project

Within this project run:
```bash
npm link
```

Within the other project run:
```bash
npm link goa-web-components
```

## Testing your components

You can start a development server with:

```bash
npm run dev
```

Then open your browser to [localhost:5000](http://localhost:5000).

This will build the demo application located in the `demo/` folder, in which you can use and test your components during development.

If you want to add unit tests, you can take a look at [Jest](https://jestjs.io) and [Jest testing library](https://github.com/testing-library/svelte-testing-library).

### Using the built web components with the demo app

The demo application is provided for development and testing of your components, that's why it imports the `.svelte` files from the `lib/` folder directly by default.

If you prefer, you can import the built web components from the `dist/` folder instead, by editing `demo/src/App.svelte` and replacing the `import '../../lib';` statement with `import '../../dist';` if you have the `bundleComponents` option enabled, or individually import your components with `import import '../../dist/MyComponent.wc.js';` otherwise.

You'll also have to make sure to run the `npm run build` script to generate the `dist/` folder first.

## Building the library

The command `npm run build` will create the web components library in the `dist/` folder. It creates both a JavaScript module (`dist/index.mjs`) and a regular UMD script (`dist/index.js`).

The build is automatically called when executing `npm publish` or `npm pack` to distribute your library, thanks to the `prepublishOnly` scripts in `package.json`.

## Notes and limitations

This template does not provide any web components polyfills for older browsers support. It's usually best to leave that task to the host application, hence why they're left out.

### Props

Any props accepted by your web component are automatically transformed to element attributes. Since camelCase or PascalCase does not work in HTML, you have to make sure to name your props in lowercase.

```html
<script>
  export let myvalue = "Default";
</script>
```

### Events

The Svelte syntax event for listening to events like `on:myevent` doesnt work with events dispatched from a Svelte web component ([#3119](https://github.com/sveltejs/svelte/issues/3119)).

You need to use a workaround for that, by creating a `CustomEvent` and dispatching it with the `composed: true` option to cross the shadow DOM boundary.

Here's an example:

```html
// MyComponent.wc.svelte
<svelte:options tag="my-component" />
<script>
  import { get_current_component } from "svelte/internal";

  const component = get_current_component();

  // example function for dispatching events
  const dispatchEvent = (name, detail) => {
    component?.dispatchEvent(new CustomEvent(name, {
      detail,
      composed: true  // propagate across the shadow DOM
    }));
  };
</script>
<button on:click={() => dispatchEvent("test", "Hello!")}>
  Click to dispatch event
</button>
```

## Building each component into its own module

By default this template will build all components into a single module.

If you prefer to build each component into its own module, you can do so by editing `rollup.config.js` and setting the `bundleComponents` option to `false`.

Then you also need to replace the content of `lib/index.js` with:

```js
export default () => {
  import('./MyComponent.wc.svelte');
  // Import each of your component this way
};
```

This will enable code-splitting and will generate an ES module for each component in the `dist/` folder.

As you changed the way components are exported, you also need to replace the `import '../../lib';` statement in `demo/src/App.svelte` to `import import '../../lib/MyComponent.wc.svelte';`.
