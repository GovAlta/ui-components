<script setup lang="ts">
import { computed, useSlots } from "vue";
import type { GoabServiceLevel, GoabLinkTarget } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "version" named slot. */
  version?: () => unknown;
}

interface Props {
  /** @required The service type which determines the badge style. "live" shows official government site text, "alpha" and "beta" show development stage badges.  @default (required) */
  type: GoabServiceLevel;
  /** App or service version displayed on the right side of the header.  @default "" */
  version?: string;
  /** URL to a feedback page displayed when provided.  @default "" */
  feedbackUrl?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Maximum width of the content area. @default undefined */
  maxContentWidth?: string;
  /** Sets the target attribute for the feedback URL link. @default "blank" */
  feedbackUrlTarget?: GoabLinkTarget;
  /** Sets the target attribute for the header link. @default "blank" */
  headerUrlTarget?: GoabLinkTarget;
  /** Callback fired when the feedback link is clicked, enables custom feedback handling.  @default undefined */
  onFeedbackClick?: () => void;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { 
  booleanProps: ["onFeedbackClick"],
  renamedProps: { onFeedbackClick: "hasfeedbackhandler" },
});
const slots = useSlots() as Slots;
</script>

<template>
  <goa-microsite-header v-bind="wcProps" @_feedbackClick="props.onFeedbackClick?.()">
    <slot />
    <div v-if="slots.version" slot="version">
      <slot name="version" />
    </div>
  </goa-microsite-header>
</template>
