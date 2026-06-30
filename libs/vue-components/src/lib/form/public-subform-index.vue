<script setup lang="ts">
import type { GoabPublicFormPageButtonVisibility, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the heading.  @default "" */
  heading?: string;
  /** Sets the section title.  @default "" */
  sectionTitle?: string;
  /** Sets the action button text.  @default "" */
  actionButtonText?: string;
  /** Sets the button visibility.  @default "hidden" */
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

const props = withDefaults(defineProps<Props>(), {
  heading: "",
  sectionTitle: "",
  actionButtonText: "",
  buttonVisibility: "hidden",
});

const wcProps = useWcProps(props, { transform: "kebab" });
</script>

<template>
  <goa-public-subform-index slot="subform-index" v-bind="wcProps">
    <slot />
  </goa-public-subform-index>
</template>
