import { GoAPagination, GoATable } from "@abgov/react-components";
import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

export default function PaginationPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pageUsers, setPageUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const _users = [];
    for (let i = 1; i < 100; i++) {
      _users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number({ min: 18, max: 60 }),
      });
    }
    setUsers(_users);
    setPageUsers(_users.slice(0, 10));
  }, []);

  function changePage(newPage: number) {
    const offset = (newPage - 1) * 10;
    const _users = users.slice(offset, offset + 10);
    setPage(newPage);
    setPageUsers(_users);
  }

  return (
    <>
      <GoATable width="100%" mb="xl">
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
      </GoATable>

      <GoAPagination
        itemCount={users.length}
        perPageCount={10}
        pageNumber={page}
        onChange={changePage}
      />
    </>
  );
}
