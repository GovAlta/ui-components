<script setup lang="ts">
import type { GoabFormState, GoabPublicFormStatus } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the status. */
  status?: GoabPublicFormStatus;
  /** Sets the name. */
  name?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "onInit", detail: Event): void;
  (e: "onComplete", detail: GoabFormState): void;
  (e: "onStateChange", detail: GoabFormState): void;
}>();

const wcProps = useWcProps(props);

function onInit(e: Event) {
  emit("onInit", e);
}

function onComplete(e: Event) {
  emit("onComplete", (e as CustomEvent<GoabFormState>).detail);
}

function onStateChange(e: Event) {
  emit("onStateChange", (e as CustomEvent<{ data: GoabFormState }>).detail.data);
}
</script>

<template>
  <goa-public-form v-bind="wcProps" @_init="onInit" @_complete="onComplete" @_stateChange="onStateChange">
    <slot />
  </goa-public-form>
</template>
