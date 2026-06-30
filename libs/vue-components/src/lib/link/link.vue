<script setup lang="ts">
import type {
  GoabIconType,
  GoabLinkColor,
  GoabLinkSize,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Icon displayed before the link text.  @default null */
  leadingIcon?: GoabIconType;
  /** Icon displayed after the link text.  @default null */
  trailingIcon?: GoabIconType;
  /** Custom action event name to dispatch when the link is clicked.  @default "" */
  action?: string;
  /** Object of arguments to pass with the action event.  @default {} */
  actionArgs?: Record<string, unknown>;
  /** Single argument to pass with the action event. Deprecated, use actionArgs instead.  @default "" */
  actionArg?: string;
  /** Sets the color theme. 'interactive' for blue, 'dark' for black, 'light' for white text. @default "interactive" */
  color?: GoabLinkColor;
  /** Sets the text size and corresponding icon size. @default "medium" */
  size?: GoabLinkSize;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
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
  color: "interactive",
  size: "medium",
});

const wcProps = useWcProps(props, { 
  jsonProps: ["actionArgs"],
  renamedProps: { actionArg: "action-arg", actionArgs: "action-args" },
});
</script>

<template>
  <goa-link v-bind="wcProps">
    <slot />
  </goa-link>
</template>
