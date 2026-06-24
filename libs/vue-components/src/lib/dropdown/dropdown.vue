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
  name?: string;
  value?: string | string[];
  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
  disabled?: boolean;
  error?: boolean;
  filterable?: boolean;
  leadingIcon?: GoabIconType;
  maxHeight?: string;
  multiselect?: boolean;
  native?: boolean;
  placeholder?: string;
  testId?: string;
  width?: string;
  maxWidth?: string;
  autoComplete?: string;
  size?: GoabDropdownSize;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
});
const emit = defineEmits<{
  onChange: [detail: GoabDropdownOnChangeDetail];
}>();

const { value: _value, ...rest } = props;
const wcProps = useWcProps(rest, {
  booleanProps: ["disabled", "error", "filterable", "multiselect", "native"],
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
