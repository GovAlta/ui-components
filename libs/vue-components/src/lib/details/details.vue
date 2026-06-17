<script setup lang="ts">
import type { Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading: string;
  open?: boolean;
  maxWidth?: string;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props, { booleanProps: ["open"] });
</script>

<template>
  <goa-details v-bind="wcProps">
    <slot />
  </goa-details>
</template>
