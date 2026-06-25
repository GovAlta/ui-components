<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  maxContentWidth?: string;
  url?: string;
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
</script>

<template>
  <goa-app-footer v-bind="wcProps">
    <slot />
  </goa-app-footer>
</template>
