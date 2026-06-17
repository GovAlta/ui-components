<script setup lang="ts">
import { ref } from "vue";
import {
  GoabAccordion,
  GoabButton,
  GoabContainer,
  GoabText,
  GoabBlock,
  GoabDetails,
  GoabCallout,
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
    <GoabButton
      v-for="type in buttonTypes"
      :key="type"
      :type="type"
      @onClick="logEvent('Clicked ' + type + ' button')"
    >
      {{ type }} button
    </GoabButton>
    <GoabAccordion heading="Accordion with actions">
      <template #actions>
        <GoabButton type="primary" size="compact"> View all </GoabButton>
      </template>
      <GoabText mt="0" mb="0">This is the content of the accordion.</GoabText>
    </GoabAccordion>

    <GoabContainer type="non-interactive" mb="m">
      <GoabText mt="0" mb="0">Non-interactive content container</GoabText>
    </GoabContainer>
    <GoabContainer type="interactive">
      <GoabText mt="0" mb="0">Interactive container</GoabText>
    </GoabContainer>
    <GoabDetails heading="Details">
      <GoabText
        >This content is revealed when the details component is expanded.</GoabText
      >
    </GoabDetails>
    <GoabCallout
      v-for="type in calloutTypes"
      :key="type"
      :type="type"
      mb="m"
      heading="Callout"
    >
      <GoabText mt="0" mb="0">{{ type }} callout</GoabText>
    </GoabCallout>
  </GoabBlock>
</template>
