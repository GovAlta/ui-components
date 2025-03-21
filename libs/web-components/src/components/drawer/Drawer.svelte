<svelte:options customElement="goa-drawer" />

<script lang="ts">
  import { fly } from "svelte/transition";
  import noscroll from "../../common/no-scroll";
  import { onDestroy, onMount, tick } from "svelte";
  import { dispatch, style, styles, toBoolean } from "../../common/utils";
  import { DrawerPosition, DrawerSize } from "../../common/types";

  // ******
  // Public
  // ******

  export let open: string = "false";
  export let position: DrawerPosition = undefined;
  export let heading: string = "";
  export let maxsize: DrawerSize = undefined; // is set based on the anchor value

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
  let _scrollableHeight: string = '';
  let _scrollPos: "top" | "middle" | "bottom" | null = "top"; // to add the box-shadow to the drawer content
  // ========
  // Reactive
  // ========

  $: maxsize = maxsize || (position === "bottom" ? "80vh" : "320px");
  $: _isOpen = toBoolean(open);
  $: _flyParams = {
    duration: 200,
    x: position === 'right' ? 200 : position === 'left' ? -200 : 0,
    y: position === 'bottom' ? 200 : 0
  };
  $: if (_isOpen) {
    checkActionsSlotContent();
    if (_scrollEl) {
      const hasScroll = _scrollEl.scrollHeight > _scrollEl.offsetHeight;
      _scrollPos = hasScroll ? "top": null;
    }
  }

  // Add reactive statement for height calculations
  $: if (_isOpen && _contentEl) {
    updateHeights();
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

  async function updateHeights() {
    await tick();
    const headerEl = _contentEl?.querySelector('.topbar');
    const actionsEl = _contentEl?.querySelector('.drawer-actions');

    _headerHeight = headerEl?.clientHeight ?? 0;
    _actionsHeight = actionsEl?.clientHeight ?? 0;
    _scrollableHeight = scrollableHeight();
  }

  async function checkActionsSlotContent() {
    await tick();
    _actionsSlotHasContent = !!$$slots.actions;
    // Trigger height recalculation after checking slot content
    await updateHeights();
  }

  function close(e: Event) {
    if (_isOpen) {
      dispatch(_contentEl, "_close", {}, { bubbles: true })
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
    const edgeMargin = 16;

    if (position === "bottom") {
      return maxsize;
    }
    // Calculate available height by subtracting:
    // - header height
    // - actions height (if actions exist)
    // - edge margins
    return `calc(100vh - ${_headerHeight}px - ${_actionsSlotHasContent ? _actionsHeight : 0}px - ${edgeMargin}px)`;
  }

  function handleScroll(e: CustomEvent) {
    const hasScroll = e.detail.scrollHeight > e.detail.offsetHeight;
    if (!_isOpen || !hasScroll) return;

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

{#if _isOpen}
  <goa-focus-trap open={_isOpen}>
    <div
    class={`root ${_scrollPos ?? ""}`}
    style={style("visibility", _isOpen ? "visible" : "hidden")}
    data-testid="drawer">
      <button
      class="background"
      data-testid="background"
      on:click={close}
      style={style("opacity", _isOpen ? "1" : "0")}
    />
    <div
      use:noscroll={{ enable: _isOpen }}
      style={styles(
        style("--drawer-offset", `-${_drawerSize}px`),
        style("height", position === "bottom" ? "unset" : "100vh"),
        style("max-width", position === "bottom" ? "unset" : maxsize),
        style("width", position === "bottom" ? "100%" : maxsize),
      )}
      in:fly={_flyParams}
      out:fly={{..._flyParams, delay: 200}}
      class={`drawer drawer-${position}`}
      class:drawer-open-bottom={position === "bottom" && _isOpen}
      class:drawer-open-right={position === "right" && _isOpen}
      class:drawer-open-left={position === "left" && _isOpen}
      bind:this={_contentEl}
    >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="topbar" bind:clientHeight={_headerHeight}>
        {#if heading}
          <goa-text size="heading-m" as="h3" mb="none">{heading}</goa-text>
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

    <div data-testid="drawer-content" class="drawer-content">
      <goa-scrollable direction="vertical" maxheight={_scrollableHeight} on:_scroll={handleScroll} bind:this={_scrollEl}>
        <div class="scroll-content">
          <slot />
        </div>
      </goa-scrollable>
    </div>

    {#if $$slots.actions}
      <section class="drawer-actions"
       data-testid="drawer-actions"
       class:empty-actions={!_actionsSlotHasContent}
       bind:clientHeight={_actionsHeight}>
        <slot name="actions" />
      </section>
    {/if}
  </div>
    </div>
  </goa-focus-trap>
{/if}

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
  /* Add shadow styles for scrollable content */
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

  .background {
    position: fixed;
    inset: 0;
    z-index: 999;
    border: none;
    background-color: var(--goa-drawer-overlay-color);
  }

  .drawer {
    font-family: var(--goa-font-family-sans);
    position: fixed;
    z-index: 9999;
    /* transition: transform 0.25s ease-in-out; */
    /* transition: all var(--goa-drawer-transition-time) ease-out; TODO: update token value */
    display: flex;
    flex-direction: column;
    background-color: var(--goa-color-greyscale-white);
  }

  .topbar {
    border-bottom: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    display: flex;
    padding: var(--goa-space-l) var(--goa-space-l) var(--goa-space-s) var(--goa-space-l);
    justify-content: space-between;
    align-items: center;
  }

  .drawer-content {
    flex: 1 1 auto;
    box-shadow: none;
  }

  .scroll-content {
    padding: var(--goa-space-l) var(--goa-space-xl);
  }

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

  /* Bottom */

  .drawer-bottom {
    bottom: var(--drawer-offset);
    width: 100%;
    height: 300px;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    /* box-shadow: var(--goa-drawer-bottom-shadow); TODO: update token value */
    box-shadow: 0px -6px 6px 0px rgba(0, 0, 0, 0.16);
  }
  .drawer-open-bottom {
    bottom: 0;
  }

  /* Right */

  .drawer-right {
    right: var(--drawer-offset);
    height: 100%;
    /* box-shadow: var(--goa-drawer-right-shadow); TODO: update token value */
    box-shadow: -6px 0px 6px 0px rgba(0, 0, 0, 0.16);
  }
  .drawer-open-right {
    right: 0;
  }

  /* Left */

  .drawer-left {
    left: var(--drawer-offset);
    height: 100%;
    /* box-shadow: var(--goa-drawer-left-shadow); TODO: update token value */
    box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.16);
  }
  .drawer-open-left {
    left: 0;
  }
</style>
