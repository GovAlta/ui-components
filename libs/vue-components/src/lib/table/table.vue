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
  /** Width of the table. By default it will fit the enclosed content.  @default "" */
  width?: string;
  /** Sort mode: "single" allows one column, "multi" allows up to 2 columns. @default "single" */
  sortMode?: GoabTableSortMode;
  /** A relaxed variant of the table with more vertical padding for the cells. @default "normal" */
  variant?: GoabTableVariant;
  /** When true, alternates row background colors for improved readability.  @default "false" */
  striped?: boolean;
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
  /** Callback fired when a single-column sort header is clicked. */
  onSort: [detail: GoabTableOnSortDetail];
  /** Callback fired when multi-column sorting changes. */
  onMultiSort: [detail: GoabTableOnMultiSortDetail];
}>();

const wcProps = useWcProps(props, {
  booleanProps: ["striped"],
  renamedProps: { sortMode: "sort-mode" },
});
</script>

<template>
  <goa-table
    v-bind="wcProps"
    @_sort="emit('onSort', $event.detail)"
    @_multisort="emit('onMultiSort', $event.detail)"
  >
    <table style="width: 100%">
      <slot />
    </table>
  </goa-table>
</template>
