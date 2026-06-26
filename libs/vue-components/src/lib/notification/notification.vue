<script setup lang="ts">
import type {
  GoabAriaLiveType,
  GoabNotificationEmphasis,
  GoabNotificationType,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Define the context and colour of the notification.  @default "information" */
  type?: GoabNotificationType;
  /** Indicates how assistive technology should handle updates to the live region. @default "polite" */
  ariaLive?: GoabAriaLiveType;
  /** Maximum width of the content area. @default undefined */
  maxContentWidth?: string;
  /** Sets the visual prominence. 'high' for full background, 'low' for a bordered style. @default "high" */
  emphasis?: GoabNotificationEmphasis;
  /** When true, reduces padding for a more compact notification.  @default false */
  compact?: boolean;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "information",
  emphasis: "high",
});
const emit = defineEmits<{
  /** Callback fired when the notification is dismissed. */
  onDismiss: [];
}>();

const wcProps = useWcProps(props, { booleanProps: ["compact"] });
</script>

<template>
  <goa-notification v-bind="wcProps" @_dismiss="emit('onDismiss')">
    <slot />
  </goa-notification>
</template>
