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
  <goa-button version="2" type="tertiary" leadingicon="add" @_click="openModal">Add another item</goa-button>
  <goa-modal
    version="2"
    heading="Add a new item"
    :open="modalOpen ? 'true' : 'false'"
    @_close="closeModal"
  >
    <p>Fill in the information to create a new item</p>
    <goa-form-item version="2" label="Type" mt="l">
      <goa-dropdown version="2" id="type-dropdown">
        <goa-dropdown-item value="1" label="Option 1"></goa-dropdown-item>
        <goa-dropdown-item value="2" label="Option 2"></goa-dropdown-item>
      </goa-dropdown>
    </goa-form-item>
    <goa-form-item version="2" label="Name" mt="l">
      <goa-input version="2" name="name" width="100%" id="name-input"></goa-input>
    </goa-form-item>
    <goa-form-item version="2" label="Description" mt="l">
      <goa-textarea version="2" name="description" width="100%" rows="3" id="description-textarea"></goa-textarea>
    </goa-form-item>
    <div slot="actions">
      <goa-button-group alignment="end">
        <goa-button version="2" type="tertiary" size="compact" @_click="closeModal">Cancel</goa-button>
        <goa-button version="2" type="primary" size="compact" @_click="closeModal">Save new item</goa-button>
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
