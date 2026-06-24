<script setup lang="ts">
import type { GoabDropdownItemMountType } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  value: string;
  label?: string;
  filter?: string;
  testId?: string;
  mountType?: GoabDropdownItemMountType;
}

const props = withDefaults(defineProps<Props>(), {
  mountType: "append",
});
const wcProps = useWcProps(props, { renamedProps: { mountType: "mount" } });
</script>

<template>
  <goa-dropdown-item v-bind="wcProps" />
</template>
