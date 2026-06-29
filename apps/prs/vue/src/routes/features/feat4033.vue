<script setup lang="ts">
import { ref } from "vue";
import {
  GoabAccordion,
  GoabBadge,
  GoabButton,
  GoabModal,
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

const modalOpen = ref(false);
const modalUnclosableOpen = ref(false);
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
    <GoabText tag="h2" size="heading-m">Component with icon</GoabText>
    <GoabBlock gap="m">
      <GoabBadge type="information" content="No icon" />
      <GoabBadge type="success" :icon="true" content="Default icon" />
      <GoabBadge type="important" iconType="airplane" content="Custom icon" />
    </GoabBlock>

    <GoabText tag="h2" size="heading-m">Component with optional event</GoabText>
    <GoabButton @onClick="modalOpen = true">Open modal with onClose</GoabButton>
    <GoabButton @onClick="modalUnclosableOpen = true">Open modal without onCLose</GoabButton>
    <GoabModal :open="modalOpen" heading="Closable modal" @onClose="modalOpen = false">
      <GoabText mt="0" mb="0"
        >This modal has an <code>onClose</code> handler, so the close button and backdrop click are active.</GoabText
      >
    </GoabModal>
    <GoabModal :open="modalUnclosableOpen" heading="Unclosable modal">
      <GoabText mt="0" mb="0"
        >This modal has NO <code>onClose</code> handler, so the close button and backdrop click are disabled.</GoabText
      >
      <template #actions>
        <GoabButton type="primary" @onClick="modalUnclosableOpen = false">Close</GoabButton>
      </template>
    </GoabModal>
  </GoabBlock>
</template>
