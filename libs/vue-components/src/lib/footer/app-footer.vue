<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** The maximum width of the main content area.  @default "" */
  maxContentWidth?: string;
  /** URL for the Government of Alberta logo link. Set to empty string to disable the link. @default "https://alberta.ca" */
  url?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
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
