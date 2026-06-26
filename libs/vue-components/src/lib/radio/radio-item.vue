<script setup lang="ts">
import type { Spacing } from "@abgov/ui-components-common";
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "description" named slot. */
  description?: () => unknown;
  /** Content rendered in the "reveal" named slot. */
  reveal?: () => unknown;
}

interface Props {
  /** The name of the radio group. Inherited from the parent RadioGroup if not set.  @default "" */
  name?: string;
  /** The value of this radio option. Will be emitted when selected.  @default undefined */
  value?: string;
  /** The display label for this radio option. Falls back to value if not provided.  @default "" */
  label?: string;
  /** Additional description text displayed below the label.  @default "" */
  description?: string;
  /** Text announced by screen readers when the reveal content is displayed.  @default "" */
  revealAriaLabel?: string;
  /** Sets the maximum width of this radio item.  @default "none" */
  maxWidth?: string;
  /** Disables this radio option. Also disabled if the parent RadioGroup is disabled.  @default "false" */
  disabled?: boolean;
  /** @internal Sets this radio option as checked/selected.  @default "false" */
  checked?: boolean;
  /** Shows an error state on this radio option.  @default "false" */
  error?: boolean;
  /** Reduces spacing for dense layouts.  @default undefined */
  compact?: boolean;
  /** Defines how this option will be announced by screen readers.  @default "" */
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

const props = defineProps<Props>();
const wcProps = useWcProps(props, { booleanProps: ["disabled", "checked", "error", "compact"] });
const slots = useSlots() as Slots;
</script>

<template>
  <goa-radio-item v-bind="wcProps">
    <div v-if="slots.description" slot="description">
      <slot name="description" />
    </div>
    <div v-if="slots.reveal" slot="reveal">
      <slot name="reveal" />
    </div>
    <slot />
  </goa-radio-item>
</template>
