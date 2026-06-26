<script setup lang="ts">
import type { GoabCircularProgressSize, GoabCircularProgressVariant } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Controls the display mode. 'fullscreen' stretches across the full screen; 'inline' is used within content. @default "inline" */
  variant?: GoabCircularProgressVariant;
  /** Sets the size of the progress indicator. @default "large" */
  size?: GoabCircularProgressSize;
  /** Loading message displayed below the progress indicator.  @default "" */
  message?: string;
  /** Controls visibility of the progress indicator, allowing a fade transition to be applied.  @default "false" */
  visible?: boolean;
  /** Sets the progress value (0–100). When omitted, an infinite spinner is shown.  @default -1 */
  progress?: number;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { booleanProps: ["visible"] });
</script>

<template>
  <goa-circular-progress v-bind="wcProps" />
</template>
