<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  navColumnWidth?: string;
  maxContentWidth?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
const slots = useSlots();
</script>

<template>
  <goa-two-column-layout v-bind="wcProps">
    <div v-if="slots.header" slot="header">
      <slot name="header" />
    </div>
    <div v-if="slots.nav" slot="nav">
      <slot name="nav" />
    </div>
    <slot />
    <div v-if="slots.footer" slot="footer">
      <slot name="footer" />
    </div>
  </goa-two-column-layout>
</template>
