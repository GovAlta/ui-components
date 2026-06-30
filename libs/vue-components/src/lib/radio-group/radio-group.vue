<script setup lang="ts">
import type {
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOrientation,
  GoabRadioGroupSize,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** @required The name for the radio group. Used for accessibility and change events.  @default (required) */
  name: string;
  /** The currently selected value in the radio group.  @default undefined */
  value?: string;
  /** The identifier for the radio group element.  @default undefined */
  id?: string;
  /** Disables all radio items in the group.  @default "false" */
  disabled?: boolean;
  /** Sets the layout direction. 'vertical' stacks items, 'horizontal' places them in a row. @default "vertical" */
  orientation?: GoabRadioGroupOrientation;
  /** Sets the size of all radio items. 'compact' reduces spacing for dense layouts. @default "default" */
  size?: GoabRadioGroupSize;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Shows an error state on all radio items in the group.  @default "false" */
  error?: boolean;
  /** Defines how the radio group will be announced by screen readers.  @default "" */
  ariaLabel?: string;
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
  size: "default",
});
const emit = defineEmits<{
  /** Callback fired when the selected radio item changes. */
  onChange: [detail: GoabRadioGroupOnChangeDetail];
}>();

const wcProps = useWcProps(props, { booleanProps: ["disabled", "error"] });

function onChange(e: Event) {
  const detail = (e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail;
  emit("onChange", { ...detail, event: e });
}
</script>

<template>
  <goa-radio-group v-bind="wcProps" @_change="onChange">
    <slot />
  </goa-radio-group>
</template>
