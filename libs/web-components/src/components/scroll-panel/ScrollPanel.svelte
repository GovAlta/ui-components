<svelte:options
  customElement={{
    tag: "goa-scroll-panel",
  }}
/>

<script lang="ts">
  import { tick, onMount, onDestroy } from "svelte";
  import { relay, typeValidator } from "../../common/utils";
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
   * Sets the height of the container. Accepts any valid CSS height value,
   * including calc()/min()/clamp() and viewport units (e.g. "400px", "100%",
   * "100vh", "calc(100vh - 4rem)"). Invalid values fall back to "100%".
   * Defaults to "100%". The parent element must establish a height context for
   * "100%" to resolve.
   */
  export let height: string = "100%";

  /** @internal Sets a maximum height while allowing the panel to remain content-sized. */
  export let maxheight: string = "";

  /**
   * The scroll direction(s). When content overflows, enables scrolling and shadow
   * indicators for the specified direction(s). Defaults to "vertical".
   */
  export let direction: "vertical" | "horizontal" | "both" = "vertical";

  // *******
  // Private
  // *******

  // Validators
  const [, validateDirection] = typeValidator("Scroll panel direction", [
    "vertical",
    "horizontal",
    "both",
  ]);
  $: validateDirection(direction);
  $: if (_hostEl) setHostSizing(height, maxheight);

  // Internal edge state, shared by both axes. "at-start" is top/left,
  // "at-end" is bottom/right depending on the axis.
  type EdgeState = "no-scroll" | "at-start" | "middle" | "at-end";

  // The public relay contract stays vertical-friendly, so map the internal
  // vertical edge state to the emitted relay state values.
  type RelayVerticalState = "no-scroll" | "at-top" | "middle" | "at-bottom";
  const V_EDGE_TO_RELAY_STATE: Record<EdgeState, RelayVerticalState> = {
    "no-scroll": "no-scroll",
    "at-start": "at-top",
    middle: "middle",
    "at-end": "at-bottom",
  };

  let _hostEl: HTMLElement | null = null;
  let _scrollWrapperEl: HTMLElement | null = null;
  let _scrollEl: HTMLElement | null = null;
  let _isMaxHeightConstrained = false;
  let _scrollStateV: EdgeState = "no-scroll";
  let _scrollStateH: EdgeState = "no-scroll";
  let _isVerticalScrollable: boolean = false;
  let _isHorizontallyScrollable: boolean = false;
  let _resizeObserver: ResizeObserver | null = null;

  // Derived: which directions are enabled based on the direction prop
  $: _trackVertical = direction === "vertical" || direction === "both";
  $: _trackHorizontal = direction === "horizontal" || direction === "both";

  // Once entered at-start/at-end, stay there until distance from the edge
  // exceeds this threshold. Prevents jitter at the boundary when the scroll
  // viewport is small or layout shifts near an edge by a few px. Applies to
  // both axes.
  const EDGE_EXIT_THRESHOLD_PX = 20;

  // ========
  // Reactive
  // ========
  $: if (_hostEl) {
    relay<ScrollPanelStateChangeRelayDetail>(
      _hostEl,
      ScrollPanelStateChangeMsg,
      {
        verticalState: V_EDGE_TO_RELAY_STATE[_scrollStateV],
        isScrollable: _isVerticalScrollable,
      },
    );
  }

  // *****
  // Hooks
  // *****
  onMount(() => {
    if (!supportsHeight(height)) {
      console.error(
        `ScrollPanel: "${height}" is not a valid CSS height. Falling back to "100%".`,
      );
      height = "100%";
    }

    if (_scrollEl) {
      const root = _scrollEl.getRootNode();
      _hostEl = root instanceof ShadowRoot ? (root.host as HTMLElement) : null;
      setHostSizing(height, maxheight);

      // Re-measure when the viewport resizes, including when it goes from
      // hidden (height 0) to visible — e.g. a push drawer toggled via display.
      _resizeObserver = new ResizeObserver(() => updateScrollState());
      _resizeObserver.observe(_scrollEl);
      if (_scrollWrapperEl) _resizeObserver.observe(_scrollWrapperEl);
    }
    tick().then(() => updateScrollState());
  });

  onDestroy(() => {
    _resizeObserver?.disconnect();
  });

  // *********
  // Functions
  // *********
  function supportsHeight(value: string) {
    return (
      typeof CSS === "undefined" ||
      typeof CSS.supports !== "function" ||
      CSS.supports("height", value)
    );
  }

  function setHostSizing(panelHeight: string, panelMaxHeight: string) {
    if (!_hostEl) return;

    _hostEl.style.height =
      panelMaxHeight && panelHeight === "100%"
        ? _isMaxHeightConstrained
          ? panelMaxHeight
          : "auto"
        : panelHeight;
    _hostEl.style.maxHeight = panelMaxHeight;
  }

  function calculateScrollState(
    scrollPos: number,
    scrollSize: number,
    clientSize: number,
    prev: EdgeState,
  ): { state: EdgeState; isScrollable: boolean } {
    const isScrollable = scrollSize > clientSize;
    if (!isScrollable) return { state: "no-scroll", isScrollable: false };

    const distFromStart = scrollPos;
    const distFromEnd = scrollSize - scrollPos - clientSize;

    // Stay in current edge state until we've moved past the exit threshold
    if (prev === "at-start" && distFromStart < EDGE_EXIT_THRESHOLD_PX) {
      return { state: "at-start", isScrollable: true };
    }
    if (prev === "at-end" && distFromEnd < EDGE_EXIT_THRESHOLD_PX) {
      return { state: "at-end", isScrollable: true };
    }

    if (distFromStart < 1) return { state: "at-start", isScrollable: true };
    if (distFromEnd < 1) return { state: "at-end", isScrollable: true };
    return { state: "middle", isScrollable: true };
  }

  function applyScrollState(
    nextV: { state: EdgeState; isScrollable: boolean },
    nextH: { state: EdgeState; isScrollable: boolean },
  ) {
    if (nextV.state !== _scrollStateV) _scrollStateV = nextV.state;
    if (nextV.isScrollable !== _isVerticalScrollable) {
      _isVerticalScrollable = nextV.isScrollable;
    }
    if (nextH.state !== _scrollStateH) _scrollStateH = nextH.state;
    if (nextH.isScrollable !== _isHorizontallyScrollable) {
      _isHorizontallyScrollable = nextH.isScrollable;
    }
  }

  function updateScrollState() {
    if (!_scrollEl) return;

    const isMaxHeightConstrained = Boolean(
      maxheight &&
      _scrollWrapperEl &&
      _scrollEl.scrollHeight > _scrollWrapperEl.clientHeight + 1,
    );
    if (isMaxHeightConstrained !== _isMaxHeightConstrained) {
      _isMaxHeightConstrained = isMaxHeightConstrained;
      setHostSizing(height, maxheight);
      tick().then(() => updateScrollState());
      return;
    }

    const {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = _scrollEl;

    const resultV = _trackVertical
      ? calculateScrollState(
          scrollTop,
          scrollHeight,
          clientHeight,
          _scrollStateV,
        )
      : { state: "no-scroll" as EdgeState, isScrollable: false };

    const resultH = _trackHorizontal
      ? calculateScrollState(
          scrollLeft,
          scrollWidth,
          clientWidth,
          _scrollStateH,
        )
      : { state: "no-scroll" as EdgeState, isScrollable: false };

    applyScrollState(resultV, resultH);
  }
</script>

{#if $$slots.header}
  <section
    class="scroll-panel-header"
    class:scroll-panel-header--shadow={_scrollStateV === "middle" ||
      _scrollStateV === "at-end"}
    aria-label="Panel header"
  >
    <slot name="header" />
  </section>
{/if}

<div
  class="scroll-panel-scroll-wrapper"
  class:scroll-panel-scroll-wrapper--shadow-left={_trackHorizontal &&
    _isHorizontallyScrollable &&
    _scrollStateH !== "at-start"}
  class:scroll-panel-scroll-wrapper--shadow-right={_trackHorizontal &&
    _isHorizontallyScrollable &&
    _scrollStateH !== "at-end"}
  bind:this={_scrollWrapperEl}
>
  <div
    class="scroll-panel-scroll-container"
    class:scroll-panel-scroll-container--vertical={_trackVertical}
    class:scroll-panel-scroll-container--horizontal={_trackHorizontal}
    bind:this={_scrollEl}
    on:scroll={updateScrollState}
    role="region"
    aria-label="Scrollable content"
    tabindex={_trackVertical ? 0 : undefined}
    data-testid={testid || undefined}
  >
    <slot />
  </div>
</div>

{#if $$slots.footer}
  <section
    class="scroll-panel-footer"
    class:scroll-panel-footer--shadow={_scrollStateV === "at-start" ||
      _scrollStateV === "middle"}
    aria-label="Panel footer"
  >
    <slot name="footer" />
  </section>
{/if}

<style>
  /* The host is the grid container; height is set on it via JS. */
  :host {
    display: grid;
    grid-template-areas:
      "header"
      "body"
      "footer";
    grid-template-rows: auto minmax(0, 1fr) auto;
    overflow: hidden;
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    width: 100%;
    /* Fallback height. JS sets an explicit inline height from the `height` prop */
    height: 100%;
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
    grid-area: header;
    background-color: var(
      --goa-scroll-panel-header-color-bg,
      var(--goa-color-greyscale-white)
    );
    border-bottom: var(--goa-border-width-2xs) solid transparent;
    z-index: 1;
    transition:
      box-shadow var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive),
      border-color var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive);
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
  .scroll-panel-scroll-wrapper {
    grid-area: body;
    position: relative;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  .scroll-panel-scroll-container {
    overflow-y: hidden;
    overflow-x: hidden;
    /* Let scroll chain to a scrollable ancestor (e.g. the workspace-layout card) once this panel reaches its own edge */
    overscroll-behavior: auto;
    min-height: 0;
    min-width: 0;
    height: 100%;
    width: 100%;
  }

  .scroll-panel-scroll-container--vertical {
    overflow-y: auto;
    overflow-x: visible;
  }

  .scroll-panel-scroll-container--horizontal {
    overflow-x: auto;
    overflow-y: visible;
  }

  .scroll-panel-scroll-wrapper::before,
  .scroll-panel-scroll-wrapper::after {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: opacity var(--goa-motion-duration-medium-1)
      var(--goa-motion-curve-expressive);
  }

  .scroll-panel-scroll-wrapper::before {
    left: 0;
    width: 10px;
    background: linear-gradient(
      to right,
      var(--goa-scroll-panel-content-shadow-horizontal, rgba(0, 0, 0, 0.1)),
      transparent
    );
  }

  .scroll-panel-scroll-wrapper::after {
    right: 0;
    width: 10px;
    background: linear-gradient(
      to left,
      var(--goa-scroll-panel-content-shadow-horizontal, rgba(0, 0, 0, 0.1)),
      transparent
    );
  }

  .scroll-panel-scroll-wrapper--shadow-left::before {
    opacity: 1;
  }

  .scroll-panel-scroll-wrapper--shadow-right::after {
    opacity: 1;
  }

  /* Footer — casts a drop shadow up onto the content when content is below it. */
  .scroll-panel-footer {
    grid-area: footer;
    background-color: var(
      --goa-scroll-panel-footer-color-bg,
      var(--goa-color-greyscale-white)
    );
    border-top: var(--goa-border-width-2xs) solid transparent;
    z-index: 1;
    transition:
      box-shadow var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive),
      border-color var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive);
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
