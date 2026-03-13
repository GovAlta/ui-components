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
  type DrawerState = "initial" | "open" | "closed" | "closing";
  import { onMount, onDestroy, tick } from "svelte";
  import { dispatch } from "../../common/utils";

  export let testid: string | undefined = undefined;
  export let open: boolean = false;
  export let heading: string = "";
  export let width: string = "492px";
  export let version: string | undefined = undefined;
  let _contentEl: HTMLElement | null = null;
  let drawerState: DrawerState = "initial";
  let closingTimeout: number | null = null;

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
  let _scrollPos: "top" | "middle" | "bottom" | null = null;
  let _actionsSlotHasContent: boolean = false;
  async function checkActionsSlotContent() {
    await tick();
    _actionsSlotHasContent = !!$$slots.actions;
  }

  $: if (open) {
    checkActionsSlotContent();
  }

  function onScroll(e: Event) {
    const target = e.currentTarget as HTMLDivElement;
    const hasScroll = target.scrollHeight > target.offsetHeight;
    if (!open || !hasScroll) return;

    // top
    if (target.scrollTop == 0) {
      _scrollPos = "top";
    } else if (
      // bottom
      Math.abs(target.scrollHeight - target.scrollTop - target.offsetHeight) < 1
    ) {
      _scrollPos = "bottom";
    } else {
      _scrollPos = "middle";
    }
  }
</script>

<div
  data-testid={testid}
  class="goa-push-drawer"
  class:open={!!open}
  class:closed={drawerState === "closed"}
  class:closing={drawerState === "closing"}
  bind:this={_contentEl}
  aria-labelledby="goa-drawer-heading"
  style="--goa-push-drawer-width: {width};"
>
  <div id="goa-drawer-heading" class="drawer-header">
    <div class="drawer-default-header">
      {#if heading || $$slots.heading}
        {#if heading}
          <goa-text size="heading-m" as="h3" mt="none" mb="none">
            {heading}
          </goa-text>
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
    >
      <slot name="actions" />
    </section>
  {/if}
</div>

<style>
  :host * {
    box-sizing: border-box;
  }

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
    border-radius: var(--goa-push-drawer-border-radius);
    background: var(--goa-color-greyscale-white);
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
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

  .drawer-actions.empty-actions {
    padding: 0;
    border-top: none;
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
