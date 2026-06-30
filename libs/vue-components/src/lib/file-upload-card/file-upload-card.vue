<script setup lang="ts">
import type {
  GoabFileUploadOnCancelDetail,
  GoabFileUploadOnDeleteDetail,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required The name of the uploaded file to display.  @default (required) */
  filename: string;
  /** @required The file size in bytes. Displayed in a human-readable format (KB, MB).  @default (required) */
  size: number;
  /** The MIME type of the file. Used to determine the file type icon.  @default "" */
  type?: string;
  /** Upload progress percentage from 0-100. Use -1 to indicate upload is complete. @default -1 */
  progress?: number;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Error message to display. When set, the card shows an error state with a cancel button.  @default "" */
  error?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /** Callback fired when the user clicks the remove button on an uploaded file. */
  onDelete: [detail: GoabFileUploadOnDeleteDetail & { event: Event }];
  /** Callback fired when the user clicks the cancel button during file upload. */
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
