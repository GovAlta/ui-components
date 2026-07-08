<script setup lang="ts">
import type { Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the heading. */
  heading?: string;
  /** Sets the mt. */
  mt?: Spacing;
  /** Sets the mr. */
  mr?: Spacing;
  /** Sets the mb. */
  mb?: Spacing;
  /** Sets the ml. */
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
