<script setup lang="ts">
import type { Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  itemCount: number;
  pageNumber: number;
  perPageCount?: number;
  variant?: "all" | "links-only";
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onChange: [detail: { page: number }];
}>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-pagination v-bind="wcProps" @_change="emit('onChange', $event.detail)" />
</template>
