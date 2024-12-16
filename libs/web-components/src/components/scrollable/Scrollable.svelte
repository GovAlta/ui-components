<svelte:options customElement="goa-scrollable" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  // Public
  export let direction: "vertical" | "horizontal" = "vertical";
  export let hpadding: string = "";
  export let vpadding: string = "";
  export let maxheight: string = "";
  export let offsetHeight: number;
  export let scrollHeight: number;

  // Private
  let _el: HTMLElement;

  function onScroll(e: Event) {
    e.target.dispatchEvent(
      new CustomEvent("_scroll", {
        composed: true,
        detail: {
          offsetHeight: _el.offsetHeight,
          scrollHeight: _el.scrollHeight,
          scrollTop: _el.scrollTop,
        },
      }),
    );
    e.stopPropagation();
  }

  onMount(async () => {
    await tick();
    offsetHeight = _el.offsetHeight;
    scrollHeight = _el.scrollHeight;
  });
</script>

<div
  class="goa-scrollable"
  bind:this={_el}
  on:scroll={onScroll}
  style={`
  max-height: ${maxheight || "50vh"};
  overflow-y: ${direction === "vertical" ? "auto" : "hidden"};
  overflow-x: ${direction === "horizontal" ? "auto" : "hidden"};
  margin: ${vpadding};
  padding: 0 ${hpadding} 3px;
`}
>
  <slot />
</div>

<style>



  .goa-scrollable {
    scroll-behavior: smooth;
    margin: 2px;
    width: auto;
  }

  .goa-scrollable::-webkit-scrollbar {
    width: var(--goa-space-xs);
  }

  .goa-scrollable::-webkit-scrollbar-track {
    border-radius: var(--goa-border-radius-m);
  }

  .goa-scrollable::-webkit-scrollbar-track:hover {
    background: var(--goa-color-greyscale-200);
  }

  .goa-scrollable::-webkit-scrollbar-thumb {
    background: var(--goa-color-greyscale-400);
    border-radius: var(--goa-border-radius-m);
  }

  .goa-scrollable::-webkit-scrollbar-thumb:hover {
    background: var(--goa-color-greyscale-600);
  }
</style>
