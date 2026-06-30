<script setup lang="ts">
import type { GoabIconType } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required The text displayed in the group heading.  @default (required) */
  heading: string;
  /** Icon displayed before the group label. When omitted, no icon is rendered and no space is reserved.  @default undefined */
  icon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Whether the group is open.  @default false */
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
