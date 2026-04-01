<svelte:options
  customElement={{
    tag: "goa-push-drawer-internal",
    props: {
      testid: { type: "String", attribute: "testid", reflect: true },
      open: { type: "Boolean", reflect: true },
      heading: { type: "String", reflect: true },
      width: { type: "String", reflect: true },
      version: { type: "String", attribute: "version", reflect: true },
    },
  }}
/>

<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { dispatch, typeValidator } from "../../common/utils";

  type DrawerState = "initial" | "open" | "closed" | "closing";
  type VersionType = "1" | "2";

  const [Version, validateVersion] = typeValidator("Version", ["1", "2"]);

  export let testid: string | undefined = undefined;
  export let open: boolean = false;
  export let heading: string = "";
  export let width: string = "492px";
  /** @internal Design system version for styling. */
  export let version: VersionType = "1";

  let _contentEl: HTMLElement | null = null;
  let drawerState: DrawerState = "initial";
  let closingTimeout: number | null = null;
  let _scrollPos: "top" | "middle" | "bottom" | null = null;
  let _actionsSlotHasContent: boolean = false;

  $: if (open && drawerState !== "open") {
    drawerState = "open";
  } else if (!open && drawerState === "open") {
    drawerState = "closing";

    closingTimeout = setTimeout(() => {
      drawerState = "closed";
      closingTimeout = null;
    }, 250);
  } else if (open && closingTimeout) {
    // In case the drawer closing animation got interrupted
    clearTimeout(closingTimeout);
    closingTimeout = null;
    drawerState = "open";
  }

  onMount(() => {
    validateVersion(version);
    drawerState = open ? "open" : "closed";
    if (width.endsWith("%")) {
      console.error(
        "PushDrawer does not support percentage widths. Please use a fixed width instead.",
      );
    }
  });

  onDestroy(() => {
    if (closingTimeout) {
      clearTimeout(closingTimeout);
    }
  });

  const close = (e: Event) => {
    if (open) {
      dispatch(_contentEl, "_close", {}, { bubbles: true });
    }

    e.stopPropagation();
  };

  // Scrolling ---
  function checkActionsSlotContent() {
    // Use requestAnimationFrame to let slot content distribute first
    requestAnimationFrame(() => {
      const actionsSlot = _contentEl?.querySelector(
        'slot[name="actions"]',
      ) as HTMLSlotElement | null;
      if (actionsSlot) {
        // Check if any assigned element has children (the actual actions).
        // PushDrawer.svelte always sends a <span> wrapper, so we check
        // if that span has children beyond its own empty <slot> element.
        const assigned = actionsSlot.assignedElements();
        _actionsSlotHasContent = assigned.some((el) => {
          // The wrapper span from PushDrawer.svelte contains a <slot>.
          // If that inner slot has assigned elements, there are real actions.
          const innerSlot = el.querySelector("slot");
          if (innerSlot) {
            return (innerSlot as HTMLSlotElement).assignedElements().length > 0;
          }
          // Direct element without inner slot
          return true;
        });
      }
    });
  }

  $: if (open) {
    checkActionsSlotContent();
  }

  // V2: Check initial scroll state when drawer opens
  $: if (open && version === "2" && _contentEl) {
    tick().then(() => {
      const drawerContent = _contentEl?.querySelector(".drawer-content");
      if (drawerContent) {
        const { scrollTop, scrollHeight, clientHeight } = drawerContent;
        _scrollPos = calculateScrollPos(
          scrollTop,
          scrollHeight,
          clientHeight,
          _scrollPos,
        );
      }
    });
  }

  // Hysteresis threshold: prevents jitter when dynamic edge margin/height
  // changes shift the scroll position slightly at boundaries.
  const SCROLL_HYSTERESIS = 20;

  function calculateScrollPos(
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number,
    currentPos: "top" | "middle" | "bottom" | null,
  ): "top" | "middle" | "bottom" | null {
    const hasScroll = scrollHeight > clientHeight;
    if (!hasScroll) return null;
    const distFromTop = scrollTop;
    const distFromBottom = scrollHeight - scrollTop - clientHeight;

    // Use hysteresis: stay in current state unless we've moved past the threshold
    if (currentPos === "top" && distFromTop < SCROLL_HYSTERESIS) return "top";
    if (currentPos === "bottom" && distFromBottom < SCROLL_HYSTERESIS)
      return "bottom";

    if (distFromTop < 1) return "top";
    if (distFromBottom < 1) return "bottom";
    return "middle";
  }

  function onScroll(e: Event) {
    const target = e.currentTarget as HTMLDivElement;
    if (!open) return;

    if (version === "2") {
      const { scrollTop, scrollHeight, clientHeight } = target;
      _scrollPos = calculateScrollPos(
        scrollTop,
        scrollHeight,
        clientHeight,
        _scrollPos,
      );
    } else {
      const hasScroll = target.scrollHeight > target.offsetHeight;
      if (!hasScroll) return;

      const isAtTop = target.scrollTop == 0;
      const isAtBottom =
        Math.abs(target.scrollHeight - target.scrollTop - target.offsetHeight) <
        1;

      if (isAtTop) {
        _scrollPos = "top";
      } else if (isAtBottom) {
        _scrollPos = "bottom";
      } else {
        _scrollPos = "middle";
      }
    }
  }
