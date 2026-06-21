<template>
  <goa-link leadingicon="arrow-back" size="small" mb="none"> Back </goa-link>
  <goa-text as="h1" mt="xl" mb="m">What is your email address?</goa-text>
  <goa-text mt="none" mb="xl">We'll use this to send you confirmation of your application.</goa-text>
  <goa-form-item version="2" label="Email address">
    <goa-input version="2" name="email" type="email" width="100%" @_change="onInputChange"></goa-input>
  </goa-form-item>
  <goa-button-group alignment="start" mt="2xl">
    <goa-button version="2" type="primary" @_click="onContinue"> Continue </goa-button>
  </goa-button-group>
</template>

<script setup lang="ts">
import { ref } from "vue";

const answer = ref("");

function onInputChange(e: CustomEvent) {
  answer.value = e.detail.value;
}

function onContinue() {
  console.log("Answer submitted:", answer.value);
}
</script>
