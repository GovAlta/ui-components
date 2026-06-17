<script setup lang="ts">
import type { GoabTableSortDirection, GoabTableSortOrder } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  name?: string;
  direction?: GoabTableSortDirection;
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
