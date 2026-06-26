<script setup lang="ts">
import type { GoabWorkSideNotificationActiveTabType } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the panel heading text. @default "Notifications" */
  heading?: string;
  /** Sets the initially active tab. @default "unread" */
  activeTab?: GoabWorkSideNotificationActiveTabType;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  heading: "Notifications",
  activeTab: "unread",
});
const emit = defineEmits<{
  /** Callback fired when the "Mark all as read" button is clicked. */
  onMarkAllRead: [];
  /** Callback fired when the "View all" button is clicked. */
  onViewAll: [];
}>();

const wcProps = useWcProps(props, { renamedProps: { activeTab: "active-tab" } });
</script>

<template>
  <goa-work-side-notification-panel v-bind="wcProps" @_markAllRead="emit('onMarkAllRead')" @_viewAll="emit('onViewAll')">
    <slot />
  </goa-work-side-notification-panel>
</template>
