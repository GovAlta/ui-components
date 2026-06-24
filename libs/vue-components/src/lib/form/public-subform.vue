<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  id?: string;
  name?: string;
  continueMsg?: string;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  id: "",
  name: "",
  continueMsg: "",
});
const emit = defineEmits<{
  (e: "onInit", detail: Event): void;
  (e: "onStateChange", detail: Event): void;
}>();

const wcProps = useWcProps(props, { transform: "kebab" });
const element = ref<HTMLElement | null>(null);

onMounted(() => {
  const el = element.value;
  if (!el) return;

  const initHandler = (e: Event) => emit("onInit", e);
  const stateChangeHandler = (e: Event) => emit("onStateChange", e);

  el.addEventListener("_init", initHandler);
  el.addEventListener("_stateChange", stateChangeHandler);

  onUnmounted(() => {
    el.removeEventListener("_init", initHandler);
    el.removeEventListener("_stateChange", stateChangeHandler);
  });
});
</script>

<template>
  <goa-public-subform ref="element" v-bind="wcProps">
    <slot />
  </goa-public-subform>
</template>
