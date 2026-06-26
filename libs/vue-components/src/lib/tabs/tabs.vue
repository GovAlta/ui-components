<script setup lang="ts">
import type {
  GoabTabsNavigation,
  GoabTabsOnChangeDetail,
  GoabTabsOrientation,
  GoabTabsVariant,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** The initially active tab (1-based index). If not set, the first tab is active.  @default -1 */
  initialTab?: number;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Visual style variant. "segmented" shows pill-style tabs with animation. @default "default" */
  variant?: GoabTabsVariant;
  /** Tab layout orientation. "auto" stacks vertically on mobile, "horizontal" keeps horizontal on all screen sizes. @default "auto" */
  orientation?: GoabTabsOrientation;
  /** Controls URL navigation mode on tab change. @default "hash" */
  navigation?: GoabTabsNavigation;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /** Callback fired when the active tab changes. */
  onChange: [detail: GoabTabsOnChangeDetail];
}>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-tabs v-bind="wcProps" @_change="emit('onChange', $event.detail)">
    <slot />
  </goa-tabs>
</template>
