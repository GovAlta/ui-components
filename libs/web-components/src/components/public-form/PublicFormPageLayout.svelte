<svelte:options
  customElement={{
    tag: "goa-public-form-page-layout",
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";

  // ******
  // Public
  // ******

  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";

  /**
   * Max width of the centered content column, as a CSS length. The single knob
   * that governs the form's reading measure.
   */
  export let contentwidth: string = "640px";

  /**
   * Max width applied to a slotted goa-app-header that has not set its own
   * maxcontentwidth, so the header content lines up with the form without the
   * consumer restating the width. A header with an explicit maxContentWidth
   * always wins -- this only fills in the default.
   */
  export let headerwidth: string = "704px";

  // *******
  // Private
  // *******

  let _headerRegion: HTMLDivElement | null = null;

  // *****
  // Hooks
  // *****

  onMount(() => {
    const slot = _headerRegion?.querySelector("slot");
    if (!slot) return;
    // Apply now for a header already assigned, and again whenever the slotted
    // content changes -- the header mounts asynchronously via the framework wrapper.
    applyHeaderWidth();
    slot.addEventListener("slotchange", applyHeaderWidth);
  });

  // *********
  // Functions
  // *********

  function applyHeaderWidth() {
    const slot = _headerRegion?.querySelector("slot") as HTMLSlotElement | null;
    if (!slot) return;
    for (const assigned of slot.assignedElements({ flatten: true })) {
      const header = assigned.matches("goa-app-header")
        ? assigned
        : assigned.querySelector("goa-app-header");
      // Only fill in the default; never override a header that set its own width.
      if (header && !header.hasAttribute("maxcontentwidth")) {
        header.setAttribute("maxcontentwidth", headerwidth);
      }
    }
  }
</script>

<div class="layout" data-testid={testid || undefined}>
  {#if $$slots.header}
    <div class="region" bind:this={_headerRegion}><slot name="header" /></div>
  {/if}

  <main class="content">
    <div class="column" style="--goa-public-form-page-layout-content-width: {contentwidth}">
      <slot />
    </div>
  </main>

  {#if $$slots.footer}
    <div class="region"><slot name="footer" /></div>
  {/if}
</div>

<style>
  :host {
    display: block;
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  :host * {
    box-sizing: border-box;
  }

  /* Full-height column: header and footer hug their content, the main region
     grows so the footer sits at the bottom even on short pages. */
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .region {
    flex: 0 0 auto;
  }
  .content {
    flex: 1 1 auto;
  }

  /* The reading column: centered, capped at contentwidth, with the canonical
     public-form vertical rhythm and a side gutter on narrow viewports. */
  .column {
    max-width: var(--goa-public-form-page-layout-content-width, 640px);
    margin-inline: auto;
    padding-block: var(--goa-space-2xl) var(--goa-space-3xl);
    padding-inline: var(--goa-space-l);
  }
</style>
