<script setup lang="ts">
import type {
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadInputVariant,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  variant?: GoabFileUploadInputVariant;
  accept?: string;
  maxFileSize?: string;
  testId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onSelectFile: [detail: GoabFileUploadInputOnSelectFileDetail & { event: Event }];
}>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-file-upload-input v-bind="wcProps" @_selectFile="emit('onSelectFile', { ...$event.detail, event: $event })" />
</template>
