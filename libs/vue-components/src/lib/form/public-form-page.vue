<script setup lang="ts">
import type { GoabPublicFormPageButtonVisibility, GoabPublicFormPageStep, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the id. */
  id?: string;
  /** Sets the heading. */
  heading?: string;
  /** Sets the sub heading. */
  subHeading?: string;
  /** Sets the summary heading. */
  summaryHeading?: string;
  /** Sets the section title. */
  sectionTitle?: string;
  /** Sets the back url. */
  backUrl?: string;
  /** Sets the type. */
  type?: GoabPublicFormPageStep;
  /** Sets the button text. */
  buttonText?: string;
  /** Sets the button visibility. */
  buttonVisibility?: GoabPublicFormPageButtonVisibility;
  /** Sets the mt. */
  mt?: Spacing;
  /** Sets the mr. */
  mr?: Spacing;
  /** Sets the mb. */
  mb?: Spacing;
  /** Sets the ml. */
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
