<svelte:options customElement={{
  tag: "goa-drawer",
  props: {
    open: { type: "Boolean", reflect: true }
  }
}}/>

<script lang="ts">
  import { fly } from "svelte/transition";
  import noscroll from "../../common/no-scroll";
  import { onDestroy, onMount, tick } from "svelte";
  import { dispatch, style, styles, typeValidator } from "../../common/utils";
  import { DrawerPosition, DrawerSize } from "../../common/types";

  // ******
  // Public
  // ******

  export let open = false;
  export let position: DrawerPosition = undefined;
  export let heading: string = "";
  export let maxsize: DrawerSize = undefined; // is set based on the anchor value
  export let testid: string = "drawer";

  // version
  type VersionType = "1" | "2";
  const [Version, validateVersion] = typeValidator("Version", ["1", "2"]);
  export let version: VersionType = "1";

  // *******
  // Private
  // *******

  // element refs
  let _contentEl: HTMLElement | null = null;
  let _scrollEl: HTMLElement | null = null;
  let _drawerContentEl: HTMLElement | null = null; // V2: drawer-content element

  // computes the required absolute position offset to hide the drawer when not shown
  let _drawerSize: number;
  let _actionsHeight: number = 0;
  let _headerHeight: number = 0;
  let _actionsSlotHasContent: boolean = false;
  let _scrollableHeight: string = "";
  let _scrollPos: "top" | "middle" | "bottom" | null = "top"; // to add the box-shadow to the drawer content
  let _scrolledToBottom: boolean = false; // V2: tracks if scrolled to bottom for dynamic padding
  let _contentOverflows: boolean = false; // V2: tracks if content overflows (needs scrolling)
  let _scrolledFromTop: boolean = false; // V2: tracks if user has scrolled down from top

  // ========
  // Reactive
  // ========
  $: maxsize = maxsize || (position === "bottom" ? "80vh" : "320px");
  $: _flyParams = {
    duration: 200,
    x: position === "right" ? 200 : position === "left" ? -200 : 0,
    y: position === "bottom" ? 200 : 0,
  };

  // Add reactive statement for checking actions slot content (for class style and height calculations) and scroll position (for box-shadow)
  $: if (open) {
    checkActionsSlotContent();
    if (_scrollEl) {
      const hasScroll = _scrollEl.scrollHeight > _scrollEl.offsetHeight;
      _scrollPos = hasScroll ? "top" : null;
    }
  }

  // Add reactive statement for height calculations
  $: if (open && _contentEl) {
    updateHeights();
  }

  // V2: Check scroll state when drawer opens or content changes
  $: if (open && _drawerContentEl && version === "2") {
    tick().then(() => checkScrollState());
  }

  $: {
    if (!open) {
      setTimeout(() => {
        _contentEl?.classList.remove("open", "closing"); // to remove "open" class after drawer finishes closing (0.2s)
      }, 200);
    }
  }

  // *****
  // Hooks
  // *****

  onMount(async () => {
    await tick();
    validateVersion(version);

    if (position === "bottom") {
      _drawerSize = _contentEl?.getBoundingClientRect().height ?? 0;
    } else {
      _drawerSize = _contentEl?.getBoundingClientRect().width ?? 0;
    }

    // event listeners
    window.addEventListener("keydown", onInputKeyDown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", onInputKeyDown);
  });

  // *********
  // Functions
  // *********

  // to set the scrollable height
  function updateHeights() {
    const headerEl = _contentEl?.querySelector(".header");
    const actionsEl = _contentEl?.querySelector(".drawer-actions");

    _headerHeight = headerEl?.clientHeight ?? 0;
    _actionsHeight = actionsEl?.clientHeight ?? 0;
    _scrollableHeight = scrollableHeight();
  }

  async function checkActionsSlotContent() {
    await tick();
    _actionsSlotHasContent = !!$$slots.actions;
    // Trigger height recalculation after checking slot content
    updateHeights();
  }

  function close(e: Event) {
    if (open) {
      dispatch(_contentEl, "_close", {}, { bubbles: true });
    }
    e.stopPropagation();
  }

  const onInputKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        close(e);
        e.preventDefault();
        break;
    }
  };

  function scrollableHeight() {
    // V2 doesn't use goa-scrollable (drawer itself scrolls)
    if (version === "2") return "100%";

    const edgeMargin = 16; // box shadow top and bottom

    // V1: Calculate available height by subtracting:
    // - header height
    // - actions height (if actions exist)
    // - edge margins (for left/right) or drawer chrome (for bottom)
    if (position === "bottom") {
      return `calc(${maxsize} - ${_headerHeight}px - ${_actionsSlotHasContent ? _actionsHeight : 0}px)`;
    }
    return `calc(100vh - ${_headerHeight}px - ${_actionsSlotHasContent ? _actionsHeight : 0}px - ${edgeMargin}px)`;
  }

  // handle scroll event to set the scroll position in order to add the box-shadow to the drawer content depending on the scroll position
  function handleScroll(e: CustomEvent) {
    // V1 only - for scroll shadow indicators
    if (version !== "1") return;

    const hasScroll = e.detail.scrollHeight > e.detail.offsetHeight;
    if (!open || !hasScroll) return;

    // top
    if (e.detail.scrollTop == 0) {
      _scrollPos = "top";
    } else if (
      // bottom
      Math.abs(
        e.detail.scrollHeight - e.detail.scrollTop - e.detail.offsetHeight,
      ) < 1
    ) {
      _scrollPos = "bottom";
    } else {
      _scrollPos = "middle";
    }
  }

  // V2: Handle drawer scroll to determine bottom padding visibility
  function handleDrawerScroll(e: Event) {
    if (version !== "2") return;

    const drawer = e.target as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = drawer;

    // Check if content overflows viewport
    const contentOverflows = scrollHeight > clientHeight;
    _contentOverflows = contentOverflows;

    // Check if scrolled from top (content has moved behind header)
    const atTop = scrollTop < 1;
    _scrolledFromTop = !atTop;

    // Check if near bottom (within 20px for smoother transition)
    const nearBottom = scrollHeight - scrollTop - clientHeight < 20;

    // Show bottom padding when: content fits OR near bottom
    _scrolledToBottom = !contentOverflows || nearBottom;
  }

  // V2: Check scroll state for initial render and content changes
  function checkScrollState() {
    if (version !== "2") return;
    if (!_drawerContentEl || !open) return;

    const { scrollTop, scrollHeight, clientHeight} = _drawerContentEl;

    const contentOverflows = scrollHeight > clientHeight;
    _contentOverflows = contentOverflows;

    // Check if scrolled from top
    const atTop = scrollTop < 1;
    _scrolledFromTop = !atTop;

    // Check if near bottom (within 20px for smoother transition)
    const nearBottom = scrollHeight - scrollTop - clientHeight < 20;

    // Show bottom padding when: content fits OR near bottom
    _scrolledToBottom = !contentOverflows || nearBottom;
  }
