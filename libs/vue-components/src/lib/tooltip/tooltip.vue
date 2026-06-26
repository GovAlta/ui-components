<script setup lang="ts">
import type { GoabTooltipHorizontalAlignment, GoabTooltipPosition, Spacing } from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "content" named slot. */
  content?: () => unknown;
}

interface Props {
  /** Position of the tooltip with respect to the child element. @default "top" */
  position?: GoabTooltipPosition;
  /** The content of the tooltip. Accepts plain text or rich content.  @default "" */
  content?: string;
  /** Horizontal alignment of the tooltip relative to the child element. @default "center" */
  hAlign?: GoabTooltipHorizontalAlignment;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Sets the maximum width of the tooltip. Must use 'px' unit.  @default "" */
  maxWidth?: string;
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

const wcProps = useWcProps(props);
const slots = useSlots() as Slots;
</script>

<template>
  <goa-tooltip v-bind="wcProps">
    <div v-if="slots.content" slot="content">
      <slot name="content" />
    </div>
    <slot />
  </goa-tooltip>
</template>
