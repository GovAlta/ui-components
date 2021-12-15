<svelte:options tag="goa-scrollable" />

<script lang="ts">
  export let direction: "vertical" | "horizontal" = "vertical";
  export let hpadding: number = 0;
  export let vpadding: number = 0;
  export let height: number = 0;
</script>

<div class="goa-scrollable" style={`
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
