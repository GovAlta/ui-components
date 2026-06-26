<script setup lang="ts">
import { useSlots } from "vue";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "footer" named slot. */
  footer?: () => unknown;
  /** Content rendered in the "header" named slot. */
  header?: () => unknown;
}

const slots = useSlots() as Slots;
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
