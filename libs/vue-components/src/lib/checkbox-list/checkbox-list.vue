<script setup lang="ts">
import type { GoabCheckboxListOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required The name for the checkbox list group. Used as group identifier in change events.  @default (required) */
  name: string;
  /** Array of currently selected checkbox values.  @default [] */
  value?: string[];
  /** Disables all checkboxes in the list.  @default "false" */
  disabled?: boolean;
  /** Shows an error state on all checkboxes in the list.  @default "false" */
  error?: boolean;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Sets the maximum width of the checkbox list container.  @default "none" */
  maxWidth?: string;
  /** Sets the size of the checkbox list. 'compact' reduces spacing between items. @default "default" */
  size?: "default" | "compact";
  /** Sets the mt.  @default null */
  mt?: Spacing;
  /** Sets the mr.  @default null */
  mr?: Spacing;
  /** Sets the mb.  @default null */
  mb?: Spacing;
  /** Sets the ml.  @default null */
  ml?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [],
  size: "default",
});
const emit = defineEmits<{
  /** Callback fired when the selected values change. */
  onChange: [detail: GoabCheckboxListOnChangeDetail & { event: Event }];
}>();

const wcProps = useWcProps(props, { booleanProps: ["disabled", "error"] });
</script>

<template>
  <goa-checkbox-list v-bind="wcProps" @_change="emit('onChange', { ...$event.detail, event: $event })">
    <slot />
  </goa-checkbox-list>
</template>
