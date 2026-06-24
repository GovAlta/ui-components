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
  <goa-block alignment="center">
    <div class="token-block"></div>
    <span>$goa-color-interactive-default</span>
    <goa-tooltip ref="tooltip" content="Copy?" position="top">
      <goa-icon-button icon="copy" mt="2xs" @_click="copyCode"></goa-icon-button>
    </goa-tooltip>
  </goa-block>
</template>

<style>
.token-block {
  background-color: var(--goa-color-interactive-default);
  height: 22px;
  width: 24px;
  border-radius: var(--goa-border-radius-s);
}
</style>

<script setup lang="ts">
import { ref } from "vue";

const tooltip = ref<any>(null);

function copyCode() {
  const codeToCopy = "$goa-color-interactive-default";
  navigator.clipboard.writeText(codeToCopy).then(() => {
    tooltip.value.setAttribute("content", "Copied");
    setTimeout(() => {
      tooltip.value.setAttribute("content", "Copy?");
    }, 1000);
  });
}
</script>
