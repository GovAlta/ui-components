<svelte:options tag="goa-card-content" />

<!-- Script -->
<script lang="ts">
</script>

<!-- HTML -->
<div class="card-content">
  <slot />
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  .card-content {
    padding: 1rem;
  }
</style>
