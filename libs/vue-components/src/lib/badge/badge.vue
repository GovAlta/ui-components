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
  type: GoabBadgeType;
  content?: string;
  ariaLabel?: string;
  iconType?: GoabIconType;
  size?: GoabBadgeSize;
  emphasis?: GoabBadgeEmphasis;
  testId?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
  emphasis: "strong",
});

const wcProps = useWcProps(props);
const iconAttr = computed(() => (props.iconType ? "true" : "false"));
</script>

<template>
  <goa-badge v-bind="wcProps" :icon="iconAttr">
    <slot />
  </goa-badge>
</template>
