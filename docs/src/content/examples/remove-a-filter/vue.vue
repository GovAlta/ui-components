<!--
Prerequisites:
- npm install @abgov/web-components @abgov/design-tokens
- Vite: isCustomElement for goa-* tags (see setup docs)
- Import "@abgov/web-components" in main.ts
- Import CSS: @abgov/web-components/index.css + design-tokens/tokens.css
- Add ionicons CDN to index.html
- Full guide: get-started/developers/setup
-->

<template>
  <div id="chip-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

let chips = ["Chip 1", "Chip 2", "Chip 3"];

function renderChips() {
  const container = document.getElementById("chip-container")!;
  container.innerHTML = "";
  chips.forEach((chip) => {
    const chipEl = document.createElement("goa-filter-chip");
    chipEl.setAttribute("version", "2");
    chipEl.setAttribute("content", chip);
    chipEl.setAttribute("mr", "s");
    chipEl.addEventListener("_click", () => deleteChip(chip));
    container.appendChild(chipEl);
  });
}

function deleteChip(chip: string) {
  chips = chips.filter((c) => c !== chip);
  renderChips();
}

onMounted(() => {
  renderChips();
});
</script>
