<script setup lang="ts">
import type { GoabTooltipHorizontalAlignment, GoabTooltipPosition, Spacing } from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  position?: GoabTooltipPosition;
  content?: string;
  hAlign?: GoabTooltipHorizontalAlignment;
  testId?: string;
  maxWidth?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props);
const slots = useSlots();
</script>

<template>
  <goa-tooltip v-bind="wcProps">
    <div v-if="slots.content" slot="content">
      <slot name="content" />
    </div>
    <slot />
  </goa-tooltip>
</template>
