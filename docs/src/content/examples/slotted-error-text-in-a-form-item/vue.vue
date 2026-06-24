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
  <goa-form-item version="2" label="First name">
    <goa-input version="2" name="item" error="true" @_change="onChange"></goa-input>
    <div slot="error">
      <span>This is </span>
      <i>slotted </i>
      <b>error text.</b>
    </div>
  </goa-form-item>
</template>

<script setup lang="ts">
function onChange(e: CustomEvent) {
  console.log("Value changed:", e.detail.value);
}
</script>
