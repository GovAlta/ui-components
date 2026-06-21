<template>
  <goa-button version="2" @_click="openModal">Save and continue</goa-button>
  <goa-modal
    version="2"
    heading="Address has changed"
    :open="modalOpen ? 'true' : 'false'"
    @_close="closeModal"
  >
    <goa-container type="non-interactive" accent="filled" padding="compact" width="full">
      <goa-text as="h4" mt="none" mb="s">Before</goa-text>
      <goa-text mt="none">123456 78 Ave NW, Edmonton, Alberta</goa-text>
      <goa-text as="h4" mt="none" mb="s">After</goa-text>
      <goa-text mt="none" mb="none">881 12 Ave NW, Edmonton, Alberta</goa-text>
    </goa-container>
    <goa-form-item version="2" label="Effective date" mt="l">
      <goa-date-picker
        version="2"
        id="effective-date"
        name="effectiveDate"
        :value="effectiveDate"
        @_change="onDateChange"
      ></goa-date-picker>
    </goa-form-item>
    <div slot="actions">
      <goa-button-group alignment="end">
        <goa-button version="2" type="secondary" size="compact" @_click="closeModal">Undo address change</goa-button>
        <goa-button version="2" type="primary" size="compact" @_click="closeModal">Confirm</goa-button>
      </goa-button-group>
    </div>
  </goa-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

const modalOpen = ref(false);
const effectiveDate = ref(new Date().toISOString());

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

function onDateChange(e: CustomEvent) {
  effectiveDate.value = e.detail.value;
}
</script>
