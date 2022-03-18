<svelte:options tag="goa-page-block" />

<!-- Script -->
<script lang="ts">
</script>

<!-- HTML -->
<div class="page-content">
  <slot />
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  .page-content {
    max-width: var(--page-width-max);
    margin: 0 auto;
    padding: 0 1.75rem;
  }
</style>
