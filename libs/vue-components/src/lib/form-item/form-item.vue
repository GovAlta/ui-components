<script setup lang="ts">
import type {
  GoabFormItemLabelSize,
  GoabFormItemRequirement,
  GoabFormItemType,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "error" named slot. */
  error?: () => unknown;
  /** Content rendered in the "helptext" named slot. */
  helptext?: () => unknown;
}

interface Props {
  /** Creates a label for the form item.  @default "" */
  label?: string;
  /** Marks the field with an optional or required label indicator.  @default "" */
  requirement?: GoabFormItemRequirement;
  /** Sets the label size. 'regular' for standard, 'large' for emphasis. @default "regular" */
  labelSize?: GoabFormItemLabelSize;
  /** Help text displayed under the form field to provide additional explanation. Accepts a string or ReactNode for custom help content.  @default "" */
  helpText?: string;
  /** Error text displayed under the form field. Leave blank to indicate a valid field. Accepts a string or ReactNode for custom error content.  @default "" */
  error?: string;
  /** Sets the id attribute on the form item element.  @default undefined */
  id?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Sets the maximum width of the form item. @default "none" */
  maxWidth?: string;
  /** Specifies the input type for appropriate message spacing. Used with checkbox-list or radio-group.  @default "" */
  type?: GoabFormItemType;
  /** Overrides the label value within the form-summary to provide a shorter description. For public-form use only.  @default "blank" */
  name?: string;
  /** Sets the display order within the form summary. For public-form use only.  @default 0 */
  publicFormSummaryOrder?: number;
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
  type: "",
});
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
