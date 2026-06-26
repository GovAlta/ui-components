<script setup lang="ts">
import type { GoabPaginationOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required Total number of data items within all pages.  @default (required) */
  itemCount: number;
  /** @required The current page being viewed (non-zero based).  @default (required) */
  pageNumber: number;
  /** Number of data items shown per page. @default 10 */
  perPageCount?: number;
  /** Controls which nav controls are visible. @default "all" */
  variant?: "all" | "links-only";
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Sets the mt.  @default "none" */
  mt?: Spacing;
  /** Sets the mr.  @default "none" */
  mr?: Spacing;
  /** Sets the mb.  @default "m" */
  mb?: Spacing;
  /** Sets the ml.  @default "none" */
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /** @required Callback fired when the user navigates to a different page. */
  onChange: [detail: GoabPaginationOnChangeDetail];
}>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-pagination v-bind="wcProps" @_change="emit('onChange', $event.detail)" />
</template>
