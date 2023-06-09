<svelte:options tag="pg-table" />

<script lang="ts">

  import { faker } from "@faker-js/faker";
  import { onMount } from "svelte";

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
  }

  let _users: User[] = [];

  onMount(() => {
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number({ min: 18, max: 60 }),
      });
    }
    _users = [...users];
  })

  function sortData(e) {
    const {sortBy, sortDir} = e.detail;
    const list = [..._users];
    list.sort((a: any, b: any) => {
      return (a[sortBy] > b[sortBy] ? 1 : -1) * sortDir;
    });
    _users = list;
  }

</script>

<goa-table on:_sort={sortData}>
  <thead>
    <tr>
      <th>
        <goa-table-sort-header name="firstName">
          First name
        </goa-table-sort-header>
      </th>
      <th>
        <goa-table-sort-header name="lastName">Last name</goa-table-sort-header>
      </th>
      <th>
        <goa-table-sort-header name="age" direction="asc">Age</goa-table-sort-header>
      </th>
    </tr>
  </thead>
  <tbody>
    {#each _users as user}
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.age}</td>
      </tr>
    {/each}
  </tbody>
</goa-table>

