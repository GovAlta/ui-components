import { useState } from "react";
import {
  GoabBlock,
  GoabDropdown,
  GoabDropdownItem,
  GoabPagination,
  GoabSpacer,
  GoabTable,
  GoabText,
} from "@abgov/react-components";
import type { GoabDropdownOnChangeDetail } from "@abgov/ui-components-common";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

const FIRST_NAMES = ["Emma", "Liam", "Olivia", "Noah", "Ava", "James", "Sophia", "William", "Isabella", "Oliver"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

const USERS: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: `user-${i + 1}`,
  firstName: FIRST_NAMES[i % FIRST_NAMES.length],
  lastName: LAST_NAMES[i % LAST_NAMES.length],
  age: 20 + ((i + 1) % 40),
}));

export function Bug3741Route() {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const offset = (page - 1) * perPage;
  const pageUsers = USERS.slice(offset, offset + perPage);

  function handlePerPageCountChangeEvent(event: GoabDropdownOnChangeDetail) {
    setPage(1);
    setPerPage(parseInt(event.value || "10"));
  }

  return (
    <div>
      <GoabText tag="h1" mt="m" mb="m">
        Bug #3741: Pagination example not reproducible
      </GoabText>
      <GoabText tag="p" mb="l">
        The "Show number of results per page" example uses a spacer with
        hSpacing="fill" to push the pagination to the right edge. React always
        rendered this correctly; this page is the control matching the Angular
        fix (bugs/3741).
      </GoabText>

      <GoabTable width="100%" mb="xl">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {pageUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.age}</td>
            </tr>
          ))}
        </tbody>
      </GoabTable>

      <GoabBlock alignment="center" width="100%">
        <GoabBlock mb="m" alignment="center">
          Show
          <GoabDropdown
            onChange={handlePerPageCountChangeEvent}
            value={perPage.toString()}
            width="9ch"
            size="compact"
          >
            <GoabDropdownItem value="10" label="10" />
            <GoabDropdownItem value="20" label="20" />
            <GoabDropdownItem value="30" label="30" />
          </GoabDropdown>
          <span style={{ width: "75px" }}>per page</span>
        </GoabBlock>
        <GoabSpacer hSpacing="fill" />
        <GoabPagination
          itemCount={USERS.length}
          perPageCount={perPage}
          pageNumber={page}
          onChange={(event) => setPage(event.page)}
        />
      </GoabBlock>
    </div>
  );
}

export default Bug3741Route;
