<script setup lang="ts">
import type { GoabPopoverPosition, Spacing } from "@abgov/ui-components-common";
import { useSlots, onMounted, nextTick } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "target" named slot. */
  target?: () => unknown;
}

interface Props {
  /** Sets the maximum width of the popover container. @default "320px" */
  maxWidth?: string;
  /** Sets the minimum width of the popover container.  @default "" */
  minWidth?: string;
  /** Sets if the popover has padding. Use false when content needs to be flush with boundaries. @default true */
  padded?: boolean;
  /** Provides control to where the popover content is positioned. @default "auto" */
  position?: GoabPopoverPosition;
  /** Sets a data-testid attribute for automated testing.  @default "popover" */
  testId?: string;
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
  padded: true,
});
const wcProps = useWcProps(props, {
  booleanPropsWithFalse: ["padded"],
});
const slots = useSlots() as Slots;

onMounted(() => {
  nextTick(() => {
    const hasTargetContent = !!slots.target;
    if (!hasTargetContent) {
      console.warn("Popover: a `target` slot is required.");
    }
  });
});
</script>

<template>
  <goa-popover v-bind="wcProps">
    <div v-if="slots.target" slot="target">
      <slot name="target" />
    </div>
    <slot />
  </goa-popover>
</template>
