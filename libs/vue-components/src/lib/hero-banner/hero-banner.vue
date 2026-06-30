<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "actions" named slot. */
  actions?: () => unknown;
}

interface Props {
  /** @required Main heading text.  @default (required) */
  heading: string;
  /** Background image url.  @default undefined */
  backgroundUrl?: string;
  /** Minimum height of the hero banner. Defaults to 600px when a background image is provided.  @default undefined */
  minHeight?: string;
  /** Sets a data-testid attribute for automated testing.  @default "background" */
  testId?: string;
  /** Maximum width of the content area. @default undefined */
  maxContentWidth?: string;
  /** Hero Banner background color when no background image is provided. @default "#f8f8f8" */
  backgroundColor?: string;
  /** Text color within the hero banner.  @default "" */
  textColor?: string;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props);
const slots = useSlots() as Slots;
</script>

<template>
  <goa-hero-banner v-bind="wcProps">
    <slot />
    <div v-if="slots.actions" slot="actions">
      <slot name="actions" />
    </div>
  </goa-hero-banner>
</template>
