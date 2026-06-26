<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Vertical position of the notification container. @default "bottom" */
  verticalPosition?: "top" | "bottom";
  /** Horizontal position of the notification container. @default "center" */
  horizontalPosition?: "left" | "center" | "right";
  /** Sets a data-testid attribute for automated testing.  @default undefined */
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  verticalPosition: "bottom",
  horizontalPosition: "center",
});

const wcProps = useWcProps(props, {
  transform: "kebab",
  renamedProps: { testId: "testid" },
});
</script>

<template>
  <goa-temp-notification-ctrl v-bind="wcProps" />
</template>
