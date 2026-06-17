<script setup lang="ts">
import type { GoabFilterChipTheme, GoabIconType, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  content: string;
  iconTheme?: GoabFilterChipTheme;
  error?: boolean;
  secondaryText?: string;
  leadingIcon?: GoabIconType;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onClick: [];
}>();

const wcProps = useWcProps(props, { booleanProps: ["error"] });
</script>

<template>
  <goa-filter-chip v-bind="wcProps" @_click="emit('onClick')" />
</template>
