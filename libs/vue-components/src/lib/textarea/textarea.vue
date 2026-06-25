<script setup lang="ts">
import type {
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
  GoabTextAreaOnBlurDetail,
  GoabTextAreaCountBy,
  GoabTextAreaSize,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  name: string;
  id?: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  error?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  width?: string;
  maxWidth?: string;
  testId?: string;
  ariaLabel?: string;
  countBy?: GoabTextAreaCountBy;
  maxCount?: number;
  autoComplete?: string;
  size?: GoabTextAreaSize;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onChange: [detail: GoabTextAreaOnChangeDetail];
  onKeyPress: [detail: GoabTextAreaOnKeyPressDetail];
  onBlur: [detail: GoabTextAreaOnBlurDetail];
}>();

const wcProps = useWcProps(props, { booleanProps: ["readOnly", "disabled", "error"] });

function onChange(e: Event) {
  const detail = (e as CustomEvent<GoabTextAreaOnChangeDetail>).detail;
  emit("onChange", { ...detail, event: e });
}

function onKeyPress(e: Event) {
  const detail = (e as CustomEvent<GoabTextAreaOnKeyPressDetail>).detail;
  emit("onKeyPress", { ...detail, event: e });
}

function onBlur(e: Event) {
  const detail = (e as CustomEvent<GoabTextAreaOnBlurDetail>).detail;
  emit("onBlur", { ...detail, event: e });
}
</script>

<template>
  <goa-textarea v-bind="wcProps" @_change="onChange" @_keyPress="onKeyPress" @_blur="onBlur" />
</template>
