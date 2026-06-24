<script setup lang="ts">
import type { GoabWorkSideNotificationActiveTabType } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading?: string;
  activeTab?: GoabWorkSideNotificationActiveTabType;
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  heading: "Notifications",
  activeTab: "unread",
});
const emit = defineEmits<{
  onMarkAllRead: [];
  onViewAll: [];
}>();

const wcProps = useWcProps(props, { renamedProps: { activeTab: "active-tab" } });
</script>

<template>
  <goa-work-side-notification-panel v-bind="wcProps" @_markAllRead="emit('onMarkAllRead')" @_viewAll="emit('onViewAll')">
    <slot />
  </goa-work-side-notification-panel>
</template>
