<script setup lang="ts">
import { useSlots } from "vue";
import { useWcProps } from "../common/useWcProps";

interface Slots {
  default?: () => unknown;
  /** Content rendered in the "account" named slot. */
  account?: () => unknown;
  /** Content rendered in the "primary" named slot. */
  primary?: () => unknown;
  /** Content rendered in the "secondary" named slot. */
  secondary?: () => unknown;
}

interface Props {
  /** @required The application name displayed in the header.  @default (required) */
  heading: string;
  /** @required URL for the header link. Clicking the logo/heading navigates to this URL.  @default (required) */
  url: string;
  /** User's name displayed in the profile section.  @default "" */
  userName?: string;
  /** Secondary text displayed below the user's name, such as role or email.  @default "" */
  userSecondaryText?: string;
  /** Sets a data-testid attribute for automated testing.  @default "" */
  testId?: string;
  /** Controls whether the side menu is expanded or collapsed.  @default false */
  open?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /** Callback fired when the side menu is toggled open or closed. */
  onToggle: [];
  /** Callback fired when a menu item is navigated, providing the target URL path. */
  onNavigate: [path: string];
}>();

const wcProps = useWcProps(props, { 
  booleanProps: ["open"],
  renamedProps: {
    userName: "user-name",
    userSecondaryText: "user-secondary-text",
  },
});
const slots = useSlots() as Slots;
</script>

<template>
  <goa-work-side-menu v-bind="wcProps" @_toggle="emit('onToggle')" @_navigate="emit('onNavigate', $event.detail.url)">
    <div v-if="slots.primary" slot="primary">
      <slot name="primary" />
    </div>
    <div v-if="slots.secondary" slot="secondary">
      <slot name="secondary" />
    </div>
    <div v-if="slots.account" slot="account">
      <slot name="account" />
    </div>
  </goa-work-side-menu>
</template>
