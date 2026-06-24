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
  <goa-table version="2" width="100%" mb="xl">
    <table width="100%">
      <thead>
        <tr>
          <th><goa-table-sort-header name="firstName">First name</goa-table-sort-header></th>
          <th><goa-table-sort-header name="lastName">Last name</goa-table-sort-header></th>
          <th><goa-table-sort-header name="age" direction="asc">Age</goa-table-sort-header></th>
        </tr>
      </thead>
      <tbody id="table-body"></tbody>
    </table>
  </goa-table>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

let users = [
  { firstName: "Christian", lastName: "Batz", age: 18 },
  { firstName: "Brain", lastName: "Wisozk", age: 19 },
  { firstName: "Neha", lastName: "Jones", age: 23 },
  { firstName: "Tristin", lastName: "Buckridge", age: 31 },
];

let sortColumn = "age";
let sortDirection = 1;

function renderTable() {
  const tbody = document.getElementById("table-body")!;
  tbody.innerHTML = "";
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.age}</td>
    `;
    tbody.appendChild(row);
  });
}

function sortTable(column: string) {
  if (column === sortColumn) {
    sortDirection = sortDirection * -1;
  } else {
    sortColumn = column;
    sortDirection = 1;
  }

  document.querySelectorAll("goa-table-sort-header").forEach((header) => {
    const name = header.getAttribute("name");
    if (name === sortColumn) {
      header.setAttribute("direction", sortDirection === 1 ? "asc" : "desc");
    } else {
      header.setAttribute("direction", "none");
    }
  });

  users.sort((a: any, b: any) => (a[sortColumn] > b[sortColumn] ? 1 : -1) * sortDirection);
  renderTable();
}

onMounted(() => {
  document.querySelectorAll("goa-table-sort-header").forEach((header) => {
    header.addEventListener("click", () => {
      const column = header.getAttribute("name")!;
      sortTable(column);
    });
  });

  users.sort((a: any, b: any) => (a.age > b.age ? 1 : -1));
  renderTable();
});
</script>
