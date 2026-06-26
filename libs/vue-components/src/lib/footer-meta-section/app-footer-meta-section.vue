<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets a data-testid attribute for automated testing.  @default "" */
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
