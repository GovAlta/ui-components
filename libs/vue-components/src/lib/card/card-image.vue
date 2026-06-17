<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  src: string;
  height: string;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-card-image v-bind="wcProps" />
</template>
