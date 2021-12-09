<svelte:options tag="goa-card-group" />

<!-- Script -->
<script lang="ts">

</script>

<!-- HTML -->
<div class="card-group">
  <slot />
</div>

<!-- Style -->
<style>
  .card-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
  }

</style>
