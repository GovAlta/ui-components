<script setup lang="ts">
import type { GoabModalCalloutVariant, GoabModalTransition } from "@abgov/ui-components-common";
import { useSlots, getCurrentInstance, computed } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "actions" named slot. */
  actions?: () => unknown;
  /** Content rendered in the "heading" named slot. */
  heading?: () => unknown;
}

interface Props {
  /** The heading text displayed at the top of the modal.  @default "" */
  heading?: string;
  /** Set the max allowed width of the modal. @default "60ch" */
  maxWidth?: string;
  /** Sets the context and colour of the callout modal. Required when used as a callout type.  @default null */
  calloutVariant?: GoabModalCalloutVariant;
  /** Controls if the modal is visible or not.  @default false */
  open?: boolean;
  /** Sets the animation transition when opening/closing. 'fast' or 'slow' for animated, 'none' for instant.  @default "none" */
  transition?: GoabModalTransition;
  /** Sets a data-testid attribute for automated testing.  @default "modal" */
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
});
const emit = defineEmits<{
  /** Callback fired when the modal is closed. When provided, enables the close button and backdrop click-to-close behavior. */
  onClose: [];
}>();

const wcProps = useWcProps(props, {
  booleanPropsWithFalse: ["open"],
});
const slots = useSlots() as Slots;
const instance = getCurrentInstance();
const closable = computed(() =>
  // Vue prepends event names with "on" so we check for "onOnClose" instead of "onClose"
  instance?.vnode.props?.onOnClose ? "true" : "false",
);
</script>

<template>
  <goa-modal v-bind="wcProps" :closable="closable" @_close="emit('onClose')">
    <div v-if="slots.heading" slot="heading">
      <slot name="heading" />
    </div>
    <div v-if="slots.actions" slot="actions">
      <slot name="actions" />
    </div>
    <slot />
  </goa-modal>
</template>
