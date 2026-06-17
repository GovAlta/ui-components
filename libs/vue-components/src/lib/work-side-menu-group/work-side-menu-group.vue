<script setup lang="ts">
import type { GoabIconType } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading: string;
  icon?: GoabIconType;
  testId?: string;
  open?: boolean;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props, { booleanProps: ["open"] });
</script>

<template>
  <goa-work-side-menu-group v-bind="wcProps">
    <slot />
  </goa-work-side-menu-group>
</template>
