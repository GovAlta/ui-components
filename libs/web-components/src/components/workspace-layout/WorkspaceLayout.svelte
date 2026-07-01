<svelte:options
  customElement={{
    tag: "goa-workspace-layout",
  }}
/>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { dispatch, relay, receive } from "../../common/utils";
  import { MOBILE_BP } from "../../common/breakpoints";
  import {
    WorkSideMenuBindMsg,
    type WorkSideMenuBindRelayDetail,
    WorkSideMenuOpenMsg,
    WorkSideMenuCloseMsg,
  } from "../../types/relay-types";

  // ******
  // Public
  // ******

  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";

  // *******
  // Private
  // *******

  type ScrollState = "no-scroll" | "at-top" | "middle" | "at-bottom";

  let _rootEl: HTMLElement;
  let _scrollEl: HTMLDivElement | null = null;
  let _scrollState: ScrollState = "no-scroll";
  let _isScrollable: boolean = false;
  let _animationFrame: number | null = null;
  let _resizeObserver: ResizeObserver | null = null;
  let _resizeDebounceId: ReturnType<typeof setTimeout> | null = null;
  let _windowWidth = 0;
  let _workSideMenuRef: HTMLElement | null = null;

  // Debounce ResizeObserver longer than the .card-container padding transition
  // (150ms) so state isn't recalculated mid-animation while clientHeight is
  // still shrinking — otherwise it would bounce across hysteresis boundaries.
  const RESIZE_DEBOUNCE_MS = 250;

  // When state "middle", scroll until <=5px from the edge → enter state "at-top" or "at-bottom"
  const EDGE_ENTER_THRESHOLD_PX = 5;
  // When state "at-top" or "at-bottom", scroll away from edge >30px → move back to "middle"
  const EDGE_EXIT_THRESHOLD_PX = 30;
  // To enter scrollable: content must overflow container by > 1px
  const SCROLLABLE_ENTER_OVERFLOW_PX = 1;
  // To exit scrollable: container must be >= content + 100px (negative overflow of 100)
  const SCROLLABLE_EXIT_OVERFLOW_PX = 100;

  // ========
  // Reactive
  // ========
  $: if (_rootEl) {
    dispatch(
      _rootEl,
      "_scrollStateChange",
      { state: _scrollState, isScrollable: _isScrollable },
      { bubbles: true },
    );
  }

  $: _isMobile = _windowWidth < MOBILE_BP;

  $: if (_isMobile && _workSideMenuRef) {
    relay(_workSideMenuRef, WorkSideMenuCloseMsg);
  }

  // *****
  // Hooks
  // *****

  onMount(() => {
    if (_scrollEl) {
      calculateScrollState();
      _resizeObserver = new ResizeObserver(() => {
        if (_resizeDebounceId) clearTimeout(_resizeDebounceId);
        _resizeDebounceId = setTimeout(() => {
          calculateScrollState();
          _resizeDebounceId = null;
        }, RESIZE_DEBOUNCE_MS);
      });
      _resizeObserver.observe(_scrollEl);
      for (let i = 0; i < _scrollEl.children.length; i++) {
        _resizeObserver.observe(_scrollEl.children[i]);
      }
    }

    receive(_rootEl, (action, data) => {
      if (action === WorkSideMenuBindMsg) {
        _workSideMenuRef = (data as WorkSideMenuBindRelayDetail).el;
      }
    });
  });

  onDestroy(() => {
    if (_animationFrame) cancelAnimationFrame(_animationFrame);
    if (_resizeDebounceId) clearTimeout(_resizeDebounceId);
    _resizeObserver?.disconnect();
  });

  // *********
  // Functions
  // *********

  function handleScroll() {
    if (_animationFrame) return;
    _animationFrame = requestAnimationFrame(() => {
      calculateScrollState();
      _animationFrame = null;
    });
  }

  function calculateScrollState() {
    if (!_scrollEl) return;

    const { scrollTop, scrollHeight, clientHeight } = _scrollEl;
    const overflow = scrollHeight - clientHeight;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (_isScrollable) {
      _isScrollable = overflow > -SCROLLABLE_EXIT_OVERFLOW_PX;
    } else {
      _isScrollable = overflow > SCROLLABLE_ENTER_OVERFLOW_PX;
    }

    const next = calculateTargetState(
      _scrollState,
      scrollTop,
      distanceFromBottom,
      overflow,
    );
    if (next !== _scrollState) _scrollState = next;
  }

  function calculateTargetState(
    prev: ScrollState,
    scrollTop: number,
    distanceFromBottom: number,
    overflow: number,
  ): ScrollState {
    if (prev === "no-scroll") {
      if (overflow <= SCROLLABLE_ENTER_OVERFLOW_PX) return "no-scroll";
      if (scrollTop <= EDGE_ENTER_THRESHOLD_PX) return "at-top";
      if (distanceFromBottom <= EDGE_ENTER_THRESHOLD_PX) return "at-bottom";
      return "middle";
    }

    if (overflow <= -SCROLLABLE_EXIT_OVERFLOW_PX) return "no-scroll";

    if (prev === "at-top") {
      return scrollTop > EDGE_EXIT_THRESHOLD_PX ? "middle" : "at-top";
    }
    if (prev === "at-bottom") {
      return distanceFromBottom > EDGE_EXIT_THRESHOLD_PX
        ? "middle"
        : "at-bottom";
    }
    // middle
    if (scrollTop <= EDGE_ENTER_THRESHOLD_PX) return "at-top";
    if (distanceFromBottom <= EDGE_ENTER_THRESHOLD_PX) return "at-bottom";
    return "middle";
  }

  // *********
  // Workspace Side Menu in mobile
  // *********

  // Hamburger → relay open to slotted WorkSideMenu. The side menu owns its
  // drawer state, slide-in animation, backdrop, ESC handling, and close logic.
  function openMobileSideMenu() {
    if (_workSideMenuRef) {
      relay(_workSideMenuRef, WorkSideMenuOpenMsg);
    }
  }
