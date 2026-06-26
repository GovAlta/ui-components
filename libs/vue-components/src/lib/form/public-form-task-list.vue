<script setup lang="ts">
import type { Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the heading.  @default undefined */
  heading?: string;
  /** Sets the mt.  @default undefined */
  mt?: Spacing;
  /** Sets the mr.  @default undefined */
  mr?: Spacing;
  /** Sets the mb.  @default undefined */
  mb?: Spacing;
  /** Sets the ml.  @default undefined */
  ml?: Spacing;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
</script>

<template>
  <goa-public-form-task-list v-bind="wcProps">
    <slot />
  </goa-public-form-task-list>
</template>
