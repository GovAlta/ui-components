<script setup lang="ts">
import type {
  GoabButtonGroupAlignment,
  GoabButtonGroupGap,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required Positions the button group in the page layout.  @default "start" */
  alignment: GoabButtonGroupAlignment;
  /** Sets the spacing between buttons in the button group. @default "relaxed" */
  gap?: GoabButtonGroupGap;
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

const props = defineProps<Props>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-button-group v-bind="wcProps">
    <slot />
  </goa-button-group>
</template>
