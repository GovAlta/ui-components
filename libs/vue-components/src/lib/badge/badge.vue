<script setup lang="ts">
import type {
  GoabBadgeEmphasis,
  GoabBadgeSize,
  GoabBadgeType,
  GoabIconType,
  Spacing,
} from "@abgov/ui-components-common";
import { computed } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required Sets the context and colour of the badge.  @default (required) */
  type: GoabBadgeType;
  /** Text label of the badge.  @default "" */
  content?: string;
  /** Accessible label for screen readers.  @default "" */
  ariaLabel?: string;
  /** Icon type to display in the badge.  @default null */
  iconType?: GoabIconType;
  /** Sets the size of the badge. @default "medium" */
  size?: GoabBadgeSize;
  /** Sets the visual emphasis. 'subtle' for less prominent, 'strong' for more emphasis. @default "strong" */
  emphasis?: GoabBadgeEmphasis;
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

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
  emphasis: "strong",
});

const wcProps = useWcProps(props);
const iconAttr = computed(() => props.iconType ? "true" : "false");
</script>

<template>
  <goa-badge v-bind="wcProps" :icon="iconAttr" :icontype="iconType">
    <slot />
  </goa-badge>
</template>
