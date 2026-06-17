<script setup lang="ts">
import { useSlots } from "vue";
const slots = useSlots();
</script>

<template>
  <goa-one-column-layout>
    <div v-if="slots.header" slot="header">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="slots.footer" slot="footer">
      <slot name="footer" />
    </div>
  </goa-one-column-layout>
</template>
