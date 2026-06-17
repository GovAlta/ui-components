<script setup lang="ts">
import type { GoabIconType } from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  icon?: GoabIconType;
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
const slots = useSlots();
</script>

<template>
  <goa-side-menu-heading v-bind="wcProps">
    <slot />
    <div v-if="slots.meta" slot="meta">
      <slot name="meta" />
    </div>
  </goa-side-menu-heading>
</template>