</script>

<div
  data-testid={testid}
  class="goa-push-drawer"
  class:open={!!open}
  class:closed={drawerState === "closed"}
  class:closing={drawerState === "closing"}
  class:v2={version === "2"}
  class:v2-scroll-top={version === "2" && _scrollPos === "top"}
  class:v2-scroll-middle={version === "2" && _scrollPos === "middle"}
  class:v2-scroll-bottom={version === "2" && _scrollPos === "bottom"}
  bind:this={_contentEl}
  aria-labelledby="goa-drawer-heading"
  style="--goa-push-drawer-width: {width};"
>
  <div
    id="goa-drawer-heading"
    class="drawer-header"
    class:v2-scrolled={version === "2" &&
      (_scrollPos === "middle" || _scrollPos === "bottom")}
  >
    <div class="drawer-default-header">
      {#if heading || $$slots.heading}
        {#if heading}
          {#if version === "2"}
            <goa-text
              size={_scrollPos === "middle" || _scrollPos === "bottom"
                ? "heading-xs"
                : "heading-s"}
              as="h3"
              mt="2xs"
              mb="none"
            >
              {heading}
            </goa-text>
          {:else}
            <goa-text size="heading-m" as="h3" mt="none" mb="none">
              {heading}
            </goa-text>
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
  </div>

  <div
    data-testid="drawer-content"
    class="drawer-content {_scrollPos ?? ''}"
    on:scroll={onScroll}
  >
    <div class="scroll-content">
      <slot />
    </div>
  </div>

  {#if $$slots.actions}
    <section
      class="drawer-actions"
      data-testid="drawer-actions"
      class:empty-actions={!_actionsSlotHasContent}
      class:v2-scrolled={version === "2" &&
        (_scrollPos === "top" || _scrollPos === "middle")}
    >
      <slot name="actions" />
    </section>
  {/if}
</div>

<style>
  :host * {
    box-sizing: border-box;
  }

  /* V2: No layout overrides — inherits V1's stretch behavior so
     height: 100% resolves and flex pins header/actions correctly */

  @keyframes opening {
    0% {
      display: flex;
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  @keyframes closing {
    0% {
      transform: translateX(0%);
    }
    99% {
      transform: translateX(99%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .goa-push-drawer {
    display: flex;
    flex-direction: column;
    width: var(--goa-push-drawer-width, 492px);
    padding: var(--goa-space-none);
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    margin-left: var(--goa-drawer-padding);
    height: 100%; /* fill parent height */
    overflow: hidden;
    border-radius: var(--goa-push-drawer-border-radius);
    background: var(--goa-color-greyscale-white);
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
  }

  /* V2: Floating inset appearance, matching regular Drawer V2.
     Default state (no overflow): offset + rounded on all edges. */
  .goa-push-drawer.v2 {
    margin: var(--goa-drawer-offset, 16px);
    height: calc(100% - 2 * var(--goa-drawer-offset, 16px));
    border-color: var(--goa-color-greyscale-150);
    transition:
      margin 0.2s ease,
      border-radius 0.2s ease,
      height 0.2s ease;
  }

  /* V2 dynamic edges: at top of scroll — top floating, bottom flush */
  .goa-push-drawer.v2-scroll-top {
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    height: calc(100% - var(--goa-drawer-offset, 16px));
  }

  /* V2 dynamic edges: middle of scroll — both edges flush */
  .goa-push-drawer.v2-scroll-middle {
    margin-top: 0;
    margin-bottom: 0;
    border-radius: 0;
    height: 100%;
  }

  /* V2 dynamic edges: at bottom of scroll — top flush, bottom floating */
  .goa-push-drawer.v2-scroll-bottom {
    margin-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    height: calc(100% - var(--goa-drawer-offset, 16px));
  }

  /* Shadow styles for scrollable content */
  .top {
    box-shadow: inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  }

  .bottom {
    box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3);
  }

  .middle {
    box-shadow:
      inset 0 8px 8px -8px rgba(0, 0, 0, 0.2),
      inset 0 -8px 8px -8px rgba(0, 0, 0, 0.2);
  }

  /* V2: No scroll shadows on content */
  .v2 .drawer-content {
    box-shadow: none !important;
  }

  @starting-style {
    .goa-push-drawer.closed {
      display: none;
    }
  }

  .goa-push-drawer.open {
    animation: opening ease-in-out var(--goa-push-drawer-transition-time) normal
      1;
  }

  .goa-push-drawer.closing {
    animation: closing ease-in-out var(--goa-push-drawer-transition-time)
      forwards 1;
  }

  .goa-push-drawer.closed {
    display: none;
  }

  .drawer-header {
    position: sticky;
    top: 0;
    box-sizing: border-box;
    display: flex;
    padding: var(--goa-space-l) var(--goa-space-l) var(--goa-space-s)
      var(--goa-space-l);
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
    border-bottom: 1px solid var(--goa-color-greyscale-200);
    background: var(--goa-color-greyscale-white);
  }

  /* V2: Header pinned via flex (not sticky), no border by default */
  .v2 .drawer-header {
    position: static;
    flex: 0 0 auto;
    gap: var(--goa-space-2xs);
    border-bottom: none;
  }

  /* V2: Show header border + shadow when content is scrolled */
  .drawer-header.v2-scrolled {
    border-bottom: var(--goa-border-width-s) solid
      var(--goa-color-greyscale-150);
    box-shadow: var(--goa-shadow-shallow-below);
  }

  .drawer-default-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font: var(--goa-push-drawer-heading-typography);
  }

  .drawer-actions {
    position: sticky;
    bottom: 0;
    width: 100%;
    padding: var(--goa-push-drawer-actions-padding-top)
      var(--goa-push-drawer-content-padding-horizontal)
      var(--goa-push-drawer-actions-padding-bottom)
      var(--goa-push-drawer-content-padding-horizontal);
    border-top: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    background: var(--goa-color-greyscale-white);
  }

  /* V2: Actions pinned via flex (not sticky), no border by default */
  .v2 .drawer-actions {
    position: static;
    flex: 0 0 auto;
    border-top: none;
  }

  /* V2: Show actions border + shadow when content has overflow */
  .drawer-actions.v2-scrolled {
    border-top: var(--goa-border-width-s) solid var(--goa-color-greyscale-150);
    box-shadow: var(--goa-shadow-shallow-below);
  }

  .drawer-actions.empty-actions {
    padding: 0;
    border-top: none;
  }

  /* V2: Collapse empty actions area (not display:none, which breaks slot distribution) */
  .v2 .drawer-actions.empty-actions {
    height: 0;
    overflow: hidden;
    flex-basis: 0;
  }

  .drawer-content {
    display: flex;
    width: 100%;
    flex: 1 0 0;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    overflow-y: auto;
  }

  .scroll-content {
    width: 100%;
    padding: var(--goa-push-drawer-content-padding-vertical)
      var(--goa-push-drawer-content-padding-horizontal);
  }
</style>
