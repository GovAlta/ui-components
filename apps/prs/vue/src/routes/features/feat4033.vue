<script setup lang="ts">
import { ref } from "vue";
import {
  GoabAccordion,
  GoabBadge,
  GoabButton,
  GoabDropdown,
  GoabDropdownItem,
  GoabMenuAction,
  GoabMenuButton,
  GoabModal,
  GoabPopover,
  GoabText,
  GoabBlock,
} from "@abgov/vue-components";
import type {
  GoabButtonType,
  GoabCalloutType,
} from "@abgov/ui-components-common";

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
const dropdownDisabled = ref(false);
const dropdownFilterable = ref(false);
const dropdownCompact = ref(false);
const dropdownSelection = ref("");
const closeBubbleModalOpen = ref(false);
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

    <GoabText tag="h2" size="heading-m">Dropdown reactive props</GoabText>
    <GoabText tag="p" size="body-m">
      Toggle these controls after the dropdown has rendered. The dropdown should update
      disabled, filterable, placeholder, and size on the underlying web component.
    </GoabText>
    <GoabBlock gap="m" direction="row">
      <GoabButton type="secondary" @onClick="dropdownDisabled = !dropdownDisabled">
        Disabled: {{ dropdownDisabled ? "true" : "false" }}
      </GoabButton>
      <GoabButton type="secondary" @onClick="dropdownFilterable = !dropdownFilterable">
        Filterable: {{ dropdownFilterable ? "true" : "false" }}
      </GoabButton>
      <GoabButton type="secondary" @onClick="dropdownCompact = !dropdownCompact">
        Size: {{ dropdownCompact ? "compact" : "default" }}
      </GoabButton>
    </GoabBlock>
    <GoabDropdown
      name="reactive-dropdown"
      :value="dropdownSelection"
      :disabled="dropdownDisabled"
      :filterable="dropdownFilterable"
      :placeholder="dropdownDisabled ? 'Disabled placeholder' : 'Enabled placeholder'"
      :size="dropdownCompact ? 'compact' : 'default'"
      @onChange="
        (detail: any) => {
          dropdownSelection = detail.value;
          logEvent('Dropdown changed');
        }
      "
    >
      <GoabDropdownItem value="alpha" label="Alpha" />
      <GoabDropdownItem value="beta" label="Beta" />
      <GoabDropdownItem value="gamma" label="Gamma" />
    </GoabDropdown>

    <GoabText tag="h2" size="heading-m">Bubbled close events</GoabText>
    <GoabText tag="p" size="body-m">
      Open the modal, then open this menu button and choose an action. The menu button
      should close its own popover without closing the modal.
    </GoabText>
    <GoabBlock gap="m" direction="row">
      <GoabButton type="secondary" @onClick="closeBubbleModalOpen = true">
        Open close-bubble modal
      </GoabButton>
    </GoabBlock>
    <GoabModal
      :open="closeBubbleModalOpen"
      heading="Modal close bubbling"
      @onClose="
        () => {
          closeBubbleModalOpen = false;
        }
      "
    >
      <GoabText mt="0" mb="m">
        Open this menu and select an action. The menu button should close its own
        popover without closing this modal.
      </GoabText>
      <GoabMenuButton text="More actions">
        <GoabMenuAction text="Download PDF" action="download-pdf" />
        <GoabMenuAction text="Archive record" action="archive-record" />
        <GoabMenuAction text="Share link" action="share-link" />
      </GoabMenuButton>
    </GoabModal>

    <GoabText tag="h2" size="heading-m">Component with optional event</GoabText>
    <GoabButton @onClick="modalOpen = true">Open modal with onClose</GoabButton>
    <GoabButton @onClick="modalUnclosableOpen = true"
      >Open modal without onClose</GoabButton
    >
    <GoabModal :open="modalOpen" heading="Closable modal" @onClose="modalOpen = false">
      <GoabText mt="0" mb="0"
        >This modal has an <code>onClose</code> handler, so the close button and backdrop
        click are active.</GoabText
      >
    </GoabModal>
    <GoabModal :open="modalUnclosableOpen" heading="Unclosable modal">
      <GoabText mt="0" mb="0"
        >This modal has NO <code>onClose</code> handler, so the close button and backdrop
        click are disabled.</GoabText
      >
      <template #actions>
        <GoabButton type="primary" @onClick="modalUnclosableOpen = false"
          >Close</GoabButton
        >
      </template>
    </GoabModal>
  </GoabBlock>
</template>
