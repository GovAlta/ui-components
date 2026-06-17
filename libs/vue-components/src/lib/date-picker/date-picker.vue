<script setup lang="ts">
import type {
  GoabDatePickerInputType,
  GoabDatePickerOnChangeDetail,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  type?: GoabDatePickerInputType;
  name?: string;
  value?: string;
  error?: boolean;
  min?: string;
  max?: string;
  testId?: string;
  disabled?: boolean;
  width?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onChange: [detail: GoabDatePickerOnChangeDetail & { event: Event }];
}>();

const wcProps = useWcProps(props, { booleanProps: ["error", "disabled"] });
</script>

<template>
  <goa-date-picker v-bind="wcProps" @_change="emit('onChange', { ...$event.detail, event: $event })" />
</template>
