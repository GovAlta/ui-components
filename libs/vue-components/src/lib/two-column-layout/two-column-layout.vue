<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "footer" named slot. */
  footer?: () => unknown;
  /** Content rendered in the "header" named slot. */
  header?: () => unknown;
  /** Content rendered in the "nav" named slot. */
  nav?: () => unknown;
}

interface Props {
  /** Sets the width of the navigation column.  @default undefined */
  navColumnWidth?: string;
  /** Sets the maximum width of the content area.  @default undefined */
  maxContentWidth?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
const slots = useSlots() as Slots;
</script>

<template>
  <goa-two-column-layout v-bind="wcProps">
    <div v-if="slots.header" slot="header">
      <slot name="header" />
    </div>
    <div v-if="slots.nav" slot="nav">
      <slot name="nav" />
    </div>
    <slot />
    <div v-if="slots.footer" slot="footer">
      <slot name="footer" />
    </div>
  </goa-two-column-layout>
</template>