</script>

<svelte:window bind:innerWidth={_windowWidth} />

<div
  bind:this={_rootEl}
  class="shell"
  class:state-no-scroll={_scrollState === "no-scroll"}
  class:state-at-top={_scrollState === "at-top"}
  class:state-middle={_scrollState === "middle"}
  class:state-at-bottom={_scrollState === "at-bottom"}
  class:has-push-drawer={$$slots["push-drawer"]}
  class:mobile={_isMobile}
  data-testid={testid || undefined}
>
  {#if $$slots["side-menu"]}
    {#if _workSideMenuRef}
      <button
        type="button"
        class="mobile-menu-toggle"
        aria-label="Open menu"
        on:click={openMobileSideMenu}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    {/if}

    <aside class="side-menu" aria-label="Side navigation">
      <slot name="side-menu" />
    </aside>
  {/if}

  <div class="card-container">
    <div
      class="card"
      bind:this={_scrollEl}
      on:scroll={handleScroll}
      role="region"
      aria-label="Page content"
    >
      {#if $$slots["page-header"]}
        <header class="page-header">
          <slot name="page-header" />
        </header>
      {/if}

      <main class="content">
        <slot />
      </main>

      {#if $$slots["page-footer"]}
        <footer class="page-footer">
          <slot name="page-footer" />
        </footer>
      {/if}
    </div>
  </div>

  {#if $$slots["push-drawer"]}
    <aside class="push-drawer-region" aria-label="Push drawer">
      <slot name="push-drawer" />
    </aside>
  {/if}
</div>

<style>
  :host {
    display: block;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    background-color: var(
      --goa-workspace-layout-bg-color,
      var(--goa-color-greyscale-50)
    );
    isolation: isolate;
  }

  :host * {
    box-sizing: border-box;
  }

  .shell {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* Anchor for the absolutely-positioned mobile hamburger button. */
    position: relative;
  }

  /* ========================================================== */
  /* Mobile drawer (max-width: 623px)                           */
  /* ========================================================== */

  /* Hamburger button — hidden on desktop and while the mobile drawer is open. */
  .mobile-menu-toggle {
    display: none;
  }

  @media (--mobile) {
    .shell.mobile .mobile-menu-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: var(--goa-workspace-layout-mobile-toggle-top, var(--goa-space-l));
      left: var(--goa-workspace-layout-mobile-toggle-left, var(--goa-space-s));
      z-index: 110;
      width: var(
        --goa-workspace-layout-mobile-toggle-size,
        var(--goa-icon-size-xl)
      );
      height: var(
        --goa-workspace-layout-mobile-toggle-size,
        var(--goa-icon-size-xl)
      );
      padding: 0;
      border: none;
      border-radius: var(--goa-border-radius-s);
      background: transparent;
      color: var(
        --goa-workspace-layout-mobile-toggle-color,
        var(--goa-color-text-default)
      );
      cursor: pointer;
    }

    .shell.mobile .mobile-menu-toggle:hover {
      background: var(--goa-color-greyscale-100);
    }

    .shell.mobile .mobile-menu-toggle:focus-visible {
      outline: var(--goa-button-outline-offset, 2px) solid
        var(--goa-color-interactive-default);
      outline-offset: var(--goa-button-outline-offset, 2px);
    }

    .shell.mobile .page-header {
      padding-left: var(
        --goa-workspace-layout-mobile-header-padding-left,
        var(--goa-space-2xl)
      );
    }

    .shell.mobile .card-container {
      padding: 0;
    }

    .shell.mobile .card {
      border: none;
      border-radius: 0;
    }
  }

  .side-menu {
    flex: 0 0 auto;
  }

  :global(::slotted([slot="side-menu"])) {
    display: block;
    height: 100%;
  }

  .card-container {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: padding 0.15s ease-out;
  }

  /* Card — the actual scroll container */
  .card {
    background-color: var(
      --goa-workspace-layout-card-bg-color,
      var(--goa-color-greyscale-white)
    );
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    transition:
      border-radius 0.15s ease-out,
      border-color 0.15s ease-out;
  }

  @media (--not-mobile) {
    .shell.state-no-scroll .card-container {
      padding: var(--goa-space-m) var(--goa-space-m) var(--goa-space-m) 0;
    }
    .shell.state-no-scroll .card {
      border: var(--goa-border-width-s) solid var(--goa-color-greyscale-150);
      border-radius: var(--goa-border-radius-3xl);
    }

    .shell.state-at-top .card-container {
      padding: var(--goa-space-m) var(--goa-space-m) 0 0;
    }
    .shell.state-at-top .card {
      border: var(--goa-border-width-s) solid var(--goa-color-greyscale-150);
      border-bottom: none;
      border-radius: var(--goa-border-radius-3xl) var(--goa-border-radius-3xl) 0
        0;
    }

    /* Middle: side borders only */
    .shell.state-middle .card-container {
      padding: 0 var(--goa-space-m) 0 0;
    }
    .shell.state-middle .card {
      border-left: var(--goa-border-width-s) solid
        var(--goa-color-greyscale-150);
      border-right: var(--goa-border-width-s) solid
        var(--goa-color-greyscale-150);
      border-radius: 0;
    }

    .shell.state-at-bottom .card-container {
      padding: 0 var(--goa-space-m) var(--goa-space-m) 0;
    }
    .shell.state-at-bottom .card {
      border: var(--goa-border-width-s) solid var(--goa-color-greyscale-150);
      border-top: none;
      border-radius: 0 0 var(--goa-border-radius-3xl)
        var(--goa-border-radius-3xl);
    }
  }

  /* ========================================================== */
  /* Sticky header / footer                                     */
  /* ========================================================== */

  .page-header {
    position: sticky;
    top: 0;
    /* Sits above page content (e.g. a nested scroll panel at z-index 1) so
       content scrolls under the chrome. Overlays (drawer/modal) use far higher
       z-index and escape this layout's stacking, so they still sit on top. */
    z-index: 2;
    padding: var(--goa-space-m) var(--goa-space-l);
    background-color: var(
      --goa-workspace-layout-header-bg-color,
      var(--goa-color-greyscale-white)
    );
    border-bottom: var(--goa-border-width-2xs) solid transparent;
    flex: 0 0 auto;
    transition:
      box-shadow var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive),
      border-color var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive);
  }

  .page-footer {
    position: sticky;
    bottom: 0;
    z-index: 2;
    padding: var(--goa-space-m) var(--goa-space-l);
    background-color: var(
      --goa-workspace-layout-footer-bg-color,
      var(--goa-color-greyscale-white)
    );
    border-top: var(--goa-border-width-2xs) solid transparent;
    flex: 0 0 auto;
    transition:
      box-shadow var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive),
      border-color var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive);
  }

  /* Scroll cue: cast a soft shadow off the sticky page-header / page-footer
     when there is content scrolled behind it, so users know more content
     exists past the sticky edge.*/
  .shell.state-middle .page-header,
  .shell.state-at-bottom .page-header {
    border-bottom-color: var(
      --goa-workspace-layout-header-scroll-border-color,
      var(--goa-color-greyscale-200)
    );
    box-shadow: var(
      --goa-workspace-layout-header-scroll-shadow,
      var(--goa-shadow-shallow-below)
    );
  }

  .shell.state-at-top .page-footer,
  .shell.state-middle .page-footer {
    border-top-color: var(
      --goa-workspace-layout-footer-scroll-border-color,
      var(--goa-color-greyscale-200)
    );
    box-shadow: var(
      --goa-workspace-layout-footer-scroll-shadow,
      var(--goa-shadow-shallow-above)
    );
  }

  .content {
    flex: 1 1 auto;
  }

  /* ========================================================== */
  /* Push drawer region (sibling of .card-container in .shell)  */
  /* ========================================================== */

  .push-drawer-region {
    flex: 0 0 auto;
    display: flex;
    align-items: stretch;
  }

  /* When a push drawer is mounted, drop the right padding from the card
     container — the drawer's own floating-inset margin owns the visual gap. */
  @media (--not-mobile) {
    .shell.has-push-drawer.state-no-scroll .card-container,
    .shell.has-push-drawer.state-at-top .card-container,
    .shell.has-push-drawer.state-middle .card-container,
    .shell.has-push-drawer.state-at-bottom .card-container {
      padding-right: 0;
    }
  }
</style>
