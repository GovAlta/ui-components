<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading: string;
  backgroundUrl?: string;
  minHeight?: string;
  testId?: string;
  maxContentWidth?: string;
  backgroundColor?: string;
  textColor?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
const slots = useSlots();
</script>

<template>
  <goa-hero-banner v-bind="wcProps">
    <slot />
    <div v-if="slots.actions" slot="actions">
      <slot name="actions" />
    </div>
  </goa-hero-banner>
</template>
