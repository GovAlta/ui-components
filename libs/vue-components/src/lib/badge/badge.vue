<script setup lang="ts">
import type {
  GoabBadgeType,
  GoabIconType,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  type?: GoabBadgeType;
  icon?: GoabIconType;
  content?: string;
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
  <goa-badge v-bind="wcProps">
    <slot />
  </goa-badge>
</template>
