<script lang="ts">
  import { faker } from "@faker-js/faker";

  type User = {
    id: string;
    firstName: string;
    lastName: string;
  };

  let users: User[] = [];
  let pageUsers: User[] = [];
  let page = 1;

  const _users: User[] = [];
  for (let i = 0; i < 100; i++) {
    _users.push({
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
  }
  users = [..._users];
  pageUsers = users.slice(0, 10);

  function handlePageChange(e: CustomEvent) {
    page = e.detail.page;
    const offset = (page - 1) * 10;
    pageUsers = users.slice(offset, offset + 10);
  }
  
</script>

<goa-table width="100%" mb="xl">
  <thead>
    <tr>
      <th>First name</th>
      <th>Last name</th>
    </tr>
  </thead>
  <tbody>
    {#each pageUsers as user}
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
      </tr>
    {/each}
  </tbody>
</goa-table>

<goa-pagination
  itemcount={users.length}
  perpagecount="10"
  pagenumber={page}
  on:_change={handlePageChange}
/>



