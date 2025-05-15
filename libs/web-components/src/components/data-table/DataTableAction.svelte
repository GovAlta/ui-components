<svelte:options customElement={{
  tag: "goa-data-table-action",
  props: {
    label: { type: "String", attribute: "label"},
    action: { type: "String", attribute: "action"},
    actionArg: { type: "String", attribute: "action-arg"},
    actionArgs: { type: "Object", attribute: "action-args"},
  }
}} />

<script lang="ts">
  import { onMount } from "svelte";
  import { relay } from "../../common/utils";
  import type { DataTableAction } from "./types";

  export let label: string;
  export let action: string;
  export let actionArg: string;
  export let actionArgs: Record<string, unknown> = {};

  let _el: HTMLElement;

  onMount(() => {
    relay<DataTableAction>(_el, "bind:action", { action, actionArg, actionArgs, label }, { bubbles: true });
  });
</script>

<div bind:this={_el} />
