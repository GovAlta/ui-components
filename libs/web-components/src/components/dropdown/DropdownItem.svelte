<svelte:options
  customElement={{
    tag: "goa-dropdown-item",
  }}
/>

<script lang="ts" context="module">
  export type DropdownItemMountType = "append" | "prepend" | "reset";
  export type DropdownItemMountedRelayDetail = {
    el: HTMLElement;
    filter: string;
    value: string;
    label: string;
    mountType: DropdownItemMountType;
  }
  export type DropdownItemDestroyRelayDetail = {
    value: string;
  }
  export const DropdownItemMountedMsg = "dropdown-item:mounted";
  export const DropdownItemDestroyMsg = "dropdown-item:destroyed";

  export type Option = {
    label: string;
    value: string;
    filter: string;
    mountType: DropdownItemMountType;
  };
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { receive, relay } from "../../common/utils";

  // Props

  /** Text used to filter and match this item in typeahead search. */
  export let filter: string = "";
  /** Display label for the dropdown item. */
  export let label: string = "";
  /** The value submitted when this item is selected. */
  export let value: string = "";
  /** Controls how the item is registered with the parent dropdown. */
  export let mount: DropdownItemMountType = "reset";

  let _rootEl: HTMLElement;
  let _parentEl: HTMLElement;

  onMount(() => {
    addMessageListener();

    relay<DropdownItemMountedRelayDetail>(
      _rootEl,
      DropdownItemMountedMsg,
      { el: _rootEl, filter, value, label, mountType: mount },
      { bubbles: true, timeout: 10 },
      );
  });

  function addMessageListener() {
    receive(_rootEl, (action, data) => {
      switch(action) {
        case "dropdown:bind":
          _parentEl = (data as { el: HTMLElement}).el;
          break;
      }
    })
  }

  onDestroy(() => {
    relay<DropdownItemDestroyRelayDetail>(
      _parentEl,
      DropdownItemDestroyMsg,
      { value },
      { bubbles: true },
    );
  });
</script>

<span bind:this={_rootEl} />
