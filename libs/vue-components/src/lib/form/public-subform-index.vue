<script setup lang="ts">
import type { Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading?: string;
  sectionTitle?: string;
  actionButtonText?: string;
  buttonVisibility?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  buttonVisibility: "hidden",
});

const wcProps = useWcProps(props, { transform: "kebab" });
</script>

<template>
  <goa-public-subform-index slot="subform-index" v-bind="wcProps">
    <slot />
  </goa-public-subform-index>
</template>
