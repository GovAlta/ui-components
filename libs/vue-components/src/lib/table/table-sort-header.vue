<script setup lang="ts">
import type { GoabTableSortDirection, GoabTableSortOrder } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Column name identifier for sorting.  @default "" */
  name?: string;
  /** Sets the sort direction indicator. @default "none" */
  direction?: GoabTableSortDirection;
  /** Sort order number for multi-column sort display. Used for displaying priority numbers when multiple columns are sorted.  @default 0 */
  sortOrder?: GoabTableSortOrder;
}

const props = withDefaults(defineProps<Props>(), {
  direction: "none",
});
const wcProps = useWcProps(props, { transform: "kebab" });
</script>

<template>
  <goa-table-sort-header v-bind="wcProps">
    <slot />
  </goa-table-sort-header>
</template>
