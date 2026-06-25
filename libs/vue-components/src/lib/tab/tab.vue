<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading?: string;
  disabled?: boolean;
  slug?: string;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props, { booleanProps: ["disabled"] });
const slots = useSlots();
</script>

<template>
  <goa-tab v-bind="wcProps">
    <span v-if="slots.heading" slot="heading">
      <slot name="heading" />
    </span>
    <slot />
  </goa-tab>
</template>
