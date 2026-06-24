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
  <goa-button version="2" id="open-drawer-btn" leadingicon="add" @_click="openDrawer">Add Record</goa-button>
  <goa-drawer
    version="2"
    ref="drawer"
    max-size="492px"
    heading="Add Record"
    position="right"
    :open="drawerOpen ? 'true' : 'false'"
    @_close="closeDrawer"
  >
    <goa-form-item version="2" label="Level of education">
      <goa-dropdown version="2" name="education" value="university">
        <goa-dropdown-item value="high-school" label="High School Diploma"></goa-dropdown-item>
        <goa-dropdown-item value="college" label="College Diploma"></goa-dropdown-item>
        <goa-dropdown-item value="university" label="University Degree"></goa-dropdown-item>
        <goa-dropdown-item value="masters" label="Master's Degree"></goa-dropdown-item>
        <goa-dropdown-item value="doctorate" label="Doctorate"></goa-dropdown-item>
      </goa-dropdown>
    </goa-form-item>
    <goa-form-item version="2" label="Educational institution" mt="l">
      <goa-input version="2" name="education" type="text"></goa-input>
    </goa-form-item>
    <goa-form-item version="2" label="Field of study" requirement="optional" mt="l">
      <goa-input version="2" name="fieldOfStudy" type="text"></goa-input>
    </goa-form-item>
    <goa-form-item version="2" label="Is the person currently attending?" mt="l">
      <goa-radio-group version="2" name="attendTraining" orientation="horizontal">
        <goa-radio-item value="yes" label="Yes"></goa-radio-item>
        <goa-radio-item value="no" label="No"></goa-radio-item>
      </goa-radio-group>
    </goa-form-item>
    <goa-form-item version="2" label="Start date" mt="l">
      <goa-date-picker version="2"></goa-date-picker>
      <goa-checkbox version="2" name="startDateApproximate" text="Approximate date" value="y" mt="s"></goa-checkbox>
    </goa-form-item>
    <goa-form-item version="2" label="Credential received?" mt="l">
      <goa-radio-group version="2" name="credentialReceived" orientation="horizontal">
        <goa-radio-item value="yes" label="Yes"></goa-radio-item>
        <goa-radio-item value="no" label="No"></goa-radio-item>
      </goa-radio-group>
    </goa-form-item>
    <div slot="actions">
      <goa-button-group alignment="start">
        <goa-button version="2" type="primary" size="compact" @_click="closeDrawer">Add record</goa-button>
        <goa-button version="2" type="tertiary" size="compact" @_click="closeDrawer">Cancel</goa-button>
      </goa-button-group>
    </div>
  </goa-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawerOpen = ref(false);

function openDrawer() {
  drawerOpen.value = true;
}

function closeDrawer() {
  drawerOpen.value = false;
}
</script>
