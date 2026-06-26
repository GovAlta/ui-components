<script setup lang="ts">
import type { GoabCalendarOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Name identifier for the calendar, included in change events.  @default "" */
  name?: string;
  /** The currently selected date value in YYYY-MM-DD format.  @default "" */
  value?: string;
  /** The minimum selectable date in YYYY-MM-DD format. Defaults to 5 years in the past.  @default "" */
  min?: string;
  /** The maximum selectable date in YYYY-MM-DD format. Defaults to 5 years in the future.  @default "" */
  max?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
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
  /** @required Callback fired when the selected date changes. */
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
