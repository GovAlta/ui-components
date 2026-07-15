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
  /** When true, children fill the cross-axis (e.g. width in a column block) regardless of alignment.  @default false */
  stretch?: boolean;
  /** Sets the min width. */
  minWidth?: string;
  /** Sets the max width. */
  maxWidth?: string;
  /** Sets the width. */
  width?: string;
  /** Sets the test id. */
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
  booleanProps: ["stretch"],
  renamedProps: { testId: "testid" },
});
</script>

<template>
  <goa-block v-bind="wcProps">
    <slot />
  </goa-block>
</template>
