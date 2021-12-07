<svelte:options tag="goa-button-group" />

<!-- Script -->
<script lang="ts">
  export let alignto: "start"; // "start", "end"
</script>

<!-- HTML -->
<div style="--alignment: flex-{alignto};">
  <slot />
</div>

<!-- Style -->
<style>
  div {
    display: flex;
    flex-direction: row;
    justify-content: var(--alignment);
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
