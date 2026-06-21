<template>
  <goa-form-item version="2" label="First name">
    <goa-input version="2" name="item" @_change="onChange"></goa-input>
    <div slot="helptext">
      <span>This is </span>
      <i>slotted </i>
      <b>help text</b>.
    </div>
  </goa-form-item>
</template>

<script setup lang="ts">
function onChange(e: CustomEvent) {
  console.log("Value changed:", e.detail.value);
}
</script>
