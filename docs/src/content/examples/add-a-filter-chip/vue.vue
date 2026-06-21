<template>
  <div id="filter-container"></div>
  <goa-button version="2" mt="l" id="add-filter-btn" @_click="addFilter">Add Random Filter</goa-button>
</template>

<script setup lang="ts">
const activeFilters: string[] = [];

function renderFilters() {
  const container = document.getElementById("filter-container")!;
  container.innerHTML = "";
  activeFilters.forEach((filter) => {
    const chip = document.createElement("goa-filter-chip");
    chip.setAttribute("version", "2");
    chip.setAttribute("content", filter);
    chip.setAttribute("mr", "s");
    chip.setAttribute("mb", "s");
    chip.setAttribute("mt", "s");
    chip.addEventListener("_click", () => removeFilter(filter));
    container.appendChild(chip);
  });
}

function addFilter() {
  const randomFilter = "Filter " + Math.floor(Math.random() * 100);
  if (!activeFilters.includes(randomFilter)) {
    activeFilters.push(randomFilter);
    renderFilters();
  }
}

function removeFilter(filter: string) {
  const index = activeFilters.indexOf(filter);
  if (index > -1) {
    activeFilters.splice(index, 1);
    renderFilters();
  }
}
</script>
