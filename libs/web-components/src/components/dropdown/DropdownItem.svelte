<svelte:options customElement={{
  tag: "goa-dropdown-item",
}} />

<script lang="ts" context="module">

  export type DropdownItemMountType = "append" | "prepend" | "reset";

  export type Option = {
    label: string;
    value: string;
    filter: string;
    mountType: DropdownItemMountType;
  }

</script>

<script lang="ts">
  import { onMount } from "svelte";

  // Props
  
  export let filter: string = "";
  export let label: string = "";
  export let value: string = "";
  export let mount: DropdownItemMountType = "reset";

  let _rootEl: HTMLElement;

  onMount(() => {
    setTimeout(() => {
      _rootEl?.dispatchEvent(new CustomEvent<Option>("dropdown-item:mounted", {
        composed: true,
        bubbles: true,
        detail: { filter, value, label, mountType: mount }
      }))
    }, 10)
  })
</script>

<span bind:this={_rootEl} />
