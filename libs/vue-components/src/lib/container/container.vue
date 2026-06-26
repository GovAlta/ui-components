<script setup lang="ts">
import type { GoabContainerAccent, GoabContainerPadding, GoabContainerType, GoabContainerWidth, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

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
  /** Sets the minimum height of the container.  @default undefined */
  minHeight?: string;
  /** Sets the maximum height of the container.  @default undefined */
  maxHeight?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
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
</script>

<template>
  <goa-container v-bind="wcProps">
    <slot name="title" />
    <slot />
    <slot name="actions" />
  </goa-container>
</template>
