<svelte:options customElement={{
  tag: "goa-option",
}} />

<script lang="ts">
  import { onMount } from "svelte";
  import { dispatch } from "../../common/utils";

  export let value: string;

  let _el: HTMLElement;

  onMount(() => {
    const content = _el.querySelector("slot")?.assignedNodes()
    dispatch(_el, "goa:bind", { value, content }, { bubbles: true })
  })
</script>

<div bind:this={_el}>
  <slot />
</div>

<style>
  :host {
    display: none;
  }
</style>

