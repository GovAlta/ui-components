<svelte:options tag="goa-scrollable" />

<script lang="ts">
import { onMount, tick } from "svelte";

  export let vertical: boolean = false;
  export let horizontal: boolean = false;
  export let hPadding: number = 0;
  export let vPadding: number = 0;
  export let height: number = 0;

  onMount(async () => {
    await tick();
  });

</script>

<div class="goa-scrollable" style={`
  overflow-y: ${vertical ? 'auto' : 'hidden'};
  overflow-x: ${horizontal ? 'auto' : 'hidden'};
  max-height: ${height ? height+'px' : '100%'};
  padding: ${vPadding}rem ${hPadding}rem;
`}>
  <slot></slot>
</div>

<style>
  .goa-scrollable {
    scroll-behavior: smooth;
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
