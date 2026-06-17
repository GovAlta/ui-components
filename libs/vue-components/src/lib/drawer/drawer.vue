<script setup lang="ts">
import type { GoabDrawerPosition, GoabDrawerSize } from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  position: GoabDrawerPosition;
  open?: boolean;
  heading?: string;
  maxSize?: GoabDrawerSize;
  closeButtonVisibility?: "visible" | "hidden";
  testId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onClose: [];
}>();

const wcProps = useWcProps(props, { 
  booleanProps: ["open"],
  renamedProps: { closeButtonVisibility: "close-button-visibility" },
});
const slots = useSlots();
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
