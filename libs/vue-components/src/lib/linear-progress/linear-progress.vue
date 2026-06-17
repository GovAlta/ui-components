<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  progress?: number | null;
  percentVisibility?: "visible" | "hidden";
  ariaLabel?: string;
  ariaLabelledBy?: string;
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
