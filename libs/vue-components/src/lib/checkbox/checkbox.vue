<script setup lang="ts">
import type {
  GoabCheckboxOnChangeDetail,
  GoabCheckboxSize,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";
import { computed } from "vue";

interface Props {
  name: string;
  id?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  text?: string;
  value?: string | number | boolean;
  testId?: string;
  ariaLabel?: string;
  description?: string;
  reveal?: boolean;
  revealAriaLabel?: string;
  maxWidth?: string;
  size?: GoabCheckboxSize;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onChange: [detail: GoabCheckboxOnChangeDetail];
  onRevealChange: [detail: { name: string; value: unknown }];
}>();

const wcProps = useWcProps(props, {
  booleanProps: ["checked", "indeterminate", "disabled", "error", "reveal"],
  renamedProps: { ariaLabel: "aria-label" },
});

const valueAttr = computed(() => {
  if (typeof props.value === "boolean") {
    return props.value ? "true" : undefined;
  }
  return props.value;
});

function onChange(e: Event) {
  const detail = (e as CustomEvent<GoabCheckboxOnChangeDetail>).detail;
  emit("onChange", { ...detail, event: e });
}
</script>

<template>
  <goa-checkbox
    v-bind="wcProps"
    :value="valueAttr"
    :description="typeof description === 'string' ? description : undefined"
    @_change="onChange"
    @_revealChange="emit('onRevealChange', $event.detail)"
  >
    <slot />
    <span v-if="$slots.description" slot="description">
      <slot name="description" />
    </span>
    <span v-if="$slots.reveal" slot="reveal">
      <slot name="reveal" />
    </span>
  </goa-checkbox>
</template>
