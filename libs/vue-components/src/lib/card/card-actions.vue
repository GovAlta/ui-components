<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  testId?: string;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-card-actions v-bind="wcProps">
    <slot />
  </goa-card-actions>
</template>
