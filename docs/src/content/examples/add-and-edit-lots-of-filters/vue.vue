<template>
  <goa-button version="2" id="open-filters-btn" @_click="openDrawer">Filters</goa-button>
  <goa-drawer
    version="2"
    heading="Filters"
    position="right"
    :open="drawerOpen ? 'true' : 'false'"
    @_close="closeDrawer"
  >
    <goa-form-item version="2" label="Entry status">
      <goa-checkbox-list name="entryStatus">
        <goa-checkbox version="2" name="draft" text="Draft" value="draft"></goa-checkbox>
        <goa-checkbox version="2" name="published" text="Published" value="published"></goa-checkbox>
      </goa-checkbox-list>
    </goa-form-item>
    <goa-form-item version="2" label="Assigned to - Region" mt="l">
      <goa-checkbox-list name="region">
        <goa-checkbox version="2" name="calgary" text="Calgary" value="calgary"></goa-checkbox>
        <goa-checkbox version="2" name="central" text="Central" value="central"></goa-checkbox>
        <goa-checkbox version="2" name="edmonton" text="Edmonton" value="edmonton"></goa-checkbox>
        <goa-checkbox version="2" name="north" text="North" value="north"></goa-checkbox>
        <goa-checkbox version="2" name="south" text="South" value="south"></goa-checkbox>
      </goa-checkbox-list>
    </goa-form-item>
    <goa-form-item version="2" label="Assigned to" mt="l">
      <goa-dropdown version="2" name="assignedTo">
        <goa-dropdown-item value="1" label="Person 1"></goa-dropdown-item>
        <goa-dropdown-item value="2" label="Person 2"></goa-dropdown-item>
      </goa-dropdown>
    </goa-form-item>
    <goa-form-item version="2" label="Date taken" mt="l">
      <goa-radio-group version="2" name="dateTaken">
        <goa-radio-item value="24" label="Last 24 hours"></goa-radio-item>
        <goa-radio-item value="72" label="Last 72 hours"></goa-radio-item>
      </goa-radio-group>
    </goa-form-item>
    <div slot="actions">
      <goa-button-group alignment="start">
        <goa-button version="2" type="primary" size="compact" @_click="closeDrawer">Apply filters</goa-button>
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
