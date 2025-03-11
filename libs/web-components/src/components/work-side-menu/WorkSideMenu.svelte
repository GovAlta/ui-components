<svelte:options customElement="goa-work-side-menu" />

<script lang="ts">
  import { MOBILE_BP } from "../../common/breakpoints";
  import { dispatch, style } from "../../common/utils";
  import { isUrlMatch, getMatchedLink } from "../../common/urls";
  import { onMount, onDestroy, tick } from "svelte";

  // ******
  // Public
  // ******

  export let title: string;
  export let url: string;
  export let username: string = "Account menu";
  export let useremail: string = "";

  // optional
  export let testid: string = "";

  // *******
  // Private
  // *******

  let _isHovering = false;
  let _isClosed = false;
  let _isScrolling = false;
  let _showToggle = true;
  let _showTooltip = false;
  let _showAccountMenu = false;
  let _windowWidth = window.innerWidth;
  let _rootEl: HTMLElement;
  let _menuEl: HTMLElement;
  let _tooltipEl: HTMLElement;
  let _tooltipLabel: string = "";
  let _scrollEl: HTMLElement;
  let _bindTimeoutId: any;
  let _mouseEnterTimeoutId: any;
  let _mouseLeaveTimeoutId: any;
  let _toggleButtonPosition: number = 300;
  let _menuLinks: HTMLElement[] = [];
  let observer: MutationObserver | null = null;
  const _logo =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32' height='32' viewBox='0 0 16 16'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:none;%7D.b%7Bfill:%2300aad2;%7D.c%7Bclip-path:url(%23a);%7D.d%7Bfill:%23fff;%7D%3C/style%3E%3CclipPath id='a'%3E%3Crect class='a' width='14' height='14' transform='translate(-0.345 -0.21)'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg transform='translate(0 -0.135)'%3E%3Ccircle class='b' cx='8' cy='8' r='8' transform='translate(0 0.135)'/%3E%3Cg transform='translate(1.345 1.344)'%3E%3Cg class='c' transform='translate(0 0)'%3E%3Cpath class='d' d='M12.612,13.636a16.24,16.24,0,0,1-1.86-.822,13.436,13.436,0,0,0,1.6-.708,11.312,11.312,0,0,0,.264,1.53M16.032,7.3c-.266-.034-.128.091-.2.442a5.465,5.465,0,0,1-2.8,3.338,16.141,16.141,0,0,1,.249-4.84c.275-1,.6-.813.2-1.022-.427-.22-.887.071-1.258.813A27.247,27.247,0,0,1,7.4,13.522a2.141,2.141,0,0,1-2.918.461c-.206-.174-.282.095-.026.37a2.412,2.412,0,0,0,3.387-.082A32.715,32.715,0,0,0,12.219,7.51a23.541,23.541,0,0,0,.063,3.971,11.464,11.464,0,0,1-1.964.749c-.388.1-.628.26-.635.439-.007.2.253.363.63.541.67.318,2.633,1.246,3.117,1.527.414.24.616.053.739-.207.16-.338-.279-.533-.7-.661a13.175,13.175,0,0,1-.382-2.179,7.143,7.143,0,0,0,2.547-2.454,4.7,4.7,0,0,0,.4-1.133,2.125,2.125,0,0,0,.048-.742s-.007-.054-.048-.059' transform='translate(-3.51 -3.943)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  // ========
  // Reactive
  // ========

  $: _mobile = _windowWidth < MOBILE_BP;

  // *****
  // Hooks
  // *****

  onMount(async () => {
    await tick();
    addEventListeners();
    watchPathChanges();
    setToggleButtonPosition();
  });

  onDestroy(() => {
    removeEventListeners();
    stopWatchingPathChanges();
  });

  // *********
  // Functions
  // *********

  // Menu
  function setMenuScrolling() {
    _isScrolling = _menuEl.scrollHeight > _scrollEl.clientHeight;
  }

  function toggleMenu() {
    _isClosed = !_isClosed;
    _showTooltip = false;
  }

  // Menu links
  function addMenuLink(e: Event) {
    let el = e.target as Element;
    let link = el?.shadowRoot.querySelector("a");
    if (isDuplicateLink(link)) {
      console.warn("Duplicate menu link href found: ", link);
      return;
    }
    if (el) {
      _menuLinks.push(link);
    }

    // set URL and check scrolling after all menu links are added
    if (_bindTimeoutId) {
      clearTimeout(_bindTimeoutId);
    }

    _bindTimeoutId = setTimeout(() => {
      setCurrentUrl();
      setMenuScrolling();
    }, 1);
  }

  function isDuplicateLink(link: HTMLAnchorElement) {
    return (
      _menuLinks.findIndex(
        (el) => el.getAttribute("href") === link.getAttribute("href"),
      ) !== -1
    );
  }

  // Tooltip
  function setTooltipVisibility(
    menuType: string,
    label: string,
    el: HTMLElement,
  ) {
    if (_isClosed && menuType !== "account") {
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
    let top = el.getBoundingClientRect().top - 4;
    _tooltipEl.style.top = `${top}px`;
    _tooltipLabel = label;
  }

  function hideTooltip() {
    clearTimeout(_mouseLeaveTimeoutId);
    _mouseLeaveTimeoutId = setTimeout(() => {
      _showTooltip = false;
    }, 300);
  }

  // Toggle button
  function setToggleButtonVisibility(xPos: number) {
    if ((_isClosed && xPos < 72) || (!_isClosed && xPos < 270)) {
      _showToggle = true;
      _isHovering = true;
    } else {
      _isHovering = false;
      setTimeout(() => {
        if (_isHovering === false) _showToggle = false;
      }, 300);
    }
  }

  function setToggleButtonPosition() {
    // keep the button visible for short viewports
    _toggleButtonPosition =
      window.innerHeight > 416 ? 300 : window.innerHeight - 116;
  }

  // Account menu
  function closeAccountMenu(e: Event) {
    let el = e.target as Element;
    if (el.tagName !== "GOA-WORK-SIDE-MENU") {
      _showAccountMenu = false;
      window.removeEventListener("click", closeAccountMenu);
    }
  }

  // Keyboard navigation
  function focusNextMenuItem() {
    const activeLink = document.activeElement?.shadowRoot?.querySelector("a");
    let index = _menuLinks.indexOf(activeLink);
    let next = getAdjacentFocusableMenuItem(index, 1);
    if (next) {
      next.focus();
    }
  }

  function focusPreviousMenuItem() {
    const activeLink = document.activeElement?.shadowRoot?.querySelector("a");
    let index = _menuLinks.indexOf(activeLink);
    let prev = getAdjacentFocusableMenuItem(index, -1);
    if (prev) {
      prev.focus();
    }
  }

  function getAdjacentFocusableMenuItem(index: number, step: number = 1) {
    for (let i = 0; i < _menuLinks.length; i++) {
      index += step;
      if (index < 0) index = _menuLinks.length - 1; // loop back to the end
      if (index >= _menuLinks.length) index = 0; // loop back to the beginning
      if (_menuLinks[index].offsetParent !== null) {
        return _menuLinks[index];
      }
    }
  }

  // Current menu item
  function setCurrentUrl() {
    const currentEl = getMatchedLink(_menuLinks, window.location);
    _menuLinks.forEach((link) => {
      dispatch(link, "work-side-menu-item:update", { current: currentEl }, {});
    });
  }

  function watchPathChanges() {
    let currentLocation = document.location.href;
    observer = new MutationObserver((_mutationList) => {
      if (isUrlMatch(document.location, currentLocation)) {
        currentLocation = document.location.href;
        setCurrentUrl();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function stopWatchingPathChanges() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  // Events
  function handleHover(e: CustomEvent) {
    let parentEl = (e.target as HTMLElement)?.parentElement;
    let menuType = parentEl?.getAttribute("slot");
    setTooltipVisibility(menuType, e.detail.label, e.detail.el);
  }

  function handleMouseLeave() {
    hideTooltip();
  }

  function handleMouseMove(e: MouseEvent) {
    setToggleButtonVisibility(e.clientX);
  }

  function handleKeyDown(e: KeyboardEvent) {
    switch (e?.key) {
      case "ArrowDown":
        focusNextMenuItem();
        break;
      case "ArrowUp":
        focusPreviousMenuItem();
        break;
      case "[":
        if (e?.ctrlKey) dispatch(_rootEl, "work-side-menu:toggle", {}, {});
        break;
    }
  }

  function handleProfileClick(e: Event) {
    e.preventDefault();
    _showAccountMenu = !_showAccountMenu;
    if (_showAccountMenu) {
      setTimeout(() => window.addEventListener("click", closeAccountMenu), 10);
    }
  }

  function handleToggleClick(e: Event) {
    e.preventDefault();
    dispatch(_rootEl, "work-side-menu:toggle", {}, { bubbles: true });
  }

  function handleWindowResize() {
    setMenuScrolling();
    setToggleButtonPosition();
  }

  function addEventListeners() {
    _rootEl.addEventListener("work-side-menu:update", setCurrentUrl);
    _rootEl.addEventListener("work-side-menu-item:mount", addMenuLink);
    _rootEl.addEventListener("work-side-menu-item:hover", handleHover);
    _rootEl.addEventListener("work-side-menu:toggle", toggleMenu);
    window.addEventListener("popstate", setCurrentUrl); // watch for hash & browser history changes
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleWindowResize);
  }

  function removeEventListeners() {
    _rootEl.removeEventListener("work-side-menu:update", setCurrentUrl);
    _rootEl.removeEventListener("work-side-menu-item:mount", addMenuLink);
    _rootEl.removeEventListener("work-side-menu-item:hover", handleHover);
    _rootEl.removeEventListener("work-side-menu:toggle", toggleMenu);
    window.removeEventListener("popstate", setCurrentUrl);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("resize", handleWindowResize);
  }
</script>

<svelte:window bind:innerWidth={_windowWidth} on:mousemove={handleMouseMove} />

<div
  class="root"
  class:closed={_isClosed}
  class:scrolling={_isScrolling}
  class:mobile={_mobile}
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
          <img alt="GoA Logo" class="image-mobile" src={_logo} />
          <h1 class="title">{title}</h1>
        </a>
      {:else}
        <div class="header">
          <img alt="GoA Logo" class="image-mobile" src={_logo} />
          <h1 class="title">{title}</h1>
        </div>
      {/if}
    </header>
    <goa-scrollable
      vpadding="0"
      hpadding="0"
      maxheight="calc(100vh - 60px)"
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

          <button class="profile" on:click={handleProfileClick}>
            <div class="profile-image">
              <goa-icon
                size="large"
                type="person-circle"
                fillcolor="white"
                title="Profile image"
                arialabel="profile image"
              />
            </div>

            <div class="profile-details">
              <div class="profile-name">{username}</div>
              {#if useremail}
                <div class="profile-email">{useremail}</div>
              {/if}
            </div>
            <div class="profile-chevron" aria-hidden="true">
              <goa-icon size="medium" type="chevron-down" />
            </div>
          </button>
        {/if}
      </nav>
    </goa-scrollable>
    <div class="tooltip" bind:this={_tooltipEl} class:show={_showTooltip}>
      {_tooltipLabel}
    </div>
    <div
      class="toggle"
      style={style("bottom", `${_toggleButtonPosition}px`)}
      class:show={_showToggle}
      data-testid="work-side-menu-toggle"
    >
      <button
        class="toggle-button"
        aria-label={_isClosed ? "Expand menu" : "Collapse menu"}
        data-testid="work-side-menu-toggle-button"
        on:click={handleToggleClick}
      >
        <div aria-hidden="true">
          <goa-icon
            size="small"
            type={_isClosed ? "chevron-forward" : "chevron-back"}
          />
        </div>
      </button>
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
  }

  .tooltip,
  .tooltip::before {
    display: none;
  }

  .closed .tooltip {
    position: fixed;
    left: 52px;
    background-color: var(--goa-color-greyscale-700);
    font: var(--goa-typography-body-xs);
    color: var(--goa-color-text-light);
    border-radius: var(--goa-border-radius-m);
    padding: var(--goa-space-xs) var(--goa-space-s);
  }

  .closed .tooltip::before {
    content: "";
    position: absolute;
    border-style: solid;
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
    width: var(--goa-work-side-menu-width-open, 245px);
    background-color: var(
      --goa-work-side-menu-color-bg,
      var(--goa-color-greyscale-white)
    );
    border-right: var(
      --goa-work-side-menu-border,
      var(--goa-border-width-s) solid var(--goa-color-greyscale-200)
    );
    background-color: var(
      --goa-work-side-menu-color-bg,
      var(--goa-color-greyscale-white)
    );
    box-shadow: var(
      --goa-work-side-menu-shadow,
      0px 4px 6px -2px rgba(26, 26, 26, 0.2)
    );
    transition: width 100ms ease-out;
  }

  .scrolling .container {
    width: calc(var(--goa-work-side-menu-width-open, 245px) + 1px);
  }

  .closed .container {
    width: var(--goa-work-side-menu-width-closed, 49px);
  }

  .closed.scrolling .container {
    width: var(--goa-work-side-menu-width-closed, 49px);
  }

  .header {
    container: heading / inline-size;
    display: flex;
    height: 60px;
    padding: var(--goa-space-m) calc(var(--goa-space-l) - 4px)
      var(--goa-space-s);
    gap: var(--goa-space-s);
    align-items: center;
    border-bottom: var(--goa-border-width-s) solid
      var(--goa-color-greyscale-200);
    text-decoration: none;
    transition: padding 100ms ease-out;
  }

  a.header:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  .title {
    display: block;
    font-size: var(--goa-font-size-2);
    line-height: 1.2;
    font-weight: 600;
    color: var(--goa-color-greyscale-900, #474747);
    margin: 0;
    visibility: visible;
    opacity: 1;
    animation: delayText 100ms;
  }

  .closed .header {
    padding: var(--goa-space-m) var(--goa-space-xs) var(--goa-space-s);
  }

  .closed .title {
    display: none;
    visibility: hidden;
    opacity: 0;
    animation: none;
  }

  .menu {
    display: flex;
    position: relative;
    flex-grow: 1;
    min-height: calc(100vh - 60px);
    flex-direction: column;
    align-items: stretch;
    padding: var(--goa-space-l) var(--goa-space-s);
    transition: padding 100ms ease-out;
  }

  .closed .menu {
    padding: var(--goa-space-l) var(--goa-space-2xs);
  }

  .primary-menu {
    flex: 1 0 min-content;
  }

  .secondary-menu {
    border-top: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    margin: var(--goa-space-xs) 0 0;
    padding-top: var(--goa-space-m);
  }

  .toggle {
    position: absolute;
    right: calc(-1 * var(--goa-space-m));
    bottom: 320px;
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0s linear 200ms,
      opacity 200ms;
  }

  .toggle.show {
    visibility: visible;
    opacity: 1;
  }

  .toggle-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--goa-color-greyscale-white);
    border-radius: var(--goa-work-side-menu-border-radius, 8px);
    cursor: pointer;
    height: var(--goa-space-xl);
    width: var(--goa-space-xl);
    border: var(
      --goa-work-side-menu-toggle-border,
      1px solid var(--goa-color-greyscale-200)
    );
    box-shadow: var(
      --goa-work-side-menu-toggle-shadow,
      0px 1px 0px 0px rgba(26, 26, 26, 0.2)
    );
    color: var(--goa-color-interactive-default);
    background-color: var(--goa-color-greyscale-white);
    transition: color 100ms ease-in-out;
  }

  .toggle-button:hover {
    color: var(--goa-color-interactive-hover);
    background-color: var(--goa-color-greyscale-200);
  }

  .toggle-button:focus-visible {
    visibility: visible;
    opacity: 1;
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  .account-menu {
    visibility: hidden;
    opacity: 0;
    background: var(--goa-color-greyscale-white);
    box-shadow: var(
      --goa-work-side-menu-account-shadow,
      0px 12px 20px -8px rgba(26, 26, 26, 0.2)
    );
    border-radius: var(--goa-work-side-menu-border-radius, 8px);
    border: var(
      --goa-work-side-menu-toggle-border,
      1px solid var(--goa-color-greyscale-200)
    );
    padding: var(--goa-space-2xs);
    position: fixed;
    left: 6px;
    bottom: 78px;
    width: 230px;
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
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    background-color: var(--goa-color-greyscale-white);
    margin-top: var(--goa-space-xs);
    padding: var(--goa-space-xs);
    border-radius: var(--goa-work-side-menu-border-radius, 8px);
    gap: var(--goa-space-xs);
    cursor: pointer;
  }

  .profile:hover {
    background-color: var(--goa-color-greyscale-100);
  }

  .profile:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  .closed .profile {
    padding: calc(var(--goa-space-xs) + 1px) var(--goa-space-2xs)
      calc(var(--goa-space-xs) + 1px);
    border: none;
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
    background-color: var(--goa-color-greyscale-400);
    border-radius: var(--goa-space-xl);
    width: var(--goa-space-xl);
    height: var(--goa-space-xl);
    overflow: hidden;
  }

  .profile-name {
    font-size: var(--goa-font-size-2);
    line-height: 1.2;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    animation: delayText 100ms;
  }

  .profile-email {
    font-size: calc(var(--goa-font-size-1) - 1px);
    line-height: 1;
    color: var(--goa-color-text-secondary);
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
    color: var(--goa-color-text-secondary);
    animation: delayText 100ms;
  }

  .closed .profile-details,
  .closed .profile-chevron {
    display: none;
  }

  /* Mobile */

  .mobile {
    visibility: visible;
    opacity: 1;
    background-color: transparent;
    position: fixed;
    inset: 0;
    z-index: 998;
  }

  .mobile.closed {
    visibility: hidden;
    opacity: 0;
  }

  .mobile .background {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 999;
    border: none;
    background-color: var(--goa-color-greyscale-400);
    opacity: 0.3;
  }

  .mobile .container {
    position: fixed;
    z-index: 9999;
    display: flex;
    margin-left: 0;
  }

  .mobile .toggle {
    display: none;
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
