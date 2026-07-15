<script setup lang="ts">
import type { GoabContainerAccent, GoabContainerPadding, GoabContainerType, GoabContainerWidth, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";
import { useSlots } from "vue";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "actions" named slot. */
  actions?: () => unknown;
  /** Content rendered in the "title" named slot. */
  title?: () => unknown;
}

interface Props {
  /** Sets the container and accent bar styling. @default "interactive" */
  type?: GoabContainerType;
  /** Sets the style of accent on the container. @default "filled" */
  accent?: GoabContainerAccent;
  /** Sets the amount of white space in the container. @default "relaxed" */
  padding?: GoabContainerPadding;
  /** Sets the width of the container. @default "full" */
  width?: GoabContainerWidth;
  /** Sets the maximum width of the container.  @default "none" */
  maxWidth?: string;
  /** Sets the minimum height of the container. */
  minHeight?: string;
  /** Sets the maximum height of the container. */
  maxHeight?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Sets the mt.  @default null */
  mt?: Spacing;
  /** Sets the mr.  @default null */
  mr?: Spacing;
  /** Sets the mb.  @default "m" */
  mb?: Spacing;
  /** Sets the ml.  @default null */
  ml?: Spacing;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
const slots = useSlots() as Slots;
</script>

<template>
  <goa-container v-bind="wcProps">
    <div v-if="slots.title" slot="title">
      <slot name="title" />
    </div>
    <div v-if="slots.actions" slot="actions">
      <slot name="actions" />
    </div>
    <slot />
  </goa-container>
</template>
