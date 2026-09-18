import { useState } from "react";
import {
  GoabAccordion,
  GoabPagination,
  GoabTable,
  GoabText,
} from "@abgov/react-components";
import type { GoabPaginationOnChangeDetail } from "@abgov/ui-components-common";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

const firstNames = ["Emma", "Liam", "Olivia", "Noah", "Ava"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];

function generateUsers(): User[] {
  return Array.from({ length: 100 }, (_, index) => ({
    id: `user-${index + 1}`,
    firstName: firstNames[index % firstNames.length],
    lastName: lastNames[index % lastNames.length],
    age: 20 + ((index + 1) % 40),
  }));
}

const users = generateUsers();
const perPage = 10;

function UserTable({ pageUsers }: { pageUsers: User[] }) {
  return (
    <GoabTable width="100%" mb="xl">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {pageUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.age}</td>
          </tr>
        ))}
      </tbody>
    </GoabTable>
  );
}

export function Bug3103Route() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * perPage;
  const pageUsers = users.slice(offset, offset + perPage);
  const handlePageChange = (event: GoabPaginationOnChangeDetail) => setPage(event.page);

  return (
    <div>
      <GoabText tag="h1" mt="m" mb="s">
        Bug #3103: Pagination dropdown small inside Accordion
      </GoabText>
      <GoabText>
        Compare the page-number dropdown outside and inside the Accordion. Both dropdowns
        should be wide enough to display the current page number.
      </GoabText>
      <p>
        <a
          href="https://github.com/GovAlta/ui-components/issues/3103"
          target="_blank"
          rel="noopener"
        >
          View issue #3103 on GitHub
        </a>
      </p>

      <GoabText tag="h2" mt="l" mb="s">
        Pagination outside Accordion
      </GoabText>
      <UserTable pageUsers={pageUsers} />
      <GoabPagination
        pageNumber={page}
        itemCount={users.length}
        perPageCount={perPage}
        onChange={handlePageChange}
      />

      <GoabText tag="h2" mt="l" mb="s">
        Pagination inside Accordion
      </GoabText>
      <GoabAccordion heading="Pagination inside Accordion" open>
        <UserTable pageUsers={pageUsers} />
        <GoabPagination
          pageNumber={page}
          itemCount={users.length}
          perPageCount={perPage}
          onChange={handlePageChange}
        />
      </GoabAccordion>
    </div>
  );
}

export default Bug3103Route;
