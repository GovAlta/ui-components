<script setup lang="ts">
import type {
  GoabDatePickerInputType,
  GoabDatePickerOnChangeDetail,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the date picker type. 'calendar' shows a calendar popup, 'input' shows just a date input. @default "calendar" */
  type?: GoabDatePickerInputType;
  /** Name of the date field.  @default "" */
  name?: string;
  /** Value of the calendar date, as a Date object or an ISO date string (yyyy-mm-dd).  @default "" */
  value?: string;
  /** Sets the input to an error state.  @default "false" */
  error?: boolean;
  /** Minimum date value allowed.  @default "" */
  min?: string;
  /** Maximum date value allowed.  @default "" */
  max?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Disables the date picker.  @default "false" */
  disabled?: boolean;
  /** Sets the width of the date picker input.  @default "" */
  width?: string;
  /** Sets the mt.  @default null */
  mt?: Spacing;
  /** Sets the mr.  @default null */
  mr?: Spacing;
  /** Sets the mb.  @default null */
  mb?: Spacing;
  /** Sets the ml.  @default null */
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /** Callback fired when the selected date changes. */
  onChange: [detail: GoabDatePickerOnChangeDetail & { event: Event }];
}>();

const wcProps = useWcProps(props, { booleanProps: ["error", "disabled"] });
</script>

<template>
  <goa-date-picker v-bind="wcProps" @_change="emit('onChange', { ...$event.detail, event: $event })" />
</template>
