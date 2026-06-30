<script setup lang="ts">
import type {
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadInputVariant,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** The input display variant. "dragdrop" shows a drag-and-drop area, "button" shows a simple button. @default "dragdrop" */
  variant?: GoabFileUploadInputVariant;
  /** Accepted file types as a comma-separated list of MIME types or file extensions (e.g., "image/*,.pdf").  @default "*" */
  accept?: string;
  /** Maximum file size with unit (e.g., "5MB", "100KB", "1GB"). Files exceeding this will be rejected. @default "5MB" */
  maxFileSize?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /** @required Callback fired when a valid file is selected or dropped. */
  onSelectFile: [detail: GoabFileUploadInputOnSelectFileDetail & { event: Event }];
}>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-file-upload-input v-bind="wcProps" @_selectFile="emit('onSelectFile', { ...$event.detail, event: $event })" />
</template>
