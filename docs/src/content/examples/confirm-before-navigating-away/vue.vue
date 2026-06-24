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
  <goa-button version="2" @_click="openModal">Open</goa-button>
  <goa-modal
    version="2"
    heading="Are you sure you want to change route?"
    :open="modalOpen ? 'true' : 'false'"
    @_close="closeModal"
  >
    <div slot="actions">
      <goa-button-group alignment="end">
        <goa-button version="2" type="secondary" size="compact" @_click="closeModal">Cancel</goa-button>
        <goa-button version="2" type="primary" size="compact" @_click="changeRoute">Change route</goa-button>
      </goa-button-group>
    </div>
  </goa-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

const modalOpen = ref(false);

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

function changeRoute() {
  modalOpen.value = false;
  setTimeout(() => {
    window.location.href = "/components";
  }, 300);
}
</script>
