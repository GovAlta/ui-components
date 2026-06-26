<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "heading" named slot. */
  heading?: () => unknown;
}

interface Props {
  /** The text label for this tab. Can also pass React nodes for custom heading content.  @default "" */
  heading?: string;
  /** When true, disables the tab so it cannot be selected.  @default false */
  disabled?: boolean;
  /** URL-friendly identifier for the tab, used for hash-based navigation.  @default "" */
  slug?: string;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props, { booleanProps: ["disabled"] });
const slots = useSlots() as Slots;
</script>

<template>
  <goa-tab v-bind="wcProps">
    <span v-if="slots.heading" slot="heading">
      <slot name="heading" />
    </span>
    <slot />
  </goa-tab>
</template>
