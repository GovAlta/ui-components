<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  keyboardNav: "layout" | "table";
  keyboardIconVisibility?: "visible" | "hidden";
  keyboardIconPosition?: "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  keyboardIconVisibility: "visible",
  keyboardIconPosition: "left",
});
const wcProps = useWcProps(props, { transform: "kebab" });
</script>

<template>
  <goa-data-grid v-bind="wcProps">
    <slot />
  </goa-data-grid>
</template>
