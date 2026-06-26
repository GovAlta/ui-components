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
  /** The button label text. When provided, displays as a text button with a dropdown icon.  @default "" */
  text?: string;
  /** The button style variant. @default "primary" */
  type?: GoabButtonType;
  /** Sets the size of the button. @default undefined */
  size?: GoabButtonSize;
  /** Sets the color variant for semantic meaning. @default undefined */
  variant?: GoabButtonVariant;
  /** Maximum width of the dropdown menu.  @default undefined */
  maxWidth?: string;
  /** Icon displayed before the button text. When no text is provided, displays as an icon button.  @default undefined */
  leadingIcon?: GoabIconType;
  /** Sets the aria-label for the icon button in icon-only mode. @default undefined */
  ariaLabel?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "primary",
});
const emit = defineEmits<{
  /** Callback fired when a menu action is selected. */
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
