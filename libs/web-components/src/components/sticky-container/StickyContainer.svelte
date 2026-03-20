<svelte:options
  customElement={{
    tag: "goa-sticky-container",
  }}
/>

<script lang="ts">
  import { tick } from "svelte";

  // ******
  // Public
  // ******

  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /**
   * Sets the height of the container. Any valid CSS height value (e.g. "400px", "100%", "100vh").
   * Defaults to "100%". The parent element must establish a height context for "100%" to work.
   */
  export let height: string = "100%";

  // *******
  // Private
  // *******

  let _contentEl: HTMLElement | null = null;
  let _scrollPos: "top" | "middle" | "bottom" | null = null;

  // ========
  // Reactive
  // ========

  $: if (_contentEl) {
    tick().then(() => updateScrollPos());
  }

  // *********
  // Functions
  // *********

  function calculateScrollPos(
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number,
  ): "top" | "middle" | "bottom" | null {
    const hasScroll = scrollHeight > clientHeight;
    if (!hasScroll) return null;
    if (scrollTop < 1) return "top";
    if (Math.abs(scrollHeight - scrollTop - clientHeight) < 1) return "bottom";
    return "middle";
  }

  function updateScrollPos() {
    if (!_contentEl) return;
    const { scrollTop, scrollHeight, clientHeight } = _contentEl;
    _scrollPos = calculateScrollPos(scrollTop, scrollHeight, clientHeight);
  }

  function onScroll(e: Event) {
    const target = e.currentTarget as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    _scrollPos = calculateScrollPos(scrollTop, scrollHeight, clientHeight);
  }
</script>

<div
  class="sticky-container"
  style="height: {height};"
  data-testid={testid || undefined}
>
  {#if $$slots.header}
    <section
      class="sticky-header"
      class:sticky-header--bordered={_scrollPos === "middle" || _scrollPos === "bottom"}
      aria-label="Sticky header"
    >
      <slot name="header" />
    </section>
  {/if}

  <div
    class="sticky-content"
    class:sticky-content--shadow-bottom={_scrollPos === "top"}
    class:sticky-content--shadow-top={_scrollPos === "bottom"}
    class:sticky-content--shadow-both={_scrollPos === "middle"}
    bind:this={_contentEl}
    on:scroll={onScroll}
    role="region"
    aria-label="Scrollable content"
  >
    <slot />
  </div>

  {#if $$slots.footer}
    <section
      class="sticky-footer"
      class:sticky-footer--bordered={_scrollPos === "middle" || _scrollPos === "top"}
      aria-label="Sticky footer"
    >
      <slot name="footer" />
    </section>
  {/if}
</div>

<style>
  :host {
    display: flex;
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  :host * {
    box-sizing: border-box;
  }

  .sticky-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    background-color: var(--goa-sticky-container-bg-color, var(--goa-color-greyscale-white));
  }

  /* Header */
  .sticky-header {
    flex: 0 0 auto;
    background-color: var(--goa-sticky-container-header-bg-color, var(--goa-color-greyscale-white));
    border-bottom: var(--goa-border-width-s) solid transparent;
    transition: border-color 0.15s ease;
    z-index: 1;
  }

  .sticky-header--bordered {
    border-bottom-color: var(--goa-color-greyscale-200);
  }

  /* Scrollable content */
  .sticky-content {
    flex: 1 1 auto;
    overflow-y: auto;
    min-height: 0;
  }

  /* Scroll shadows on content area */
  .sticky-content--shadow-bottom {
    box-shadow: inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  }

  .sticky-content--shadow-top {
    box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3);
  }

  .sticky-content--shadow-both {
    box-shadow:
      inset 0 8px 8px -8px rgba(0, 0, 0, 0.2),
      inset 0 -8px 8px -8px rgba(0, 0, 0, 0.2);
  }

  /* Footer */
  .sticky-footer {
    flex: 0 0 auto;
    background-color: var(--goa-sticky-container-footer-bg-color, var(--goa-color-greyscale-white));
    border-top: var(--goa-border-width-s) solid transparent;
    transition: border-color 0.15s ease;
    z-index: 1;
  }

  .sticky-footer--bordered {
    border-top-color: var(--goa-color-greyscale-200);
  }
</style>
