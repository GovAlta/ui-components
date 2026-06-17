<script setup lang="ts">
import type {
  GoabIconButtonVariant,
  GoabIconSize,
  GoabIconTheme,
  GoabIconType,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  icon: GoabIconType;
  size?: GoabIconSize;
  variant?: GoabIconButtonVariant;
  theme?: GoabIconTheme;
  title?: string;
  disabled?: boolean;
  testId?: string;
  ariaLabel?: string;
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
  renamedProps: { actionArg: "action-arg", actionArgs: "action-args", ariaLabel: "aria-label" },
});
</script>

<template>
  <goa-icon-button v-bind="wcProps" @_click="emit('onClick')">
    <slot />
  </goa-icon-button>
</template>
