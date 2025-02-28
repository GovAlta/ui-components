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
  import { onDestroy, onMount, tick } from "svelte";
  import { receive, relay } from "../../common/utils";

  // Props

  export let filter: string = "";
  export let label: string = "";
  export let value: string = "";
  export let mount: DropdownItemMountType = "reset";

  let _rootEl: HTMLElement;
  let _parentEl: HTMLElement;

  onMount(async() => {
    await tick();
    relay<DropdownItemMountedRelayDetail>(
      _rootEl,
      DropdownItemMountedMsg,
      { el: _rootEl, filter, value, label, mountType: mount },
      { bubbles: true, timeout: 10 },
    );

    addMessageListener();
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

  onDestroy(async () => {
    relay<DropdownItemDestroyRelayDetail>(
      _parentEl,
      DropdownItemDestroyMsg,
      { value },
      { bubbles: true },
    );
  });
</script>

<span bind:this={_rootEl} />
