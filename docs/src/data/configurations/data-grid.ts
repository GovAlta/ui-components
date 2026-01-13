/**
 * DataGrid Component Configurations
 *
 * DataGrid displays structured data with advanced features.
 */

import type { ComponentConfigurations } from './types';

export const dataGridConfigurations: ComponentConfigurations = {
  componentSlug: 'data-grid',
  componentName: 'Data grid',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic data grid',
      description: 'Simple data grid with columns',
      code: {
        react: `<GoabDataGrid data={data}>
  <GoabDataGridColumn field="name" header="Name" />
  <GoabDataGridColumn field="status" header="Status" />
  <GoabDataGridColumn field="date" header="Date" />
</GoabDataGrid>`,
        angular: `<goab-data-grid [data]="data">
  <goab-data-grid-column field="name" header="Name"></goab-data-grid-column>
  <goab-data-grid-column field="status" header="Status"></goab-data-grid-column>
  <goab-data-grid-column field="date" header="Date"></goab-data-grid-column>
</goab-data-grid>`,
        webComponents: `<goa-data-grid id="myGrid">
  <goa-data-grid-column field="name" header="Name"></goa-data-grid-column>
  <goa-data-grid-column field="status" header="Status"></goa-data-grid-column>
  <goa-data-grid-column field="date" header="Date"></goa-data-grid-column>
</goa-data-grid>`,
      },
    },
    {
      id: 'sortable',
      name: 'Sortable columns',
      description: 'Data grid with sorting enabled',
      code: {
        react: `<GoabDataGrid data={data}>
  <GoabDataGridColumn field="name" header="Name" sortable />
  <GoabDataGridColumn field="amount" header="Amount" sortable type="number" />
  <GoabDataGridColumn field="date" header="Date" sortable type="date" />
</GoabDataGrid>`,
        angular: `<goab-data-grid [data]="data">
  <goab-data-grid-column field="name" header="Name" [sortable]="true"></goab-data-grid-column>
  <goab-data-grid-column field="amount" header="Amount" [sortable]="true" type="number"></goab-data-grid-column>
  <goab-data-grid-column field="date" header="Date" [sortable]="true" type="date"></goab-data-grid-column>
</goab-data-grid>`,
        webComponents: `<goa-data-grid id="sortableGrid">
  <goa-data-grid-column field="name" header="Name" sortable></goa-data-grid-column>
  <goa-data-grid-column field="amount" header="Amount" sortable type="number"></goa-data-grid-column>
  <goa-data-grid-column field="date" header="Date" sortable type="date"></goa-data-grid-column>
</goa-data-grid>`,
      },
    },
    {
      id: 'with-selection',
      name: 'With selection',
      description: 'Data grid with row selection',
      code: {
        react: `<GoabDataGrid data={data} selectable onSelectionChange={handleSelection}>
  <GoabDataGridColumn field="id" header="ID" />
  <GoabDataGridColumn field="name" header="Name" />
  <GoabDataGridColumn field="status" header="Status" />
</GoabDataGrid>`,
        angular: `<goab-data-grid [data]="data" [selectable]="true" (_selectionChange)="handleSelection($event)">
  <goab-data-grid-column field="id" header="ID"></goab-data-grid-column>
  <goab-data-grid-column field="name" header="Name"></goab-data-grid-column>
  <goab-data-grid-column field="status" header="Status"></goab-data-grid-column>
</goab-data-grid>`,
        webComponents: `<goa-data-grid id="selectableGrid" selectable>
  <goa-data-grid-column field="id" header="ID"></goa-data-grid-column>
  <goa-data-grid-column field="name" header="Name"></goa-data-grid-column>
  <goa-data-grid-column field="status" header="Status"></goa-data-grid-column>
</goa-data-grid>`,
      },
    },
  ],
};
