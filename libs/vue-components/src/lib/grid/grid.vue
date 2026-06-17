<script setup lang="ts">
import type { Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  minChildWidth: string;
  gap?: Spacing;
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
  <goa-grid v-bind="wcProps">
    <slot />
  </goa-grid>
</template>
