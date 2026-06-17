<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading?: string;
  maxColumnCount?: number;
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
</script>

<template>
  <goa-app-footer-nav-section slot="nav" v-bind="wcProps">
    <slot />
  </goa-app-footer-nav-section>
</template>
