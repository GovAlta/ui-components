<script setup lang="ts">
import type {
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOrientation,
  GoabRadioGroupSize,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  name: string;
  value?: string;
  id?: string;
  disabled?: boolean;
  orientation?: GoabRadioGroupOrientation;
  size?: GoabRadioGroupSize;
  testId?: string;
  error?: boolean;
  ariaLabel?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
});
const emit = defineEmits<{
  onChange: [detail: GoabRadioGroupOnChangeDetail];
}>();

const wcProps = useWcProps(props, { booleanProps: ["disabled", "error"] });

function onChange(e: Event) {
  const detail = (e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail;
  emit("onChange", { ...detail, event: e });
}
</script>

<template>
  <goa-radio-group v-bind="wcProps" @_change="onChange">
    <slot />
  </goa-radio-group>
</template>
