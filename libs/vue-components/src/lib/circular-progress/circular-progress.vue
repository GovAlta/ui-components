<script setup lang="ts">
import type { GoabCircularProgressSize, GoabCircularProgressVariant } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  variant?: GoabCircularProgressVariant;
  size?: GoabCircularProgressSize;
  message?: string;
  visible?: boolean;
  progress?: number;
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { booleanProps: ["visible"] });
</script>

<template>
  <goa-circular-progress v-bind="wcProps" />
</template>
