<template>
  <goa-form-item
    version="2"
    label="Provide more detail"
    helptext="Maximum 500 words. Do not include personal or financial information."
  >
    <goa-textarea
      version="2"
      name="program"
      id="program-textarea"
      width="100%"
      rows="6"
      maxcount="500"
      countby="word"
      @_change="onChange"
    >
    </goa-textarea>
  </goa-form-item>
</template>

<script setup lang="ts">
function onChange(e: CustomEvent) {
  console.log("Value:", e.detail.value);
}
</script>
