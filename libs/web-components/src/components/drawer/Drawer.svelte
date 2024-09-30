<svelte:options customElement="goax-drawer" />

<script lang="ts">
  import noscroll from "../../common/no-scroll";
  import { onDestroy, onMount, tick } from "svelte";
  import { style, styles } from "../../common/utils";

  // ******
  // Public
  // ******

  export let open: boolean = false;
  export let anchor: "bottom" | "left" | "right" | undefined = undefined;
  export let heading: string = "";

  // *******
  // Private
  // *******

  let _rootEl: HTMLElement | null = null;
  let _contentEl: HTMLElement | undefined;
  let _drawerSize: number;

  // *****
  // Hooks
  // *****

  onMount(async () => {
    await tick();

    if (anchor === "bottom") {
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
    _rootEl?.dispatchEvent(new CustomEvent("_close", { composed: true }));
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

</script>

<div class="background" style={styles(
  style("visibility", open ? "visible": "hidden"),
  style("opacity", open ? "1": "0"),
)}>
  <div
    use:noscroll={{ enable: true }}
    style={styles(
      style("--drawer-offset", `-${_drawerSize}px`),
      style("height", anchor === "bottom" ? "unset" : "100vh"),
      style("max-width", anchor === "bottom" ? "unset" : "80vw"),
    )}
    class={`goa-drawer goa-drawer-${anchor}`}
    class:drawer-open-bottom={anchor === "bottom" && open}
    class:drawer-open-right={anchor === "right" && open}
    class:drawer-open-left={anchor === "left" && open}
    bind:this={_rootEl}
  >
    <div 
      class={`drawer-pane drawer-pane-${anchor}`} 
      bind:this={_contentEl}>
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
          icon="close"
          on:click={close}
          variant="dark"
        />
      </div>
      <div 
        data-testid="drawer-content" 
        class="drawer-content"
      >
        <goa-scrollable direction="vertical" maxheight={anchor === "bottom" ? "80vh" : "100vh" }>
          <slot />
        </goa-scrollable>
      </div>
    </div>
  </div>
</div>

<style>
  :host * {
    box-sizing: border-box;
  }

  .background {
    position: fixed;
    inset: 0;
    z-index: 999;
    background-color: rgba(0,0,0,0.3);
    transition: opacity 200ms ease-out;
  }

  .goa-drawer {
    font-family: var(--goa-font-family-sans);
    position: fixed;
    z-index: 9999;
    transition: all 200ms ease-out;
    display: flex;
    flex-direction: column;
  }

  .drawer-pane {
    background-color: #eee;
  }

  .topbar {
    border-bottom: 1px solid #ccc;
    display: flex;
    padding: var(--goa-space-m);
    justify-content: space-between;
  }
  .heading {
    font: var(--goa-typography-heading-s);
  }

  .drawer-content {
    padding: var(--goa-space-m);
  }

  .drawer-close {
    padding-left: var(--goa-space-m);
    margin-top: var(--goa-space-2xs);
  }

  /* Bottom */

  .goa-drawer-bottom {
    bottom: var(--drawer-offset);
  }
  .drawer-pane-bottom {
    width: 100%;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.5);
  }
  .drawer-open-bottom {
    bottom: 0;
  }

  /* Right */

  .goa-drawer-right {
    right: var(--drawer-offset);
  }
  .drawer-pane-right {
    box-shadow: -2px 0 12px rgba(0,0,0,0.5);
    height: 100%;
  }
  .drawer-open-right {
    right: 0;
  }

  /* Left */

  .goa-drawer-left {
    left: var(--drawer-offset);
  }
  .drawer-pane-left {
    box-shadow: 2px 0 12px rgba(0,0,0,0.5);
    height: 100%;
  }
  .drawer-open-left {
    left: 0;
  }

</style>
