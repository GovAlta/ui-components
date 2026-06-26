<script setup lang="ts">
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required Navigation mode. 'table' navigates like a table (up/down between rows), 'layout' allows wrapping between rows with left/right arrows.  @default "table" */
  keyboardNav: "layout" | "table";
  /** Controls visibility of the keyboard navigation indicator icon. @default "visible" */
  keyboardIconVisibility?: "visible" | "hidden";
  /** Position of the keyboard navigation indicator icon. @default "left" */
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
