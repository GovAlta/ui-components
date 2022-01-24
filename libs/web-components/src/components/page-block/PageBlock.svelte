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
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1.75rem;
  }

  @media (min-width: 768px) {
    .page-content {
      max-width: 80vh;
    }
  }

  @media (min-width: 1024px) {
    .page-content {
      max-width: 100ch;
    }
  }
</style>
