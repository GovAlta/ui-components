<script setup lang="ts">
import { computed } from "vue";
import type { GoabIconOverridesType, GoabIconSize, GoabIconTheme, GoabIconType, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required The icon type to display. See GoabIconType for available icons.  @default (required) */
  type: GoabIconType | GoabIconOverridesType;
  /** Sets the size of the icon. Accepts numeric (1-6) or named sizes. @default "medium" */
  size?: GoabIconSize;
  /** Sets the icon theme. 'outline' shows stroked icons, 'filled' shows solid icons. @default "outline" */
  theme?: GoabIconTheme;
  /** When true, inverts the icon colors for use on dark backgrounds.  @default "false" */
  inverted?: boolean;
  /** Sets a custom fill color for the icon. Accepts any valid CSS color value.  @default "" */
  fillColor?: string;
  /** Sets the opacity of the icon from 0 (transparent) to 1 (opaque). @default 1 */
  opacity?: number;
  /** Adds an accessible title to the icon SVG. Used by screen readers.  @default "" */
  title?: string;
  /** Defines how the icon will be announced by screen readers.  @default "" */
  ariaLabel?: string;
  /** Sets the ARIA role for the icon. Use 'presentation' for decorative icons. @default "img" */
  role?: string;
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

const props = defineProps<Props>();
const wcProps = useWcProps(props, { booleanProps: ["inverted"] });
</script>

<template>
  <goa-icon v-bind="wcProps" />
</template>
