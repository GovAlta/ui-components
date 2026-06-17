<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  leftColumnWidth?: string;
  rightColumnWidth?: string;
  maxContentWidth?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
const slots = useSlots();
</script>

<template>
  <goa-three-column-layout v-bind="wcProps">
    <div v-if="slots.header" slot="header">
      <slot name="header" />
    </div>
    <div v-if="slots.nav" slot="nav">
      <slot name="nav" />
    </div>
    <div v-if="slots['side-menu']" slot="side-menu">
      <slot name="side-menu" />
    </div>
    <slot />
    <div v-if="slots.footer" slot="footer">
      <slot name="footer" />
    </div>
  </goa-three-column-layout>
</template>
