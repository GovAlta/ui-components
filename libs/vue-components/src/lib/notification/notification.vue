<script setup lang="ts">
import type {
  GoabAriaLiveType,
  GoabNotificationEmphasis,
  GoabNotificationType,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  type?: GoabNotificationType;
  ariaLive?: GoabAriaLiveType;
  maxContentWidth?: string;
  emphasis?: GoabNotificationEmphasis;
  compact?: boolean;
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "information",
  emphasis: "high",
});
const emit = defineEmits<{
  onDismiss: [];
}>();

const wcProps = useWcProps(props, { booleanProps: ["compact"] });
</script>

<template>
  <goa-notification v-bind="wcProps" @_dismiss="emit('onDismiss')">
    <slot />
  </goa-notification>
</template>
