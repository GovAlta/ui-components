<script setup lang="ts">
import type { GoabPopoverPosition, Spacing } from "@abgov/ui-components-common";
import { useSlots, withDefaults } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  maxWidth?: string;
  minWidth?: string;
  padded?: boolean;
  position?: GoabPopoverPosition;
  relative?: boolean;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  padded: true,
});
const wcProps = useWcProps(props, { 
  booleanProps: ["relative"],
  booleanPropsWithFalse: ["padded"],
});
const slots = useSlots();
</script>

<template>
  <goa-popover v-bind="wcProps">
    <div v-if="slots.target" slot="target">
      <slot name="target" />
    </div>
    <slot />
  </goa-popover>
</template>
