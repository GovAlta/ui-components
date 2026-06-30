<script setup lang="ts">
import type { GoabCalloutAriaLive, GoabCalloutEmphasis, GoabCalloutIconTheme, GoabCalloutSize, GoabCalloutType, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Callout heading text.  @default "" */
  heading?: string;
  /** Sets the context and colour of the callout. @default "information" */
  type?: GoabCalloutType;
  /** Sets the size of the callout. 'medium' has reduced padding and type size for compact areas. @default "large" */
  size?: GoabCalloutSize;
  /** Sets the icon theme. 'outline' for stroked icons, 'filled' for solid icons. @default "outline" */
  iconTheme?: GoabCalloutIconTheme;
  /** Sets the visual prominence. 'high' for full background, 'medium' for subtle, 'low' for minimal. @default "medium" */
  emphasis?: GoabCalloutEmphasis;
  /** Sets the maximum width of the callout.  @default "none" */
  maxWidth?: string;
  /** Indicates how assistive technology should handle updates to the live region. @default "off" */
  ariaLive?: GoabCalloutAriaLive;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Sets the mt.  @default null */
  mt?: Spacing;
  /** Sets the mr.  @default null */
  mr?: Spacing;
  /** Sets the mb.  @default "l" */
  mb?: Spacing;
  /** Sets the ml.  @default null */
  ml?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  type: "information",
  iconTheme: "outline",
  size: "large",
  ariaLive: "off",
  emphasis: "medium",
});
const wcProps = useWcProps(props);
</script>

<template>
  <goa-callout v-bind="wcProps">
    <slot />
  </goa-callout>
</template>
