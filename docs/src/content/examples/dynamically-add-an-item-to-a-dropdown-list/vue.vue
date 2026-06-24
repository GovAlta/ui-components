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
  <goa-form-item version="2" id="item-form-item" requirement="required" label="Name of item" helptext="Add an item to the dropdown list below">
    <goa-input version="2" id="item-input" name="item" @_change="onItemChange"></goa-input>
  </goa-form-item>
  <goa-form-item version="2" mt="l" label="Add to">
    <goa-radio-group version="2" name="mountType" value="append" orientation="horizontal" @_change="onMountTypeChange">
      <goa-radio-item value="prepend" label="Start"></goa-radio-item>
      <goa-radio-item value="append" label="End"></goa-radio-item>
    </goa-radio-group>
  </goa-form-item>
  <goa-button-group alignment="start" gap="relaxed" mt="l">
    <goa-button version="2" type="primary" @_click="addItem">Add new item</goa-button>
    <goa-button version="2" type="tertiary" @_click="resetList">Reset list</goa-button>
  </goa-button-group>
  <goa-divider mt="l"></goa-divider>
  <goa-form-item version="2" mt="l" label="All items">
    <goa-dropdown version="2" id="task-dropdown" name="selectedTask">
      <goa-dropdown-item value="finish-report" label="Finish Report"></goa-dropdown-item>
      <goa-dropdown-item value="attend-meeting" label="Attend Meeting"></goa-dropdown-item>
      <goa-dropdown-item value="reply-emails" label="Reply Emails"></goa-dropdown-item>
    </goa-dropdown>
  </goa-form-item>
</template>

<script setup lang="ts">
import { ref } from "vue";

const mountType = ref("append");
const newTask = ref("");
const defaultItems = [
  { value: "finish-report", label: "Finish Report" },
  { value: "attend-meeting", label: "Attend Meeting" },
  { value: "reply-emails", label: "Reply Emails" },
];

function onMountTypeChange(e: CustomEvent) {
  mountType.value = e.detail.value;
}

function onItemChange(e: CustomEvent) {
  newTask.value = e.detail.value;
  document.getElementById("item-form-item")?.removeAttribute("error");
}

function addItem() {
  if (newTask.value === "") {
    document.getElementById("item-form-item")?.setAttribute("error", "Please enter item name");
    return;
  }
  const newItem = document.createElement("goa-dropdown-item");
  newItem.setAttribute("value", newTask.value.toLowerCase().replace(" ", "-"));
  newItem.setAttribute("label", newTask.value);
  newItem.setAttribute("mount", mountType.value);
  document.getElementById("task-dropdown")?.appendChild(newItem);
  newTask.value = "";
}

function resetList() {
  const dropdown = document.getElementById("task-dropdown")!;
  dropdown.innerHTML = "";
  defaultItems.forEach((item) => {
    const dropdownItem = document.createElement("goa-dropdown-item");
    dropdownItem.setAttribute("value", item.value);
    dropdownItem.setAttribute("label", item.label);
    dropdown.appendChild(dropdownItem);
  });
  newTask.value = "";
  document.getElementById("item-form-item")?.removeAttribute("error");
}
</script>
