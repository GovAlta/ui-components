<script setup lang="ts">
import type { GoabPublicFormPageButtonVisibility, GoabPublicFormPageStep, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the id.  @default "" */
  id?: string;
  /** Sets the heading.  @default undefined */
  heading?: string;
  /** Sets the sub heading.  @default undefined */
  subHeading?: string;
  /** Sets the summary heading.  @default undefined */
  summaryHeading?: string;
  /** Sets the section title.  @default undefined */
  sectionTitle?: string;
  /** Sets the back url.  @default undefined */
  backUrl?: string;
  /** Sets the type.  @default undefined */
  type?: GoabPublicFormPageStep;
  /** Sets the button text.  @default undefined */
  buttonText?: string;
  /** Sets the button visibility.  @default undefined */
  buttonVisibility?: GoabPublicFormPageButtonVisibility;
  /** Sets the mt.  @default undefined */
  mt?: Spacing;
  /** Sets the mr.  @default undefined */
  mr?: Spacing;
  /** Sets the mb.  @default undefined */
  mb?: Spacing;
  /** Sets the ml.  @default undefined */
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
