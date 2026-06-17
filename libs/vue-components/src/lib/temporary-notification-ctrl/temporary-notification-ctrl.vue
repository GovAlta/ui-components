<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  verticalPosition?: "top" | "bottom";
  horizontalPosition?: "left" | "center" | "right";
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
