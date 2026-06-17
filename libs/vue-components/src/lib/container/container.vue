<script setup lang="ts">
import type { GoabContainerAccent, GoabContainerPadding, GoabContainerType, GoabContainerWidth, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  type?: GoabContainerType;
  accent?: GoabContainerAccent;
  padding?: GoabContainerPadding;
  width?: GoabContainerWidth;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
</script>

<template>
  <goa-container v-bind="wcProps">
    <slot name="title" />
    <slot />
    <slot name="actions" />
  </goa-container>
</template>
