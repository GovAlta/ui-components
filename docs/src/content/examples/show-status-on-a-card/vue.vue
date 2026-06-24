<!--
Prerequisites:
- npm install @abgov/web-components @abgov/design-tokens
- Vite: isCustomElement for goa-* tags (see setup docs)
- Import "@abgov/web-components" in main.ts
- Import CSS: @abgov/web-components/index.css + /design-tokens/dist/tokens.css
- Add ionicons CDN to index.html
- Full guide: get-started/developers/setup
-->

<template>
  <goa-container type="non-interactive" accent="thick">
    <div slot="title">Heading</div>
    <div slot="actions">
      <goa-badge version="2" type="important" content="Priority"></goa-badge>
    </div>
    Content
  </goa-container>
</template>
