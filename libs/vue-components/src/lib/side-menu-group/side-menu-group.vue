<script setup lang="ts">
import type { GoabIconType, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading: string;
  icon?: GoabIconType;
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
  <goa-side-menu-group v-bind="wcProps">
    <slot />
  </goa-side-menu-group>
</template>
