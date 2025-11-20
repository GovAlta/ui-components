<svelte:options
  customElement={{
    tag: "goa-work-side-menu",
    props: {
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
  import { dispatch, performOnce } from "../../common/utils";
  import {
    getMatchedLink,
    watchPathChanges,
    stopWatchingPathChanges,
  } from "../../common/urls";
  import { onMount, onDestroy, tick } from "svelte";

  // ******
  // Public
  // ******

  export let heading: string;
  export let url: string;
  export let userName: string;
  export let userSecondaryText: string;
  export let open = false;

  // optional
  export let testid: string = "";

  // *******
  // Private
  // *******

  let _isScrolling = false;
  let _showAccountMenu = false;
  let _showTooltip = false;

  let _focusedIndex: number = -1;
  let _focusItems: HTMLElement[] = [];

  let _menuEl: HTMLElement;
  let _menuLinks: HTMLElement[] = [];
  let _rootEl: HTMLElement;
  let _scrollEl: HTMLElement;
  let _tooltipEl: HTMLElement;
  let _profileButtonEl: HTMLElement;
  let _toggleButtonEl: HTMLElement;
  let _tooltipLabel: string = "";

  let _bindTimeoutId: any;
  let _mouseEnterTimeoutId: any;
  let _mouseLeaveTimeoutId: any;

  let _windowWidth = window.innerWidth;

  let observer: MutationObserver | null = null;

  const _logo =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none'%3E%3Crect width='31.695' height='31.688' x='.028' fill='%2300B6ED' rx='4'/%3E%3Cg clip-path='url(%23a)'%3E%3Cmask id='b' width='47' height='39' x='-11' y='-2' maskUnits='userSpaceOnUse' style='mask-type:alpha'%3E%3Cpath fill='%23545860' d='M22.017 31.103a63.47 63.47 0 0 1-7.22-3.164 52.41 52.41 0 0 0 6.195-2.724 43.148 43.148 0 0 0 1.023 5.89m13.27-24.392c-1.034-.13-.497.348-.785 1.7-1.246 5.832-6.05 10.035-10.873 12.855-.506-6.678-.3-14.093.967-18.636 1.069-3.836 2.34-3.132.763-3.938-1.66-.848-3.44.273-4.882 3.13C19.033 4.68 12.393 20.19 1.78 30.664c-5.43 5.36-10.34 2.6-11.323 1.775-.8-.67-1.096.365-.103 1.426 4.39 4.7 10.805 2.003 13.141-.314 6.455-6.405 13.96-20.193 16.996-26.044a89.89 89.89 0 0 0 .243 15.294 44.69 44.69 0 0 1-7.619 2.885c-1.504.391-2.435 1-2.462 1.691-.03.758.98 1.397 2.44 2.085 2.6 1.226 10.216 4.798 12.093 5.878 1.606.925 2.39.204 2.866-.796.622-1.302-1.083-2.054-2.735-2.545a50.47 50.47 0 0 1-1.48-8.385c3.87-2.365 7.682-5.52 9.88-9.452a18.004 18.004 0 0 0 1.568-4.365c.23-.934.293-1.9.186-2.855 0 0-.03-.209-.186-.229'/%3E%3C/mask%3E%3Cg mask='url(%23b)'%3E%3Crect width='31.695' height='31.695' x='.028' fill='%23fff' rx='3.048'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Crect width='32' height='31.992' y='.008' fill='%23fff' rx='4'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";

  // *****
  // Hooks
  // *****

  onMount(async () => {
    await tick();
    addEventListeners();
    watchPathChanges(observer, setCurrentUrl);
  });

  onDestroy(() => {
    removeEventListeners();
    stopWatchingPathChanges(observer);
  });

  // *********
  // Functions
  // *********

  // Menu
  function setMenuScrolling() {
    _isScrolling =
      (_menuEl?.scrollHeight || 0) > (_scrollEl?.clientHeight || 0);
  }

  function toggleMenu() {
    open = !open;
    _showTooltip = false;
  }

  function getShadowLinkEl(el: Element): HTMLAnchorElement | null | undefined {
    if (el.tagName.includes("GOABX")) el = el.firstElementChild as Element;
    return el?.shadowRoot?.querySelector("a");
  }

  // Menu links
  function addMenuLink(e: Event) {
    let el = e.target as Element;
    let link = getShadowLinkEl(el);
    if (el && link) {
      _menuLinks = [..._menuLinks, link];
    }

    // set URL, check scrolling, and get focusable items after all menu links are added
    performOnce(
      _bindTimeoutId,
      () => {
        setCurrentUrl();
        setMenuScrolling();
        getFocusItems();
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
    if (!open && menuType !== "account") {
      updateTooltip(label, el);
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

  function updateTooltip(label: string, el: HTMLElement) {
    let top = el.getBoundingClientRect().top - 2;
    _tooltipEl.style.top = `${top}px`;
    _tooltipLabel = label;
  }

  function hideTooltip() {
    clearTimeout(_mouseLeaveTimeoutId);
    _mouseLeaveTimeoutId = setTimeout(() => {
      _showTooltip = false;
    }, 300);
  }

  // Account menu
  function closeAccountMenu(e: Event) {
    _showAccountMenu = false;
    window.removeEventListener("click", closeAccountMenu);
  }

  // Current menu item
  function setCurrentUrl() {
    const currentEl = getMatchedLink(_menuLinks, window.location);
    _menuLinks.forEach((link) => {
      dispatch(link, "work-side-menu-item:update", { current: currentEl }, {});
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

  function handleKeyDown(e: KeyboardEvent) {
    switch (e?.key) {
      case "ArrowDown":
        onArrow(e, "down");
        break;
      case "ArrowUp":
        onArrow(e, "up");
        break;
      case "[":
        if (e?.ctrlKey) dispatch(_rootEl, "work-side-menu:toggle", {}, {});
        break;
      case "Escape":
        if (_showAccountMenu) {
          _showAccountMenu = false;
          window.removeEventListener("click", closeAccountMenu);
        }
        break;
    }
  }

  function onArrow(e: KeyboardEvent, direction: "up" | "down") {
    changeFocusedMenuItem(direction === "up" ? -1 : 1);
  }

  function isFocusable(element: HTMLElement): boolean {
    // Check if element has tabindex >= 0 or is naturally focusable
    const tabindex = element.getAttribute("tabindex");
    if (tabindex !== null && parseInt(tabindex) >= 0) {
      return true;
    }

    const focusableElements = [
      "WORK-SIDE-MENU-ITEM",
      "A",
      "BUTTON",
      "INPUT",
      "SELECT",
      "TEXTAREA",
    ];
    if (focusableElements.some((tag) => element.tagName.includes(tag))) {
      return !element.hasAttribute("disabled");
    }

    return false;
  }

  function getMenuSlotItems(slotName: string): HTMLElement[] {
    let slot = _menuEl.querySelector(
      `slot[name='${slotName}']`,
    ) as HTMLSlotElement;
    if (!slot) return [];
    let assignedNodes = slot.assignedElements({ flatten: true });
    let items: HTMLElement[] = [];
    assignedNodes.forEach((node) => {
      Array.from(node.children).forEach((child) => {
        const element = child as HTMLElement;
        if (isFocusable(element)) {
          items.push(element);
        }
      });
    });
    return items;
  }

  function getFocusItems() {
    _focusItems = [
      ...getMenuSlotItems("primary"),
      ...getMenuSlotItems("secondary"),
      _profileButtonEl,
      ...getMenuSlotItems("account"),
      _toggleButtonEl,
    ];
  }

  function changeFocusedMenuItem(offset: number) {
    let oldItem = _focusItems[_focusedIndex];
    let index = _focusedIndex;
    index += offset;
    if (index < 0) {
      index = _focusItems.length - 1;
    } else if (index >= _focusItems.length) {
      index = 0;
    }

    _focusedIndex = index;
    let newItem = _focusItems[_focusedIndex];

    if (oldItem === _profileButtonEl && offset > 0 && !_showAccountMenu) {
      setFocusedIndexToElement(_toggleButtonEl);
    }

    if (oldItem === _toggleButtonEl && offset < 0 && !_showAccountMenu) {
      setFocusedIndexToElement(_profileButtonEl);
    }

    if (newItem === _profileButtonEl && offset < 0 && _showAccountMenu) {
      _showAccountMenu = false;
    }

    if (newItem === _toggleButtonEl && offset > 0 && _showAccountMenu) {
      _showAccountMenu = false;
    }

    tick().then(() => {
      focusOnMenuItem(newItem);
    });
  }

  function setFocusedIndexToElement(el: HTMLElement) {
    const index = _focusItems.indexOf(el);
    _focusedIndex = index !== -1 ? index : -1;
    focusOnMenuItem(el);
  }

  function focusOnMenuItem(el: HTMLElement) {
    if (el.tagName.includes("WORK-SIDE-MENU-ITEM")) {
      let link = getShadowLinkEl(el);
      link?.focus();
    } else {
      el.focus();
    }
  }

  function handleProfileClick(e: Event) {
    e.preventDefault();
    _showAccountMenu = !_showAccountMenu;
    if (_showAccountMenu) {
      setTimeout(() => {
        window.addEventListener("click", closeAccountMenu);
        let firstAccountItem =
          _focusItems[_focusItems.indexOf(_profileButtonEl) + 1];
        setFocusedIndexToElement(firstAccountItem);
      }, 10);
    }
  }

  function handleToggleClick(e: Event) {
    e.preventDefault();
    _showAccountMenu = false;
    window.removeEventListener("click", closeAccountMenu);
    dispatch(_rootEl, "work-side-menu:toggle", {}, { bubbles: true });
  }

  function handleWindowResize() {
    setMenuScrolling();
  }

  function addEventListeners() {
    _rootEl.addEventListener("work-side-menu:update", setCurrentUrl);
    _rootEl.addEventListener("work-side-menu-item:mount", addMenuLink);
    _rootEl.addEventListener(
      "work-side-menu-item:hover",
      handleHover as EventListener,
    );
    _rootEl.addEventListener("work-side-menu:toggle", toggleMenu);
    window.addEventListener("popstate", setCurrentUrl); // watch for hash & browser history changes
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleWindowResize);
  }

  function removeEventListeners() {
    _rootEl.removeEventListener("work-side-menu:update", setCurrentUrl);
    _rootEl.removeEventListener("work-side-menu-item:mount", addMenuLink);
    _rootEl.removeEventListener(
      "work-side-menu-item:hover",
      handleHover as EventListener,
    );
    _rootEl.removeEventListener("work-side-menu:toggle", toggleMenu);
    window.removeEventListener("popstate", setCurrentUrl);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("resize", handleWindowResize);
  }
</script>

<div
  class="root"
  class:closed={!open}
  class:scrolling={_isScrolling}
  data-testid={testid}
  bind:this={_rootEl}
  role="none"
>
  <button
    class="background"
    aria-label="Hide menu"
    data-testid="work-side-menu-background"
    on:click={handleToggleClick}
  />
  <div class="container">
    <header>
      {#if url}
        <a href={url} class="header" role="menuitem" data-testid="url">
          <img alt="GoA Logo" class="logo" src={_logo} />
          <goa-text mt="0" mb="0" class="heading">{heading}</goa-text>
        </a>
      {:else}
        <div class="header">
          <img alt="GoA Logo" class="logo" src={_logo} />
          <goa-text mt="0" mb="0" class="heading">{heading}</goa-text>
        </div>
      {/if}
    </header>
    <goa-scrollable
      vpadding="0"
      hpadding="0"
      maxheight="calc(100vh - 137px)"
      bind:this={_scrollEl}
    >
      <nav class="menu" role="none" bind:this={_menuEl}>
        <div class="primary-menu" role="none" on:mouseleave={handleMouseLeave}>
          <slot name="primary"></slot>
        </div>

        {#if $$slots.secondary}
          <div
            class="secondary-menu"
            role="none"
            on:mouseleave={handleMouseLeave}
          >
            <slot name="secondary"></slot>
          </div>
        {/if}

        {#if $$slots.account}
          <div
            class="account-menu"
            role="none"
            class:show={_showAccountMenu}
            on:mouseleave={handleMouseLeave}
          >
            <slot name="account"></slot>
          </div>

          <button
            class="profile"
            on:click={handleProfileClick}
            aria-haspopup="true"
            aria-expanded={_showAccountMenu}
            bind:this={_profileButtonEl}
          >
            <div class="profile-image">
              <goa-icon
                size="large"
                type="person-circle"
                fillcolor="var(--goa-color-greyscale-400)"
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
      </nav>
    </goa-scrollable>
    <div class="tooltip" bind:this={_tooltipEl} class:show={_showTooltip}>
      {_tooltipLabel}
    </div>
  </div>
</div>

<style>
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
    position: fixed;
    left: var(--goa-space-3xl);
    background-color: var(--goa-color-greyscale-700);
    font: var(--goa-typography-body-xs);
    color: var(--goa-color-text-light);
    border-radius: var(--goa-border-radius-m);
    padding: var(--goa-space-xs) var(--goa-space-s);
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
    z-index: 2;
    height: 100vh;
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
    border-bottom: 1px solid transparent;
    text-decoration: none;
    transition: margin 100ms ease-out;
  }

  a.header:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: 2px;
  }

  .scrolling header {
    border-bottom: var(
      --goa-work-side-menu-border,
      var(--goa-border-width-s) solid var(--goa-color-greyscale-200)
    );
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

  .menu {
    display: flex;
    position: relative;
    flex-grow: 1;
    min-height: calc(100vh - 137px);
    flex-direction: column;
    align-items: stretch;
    transition: padding 100ms ease-out;
  }

  .primary-menu {
    flex: 1 0 min-content;
    padding: var(--goa-space-m) var(--goa-space-m) 0;
  }
  .secondary-menu {
    margin: var(--goa-space-xs) 0 0;
    padding: var(--goa-space-m) var(--goa-space-m) 0;
  }

  .account-menu {
    visibility: hidden;
    opacity: 0;
    background: var(--goa-color-greyscale-white);
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
</style>
