<template>
  <form id="required-field-form">
    <goa-form-item version="2" label="Name" requirement="required">
      <goa-input version="2" name="input" type="text" width="100%" @_change="onNameChange"></goa-input>
    </goa-form-item>
    <goa-button-group alignment="start" mt="xl">
      <goa-button version="2" type="primary" :disabled="isDisabled ? 'true' : 'false'" @_click="onConfirm">Confirm</goa-button>
      <goa-button version="2" type="secondary" @_click="onCancel">Cancel</goa-button>
    </goa-button-group>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isDisabled = ref(true);

function onNameChange(e: CustomEvent) {
  const value = (e.detail.value as string).trim();
  isDisabled.value = value === "";
}

function onConfirm() {
  console.log("Form submitted");
}

function onCancel() {
  isDisabled.value = true;
}
</script>
