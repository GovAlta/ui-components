<script setup lang="ts">
import type {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the visual style of the button. Use "primary" for main actions, "secondary" for alternative actions, "tertiary" for low-emphasis actions, "start" for prominent call-to-action buttons, and "text" for text-only buttons. @default "primary" */
  type?: GoabButtonType;
  /** Controls the size of the button. Use "compact" for inline actions or space-constrained layouts. @default "normal" */
  size?: GoabButtonSize;
  /** Sets the color variant for semantic meaning. Use "destructive" for delete or irreversible actions, "inverse" for light-colored text on dark backgrounds, and "dark" for dark text color on text buttons only. Note: "dark" has no effect on non-text button types. @default "normal" */
  variant?: GoabButtonVariant;
  /** When true, prevents user interaction and applies disabled styling.  @default "false" */
  disabled?: boolean;
  /** Icon displayed before the button text.  @default null */
  leadingIcon?: GoabIconType;
  /** Icon displayed after the button text.  @default null */
  trailingIcon?: GoabIconType;
  /** Sets a custom width for the button (e.g., "200px" or "100%").  @default "" */
  width?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
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

const props = defineProps<Props>();
const emit = defineEmits<{
  /** Callback fired when the button is clicked. */
  onClick: [];
}>();

const wcProps = useWcProps(props, { 
  booleanProps: ["disabled"],
  jsonProps: ["actionArgs"],
  renamedProps: { actionArg: "action-arg", actionArgs: "action-args" },
});
</script>

<template>
  <goa-button v-bind="wcProps" @_click="emit('onClick')">
    <slot />
  </goa-button>
</template>
