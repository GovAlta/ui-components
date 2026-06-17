<script setup lang="ts">
import { computed, useSlots } from "vue";
import type { GoabServiceLevel, GoabLinkTarget } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  type: GoabServiceLevel;
  version?: string;
  feedbackUrl?: string;
  testId?: string;
  maxContentWidth?: string;
  feedbackUrlTarget?: GoabLinkTarget;
  headerUrlTarget?: GoabLinkTarget;
  onFeedbackClick?: () => void;
}

const props = defineProps<Props>();
const wcProps = useWcProps(props, { 
  booleanProps: ["onFeedbackClick"],
  renamedProps: { onFeedbackClick: "hasfeedbackhandler" },
});
const slots = useSlots();
</script>

<template>
  <goa-microsite-header v-bind="wcProps" @_feedbackClick="props.onFeedbackClick?.()">
    <slot />
    <div v-if="slots.version" slot="version">
      <slot name="version" />
    </div>
  </goa-microsite-header>
</template>
