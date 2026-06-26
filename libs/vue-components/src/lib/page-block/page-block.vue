<script setup lang="ts">
import type { GoabPageBlockSize } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Maximum width of the content area. Use "full" for 100% width or a CSS dimension like "1200px". @default "full" */
  width?: GoabPageBlockSize;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
</script>

<template>
  <goa-page-block v-bind="wcProps">
    <slot />
  </goa-page-block>
</template>
