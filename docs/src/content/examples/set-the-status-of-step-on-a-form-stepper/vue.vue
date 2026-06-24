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
  <goa-form-stepper ml="s" mr="s" step="-1">
    <goa-form-step text="Personal details" status="complete"></goa-form-step>
    <goa-form-step text="Employment history" status="complete"></goa-form-step>
    <goa-form-step text="References" status="incomplete"></goa-form-step>
    <goa-form-step text="Review" status="not-started"></goa-form-step>
  </goa-form-stepper>
  <goa-pages current="-1" mb="3xl" mt="xl" mr="xl" ml="xl">
    <div><!-- Page 1 content --></div>
    <div><!-- Page 2 content --></div>
    <div><!-- Page 3 content --></div>
    <div><!-- Page 4 content --></div>
  </goa-pages>
  <div style="display: flex; justify-content: space-between">
    <goa-button version="2" type="secondary" @_click="prevStep">Previous</goa-button>
    <goa-button version="2" type="primary" @_click="nextStep">Next</goa-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const step = ref(-1);

function onStepChange(e: CustomEvent) {
  step.value = e.detail.step;
}

function prevStep() {
  if (step.value > 1) {
    step.value--;
  }
}

function nextStep() {
  if (step.value < 4) {
    step.value++;
  }
}
</script>
