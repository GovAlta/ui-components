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
  <goa-form-item version="2" label="What is your date of birth?">
    <goa-date-picker version="2" name="birthdate" type="input" @_change="onChange"></goa-date-picker>
  </goa-form-item>
</template>

<script setup lang="ts">
function onChange(e: CustomEvent) {
  console.log("Selected date:", e.detail.value);
}
</script>
