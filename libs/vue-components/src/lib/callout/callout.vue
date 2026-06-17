<script setup lang="ts">
import type { GoabCalloutAriaLive, GoabCalloutEmphasis, GoabCalloutIconTheme, GoabCalloutSize, GoabCalloutType, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading?: string;
  type?: GoabCalloutType;
  size?: GoabCalloutSize;
  iconTheme?: GoabCalloutIconTheme;
  emphasis?: GoabCalloutEmphasis;
  maxWidth?: string;
  ariaLive?: GoabCalloutAriaLive;
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
  <goa-callout v-bind="wcProps">
    <slot />
  </goa-callout>
</template>
