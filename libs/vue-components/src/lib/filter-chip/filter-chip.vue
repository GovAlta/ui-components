<script setup lang="ts">
import type { GoabFilterChipTheme, GoabIconType, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required Text label of the chip.  @default (required) */
  content: string;
  /** Theme style of the leading icon. @default "outline" */
  iconTheme?: GoabFilterChipTheme;
  /** Shows an error state.  @default "false" */
  error?: boolean;
  /** Secondary text displayed in a smaller size before the main content.  @default "" */
  secondaryText?: string;
  /** Icon displayed at the start of the chip.  @default null */
  leadingIcon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing.  @default "" */
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

const props = withDefaults(defineProps<Props>(), {
  iconTheme: "outline",
});
const emit = defineEmits<{
  /** Callback fired when the filter chip is clicked to remove it. */
  onClick: [];
}>();

const wcProps = useWcProps(props, { booleanProps: ["error"] });
</script>

<template>
  <goa-filter-chip v-bind="wcProps" @_click="emit('onClick')" />
</template>
