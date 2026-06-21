<template>
  <goa-form-item version="2" label="What is your date of birth?">
    <goa-date-picker version="2" name="birthdate" type="input" @_change="onChange"></goa-date-picker>
  </goa-form-item>
</template>

<script setup lang="ts">
function onChange(e: CustomEvent) {
  console.log("Selected date:", e.detail.value);
}
</script>
