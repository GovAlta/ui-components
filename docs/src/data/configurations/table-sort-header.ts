/**
 * TableSortHeader Component Configurations
 *
 * Sort headers for table columns, used within Table's thead.
 */

import type { ComponentConfigurations } from "./types";

export const tableSortHeaderConfigurations: ComponentConfigurations = {
  componentSlug: "table-sort-header",
  componentName: "TableSortHeader",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic sort header",
      description: "Sortable column header",
      code: {
        react: `<GoabTableSortHeader name="name" direction="asc">
  Name
</GoabTableSortHeader>`,
        angular: `<goab-table-sort-header name="name" direction="asc">
  Name
</goab-table-sort-header>`,
        webComponents: `<goa-table-sort-header version="2" name="name" direction="asc">
  Name
</goa-table-sort-header>`,
      },
    },
    {
      id: "directions",
      name: "Sort directions",
      description: "Ascending, descending, and unsorted states",
      code: {
        react: `<GoabTableSortHeader name="col1" direction="asc">
  Ascending
</GoabTableSortHeader>
<GoabTableSortHeader name="col2" direction="desc">
  Descending
</GoabTableSortHeader>
<GoabTableSortHeader name="col3" direction="none">
  Unsorted
</GoabTableSortHeader>`,
        angular: `<goab-table-sort-header name="col1" direction="asc">
  Ascending
</goab-table-sort-header>
<goab-table-sort-header name="col2" direction="desc">
  Descending
</goab-table-sort-header>
<goab-table-sort-header name="col3" direction="none">
  Unsorted
</goab-table-sort-header>`,
        webComponents: `<goa-table-sort-header version="2" name="col1" direction="asc">
  Ascending
</goa-table-sort-header>
<goa-table-sort-header version="2" name="col2" direction="desc">
  Descending
</goa-table-sort-header>
<goa-table-sort-header version="2" name="col3" direction="none">
  Unsorted
</goa-table-sort-header>`,
      },
    },
    {
      id: "sort-order",
      name: "With sort order",
      description: "Sort header with sortOrder for multi-column sort priority display",
      code: {
        react: `<GoabTableSortHeader name="name" direction="asc" sortOrder={1}>
  Name
</GoabTableSortHeader>
<GoabTableSortHeader name="date" direction="desc" sortOrder={2}>
  Date
</GoabTableSortHeader>`,
        angular: `<goab-table-sort-header name="name" direction="asc" [sortOrder]="1">
  Name
</goab-table-sort-header>
<goab-table-sort-header name="date" direction="desc" [sortOrder]="2">
  Date
</goab-table-sort-header>`,
        webComponents: `<goa-table-sort-header version="2" name="name" direction="asc" sort-order="1">
  Name
</goa-table-sort-header>
<goa-table-sort-header version="2" name="date" direction="desc" sort-order="2">
  Date
</goa-table-sort-header>`,
      },
    },
  ],
};
