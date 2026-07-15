<script setup lang="ts">
import { useSlots, watch, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "heading" named slot. */
  heading?: () => unknown;
}

interface Props {
  /** The text label for this tab. Can also pass React nodes for custom heading content. */
  heading?: string;
  /** When true, disables the tab so it cannot be selected.  @default false */
  disabled?: boolean;
  /** URL-friendly identifier for the tab, used for hash-based navigation. */
  slug?: string;
}

const props = defineProps<Props>();
const instance = getCurrentInstance();

const wcProps = useWcProps(props, { booleanProps: ["disabled"] });
const slots = useSlots() as Slots;

// Notify parent tabs component when disabled changes
// This allows the web component to update its internal state
watch(() => props.disabled, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    const el = instance?.vnode.el as HTMLElement | null;
    if (el && el.parentElement) {
      // Dispatch a custom event that the tabs component can listen for
      el.parentElement.dispatchEvent(new CustomEvent("tab:disabled-change", {
        bubbles: true,
        composed: true,
      }));
    }
  }
}, { immediate: false });
</script>

<template>
  <goa-tab v-bind="wcProps">
    <span v-if="slots.heading" slot="heading">
      <slot name="heading" />
    </span>
    <slot />
  </goa-tab>
</template>
