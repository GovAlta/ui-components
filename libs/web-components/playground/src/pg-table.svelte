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

<goa-container type="info" mode="overflow-x">
  <goa-table>
    <thead>
      <tr>
        <th>Col 1</th>
        <th>Col 2</th>
        <th>Col 3</th>
        <th>Col 4</th>
        <th>Col 5</th>
        <th>Col 6</th>
        <th>Col 7</th>
        <th>Col 8</th>
        <th>Col 9</th>
        <th>Col 10</th>
        <th>Col 11</th>
        <th>Col 12</th>
        <th>Col 13</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <goa-block alignment="center" gap="xs">
            <goa-icon type="alarm"></goa-icon>Item 1
          </goa-block>
        </td>
        <td>Item 2</td>
        <td>Item 3</td>
        <td>Item 4</td>
        <td>Item 5</td>
        <td>Item 6</td>
        <td>Item 7</td>
        <td>Item 8</td>
        <td>Item 9</td>
        <td>Item 10</td>
        <td>Item 11</td>
        <td>Item 12</td>
        <td>Item 13</td>
      </tr>
      <tr>
        <td>
          <goa-block alignment="center" gap="xs">
            <goa-icon type="alarm"></goa-icon>Item 1
          </goa-block>
        </td>
        <td>Item 2</td>
        <td>Item 3</td>
        <td>Item 4</td>
        <td>Item 5</td>
        <td>Item 6</td>
        <td>Item 7</td>
        <td>Item 8</td>
        <td>Item 9</td>
        <td>Item 10</td>
        <td>Item 11</td>
        <td>Item 12</td>
        <td>Item 13</td>
      </tr>
    </tbody>
  </goa-table>
</goa-container>

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
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each _users as user}
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td class="goa-table-number-column">{user.age}</td>
        <td><button on:click={() => alert("here")}>Click</button></td>
      </tr>
    {/each}
  </tbody>
  <tfoot>
    <tr>
      <td colSpan={4}>This is the footer</td>
    </tr>
  </tfoot>
</goa-table>

<goa-grid>
  <goa-container type="info" mode="stretch">
    <h2>Interactive Container</h2>
    Content
  </goa-container>
  <goa-container type="non-interactive">
    <h2>Non-Interactive Container</h2>
    Content
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit quis delectus, temporibus facere enim impedit ratione non veniam sequi at vel reiciendis tempore tempora quod nihil, eveniet praesentium nam dolor?
  </goa-container>
</goa-grid>
<goa-grid>
  <goa-container type="info" mode="stretch">
    <h2>Info Container</h2>
    Content
  </goa-container>
  <goa-container type="error">
    <h2>Error Container</h2>
    Content
  </goa-container>
</goa-grid>
<goa-grid>
  <goa-container type="success">
    <h2>Success Container</h2>
    Content
  </goa-container>
  <goa-container type="important">
    <h2>Important Container</h2>
    Content
  </goa-container>
</goa-grid>
<goa-container accent="thin" type="interactive">
  <h2>Success Container w/ Header</h2>
  If you use an accent, the background colour won't be filled in
</goa-container>

<style>
  td, th {
    min-width: 16ch;
  }
</style>
