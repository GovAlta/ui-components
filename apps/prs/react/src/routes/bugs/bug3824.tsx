import { GoabPagination, GoabText } from "@abgov/react-components";
import { useState } from "react";

export function Bug3824Route() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      <GoabText tag="h1" mb="m">
        Bug 3824 - Pagination: gap between Previous and Next buttons should be goa-space-l
      </GoabText>
      <GoabText mb="m">
        The gap between Previous and Next buttons should be <code>goa-space-l</code> (1.5rem).
      </GoabText>
      <GoabPagination
        itemCount={100}
        pageNumber={page}
        onChange={({ page }) => setPage(page)}
      />
    </div>
  );
}
