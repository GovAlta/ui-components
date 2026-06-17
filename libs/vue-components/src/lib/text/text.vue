<script setup lang="ts">
import type { GoabTextMaxWidth, GoabTextHeadingElement, GoabTextTextElement, GoabTextSize, GoabTextColor, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  as?: GoabTextTextElement | GoabTextHeadingElement;
  tag?: GoabTextTextElement | GoabTextHeadingElement;
  size?: GoabTextSize;
  maxWidth?: GoabTextMaxWidth;
  color?: GoabTextColor;
  id?: string;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const { as, tag, ...rest } = props;
const wcProps = useWcProps(rest);
</script>

<template>
  <goa-text :as="tag || as" v-bind="wcProps">
    <slot />
  </goa-text>
</template>
