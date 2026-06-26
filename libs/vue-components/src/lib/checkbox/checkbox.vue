<script setup lang="ts">
import type {
  GoabCheckboxOnChangeDetail,
  GoabCheckboxSize,
  Spacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";
import { computed } from "vue";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "description" named slot. */
  description?: () => unknown;
  /** Content rendered in the "reveal" named slot. */
  reveal?: () => unknown;
}

interface Props {
  /** @required Unique name to identify the checkbox.  @default (required) */
  name: string;
  /** Sets a unique id for the checkbox element.  @default undefined */
  id?: string;
  /** Marks the checkbox item as selected.  @default "false" */
  checked?: boolean;
  /** Shows a mixed/partial selection state. Used for 'Select All' checkboxes when some items are selected.  @default "false" */
  indeterminate?: boolean;
  /** Disable this control. It will not receive focus or events.  @default "false" */
  disabled?: boolean;
  /** Shows an error on the checkbox item.  @default "false" */
  error?: boolean;
  /** Label shown beside the checkbox.  @default "" */
  text?: string;
  /** The value binding.  @default "" */
  value?: string | number | boolean;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Defines how the text will be translated for the screen reader. If not specified it will fall back to the name.  @default "" */
  ariaLabel?: string;
  /** Additional description text displayed below the checkbox label.  @default "" */
  description?: string;
  /** Text announced by screen readers when the reveal slot content is displayed.  @default "" */
  revealAriaLabel?: string;
  /** Sets the maximum width of the checkbox.  @default "none" */
  maxWidth?: string;
  /** Sets the size of the checkbox. 'compact' reduces spacing for dense layouts. @default "default" */
  size?: GoabCheckboxSize;
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
  /** Callback fired when the checkbox selection changes. */
  onChange: [detail: GoabCheckboxOnChangeDetail];
}>();

const wcProps = useWcProps(props, {
  booleanProps: ["checked", "indeterminate", "disabled", "error"],
});

const valueAttr = computed(() => {
  if (typeof props.value === "boolean") {
    return props.value ? "true" : undefined;
  }
  return props.value;
});

function onChange(e: Event) {
  const detail = (e as CustomEvent<GoabCheckboxOnChangeDetail>).detail;
  emit("onChange", { ...detail, event: e });
}
</script>

<template>
  <goa-checkbox
    v-bind="wcProps"
    :value="valueAttr"
    :description="typeof description === 'string' ? description : undefined"
    @_change="onChange"
  >
    <slot />
    <span v-if="$slots.description" slot="description">
      <slot name="description" />
    </span>
    <span v-if="$slots.reveal" slot="reveal">
      <slot name="reveal" />
    </span>
  </goa-checkbox>
</template>
