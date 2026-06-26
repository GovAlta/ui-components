<script setup lang="ts">
import type { Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required The title heading.  @default (required) */
  heading: string;
  /** Controls if details is expanded or not.  @default "false" */
  open?: boolean;
  /** Sets the maximum width of the details. @default "75ch" */
  maxWidth?: string;
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

const wcProps = useWcProps(props, { booleanProps: ["open"] });
</script>

<template>
  <goa-details v-bind="wcProps">
    <slot />
  </goa-details>
</template>
