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
  <goa-form-item version="2" label="Date Picker">
    <goa-date-picker version="2" :value="dateValue" @_change="onDateChange"></goa-date-picker>
  </goa-form-item>
  <goa-button-group alignment="start" mt="xs">
    <goa-button version="2" @_click="setValue">Set Value</goa-button>
    <goa-button version="2" @_click="clearValue">Clear Value</goa-button>
  </goa-button-group>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dateValue = ref("");

function onDateChange(e: CustomEvent) {
  console.log("Date changed:", e.detail.value);
}

function setValue() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  dateValue.value = d.toISOString();
}

function clearValue() {
  dateValue.value = "";
}
</script>
