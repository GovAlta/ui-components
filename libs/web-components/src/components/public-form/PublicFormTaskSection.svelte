<svelte:options
  customElement={{
    tag: "goa-public-form-task-section",
  }}
/>

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";

  // ******
  // Public
  // ******
  export let heading: string = "";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
</script>

<section class="card" style={calculateMargin(mt, mr, mb, ml)} data-testid={testid || undefined}>
  {#if heading}
    <div class="heading">
      <goa-text as="h2" mt="none" mb="s">{heading}</goa-text>
    </div>
  {/if}
  <slot />
</section>

<style>
  :host {
    display: block;
    box-sizing: border-box;
  }

  /* Vertical padding only, and overflow hidden so a full-bleed row's hover
     background is clipped to the rounded corners. The horizontal inset lives on
     the heading and inside each task item (both use --goa-space-xl) so their
     content lines up while the rows still span edge to edge. */
  .card {
    border: var(--goa-border-width-s, 1px) solid var(--goa-color-greyscale-200);
    border-radius: var(--goa-border-radius-xl);
    padding-block: var(--goa-space-l);
    overflow: hidden;
  }

  .heading {
    padding-inline: var(--goa-space-xl);
  }

  /* Divider between rows (not before the first): a section-level concern, so the
     item itself carries no border. */
  ::slotted(goa-public-form-task-item:not(:first-child)) {
    border-top: var(--goa-border-width-s, 1px) solid var(--goa-color-greyscale-100);
  }
</style>
