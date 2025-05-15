<svelte:options customElement={{
  tag: "goa-data-table",
  props: {

  }
}} />

<script lang="ts">
  import { onMount } from "svelte";
  import { receive, relay } from "../../common/utils";
  import { DataTableAction, DataTableRow } from "./types";

  let _receiverEl: HTMLElement;

  let _rows: DataTableRow[] = [];
  let _actions: DataTableAction[] = [];

  onMount(() => {
    receive(_receiverEl, (action, data, e) => {
      console.log("receive", action, data);
      switch (action) {
        case "bind:row":
          bindRow(data as DataTableRow);
          e.stopPropagation();
          break;
        case "bind:action":
          bindAction(data as DataTableAction);
          e.stopPropagation();
          break;
        case "remove:item":
          alert("here")
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

  function bindAction(action: DataTableAction) {
    _actions = [..._actions, action];
  }

  function removeItem(item: { uid: string }) {
    const index = _rows.findIndex(row => row.uid === item.uid);
    _rows = _rows.filter((row, i) => i !== index);
    _actions = _actions.filter((row, i) => i !== index);
  }
</script>

<div bind:this={_receiverEl}>
  <slot />
</div>

<table>
  {#each _rows as row}
    <tr>
      {#each row.items as item}
        <td>{item.value}</td>
      {/each}
      {#each row.actions as action}
        <td>
          <goa-button
            action={action.action}
            action-arg={action.actionArg}
            action-args={JSON.stringify(action.actionArgs)}
            size="compact"
          >
            {action.action}
          </goa-button>
        </td>
      {/each}
    </tr>
  {/each}
</table>
