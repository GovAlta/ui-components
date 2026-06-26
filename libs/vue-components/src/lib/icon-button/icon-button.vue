<script setup lang="ts">
import type {
  GoabIconButtonVariant,
  GoabIconSize,
  GoabIconTheme,
  GoabIconType,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required Sets the icon.  @default (required) */
  icon: GoabIconType;
  /** Sets the size of button. @default "medium" */
  size?: GoabIconSize;
  /** Styles the button to show color, light, dark or destructive action. @default "color" */
  variant?: GoabIconButtonVariant;
  /** Sets the theme of the icon inside the button. "outline" for stroked icons, "filled" for solid icons. @default "outline" */
  theme?: GoabIconTheme;
  /** Sets the title of the button.  @default "" */
  title?: string;
  /** Disables the button.  @default "false" */
  disabled?: boolean;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Sets the aria-label of the button.  @default "" */
  ariaLabel?: string;
  /** Action identifier passed in click events for event delegation patterns.  @default "" */
  action?: string;
  /** Multiple argument values passed with the action in click events.  @default {} */
  actionArgs?: Record<string, unknown>;
  /** Single argument value passed with the action in click events.  @default "" */
  actionArg?: string;
  /** Sets the mt.  @default null */
  mt?: Spacing;
  /** Sets the mr.  @default null */
  mr?: Spacing;
  /** Sets the mb.  @default null */
  mb?: Spacing;
  /** Sets the ml.  @default null */
  ml?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "color",
  size: "medium",
  theme: "outline",
});
const emit = defineEmits<{
  /** Callback fired when the icon button is clicked. */
  onClick: [];
}>();

const wcProps = useWcProps(props, { 
  booleanProps: ["disabled"],
  jsonProps: ["actionArgs"],
  renamedProps: { actionArg: "action-arg", actionArgs: "action-args" },
});
</script>

<template>
  <goa-icon-button v-bind="wcProps" @_click="emit('onClick')">
    <slot />
  </goa-icon-button>
</template>
