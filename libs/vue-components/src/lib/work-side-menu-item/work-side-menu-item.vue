<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "popoverContent" named slot. */
  popoverContent?: () => unknown;
  /** Content rendered in the "trailingContent" named slot. */
  trailingContent?: () => unknown;
}

interface Props {
  /** @required The text label displayed for the menu item.  @default (required) */
  label: string;
  /** The URL the menu item links to. When absent, renders as a button instead of a link.  @default "" */
  url?: string;
  /** When true, indicates this is the currently active menu item.  @default false */
  current?: boolean;
  /** When true, displays a divider line above this menu item.  @default false */
  divider?: boolean;
  /** Icon displayed before the menu item label.  @default undefined */
  icon?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { booleanProps: ["current", "divider"] });
const slots = useSlots() as Slots;
</script>

<template>
  <goa-work-side-menu-item v-bind="wcProps">
    <div v-if="slots.popoverContent" slot="popoverContent">
      <slot name="popoverContent" />
    </div>
    <div v-if="slots.trailingContent" slot="trailingContent">
      <slot name="trailingContent" />
    </div>
    <slot />
  </goa-work-side-menu-item>
</template>
