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
  import { onMount, onDestroy } from "svelte";
  import { dispatch, receive, typeValidator } from "../../common/utils";
  import {
    ScrollPanelStateChangeMsg,
    type ScrollPanelStateChangeRelayDetail,
  } from "../../types/relay-types";

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
  let _scrollPanelEl: HTMLElement | null = null;
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
    if (_scrollPanelEl) {
      receive(_scrollPanelEl, (action, data) => {
        if (action === ScrollPanelStateChangeMsg) {
          handleScrollPanelStateChange(data as ScrollPanelStateChangeRelayDetail);
        }
      });
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

  function handleScrollPanelStateChange(detail: ScrollPanelStateChangeRelayDetail) {
    if (!detail.isScrollable) {
      _scrollPos = null;
      return;
    }
    if (detail.state === "at-top") _scrollPos = "top";
    else if (detail.state === "at-bottom") _scrollPos = "bottom";
    else if (detail.state === "middle") _scrollPos = "middle";
    else _scrollPos = null;
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
  <goa-scroll-panel bind:this={_scrollPanelEl}>
    <div id="goa-drawer-heading" slot="header" class="drawer-header">
      <div class="drawer-default-header">
        {#if heading || $$slots.heading}
          <div class="drawer-heading-content">
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
          </div>
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

    <div data-testid="drawer-content" class="drawer-content">
      <div class="scroll-content">
        <slot />
      </div>
    </div>

    {#if $$slots.actions}
      <section
        slot="footer"
        class="drawer-actions"
        data-testid="drawer-actions"
        class:empty-actions={!_actionsSlotHasContent}
      >
        <slot name="actions" />
      </section>
    {/if}
  </goa-scroll-panel>
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

  goa-scroll-panel {
    flex: 1 1 auto;
    min-height: 0;
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

  /* V2: no permanent border — scroll-panel's .scroll-panel-header--bordered
     handles the sticky border feedback when content overflows. */
  .v2 .drawer-header {
    gap: var(--goa-space-2xs);
    border-bottom: none;
  }

  .drawer-default-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font: var(--goa-push-drawer-heading-typography);
  }

  .v2 .drawer-default-header {
    align-items: flex-start;
    column-gap: var(--goa-space-s);
  }

  .v2 .drawer-heading-content {
    min-width: 0;
  }

  .v2 .drawer-default-header goa-icon-button {
    flex-shrink: 0;
    margin-top: -0.1875rem;
  }

  .drawer-actions {
    width: 100%;
    padding: var(--goa-push-drawer-actions-padding-top)
      var(--goa-push-drawer-content-padding-horizontal)
      var(--goa-push-drawer-actions-padding-bottom)
      var(--goa-push-drawer-content-padding-horizontal);
    border-top: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    background: var(--goa-color-greyscale-white);
  }

  /* V2: no permanent border — scroll-panel's .scroll-panel-footer--bordered
     handles the sticky border feedback when content overflows. */
  .v2 .drawer-actions {
    border-top: none;
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
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
  }

  .scroll-content {
    width: 100%;
    padding: var(--goa-push-drawer-content-padding-vertical)
      var(--goa-push-drawer-content-padding-horizontal);
  }
</style>
