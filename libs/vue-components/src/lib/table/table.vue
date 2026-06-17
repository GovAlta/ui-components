<script setup lang="ts">
import type {
  GoabTableOnSortDetail,
  GoabTableOnMultiSortDetail,
  GoabTableSortMode,
  GoabTableVariant,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  width?: string;
  sortMode?: GoabTableSortMode;
  variant?: GoabTableVariant;
  striped?: boolean;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onSort: [detail: GoabTableOnSortDetail];
  onMultiSort: [detail: GoabTableOnMultiSortDetail];
}>();

const wcProps = useWcProps(props, { booleanProps: ["striped"] });
</script>

<template>
  <goa-table
    v-bind="wcProps"
    :sort-mode="sortMode"
    @_sort="emit('onSort', $event.detail)"
    @_multisort="emit('onMultiSort', $event.detail)"
  >
    <table style="width: 100%">
      <slot />
    </table>
  </goa-table>
</template>
