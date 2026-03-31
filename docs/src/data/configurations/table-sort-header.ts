/**
 * TableSortHeader Component Configurations
 *
 * Sort headers for table columns, used within Table's thead.
 */

import type { ComponentConfigurations } from './types';

export const tableSortHeaderConfigurations: ComponentConfigurations = {
  componentSlug: 'table-sort-header',
  componentName: 'TableSortHeader',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic sort header',
      description: 'Sortable column header with name and direction',
      code: {
        react: `<GoabTableSortHeader name="name" direction="asc">
  Name
</GoabTableSortHeader>`,
        angular: `<goab-table-sort-header name="name" direction="asc">
  Name
</goab-table-sort-header>`,
        webComponents: `<goa-table-sort-header name="name" direction="asc">
  Name
</goa-table-sort-header>`,
      },
    },
    {
      id: 'sort-order',
      name: 'With sort order',
      description: 'Sort header with sortOrder for multi-column sort priority display',
      code: {
        react: `<GoabTableSortHeader name="name" direction="asc" sortOrder={1}>
  Name
</GoabTableSortHeader>`,
        angular: `<goab-table-sort-header name="name" direction="asc" [sortOrder]="1">
  Name
</goab-table-sort-header>`,
        webComponents: `<goa-table-sort-header name="name" direction="asc" sort-order="1">
  Name
</goa-table-sort-header>`,
      },
    },
  ],
};
