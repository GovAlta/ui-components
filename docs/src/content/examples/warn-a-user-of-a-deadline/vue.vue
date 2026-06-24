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
  <goa-button version="2" type="secondary" @_click="openModal">Save for later</goa-button>
  <goa-modal
    version="2"
    calloutvariant="important"
    heading="Complete submission prior to 1PM"
    :open="modalOpen ? 'true' : 'false'"
    @_close="closeModal"
  >
    You've selected to adjourn a matter that is required to appear today. This Calgary court
    location does not accept adjournment requests past 1PM MST. Please submit your
    adjournment request as soon as possible.
    <div slot="actions">
      <goa-button-group alignment="end">
        <goa-button version="2" type="primary" size="compact" @_click="closeModal">I understand</goa-button>
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
</script>
