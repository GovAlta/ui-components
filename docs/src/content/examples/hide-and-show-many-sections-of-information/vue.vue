<!--
Prerequisites:
- npm install @abgov/web-components @abgov/design-tokens
- Vite: isCustomElement for goa-* tags (see setup docs)
- Import "@abgov/web-components" in main.ts
- Import CSS: @abgov/web-components/index.css + /design-tokens/dist/tokens.css
- Add ionicons CDN to index.html
- Full guide: get-started/developers/setup
-->

<template>
  <goa-button version="2" type="tertiary" size="compact" mb="m" @_click="toggleAll">
    {{ allExpanded ? "Hide all sections" : "Show all sections" }}
  </goa-button>
  <goa-accordion
    v-for="(item, index) in accordionItems"
    :key="index"
    :heading="item.heading"
    heading-size="medium"
    :open="item.isOpen ? 'true' : 'false'"
    @_change="(e: CustomEvent) => onAccordionChange(index, e)"
  >
    {{ item.content }}
  </goa-accordion>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";

interface AccordionItem {
  heading: string;
  content: string;
  isOpen: boolean;
}

const accordionItems = reactive<AccordionItem[]>([
  { heading: "How do I create an account?", content: "To create an account you will need to contact your office admin.", isOpen: false },
  { heading: "What verification is needed to sign documents digitally?", content: "You will need to verify your identity through our two factor authentication in addition to the digital signature.", isOpen: false },
  { heading: "Can I track the status of my service requests online?", content: "Yes, you can see the status of your application on the main service dashboard when you login. You will receive updates and notifications in your email as your request progresses.", isOpen: false },
  { heading: "Are there accessibility features for people with disabilities?", content: "Yes, our digital service is designed with accessibility in mind.", isOpen: false },
]);

const allExpanded = computed(() => accordionItems.every((item) => item.isOpen));

function onAccordionChange(index: number, e: CustomEvent) {
  accordionItems[index].isOpen = e.detail.open;
}

function toggleAll() {
  const isExpanding = accordionItems.some((item) => !item.isOpen);
  accordionItems.forEach((item) => {
    item.isOpen = isExpanding;
  });
}
</script>
