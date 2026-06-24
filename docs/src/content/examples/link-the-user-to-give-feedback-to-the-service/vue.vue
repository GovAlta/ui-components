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
  <goa-microsite-header type="alpha" @_feedbackClick="onFeedbackClick"></goa-microsite-header>
</template>

<script setup lang="ts">
function onFeedbackClick() {
  console.log("Feedback clicked");
  alert("Thank you for your feedback!");
}
</script>
