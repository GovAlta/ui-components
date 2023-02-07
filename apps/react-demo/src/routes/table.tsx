import * as React from "react";
import { GoATable } from "@abgov/react-components";
import { useEffect } from "react";
import { faker } from "@faker-js/faker";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

export default function Table() {
  const [data, setData] = React.useState<User[]>([]);

  useEffect(() => {
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number({ min: 18, max: 60 }),
      });
    }
    setData(users);
  }, []);

  function sortByFirstName() {
    const old = [...data];
    old.sort((a, b) => {
      if (a.firstName === b.firstName) return 0;
      return a.firstName < b.firstName ? -1 : 1;
    });
    setData(old);
  }

  return (
    <>
      <h4>Dynamic Table</h4>
      <button onClick={sortByFirstName}>First Name</button>
      <GoATable width="100%">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>This is the footer</td>
            <td>This is the footer</td>
            <td>This is the footer</td>
          </tr>
        </tfoot>
      </GoATable>

      <h4>Static Relaxed Table Variant</h4>
      <GoATable width="100%" variant="relaxed">
        <TableStaticHead />
        <TableStaticBody />
      </GoATable>
    </>
  );
}

function TableStaticHead() {
  return (
    <thead>
      <tr>
        <th>Col 1</th>
        <th>Col 2</th>
        <th>Col 3</th>
      </tr>
    </thead>
  );
}

function TableStaticBody() {
  return (
    <tbody>
      <tr>
        <td>
          <goa-block alignment="center" gap="xs">
            <goa-icon type="alarm"></goa-icon>Item 1
          </goa-block>
        </td>
        <td>Item 2</td>
        <td>Item 3</td>
      </tr>
      <tr>
        <td>
          <goa-block alignment="center" gap="xs">
            <goa-icon type="alarm"></goa-icon>Item 1
          </goa-block>
        </td>
        <td>Item 2</td>
        <td>Item 3</td>
      </tr>
    </tbody>
  );
}
