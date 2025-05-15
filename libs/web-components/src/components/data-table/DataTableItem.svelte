<svelte:options customElement={{
  tag: "goa-data-table-item",
  props: {

  }
}} />

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { relay } from "../../common/utils";
  import { DataTableItem } from "./types";

  export let name: string;
  export let value: string;

  let _el: HTMLElement;

  onMount(() => {
    relay<DataTableItem>(_el, "bind:item", { name, value }, { bubbles: true });
  });
</script>

<div bind:this={_el} />
