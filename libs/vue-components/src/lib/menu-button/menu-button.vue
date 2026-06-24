<script setup lang="ts">
import type {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
  GoabMenuButtonOnActionDetail,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  text?: string;
  type?: GoabButtonType;
  size?: GoabButtonSize;
  variant?: GoabButtonVariant;
  maxWidth?: string;
  leadingIcon?: GoabIconType;
  ariaLabel?: string;
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "primary",
});
const emit = defineEmits<{
  onAction: [detail: GoabMenuButtonOnActionDetail];
}>();

const wcProps = useWcProps(props, {
  transform: "kebab",
  renamedProps: { testId: "testid" },
});
</script>

<template>
  <goa-menu-button v-bind="wcProps" @_action="emit('onAction', $event.detail)">
    <slot />
  </goa-menu-button>
</template>
