<script setup lang="ts">
import type { GoabDropdownItemMountType } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required The value submitted when this item is selected. */
  value: string;
  /** Display label for the dropdown item. */
  label?: string;
  /** Text used to filter and match this item in typeahead search. */
  filter?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Controls how the item is registered with the parent dropdown.  @default "append" */
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
