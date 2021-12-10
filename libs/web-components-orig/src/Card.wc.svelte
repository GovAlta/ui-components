<svelte:options tag="goa-card" />

<!-- Script -->
<script lang="ts">
  export let elevation: number = 0;
</script>

<!-- HTML -->
<div class="card" style="{elevation === 0 ? `border: 1px solid var(--card-border-color)` : `box-shadow: var(--shadow-${elevation})`};">
  <slot />
</div>

<!-- Style -->
<style>
  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    border-radius: 4px;
    overflow: hidden;
  }
</style>
