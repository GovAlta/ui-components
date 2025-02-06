<svelte:options customElement="goa-container" />

<!-- Script -->
<script lang="ts">
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";
  import { ensureSlotExists, typeValidator } from "../../common/utils";
  import { onMount } from "svelte";

  // Validator
  const [Types, validateType] = typeValidator("Container type", [
    "interactive",
    "info",
    "error",
    "success",
    "important",
    "non-interactive",
  ]);
  const [Accents, validateAccent] = typeValidator("Container accent", [
    "thick",
    "thin",
    "filled",
  ]);
  const [Paddings, validatePadding] = typeValidator("Container padding", [
    "relaxed",
    "compact",
  ]);
  const [Widths, validateWidth] = typeValidator("Container width", [
    "full",
    "content",
  ]);

  // Types
  type Type = (typeof Types)[number];
  type Accent = (typeof Accents)[number];
  type Padding = (typeof Paddings)[number];
  type Width = (typeof Widths)[number];

  // Props

  export let type: Type = "interactive";
  export let accent: Accent = "filled";
  export let padding: Padding = "relaxed";
  export let width: Width = "full";
  export let maxwidth: string = "none";
  export let testid: string = "";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

  // Private

  let _contentEl: HTMLElement;

  // Hooks

  onMount(() => {
    validateType(type);
    validateAccent(accent);
    validatePadding(padding);
    validateWidth(width);

    ensureSlotExists(_contentEl);
  });
</script>

<!-- HTML -->

<div
  data-testid={testid}
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    max-width: ${maxwidth};
  `}
  class={`
    goa-container
    goa-container--${type}
    padding--${padding}
    accent--${accent}
    width--${width}
  `}
>
  <header class="heading--{accent}">
    {#if $$slots.title}
      <div class="title">
        <slot name="title" />
      </div>
    {/if}

    {#if $$slots.actions}
      <div class="actions">
        <slot name="actions" />
      </div>
    {/if}
  </header>
  <div bind:this={_contentEl} class="content">
  </div>
</div>

<!-- Style -->

<style>
  :host {
    display: flex;
    flex: 1 1 auto;
  }

  .goa-container {
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }

  .goa-container * {
    box-sizing: border-box;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--goa-container-heading-gap);
    font: var(--goa-container-heading);
    border: var(--goa-container-border);
    border-top-left-radius: var(--goa-container-border-radius);
    border-top-right-radius: var(--goa-container-border-radius);
  }

  .content {
    border-bottom: var(--goa-container-border);
    border-left: var(--goa-container-border);
    border-right: var(--goa-container-border);
    border-bottom-left-radius: var(--goa-container-border-radius);
    border-bottom-right-radius: var(--goa-container-border-radius);
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }

  .content :global(::slotted(*:last-child)) {
    margin-bottom: 0 !important;
  }

  .title,
  .actions {
    padding: var(--goa-container-heading-padding) 0;
  }

  .actions :global(::slotted(div)) {
    display: flex;
    align-items: center;
    gap: var(--goa-space-m);
  }

  /* Padding variants */

  .padding--relaxed header {
    padding: 0 var(--goa-container-padding);
  }
  .padding--relaxed .content {
    padding: var(--goa-container-padding);
  }

  .padding--compact header,
  .padding--compact .content {
    padding: 0 var(--goa-container-padding-compact);
  }
  .padding--compact header {
    padding: 0 var(--goa-container-padding-compact);
  }
  .padding--compact .content {
    padding: var(--goa-container-padding-compact);
  }

  /* Override padding in small screens to the compact value */
  @media (--mobile) {
    .padding--relaxed header {
      padding: 0 var(--goa-container-padding-compact);
    }
    .padding--relaxed .content {
      padding: var(--goa-container-padding-compact);
    }
  }

  /* Types */

  .goa-container--interactive header {
    background-color: var(--goa-container-interactive-heading-bg-color);
    border: var(--goa-container-interactive-border);
    color: var(--goa-container-interactive-heading-text-color);
  }

  .goa-container--non-interactive header {
    background-color: var(--goa-container-non-interactive-heading-bg-color);
    border: var(--goa-container-non-interactive-border);
    color: var(--goa-container-non-interactive-heading-text-color);
  }
  .goa-container--non-interactive.accent--filled .content {
    border: var(--goa-container-non-interactive-border);
    background-color: var(--goa-container-non-interactive-bg-color);
  }

  .goa-container--info header {
    background-color: var(--goa-container-info-heading-bg-color);
    border: var(--goa-container-info-border);
    color: var(--goa-container-info-heading-text-color);
  }
  .goa-container--info.accent--filled .content {
    border: var(--goa-container-info-border);
    background-color: var(--goa-container-info-bg-color);
  }

  .goa-container--error header {
    background-color: var(--goa-container-error-heading-bg-color);
    border: var(--goa-container-error-border);
    color: var(--goa-container-error-heading-text-color);
  }
  .goa-container--error.accent--filled .content {
    border: var(--goa-container-error-border);
    background-color: var(--goa-container-error-bg-color);
  }

  .goa-container--success header {
    background-color: var(--goa-container-success-heading-bg-color);
    border: var(--goa-container-success-border);
    color: var(--goa-container-success-heading-text-color);
  }
  .goa-container--success.accent--filled .content {
    border: var(--goa-container-success-border);
    background-color: var(--goa-container-success-bg-color);
  }

  .goa-container--important header {
    background-color: var(--goa-container-important-heading-bg-color);
    border: var(--goa-container-important-border);
    color: var(--goa-container-important-heading-text-color);
  }
  .goa-container--important.accent--filled .content {
    border: var(--goa-container-important-border);
    background-color: var(--goa-container-important-bg-color);
  }

  /* Sizes */
  .heading--thick {
    min-height: var(--goa-container-accent-thick-height);
  }

  .heading--thin {
    height: var(--goa-container-accent-thin-height);
  }

  .heading--filled {
    display: none;
  }
  .heading--filled ~ .content {
    border-top: var(--goa-container-border);
    border-top-left-radius: var(--goa-container-border-radius);
    border-top-right-radius: var(--goa-container-border-radius);
  }

  .heading--thin .title,
  .heading--thin .actions {
    display: none;
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .width--content {
    flex-grow: 0;
  }
</style>
