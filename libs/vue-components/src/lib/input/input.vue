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

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "leadingContent" named slot. */
  leadingContent?: () => unknown;
  /** Content rendered in the "trailingContent" named slot. */
  trailingContent?: () => unknown;
}

interface Props {
  /** Sets the name.  @default "" */
  name: string;
  /** Sets the type.  @default "text" */
  type?: GoabInputType;
  /** Bound to the current value of the input field.  @default "" */
  value?: string;
  /** Sets the id.  @default "" */
  id?: string;
  /** Sets the debounce.  @default 0 */
  debounce?: number;
  /** Sets the disabled.  @default "false" */
  disabled?: boolean;
  /** Sets the auto capitalize.  @default "off" */
  autoCapitalize?: GoabAutoCapitalize;
  /** Sets the auto complete.  @default "" */
  autoComplete?: string;
  /** Sets the placeholder.  @default "" */
  placeholder?: string;
  /** Sets the leading icon.  @default null */
  leadingIcon?: GoabIconType;
  /** Sets the trailing icon.  @default null */
  trailingIcon?: GoabIconType;
  /** Sets the variant.  @default "goa" */
  variant?: "goa" | "bare";
  /** Sets the focused.  @default "false" */
  focused?: boolean;
  /** Sets the readonly.  @default "false" */
  readonly?: boolean;
  /** Sets the error.  @default "false" */
  error?: boolean;
  /** Sets the width.  @default "30ch" */
  width?: string;
  /** Sets the test id.  @default "" */
  testId?: string;
  /** Sets the aria label.  @default "" */
  ariaLabel?: string;
  /** Sets the aria labelled by.  @default "" */
  ariaLabelledBy?: string;
  /** Sets the max length.  @default null */
  maxLength?: number;
  /** Sets the trailing icon aria label.  @default "" */
  trailingIconAriaLabel?: string;
  /** Sets the text align.  @default "left" */
  textAlign?: "left" | "right";
  /** Sets the size.  @default "default" */
  size?: GoabInputSize;
  /** Minimum value. Supports any number, or ISO 8601 format for date/datetime types.  @default "" */
  min?: number | string;
  /** Maximum value. Supports any number, or ISO 8601 format for date/datetime types.  @default "" */
  max?: number | string;
  /** How much a number or date value should change by. @default 1 */
  step?: number;
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
  variant: "goa",
  textAlign: "left",
  size: "default",
});
const emit = defineEmits<{
  /** Callback fired when the input value changes. Receives GoabInputOnChangeDetail. */
  onChange: [detail: GoabInputOnChangeDetail<string>];
  /** Emits when trailing icon click occurs. */
  onTrailingIconClick: [];
  /** Callback fired when the input receives focus. Receives GoabInputOnFocusDetail. */
  onFocus: [detail: GoabInputOnFocusDetail<string>];
  /** Callback fired when the input loses focus. Receives GoabInputOnBlurDetail. */
  onBlur: [detail: GoabInputOnBlurDetail<string>];
  /** Callback fired when a key is pressed in the input. Receives GoabInputOnKeyPressDetail. */
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
