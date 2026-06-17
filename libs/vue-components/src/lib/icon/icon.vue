<script setup lang="ts">
import { computed } from "vue";
import type { GoabIconOverridesType, GoabIconSize, GoabIconTheme, GoabIconType, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  type: GoabIconType | GoabIconOverridesType;
  size?: GoabIconSize;
  theme?: GoabIconTheme;
  inverted?: string | boolean;
  fillColor?: string;
  opacity?: number;
  title?: string;
  ariaLabel?: string;
  role?: string;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { booleanProps: ["inverted"], renamedProps: { ariaLabel: "aria-label" } });
</script>

<template>
  <goa-icon v-bind="wcProps" />
</template>
