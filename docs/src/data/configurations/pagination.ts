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
        react: {
          ts: `const [page, setPage] = useState<number>(1);

function handlePageChange(detail: GoabPaginationOnChangeDetail) {
  setPage(detail.page);
}`,
          jsx: `<GoabPagination
  pageNumber={page}
  itemCount={100}
  perPageCount={10}
  onChange={handlePageChange}
/>`,
        },
        angular: {
          ts: `export class SomeComponent {
  page = 1;

  handlePageChange(detail: GoabPaginationOnChangeDetail) {
    this.page = detail.page;
  }
}`,
          template: `<goab-pagination
  [pageNumber]="page"
  [itemCount]="100"
  [perPageCount]="10"
  (onChange)="handlePageChange($event)"
>
</goab-pagination>`,
        },
        webComponents: `<goa-pagination
  id="basic-pagination"
  version="2"
  style="display: block; width: 100%"
  pagenumber="1"
  itemcount="100"
  perpagecount="10">
</goa-pagination>
<script>
  document
    .getElementById("basic-pagination")
    .addEventListener("_change", function(e) {
      console.log("page", e.detail.page);
    });
</script>`,
      },
    },
    {
      id: "simple",
      name: "Simple",
      description: "Previous and next links only",
      code: {
        react: {
          ts: `const [page, setPage] = useState<number>(1);

function handlePageChange(detail: GoabPaginationOnChangeDetail) {
  setPage(detail.page);
}`,
          jsx: `<GoabPagination
  pageNumber={page}
  itemCount={50}
  perPageCount={10}
  variant="links-only"
  onChange={handlePageChange}
/>`,
        },
        angular: {
          ts: `export class SomeComponent {
  page = 1;

  handlePageChange(detail: GoabPaginationOnChangeDetail) {
    this.page = detail.page;
  }
}`,
          template: `<goab-pagination
  [pageNumber]="page"
  [itemCount]="50"
  [perPageCount]="10"
  variant="links-only"
  (onChange)="handlePageChange($event)"
>
</goab-pagination>`,
        },
        webComponents: `<goa-pagination
  id="simple-pagination"
  version="2"
  style="display: block; width: 100%"
  pagenumber="1"
  itemcount="50"
  perpagecount="10"
  variant="links-only">
</goa-pagination>
<script>
  document
    .getElementById("simple-pagination")
    .addEventListener("_change", function(e) {
      console.log("page", e.detail.page);
    });
</script>`,
      },
    },
  ],
};
