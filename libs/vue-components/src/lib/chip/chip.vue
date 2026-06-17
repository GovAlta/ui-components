<script setup lang="ts">
import type { GoabChipTheme, GoabChipVariant, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  content: string;
  deletable?: boolean;
  leadingIcon?: string;
  iconTheme?: GoabChipTheme;
  error?: boolean;
  variant?: GoabChipVariant;
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

const wcProps = useWcProps(props, { booleanProps: ["deletable", "error"] });
</script>

<template>
  <goa-chip v-bind="wcProps" @_click="emit('onClick')" />
</template>
