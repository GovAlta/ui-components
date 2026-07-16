<script setup lang="ts">
import { ref } from "vue";
import {
  GoabAccordion,
  GoabAppHeader,
  GoabBadge,
  GoabButton,
  GoabContainer,
  GoabDropdown,
  GoabDropdownItem,
  GoabInput,
  GoabMenuAction,
  GoabMenuButton,
  GoabModal,
  GoabPopover,
  GoabTab,
  GoabTabs,
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
const dropdownDisabled = ref(false);
const dropdownFilterable = ref(false);
const dropdownCompact = ref(false);
const dropdownSelection = ref("");
const closeBubbleModalOpen = ref(false);
const accordionOpen = ref(false);
const accordionIconRight = ref(false);
const paddedPopover = ref(true);
const badgeIconVisible = ref(false);
const secondTabDisabled = ref(false);
const closableModalOpen = ref(false);
const nonClosableModalOpen = ref(false);
const menuClickCount = ref(0);
const showAppHeader = ref(true);
const utilitiesClickCount = ref(0);
const trailingIconClickCount = ref(0);
</script>

<template>
  <GoabText tag="h1" size="heading-l">Feature 4033: Vue Component Wrappers Demo</GoabText>
  <GoabText tag="p" size="body-m">
    This page demonstrates Vue wrapper components for testing and review.
  </GoabText>
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

    <GoabText tag="h2" size="heading-m">Container named slots</GoabText>
    <GoabContainer type="interactive" accent="thick" padding="relaxed">
      <template #title>
        <GoabText tag="h3" size="heading-s" mt="0" mb="0">
          Container title slot
        </GoabText>
      </template>
      <GoabText mt="0" mb="0">
        This is the default container body content. The title and action should render
        in the container header, not in this body area.
      </GoabText>
      <template #actions>
        <GoabButton type="secondary" size="compact">
          Header action
        </GoabButton>
      </template>
    </GoabContainer>

    <GoabText tag="h2" size="heading-m">App header with onMenuClick event</GoabText>
    <GoabText tag="p" size="body-m">
      Click the menu button to trigger the onMenuClick event. This demonstrates the event
      being passed as a Vue event (@onMenuClick) rather than as a prop.
    </GoabText>
    <GoabBlock gap="m" direction="row" mb="m">
      <GoabButton type="secondary" @onClick="() => { menuClickCount = 0; utilitiesClickCount = 0; }">
        Reset counters
      </GoabButton>
      <GoabButton type="secondary" @onClick="showAppHeader = !showAppHeader">
        Toggle header: {{ showAppHeader ? 'hide' : 'show' }}
      </GoabButton>
    </GoabBlock>
    <GoabText tag="p" size="body-m" mb="m">
      Menu button click count: <strong>{{ menuClickCount }}</strong> | 
      Sign In button click count: <strong>{{ utilitiesClickCount }}</strong>
    </GoabText>
    <GoabAppHeader
      v-if="showAppHeader"
      heading="Vue App Header"
      @onMenuClick="menuClickCount++"
    >
      <template #utilities>
        <GoabButton type="tertiary" size="compact" @onClick="utilitiesClickCount++">
          Sign In
        </GoabButton>
      </template>
    </GoabAppHeader>

    <GoabText tag="h2" size="heading-m">Input trailing icon event</GoabText>
    <GoabText tag="p" size="body-m">
      The trailing icon should be interactive when @onTrailingIconClick is provided.
      Clicking it should increment the counter.
    </GoabText>
    <GoabBlock gap="m" direction="row" alignment="center">
      <GoabInput
        name="trailing-icon-input"
        value="Click the trailing icon"
        trailingIcon="close"
        trailingIconAriaLabel="Clear input"
        @onTrailingIconClick="trailingIconClickCount++"
      />
      <GoabButton type="secondary" @onClick="trailingIconClickCount = 0">
        Reset
      </GoabButton>
    </GoabBlock>
    <GoabText tag="p" size="body-m" mb="m">
      Trailing icon click count: <strong>{{ trailingIconClickCount }}</strong>
    </GoabText>

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
      <GoabBadge type="important" icon-type="airplane" content="Custom icon" />
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

    <GoabText tag="h2" size="heading-m">Boolean toggles playground</GoabText>
    <GoabText tag="p" size="body-m">
      Toggle these boolean props repeatedly to verify wrappers update both true and false
      values on the underlying web components.
    </GoabText>

    <GoabText tag="h3" size="heading-s">1. Accordion open</GoabText>
    <GoabButton type="secondary" @onClick="accordionOpen = !accordionOpen">
      Open: {{ accordionOpen ? "true" : "false" }}
    </GoabButton>
    <GoabAccordion heading="Reactive accordion" :open="accordionOpen">
      <GoabText mt="0" mb="0">Accordion content that responds to open.</GoabText>
    </GoabAccordion>

    <GoabText tag="h3" size="heading-s">2. Accordion icon position</GoabText>
    <GoabButton type="secondary" @onClick="accordionIconRight = !accordionIconRight">
      Icon on right: {{ accordionIconRight ? "true" : "false" }}
    </GoabButton>
    <GoabAccordion
      heading="Accordion icon position"
      :icon-position="accordionIconRight ? 'right' : 'left'"
    >
      <GoabText mt="0" mb="0">Toggle iconPosition between left and right.</GoabText>
    </GoabAccordion>

    <GoabText tag="h3" size="heading-s">3. Popover padded</GoabText>
    <GoabButton type="secondary" @onClick="paddedPopover = !paddedPopover">
      Padded: {{ paddedPopover ? "true" : "false" }}
    </GoabButton>
    <GoabPopover :padded="paddedPopover">
      <template #target>
        <GoabButton type="primary">Open reactive popover</GoabButton>
      </template>
      <GoabText mt="0" mb="0">Popover content with dynamic padding.</GoabText>
    </GoabPopover>

    <GoabText tag="h3" size="heading-s">4. Badge icon</GoabText>
    <GoabButton type="secondary" @onClick="badgeIconVisible = !badgeIconVisible">
      Icon: {{ badgeIconVisible ? "true" : "false" }}
    </GoabButton>
    <GoabBadge type="success" :icon="badgeIconVisible" content="Reactive badge icon" />

    <GoabText tag="h3" size="heading-s">5. Tab disabled false</GoabText>
    <GoabText tag="p" size="body-m">
      The second tab is bound to disabled={{ secondTabDisabled ? "true" : "false" }}.
      When false, it should be selectable and should not be treated as disabled.
    </GoabText>
    <GoabButton type="secondary" @onClick="secondTabDisabled = !secondTabDisabled">
      Second tab disabled: {{ secondTabDisabled ? "true" : "false" }}
    </GoabButton>
    <GoabTabs>
      <GoabTab heading="First tab">
        <GoabText mt="0" mb="0">First tab content.</GoabText>
      </GoabTab>
      <GoabTab heading="Second tab" :disabled="secondTabDisabled">
        <GoabText mt="0" mb="0">
          Second tab content. This should be reachable when disabled is false.
        </GoabText>
      </GoabTab>
    </GoabTabs>

    <GoabText tag="h3" size="heading-s">6. Modal open (closable)</GoabText>
    <GoabButton type="secondary" @onClick="closableModalOpen = !closableModalOpen">
      Open closable modal: {{ closableModalOpen ? "true" : "false" }}
    </GoabButton>
    <GoabModal
      :open="closableModalOpen"
      heading="Reactive closable modal"
      @onClose="closableModalOpen = false"
    >
      <GoabText mt="0" mb="0">This modal has onClose and should close normally.</GoabText>
    </GoabModal>

    <GoabText tag="h3" size="heading-s">7. Modal open (no onClose)</GoabText>
    <GoabButton type="secondary" @onClick="nonClosableModalOpen = !nonClosableModalOpen">
      Open non-closable modal: {{ nonClosableModalOpen ? "true" : "false" }}
    </GoabButton>
    <GoabModal :open="nonClosableModalOpen" heading="Reactive non-closable modal">
      <GoabText mt="0" mb="0">
        This modal does not wire onClose. Toggle it with the button above.
      </GoabText>
      <template #actions>
        <GoabButton type="primary" @onClick="nonClosableModalOpen = false">
          Close
        </GoabButton>
      </template>
    </GoabModal>

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
        Open this menu and select an action. The menu button should close its own popover
        without closing this modal.
      </GoabText>
      <GoabMenuButton text="More actions">
        <GoabMenuAction text="Download PDF" action="download-pdf" />
        <GoabMenuAction text="Archive record" action="archive-record" />
        <GoabMenuAction text="Share link" action="share-link" />
      </GoabMenuButton>
    </GoabModal>

    <GoabText tag="h2" size="heading-m">Component with optional event</GoabText>
    <GoabButton @onClick="modalOpen = true">Open modal with onClose</GoabButton>
    <GoabButton @onClick="modalUnclosableOpen = true">
      Open modal without onClose
    </GoabButton>
    <GoabModal :open="modalOpen" heading="Closable modal" @onClose="modalOpen = false">
      <GoabText mt="0" mb="0">
        This modal has an <code>onClose</code> handler, so the close button and backdrop
        click are active.
      </GoabText>
    </GoabModal>
    <GoabModal :open="modalUnclosableOpen" heading="Unclosable modal">
      <GoabText mt="0" mb="0">
        This modal has NO <code>onClose</code> handler, so the close button and backdrop
        click are disabled.
      </GoabText>
      <template #actions>
        <GoabButton type="primary" @onClick="modalUnclosableOpen = false">
          Close
        </GoabButton>
      </template>
    </GoabModal>
  </GoabBlock>
</template>
