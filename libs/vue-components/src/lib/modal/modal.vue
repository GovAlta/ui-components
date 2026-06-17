<script setup lang="ts">
import type { GoabModalCalloutVariant, GoabModalTransition } from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading?: string;
  maxWidth?: string;
  calloutVariant?: GoabModalCalloutVariant;
  open?: boolean;
  transition?: GoabModalTransition;
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
});
const emit = defineEmits<{
  onClose: [];
}>();

const wcProps = useWcProps(props, {
  booleanPropsWithFalse: ["open"],
});
const slots = useSlots();
</script>

<template>
  <goa-modal v-bind="wcProps" closable="true" @_close="emit('onClose')">
    <div v-if="slots.heading" slot="heading">
      <slot name="heading" />
    </div>
    <div v-if="slots.actions" slot="actions">
      <slot name="actions" />
    </div>
    <slot />
  </goa-modal>
</template>
