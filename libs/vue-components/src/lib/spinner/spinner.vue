<script setup lang="ts">
import type { GoabSpinnerSize, GoabSpinnerType } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  type: GoabSpinnerType;
  size: GoabSpinnerSize;
  invert?: boolean;
  progress?: number;
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { booleanProps: ["invert"] });
</script>

<template>
  <goa-spinner v-bind="wcProps" />
</template>
