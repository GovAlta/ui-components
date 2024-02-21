<svelte:options customElement="test-pages" />

<script lang="ts">
  import Pages from "./Pages.svelte";

  let current = 1
</script>

<Pages {current}>
  <div data-testid="page-1">Page 1</div>
  <div data-testid="page-2">Page 2</div>
  <div data-testid="page-3">Page 3</div>
</Pages>

<button data-testid="previous" on:click={() => current--}>Previous</button>
<button data-testid="next" on:click={() => current++}>Next</button>