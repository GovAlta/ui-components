<script setup lang="ts">
import type {
  GoabAccordionHeadingSize,
  GoabAccordionIconPosition,
  GoabAccordionHeadingType,
  Spacing,
} from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "actions" named slot. */
  actions?: () => unknown;
  /** Content rendered in the "headingContent" named slot. */
  headingContent?: () => unknown;
}

interface Props {
  /** Sets the heading text.  @default "" */
  heading?: string;
  /** Sets the state of the accordion container open or closed.  @default "false" */
  open?: boolean;
  /** Sets the heading size of the accordion container heading. @default "small" */
  headingSize?: GoabAccordionHeadingSize;
  /** Sets secondary text displayed alongside the heading.  @default "" */
  secondaryText?: string;
  /** Sets content rendered within the accordion heading, alongside the heading text.  @default undefined */
  headingContent?: string;
  /** Sets the maximum width of the accordion. @default "none" */
  maxWidth?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Sets the position of the expand/collapse icon. @default "left" */
  iconPosition?: GoabAccordionIconPosition;
  /** Sets the accordion style variant. @default "normal" */
  headingType?: GoabAccordionHeadingType;
  /** Sets the mt.  @default null */
  mt?: Spacing;
  /** Sets the mr.  @default null */
  mr?: Spacing;
  /** Sets the mb.  @default "xs" */
  mb?: Spacing;
  /** Sets the ml.  @default null */
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /** Callback fired when the accordion is opened or closed. Receives the new open state as a boolean. */
  onChange: [open: boolean];
}>();

const wcProps = useWcProps(props, { 
  booleanProps: ["open"],
  renamedProps: { headingType: "heading-type" },
});
const slots = useSlots() as Slots;
</script>

<template>
  <goa-accordion v-bind="wcProps" @_change="emit('onChange', $event.detail.open)">
    <div v-if="slots.headingContent" slot="headingcontent">
      <slot name="headingContent" />
    </div>
    <div v-if="slots.actions" slot="actions">
      <slot name="actions" />
    </div>
    <slot />
  </goa-accordion>
</template>
