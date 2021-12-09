<svelte:options tag="goa-scrollable" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  export let direction: "vertical" | "horizontal" = "vertical";
  export let hPadding: number = 0;
  export let vPadding: number = 0;
  export let height: number = 0;

  onMount(async () => {
    await tick();
  });

</script>

<div class="goa-scrollable" style={`
  --max-height: ${height};
  overflow-y: ${direction === "vertical" ? 'auto' : 'hidden'};
  overflow-x: ${direction === "horizontal" ? 'auto' : 'hidden'};
  padding: ${vPadding}rem ${hPadding}rem;
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
