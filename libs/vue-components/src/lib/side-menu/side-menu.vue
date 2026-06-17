<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
</script>

<template>
  <goa-side-menu v-bind="wcProps">
    <slot />
  </goa-side-menu>
</template>
