<script setup lang="ts">
import type { GoabPageBlockSize } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  width?: GoabPageBlockSize;
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
