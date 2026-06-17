<script setup lang="ts">
import type {
  GoabFileUploadOnCancelDetail,
  GoabFileUploadOnDeleteDetail,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  filename: string;
  size: number;
  type?: string;
  progress?: number;
  testId?: string;
  error?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onDelete: [detail: GoabFileUploadOnDeleteDetail & { event: Event }];
  onCancel: [detail: GoabFileUploadOnCancelDetail & { event: Event }];
}>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-file-upload-card
    v-bind="wcProps"
    @_delete="emit('onDelete', { filename: props.filename, event: $event })"
    @_cancel="emit('onCancel', { filename: props.filename, event: $event })"
  />
</template>
