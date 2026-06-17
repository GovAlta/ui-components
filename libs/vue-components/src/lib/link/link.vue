<script setup lang="ts">
import type {
  GoabIconType,
  GoabLinkColor,
  GoabLinkSize,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  action?: string;
  actionArgs?: Record<string, unknown>;
  actionArg?: string;
  color?: GoabLinkColor;
  size?: GoabLinkSize;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props, { 
  jsonProps: ["actionArgs"],
  renamedProps: { actionArg: "action-arg", actionArgs: "action-args" },
});
</script>

<template>
  <goa-link v-bind="wcProps">
    <slot />
  </goa-link>
</template>
