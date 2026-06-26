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
  <goa-app-footer version="2" maxcontentwidth="100%">
    <goa-app-footer-meta-section slot="meta">
      <a href="#">Give feedback</a>
      <a href="#">Accessibility</a>
      <a href="#">Privacy</a>
      <a href="#">Contact us</a>
    </goa-app-footer-meta-section>
  </goa-app-footer>
</template>
