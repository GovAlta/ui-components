<svelte:options customElement="goa-work-side-menu-item" />

<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { dispatch } from "../../common/utils";
  import { MOBILE_BP } from "../../common/breakpoints";

  type WorkSideMenuItemType = "normal" | "emergency" | "success";

  // ******
  // Public
  // ******

  /** The text label displayed for the menu item. */
  export let label: string;
  /** The URL the menu item links to. Optional — when absent, renders as a button instead of a link. */
  export let url: string = "";

  // optional
  /** Badge text displayed alongside the menu item (e.g., notification count). */
  export let badge: string = "";
  /** When true, indicates this is the currently active menu item. */
  export let current: boolean = false;
  /** When true, displays a divider line above this menu item. */
  export let divider: boolean = false;
  /** Icon displayed before the menu item label. */
  export let icon: string = "";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Sets the visual style of the badge. Use "emergency" for urgent items, "success" for positive status. */
  export let type: WorkSideMenuItemType = "normal";

  // *******
  // Private
  // *******

  let _rootEl: HTMLElement;
  let _linkEl: HTMLElement;
  let _mobileContentEl: HTMLElement;
  let _drawerEl: HTMLElement | null = null;
  let _slotContent: Element[] = [];
  let _drawerOpen = false;
  let _popoverOpen = false;
  let _windowWidth = window.innerWidth;

  // ========
  // Reactive
  // ========

  $: _isMobile = _windowWidth < MOBILE_BP;
  $: _alwaysVisible =
    !isNaN(parseInt(badge)) && parseInt(badge) > 0 && parseInt(badge) < 10;
  $: _hasPopoverContent = $$slots.popoverContent;
  $: _badgeType = type === "emergency" ? "emergency" : "success";

  // *****
  // Hooks
  // *****

  onMount(async () => {
    await tick();
    addEventListeners();
    dispatch(_rootEl, "_mountItem", {}, { bubbles: true });
  });

  onDestroy(() => {
    if (_drawerEl) {
      document.removeEventListener(
        "goa:work-side-notification-panel:closePopover",
        handleCloseNotificationPanel,
      );
      _drawerEl.remove();
      _drawerEl = null;
    }
  });

  // *********
  // Functions
  // *********

  // Intercepts anchor clicks to enable SPA navigation via the _navigate event.
  // Modifier keys (Ctrl/Cmd/Shift/Alt) are allowed through so the browser can
  // open links in new tabs as expected.
  function handleClick(e: Event) {
    const mouseEvent = e as MouseEvent;
    if (
      mouseEvent.ctrlKey ||
      mouseEvent.metaKey ||
      mouseEvent.shiftKey ||
      mouseEvent.altKey
    ) {
      return;
    }
    e.preventDefault();
    dispatch(_rootEl, "_navigate", { url }, { bubbles: true });
  }

  function openMobileDrawer() {
    // create `goa-drawer` on the document.body to make sure GoabWorkSideMenu hidden but GoabDrawer still visible
    if (!_drawerEl) {
      _drawerEl = document.createElement("goa-drawer");
      _drawerEl.setAttribute("position", "bottom");
      _drawerEl.setAttribute("maxsize", "85vh");
      _drawerEl.setAttribute("close-button-visibility", "hidden");
      _drawerEl.setAttribute("version", "2");
      _drawerEl.style.setProperty("--goa-drawer-content-padding-vertical", "0");
      _drawerEl.style.setProperty(
        "--goa-drawer-content-padding-horizontal",
        "0",
      );

      document.body.appendChild(_drawerEl);

      if (_mobileContentEl) {
        const slotEl = _mobileContentEl.querySelector(
          "slot",
        ) as HTMLSlotElement;
        if (slotEl) {
          _slotContent = Array.from(slotEl.assignedElements());
          _slotContent.forEach((el) => {
            el.removeAttribute("slot");
            _drawerEl!.appendChild(el);
          });
        }
      }

      // To listen to Close button dispatched from Notification Panel
      document.addEventListener(
        "goa:work-side-notification-panel:closePopover",
        handleCloseNotificationPanel,
      );
    }

    // give browser one frame to render the drawer first and open, to have the animation when opening a drawer first time
    requestAnimationFrame(() => {
      _drawerEl!.setAttribute("open", "true");
      _drawerOpen = true;
      dispatch(_rootEl, "_mobilePopoverOpen", {}, { bubbles: true });
    });
  }

  function closeMobileDrawer() {
    _drawerOpen = false;

    if (_drawerEl) {
      _drawerEl.removeAttribute("open");
    }

    dispatch(_rootEl, "_mobilePopoverClose", {}, { bubbles: true });
  }

  // Desktop popover: uses goa-popover with position="right".
  // The menu item content is placed in the target slot so the popover-target
  // button has real dimensions for CSS anchor positioning.
  // State is controlled via the open attribute (like Dropdown).
  function handlePopoverOpen() {
    _popoverOpen = true;
    dispatch(
      _rootEl,
      "_desktopPopoverOpen",
      { el: _linkEl },
      { bubbles: true },
    );
  }

  function handlePopoverClose() {
    _popoverOpen = false;
    dispatch(
      _rootEl,
      "_desktopPopoverClose",
      { el: _linkEl },
      { bubbles: true },
    );
  }

  function handleUpdateItem(e: CustomEvent) {
    let currentLink = e.detail.current;
    current = _linkEl === currentLink;
    if (current) {
      dispatch(
        _rootEl,
        "_itemCurrent",
        { el: _linkEl, label: label },
        { bubbles: true },
      );
    }
  }

  function handleMouseEnter() {
    dispatch(
      _rootEl,
      "_hoverItem",
      { el: _linkEl, label: label },
      { bubbles: true },
    );
  }

  function handleFocus() {
    dispatch(
      _rootEl,
      "_hoverItem",
      { el: _linkEl, label: label },
      { bubbles: true },
    );
  }

  function handleBlur() {
    dispatch(_rootEl, "_blurItem", {}, { bubbles: true });
  }

  function handleCloseNotificationPanel() {
    if (_drawerEl) {
      closeMobileDrawer();
    } else {
      dispatch(document.body, "goa:closePopover", {});
    }
  }

  function addEventListeners() {
    _linkEl.addEventListener("_update", handleUpdateItem as EventListener);
    _linkEl.addEventListener("focus", handleFocus);
    _linkEl.addEventListener("blur", handleBlur);
    _rootEl.addEventListener(
      "goa:work-side-notification-panel:closePopover",
      handleCloseNotificationPanel,
    );
  }
