<svelte:options customElement="goa-drawer" />

<script lang="ts">
  import noscroll from "../../common/no-scroll";
  import { onDestroy, onMount, tick } from "svelte";
  import { dispatch, style, styles } from "../../common/utils";
  import { DrawerPosition, DrawerSize } from "../../common/types";

  // ******
  // Public
  // ******

  export let open: boolean = false;
  export let position: DrawerPosition = undefined;
  export let heading: string = "";
  export let maxsize: DrawerSize = undefined; // is set based on the anchor value

  // *******
  // Private
  // *******

  // element refs
  let _contentEl: HTMLElement | null = null;

  // computes the required absolute position offset to hide the drawer when not shown
  let _drawerSize: number;

  // ========
  // Reactive
  // ========

  $: maxsize = maxsize || (position === "bottom" ? "80vh" : "500px");

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

  function close(e: Event) {
    if (open) {
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
    return position === "bottom"
      ? maxsize // bottom uses user-set/default maxSize
      : $$slots.actions // left/right have to calculate max size
        ? "calc(100vh - 12.5rem - 1px)" // (actions bar width) + border
        : "calc(100vh - 4rem)"; // no actions bar just heading and padding
  }
</script>

<div
  class="root"
  style={style("visibility", open ? "visible" : "hidden")}
  data-testid="drawer"
>
  <button
    class="background"
    data-testid="background"
    on:click={close}
    style={style("opacity", open ? "1" : "0")}
  />
  <div
    use:noscroll={{ enable: open }}
    style={styles(
      style("--drawer-offset", `-${_drawerSize}px`),
      style("height", position === "bottom" ? "unset" : "100vh"),
      style("max-width", position === "bottom" ? "unset" : maxsize),
      style("width", position === "bottom" ? "100%" : maxsize),
    )}
    class={`drawer drawer-${position}`}
    class:drawer-open-bottom={position === "bottom" && open}
    class:drawer-open-right={position === "right" && open}
    class:drawer-open-left={position === "left" && open}
    bind:this={_contentEl}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="topbar">
      <div class="heading">
        {heading}
      </div>
      <goa-icon-button
        data-ignore-focus="true"
        data-testid="drawer-close-button"
        arialabel="Close the drawer"
        variant="dark"
        icon="close"
        on:click={close}
      />
    </div>

    <div data-testid="drawer-content" class="drawer-content">
      <goa-scrollable direction="vertical" maxheight={scrollableHeight()}>
        <div class="scroll-content">
          <slot />
        </div>
      </goa-scrollable>
    </div>

    {#if $$slots.actions}
      <section class="drawer-actions" data-testid="drawer-actions">
        <slot name="actions" />
      </section>
    {/if}
  </div>
</div>

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
    transition: all var(--goa-drawer-transition-time) ease-out;
    display: flex;
    flex-direction: column;
    background-color: #f8f8f8;
  }

  .topbar {
    border-bottom: 1px solid var(--goa-color-greyscale-200);
    display: flex;
    padding: var(--goa-space-m);
    justify-content: space-between;
  }

  .heading {
    font: var(--goa-typography-heading-s);
  }

  .drawer-content {
    flex: 1 1 auto;
  }

  .scroll-content {
    padding: var(--goa-space-m);
  }

  .drawer-actions {
    width: 100%;
    padding: var(--goa-space-l) var(--goa-space-xl) var(--goa-space-xl);
    border-top: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    background: var(--goa-color-greyscale-white);
  }

  .drawer-close {
    padding-left: var(--goa-space-m);
    margin-top: var(--goa-space-2xs);
  }

  /* Bottom */

  .drawer-bottom {
    bottom: var(--drawer-offset);
    width: 100%;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    box-shadow: var(--goa-drawer-bottom-shadow);
  }
  .drawer-open-bottom {
    bottom: 0;
  }

  /* Right */

  .drawer-right {
    right: var(--drawer-offset);
    height: 100%;
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
  }
  .drawer-open-left {
    left: 0;
  }
</style>
