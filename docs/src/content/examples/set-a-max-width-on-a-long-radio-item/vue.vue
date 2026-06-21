<template>
  <form>
    <goa-form-item version="2" label="Select one option">
      <goa-radio-group version="2" name="selectOne" value="1" @_change="onChange">
        <goa-radio-item value="1" label="Option one which has a very long label with lots of text" max-width="300px"></goa-radio-item>
        <goa-radio-item value="2" label="Option two"></goa-radio-item>
        <goa-radio-item value="3" label="Option three"></goa-radio-item>
      </goa-radio-group>
    </goa-form-item>
  </form>
</template>

<script setup lang="ts">
function onChange(e: CustomEvent) {
  (e.target as any).value = e.detail.value;
}
</script>
