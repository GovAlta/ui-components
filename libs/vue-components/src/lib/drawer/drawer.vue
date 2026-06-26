<script setup lang="ts">
import type { GoabDrawerPosition, GoabDrawerSize } from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "actions" named slot. */
  actions?: () => unknown;
  /** Content rendered in the "heading" named slot. */
  heading?: () => unknown;
}

interface Props {
  /** @required The position of the drawer.  @default undefined */
  position: GoabDrawerPosition;
  /** Whether the drawer is open.  @default undefined */
  open?: boolean;
  /** The heading text displayed at the top of the drawer. Accepts a string or a ReactNode for custom heading content.  @default "" */
  heading?: string;
  /** Sets max height on bottom position, sets width on left and right position.  @default undefined */
  maxSize?: GoabDrawerSize;
  /** Sets a data-testid attribute for automated testing.  @default "drawer" */
  testId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /** @required Callback fired when the drawer requests to be closed. */
  onClose: [];
}>();

const wcProps = useWcProps(props, { 
  booleanProps: ["open"],
});
const slots = useSlots() as Slots;
</script>

<template>
  <goa-drawer v-bind="wcProps" @_close="emit('onClose')">
    <div v-if="slots.heading" slot="heading">
      <slot name="heading" />
    </div>
    <div v-if="slots.actions" slot="actions">
      <slot name="actions" />
    </div>
    <slot />
  </goa-drawer>
</template>
