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
  import { dispatch, style, styles } from "../../common/utils";
  import { DrawerPosition, DrawerSize } from "../../common/types";

  // ******
  // Public
  // ******

  export let open = false;
  export let position: DrawerPosition = undefined;
  export let heading: string = "";
  export let maxsize: DrawerSize = undefined; // is set based on the anchor value
  export let testid: string = "drawer";
  // *******
  // Private
  // *******

  // element refs
  let _contentEl: HTMLElement | null = null;
  let _scrollEl: HTMLElement | null = null;

  // computes the required absolute position offset to hide the drawer when not shown
  let _drawerSize: number;
  let _actionsHeight: number = 0;
  let _headerHeight: number = 0;
  let _actionsSlotHasContent: boolean = false;
  let _scrollableHeight: string = "";
  let _scrollPos: "top" | "middle" | "bottom" | null = "top"; // to add the box-shadow to the drawer content

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
    const edgeMargin = 16; // box shadow top and bottom

    if (position === "bottom") {
      return maxsize; // maxsize will be the height when drawer is in the bottom position
    }
    // Calculate available height by subtracting:
    // - header height
    // - actions height (if actions exist)
    // - edge margins
    return `calc(100vh - ${_headerHeight}px - ${_actionsSlotHasContent ? _actionsHeight : 0}px - ${edgeMargin}px)`;
  }

  // handle scroll event to set the scroll position in order to add the box-shadow to the drawer content depending on the scroll position
  function handleScroll(e: CustomEvent) {
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
        style("height", position === "bottom" ? "unset" : "100vh"),
        style("max-width", position === "bottom" ? "unset" : maxsize),
        style("width", position === "bottom" ? "100%" : maxsize),
      )}
      in:fly={_flyParams}
      out:fly={{ ..._flyParams, delay: 200 }}
      class:open={open}
      class:closing={!open}
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
            <goa-text size="heading-m" as="h3" mt="none" mb="none">{heading}</goa-text>
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
      <div data-testid="drawer-content" class="drawer-content">
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
    padding: var(--goa-space-l) var(--goa-space-l) var(--goa-space-s)
    var(--goa-space-l);
    justify-content: space-between;
    align-items: center;
  }

  /* Content styles */
  .drawer-content {
    box-shadow: none;
  }

  .scroll-content {
    padding: var(--goa-space-l) var(--goa-space-xl);
  }

  /* Actions styles */
  .drawer-actions {
    width: 100%;
    padding: var(--goa-space-l) var(--goa-space-xl) var(--goa-space-xl);
    border-top: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    background: var(--goa-color-greyscale-white);
  }

  .drawer-actions.empty-actions {
    padding: 0;
    border-top: none;
  }

  .drawer-close {
    padding-left: var(--goa-space-m);
    margin-top: var(--goa-space-2xs);
  }

  /* Position-specific styles */
  .drawer-bottom {
    bottom: var(--drawer-offset);
    width: 100%;
    height: 300px;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    transform: translateY(100%);
    box-shadow: var(--goa-drawer-bottom-shadow);
  }
  .drawer-open-bottom {
    bottom: 0;
  }

  /* Right */

  .drawer-right {
    right: var(--drawer-offset);
    height: 100%;
    transform: translateX(100%);
    box-shadow: var(--goa-drawer-right-shadow);
  }
  .drawer-open-right {
    right: 0;
  }

  /* Left */

  .drawer-left {
    left: var(--drawer-offset);
    height: 100%;
    box-shadow: var(--goa-drawer-left-shadow);
    transform: translateX(-100%);
  }
  .drawer-open-left {
    left: 0;
  }
</style>
