import { useState } from "react";
import {
  GoabBlock,
  GoabDropdown,
  GoabDropdownItem,
  GoabPagination,
  GoabSpacer,
  GoabTable,
} from "@abgov/react-components";

import type { GoabDropdownOnChangeDetail } from "@abgov/ui-components-common";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

function generateUsers(): User[] {
  const firstNames = [
    "Emma",
    "Liam",
    "Olivia",
    "Noah",
    "Ava",
    "James",
    "Sophia",
    "William",
    "Isabella",
    "Oliver",
    "Mia",
    "Benjamin",
    "Charlotte",
    "Elijah",
    "Amelia",
    "Lucas",
    "Harper",
    "Mason",
    "Evelyn",
    "Logan",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Wilson",
    "Anderson",
    "Taylor",
    "Thomas",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Thompson",
    "White",
  ];
  const users: User[] = [];
  for (let i = 1; i <= 100; i++) {
    users.push({
      id: `user-${i}`,
      firstName: firstNames[(i - 1) % firstNames.length],
      lastName: lastNames[(i - 1) % lastNames.length],
      age: 20 + (i % 40),
    });
  }
  return users;
}

export function ShowNumberOfResultsPerPage() {
  const [users] = useState<User[]>(() => generateUsers());
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const offset = (page - 1) * perPage;
  const pageUsers = users.slice(offset, offset + perPage);

  function changePage(newPage: number) {
    setPage(newPage);
  }

  function handlePerPageCountChangeEvent(event: GoabDropdownOnChangeDetail) {
    setPage(1);
    setPerPage(parseInt(event.value || "10"));
  }

  return (
    <>
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
          >
            <GoabDropdownItem value="10" label="10" />
            <GoabDropdownItem value="20" label="20" />
            <GoabDropdownItem value="30" label="30" />
          </GoabDropdown>
          <span style={{ width: "75px" }}>per page</span>
        </GoabBlock>
        <GoabSpacer hSpacing="fill" />
        <GoabPagination
          itemCount={users.length}
          perPageCount={perPage}
          pageNumber={page}
          onChange={(event) => changePage(event.page)}
        />
      </GoabBlock>
    </>
  );
}
