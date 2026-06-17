<script setup lang="ts">
import type { GoabPublicFormPageButtonVisibility, GoabPublicFormPageStep, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  id?: string;
  heading?: string;
  subHeading?: string;
  summaryHeading?: string;
  sectionTitle?: string;
  backUrl?: string;
  type?: GoabPublicFormPageStep;
  buttonText?: string;
  buttonVisibility?: GoabPublicFormPageButtonVisibility;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "onContinue", detail: Event): void;
}>();

const wcProps = useWcProps(props, { transform: "kebab" });
</script>

<template>
  <goa-public-form-page v-bind="wcProps" @_continue="emit('onContinue', $event)">
    <slot />
  </goa-public-form-page>
</template>
