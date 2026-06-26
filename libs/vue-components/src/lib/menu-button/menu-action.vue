<script setup lang="ts">
import type { GoabIconType } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required Display text for the menu action.  @default "" */
  text: string;
  /** @required Action identifier included in the click event.  @default "default" */
  action: string;
  /** Icon displayed before the text.  @default undefined */
  icon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing.  @default "" */
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
