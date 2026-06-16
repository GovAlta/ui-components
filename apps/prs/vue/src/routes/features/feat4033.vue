<script setup lang="ts">
import { ref } from "vue";
import {
  GoabAccordion,
  GoabButton,
  GoabPopover,
  GoabText,
  GoabBlock,
} from "@abgov/vue-components";
import type { GoabButtonType, GoabCalloutType } from "@abgov/ui-components-common";

const buttonTypes: GoabButtonType[] = ["primary", "secondary", "tertiary", "text"];
const calloutTypes: GoabCalloutType[] = [
  "information",
  "important",
  "emergency",
  "success",
];

const eventLog = ref<Array<{ name: string; timestamp: string }>>([]);

const logEvent = (name: string) => {
  eventLog.value = [
    { name, timestamp: new Date().toISOString() },
    ...eventLog.value,
  ].slice(0, 10);
};
</script>

<template>
  <GoabText tag="h1" size="heading-l">Feature 4033: Vue Component Wrappers Demo</GoabText>
  <GoabText tag="p" size="body-m"
    >This page demonstrates Vue wrapper components for testing and review.</GoabText
  >
  <GoabBlock gap="xl" direction="column" width="100%">
    <GoabText tag="h2" size="heading-m">Basic component</GoabText>
    <GoabBlock gap="m">
      <GoabButton
        v-for="type in buttonTypes"
        :key="type"
        :type="type"
        @onClick="logEvent('Clicked ' + type + ' button')"
      >
        {{ type }} button
      </GoabButton>
    </GoabBlock>
    <GoabText tag="h2" size="heading-m">Component with a named template</GoabText>
    <GoabAccordion heading="Accordion with actions">
      <template #actions>
        <GoabButton type="primary" size="compact"> View all </GoabButton>
      </template>
      <GoabText mt="0" mb="0">This is the content of the accordion.</GoabText>
    </GoabAccordion>

    <GoabText tag="h2" size="heading-m">Component with a boolean</GoabText>
    <GoabPopover>
      <template #target>
        <GoabButton type="primary">Open popover with padding</GoabButton>
      </template>
      <GoabText mt="0" mb="0">This is the content of the popover.</GoabText>
    </GoabPopover>
    <GoabPopover :padded="false">
      <template #target>
        <GoabButton type="primary">Open popover without padding</GoabButton>
      </template>
      <GoabText mt="0" mb="0">This is the content of the popover.</GoabText>
    </GoabPopover>
  </GoabBlock>
</template>
