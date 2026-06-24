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
  <form>
    <goa-form-item version="2" label="Tuition">
      <goa-input version="2" name="tuition" id="tuition-input" @_change="onChange('tuition-input', $event)">
        <div slot="leadingContent">$</div>
      </goa-input>
    </goa-form-item>
    <goa-form-item version="2" label="Books/Supplies/Instruments" mt="l">
      <goa-input version="2" name="book" id="supplies-input" @_change="onChange('supplies-input', $event)">
        <div slot="leadingContent">$</div>
      </goa-input>
    </goa-form-item>
    <goa-form-item version="2" label="Other costs" mt="l">
      <goa-input version="2" name="others" id="others-input" @_change="onChange('others-input', $event)">
        <div slot="leadingContent">$</div>
      </goa-input>
    </goa-form-item>
  </form>
</template>

<script setup lang="ts">
function onChange(id: string, e: CustomEvent) {
  console.log(`${id}:`, e.detail.value);
}
</script>
