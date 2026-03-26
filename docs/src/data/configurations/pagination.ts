/**
 * Pagination Component Configurations
 *
 * Pagination helps users navigate through multiple pages of content.
 */

import type { ComponentConfigurations } from './types';

export const paginationConfigurations: ComponentConfigurations = {
  componentSlug: 'pagination',
  componentName: 'Pagination',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic pagination',
      description: 'Simple pagination with page numbers',
      code: {
        react: `<GoabPagination
  page={1}
  itemCount={100}
  perPageCount={10}
  onChange={handlePageChange}
/>`,
        angular: `<goab-pagination
  [page]="1"
  [itemCount]="100"
  [perPageCount]="10"
  (_change)="handlePageChange($event)">
</goab-pagination>`,
        webComponents: `<goa-pagination version="2"
  page="1"
  itemcount="100"
  perpagecount="10">
</goa-pagination>`,
      },
    },
    {
      id: 'with-variants',
      name: 'Variants',
      description: 'Different pagination styles',
      code: {
        react: `<GoabPagination
  page={1}
  itemCount={50}
  perPageCount={10}
  variant="all"
/>
<GoabPagination
  page={1}
  itemCount={50}
  perPageCount={10}
  variant="links-only"
/>`,
        angular: `<goab-pagination
  [page]="1"
  [itemCount]="50"
  [perPageCount]="10"
  variant="all">
</goab-pagination>
<goab-pagination
  [page]="1"
  [itemCount]="50"
  [perPageCount]="10"
  variant="links-only">
</goab-pagination>`,
        webComponents: `<goa-pagination version="2"
  page="1"
  itemcount="50"
  perpagecount="10"
  variant="all">
</goa-pagination>
<goa-pagination version="2"
  page="1"
  itemcount="50"
  perpagecount="10"
  variant="links-only">
</goa-pagination>`,
      },
    },
    {
      id: 'middle-page',
      name: 'Middle page',
      description: 'Pagination showing middle page selected',
      code: {
        react: `<GoabPagination
  page={5}
  itemCount={100}
  perPageCount={10}
  onChange={handlePageChange}
/>`,
        angular: `<goab-pagination
  [page]="5"
  [itemCount]="100"
  [perPageCount]="10"
  (_change)="handlePageChange($event)">
</goab-pagination>`,
        webComponents: `<goa-pagination version="2"
  page="5"
  itemcount="100"
  perpagecount="10">
</goa-pagination>`,
      },
    },
  ],
};
