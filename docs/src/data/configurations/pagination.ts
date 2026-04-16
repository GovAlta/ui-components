/**
 * Pagination Component Configurations
 *
 * Pagination helps users navigate through multiple pages of content.
 */

import type { ComponentConfigurations } from "./types";

export const paginationConfigurations: ComponentConfigurations = {
  componentSlug: "pagination",
  componentName: "Pagination",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic pagination",
      description: "Simple pagination with page numbers",
      code: {
        react: `<GoabPagination
  pageNumber={1}
  itemCount={100}
  perPageCount={10}
  onChange={handlePageChange}
/>`,
        angular: `<goab-pagination
  [pageNumber]="1"
  [itemCount]="100"
  [perPageCount]="10"
  (onChange)="handlePageChange($event)">
</goab-pagination>`,
        webComponents: `<goa-pagination version="2" style="display: block; width: 100%"
  page="1"
  itemcount="100"
  perpagecount="10">
</goa-pagination>`,
      },
    },
    {
      id: "simple",
      name: "Simple",
      description: "Previous and next links only",
      code: {
        react: `<GoabPagination
  pageNumber={1}
  itemCount={50}
  perPageCount={10}
  variant="links-only"
  onChange={handlePageChange}
/>`,
        angular: `<goab-pagination
  [pageNumber]="1"
  [itemCount]="50"
  [perPageCount]="10"
  variant="links-only"
  (onChange)="handlePageChange($event)">
</goab-pagination>`,
        webComponents: `<goa-pagination version="2" style="display: block; width: 100%"
  page="1"
  itemcount="50"
  perpagecount="10"
  variant="links-only">
</goa-pagination>`,
      },
    },
  ],
};
