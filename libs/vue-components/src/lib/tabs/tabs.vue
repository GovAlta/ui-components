<script setup lang="ts">
import type {
  GoabTabsNavigation,
  GoabTabsOnChangeDetail,
  GoabTabsOrientation,
  GoabTabsVariant,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  initialTab?: number;
  testId?: string;
  variant?: GoabTabsVariant;
  orientation?: GoabTabsOrientation;
  navigation?: GoabTabsNavigation;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onChange: [detail: GoabTabsOnChangeDetail];
}>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-tabs v-bind="wcProps" @_change="emit('onChange', $event.detail)">
    <slot />
  </goa-tabs>
</template>
