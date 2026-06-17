<script setup lang="ts">
import type {
  GoabFormItemLabelSize,
  GoabFormItemRequirement,
  GoabFormItemType,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  label?: string;
  requirement?: GoabFormItemRequirement;
  labelSize?: GoabFormItemLabelSize;
  helpText?: string;
  error?: string;
  id?: string;
  testId?: string;
  maxWidth?: string;
  type?: GoabFormItemType;
  name?: string;
  publicFormSummaryOrder?: number;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { 
  renamedProps: { publicFormSummaryOrder: "public-form-summary-order" },
});
</script>

<template>
  <goa-form-item v-bind="wcProps">
    <span v-if="$slots.error" slot="error">
      <slot name="error" />
    </span>
    <span v-if="$slots.helptext" slot="helptext">
      <slot name="helptext" />
    </span>
    <slot />
  </goa-form-item>
</template>
