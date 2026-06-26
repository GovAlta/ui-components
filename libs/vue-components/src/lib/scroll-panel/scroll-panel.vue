<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "header" named slot. */
  header?: () => unknown;
  /** Content rendered in the "footer" named slot. */
  footer?: () => unknown;
}

interface Props {
  /**
   * Sets the height of the panel. Accepts any valid CSS height value, including
   * calc()/min()/clamp() and viewport units (e.g. "400px", "100%", "100vh",
   * "calc(100vh - 4rem)"). Invalid values fall back to "100%".
   * @default "100%"
   */
  height?: string;
  /** Sets a data-testid attribute for automated testing. @default "" */
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
const slots = useSlots() as Slots;

const hostStyle = computed(() => {
  return props.height ? { height: props.height } : undefined;
});
</script>

<template>
  <goa-scroll-panel v-bind="wcProps" :style="hostStyle">
    <div v-if="slots.header" slot="header">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="slots.footer" slot="footer">
      <slot name="footer" />
    </div>
  </goa-scroll-panel>
</template>
