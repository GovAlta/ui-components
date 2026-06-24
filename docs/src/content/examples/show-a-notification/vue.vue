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
  <goa-temp-notification-ctrl></goa-temp-notification-ctrl>
  <goa-button version="2" type="secondary" @_click="onSave">Save</goa-button>
</template>

<script setup lang="ts">
function onSave() {
  document.body.dispatchEvent(
    new CustomEvent("msg", {
      composed: true,
      bubbles: true,
      detail: {
        action: "goa:temp-notification",
        data: {
          message: "Your application has been saved.",
          type: "success",
          uuid: crypto.randomUUID(),
          duration: "short",
        },
      },
    }),
  );
}
</script>
