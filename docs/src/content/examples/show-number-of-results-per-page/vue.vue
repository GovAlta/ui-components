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
          <th>First name</th>
          <th>Last name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody id="table-body"></tbody>
    </table>
  </goa-table>
  <goa-block alignment="center" width="100%">
    <goa-block mb="m" alignment="center">
      Show
      <goa-dropdown version="2" value="10" width="9ch" size="compact" @_change="onPerPageChange">
        <goa-dropdown-item value="10" label="10"></goa-dropdown-item>
        <goa-dropdown-item value="20" label="20"></goa-dropdown-item>
        <goa-dropdown-item value="30" label="30"></goa-dropdown-item>
      </goa-dropdown>
      <span style="width: 75px">per page</span>
    </goa-block>
    <goa-spacer hspacing="fill"></goa-spacer>
    <goa-pagination
      version="2"
      itemcount="100"
      :perpagecount="perPage"
      :pagenumber="page"
      @_change="onPageChange"
    >
    </goa-pagination>
  </goa-block>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const firstNames = ["Emma", "Liam", "Olivia", "Noah", "Ava", "James", "Sophia", "William", "Isabella", "Oliver", "Mia", "Benjamin", "Charlotte", "Elijah", "Amelia", "Lucas", "Harper", "Mason", "Evelyn", "Logan"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Wilson", "Anderson", "Taylor", "Thomas", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White"];

const users = [];
for (let i = 1; i <= 100; i++) {
  users.push({
    id: "user-" + i,
    firstName: firstNames[(i - 1) % firstNames.length],
    lastName: lastNames[(i - 1) % lastNames.length],
    age: 20 + (i % 40),
  });
}

const page = ref(1);
const perPage = ref(10);

function renderTable() {
  const offset = (page.value - 1) * perPage.value;
  const pageUsers = users.slice(offset, offset + perPage.value);
  const tableBody = document.getElementById("table-body")!;
  tableBody.innerHTML = pageUsers
    .map(
      (u: any) => `
        <tr>
          <td>${u.firstName}</td>
          <td>${u.lastName}</td>
          <td>${u.age}</td>
        </tr>
      `,
    )
    .join("");
}

function onPageChange(e: CustomEvent) {
  page.value = e.detail.page;
  renderTable();
}

function onPerPageChange(e: CustomEvent) {
  perPage.value = parseInt(e.detail.value);
  page.value = 1;
  renderTable();
}

onMounted(() => {
  renderTable();
});
</script>
