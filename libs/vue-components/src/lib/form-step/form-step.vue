<script setup lang="ts">
import type { GoabFormStepStatus } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  text: string;
  status?: GoabFormStepStatus;
  disabled?: boolean;
  testId?: string;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props, { booleanProps: ["disabled"] });
</script>

<template>
  <goa-form-step v-bind="wcProps" />
</template>
