<script setup lang="ts">
import type {
  GoabDropdownOnChangeDetail,
  GoabDropdownSize,
  GoabIconType,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";
import { computed } from "vue";

interface Props {
  /** Identifier for the dropdown. Should be unique.  @default undefined */
  name?: string;
  /** The currently selected value(s) of the dropdown.  @default "" */
  value?: string | string[];
  /** Defines how the selected value will be translated for the screen reader. If not specified it will fall back to the name.  @default "" */
  ariaLabel?: string;
  /** The aria-labelledby attribute identifies the element that labels the dropdown. Normally it is the id of the label.  @default "" */
  ariaLabelledBy?: string;
  /** The id attribute for the dropdown element.  @default undefined */
  id?: string;
  /** Disables the dropdown control.  @default "false" */
  disabled?: boolean;
  /** Shows an error state on the dropdown.  @default "false" */
  error?: boolean;
  /** When true, allows filtering options by typing into the input field.  @default "false" */
  filterable?: boolean;
  /** Icon shown to the left of the dropdown input.  @default null */
  leadingIcon?: GoabIconType;
  /** Maximum height of the dropdown menu. Non-native only. @default "276px" */
  maxHeight?: string;
  /** When true, renders the native select HTML element.  @default "false" */
  native?: boolean;
  /** The text displayed in the dropdown before a selection is made. Non-native only.  @default "" */
  placeholder?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Overrides the autosized menu width. Non-native only.  @default "" */
  width?: string;
  /** Sets the maximum width of the dropdown. Use a CSS unit (px, %, ch, rem, em).  @default "" */
  maxWidth?: string;
  /** Specifies the autocomplete attribute for the dropdown input. Native only.  @default "" */
  autoComplete?: string;
  /** Sets the size of the dropdown. Compact reduces height for dense layouts.  @default "default" */
  size?: GoabDropdownSize;
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
  size: "default",
});
const emit = defineEmits<{
  /** Callback fired when the selected value changes. */
  onChange: [detail: GoabDropdownOnChangeDetail];
}>();

const { value: _value, ...rest } = props;
const wcProps = useWcProps(rest, {
  booleanProps: ["disabled", "error", "filterable", "native"],
});

const valueAttr = computed(() => {
  if (typeof props.value === "undefined") return "";
  if (typeof props.value === "string") return props.value;
  return JSON.stringify(props.value);
});

function onChange(e: Event) {
  const detail = (e as CustomEvent<GoabDropdownOnChangeDetail>).detail;
  emit("onChange", { ...detail, event: e });
}
</script>

<template>
  <goa-dropdown v-bind="wcProps" :value="valueAttr" @_change="onChange">
    <slot />
  </goa-dropdown>
</template>
