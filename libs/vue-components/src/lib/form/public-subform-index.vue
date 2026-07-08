<script setup lang="ts">
import type { GoabPublicFormPageButtonVisibility, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the heading. */
  heading?: string;
  /** Sets the section title. */
  sectionTitle?: string;
  /** Sets the action button text. */
  actionButtonText?: string;
  /** Sets the button visibility.  @default "hidden" */
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
