<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "banner" named slot. */
  banner?: () => unknown;
  /** Content rendered in the "navigation" named slot. */
  navigation?: () => unknown;
  /** Content rendered in the "phase" named slot. */
  phase?: () => unknown;
  /** Content rendered in the "utilities" named slot. */
  utilities?: () => unknown;
}

interface Props {
  /** Set the service name to display in the app header.  @default "" */
  heading?: string;
  /** V2 only: Secondary text displayed under the service name.  @default "" */
  secondaryText?: string;
  /** Set the URL to link from the alberta.ca logo. A full url is required.  @default "" */
  url?: string;
  /** Maximum width of the content area.  @default undefined */
  maxContentWidth?: string;
  /** Sets the breakpoint in px for the full menu to display.  @default TABLET_BP */
  fullMenuBreakpoint?: number;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Callback fired when the menu button is clicked. When provided, clicking the menu button dispatches a custom event instead of toggling the menu.  @default undefined */
  onMenuClick?: () => void;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { 
  booleanProps: ["onMenuClick"],
  renamedProps: { onMenuClick: "hasmenuclickhandler" },
});
const slots = useSlots() as Slots;
</script>

<template>
  <goa-app-header v-bind="wcProps" @_menuClick="props.onMenuClick?.()">
    <div v-if="slots.banner" slot="banner">
      <slot name="banner" />
    </div>
    <div v-if="slots.phase" slot="phase">
      <slot name="phase" />
    </div>
    <div v-if="slots.utilities" slot="utilities">
      <slot name="utilities" />
    </div>
    <div v-if="slots.navigation" slot="navigation">
      <slot name="navigation" />
    </div>
    <slot />
  </goa-app-header>
</template>
