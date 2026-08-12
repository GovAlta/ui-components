<svelte:options customElement="goa-app-footer-meta-section" />

<script lang="ts">
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
</script>

<!-- Template -->
<section data-testid={testid}>
  <div class="links">
    <slot />
  </div>
</section>

<style>
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--goa-footer-meta-links-gap);
    margin: var(--goa-footer-meta-links-margin, 8px 0px 0px 0px);
  }

  @media (--mobile) {
    .links {
      gap: var(--goa-footer-meta-links-gap-small-screen);
      margin: 0;
    }
  }

  .links :global(::slotted(goa-link)),
  .links :global(::slotted(goab-link)) {
    --goa-link-color-interactive-default: var(--goa-footer-color-links);
    --goa-link-color-interactive-hover: var(--goa-footer-color-links-hover);
    --goa-link-color-interactive-visited: var(--goa-footer-color-links);
    --goa-link-border-focus: var(--goa-footer-link-focus);
    --goa-link-border-radius-focus: var(--goa-footer-link-focus-border-radius);
    --goa-link-focus-offset: 0;
    white-space: nowrap;
  }
</style>
