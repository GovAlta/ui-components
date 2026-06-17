<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading?: string;
  secondaryText?: string;
  url?: string;
  maxContentWidth?: string;
  fullMenuBreakpoint?: number;
  testId?: string;
  onMenuClick?: () => void;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { 
  booleanProps: ["onMenuClick"],
  renamedProps: { onMenuClick: "hasmenuclickhandler" },
});
const slots = useSlots();
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
