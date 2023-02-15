<svelte:options tag="goa-scrollable" />

<script lang="ts">
  import { onMount } from "svelte";

  export let direction: "vertical" | "horizontal" = "vertical";
  export let hpadding: number = 0;
  export let vpadding: number = 0;
  export let height: number = 0;

  let _el: HTMLElement;
  export let offsetHeight: number;
  export let scrollHeight: number;

  function onScroll(e: Event) {
    e.target.dispatchEvent(new CustomEvent("_scroll", { composed: true, detail: { offsetHeight: _el.offsetHeight,
      scrollHeight: _el.scrollHeight, scrollTop: _el.scrollTop} }));
    e.stopPropagation();
  }

  onMount(() => {
    offsetHeight = _el.offsetHeight;
    scrollHeight = _el.scrollHeight;
  });

</script>

<div class="goa-scrollable" bind:this={_el} on:scroll={onScroll} style={`
  --max-height: ${height};
  overflow-y: ${direction === "vertical" ? 'auto' : 'hidden'};
  overflow-x: ${direction === "horizontal" ? 'auto' : 'hidden'};
  margin: ${vpadding}rem 0;
  padding: 0 ${hpadding}rem;
`}>
  <slot />
</div>

<style>
  .goa-scrollable {
    scroll-behavior: smooth;
    max-height: calc(100vh * var(--max-height, 100) / 100);
  }

  .goa-scrollable::-webkit-scrollbar {
    width: 6px;
  }

  .goa-scrollable::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .goa-scrollable::-webkit-scrollbar-thumb {
    background: #888;
  }

  .goa-scrollable::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
