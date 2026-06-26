<script setup lang="ts">
import type { GoabBlockAlignment, GoabBlockDirection, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the gap.  @default "m" */
  gap?: Spacing;
  /** Sets the direction.  @default "row" */
  direction?: GoabBlockDirection;
  /** Sets the alignment.  @default "normal" */
  alignment?: GoabBlockAlignment;
  /** Sets the min width.  @default "" */
  minWidth?: string;
  /** Sets the max width.  @default "" */
  maxWidth?: string;
  /** Sets the width.  @default "" */
  width?: string;
  /** Sets the test id.  @default "" */
  testId?: string;
  /** Sets the mt.  @default null */
  mt?: Spacing;
  /** Sets the mr.  @default null */
  mr?: Spacing;
  /** Sets the mb.  @default null */
  mb?: Spacing;
  /** Sets the ml.  @default null */
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
