<script setup lang="ts">
import type {
  GoabButtonGroupAlignment,
  GoabButtonGroupGap,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  alignment: GoabButtonGroupAlignment;
  gap?: GoabButtonGroupGap;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-button-group v-bind="wcProps">
    <slot />
  </goa-button-group>
</template>
