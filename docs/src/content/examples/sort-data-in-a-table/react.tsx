import { useEffect, useState } from "react";
import { GoabTable, GoabTableSortHeader } from "@abgov/react-components";
import type { GoabTableOnSortDetail } from "@abgov/ui-components-common";

interface User {
  firstName: string;
  lastName: string;
  age: number;
}

export function SortDataInATable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const _users: User[] = [
      { firstName: "Christian", lastName: "Batz", age: 18 },
      { firstName: "Brain", lastName: "Wisozk", age: 19 },
      { firstName: "Neha", lastName: "Jones", age: 23 },
      { firstName: "Tristin", lastName: "Buckridge", age: 31 },
    ];
    setUsers(_users);
  }, []);

  function sortData(event: GoabTableOnSortDetail) {
    const _users = [...users];
    _users.sort((a: any, b: any) => {
      return (a[event.sortBy] > b[event.sortBy] ? 1 : -1) * event.sortDir;
    });
    setUsers(_users);
  }

  return (
    <GoabTable onSort={sortData} width="100%">
      <thead>
        <tr>
          <th>
            <GoabTableSortHeader name="firstName">First name</GoabTableSortHeader>
          </th>
          <th>
            <GoabTableSortHeader name="lastName">Last name</GoabTableSortHeader>
          </th>
          <th>
            <GoabTableSortHeader name="age" direction="asc">
              Age
            </GoabTableSortHeader>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.firstName}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.age}</td>
          </tr>
        ))}
      </tbody>
    </GoabTable>
  );
}
