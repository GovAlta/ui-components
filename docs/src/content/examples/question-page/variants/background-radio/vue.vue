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
  <goa-link leadingicon="arrow-back" size="small" mb="none"> Back </goa-link>
  <goa-text as="h2" mt="xl" mb="m">Current school status</goa-text>
  <goa-text mt="none" mb="s">
    School can encompass foundational programs that help individuals gain basic skills for
    further learning and living, such as literacy and numeracy courses. It also includes
    skills and employment training programs, designed to equip you with specific skills for
    the job market.
  </goa-text>
  <goa-text mt="none" mb="s">
    Post-secondary education, such as Bachelor's, Master's, or Doctoral degrees, and
    continuing education courses for professional or personal development, are also
    categorized under 'school'.
  </goa-text>
  <goa-text mt="none" mb="xl">
    Contact your provider if you're concerned about your school status.
  </goa-text>
  <goa-form-item version="2" label="Are you currently in school?">
    <goa-radio-group version="2" name="school" arialabel="are you currently in school?" @_change="onRadioChange">
      <goa-radio-item value="yes" label="Yes"></goa-radio-item>
      <goa-radio-item value="no" label="No"></goa-radio-item>
    </goa-radio-group>
  </goa-form-item>
  <goa-button version="2" type="submit" mt="2xl" @_click="onSubmit">Save and continue</goa-button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedValue = ref("");

function onRadioChange(e: CustomEvent) {
  selectedValue.value = e.detail.value;
}

function onSubmit() {
  console.log("Selected:", selectedValue.value);
}
</script>
