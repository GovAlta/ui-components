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
  <goa-one-column-layout>
    <section slot="header">
      <goa-app-header version="2" url="/" heading="Service name">
        <a href="/login">Sign in</a>
      </goa-app-header>
    </section>
    <goa-page-block width="704px">
      <p>
        <goa-skeleton type="header" size="4"></goa-skeleton>
        <goa-skeleton type="text" size="1"></goa-skeleton>
      </p>
      <p>
        <goa-skeleton type="header" size="4"></goa-skeleton>
        <goa-skeleton type="text" size="1"></goa-skeleton>
      </p>
      <goa-grid min-child-width="30ch">
        <goa-skeleton type="card" size="2"></goa-skeleton>
        <goa-skeleton type="card" size="2"></goa-skeleton>
      </goa-grid>
    </goa-page-block>
    <section slot="footer">
      <goa-app-footer version="2"></goa-app-footer>
    </section>
  </goa-one-column-layout>
</template>
