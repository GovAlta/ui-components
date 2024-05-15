<svelte:options customElement={{
  tag: "goa-dropdown-item",
}} />

<script lang="ts" context="module">

  export type Option = {
    label: string;
    value: string;
    filter: string;
  }

</script>

<script lang="ts">
  import { onMount } from "svelte";

  // Props
  
  export let filter: string = "";
  export let label: string = "";
  export let value: string = "";

  let _rootEl: HTMLElement;

  onMount(() => {
    setTimeout(() => {
      _rootEl?.dispatchEvent(new CustomEvent<Option>("dropdown-item:mounted", {
        composed: true,
        bubbles: true,
        detail: { filter, value, label }
      }))
    }, 10)
  })
</script>

<span bind:this={_rootEl} />
