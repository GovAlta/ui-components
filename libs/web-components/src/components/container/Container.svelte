<svelte:options
  customElement={{
    tag: "goa-container",
    props: {
      maxWidth: { type: "String", attribute: "maxwidth" },
      minHeight: { type: "String", attribute: "minheight" },
      maxHeight: { type: "String", attribute: "maxheight" },
      stickyHeader: { type: "Boolean", attribute: "stickyheader" },
    },
  }}
/>

<!-- Script -->
<script lang="ts">
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";
  import { ensureSlotExists, typeValidator } from "../../common/utils";
  import { onMount, onDestroy } from "svelte";

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
  /** Sets the container and accent bar styling. */
  export let type: Type = "interactive";
  /** Sets the style of accent on the container. */
  export let accent: Accent = "filled";
  /** Sets the amount of white space in the container. */
  export let padding: Padding = "relaxed";
  /** Sets the width of the container. */
  export let width: Width = "full";
  /** Sets the maximum width of the container. */
  export let maxWidth: string = "none";
  /** Sets the minimum height of the container. */
  export let minHeight = "";
  /** Sets the maximum height of the container. */
  export let maxHeight = "";
  /** When true, keeps the header visible when the container content scrolls. */
  export let stickyHeader: boolean = false;
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = "m";
  /** Left margin. */
  export let ml: Spacing = null;

  // Private

  let _contentEl: HTMLElement;
  let _scrollPos: "top" | "middle" | "bottom" | null = null;

  function handleContentScroll() {
    if (!_contentEl) return;
    const { scrollTop, scrollHeight, clientHeight } = _contentEl;
    const hasScroll = scrollHeight > clientHeight;
    if (!hasScroll) {
      _scrollPos = null;
      return;
    }
    if (scrollTop < 1) {
      _scrollPos = "top";
    } else if (Math.abs(scrollHeight - scrollTop - clientHeight) < 1) {
      _scrollPos = "bottom";
    } else {
      _scrollPos = "middle";
    }
  }

  // Hooks

  onMount(() => {
    validateType(type);
    validateAccent(accent);
    validatePadding(padding);
    validateWidth(width);

    ensureSlotExists(_contentEl);

    if (stickyHeader) {
      _contentEl.addEventListener("scroll", handleContentScroll);
      const hasScroll = _contentEl.scrollHeight > _contentEl.clientHeight;
      _scrollPos = hasScroll ? "top" : null;
    }
  });

  onDestroy(() => {
    if (stickyHeader) {
      _contentEl?.removeEventListener("scroll", handleContentScroll);
    }
  });
</script>

<!-- HTML -->

<div
  data-testid={testid}
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    max-width: ${maxWidth};
    ${minHeight ? `min-height: ${minHeight};` : ""}
    ${maxHeight ? `max-height: ${maxHeight};` : ""}
  `}
  class={`
    goa-container
    goa-container--${type}
    padding--${padding}
    accent--${accent}
    width--${width}
    ${_scrollPos === "middle" || _scrollPos === "bottom" ? "scrolled" : ""}
  `}
>
  <header class="heading--{accent}" class:sticky={stickyHeader}>
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
  <div bind:this={_contentEl} class="content"></div>
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
    box-shadow: var(--goa-container-shadow, none);
    border-radius: var(--goa-container-border-radius, 0);
    align-self: flex-start;
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
    flex-shrink: 0;
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
    min-height: 0;
    overflow-y: auto;
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

  /* Sticky header */
  header.sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .scrolled header.sticky {
    box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.2);
  }
</style>
