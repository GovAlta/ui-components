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
  <form>
    <goa-form-item version="2" label="Select one option">
      <goa-radio-group version="2" name="selectOne" value="1" @_change="onChange">
        <goa-radio-item value="1" label="Option one which has a very long label with lots of text" max-width="300px"></goa-radio-item>
        <goa-radio-item value="2" label="Option two"></goa-radio-item>
        <goa-radio-item value="3" label="Option three"></goa-radio-item>
      </goa-radio-group>
    </goa-form-item>
  </form>
</template>

<script setup lang="ts">
function onChange(e: CustomEvent) {
  (e.target as any).value = e.detail.value;
}
</script>
