<script setup lang="ts">
import type { GoabFormStepperOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  step?: number;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onChange: [detail: GoabFormStepperOnChangeDetail];
}>();

const wcProps = useWcProps(props);

function onChange(e: Event) {
  const detail = (e as CustomEvent<GoabFormStepperOnChangeDetail>).detail;
  emit("onChange", detail);
}
</script>

<template>
  <goa-form-stepper v-bind="wcProps" @_change="onChange">
    <slot />
  </goa-form-stepper>
</template>
