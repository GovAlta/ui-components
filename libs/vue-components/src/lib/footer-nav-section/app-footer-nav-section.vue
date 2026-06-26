<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** The section heading displayed above the navigation links.  @default "" */
  heading?: string;
  /** Maximum number of columns to display links in on larger screens. @default 1 */
  maxColumnCount?: number;
  /** Sets a data-testid attribute for automated testing.  @default "" */
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
