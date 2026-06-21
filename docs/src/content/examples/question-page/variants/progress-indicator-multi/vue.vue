<template>
  <goa-link leadingicon="arrow-back" size="small" mb="none"> Back </goa-link>
  <goa-text as="h3" size="body-m" mt="xl" mb="none" color="secondary">Step 1 of 5</goa-text>
  <goa-text as="h2" mt="xs" mb="xl">Personal information</goa-text>
  <goa-form-item version="2" label="What is your name?">
    <goa-input version="2" name="name" aria-label="what is your name?" width="50ch" @_change="onInputChange"></goa-input>
  </goa-form-item>
  <goa-form-item version="2" label="What is your phone number?" mt="l">
    <goa-input version="2" name="phone-number" aria-label="what is your phone number?" @_change="onInputChange">
      <div slot="leadingContent">+1</div>
    </goa-input>
  </goa-form-item>
  <goa-form-item version="2" label="What is your home postal code?" mt="l">
    <goa-input version="2" name="postal-code" width="14ch" aria-label="what is your home postal code" @_change="onInputChange"></goa-input>
  </goa-form-item>
  <goa-button version="2" type="submit" mt="2xl"> Save and continue </goa-button>
</template>

<script setup lang="ts">
function onInputChange(e: CustomEvent) {
  console.log(`${(e.target as any).name}:`, e.detail.value);
}
</script>
