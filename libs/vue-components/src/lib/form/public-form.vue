<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { GoabFormState, GoabPublicFormStatus } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  status?: GoabPublicFormStatus;
  name?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "onInit", detail: Event): void;
  (e: "onComplete", detail: GoabFormState): void;
  (e: "onStateChange", detail: unknown): void;
}>();

const wcProps = useWcProps(props);
const element = ref<HTMLElement | null>(null);

onMounted(() => {
  const el = element.value;
  if (!el) return;

  const initHandler = (e: Event) => emit("onInit", e);
  const completeHandler = (e: Event) => emit("onComplete", (e as CustomEvent).detail);
  const stateChangeHandler = (e: Event) => emit("onStateChange", (e as CustomEvent).detail.data);

  el.addEventListener("_init", initHandler);
  el.addEventListener("_complete", completeHandler);
  el.addEventListener("_stateChange", stateChangeHandler);

  onUnmounted(() => {
    el.removeEventListener("_init", initHandler);
    el.removeEventListener("_complete", completeHandler);
    el.removeEventListener("_stateChange", stateChangeHandler);
  });
});
</script>

<template>
  <goa-public-form ref="element" v-bind="wcProps">
    <slot />
  </goa-public-form>
</template>
