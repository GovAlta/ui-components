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
  <goa-link leadingicon="arrow-back" size="small" mb="none"> Back </goa-link>
  <goa-text as="h3" size="body-m" mt="xl" mb="m" color="secondary">Personal information</goa-text>
  <goa-form-item version="2" label="Do you currently live in Canada?" labelsize="large">
    <goa-radio-group version="2" name="canada" aria-label="Do you currently live in Canada?" @_change="onChange">
      <goa-radio-item value="yes" label="Yes"></goa-radio-item>
      <goa-radio-item value="no" label="No"></goa-radio-item>
    </goa-radio-group>
  </goa-form-item>
  <goa-button version="2" type="submit" mt="2xl"> Save and continue </goa-button>
</template>

<script setup lang="ts">
function onChange(e: CustomEvent) {
  console.log("Selected:", e.detail.value);
}
</script>
