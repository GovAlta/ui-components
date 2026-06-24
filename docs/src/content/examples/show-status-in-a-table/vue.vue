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
  <goa-table version="2" width="100%">
    <table width="100%">
      <thead>
        <tr>
          <th>Status</th>
          <th>Name</th>
          <th class="goa-table-number-header">File number</th>
          <th style="width: 1%; white-space: nowrap"></th>
        </tr>
      </thead>
      <tbody id="table-body"></tbody>
    </table>
  </goa-table>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const badgeValues = [
  { type: "important", content: "Pending" },
  { type: "emergency", content: "Failed" },
  { type: "success", content: "Complete" },
  { type: "information", content: "In progress" },
  { type: "default", content: "Closed" },
  { type: "success", content: "Complete" },
];

onMounted(() => {
  const tbody = document.getElementById("table-body")!;
  badgeValues.forEach((badge) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><goa-badge version="2" type="${badge.type}" content="${badge.content}" icon="false"></goa-badge></td>
      <td>Lorem ipsum dolor sit amet consectetur</td>
      <td class="goa-table-number-column">1234567890</td>
      <td><goa-button version="2" size="compact" type="tertiary">Assign</goa-button></td>
    `;
    const button = row.querySelector("goa-button")!;
    button.addEventListener("_click", () => console.log("clicked"));
    tbody.appendChild(row);
  });
});
</script>
