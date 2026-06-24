<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  label: string;
  url?: string;
  current?: boolean;
  divider?: boolean;
  icon?: string;
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { booleanProps: ["current", "divider"] });
const slots = useSlots();
</script>

<template>
  <goa-work-side-menu-item v-bind="wcProps">
    <div v-if="slots.popoverContent" slot="popoverContent">
      <slot name="popoverContent" />
    </div>
    <div v-if="slots.trailingContent" slot="trailingContent">
      <slot name="trailingContent" />
    </div>
    <slot />
  </goa-work-side-menu-item>
</template>
