<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  value: string;
  label?: string;
  filter?: string;
  mountType?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mountType: "append",
});
const wcProps = useWcProps(props, { transform: "kebab" });
</script>

<template>
  <goa-dropdown-item v-bind="wcProps" />
</template>
