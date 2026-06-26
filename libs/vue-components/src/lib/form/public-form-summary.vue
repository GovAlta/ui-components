<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the heading.  @default "" */
  heading?: string;
}

const props = withDefaults(defineProps<Props>(), {
  heading: "",
});
const wcProps = useWcProps(props);
</script>

<template>
  <goa-public-form-summary v-bind="wcProps" />
</template>
