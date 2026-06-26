<script setup lang="ts">
import type { GoabTextMaxWidth, GoabTextHeadingElement, GoabTextTextElement, GoabTextSize, GoabTextColor, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the tag.  @default undefined */
  tag?: GoabTextTextElement | GoabTextHeadingElement;
  /** Sets the size.  @default undefined */
  size?: GoabTextSize;
  /** Sets the max width.  @default "65ch" */
  maxWidth?: GoabTextMaxWidth;
  /** Sets the color.  @default "primary" */
  color?: GoabTextColor;
  /** Sets the id.  @default undefined */
  id?: string;
  /** Sets the mt.  @default null */
  mt?: Spacing;
  /** Sets the mr.  @default null */
  mr?: Spacing;
  /** Sets the mb.  @default null */
  mb?: Spacing;
  /** Sets the ml.  @default null */
  ml?: Spacing;
}

const props = defineProps<Props>();
const { tag, ...rest } = props;
const wcProps = useWcProps(rest);
</script>

<template>
  <goa-text :as="tag" v-bind="wcProps">
    <slot />
  </goa-text>
</template>
