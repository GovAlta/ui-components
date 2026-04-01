<svelte:options
  customElement={{
    tag: "goa-multi-select-option",
  }}
/>

<script lang="ts" context="module">
  export type MultiSelectItemMountedRelayDetail = {
    el: HTMLElement;
    filter: string;
    value: string;
    label: string;
  };

  export type MultiSelectItemDestroyRelayDetail = {
    value: string;
  };

  export type MultiSelectOption = {
    label: string;
    value: string;
    filter: string;
  };

  export const MultiSelectItemMountedMsg = "multi-select-item:mounted";
  export const MultiSelectItemDestroyMsg = "multi-select-item:destroyed";
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { receive, relay } from "../../common/utils";

  // Props
  /** Sets the text used to filter and match this item in typeahead search. */
  export let filter: string = "";
  /** Sets the display label for the option. */
  export let label: string = "";
  /** Sets the value submitted when this item is selected. */
  export let value: string = "";

  let _rootEl: HTMLElement;
  let _parentEl: HTMLElement;

  onMount(() => {
    addMessageListener();

    relay<MultiSelectItemMountedRelayDetail>(
      _rootEl,
      MultiSelectItemMountedMsg,
      { el: _rootEl, filter, value, label },
      { bubbles: true, timeout: 10 },
    );
  });

  function addMessageListener() {
    receive(_rootEl, (action, data) => {
      if (action === "multi-select:bind") {
        _parentEl = (data as { el: HTMLElement }).el;
      }
    });
  }

  onDestroy(() => {
    relay<MultiSelectItemDestroyRelayDetail>(
      _parentEl,
      MultiSelectItemDestroyMsg,
      { value },
      { bubbles: true },
    );
  });
</script>

<span bind:this={_rootEl} />
