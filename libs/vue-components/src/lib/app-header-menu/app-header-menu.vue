<script setup lang="ts">
import type { GoabIconType } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required The menu heading text displayed as the dropdown trigger.  @default (required) */
  heading: string;
  /** Icon displayed before the heading text.  @default undefined */
  leadingIcon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing.  @default "rootEl" */
  testId?: string;
  /** Slot name used to place this menu in the correct slot of the parent component.  @default undefined */
  slotName?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { 
  renamedProps: { slotName: "slot" },
});
</script>

<template>
  <goa-app-header-menu v-bind="wcProps">
    <slot />
  </goa-app-header-menu>
</template>
