<script setup lang="ts">
import type {
  GoabWorkSideNotificationItemType,
  GoabWorkSideNotificationReadStatus,
  GoabWorkSideNotificationPriority,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  description: string;
  type?: GoabWorkSideNotificationItemType;
  timestamp?: string;
  title?: string;
  readStatus?: GoabWorkSideNotificationReadStatus;
  priority?: GoabWorkSideNotificationPriority;
  testId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onClick: [];
}>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-work-side-notification-item v-bind="wcProps" :read-status="readStatus" @_click="emit('onClick')" />
</template>
