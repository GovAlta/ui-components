import { GoabPagination } from "@abgov/react-components";
import { GoabPaginationOnChangeDetail } from "@abgov/ui-components-common";
import { useState } from "react";

export function Bug3827Route() {
  const [page, setPage] = useState(1);

  function handleBasicPageChange(event: GoabPaginationOnChangeDetail): void {
    setPage(event.page);
  }

  return (
    <>
      <h3>Pagination with 5 pages</h3>
      <GoabPagination
        pageNumber={page}
        itemCount={50}
        perPageCount={10}
        onChange={(e) => handleBasicPageChange(e)}
      />

      <h3>Pagination with 15 pages</h3>
      <GoabPagination
        pageNumber={page}
        itemCount={150}
        perPageCount={10}
        onChange={(e) => handleBasicPageChange(e)}
      />

      <h3>Pagination with 105 pages</h3>
      <GoabPagination
        pageNumber={page}
        itemCount={1050}
        perPageCount={10}
        onChange={(e) => handleBasicPageChange(e)}
      />

      <h3>Pagination with 1005 pages</h3>
      <GoabPagination
        pageNumber={page}
        itemCount={10050}
        perPageCount={10}
        onChange={(e) => handleBasicPageChange(e)}
      />
    </>
  );
}
