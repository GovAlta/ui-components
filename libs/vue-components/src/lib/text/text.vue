<script setup lang="ts">
import type { GoabTextMaxWidth, GoabTextHeadingElement, GoabTextTextElement, GoabTextSize, GoabTextColor, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  tag?: GoabTextTextElement | GoabTextHeadingElement;
  size?: GoabTextSize;
  maxWidth?: GoabTextMaxWidth;
  color?: GoabTextColor;
  id?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
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
