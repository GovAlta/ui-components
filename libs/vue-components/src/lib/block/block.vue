<script setup lang="ts">
import type { GoabBlockAlignment, GoabBlockDirection, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  gap?: Spacing;
  direction?: GoabBlockDirection;
  alignment?: GoabBlockAlignment;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { 
  transform: "kebab",
  renamedProps: { testId: "testid" },
});
</script>

<template>
  <goa-block v-bind="wcProps">
    <slot />
  </goa-block>
</template>
