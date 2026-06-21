<template>
  <goa-form-stepper ml="s" mr="s" :step="currentStep" @_change="onStepChange">
    <goa-form-step text="Personal details"></goa-form-step>
    <goa-form-step text="Employment history"></goa-form-step>
    <goa-form-step text="References"></goa-form-step>
    <goa-form-step text="Review"></goa-form-step>
  </goa-form-stepper>
  <goa-pages :current="currentStep" mb="3xl" mt="xl" mr="xl" ml="xl">
    <div><goa-skeleton type="article"></goa-skeleton></div>
    <div>
      <goa-skeleton type="header" size="2"></goa-skeleton>
      <goa-skeleton type="text"></goa-skeleton>
      <goa-skeleton type="header" size="2"></goa-skeleton>
      <goa-skeleton type="text"></goa-skeleton>
    </div>
    <div>
      <goa-skeleton type="text"></goa-skeleton>
      <goa-spacer vspacing="m"></goa-spacer>
      <goa-skeleton type="text"></goa-skeleton>
    </div>
    <div>
      <goa-skeleton type="header" size="2"></goa-skeleton>
      <goa-skeleton type="text"></goa-skeleton>
      <goa-spacer vspacing="m"></goa-spacer>
      <goa-skeleton type="text"></goa-skeleton>
    </div>
  </goa-pages>
  <div style="display: flex; justify-content: space-between">
    <goa-button version="2" type="secondary" @_click="prevStep">Previous</goa-button>
    <goa-button version="2" type="primary" @_click="nextStep">Next</goa-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentStep = ref(1);

function updateStep(step: number) {
  if (step < 1 || step > 4) return;
  currentStep.value = step;
}

function onStepChange(e: CustomEvent) {
  updateStep(e.detail.step);
}

function prevStep() {
  updateStep(currentStep.value - 1);
}

function nextStep() {
  updateStep(currentStep.value + 1);
}
</script>
