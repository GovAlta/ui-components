<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  maxContentWidth?: string;
  url?: string;
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
const slots = useSlots();
</script>

<template>
  <goa-app-footer v-bind="wcProps">
    <div v-if="slots.nav" slot="nav">
      <slot name="nav" />
    </div>
    <div v-if="slots.meta" slot="meta">
      <slot name="meta" />
    </div>
    <slot />
  </goa-app-footer>
</template>
