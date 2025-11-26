import React from "react";
import {
  GoabTable,
  GoabBadge,
  GoabPopover,
  GoabButton,
  GoabTableSortHeader,
} from "@abgov/react-components";
import {
  GoabTableOnSortDetail,
  GoabPaginationOnChangeDetail,
} from "@abgov/ui-components-common";

export function Bug2393Route() {
  function handleClick() {
    console.log("Click event");
  }

  function handleSort(event: GoabTableOnSortDetail) {
    console.log("Sorting Direction: ", event.sortDir);
    console.log("Sorting By: ", event.sortBy);
  }

  return (
    <main>
      <GoabTable width="100%" mb="xl" onSort={handleSort}>
        <thead>
          <tr>
            <th>
              <GoabTableSortHeader name="claimId" direction="asc">
                Claim ID
              </GoabTableSortHeader>
            </th>
            <th>
              <GoabTableSortHeader name="programId" direction="asc">
                Program ID
              </GoabTableSortHeader>
            </th>
            <th>
              <GoabTableSortHeader name="programName" direction="asc">
                Program Name
              </GoabTableSortHeader>
            </th>
            <th>
              <GoabTableSortHeader name="claimPeriod" direction="asc">
                Claim Period
              </GoabTableSortHeader>
            </th>
            <th>
              <GoabTableSortHeader name="claimStatus" direction="asc">
                Claim Status
              </GoabTableSortHeader>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>000001</td>
            <td>80000225</td>
            <td>MI CASA MONTESSORI LTD.</td>
            <td>July 2025</td>
            <td>
              <GoabBadge type="midtone" content="In Review" />
            </td>
            <td>
              <GoabPopover
                target={
                  <GoabButton type="secondary" size="compact">
                    Click me
                  </GoabButton>
                }
              >
                <GoabButton size="compact" type="tertiary" onClick={handleClick}>
                  Claim submission report
                </GoabButton>
                <GoabButton size="compact" type="tertiary" onClick={handleClick}>
                  Educators' submission report
                </GoabButton>
              </GoabPopover>
            </td>
          </tr>
        </tbody>
      </GoabTable>
    </main>
  );
}
