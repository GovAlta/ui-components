<svelte:options customElement="goa-card-group" />

<!-- Script -->
<script lang="ts">
</script>

<!-- HTML -->
<div class="card-group">
  <slot />
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  .card-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1rem;
    width: 100%;
  }
</style>
