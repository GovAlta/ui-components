<script setup lang="ts">
import type { GoabIconType } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  text: string;
  action: string;
  icon?: GoabIconType;
  testId?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, {
  renamedProps: { testId: "testid" },
});
</script>

<template>
  <goa-menu-action v-bind="wcProps" />
</template>
