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
  <goa-microsite-header type="alpha">
    <div slot="version">
      <span>Slotted <b>version text</b>.</span>
      <span>v1.23</span>
    </div>
  </goa-microsite-header>
</template>
