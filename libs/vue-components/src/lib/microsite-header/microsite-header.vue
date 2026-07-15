<script setup lang="ts">
import { computed, useSlots, useAttrs } from "vue";
import type { GoabServiceLevel, GoabLinkTarget } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "version" named slot. */
  version?: () => unknown;
}

interface Props {
  /** @required The service type which determines the badge style. "live" shows official government site text, "alpha" and "beta" show development stage badges. */
  type: GoabServiceLevel;
  /** App or service version displayed on the right side of the header. */
  version?: string;
  /** URL to a feedback page displayed when provided. */
  feedbackUrl?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Maximum width of the content area. @default "100%" */
  maxContentWidth?: string;
  /** Sets the target attribute for the feedback URL link. @default "blank" */
  feedbackUrlTarget?: GoabLinkTarget;
  /** Sets the target attribute for the header link. @default "blank" */
  headerUrlTarget?: GoabLinkTarget;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /** Callback fired when the feedback link is clicked, enables custom feedback handling. */
  onFeedbackClick: [];
}>();

const attrs = useAttrs();
const hasFeedbackClickHandler = computed(() => 
  typeof attrs.onFeedbackClick !== "undefined"
);

const wcProps = useWcProps(props);
const computedWcProps = computed(() => ({
  ...wcProps.value,
  hasfeedbackhandler: hasFeedbackClickHandler.value ? "true" : "false",
}));

const slots = useSlots() as Slots;

function onFeedbackClick(e: Event) {
  emit("onFeedbackClick");
}
</script>

<template>
  <goa-microsite-header v-bind="computedWcProps" @_feedbackClick="onFeedbackClick">
    <slot />
    <div v-if="slots.version" slot="version">
      <slot name="version" />
    </div>
  </goa-microsite-header>
</template>
