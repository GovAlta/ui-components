<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
</script>

<template>
  <goa-app-footer-meta-section slot="meta" v-bind="wcProps">
    <slot />
  </goa-app-footer-meta-section>
</template>
