<svelte:options tag="pg-pagination"/>

<script lang="ts">
  import {onMount} from "svelte";
  import {faker} from "@faker-js/faker";

  let users = [];
  let pageUsers = [];
  let page = 1;


  onMount(() => {
    for (let i = 0; i < 100; i++) {
      users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      });
    }
    users = [...users];
    pageUsers = users.slice(0, 10);
    console.log("OnMount? ", users, pageUsers);
  });

  function handlePageChange(newPage) {
    page = newPage;
    const offset = (page - 1) * 10;
    pageUsers = users.slice(offset, offset + 10);
  }
</script>

<goa-table>
  <thead>
  <tr>
    <th>First Name</th>
    <th>Last Name</th>
  </tr>
  </thead>
  <tbody>
  {#each pageUsers as user, i}
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
    </tr>
  {/each}
  </tbody>
</goa-table>

<goa-pagination
  itemcount={users.length}
  pagenumber={page}
  perpagecount="10"
  on:_change="{handlePageChange}"></goa-pagination>
