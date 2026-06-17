<script setup lang="ts">
import type { GoabSkeletonSize, GoabSkeletonType, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  type: GoabSkeletonType;
  size?: GoabSkeletonSize;
  maxWidth?: string;
  lineCount?: number;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
</script>

<template>
  <goa-skeleton v-bind="wcProps" />
</template>