</script>

<goa-focus-trap open={open}>
  <div
    class={`root ${_scrollPos ?? ""}`}
    style={style("visibility", open ? "visible" : "hidden")}
    data-testid={testid}
  >
    <button
      class="background"
      data-ignore-focus
      data-testid="background"
      on:click={close}
      tabindex="-1"
      class:active={open}
    />
    <div
      use:noscroll={{ enable: open }}
      style={styles(
        style("--drawer-offset", `-${_drawerSize}px`),
        style("height", position === "bottom" ? "unset" : undefined),
        style("max-width", position === "bottom" ? "unset" : (version === "2" ? `min(${maxsize}, calc(100vw - 2 * var(--goa-drawer-offset, 0)))` : `min(${maxsize}, 100vw)`)),
        style("width", position === "bottom" ? "100%" : (version === "2" ? `min(${maxsize}, calc(100vw - 2 * var(--goa-drawer-offset, 0)))` : `min(${maxsize}, 100vw)`)),
        style("max-height", position === "bottom" ? (version === "2" ? `min(${maxsize}, calc(100vh - 2 * var(--goa-drawer-offset, 0)))` : `min(${maxsize}, 100vh)`) : undefined),
      )}
      in:fly={_flyParams}
      out:fly={{ ..._flyParams, delay: 200 }}
      class:open={open}
      class:closing={!open}
      class:v2={version === "2"}
      class:scrolled-to-bottom={_scrolledToBottom}
      class:scrolled-from-top={_scrolledFromTop}
      class:content-overflows={_contentOverflows}
      class={`drawer drawer-${position}`}
      class:drawer-open-bottom={position === "bottom" && open}
      class:drawer-open-right={position === "right" && open}
      class:drawer-open-left={position === "left" && open}
      bind:this={_contentEl}
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      data-first-focus="true"
      aria-labelledby="goa-drawer-heading"
    >
      <!-- Header -->
      <div class="header" bind:clientHeight={_headerHeight} id="goa-drawer-heading">
        {#if heading || $$slots.heading}
          {#if heading}
            {#if version === "2"}
              <goa-text size="heading-s" as="h3" mt="2xs" mb="none">{heading}</goa-text>
            {:else}
              <goa-text size="heading-m" as="h3" mt="none" mb="none">{heading}</goa-text>
            {/if}
          {:else}
            <slot name="heading" />
          {/if}
        {/if}

        <goa-icon-button
          size="medium"
          data-ignore-focus="true"
          data-testid="drawer-close-button"
          arialabel="Close the drawer"
          variant="dark"
          icon="close"
          theme="filled"
          on:click={close}
        />
      </div>

      <!-- Content -->
      <div
        data-testid="drawer-content"
        class="drawer-content"
        on:scroll={version === "2" ? handleDrawerScroll : undefined}
        bind:this={_drawerContentEl}
      >
        {#if version === "1"}
          <goa-scrollable
            direction="vertical"
            maxheight={_scrollableHeight}
            on:_scroll={handleScroll}
            bind:this={_scrollEl}
          >
            <div class="scroll-content">
              <slot />
            </div>
          </goa-scrollable>
        {:else}
          <!-- V2: drawer-content scrolls, not the drawer -->
          <div class="scroll-content">
            <slot />
          </div>
        {/if}
      </div>

      <!-- Actions -->
      {#if $$slots.actions}
        <section
          class="drawer-actions"
          data-testid="drawer-actions"
          class:empty-actions={!_actionsSlotHasContent}
          bind:clientHeight={_actionsHeight}
        >
          <slot name="actions" />
        </section>
      {/if}
    </div>
  </div>
</goa-focus-trap>

<style>
  :host * {
    box-sizing: border-box;
  }

  .root {
    position: fixed;
    inset: 0;
    z-index: 998;
    transition: opacity 200ms ease-out;
  }

  /* Shadow styles for scrollable content */
  .root.top .drawer-content {
    box-shadow: inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  }

  .root.bottom .drawer-content {
    box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3);
  }

  .root.middle .drawer-content {
    box-shadow:
      inset 0 8px 8px -8px rgba(0, 0, 0, 0.2),
      inset 0 -8px 8px -8px rgba(0, 0, 0, 0.2);
  }

  /* V2: Remove scroll shadows (sticky elements provide visual feedback) */
  .root .drawer.v2 .drawer-content {
    box-shadow: none !important;
  }

  /* Background overlay */
  .background {
    position: fixed;
    inset: 0;
    z-index: 999;
    border: none;
    opacity: 0;
    transition: opacity 0.1s ease-out;
    pointer-events: none;
    background-color: var(--goa-drawer-overlay-color);
  }

  .background.active {
    pointer-events: auto;
    opacity: 1;
  }

  /* Drawer base styles */
  .drawer {
    font-family: var(--goa-font-family-sans);
    position: fixed;
    z-index: 9999;
    transition: transform 0.25s var(--goa-drawer-transition-time) ease-in-out;
    display: flex;
    flex-direction: column;
    background-color: var(--goa-color-greyscale-white);
  }

  .drawer.open {
    opacity: 1;
    transform: translate(0);
  }

  /* Header styles */
  .header {
    border-bottom: var(--goa-border-width-s) solid
    var(--goa-color-greyscale-200);
    display: flex;
    padding: var(--goa-space-l) var(--goa-space-l) var(--goa-space-s) var(--goa-space-l);
    /* Padding: 24px top/right/left, 12px bottom */
    justify-content: space-between;
    align-items: flex-start; /* Align to top instead of center */
  }

  /* V2: Header uses flexbox positioning (stays at top) */
  .v2.drawer-right .header,
  .v2.drawer-left .header,
  .v2.drawer-bottom .header {
    flex: 0 0 auto; /* Don't grow or shrink */
    gap: var(--goa-space-2xs); /* 4px gap between heading and close icon */
    background-color: var(--goa-color-greyscale-white);
    border-bottom: none; /* Remove border by default */
  }

  /* V2: Show header border only when scrolled from top (content actively behind header) */
  .v2.drawer-right.scrolled-from-top .header,
  .v2.drawer-left.scrolled-from-top .header,
  .v2.drawer-bottom.scrolled-from-top .header {
    border-bottom: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
  }

  /* Content styles */
  .drawer-content {
    box-shadow: none;
    flex: 0 1 auto; /* Don't grow, but can shrink - keeps actions below content */
    min-height: 0; /* Allow flexbox to shrink this element */
    overflow: hidden; /* Contain the scrollable content */
  }

  /* V2: drawer-content scrolls and takes remaining space */
  .v2.drawer-right .drawer-content,
  .v2.drawer-left .drawer-content,
  .v2.drawer-bottom .drawer-content {
    flex: 1 1 auto; /* Take remaining space */
    overflow-y: auto; /* Scroll here - scrollbar only on content */
  }

  .scroll-content {
    padding: var(--goa-drawer-content-padding-vertical, var(--goa-space-l)) var(--goa-drawer-content-padding-horizontal, var(--goa-space-xl));
  }

  /* Remove margin-top from first child in content to prevent double spacing */
  .scroll-content > :first-child {
    margin-top: 0;
  }

  /* Actions styles */
  .drawer-actions {
    width: 100%;
    padding: var(--goa-drawer-actions-padding-top, var(--goa-space-l)) var(--goa-drawer-content-padding-horizontal, var(--goa-space-xl)) var(--goa-drawer-actions-padding-bottom, var(--goa-space-xl));
    border-top: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    background: var(--goa-color-greyscale-white);
  }

  /* V2: Actions use flexbox positioning (stay at bottom) */
  .v2.drawer-right .drawer-actions,
  .v2.drawer-left .drawer-actions,
  .v2.drawer-bottom .drawer-actions {
    flex: 0 0 auto; /* Don't grow or shrink */
    background-color: var(--goa-color-greyscale-white);
    border-top: none; /* Remove border by default */
  }

  /* V2: Show actions border only when NOT at bottom (content actively behind actions) */
  .v2.drawer-right.content-overflows:not(.scrolled-to-bottom) .drawer-actions,
  .v2.drawer-left.content-overflows:not(.scrolled-to-bottom) .drawer-actions,
  .v2.drawer-bottom.content-overflows:not(.scrolled-to-bottom) .drawer-actions {
    border-top: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
  }

  /* V2: Bottom drawer actions rounded corners */
  .v2.drawer-bottom .drawer-actions {
    border-bottom-left-radius: var(--goa-drawer-border-radius, 24px);
    border-bottom-right-radius: var(--goa-drawer-border-radius, 24px);
  }

  .drawer-actions.empty-actions {
    padding: 0;
    border-top: none;
  }

  .drawer-close {
    padding-left: var(--goa-space-m);
    margin-top: var(--goa-space-2xs);
  }

  /* Bottom */

  .drawer-bottom {
    bottom: var(--drawer-offset);
    width: 100%;
    height: 300px;
    border-top-left-radius: var(--goa-drawer-border-radius, 0.5rem);
    border-top-right-radius: var(--goa-drawer-border-radius, 0.5rem);
    transform: translateY(100%);
    box-shadow: var(--goa-drawer-bottom-shadow);
  }

  .drawer-open-bottom {
    bottom: 0;
  }

  /* V2: Border radius + 16px offset from edges */
  .drawer-bottom.v2 {
    left: var(--goa-drawer-offset, 0);
    right: var(--goa-drawer-offset, 0);
    width: auto !important; /* Override base width: 100% */
    height: auto;
    overflow-y: hidden; /* No scroll on drawer itself */
    border-radius: var(--goa-drawer-border-radius, 24px); /* All corners 24px */
    box-shadow: var(--goa-drawer-shadow);
    transform: translateY(100%); /* Start off-screen at bottom */
    transition: transform 0.2s ease-out;
  }
  .drawer-bottom.v2.open,
  .drawer-bottom.v2.drawer-open-bottom {
    bottom: var(--goa-drawer-offset, 0);
    transform: translateY(0); /* Slide in */
  }

  /* Right */

  .drawer-right {
    right: var(--drawer-offset);
    height: auto; /* Content-driven height */
    min-height: 100vh; /* V1: Full height background */
    transform: translateX(100%);
    box-shadow: var(--goa-drawer-right-shadow);
  }

  .drawer-open-right {
    right: 0;
  }

  /* V2: Border radius + 16px offset from edges + content-driven height */
  .v2.drawer-right {
    right: var(--drawer-offset);
    top: var(--goa-drawer-offset, 0);
    /* No bottom positioning - allows height: auto to work naturally */
    height: auto;
    min-height: 0; /* Override V1 min-height */
    /* Max-height accounts for BOTH top and bottom margins (modal stays floating) */
    max-height: calc(100vh - 2 * var(--goa-drawer-offset, 0));
    overflow-y: hidden; /* No scroll on drawer itself */
    border-radius: var(--goa-drawer-border-radius, 24px);
    box-shadow: var(--goa-drawer-shadow);
    transform: translateX(100%); /* Start off-screen to the right */
    /* Smooth transitions for position and transform */
    transition: bottom 0.15s ease-out, transform 0.2s ease-out;
  }
  .v2.drawer-open-right {
    right: var(--goa-drawer-offset, 0);
    transform: translateX(0); /* Slide in */
  }

  /* V2: When content overflows AND scrolled to bottom, add bottom constraint to lift drawer up */
  .v2.drawer-right.content-overflows.scrolled-to-bottom {
    bottom: var(--goa-drawer-offset, 0);
  }

  /* Left */

  .drawer-left {
    left: var(--drawer-offset);
    height: auto; /* Content-driven height */
    min-height: 100vh; /* V1: Full height background */
    transform: translateX(-100%);
    box-shadow: var(--goa-drawer-left-shadow);
  }

  .drawer-open-left {
    left: 0;
  }

  /* V2: Border radius + 16px offset from edges + content-driven height */
  .v2.drawer-left {
    left: var(--drawer-offset);
    top: var(--goa-drawer-offset, 0);
    /* No bottom positioning - allows height: auto to work naturally */
    height: auto;
    min-height: 0; /* Override V1 min-height */
    /* Max-height accounts for BOTH top and bottom margins (modal stays floating) */
    max-height: calc(100vh - 2 * var(--goa-drawer-offset, 0));
    overflow-y: hidden; /* No scroll on drawer itself */
    border-radius: var(--goa-drawer-border-radius, 24px);
    box-shadow: var(--goa-drawer-shadow);
    transform: translateX(-100%); /* Start off-screen to the left */
    /* Smooth transitions for position and transform */
    transition: bottom 0.15s ease-out, transform 0.2s ease-out;
  }
  .v2.drawer-open-left {
    left: var(--goa-drawer-offset, 0);
    transform: translateX(0); /* Slide in */
  }

  /* V2: When content overflows AND scrolled to bottom, add bottom constraint to lift drawer up */
  .v2.drawer-left.content-overflows.scrolled-to-bottom {
    bottom: var(--goa-drawer-offset, 0);
  }
</style>
