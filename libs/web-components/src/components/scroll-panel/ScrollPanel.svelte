<svelte:options
  customElement={{
    tag: "goa-scroll-panel",
  }}
/>

<script lang="ts">
  import { tick, onMount } from "svelte";
  import { relay } from "../../common/utils";
  import {
    ScrollPanelStateChangeMsg,
    type ScrollPanelStateChangeRelayDetail,
  } from "../../types/relay-types";

  // ******
  // Public
  // ******

  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /**
   * Sets the height of the container. Any valid CSS height value (e.g. "400px", "100%", "100vh").
   * Defaults to "100%". The parent element must establish a height context for "100%" to work.
   * The value is applied directly to the host element's style.
   */
  export let height: string = "100%";

  // *******
  // Private
  // *******

  type ScrollState = "no-scroll" | "at-top" | "middle" | "at-bottom";

  let _hostEl: HTMLElement | null = null;
  let _scrollEl: HTMLElement | null = null;
  let _scrollState: ScrollState = "no-scroll";
  let _isScrollable: boolean = false;

  // Once entered at-top/at-bottom, stay there until distance from the edge
  // exceeds this threshold. Prevents jitter at the boundary when the scroll
  // viewport is small or layout shifts near an edge by a few px.
  const EDGE_EXIT_THRESHOLD_PX = 20;

  // ========
  // Reactive
  // ========
  $: if (_scrollEl) {
    setHostHeight(height);
  }

  $: if (_hostEl) {
    relay<ScrollPanelStateChangeRelayDetail>(_hostEl, ScrollPanelStateChangeMsg, {
      state: _scrollState,
      isScrollable: _isScrollable,
    });
  }

  // *****
  // Hooks
  // *****
  onMount(() => {
    if (_scrollEl) {
      const root = _scrollEl.getRootNode();
      _hostEl = root instanceof ShadowRoot ? (root.host as HTMLElement) : null;
    }
    tick().then(() => updateScrollState());
  });

  // *********
  // Functions
  // *********
  function setHostHeight(h: string) {
    if (!_scrollEl) return;
    const root = _scrollEl.getRootNode();
    if (root instanceof ShadowRoot) {
      (root.host as HTMLElement).style.height = h;
    }
  }

  function calculateScrollState(
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number,
    prev: ScrollState,
  ): { state: ScrollState; isScrollable: boolean } {
    const isScrollable = scrollHeight > clientHeight;
    if (!isScrollable) return { state: "no-scroll", isScrollable: false };

    const distFromTop = scrollTop;
    const distFromBottom = scrollHeight - scrollTop - clientHeight;

    // Stay in current edge state until we've moved past the exit threshold
    if (prev === "at-top" && distFromTop < EDGE_EXIT_THRESHOLD_PX) {
      return { state: "at-top", isScrollable: true };
    }
    if (prev === "at-bottom" && distFromBottom < EDGE_EXIT_THRESHOLD_PX) {
      return { state: "at-bottom", isScrollable: true };
    }

    if (distFromTop < 1) return { state: "at-top", isScrollable: true };
    if (distFromBottom < 1) return { state: "at-bottom", isScrollable: true };
    return { state: "middle", isScrollable: true };
  }

  function applyScrollState(next: {
    state: ScrollState;
    isScrollable: boolean;
  }) {
    if (next.state !== _scrollState) _scrollState = next.state;
    if (next.isScrollable !== _isScrollable) _isScrollable = next.isScrollable;
  }

  function updateScrollState() {
    if (!_scrollEl) return;
    const { scrollTop, scrollHeight, clientHeight } = _scrollEl;
    applyScrollState(
      calculateScrollState(scrollTop, scrollHeight, clientHeight, _scrollState),
    );
  }

  function onScroll(e: Event) {
    const target = e.currentTarget as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    applyScrollState(
      calculateScrollState(scrollTop, scrollHeight, clientHeight, _scrollState),
    );
  }
</script>

{#if $$slots.header}
  <section
    class="scroll-panel-header"
    class:scroll-panel-header--shadow={_scrollState === "middle" ||
      _scrollState === "at-bottom"}
    aria-label="Panel header"
  >
    <slot name="header" />
  </section>
{/if}

<div
  class="scroll-panel-content"
  bind:this={_scrollEl}
  on:scroll={onScroll}
  role="region"
  aria-label="Scrollable content"
  data-testid={testid || undefined}
>
  <slot />
</div>

{#if $$slots.footer}
  <section
    class="scroll-panel-footer"
    class:scroll-panel-footer--shadow={_scrollState === "at-top" ||
      _scrollState === "middle"}
    aria-label="Panel footer"
  >
    <slot name="footer" />
  </section>
{/if}

<style>
  /* The host element IS the flex container — height is set on it via JS. */
  :host {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    width: 100%;
    background-color: var(
      --goa-scroll-panel-color-bg,
      var(--goa-color-greyscale-white)
    );
  }

  :host * {
    box-sizing: border-box;
  }

  /* Header — casts a drop shadow down onto the content when content is scrolled
     above it. Drop shadow (not inset) so it stays visible over slotted content
     that has its own opaque background (e.g. notification cards). */
  .scroll-panel-header {
    flex: 0 0 auto;
    background-color: var(
      --goa-scroll-panel-header-color-bg,
      var(--goa-color-greyscale-white)
    );
    border-bottom: var(--goa-border-width-2xs) solid transparent;
    z-index: 1;
    transition:
      box-shadow var(--goa-motion-duration-medium-1) var(--goa-motion-curve-expressive),
      border-color var(--goa-motion-duration-medium-1) var(--goa-motion-curve-expressive);
  }

  /* When content is scrolled under the header: a hairline border defines the edge
     crisply and an outset drop shadow falls below it for depth. A real border (not a
     second box-shadow layer) sits on top of the shadow instead of merging into it,
     and it's transparent at rest (see base rule) so it only shows when scrolled,
     with no layout shift. The shadow is the system shallow-below token; the host
     overflow:hidden clips any side bleed at the edge. */
  .scroll-panel-header--shadow {
    border-bottom-color: var(
      --goa-scroll-panel-header-scroll-border,
      var(--goa-color-greyscale-150)
    );
    box-shadow: var(
      --goa-scroll-panel-header-scroll-shadow,
      var(--goa-shadow-shallow-below)
    );
  }

  /* Scrollable content */
  .scroll-panel-content {
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    min-height: 0;
  }

  /* Footer — casts a drop shadow up onto the content when content is below it. */
  .scroll-panel-footer {
    flex: 0 0 auto;
    background-color: var(
      --goa-scroll-panel-footer-color-bg,
      var(--goa-color-greyscale-white)
    );
    border-top: var(--goa-border-width-2xs) solid transparent;
    z-index: 1;
    transition:
      box-shadow var(--goa-motion-duration-medium-1) var(--goa-motion-curve-expressive),
      border-color var(--goa-motion-duration-medium-1) var(--goa-motion-curve-expressive);
  }

  /* Mirror of the header cue: a hairline top border + soft shadow casting up
     onto the content above the footer. */
  .scroll-panel-footer--shadow {
    border-top-color: var(
      --goa-scroll-panel-footer-scroll-border,
      var(--goa-color-greyscale-150)
    );
    box-shadow: var(
      --goa-scroll-panel-footer-scroll-shadow,
      var(--goa-shadow-shallow-above)
    );
  }
</style>
