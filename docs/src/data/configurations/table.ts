/**
 * Table Component Configurations
 *
 * Tables display data in rows and columns.
 */

import type { ComponentConfigurations } from "./types";

export const tableConfigurations: ComponentConfigurations = {
  componentSlug: "table",
  componentName: "Table",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic table",
      description: "Simple table with data",
      code: {
        react: `<GoabTable width="100%">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Smith</td>
      <td>Active</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>Jane Doe</td>
      <td>Pending</td>
      <td>Jan 16, 2024</td>
    </tr>
  </tbody>
</GoabTable>`,
        angular: `<goab-table width="100%">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Smith</td>
      <td>Active</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>Jane Doe</td>
      <td>Pending</td>
      <td>Jan 16, 2024</td>
    </tr>
  </tbody>
</goab-table>`,
        webComponents: `<goa-table version="2" width="100%">
  <table width="100%">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Smith</td>
        <td>Active</td>
        <td>Jan 15, 2024</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>Pending</td>
        <td>Jan 16, 2024</td>
      </tr>
    </tbody>
  </table>
</goa-table>`,
      },
    },
    {
      id: "striped",
      name: "Striped rows",
      description: "Alternating row colors for readability",
      code: {
        react: `<GoabTable striped>
  <thead>
    <tr>
      <th>Item</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Widget A</td>
      <td>10</td>
      <td>$25.00</td>
    </tr>
    <tr>
      <td>Widget B</td>
      <td>5</td>
      <td>$15.00</td>
    </tr>
    <tr>
      <td>Widget C</td>
      <td>20</td>
      <td>$10.00</td>
    </tr>
  </tbody>
</GoabTable>`,
        angular: `<goab-table [striped]="true">
  <thead>
    <tr>
      <th>Item</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Widget A</td>
      <td>10</td>
      <td>$25.00</td>
    </tr>
    <tr>
      <td>Widget B</td>
      <td>5</td>
      <td>$15.00</td>
    </tr>
    <tr>
      <td>Widget C</td>
      <td>20</td>
      <td>$10.00</td>
    </tr>
  </tbody>
</goab-table>`,
        webComponents: `<goa-table version="2" striped="true">
  <table width="100%">
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Widget A</td>
        <td>10</td>
        <td>$25.00</td>
      </tr>
      <tr>
        <td>Widget B</td>
        <td>5</td>
        <td>$15.00</td>
      </tr>
      <tr>
        <td>Widget C</td>
        <td>20</td>
        <td>$10.00</td>
      </tr>
    </tbody>
  </table>
</goa-table>`,
      },
    },
    {
      id: "relaxed",
      name: "Size",
      description: "Normal and relaxed padding comparison",
      code: {
        react: `<GoabText mt="none" mb="s">Normal</GoabText>
<GoabTable width="100%">
  <thead>
    <tr>
      <th>Service</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>License renewal</td>
      <td>Renew your driver's license online</td>
    </tr>
    <tr>
      <td>Vehicle registration</td>
      <td>Register a new or used vehicle</td>
    </tr>
  </tbody>
</GoabTable>
<GoabText mt="l" mb="s">Relaxed</GoabText>
<GoabTable width="100%" variant="relaxed">
  <thead>
    <tr>
      <th>Service</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>License renewal</td>
      <td>Renew your driver's license online</td>
    </tr>
    <tr>
      <td>Vehicle registration</td>
      <td>Register a new or used vehicle</td>
    </tr>
  </tbody>
</GoabTable>`,
        angular: `<goab-text mt="none" mb="s">Normal</goab-text>
<goab-table width="100%">
  <thead>
    <tr>
      <th>Service</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>License renewal</td>
      <td>Renew your driver's license online</td>
    </tr>
    <tr>
      <td>Vehicle registration</td>
      <td>Register a new or used vehicle</td>
    </tr>
  </tbody>
</goab-table>
<goab-text mt="l" mb="s">Relaxed</goab-text>
<goab-table width="100%" variant="relaxed">
  <thead>
    <tr>
      <th>Service</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>License renewal</td>
      <td>Renew your driver's license online</td>
    </tr>
    <tr>
      <td>Vehicle registration</td>
      <td>Register a new or used vehicle</td>
    </tr>
  </tbody>
</goab-table>`,
        webComponents: `<goa-text mt="none" mb="s">Normal</goa-text>
<goa-table version="2" width="100%">
  <table width="100%">
    <thead>
      <tr>
        <th>Service</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>License renewal</td>
        <td>Renew your driver's license online</td>
      </tr>
      <tr>
        <td>Vehicle registration</td>
        <td>Register a new or used vehicle</td>
      </tr>
    </tbody>
  </table>
</goa-table>
<goa-text mt="l" mb="s">Relaxed</goa-text>
<goa-table version="2" width="100%" variant="relaxed">
  <table width="100%">
    <thead>
      <tr>
        <th>Service</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>License renewal</td>
        <td>Renew your driver's license online</td>
      </tr>
      <tr>
        <td>Vehicle registration</td>
        <td>Register a new or used vehicle</td>
      </tr>
    </tbody>
  </table>
</goa-table>`,
      },
    },
    {
      id: "constrained-width",
      name: "Constrained width",
      description: "Table with a fixed width",
      code: {
        react: `<GoabTable width="400px">
  <thead>
    <tr>
      <th>Application ID</th>
      <th>Applicant</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>APP-2024-001</td>
      <td>John Smith</td>
      <td>Under review</td>
    </tr>
    <tr>
      <td>APP-2024-002</td>
      <td>Jane Doe</td>
      <td>Approved</td>
    </tr>
  </tbody>
</GoabTable>`,
        angular: `<goab-table width="400px">
  <thead>
    <tr>
      <th>Application ID</th>
      <th>Applicant</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>APP-2024-001</td>
      <td>John Smith</td>
      <td>Under review</td>
    </tr>
    <tr>
      <td>APP-2024-002</td>
      <td>Jane Doe</td>
      <td>Approved</td>
    </tr>
  </tbody>
</goab-table>`,
        webComponents: `<goa-table version="2" width="400px">
  <table width="100%">
    <thead>
      <tr>
        <th>Application ID</th>
        <th>Applicant</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>APP-2024-001</td>
        <td>John Smith</td>
        <td>Under review</td>
      </tr>
      <tr>
        <td>APP-2024-002</td>
        <td>Jane Doe</td>
        <td>Approved</td>
      </tr>
    </tbody>
  </table>
</goa-table>`,
      },
    },
    {
      id: "single-sort",
      name: "Single-column sorting",
      description: "Sortable columns using TableSortHeader (default single sort mode)",
      code: {
        react: `<GoabTable onSort={(detail) => console.log(detail)}>
  <thead>
    <tr>
      <th>Name</th>
      <th>
        <GoabTableSortHeader name="status">Status</GoabTableSortHeader>
      </th>
      <th>
        <GoabTableSortHeader name="date">Date</GoabTableSortHeader>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Smith</td>
      <td>Active</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>Jane Doe</td>
      <td>Pending</td>
      <td>Jan 16, 2024</td>
    </tr>
  </tbody>
</GoabTable>`,
        angular: `<goab-table (onSort)="onSort($event)">
  <thead>
    <tr>
      <th>Name</th>
      <th>
        <goab-table-sort-header name="status">Status</goab-table-sort-header>
      </th>
      <th>
        <goab-table-sort-header name="date">Date</goab-table-sort-header>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Smith</td>
      <td>Active</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>Jane Doe</td>
      <td>Pending</td>
      <td>Jan 16, 2024</td>
    </tr>
  </tbody>
</goab-table>`,
        webComponents: `<goa-table version="2" width="100%" id="sort-table">
  <table width="100%">
    <thead>
      <tr>
        <th>Name</th>
        <th><goa-table-sort-header name="status">Status</goa-table-sort-header></th>
        <th><goa-table-sort-header name="date">Date</goa-table-sort-header></th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Alice Johnson</td><td>Active</td><td>2024-01-15</td></tr>
      <tr><td>Charlie Brown</td><td>Pending</td><td>2024-03-20</td></tr>
      <tr><td>Bob Smith</td><td>Active</td><td>2024-02-10</td></tr>
      <tr><td>Emma Wilson</td><td>Inactive</td><td>2023-12-01</td></tr>
      <tr><td>David Lee</td><td>Pending</td><td>2024-01-30</td></tr>
    </tbody>
  </table>
</goa-table>
<script>
const table = document.getElementById('sort-table');
table.addEventListener('_sort', (e) => {
  const { sortBy, sortDir } = e.detail;
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const colIndex = { name: 0, status: 1, date: 2 }[sortBy];
  rows.sort((a, b) => {
    const aVal = a.children[colIndex].textContent;
    const bVal = b.children[colIndex].textContent;
    return aVal.localeCompare(bVal) * sortDir;
  });
  rows.forEach(row => tbody.appendChild(row));
});
</script>`,
      },
    },
    {
      id: "multi-sort",
      name: "Multi-column sorting",
      description:
        'Sort by multiple columns with sortMode="multi" and sortOrder for priority',
      code: {
        react: `<GoabTable sortMode="multi" onMultiSort={(detail) => console.log(detail.sorts)}>
  <thead>
    <tr>
      <th>Name</th>
      <th>
        <GoabTableSortHeader name="status">Status</GoabTableSortHeader>
      </th>
      <th>
        <GoabTableSortHeader name="date">Date</GoabTableSortHeader>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Smith</td>
      <td>Active</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>Jane Doe</td>
      <td>Pending</td>
      <td>Jan 16, 2024</td>
    </tr>
  </tbody>
</GoabTable>`,
        angular: `<goab-table sortMode="multi" (onMultiSort)="onMultiSort($event)">
  <thead>
    <tr>
      <th>Name</th>
      <th>
        <goab-table-sort-header name="status">Status</goab-table-sort-header>
      </th>
      <th>
        <goab-table-sort-header name="date">Date</goab-table-sort-header>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Smith</td>
      <td>Active</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>Jane Doe</td>
      <td>Pending</td>
      <td>Jan 16, 2024</td>
    </tr>
  </tbody>
</goab-table>`,
        webComponents: `<goa-table version="2" sort-mode="multi" width="100%" id="multi-sort-table">
  <table width="100%">
    <thead>
      <tr>
        <th>Name</th>
        <th><goa-table-sort-header name="status">Status</goa-table-sort-header></th>
        <th><goa-table-sort-header name="date">Date</goa-table-sort-header></th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Alice Johnson</td><td>Active</td><td>2024-01-15</td></tr>
      <tr><td>Charlie Brown</td><td>Pending</td><td>2024-03-20</td></tr>
      <tr><td>Bob Smith</td><td>Active</td><td>2024-02-10</td></tr>
      <tr><td>Emma Wilson</td><td>Inactive</td><td>2023-12-01</td></tr>
      <tr><td>David Lee</td><td>Pending</td><td>2024-01-30</td></tr>
    </tbody>
  </table>
</goa-table>
<script>
const multiTable = document.getElementById('multi-sort-table');
multiTable.addEventListener('_multisort', (e) => {
  const { sorts } = e.detail;
  const tbody = multiTable.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const colIndex = { name: 0, status: 1, date: 2 };
  rows.sort((a, b) => {
    for (const sort of sorts) {
      const idx = colIndex[sort.column];
      const dir = sort.direction === 'asc' ? 1 : -1;
      const cmp = a.children[idx].textContent.localeCompare(b.children[idx].textContent);
      if (cmp !== 0) return cmp * dir;
    }
    return 0;
  });
  rows.forEach(row => tbody.appendChild(row));
});
</script>`,
      },
    },
  ],
};
