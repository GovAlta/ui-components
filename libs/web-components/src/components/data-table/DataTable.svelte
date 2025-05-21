<svelte:options customElement={{
  tag: "goa-data-table",
  props: {
    selectable: { type: "Boolean", attribute: "selectable" },
  }
}} />

<script lang="ts">
  import { onMount } from "svelte";
  import { dispatch, receive, relay } from "../../common/utils";
  import { DataTableAction, DataTableItem, DataTableRow } from "./types";

  export let layout: "table" | "card" = "table";
  export let selectable: boolean;

  let _receiverEl: HTMLElement;
  let _senderEl: HTMLElement;
  let _tableEl: HTMLElement;

  let _rows: DataTableRow[] = [];
  let _actions: DataTableAction[] = [];

  onMount(() => {
    receive(_receiverEl, (action, data, e) => {
      switch (action) {
        case "bind:row":
          bindRow(data as DataTableRow);
          e.stopPropagation();
          break;
        case "remove:item":
          removeItem(data as { uid: string});
          e.stopPropagation();
          break;
      }
    })
  })

  function bindRow(row: DataTableRow) {
    _rows = [..._rows, row];
    relay(row.el, "set:parent", _receiverEl);
  }

  function removeItem(item: { uid: string }) {
    const index = _rows.findIndex(row => row.uid === item.uid);
    _rows = _rows.filter((row, i) => i !== index);
    _actions = _actions.filter((row, i) => i !== index);
  }

  function selectItem(e: CustomEvent, uid: string) {
    const checked = e.detail.checked;
    if (checked) {
      dispatch(_senderEl, "select", uid, { bubbles: true });
    } else {
      dispatch(_senderEl, "deselect", uid, { bubbles: true });
    }
  }
</script>

<div bind:this={_receiverEl}>
  <slot />
</div>

<div bind:this={_senderEl} />

{#if layout === "table"}
  <table bind:this={_tableEl}>
    {#each _rows as row (row.uid)}
      <tr>
        {#if selectable}
          <td>
            <goa-checkbox on:_change={(e) => selectItem(e, row.uid)} mb="none" mt="none" />
          </td>
        {/if}
        {#each row.items as item}
          <td>
            {#if item.content.data}
              {item.content.data}
            {:else}
              {@html item.content.outerHTML}
            {/if}
          </td>
        {/each}
        {#each row.actions as action}
          <td>
            <goa-button
              action={action.action}
              action-arg={action.actionArg}
              action-args={JSON.stringify(action.actionArgs)}
              size="compact"
            >
              {action.label || action.action}
            </goa-button>
          </td>
        {/each}
      </tr>
    {/each}
  </table>
{:else}
  {#each _rows as row (row.uid)}
    <goa-container>
      {#each row.items as item}
        {item.label}: {@html item.content.data || item.content.outerHTML} <br />
      {/each}
    </goa-container>
  {/each}
{/if}

<style>
  table {
    border-spacing: 0;
  }
  table td {
    vertical-align: middle;
    padding: 0 1rem;
    height: 3rem;
  }

  table tr {
    border-bottom: 1px solid #ddd;
  }

  table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
</style>
