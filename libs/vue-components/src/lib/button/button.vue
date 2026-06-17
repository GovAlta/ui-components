<script setup lang="ts">
import type {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  type?: GoabButtonType;
  size?: GoabButtonSize;
  variant?: GoabButtonVariant;
  disabled?: boolean;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  width?: string;
  testId?: string;
  action?: string;
  actionArgs?: Record<string, unknown>;
  actionArg?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onClick: [];
}>();

const wcProps = useWcProps(props, { 
  booleanProps: ["disabled"],
  jsonProps: ["actionArgs"],
  renamedProps: { actionArg: "action-arg", actionArgs: "action-args" },
});
</script>

<template>
  <goa-button v-bind="wcProps" @_click="emit('onClick')">
    <slot />
  </goa-button>
</template>
