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
        react: `<GoabxTable>
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
</GoabxTable>`,
        angular: `<goabx-table>
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
</goabx-table>`,
        webComponents: `<goa-table version="2">
  <table>
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
        react: `<GoabxTable striped>
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
</GoabxTable>`,
        angular: `<goabx-table [striped]="true">
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
</goabx-table>`,
        webComponents: `<goa-table version="2" striped>
  <table>
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
      name: "Relaxed variant",
      description: "More vertical padding for comfortable reading",
      code: {
        react: `<GoabxTable variant="relaxed">
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
</GoabxTable>`,
        angular: `<goabx-table variant="relaxed">
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
</goabx-table>`,
        webComponents: `<goa-table version="2" variant="relaxed">
  <table>
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
      id: "sticky-header",
      name: "Sticky header",
      description: "Header stays visible when scrolling",
      code: {
        react: `<GoabxTable stickyHeader width="100%">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Department</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>001</td>
      <td>Alice Johnson</td>
      <td>Engineering</td>
    </tr>
    <tr>
      <td>002</td>
      <td>Bob Williams</td>
      <td>Marketing</td>
    </tr>
    <tr>
      <td>003</td>
      <td>Carol Davis</td>
      <td>Finance</td>
    </tr>
  </tbody>
</GoabxTable>`,
        angular: `<goabx-table [stickyHeader]="true" width="100%">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Department</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>001</td>
      <td>Alice Johnson</td>
      <td>Engineering</td>
    </tr>
    <tr>
      <td>002</td>
      <td>Bob Williams</td>
      <td>Marketing</td>
    </tr>
    <tr>
      <td>003</td>
      <td>Carol Davis</td>
      <td>Finance</td>
    </tr>
  </tbody>
</goabx-table>`,
        webComponents: `<goa-table version="2" stickyheader width="100%">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Department</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>001</td>
        <td>Alice Johnson</td>
        <td>Engineering</td>
      </tr>
      <tr>
        <td>002</td>
        <td>Bob Williams</td>
        <td>Marketing</td>
      </tr>
      <tr>
        <td>003</td>
        <td>Carol Davis</td>
        <td>Finance</td>
      </tr>
    </tbody>
  </table>
</goa-table>`,
      },
    },
    {
      id: "full-width",
      name: "Full width",
      description: "Table that spans container width",
      code: {
        react: `<GoabxTable width="100%" striped>
  <thead>
    <tr>
      <th>Application ID</th>
      <th>Applicant</th>
      <th>Status</th>
      <th>Submitted</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>APP-2024-001</td>
      <td>John Smith</td>
      <td>Under review</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>APP-2024-002</td>
      <td>Jane Doe</td>
      <td>Approved</td>
      <td>Jan 14, 2024</td>
    </tr>
  </tbody>
</GoabxTable>`,
        angular: `<goabx-table width="100%" [striped]="true">
  <thead>
    <tr>
      <th>Application ID</th>
      <th>Applicant</th>
      <th>Status</th>
      <th>Submitted</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>APP-2024-001</td>
      <td>John Smith</td>
      <td>Under review</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>APP-2024-002</td>
      <td>Jane Doe</td>
      <td>Approved</td>
      <td>Jan 14, 2024</td>
    </tr>
  </tbody>
</goabx-table>`,
        webComponents: `<goa-table version="2" width="100%" striped>
  <table>
    <thead>
      <tr>
        <th>Application ID</th>
        <th>Applicant</th>
        <th>Status</th>
        <th>Submitted</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>APP-2024-001</td>
        <td>John Smith</td>
        <td>Under review</td>
        <td>Jan 15, 2024</td>
      </tr>
      <tr>
        <td>APP-2024-002</td>
        <td>Jane Doe</td>
        <td>Approved</td>
        <td>Jan 14, 2024</td>
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
        react: `<GoabxTable onSort={(detail) => console.log(detail)}>
  <thead>
    <tr>
      <th>
        <GoabxTableSortHeader name="name" direction="asc">Name</GoabxTableSortHeader>
      </th>
      <th>
        <GoabxTableSortHeader name="status">Status</GoabxTableSortHeader>
      </th>
      <th>
        <GoabxTableSortHeader name="date">Date</GoabxTableSortHeader>
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
</GoabxTable>`,
        angular: `<goabx-table (onSort)="onSort($event)">
  <thead>
    <tr>
      <th>
        <goabx-table-sort-header name="name" direction="asc">Name</goabx-table-sort-header>
      </th>
      <th>
        <goabx-table-sort-header name="status">Status</goabx-table-sort-header>
      </th>
      <th>
        <goabx-table-sort-header name="date">Date</goabx-table-sort-header>
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
</goabx-table>`,
        webComponents: `<goa-table version="2">
  <table>
    <thead>
      <tr>
        <th><goa-table-sort-header name="name" direction="asc">Name</goa-table-sort-header></th>
        <th><goa-table-sort-header name="status">Status</goa-table-sort-header></th>
        <th><goa-table-sort-header name="date">Date</goa-table-sort-header></th>
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
      id: "multi-sort",
      name: "Multi-column sorting",
      description:
        'Sort by multiple columns with sortMode="multi" and sortOrder for priority',
      code: {
        react: `<GoabxTable sortMode="multi" onMultiSort={(detail) => console.log(detail.sorts)}>
  <thead>
    <tr>
      <th>
        <GoabxTableSortHeader name="name" direction="asc" sortOrder={1}>Name</GoabxTableSortHeader>
      </th>
      <th>
        <GoabxTableSortHeader name="status" direction="desc" sortOrder={2}>Status</GoabxTableSortHeader>
      </th>
      <th>
        <GoabxTableSortHeader name="date">Date</GoabxTableSortHeader>
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
</GoabxTable>`,
        angular: `<goabx-table sortMode="multi" (onMultiSort)="onMultiSort($event)">
  <thead>
    <tr>
      <th>
        <goabx-table-sort-header name="name" direction="asc" [sortOrder]="1">Name</goabx-table-sort-header>
      </th>
      <th>
        <goabx-table-sort-header name="status" direction="desc" [sortOrder]="2">Status</goabx-table-sort-header>
      </th>
      <th>
        <goabx-table-sort-header name="date">Date</goabx-table-sort-header>
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
</goabx-table>`,
        webComponents: `<goa-table version="2" sort-mode="multi">
  <table>
    <thead>
      <tr>
        <th><goa-table-sort-header name="name" direction="asc" sort-order="1">Name</goa-table-sort-header></th>
        <th><goa-table-sort-header name="status" direction="desc" sort-order="2">Status</goa-table-sort-header></th>
        <th><goa-table-sort-header name="date">Date</goa-table-sort-header></th>
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
  ],
};
