<svelte:options customElement="goa-app-footer-nav-section" />

<script lang="ts">
  /** The section heading displayed above the navigation links. */
  export let heading: string = "";
  /** Maximum number of columns to display links in on larger screens. */
  export let maxcolumncount: number = 1;
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
</script>

<!-- Template -->
<section data-testid={testid}>
  {#if heading}
    <div class="title">{heading}</div>
    <goa-divider mb="l" />
  {/if}

  <div
    class="links"
    style={`
      --narrow-display-type: ${Math.ceil(maxcolumncount / 2) > 1 ? "block" : "flex"};
      --narrow-column-count: ${Math.ceil(maxcolumncount / 2)};
      --wide-display-type: ${maxcolumncount > 1 ? "block" : "flex"};
      --wide-column-count: ${maxcolumncount};
    `}
  >
    <slot />
  </div>
</section>

<!-- Styles -->
<style>
  :host {
    flex: auto;
  }

  .title {
    font: var(--goa-typography-heading-s);
    letter-spacing: var(--goa-typography-heading-s-letter-spacing);
    padding-bottom: var(--goa-space-m);
    color: var(--goa-color-greyscale-800);
  }

  .links {
    display: flex;
    flex-direction: column;
  }

  .links :global(::slotted(a)),
  .links :global(::slotted(goa-link)),
  .links :global(::slotted(goab-link)) {
    display: block;
  }

  .links :global(::slotted(a:not(:last-child))),
  .links :global(::slotted(goa-link:not(:last-child))),
  .links :global(::slotted(goab-link:not(:last-child))) {
    margin-bottom: var(--goa-space-m);
  }

  @media not (--mobile) {
    .title {
      font: var(--goa-typography-heading-m);
      letter-spacing: var(--goa-typography-heading-m-letter-spacing);
      padding-bottom: var(--goa-space-l);
    }
  }

  @media (--tablet) {
    .links {
      display: var(--narrow-display-type);
      column-count: var(--narrow-column-count);
    }
  }

  @media (--desktop) {
    .links {
      display: var(--wide-display-type);
      column-count: var(--wide-column-count);
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
  }
</style>
