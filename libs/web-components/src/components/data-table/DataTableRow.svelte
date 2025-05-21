<svelte:options customElement={{
  tag: "goa-data-table-row",
  props: {
    uid: { type: "String", attribute: "uid" },
  }
}} />

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { performOnce, receive, relay } from "../../common/utils";
  import { DataTableAction, DataTableItem, DataTableRow } from "./types";

  export let uid: string;

  let _senderEl: HTMLElement;
  let _receiverEl: HTMLElement;
  let _parentEl: HTMLElement;

  let _items: DataTableItem[] = [];
  let _actions: DataTableAction[] = [];

  let _timeoutId: any;

  onMount(() => {
    receive(_receiverEl, (type, data, e) => {
      e.stopPropagation();
      switch (type) {
        case "bind:action":
          addAction(data as DataTableAction);
          break;
        case "bind:item":
          addItem(data as DataTableItem);
          break;
        case "set:parent":
          setParentEl(data as HTMLElement);
          return;
      }

      _timeoutId = performOnce(_timeoutId, () => {
        dispatchRowDetails()
      }, 100)
    });
  })

  onDestroy(() => {
    console.log("DataTableRow:onDestroy", uid);
    relay(_parentEl, "remove:item", { uid }, { bubbles: true });
  })

  function setParentEl(el: HTMLElement) {
    _parentEl = el;
  }

  function addAction(action: DataTableAction) {
    _actions.push(action);
  }

  function addItem(item: DataTableItem) {
    _items.push(item);
  }

  function dispatchRowDetails() {
    relay<DataTableRow>(_senderEl, "bind:row", { el: _receiverEl, uid, actions: _actions, items: _items }, { bubbles: true });
  }

</script>

<div bind:this={_senderEl}></div>
<div bind:this={_receiverEl}>
  <slot />
</div>
