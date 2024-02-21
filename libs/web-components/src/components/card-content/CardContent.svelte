<svelte:options customElement="goa-card-content" />

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
    font-family: var(--goa-font-family-sans);
  }
  .card-content {
    padding: 1rem;
  }
</style>
