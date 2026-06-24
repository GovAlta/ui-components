<script setup lang="ts">
import type {
  GoabAutoCapitalize,
  GoabIconType,
  GoabInputOnBlurDetail,
  GoabInputOnChangeDetail,
  GoabInputOnFocusDetail,
  GoabInputOnKeyPressDetail,
  GoabInputSize,
  GoabInputType,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  name: string;
  type?: GoabInputType;
  value?: string;
  id?: string;
  debounce?: number;
  disabled?: boolean;
  autoCapitalize?: GoabAutoCapitalize;
  autoComplete?: string;
  placeholder?: string;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  variant?: "goa" | "bare";
  focused?: boolean;
  readonly?: boolean;
  error?: boolean;
  width?: string;
  testId?: string;
  ariaLabel?: string;
  maxLength?: number;
  trailingIconAriaLabel?: string;
  textAlign?: "left" | "right";
  size?: GoabInputSize;
  min?: number | string;
  max?: number | string;
  step?: number;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "goa",
  textAlign: "left",
  size: "default",
});
const emit = defineEmits<{
  onChange: [detail: GoabInputOnChangeDetail<string>];
  onTrailingIconClick: [];
  onFocus: [detail: GoabInputOnFocusDetail<string>];
  onBlur: [detail: GoabInputOnBlurDetail<string>];
  onKeyPress: [detail: GoabInputOnKeyPressDetail<string>];
}>();

const wcProps = useWcProps(props, { booleanProps: ["disabled", "readonly", "error", "focused"] });

function onChange(e: Event) {
  const detail = (e as CustomEvent<GoabInputOnChangeDetail>).detail;
  emit("onChange", { ...detail, event: e });
}

function onFocus(e: Event) {
  const detail = (e as CustomEvent<GoabInputOnFocusDetail>).detail;
  emit("onFocus", { ...detail, event: e });
}

function onBlur(e: Event) {
  const detail = (e as CustomEvent<GoabInputOnBlurDetail>).detail;
  emit("onBlur", { ...detail, event: e });
}

function onKeyPress(e: Event) {
  const detail = (e as CustomEvent<GoabInputOnKeyPressDetail>).detail;
  emit("onKeyPress", { ...detail, event: e });
}
</script>

<template>
  <goa-input
    v-bind="wcProps"
    @_change="onChange"
    @_trailingIconClick="emit('onTrailingIconClick')"
    @_focus="onFocus"
    @_blur="onBlur"
    @_keyPress="onKeyPress"
  >
    <span v-if="$slots.leadingContent" slot="leadingContent">
      <slot name="leadingContent" />
    </span>
    <span v-if="$slots.trailingContent" slot="trailingContent">
      <slot name="trailingContent" />
    </span>
    <slot />
  </goa-input>
</template>
