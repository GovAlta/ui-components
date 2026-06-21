<template>
  <goa-button version="2" @_click="openModal">Open Basic Modal</goa-button>
  <goa-modal
    version="2"
    heading="Are you sure you want to continue?"
    :open="modalOpen ? 'true' : 'false'"
    @_close="closeModal"
  >
    <p>You cannot return to this page.</p>
    <div slot="actions">
      <goa-button-group alignment="end">
        <goa-button version="2" type="secondary" size="compact" @_click="closeModal">Back</goa-button>
        <goa-button version="2" type="primary" size="compact" @_click="closeModal">Continue</goa-button>
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
