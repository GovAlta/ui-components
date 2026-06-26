<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Progress value (0-100). When undefined, shows an indeterminate loading animation.  @default undefined */
  progress?: number | null;
  /** Controls visibility of the percentage text. @default "visible" */
  percentVisibility?: "visible" | "hidden";
  /** Accessible label for the progress bar.  @default undefined */
  ariaLabel?: string;
  /** ID of the element that labels this progress bar.  @default undefined */
  ariaLabelledBy?: string;
  /** Sets a data-testid attribute for automated testing.  @default undefined */
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { 
  renamedProps: {
    ariaLabel: "aria-label",
    ariaLabelledBy: "aria-labelledby",
    percentVisibility: "percent-visibility",
    testId: "testid",
  },
});
</script>

<template>
  <goa-linear-progress v-bind="wcProps" />
</template>
