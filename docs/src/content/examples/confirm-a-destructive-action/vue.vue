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
  <goa-button version="2" type="tertiary" leadingicon="trash" @_click="openModal">Delete record</goa-button>
  <goa-modal
    version="2"
    heading="Are you sure you want to delete this record?"
    :open="modalOpen ? 'true' : 'false'"
    @_close="closeModal"
  >
    <p>This action cannot be undone.</p>
    <div slot="actions">
      <goa-button-group alignment="end">
        <goa-button version="2" type="tertiary" size="compact" @_click="closeModal">Cancel</goa-button>
        <goa-button version="2" type="primary" variant="destructive" size="compact" @_click="closeModal">Delete record</goa-button>
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
