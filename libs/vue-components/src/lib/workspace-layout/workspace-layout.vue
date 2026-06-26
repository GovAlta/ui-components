<script setup lang="ts">
import type { GoabWorkspaceLayoutOnScrollStateChangeDetail } from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "side-menu" named slot. */
  "side-menu"?: () => unknown;
  /** Content rendered in the "page-header" named slot. */
  "page-header"?: () => unknown;
  /** Content rendered in the "page-footer" named slot. */
  "page-footer"?: () => unknown;
  /** Content rendered in the "push-drawer" named slot. */
  "push-drawer"?: () => unknown;
}

interface Props {
  /** Sets a data-testid attribute for automated testing. @default "" */
  testId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /**
   * Callback fired when the internal scroll state changes
   * (no-scroll → at-top → middle → at-bottom).
   */
  onScrollStateChange: [detail: GoabWorkspaceLayoutOnScrollStateChangeDetail];
}>();

const wcProps = useWcProps(props);
const slots = useSlots() as Slots;

function onScrollStateChange(e: Event) {
  const detail = (e as CustomEvent<GoabWorkspaceLayoutOnScrollStateChangeDetail>).detail;
  emit("onScrollStateChange", { ...detail, event: e });
}
</script>

<template>
  <goa-workspace-layout v-bind="wcProps" @_scrollStateChange="onScrollStateChange">
    <div v-if="slots['side-menu']" slot="side-menu">
      <slot name="side-menu" />
    </div>
    <div v-if="slots['page-header']" slot="page-header">
      <slot name="page-header" />
    </div>
    <slot />
    <div v-if="slots['page-footer']" slot="page-footer">
      <slot name="page-footer" />
    </div>
    <div v-if="slots['push-drawer']" slot="push-drawer">
      <slot name="push-drawer" />
    </div>
  </goa-workspace-layout>
</template>
