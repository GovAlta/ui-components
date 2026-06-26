<script setup lang="ts">
import type { GoabSkeletonSize, GoabSkeletonType, Spacing } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required Sets the skeleton shape to represent your content.  @default (required) */
  type: GoabSkeletonType;
  /** Size can affect either the height, width or both for different skeleton types. @default "1" */
  size?: GoabSkeletonSize;
  /** Sets the maximum width. Currently only used in card skeleton type. @default "300px" */
  maxWidth?: string;
  /** Used within components that contain multiple lines. Currently only used in card skeleton type. @default 3 */
  lineCount?: number;
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
const wcProps = useWcProps(props);
</script>

<template>
  <goa-skeleton v-bind="wcProps" />
</template>
