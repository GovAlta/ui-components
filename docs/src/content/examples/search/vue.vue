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
    <goa-form-item version="2">
      <goa-block gap="xs" direction="row">
        <goa-input version="2" type="search" name="search" leadingicon="search" @_change="onInputChange"></goa-input>
        <goa-button version="2" type="primary" @_click="onSearch">Search</goa-button>
      </goa-block>
    </goa-form-item>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchValue = ref("");

function onInputChange(e: CustomEvent) {
  searchValue.value = e.detail.value;
}

function onSearch() {
  console.log("search:", searchValue.value);
}
</script>
