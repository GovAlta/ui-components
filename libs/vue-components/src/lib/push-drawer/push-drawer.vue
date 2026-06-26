<script setup lang="ts">
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
  /** Sets the heading text or custom heading content.  @default "" */
  heading?: string;
  /** Controls the open/closed state of the push drawer.  @default false */
  open?: boolean;
  /** Sets the width of the push drawer panel. @default "492px" */
  width?: string;
  /** Sets a data-testid attribute for automated testing.  @default undefined */
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
});
const emit = defineEmits<{
  /** @required Callback fired when the push drawer is closed. */
  onClose: [];
}>();

const wcProps = useWcProps(props, { booleanProps: ["open"] });
const slots = useSlots() as Slots;
</script>

<template>
  <goa-push-drawer v-bind="wcProps" @_close="emit('onClose')">
    <div v-if="slots.heading" slot="heading">
      <slot name="heading" />
    </div>
    <div v-if="slots.actions" slot="actions">
      <slot name="actions" />
    </div>
    <slot />
  </goa-push-drawer>
</template>
