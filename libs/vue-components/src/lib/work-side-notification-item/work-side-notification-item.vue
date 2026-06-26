<script setup lang="ts">
import type {
  GoabWorkSideNotificationItemType,
  GoabWorkSideNotificationReadStatus,
  GoabWorkSideNotificationPriority,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required The body text content of the notification card.  @default "" */
  description: string;
  /** Sets the visual type/style of the notification item. @default "default" */
  type?: GoabWorkSideNotificationItemType;
  /** ISO timestamp string representing when the notification occurred.  @default "" */
  timestamp?: string;
  /** Title text displayed in the notification card header.  @default "" */
  title?: string;
  /** Indicates whether the notification has been read or is unread. @default "unread" */
  readStatus?: GoabWorkSideNotificationReadStatus;
  /** Sets the urgency level of the notification. @default "normal" */
  priority?: GoabWorkSideNotificationPriority;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /** Callback fired when the notification item is clicked. */
  onClick: [];
}>();

const wcProps = useWcProps(props, { renamedProps: { readStatus: "read-status" } });
</script>

<template>
  <goa-work-side-notification-item v-bind="wcProps" @_click="emit('onClick')" />
</template>
