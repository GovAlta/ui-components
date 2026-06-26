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
  /** @required Name of the input value that is received in the change event.  @default (required) */
  name: string;
  /** Sets the id attribute on the textarea element.  @default undefined */
  id?: string;
  /** Bound to the current value of the textarea.  @default "" */
  value?: string;
  /** Text displayed within the textarea when no value is set.  @default "" */
  placeholder?: string;
  /** Sets the number of visible text rows. @default 3 */
  rows?: number;
  /** Sets the input to an error state.  @default "false" */
  error?: boolean;
  /** Sets the input to a read only state.  @default "false" */
  readOnly?: boolean;
  /** Sets the input to a disabled state.  @default "false" */
  disabled?: boolean;
  /** Sets the width of the text area. @default "100%" */
  width?: string;
  /** Sets the maximum width of the text area. @default "60ch" */
  maxWidth?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Defines how the text will be translated for the screen reader. If not specified it will fall back to the name.  @default "" */
  ariaLabel?: string;
  /** Counting interval for characters or words, specifying whether to count every character or word.  @default "" */
  countBy?: GoabTextAreaCountBy;
  /** Maximum number of characters or words allowed.  @default -1 */
  maxCount?: number;
  /** Specifies the autocomplete attribute for the textarea input.  @default "" */
  autoComplete?: string;
  /** Sets the visual size variant of the text area.  @default "default" */
  size?: GoabTextAreaSize;
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
  /** Callback fired when the value of the textarea changes. */
  onChange: [detail: GoabTextAreaOnChangeDetail];
  /** Callback fired when a key is pressed within the textarea. */
  onKeyPress: [detail: GoabTextAreaOnKeyPressDetail];
  /** Callback fired when the textarea loses focus. */
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
