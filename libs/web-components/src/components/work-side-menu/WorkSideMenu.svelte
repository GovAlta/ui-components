<svelte:options
  customElement={{
    tag: "goa-work-side-menu",
    props: {
      heading: { type: "String", reflect: true },
      url: { type: "String", reflect: true },
      userName: { type: "String", attribute: "user-name", reflect: true },
      userSecondaryText: {
        type: "String",
        attribute: "user-secondary-text",
        reflect: true,
      },
      open: { type: "Boolean", reflect: true },
    },
  }}
/>

<script lang="ts">
  import { dispatch, performOnce, relay, receive } from "../../common/utils";
  import { getMatchedLink } from "../../common/urls";
  import { MOBILE_BP } from "../../common/breakpoints";
  import {
    WorkSideMenuBindMsg,
    type WorkSideMenuBindRelayDetail,
    WorkSideMenuOpenMsg,
    WorkSideMenuCloseMsg,
  } from "../../types/relay-types";
  import { onMount, onDestroy, tick } from "svelte";

  // ******
  // Public
  // ******

  /** The application name displayed in the header. */
  export let heading: string;
  /** URL for the header link. Clicking the logo/heading navigates to this URL. */
  export let url: string;

  // optional

  /** Controls whether the side menu is expanded or collapsed. */
  export let open: boolean = false;
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** User's name displayed in the profile section. */
  export let userName: string = "";
  /** Secondary text displayed below the user's name, such as role or email. */
  export let userSecondaryText: string = "";

  // *******
  // Private
  // *******

  let _isScrolling = false;
  let _atTop = true;
  let _atBottom = false;
  let _scrollTop = 0;
  let _showAccountMenu = false;
  let _showTooltip = false;
  let _menuItemWithOpenPopover: HTMLElement | null = null;
  let _mobilePopoverOpen = false;
  let _windowWidth = window.innerWidth;

  // ========
  // Reactive
  // ========

  $: _isMobile = _windowWidth < MOBILE_BP;

  let _menuEl: HTMLElement;
  let _menuLinks: HTMLElement[] = [];
  let _containerEl: HTMLElement | undefined;
  let _rootEl: HTMLElement;
  let _scrollEl: HTMLElement;
  let _toggleButtonEl: HTMLElement | undefined;
  let _tooltipEl: HTMLElement;
  let _tooltipLabel: string = "";

  let _bindTimeoutId: any;
  let _resizeTimeoutId: any;
  let _mouseEnterTimeoutId: any;
  let _mouseLeaveTimeoutId: any;

  let observer: MutationObserver | null = null;
  let _resizeObserver: ResizeObserver | null = null;

  const _logo =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PSczMicgZmlsbD0nbm9uZSc+PHJlY3Qgd2lkdGg9JzMxLjY5NScgaGVpZ2h0PSczMS42ODgnIHg9Jy4wMjgnIGZpbGw9JyMwMEI2RUQnIHJ4PSc0Jy8+PGcgY2xpcC1wYXRoPSd1cmwoI2EpJz48bWFzayBpZD0nYicgd2lkdGg9JzQ3JyBoZWlnaHQ9JzM5JyB4PSctMTEnIHk9Jy0yJyBtYXNrVW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBzdHlsZT0nbWFzay10eXBlOmFscGhhJz48cGF0aCBmaWxsPScjNTQ1ODYwJyBkPSdNMjIuMDE3IDMxLjEwM2E2My40NyA2My40NyAwIDAgMS03LjIyLTMuMTY0IDUyLjQxIDUyLjQxIDAgMCAwIDYuMTk1LTIuNzI0IDQzLjE0OCA0My4xNDggMCAwIDAgMS4wMjMgNS44OW0xMy4yNy0yNC4zOTJjLTEuMDM0LS4xMy0uNDk3LjM0OC0uNzg1IDEuNy0xLjI0NiA1LjgzMi02LjA1IDEwLjAzNS0xMC44NzMgMTIuODU1LS41MDYtNi42NzgtLjMtMTQuMDkzLjk2Ny0xOC42MzYgMS4wNjktMy44MzYgMi4zNC0zLjEzMi43NjMtMy45MzgtMS42Ni0uODQ4LTMuNDQuMjczLTQuODgyIDMuMTNDMTkuMDMzIDQuNjggMTIuMzkzIDIwLjE5IDEuNzggMzAuNjY0Yy01LjQzIDUuMzYtMTAuMzQgMi42LTExLjMyMyAxLjc3NS0uOC0uNjctMS4wOTYuMzY1LS4xMDMgMS40MjYgNC4zOSA0LjcgMTAuODA1IDIuMDAzIDEzLjE0MS0uMzE0IDYuNDU1LTYuNDA1IDEzLjk2LTIwLjE5MyAxNi45OTYtMjYuMDQ0YTg5Ljg5IDg5Ljg5IDAgMCAwIC4yNDMgMTUuMjk0IDQ0LjY5IDQ0LjY5IDAgMCAxLTcuNjE5IDIuODg1Yy0xLjUwNC4zOTEtMi40MzUgMS0yLjQ2MiAxLjY5MS0uMDMuNzU4Ljk4IDEuMzk3IDIuNDQgMi4wODUgMi42IDEuMjI2IDEwLjIxNiA0Ljc5OCAxMi4wOTMgNS44NzggMS42MDYuOTI1IDIuMzkuMjA0IDIuODY2LS43OTYuNjIyLTEuMzAyLTEuMDgzLTIuMDU0LTIuNzM1LTIuNTQ1YTUwLjQ3IDUwLjQ3IDAgMCAxLTEuNDgtOC4zODVjMy44Ny0yLjM2NSA3LjY4Mi01LjUyIDkuODgtOS40NTJhMTguMDA0IDE4LjAwNCAwIDAgMCAxLjU2OC00LjM2NWMuMjMtLjkzNC4yOTMtMS45LjE4Ni0yLjg1NSAwIDAtLjAzLS4yMDktLjE4Ni0uMjI5Jy8+PC9tYXNrPjxnIG1hc2s9J3VybCgjYiknPjxyZWN0IHdpZHRoPSczMS42OTUnIGhlaWdodD0nMzEuNjk1JyB4PScuMDI4JyBmaWxsPScjZmZmJyByeD0nMy4wNDgnLz48L2c+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0nYSc+PHJlY3Qgd2lkdGg9JzMyJyBoZWlnaHQ9JzMxLjk5MicgeT0nLjAwOCcgZmlsbD0nI2ZmZicgcng9JzQnLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=";

  // *****
  // Hooks
  // *****

  onMount(async () => {
    await tick();
    addEventListeners();
    observer = watchPathChanges(setCurrentUrl);

    if (typeof ResizeObserver !== "undefined") {
      _resizeObserver = new ResizeObserver(() => {
        _resizeTimeoutId = performOnce(_resizeTimeoutId, setMenuScrolling, 1);
      });
      if (_menuEl) _resizeObserver.observe(_menuEl);
    }
    // send this message to WorkspaceLayout component
    relay<WorkSideMenuBindRelayDetail>(
      _rootEl,
      WorkSideMenuBindMsg,
      { el: _rootEl },
      { bubbles: true },
    );
    // if this WorkSideMenu is put under slot sideMenu of Workspace Layout, its open state should be synced with the WorkspaceLayout
    receive(_rootEl, (action) => {
      if (action === WorkSideMenuOpenMsg) {
        open = true;
      } else if (action === WorkSideMenuCloseMsg) {
        open = false;
      }
    });

    document.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    removeEventListeners();
    observer?.disconnect();
    _resizeObserver?.disconnect();
    clearTimeout(_bindTimeoutId);
    clearTimeout(_resizeTimeoutId);
    clearTimeout(_mouseEnterTimeoutId);
    clearTimeout(_mouseLeaveTimeoutId);
    document.removeEventListener("keydown", handleKeydown);
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && _isMobile && open) {
      dispatch(_rootEl, "_toggle", {}, { bubbles: true });
    }
  }

  // *********
  // Functions
  // *********

  // Menu
  function updateScrollPosition() {
    const offsetHeight = _scrollEl?.clientHeight || 0;
    const scrollHeight = _menuEl?.scrollHeight || 0;
    _atTop = _scrollTop <= 1;
    _atBottom = _scrollTop + offsetHeight >= scrollHeight - 1;
  }

  function setMenuScrolling() {
    _isScrolling =
      (_menuEl?.scrollHeight || 0) > (_scrollEl?.clientHeight || 0);
    if (!_isScrolling) {
      _atTop = true;
      _atBottom = true;
    } else {
      updateScrollPosition();
    }
  }

  function handleMenuScroll(e: Event) {
    const detail = (e as CustomEvent).detail;
    if (!detail) return;
    _scrollTop = detail.scrollTop;
    updateScrollPosition();
  }

  function toggleMenu() {
    open = !open;
    _showTooltip = false;
  }

  function onMobilePopoverOpen() {
    _mobilePopoverOpen = true;
    // Close the menu when drawer opens
    if (open) {
      open = false;
      dispatch(_rootEl, "_toggle", { open }, { bubbles: true });
    }
  }

  function onMobilePopoverClose() {
    _mobilePopoverOpen = false;
  }

  function getShadowLinkEl(el: Element): HTMLAnchorElement | null | undefined {
    if (el.tagName.includes("GOAB")) {
      const firstChild = el.firstElementChild as Element;
      if (!firstChild) return null;
      el = firstChild;
    }
    return el?.shadowRoot?.querySelector("a");
  }

  // Menu links
  function addMenuLink(e: Event) {
    let el = e.target as Element;
    let link = getShadowLinkEl(el);
    if (el && link) {
      _menuLinks = [..._menuLinks, link];
    }

    _bindTimeoutId = performOnce(
      _bindTimeoutId,
      () => {
        setCurrentUrl();
        setMenuScrolling();
      },
      1,
    );
  }

  // Tooltip
  function setTooltipVisibility(
    menuType: string,
    label: string,
    el: HTMLElement,
  ) {
    if (!open && menuType !== "account" && el !== _menuItemWithOpenPopover) {
      setTooltipPos(label, el);
      showTooltip();
    } else {
      hideTooltip();
    }
  }

  function showTooltip() {
    clearTimeout(_mouseEnterTimeoutId);
    clearTimeout(_mouseLeaveTimeoutId);
    _mouseEnterTimeoutId = setTimeout(() => {
      _showTooltip = true;
    }, 300);
  }

  function setTooltipPos(label: string, el: HTMLElement) {
    if (!_containerEl || !_tooltipEl) return;
    const rect = el?.getBoundingClientRect();
    const containerRect = _containerEl.getBoundingClientRect();
    const top = rect.top - containerRect.top + rect.height / 2;
    const left = rect.right - containerRect.left;

    _tooltipEl.style.top = `${top}px`;
    _tooltipEl.style.left = `${left + 14}px`;

    _tooltipLabel = label;
  }

  function hideTooltip() {
    clearTimeout(_mouseEnterTimeoutId);
    clearTimeout(_mouseLeaveTimeoutId);
    _mouseLeaveTimeoutId = setTimeout(() => {
      _showTooltip = false;
    }, 300);
  }

  function handleToggleHover() {
    if (open || !_toggleButtonEl) return;

    setTooltipPos("Expand menu", _toggleButtonEl);
    showTooltip();
  }

  // Account menu
  async function openAccountMenu() {
    if (_showAccountMenu) return;
    _showAccountMenu = true;

    await tick();
    document.body.addEventListener("click", closeAccountMenu);
  }

  function closeAccountMenu() {
    if (!_showAccountMenu) return;
    _showAccountMenu = false;
    document.body.removeEventListener("click", closeAccountMenu);
  }

  // Current menu item
  function setCurrentUrl() {
    const currentEl = getMatchedLink(_menuLinks, window.location);
    _menuLinks.forEach((link) => {
      dispatch(link, "_update", { current: currentEl }, {});
    });
  }

  // Events
  function handleHover(e: CustomEvent) {
    let parentEl = (e.target as HTMLElement)?.parentElement;
    let menuType = parentEl?.getAttribute("slot") || "unknown";
    setTooltipVisibility(menuType, e.detail.label, e.detail.el);
  }

  function handleMouseLeave() {
    hideTooltip();
  }

  // hide menu item's tooltip when if that menu item has popoverContentSlot shown
  function onDesktopPopoverOpen(e: CustomEvent) {
    _menuItemWithOpenPopover = e.detail.el;
    hideTooltip();
  }

  function onDesktopPopoverClose() {
    _menuItemWithOpenPopover = null;
  }

  // Global shortcut for toggling menu (Ctrl+[)
  function handleWindowKeyDown(e: KeyboardEvent) {
    if (e?.key === "[" && e?.ctrlKey) {
      dispatch(_rootEl, "_toggle", {}, {});
    }
  }

  // Menu-scoped keyboard navigation (only fires when focus is inside menu)
  function handleMenuKeyDown(e: KeyboardEvent) {
    switch (e?.key) {
      case "Escape":
        closeAccountMenu();
        break;
    }
  }

  function handleProfileClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    if (!_showAccountMenu) {
      openAccountMenu();
    } else {
      closeAccountMenu();
    }
  }

  function handleToggleClick(e: Event) {
    e.preventDefault();
    closeAccountMenu();
    window.removeEventListener("click", closeAccountMenu);
    dispatch(_rootEl, "_toggle", {}, { bubbles: true });
  }

  function handleAccountFocusOut(e: FocusEvent) {
    const target = e.relatedTarget as HTMLElement;
    if (target?.closest?.('[slot="account"]') || target?.closest?.(".profile"))
      return;
    closeAccountMenu();
  }

  function handleWindowResize() {
    setMenuScrolling();
  }

  function watchPathChanges(action: () => void): MutationObserver {
    let currentLocation = document.location.href;
    const observer = new MutationObserver((_mutationList) => {
      if (currentLocation !== document.location.href) {
        currentLocation = document.location.href;
        action();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return observer;
  }

  function addEventListeners() {
    _rootEl.addEventListener("_update", setCurrentUrl);
    _rootEl.addEventListener("_mountItem", addMenuLink);
    _rootEl.addEventListener("_hoverItem", handleHover as EventListener);
    _rootEl.addEventListener("_blurItem", hideTooltip);
    _rootEl.addEventListener("_toggle", toggleMenu);
    _rootEl.addEventListener("_groupOpen", () => {
      open = true;
    });
    _rootEl.addEventListener(
      "_desktopPopoverOpen",
      onDesktopPopoverOpen as EventListener,
    );
    _rootEl.addEventListener("_desktopPopoverClose", onDesktopPopoverClose);
    _rootEl.addEventListener("keydown", handleMenuKeyDown); // arrow up/down.. only handled when users focus on the menu
    window.addEventListener("popstate", setCurrentUrl); // watch for hash & browser history changes
    window.addEventListener("keydown", handleWindowKeyDown); // global Ctrl+[ shortcut, even we not focus on the menu
    window.addEventListener("resize", handleWindowResize);
    _rootEl.addEventListener("_mobilePopoverOpen", onMobilePopoverOpen);
    _rootEl.addEventListener("_mobilePopoverClose", onMobilePopoverClose);
    _scrollEl.addEventListener("_scroll", handleMenuScroll);
  }

  function removeEventListeners() {
    window.removeEventListener("popstate", setCurrentUrl);
    window.removeEventListener("keydown", handleWindowKeyDown);
    window.removeEventListener("resize", handleWindowResize);
    document.body.removeEventListener("click", closeAccountMenu);
    _scrollEl?.removeEventListener("_scroll", handleMenuScroll);
  }
</script>

<svelte:window bind:innerWidth={_windowWidth} />

<div
  class="root"
  class:closed={!open}
  class:scrolling={_isScrolling}
  class:at-top={_atTop}
  class:at-bottom={_atBottom}
  class:drawer-open={_mobilePopoverOpen}
  data-testid={testid}
  role="presentation"
  bind:this={_rootEl}
>
  <button
    class="background"
    aria-label="Hide menu"
    data-testid="work-side-menu-background"
    on:click={handleToggleClick}
  />
  <div class="container" bind:this={_containerEl}>
    <header class="top-section">
      {#if url}
        <a href={url} class="header" role="menuitem" data-testid="url">
          <div
            role="img"
            aria-label="GoA Logo"
            class="logo"
            style="--logo-default: url({_logo});"
          ></div>
          <goa-text mt="0" mb="0" class="heading">{heading}</goa-text>
        </a>
      {:else}
        <div class="header">
          <div
            role="img"
            aria-label="GoA Logo"
            class="logo"
            style="--logo-default: url({_logo});"
          ></div>
          <goa-text mt="0" mb="0" class="heading">{heading}</goa-text>
        </div>
      {/if}
    </header>
    <div class="scroll-area">
      <goa-scrollable
        vpadding="0"
        hpadding="0"
        maxheight="100%"
        bind:this={_scrollEl}
      >
        <div
          class="primary-menu"
          role="presentation"
          bind:this={_menuEl}
          on:mouseleave={handleMouseLeave}
        >
          <slot name="primary"></slot>
        </div>
      </goa-scrollable>
    </div>
    <div class="bottom-section">
      {#if $$slots.secondary}
        <div
          class="secondary-menu"
          role="presentation"
          on:mouseleave={handleMouseLeave}
        >
          <slot name="secondary"></slot>
        </div>
      {/if}

      {#if $$slots.account}
        <div
          class="account-menu"
          role="presentation"
          class:show={_showAccountMenu}
          on:mouseleave={handleMouseLeave}
          on:focusout={handleAccountFocusOut}
        >
          <slot name="account"></slot>
        </div>

        <button
          class="profile"
          on:click={handleProfileClick}
          on:focusout={handleAccountFocusOut}
          aria-haspopup="true"
          aria-expanded={_showAccountMenu}
        >
          <div class="profile-image">
            <goa-icon
              size="large"
              type="person-circle"
              fillcolor="var(--goa-color-greyscale-400)"
              arialabel={userName}
            />
          </div>

          <div class="profile-details">
            <div class="profile-name">{userName}</div>
            <div class="profile-secondary">{userSecondaryText}</div>
          </div>
          <div class="profile-chevron">
            <goa-icon size="small" type="chevron-down" />
          </div>
        </button>
      {/if}
      <div class="toggle-menu">
        <button
          class="toggle-button"
          data-testid="toggle-menu"
          on:click={handleToggleClick}
          on:mouseenter={handleToggleHover}
          on:mouseleave={handleMouseLeave}
          aria-label={open ? "Collapse menu" : "Expand menu"}
          bind:this={_toggleButtonEl}
        >
          <goa-icon
            size="small"
            theme="outline"
            type={open ? "arrow-start" : "arrow-end"}
          />
          <span class="toggle-button-label"
            >{open ? "Collapse menu" : "Expand menu"}</span
          >
        </button>
      </div>
    </div>
    <div class="tooltip" bind:this={_tooltipEl} class:show={_showTooltip}>
      {_tooltipLabel}
    </div>
  </div>
</div>

<style>
  :host {
    /* Render the host as a block element with an explicit height so the
       internal layout can fill it. Defaults to 100vh (full-page shell);
       consumers (e.g. GoabWorkspaceLayout) override via the CSS var. */
    display: block;
    height: var(--goa-work-side-menu-height, 100vh);
    --goa-popover-box-shadow: var(
      --goa-work-side-menu-popover-shadow,
      var(--goa-shadow-raised-light)
    );
  }

  :host * {
    box-sizing: border-box;
  }

  :global(::slotted(*)) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--goa-space-xs);
  }

  :global(::slotted(*)):focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: 2px;
  }

  .tooltip,
  .tooltip::before {
    display: none;
  }

  .closed .tooltip {
    position: absolute;
    background-color: var(--goa-color-greyscale-700);
    font: var(--goa-typography-body-xs);
    color: var(--goa-color-text-light);
    border-radius: var(--goa-border-radius-m);
    padding: var(--goa-space-xs) var(--goa-space-s);
    width: max-content;
    white-space: nowrap;
    transform: translateY(-50%);
  }

  .closed .tooltip::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
    border-width: 10px 10px 10px 0;
    border-style: solid;
    border-color: transparent var(--goa-color-greyscale-700) transparent
      transparent;
  }

  .closed .tooltip,
  .closed .tooltip::before {
    display: block;
    opacity: 0;
    visibility: hidden;
    transition:
      visibility 100ms linear,
      opacity 100ms ease-in-out;
  }

  .closed .show.tooltip,
  .closed .show.tooltip::before {
    opacity: 1;
    visibility: visible;
    transition:
      visibility 0ms linear,
      opacity 100ms ease-in-out;
  }

  .root {
    position: relative;
    z-index: 101;
    height: 100%; /* sized by :host via --goa-work-side-menu-height; this 100% keeps the bottom Collapse Menu always visible */
  }

  .background {
    display: none;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    height: 100%;
    width: var(--goa-work-side-menu-width-open, 280px);
    background-color: var(--goa-work-side-menu-color-bg, transparent);
    transition: width 100ms ease-out;
  }

  .scrolling .container {
    width: calc(var(--goa-work-side-menu-width-open, 280px) + 1px);
  }

  .closed .container {
    width: var(--goa-work-side-menu-width-closed, 72px);
  }

  .closed.scrolling .container {
    width: var(--goa-work-side-menu-width-closed, 72px);
  }

  .header {
    container: heading / inline-size;
    height: 32px;
    border-radius: var(
      --goa-work-side-menu-border-radius,
      var(--goa-border-radius-m)
    );
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    margin: var(--goa-space-3xl) var(--goa-space-m) var(--goa-space-m)
      calc(var(--goa-space-m) + var(--goa-space-2xs));
    padding: 0; /* to override goa-text */

    gap: var(--goa-space-s);
    align-items: center;
    text-decoration: none;
    transition: margin 100ms ease-out;
  }

  a.header:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: 2px;
  }

  .top-section {
    border-bottom: var(--goa-work-side-menu-top-section-border);
    box-shadow: var(--goa-work-side-menu-top-section-shadow);
    transition:
      border-bottom-color var(--goa-work-side-menu-transition-duration-medium)
        ease,
      box-shadow var(--goa-work-side-menu-transition-duration-medium) ease;
  }

  .scrolling:not(.at-top) .top-section {
    border-bottom: var(--goa-work-side-menu-top-section-border-scrolled);
    box-shadow: var(--goa-work-side-menu-top-section-shadow-scrolled);
  }

  .logo {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    background-image: var(--goa-work-side-menu-logo, var(--logo-default));
    background-size: contain;
    background-repeat: no-repeat;
  }

  .heading {
    display: block;
    visibility: visible;
    opacity: 1;
    animation: delayText 100ms;
    font-size: var(--goa-font-size-2);
    line-height: 1.4;
    font-weight: var(--goa-font-weight-medium);
    color: var(--goa-color-text-default);
  }

  .closed .heading {
    display: none;
    visibility: hidden;
    opacity: 0;
    animation: none;
  }

  .scroll-area {
    flex: 1 1 0;
    min-height: 0;
    overflow: hidden;
  }

  .scroll-area goa-scrollable {
    display: block;
    /* 3px offsets goa-scrollable's internal bottom padding */
    height: calc(100% - 3px);
  }

  .primary-menu {
    padding: var(--goa-space-m) var(--goa-space-m) 0;
  }

  .bottom-section {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-top: var(--goa-work-side-menu-bottom-section-border);
    box-shadow: var(--goa-work-side-menu-bottom-section-shadow);
    transition:
      border-top-color var(--goa-work-side-menu-transition-duration-medium) ease,
      box-shadow var(--goa-work-side-menu-transition-duration-medium) ease;
  }

  .scrolling:not(.at-bottom) .bottom-section {
    border-top: var(--goa-work-side-menu-bottom-section-border-scrolled);
    box-shadow: var(--goa-work-side-menu-bottom-section-shadow-scrolled);
  }

  .secondary-menu {
    padding: var(--goa-space-xs) var(--goa-space-m) 0;
  }

  .account-menu {
    visibility: hidden;
    opacity: 0;
    background: var(
      --goa-work-side-menu-account-bg,
      var(--goa-color-greyscale-white)
    );
    box-shadow: var(
      --goa-work-side-menu-account-shadow,
      0px 12px 20px -8px rgba(26, 26, 26, 0.24)
    );
    border-radius: var(
      --goa-work-side-menu-border-radius,
      var(--goa-border-radius-m)
    );
    padding: var(--goa-space-2xs);
    position: fixed;
    left: var(--goa-space-s);
    bottom: 140px;
    width: 256px;
    z-index: 2;
    transition: opacity 100ms ease-in-out;
  }

  .account-menu.show {
    visibility: visible;
    opacity: 1;
  }

  .closed .account-menu {
    left: 6px;
  }

  .profile {
    display: flex;
    overflow: hidden;
    align-items: center;
    flex-shrink: 0;
    border: var(
      --goa-work-side-menu-border,
      var(--goa-border-width-s) solid var(--goa-color-greyscale-200)
    );
    background-color: transparent;
    padding: var(--goa-space-xs);
    margin: var(--goa-space-xs) var(--goa-space-m) var(--goa-space-m);
    border-radius: var(
      --goa-work-side-menu-border-radius,
      var(--goa-border-radius-m)
    );
    gap: calc(var(--goa-space-xs) + 1px);
    min-height: 44px;
    color: var(--goa-work-side-menu-text-color, var(--goa-color-greyscale-600));
    cursor: pointer;
  }

  .profile:hover {
    background-color: var(--goa-color-greyscale-100);
    color: var(
      --goa-work-side-menu-item-text-color-hover,
      var(--goa-color-text-default)
    );
  }

  .profile:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: 2px;
  }

  .closed .profile {
    padding: var(--goa-space-xs);
    width: 44px;
    height: 44px;
  }

  .profile-details {
    flex-grow: 1;
    overflow: hidden;
  }

  .profile-image {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    border-radius: var(--goa-space-xl);
    width: var(--goa-space-l);
    height: var(--goa-space-l);
    overflow: hidden;
  }

  .profile-name {
    font-size: var(--goa-font-size-2);
    font-weight: var(--goa-font-weight-medium);
    margin-bottom: var(--goa-space-2xs);
    line-height: 1.4;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    animation: delayText 100ms;
  }

  .profile-secondary {
    font-size: var(--goa-font-size-1);
    line-height: 1;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    animation: delayText 100ms;
  }

  .profile-chevron {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: var(--goa-space-xl);
    height: var(--goa-space-xl);
    animation: delayText 100ms;
  }

  .closed .profile-details,
  .closed .profile-chevron {
    display: none;
  }

  /* Toggle button */

  .toggle-menu {
    container-type: inline-size;
    position: relative;
    padding: 0 var(--goa-space-m) 0;
    margin-bottom: var(--goa-space-2xs);
  }

  .toggle-button {
    position: relative;
    display: flex;
    gap: var(--goa-space-m);
    border-radius: var(
      --goa-work-side-menu-item-border-radius,
      var(--goa-border-radius-m)
    );
    text-decoration: none;
    align-items: center;
    padding: var(
      --goa-work-side-menu-item-padding,
      var(--goa-space-xs) var(--goa-space-xs) var(--goa-space-xs)
        var(--goa-space-s)
    );
    color: var(
      --goa-work-side-menu-item-text-color,
      var(--goa-color-greyscale-600)
    );
    min-height: 40px;
    width: 100%;
    background: none;
    border: none;
    text-align: left;
  }

  .toggle-button:hover {
    background: var(
      --goa-work-side-toggle-color-bg-hover,
      var(--goa-color-greyscale-100)
    );
    color: var(
      --goa-work-side-menu-item-text-color-hover,
      var(--goa-color-text-default)
    );
    cursor: pointer;
  }

  .toggle-button:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: 2px;
  }

  .toggle-button-label {
    flex-grow: 1;
    font: var(
      --goa-work-side-menu-item-text-size,
      var(--goa-typography-body-s)
    );
  }

  @container (max-width: 160px) {
    .toggle-button {
      height: 36px;
      margin: 0;
      align-items: center;
      padding-left: calc(var(--goa-space-xs) + 2px);
    }

    .toggle-button-label {
      display: none;
    }
  }

  /* Mobile */

  @media (--mobile) {
    .root {
      visibility: visible;
      opacity: 1;
      background-color: transparent;
      position: fixed;
      inset: 0;
      z-index: 998;
    }

    .root.closed {
      visibility: hidden;
      opacity: 0;
    }

    /* Hide menu when drawer is open (drawer is rendered on document.body) */
    .root.drawer-open {
      visibility: hidden;
      opacity: 0;
    }

    .background {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 999;
      border: none;
      background-color: var(--goa-color-greyscale-400);
      opacity: 0.3;
    }

    .container {
      position: fixed;
      z-index: 9999;
      display: flex;
      margin-left: 0;
      background-color: var(
        --goa-work-side-menu-mobile-bg,
        var(--goa-color-greyscale-50)
      );
    }
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

  @keyframes delayVisibility {
    0% {
      visibility: hidden;
    }
    99% {
      visibility: hidden;
    }
    100% {
      visibility: visible;
    }
  }

  @media (--mobile) {
    :host {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 200; /* > burger menu z-index, < drawer and modal z-index */
    }
  }
</style>
