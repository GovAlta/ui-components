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
  <goa-hero-banner heading="Supporting Businesses">
    Resources are available to help Alberta entrepreneurs and small businesses start, grow
    and succeed.
    <div slot="actions">
      <goa-button version="2" type="start" @_click="onCtaClick">Call to action</goa-button>
    </div>
  </goa-hero-banner>
</template>

<script setup lang="ts">
function onCtaClick() {
  console.log("Call to action clicked");
}
</script>
