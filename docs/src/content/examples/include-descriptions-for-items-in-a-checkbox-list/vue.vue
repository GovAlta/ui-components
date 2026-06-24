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
  <goa-form-item version="2" label="How do you want to sign in?">
    <goa-radio-group version="2" name="selectOne" value="1" @_change="onChange">
      <goa-radio-item value="1" label="Sign in as a business">
        <span slot="description">Use the account associated with the business</span>
      </goa-radio-item>
      <goa-radio-item value="2" label="Sign in as an individual">
        <span slot="description">If you don't have a Alberta.ca login, you can create one</span>
      </goa-radio-item>
    </goa-radio-group>
  </goa-form-item>
</template>

<script setup lang="ts">
function onChange(e: CustomEvent) {
  console.log("Selected:", e.detail.value);
}
</script>
