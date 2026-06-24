<script setup lang="ts">
import type { GoabPublicFormPageButtonVisibility, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading?: string;
  sectionTitle?: string;
  actionButtonText?: string;
  buttonVisibility?: GoabPublicFormPageButtonVisibility;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
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
