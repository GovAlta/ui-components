<svelte:options tag="goa-page-layout" />

<!-- Script -->
<script lang="ts">
</script>

<!-- HTML -->
<div class="layout">
  <slot />
</div>

<!-- Style -->
<style>
  @media (min-width: 768px) {
    .layout {
    }
  }

  .layout {
    max-width: 768px;
    margin: 0 auto;

    padding: 2rem;
  }
</style>
