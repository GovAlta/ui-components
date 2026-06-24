<!--
Prerequisites:
- npm install @abgov/web-components @abgov/design-tokens
- Vite: isCustomElement for goa-* tags (see setup docs)
- Import "@abgov/web-components" in main.ts
- Import CSS: @abgov/web-components/index.css + design-tokens/tokens.css
- Add ionicons CDN to index.html
- Full guide: get-started/developers/setup
-->

<template>
  <goa-button-group alignment="start">
    <goa-button version="2" leadingicon="arrow-back">Go back</goa-button>
    <goa-button version="2" trailingicon="arrow-forward">Continue</goa-button>
    <goa-button version="2" type="secondary" leadingicon="add">Add item</goa-button>
  </goa-button-group>
</template>
