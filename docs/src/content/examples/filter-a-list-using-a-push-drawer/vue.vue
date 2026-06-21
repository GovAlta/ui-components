<template>
  <div style="display: flex; min-height: 480px">
    <div style="flex: 1; min-width: 0">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem">
        <h3 style="flex: 1; margin: 0">All cases</h3>
        <goa-button version="2" type="secondary" size="compact" leadingicon="filter" :style="filtersBtnStyle" @_click="openDrawer">Filters</goa-button>
      </div>
      <goa-table version="2" width="100%">
        <table width="100%">
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>File number</th>
              <th>Act</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><goa-badge version="2" type="success" content="Completed"></goa-badge></td>
              <td>Gilbert Barton</td>
              <td>24567-9876</td>
              <td>Traffic safety act</td>
            </tr>
            <tr>
              <td><goa-badge version="2" type="information" content="New"></goa-badge></td>
              <td>Brynn Hurley</td>
              <td>98765-3456</td>
              <td>Trespass to premises act</td>
            </tr>
            <tr>
              <td><goa-badge version="2" type="default" content="In review"></goa-badge></td>
              <td>Marco Silva</td>
              <td>34521-7890</td>
              <td>Gaming, liquor, and cannabis act</td>
            </tr>
            <tr>
              <td><goa-badge version="2" type="success" content="Completed"></goa-badge></td>
              <td>Dana Chen</td>
              <td>55123-4567</td>
              <td>Traffic safety act</td>
            </tr>
            <tr>
              <td><goa-badge version="2" type="information" content="New"></goa-badge></td>
              <td>Amira Hassan</td>
              <td>67890-1234</td>
              <td>Trespass to premises act</td>
            </tr>
          </tbody>
        </table>
      </goa-table>
    </div>
    <goa-push-drawer version="2" heading="Filters" width="260px" :open="drawerOpen ? 'true' : 'false'" @_close="closeDrawer">
      <goa-form-item version="2" label="Act">
        <goa-checkbox-list name="act">
          <goa-checkbox version="2" name="traffic" text="Traffic safety act" size="compact"></goa-checkbox>
          <goa-checkbox version="2" name="gaming" text="Gaming, liquor, and cannabis act" size="compact"></goa-checkbox>
          <goa-checkbox version="2" name="trespass" text="Trespass to premises act" size="compact"></goa-checkbox>
        </goa-checkbox-list>
      </goa-form-item>
      <goa-form-item version="2" label="Status" mt="l">
        <goa-dropdown version="2" name="status" size="compact">
          <goa-dropdown-item value="" label="All statuses"></goa-dropdown-item>
          <goa-dropdown-item value="new" label="New"></goa-dropdown-item>
          <goa-dropdown-item value="in-review" label="In review"></goa-dropdown-item>
          <goa-dropdown-item value="completed" label="Completed"></goa-dropdown-item>
        </goa-dropdown>
      </goa-form-item>
    </goa-push-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const drawerOpen = ref(false);
const filtersBtnStyle = computed(() => ({
  display: drawerOpen.value ? "none" : "",
}));

function openDrawer() {
  drawerOpen.value = true;
}

function closeDrawer() {
  drawerOpen.value = false;
}
</script>
