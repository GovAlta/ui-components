<script setup lang="ts">
import type { GoabPublicFormTaskStatus } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the status.  @default "cannot-start" */
  status?: GoabPublicFormTaskStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: "cannot-start",
});

const wcProps = useWcProps(props);
</script>

<template>
  <goa-public-form-task v-bind="wcProps">
    <slot />
  </goa-public-form-task>
</template>
