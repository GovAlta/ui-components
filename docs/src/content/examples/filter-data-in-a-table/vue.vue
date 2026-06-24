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
  <goa-form-item version="2" id="filter-form-item" mb="m">
    <goa-block gap="xs" direction="row" alignment="center" width="100%">
      <div style="flex: 1">
        <goa-input version="2" name="filterChipInput" leadingicon="search" width="100%" @_change="onInputChange"></goa-input>
      </div>
      <goa-button version="2" type="secondary" leadingicon="filter" @_click="applyFilter">Filter</goa-button>
    </goa-block>
  </goa-form-item>
  <div id="chips-container" :style="{ display: typedChips.length > 0 ? 'block' : 'none' }">
    <goa-text as="span" color="secondary" mb="xs" mr="xs">Filter:</goa-text>
    <span id="chips-list"></span>
    <goa-button version="2" type="tertiary" size="compact" mb="xs" @_click="clearAll">Clear all</goa-button>
  </div>
  <goa-table version="2" width="100%" mt="s">
    <table style="width: 100%">
      <thead>
        <tr>
          <th>Status</th>
          <th>Name</th>
          <th class="goa-table-number-header">ID Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableRows" :key="row.id" :style="{ display: row.visible ? '' : 'none' }">
          <td><goa-badge version="2" :type="row.badgeType" :content="row.badgeContent" icon="false"></goa-badge></td>
          <td>{{ row.name }}</td>
          <td class="goa-table-number-column">{{ row.idNumber }}</td>
        </tr>
      </tbody>
    </table>
  </goa-table>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const typedChips: string[] = [];
const filterValue = ref("");

interface TableRow {
  id: number;
  badgeType: string;
  badgeContent: string;
  name: string;
  idNumber: string;
  visible: boolean;
}

const tableData: Omit<TableRow, "visible">[] = [
  { id: 1, badgeType: "information", badgeContent: "In progress", name: "Ivan Schmidt", idNumber: "7838576954" },
  { id: 2, badgeType: "success", badgeContent: "Completed", name: "Luz Lakin", idNumber: "8576953364" },
  { id: 3, badgeType: "information", badgeContent: "In progress", name: "Keith McGlynn", idNumber: "9846041345" },
  { id: 4, badgeType: "success", badgeContent: "Completed", name: "Melody Frami", idNumber: "7385256175" },
  { id: 5, badgeType: "important", badgeContent: "Updated", name: "Frederick Skiles", idNumber: "5807570418" },
  { id: 6, badgeType: "success", badgeContent: "Completed", name: "Dana Pfannerstill", idNumber: "5736306857" },
];

const tableRows = reactive<TableRow[]>(
  tableData.map((row) => ({ ...row, visible: true }))
);

function filterTable() {
  tableRows.forEach((row) => {
    const text = (row.name + " " + row.idNumber + " " + row.badgeContent).toLowerCase();
    row.visible =
      typedChips.length === 0 ||
      typedChips.every((chip) => text.includes(chip.toLowerCase()));
  });
}

function renderChips() {
  const chipsList = document.getElementById("chips-list")!;
  chipsList.innerHTML = "";
  typedChips.forEach((chip) => {
    const filterChip = document.createElement("goa-filter-chip");
    filterChip.setAttribute("version", "2");
    filterChip.setAttribute("content", chip);
    filterChip.setAttribute("mb", "xs");
    filterChip.setAttribute("mr", "xs");
    filterChip.addEventListener("_click", () => removeChip(chip));
    chipsList.appendChild(filterChip);
  });
  filterTable();
}

function onInputChange(e: CustomEvent) {
  filterValue.value = e.detail.value;
}

function applyFilter() {
  const value = filterValue.value.trim();
  const filterFormItem = document.getElementById("filter-form-item")!;
  if (value === "") {
    filterFormItem.setAttribute("error", "Empty filter");
    return;
  }
  if (typedChips.includes(value)) {
    filterFormItem.setAttribute("error", "Enter a unique filter");
    return;
  }
  typedChips.push(value);
  filterValue.value = "";
  filterFormItem.removeAttribute("error");
  renderChips();
}

function removeChip(chip: string) {
  const index = typedChips.indexOf(chip);
  if (index > -1) {
    typedChips.splice(index, 1);
    renderChips();
  }
}

function clearAll() {
  typedChips.length = 0;
  renderChips();
}
</script>
