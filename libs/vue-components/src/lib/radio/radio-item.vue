<script setup lang="ts">
import type { Spacing } from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  name?: string;
  value?: string;
  label?: string;
  description?: string;
  revealAriaLabel?: string;
  maxWidth?: string;
  disabled?: boolean;
  checked?: boolean;
  error?: boolean;
  compact?: boolean;
  ariaLabel?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { booleanProps: ["disabled", "checked", "error", "compact"] });
const slots = useSlots();
</script>

<template>
  <goa-radio-item v-bind="wcProps">
    <div v-if="slots.description" slot="description">
      <slot name="description" />
    </div>
    <div v-if="slots.reveal" slot="reveal">
      <slot name="reveal" />
    </div>
    <slot />
  </goa-radio-item>
</template>
