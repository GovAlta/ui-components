<script setup lang="ts">
import type { GoabIconType } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading: string;
  leadingIcon?: GoabIconType;
  testId?: string;
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
