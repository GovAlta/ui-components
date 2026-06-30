<script setup lang="ts">
import type { GoabIconType } from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "meta" named slot. */
  meta?: () => unknown;
}

interface Props {
  /** Icon displayed before the heading text.  @default null */
  icon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing.  @default "section-heading" */
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
const slots = useSlots() as Slots;
</script>

<template>
  <goa-side-menu-heading v-bind="wcProps">
    <slot />
    <span v-if="slots.meta" slot="meta">
      <slot name="meta" />
    </span>
  </goa-side-menu-heading>
</template>
