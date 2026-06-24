<script setup lang="ts">
import type {
  GoabAccordionHeadingSize,
  GoabAccordionIconPosition,
  GoabAccordionHeadingType,
  Spacing,
} from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Props {
  heading?: string;
  open?: boolean;
  headingSize?: GoabAccordionHeadingSize;
  secondaryText?: string;
  headingContent?: string;
  maxWidth?: string;
  testId?: string;
  iconPosition?: GoabAccordionIconPosition;
  headingType?: GoabAccordionHeadingType;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onChange: [open: boolean];
}>();

const wcProps = useWcProps(props, { 
  booleanProps: ["open"],
  renamedProps: { headingType: "heading-type" },
});
const slots = useSlots();
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
