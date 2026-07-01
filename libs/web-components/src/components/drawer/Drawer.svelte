<svelte:options
  customElement={{
    tag: "goa-drawer",
    props: {
      open: { type: "Boolean", reflect: true },
      closeButtonVisibility: {
        type: "String",
        attribute: "close-button-visibility",
      },
    },
  }}
/>

<script lang="ts">
  import { fly } from "svelte/transition";
  import noscroll from "../../common/no-scroll";
  import { onDestroy, onMount, tick } from "svelte";
  import { dispatch, style, styles, typeValidator } from "../../common/utils";
  import { DrawerPosition, DrawerSize } from "../../common/types";

  // ******
  // Public
  // ******

  /** Whether the drawer is open. */
  export let open = false;
  /** The position of the drawer. */
  export let position: DrawerPosition = undefined;
  /** The heading text displayed at the top of the drawer. */
  export let heading: string = "";
  /** Sets max height on bottom position, sets width on left and right position. */
  export let maxsize: DrawerSize = undefined;
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "drawer";
  /** Controls visibility of the close button and header. */
  export let closeButtonVisibility: "visible" | "hidden" = "visible";

  // version
  type VersionType = "1" | "2";
  const [Version, validateVersion] = typeValidator("Version", ["1", "2"]);
  /** @internal Design system version for styling. */
  export let version: VersionType = "1";

  // *******
  // Private
  // *******

  // element refs
  let _contentEl: HTMLElement | null = null;

  // computes the required absolute position offset to hide the drawer when not shown
  let _drawerSize: number;
  let _actionsSlotHasContent: boolean = false;

  // ========
  // Reactive
  // ========
  $: _showCloseButton = closeButtonVisibility !== "hidden";
  $: maxsize = maxsize || (position === "bottom" ? "80vh" : "320px");
  $: _flyParams = {
    duration: 200,
    x: position === "right" ? 200 : position === "left" ? -200 : 0,
    y: position === "bottom" ? 200 : 0,
  };

  // Recheck actions slot content when the drawer opens (drives the empty-actions class styling).
  $: if (open) {
    checkActionsSlotContent();
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

  async function checkActionsSlotContent() {
    await tick();
    _actionsSlotHasContent = !!$$slots.actions;
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
</script>

<goa-focus-trap {open} prevent-scroll-into-view={true}>
  <div
    class="root"
    style={style("pointer-events", open ? "auto" : "none")}
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
        style(
          "max-width",
          position === "bottom"
            ? "unset"
            : version === "2"
              ? `min(${maxsize}, calc(100vw - 2 * var(--goa-drawer-offset, 0)))`
              : `min(${maxsize}, 100vw)`,
        ),
        style(
          "width",
          position === "bottom"
            ? "100%"
            : version === "2"
              ? `min(${maxsize}, calc(100vw - 2 * var(--goa-drawer-offset, 0)))`
              : `min(${maxsize}, 100vw)`,
        ),
        style(
          "max-height",
          position === "bottom"
            ? version === "2"
              ? `min(${maxsize}, calc(100vh - 2 * var(--goa-drawer-offset, 0)))`
              : `min(${maxsize}, 100vh)`
            : undefined,
        ),
      )}
      in:fly={_flyParams}
      out:fly={_flyParams}
      class:open
      class:closing={!open}
      class:v2={version === "2"}
      class={`drawer drawer-${position}`}
      class:drawer-open-bottom={position === "bottom" && open}
      class:drawer-open-right={position === "right" && open}
      class:drawer-open-left={position === "left" && open}
      bind:this={_contentEl}
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      data-first-focus="true"
      aria-labelledby={_showCloseButton ? "goa-drawer-heading" : undefined}
    >
      <goa-scroll-panel>
        {#if _showCloseButton}
          <div slot="header" class="header" id="goa-drawer-heading">
            {#if heading || $$slots.heading}
              {#if heading}
                {#if version === "2"}
                  <goa-text size="heading-s" as="h3" mt="3xs" mb="none"
                    >{heading}</goa-text
                  >
                {:else}
                  <goa-text size="heading-m" as="h3" mt="none" mb="none"
                    >{heading}</goa-text
                  >
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
        {/if}

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

  /* scroll-panel owns scroll mechanics and the sticky header/footer scroll cue (V1 + V2) */
  .drawer goa-scroll-panel {
    flex: 1 1 auto;
    min-height: 0;
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

  .v2 .header goa-icon-button {
    margin-top: -0.1875rem;
  }

  .scroll-content {
    padding: var(--goa-drawer-content-padding-vertical, var(--goa-space-l))
      var(--goa-drawer-content-padding-horizontal, var(--goa-space-l));
  }

  /* Remove margin-top from first child in content to prevent double spacing */
  .scroll-content > :first-child {
    margin-top: 0;
  }

  /* Actions styles */
  .drawer-actions {
    width: 100%;
    padding: var(--goa-drawer-actions-padding-top, var(--goa-space-l))
      var(--goa-drawer-content-padding-horizontal, var(--goa-space-xl))
      var(--goa-drawer-actions-padding-bottom, var(--goa-space-xl));
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
    transition:
      bottom var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive),
      transform var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive);
  }
  .drawer-bottom.v2.open,
  .drawer-bottom.v2.drawer-open-bottom {
    bottom: var(--goa-drawer-offset, 0);
    transform: translateY(0); /* Slide in */
  }

  /* Right */

  .drawer-right {
    right: var(--drawer-offset);
    height: 100vh; /* V1: bound to viewport so the scroll-panel scrolls internally */
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
    /* Max-height accounts for BOTH top and bottom margins (modal stays floating) */
    max-height: calc(100vh - 2 * var(--goa-drawer-offset, 0));
    overflow-y: hidden; /* No scroll on drawer itself */
    border-radius: var(--goa-drawer-border-radius, 24px);
    box-shadow: var(--goa-drawer-shadow);
    transform: translateX(100%); /* Start off-screen to the right */
    /* Smooth transitions for position and transform */
    transition:
      right var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive),
      bottom var(--goa-motion-duration-short-4)
        var(--goa-motion-curve-expressive),
      transform var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive);
  }
  .v2.drawer-open-right {
    right: var(--goa-drawer-offset, 0);
    transform: translateX(0); /* Slide in */
  }

  /* Left */

  .drawer-left {
    left: var(--drawer-offset);
    height: 100vh; /* V1: bound to viewport so the scroll-panel scrolls internally */
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
    /* Max-height accounts for BOTH top and bottom margins (modal stays floating) */
    max-height: calc(100vh - 2 * var(--goa-drawer-offset, 0));
    overflow-y: hidden; /* No scroll on drawer itself */
    border-radius: var(--goa-drawer-border-radius, 24px);
    box-shadow: var(--goa-drawer-shadow);
    transform: translateX(-100%); /* Start off-screen to the left */
    /* Smooth transitions for position and transform */
    transition:
      left var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive),
      bottom var(--goa-motion-duration-short-4)
        var(--goa-motion-curve-expressive),
      transform var(--goa-motion-duration-medium-1)
        var(--goa-motion-curve-expressive);
  }
  .v2.drawer-open-left {
    left: var(--goa-drawer-offset, 0);
    transform: translateX(0); /* Slide in */
  }
</style>
