<script setup lang="ts">
import type { GoabCheckboxListOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  name: string;
  value?: string[];
  disabled?: boolean;
  error?: boolean;
  testId?: string;
  maxWidth?: string;
  size?: "default" | "compact";
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [],
  size: "default",
});
const emit = defineEmits<{
  onChange: [detail: GoabCheckboxListOnChangeDetail & { event: Event }];
}>();

const wcProps = useWcProps(props, { booleanProps: ["disabled", "error"] });
</script>

<template>
  <goa-checkbox-list v-bind="wcProps" @_change="emit('onChange', { ...$event.detail, event: $event })">
    <slot />
  </goa-checkbox-list>
</template>
