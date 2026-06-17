<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading: string;
  url: string;
  userName?: string;
  userSecondaryText?: string;
  testId?: string;
  open?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onToggle: [];
  onNavigate: [path: string];
}>();

const wcProps = useWcProps(props, { 
  booleanProps: ["open"],
  renamedProps: {
    userName: "user-name",
    userSecondaryText: "user-secondary-text",
  },
});
const slots = useSlots();
</script>

<template>
  <goa-work-side-menu v-bind="wcProps" @_toggle="emit('onToggle')" @_navigate="emit('onNavigate', $event.detail.url)">
    <div v-if="slots.primary" slot="primary">
      <slot name="primary" />
    </div>
    <div v-if="slots.secondary" slot="secondary">
      <slot name="secondary" />
    </div>
    <div v-if="slots.account" slot="account">
      <slot name="account" />
    </div>
  </goa-work-side-menu>
</template>
