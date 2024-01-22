<svelte:options customElement="test-table-wrapper" />

<script lang="ts">
  export let width: string = "";
  export let columnTitles: string[] = [];
  export let data: Record<string, unknown>[][];
</script>

<goa-table {width}>
  <thead>
    {#each columnTitles as title}
      <th>{title}</th>
    {/each}
  </thead>
  <tbody>
    {#each data as row}
      <tr>
        {#each row as item}
          <td>{item}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</goa-table>
