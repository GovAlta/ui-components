<svelte:options customElement={{
  tag: "goa-data-table-item",
  props: {

  }
}} />

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { relay } from "../../common/utils";
  import { DataTableItem } from "./types";

  export let label: string;
  export let name: string;
  // export let value: string;

  let _el: HTMLElement;

  onMount(() => {
    const content = _el.querySelector("slot").assignedNodes()?.[0] as HTMLElement;
    console.log(content);
    relay<DataTableItem>(_el, "bind:item", { name, content, label }, { bubbles: true });
  });
</script>

<div bind:this={_el} style="display: none">
  <slot />
</div>