</script>

<svelte:window bind:innerWidth={_windowWidth} />

<div
  class="root"
  class:divider
  role="presentation"
  data-testid={testid}
  on:mouseenter={handleMouseEnter}
  bind:this={_rootEl}
>
  {#if _hasPopoverContent}
    {#if _isMobile}
      <button
        class="menu-item"
        class:current
        aria-current={current ? "page" : undefined}
        role="menuitem"
        bind:this={_linkEl}
        on:click={openMobileDrawer}
        tabindex="0"
      >
        <goa-icon
          size="small"
          theme={current ? "filled" : "outline"}
          type={icon}
          arialabel={label}
        />
        <div class="menu-item-label">
          {label}
        </div>
        {#if badge}
          <goa-badge
            class="badge"
            class:alwaysvisible={_alwaysVisible}
            type={_badgeType}
            content={badge}
            icon="false"
            min-width="var(--goa-space-m)"
            justify-content="center"
          />
        {/if}
      </button>
      <!-- Slot content is moved to a goa-drawer appended to document.body on open.
           The drawer cannot live inside the menu because the menu is hidden on mobile,
           which would hide the drawer along with it. -->
      <div class="mobile-drawer-content" bind:this={_mobileContentEl}>
        <slot name="popoverContent" />
      </div>
    {:else}
      <goa-popover
        position="right"
        padded="false"
        open={_popoverOpen ? "true" : "false"}
        width="100%"
        minwidth="500px"
        maxwidth="500px"
        hoffset="36px"
        voffset="140px"
        on:_open={handlePopoverOpen}
        on:_close={handlePopoverClose}
      >
        <div
          slot="target"
          class="menu-item"
          class:current
          role="menuitem"
          aria-current={current ? "page" : undefined}
          bind:this={_linkEl}
        >
          <goa-icon
            size="small"
            theme={current ? "filled" : "outline"}
            type={icon}
            arialabel={label}
          />
          <div class="menu-item-label">
            {label}
          </div>
          {#if badge}
            <goa-badge
              class="badge"
              class:alwaysvisible={_alwaysVisible}
              type={_badgeType}
              content={badge}
              icon="false"
              min-width="var(--goa-space-m)"
              justify-content="center"
            />
          {/if}
        </div>
        <slot name="popoverContent" />
      </goa-popover>
    {/if}
  {:else}
    <svelte:element
      this={url ? "a" : "button"}
      class="menu-item"
      class:current
      aria-current={current ? "page" : undefined}
      role="menuitem"
      href={url || undefined}
      bind:this={_linkEl}
      on:click={handleClick}
      tabindex="0"
    >
      <goa-icon
        size="small"
        theme={current ? "filled" : "outline"}
        type={icon}
        arialabel={label}
      />
      <div class="menu-item-label">
        {label}
      </div>
      {#if badge}
        <goa-badge
          class="badge"
          class:alwaysvisible={_alwaysVisible}
          type={_badgeType}
          content={badge}
          icon="false"
          min-width="var(--goa-space-m)"
          justify-content="center"
        />
      {/if}
    </svelte:element>
  {/if}
</div>

<style>
  :host * {
    box-sizing: border-box;
  }

  .root {
    container-type: inline-size;
    position: relative;
  }

  .mobile-drawer-content {
    display: none;
  }

  /* Make goa-popover fill the menu item width so the anchor has real dimensions */
  goa-popover {
    display: block;
    width: 100%;
  }

  /* Menu item */
  .menu-item {
    position: relative;
    display: flex;
    gap: var(--goa-space-m);
    border-radius: var(
      --goa-work-side-menu-item-border-radius,
      var(--goa-border-radius-m)
    );
    text-decoration: none;
    align-items: flex-start;
    padding: var(
      --goa-work-side-menu-item-padding,
      var(--goa-space-xs) var(--goa-space-xs) var(--goa-space-xs)
        calc(var(--goa-space-xs) + var(--goa-space-3xs))
    );
    color: var(
      --goa-work-side-menu-item-text-color,
      var(--goa-color-greyscale-600)
    );
    min-height: var(--goa-work-side-menu-item-min-height, 40px);
  }

  button.menu-item {
    border: none;
    width: 100%;
    text-align: left;
    background-color: transparent;
  }

  .menu-item:hover {
    background: var(
      --goa-work-side-menu-item-color-bg-hover,
      var(--goa-color-greyscale-100)
    );
    color: var(
      --goa-work-side-menu-item-text-color-hover,
      var(--goa-color-text-default)
    );
    cursor: pointer;
  }

  .menu-item:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: 2px;
  }

  goa-icon {
    display: var(--goa-work-side-menu-item-icon-display, flex);
    margin-top: var(--goa-space-3xs);
  }

  /* Divider */
  .divider {
    padding-bottom: var(--goa-space-s);
    margin-bottom: var(--goa-space-xs);
    border-bottom: var(--goa-border-width-s) solid
      var(--goa-color-greyscale-200);
  }

  /* Menu item label */
  .menu-item-label {
    flex-grow: 1;
    font: var(
      --goa-work-side-menu-item-text-size,
      var(--goa-typography-body-s)
    );
    animation: delayText 100ms;
  }

  .trailing-content-slot {
    display: flex;
  }

  /* Current item */
  .current {
    background: var(
      --goa-work-side-menu-item-color-bg-current,
      var(--goa-color-greyscale-100)
    );
    color: var(
      --goa-work-side-menu-item-text-color-current,
      var(--goa-color-text-default)
    );
  }

  .current .menu-item-label {
    font-weight: var(--goa-font-weight-semi-bold);
  }

  /* Badge - using goa-badge component */
  goa-badge.badge {
    --goa-badge-height: 1.25rem;
    --goa-badge-padding: 0 6px;
    --goa-badge-font-size: var(
      --goa-work-side-menu-item-badge-text-size,
      var(--goa-font-size-2)
    );
    --goa-badge-border-radius: 1.25rem;
  }

  /* Icon-only items when menu is closed */
  @container (max-width: 160px) {
    .menu-item {
      height: 36px;
      margin: 0;
      padding-left: calc(var(--goa-space-xs) + 2px);
    }
    .menu-item-label,
    .trailing-content-slot {
      display: none;
    }

    goa-badge.badge {
      position: absolute;
      top: var(--goa-space-3xs);
      right: var(--goa-space-3xs);
      --goa-badge-height: var(--goa-space-m);
      --goa-badge-padding: 0;
      --goa-badge-font-size: var(--goa-font-size-1);
    }

    goa-badge.badge:not(.alwaysvisible) {
      --goa-badge-font-size: 0;
    }

    @keyframes delayText {
      0% {
        opacity: 0;
        font-size: 0;
      }
      99% {
        opacity: 0;
        font-size: 0;
      }
      100% {
        opacity: 1;
        font-size: var(--goa-font-size-2);
      }
    }
  }
</style>
