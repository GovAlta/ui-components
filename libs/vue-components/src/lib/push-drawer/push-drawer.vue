<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading?: string;
  open?: boolean;
  width?: string;
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
});
const emit = defineEmits<{
  onClose: [];
}>();

const wcProps = useWcProps(props, { booleanProps: ["open"] });
const slots = useSlots();
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
