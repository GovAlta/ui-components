<script setup lang="ts">
import type { GoabIconType, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required The heading text for the menu group.  @default (required) */
  heading: string;
  /** Icon displayed alongside the heading.  @default null */
  icon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
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
const wcProps = useWcProps(props);
</script>

<template>
  <goa-side-menu-group v-bind="wcProps">
    <slot />
  </goa-side-menu-group>
</template>
