<template>
  <goa-form-item version="2" label="Type to create a chip" mb="m">
    <goa-block gap="xs" direction="row">
      <div style="flex: 1">
        <goa-input version="2" width="100%" @_change="onInputChange"></goa-input>
      </div>
      <goa-button version="2" type="secondary" @_click="addChip">Add</goa-button>
    </goa-block>
  </goa-form-item>
  <div id="chips-container"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const typedChips: string[] = [];
const currentValue = ref("");

function renderChips() {
  const container = document.getElementById("chips-container")!;
  container.innerHTML = "";
  typedChips.forEach((chip) => {
    const chipEl = document.createElement("goa-filter-chip");
    chipEl.setAttribute("version", "2");
    chipEl.setAttribute("content", chip);
    chipEl.setAttribute("mb", "xs");
    chipEl.setAttribute("mr", "xs");
    chipEl.addEventListener("_click", () => removeChip(chip));
    container.appendChild(chipEl);
  });
}

function addChip() {
  if (currentValue.value.trim()) {
    typedChips.push(currentValue.value.trim());
    currentValue.value = "";
    renderChips();
  }
}

function removeChip(chip: string) {
  const index = typedChips.indexOf(chip);
  if (index > -1) {
    typedChips.splice(index, 1);
    renderChips();
  }
}

function onInputChange(e: CustomEvent) {
  currentValue.value = e.detail.value || "";
}
</script>
