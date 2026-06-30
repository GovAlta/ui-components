<script setup lang="ts">
import type { GoabFieldsetOnContinueDetail, GoabFormDispatchOn } from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  /** Sets the id.  @default "" */
  id?: string;
  /** Sets the section title.  @default undefined */
  sectionTitle?: string;
  /** Sets the dispatch on.  @default "continue" */
  dispatchOn?: GoabFormDispatchOn;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "onContinue", detail: GoabFieldsetOnContinueDetail): void;
}>();

const wcProps = useWcProps(props, { transform: "kebab" });
</script>

<template>
  <goa-fieldset v-bind="wcProps" @_continue="emit('onContinue', $event.detail)">
    <slot />
  </goa-fieldset>
</template>
