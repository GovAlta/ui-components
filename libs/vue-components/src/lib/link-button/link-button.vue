<script setup lang="ts">
import type { GoabIconType, GoabLinkButtonType, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  type?: GoabLinkButtonType;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-link-button v-bind="wcProps">
    <slot />
  </goa-link-button>
</template>
