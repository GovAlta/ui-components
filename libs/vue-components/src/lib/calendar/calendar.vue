<script setup lang="ts">
import type { GoabCalendarOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  name?: string;
  value?: string;
  min?: string;
  max?: string;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onChange: [detail: GoabCalendarOnChangeDetail];
}>();

const wcProps = useWcProps(props);

function onChange(e: Event) {
  const detail = (e as CustomEvent).detail;
  emit("onChange", { name: props.name ?? "", value: detail.value });
}
</script>

<template>
  <goa-calendar v-bind="wcProps" @_change="onChange" />
</template>
