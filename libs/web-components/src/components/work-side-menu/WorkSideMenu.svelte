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
  export let subtitle: string;
  export let url: string;
  export let username: string;
  export let useremail: string;

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
    "data:image/svg+xml,%3Csvg width='118' height='32' viewBox='0 0 155 42' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_74_4890)'%3E%3Cpath d='M155 21H140.6V35.4004H155V21Z' fill='%2300B6ED'/%3E%3Cpath d='M65.5539 33.211C64.116 33.349 62.6147 33.4882 61.0366 33.5566C61.6106 29.2005 63.9758 23.1883 66.915 24.1484C68.6357 24.7016 67.7035 29.8197 65.5527 33.2086L65.5539 33.211ZM61.8957 36.1823C61.4683 36.2514 61.0326 36.2514 60.6053 36.1823C60.7165 36.1047 60.8073 36.0013 60.8699 35.881C60.9325 35.7606 60.965 35.6268 60.9647 35.4911V34.9378C61.7531 34.9378 62.9717 34.7998 64.4779 34.6606C63.8154 35.4471 62.9038 35.9839 61.8957 36.1823ZM79.8198 25.8116C81.6842 24.1484 82.6164 24.29 82.8273 24.7052C83.3294 25.6736 81.1786 29.0625 76.9489 30.9297C77.3845 28.9796 78.3814 27.2002 79.8162 25.8116H79.8198ZM149 27.4712C148.784 24.0824 145.702 23.5291 145.272 24.4976C145.128 24.8432 146.419 24.7052 146.419 27.1256C146.419 31.0677 142.261 36.2543 136.953 36.2543C135.111 36.3656 133.298 35.7577 131.894 34.5583C130.49 33.3589 129.605 31.6613 129.425 29.8221C129.209 28.3701 129.568 26.3636 126.988 26.6408C125.19 26.8484 123.618 30.1677 121.324 33.001C119.387 35.4215 118.527 35.2139 118.957 33.139C119.531 30.5109 121.754 24.4256 124.335 24.0104C125.553 23.8027 125.983 25.8104 126.491 24.5636C126.674 24.1246 126.746 23.6475 126.701 23.1742C126.655 22.7009 126.495 22.246 126.233 21.8497C125.97 21.4533 125.615 21.1276 125.197 20.9012C124.78 20.6749 124.313 20.5549 123.839 20.5519C121.974 20.5519 119.751 22.4887 117.888 24.632C116.311 26.5688 108.209 38.0483 104.768 35.5595C103.191 34.3834 103.33 29.6793 104.338 24.1484C105.794 23.5168 107.361 23.1795 108.948 23.1559C110.536 23.1322 112.112 23.4226 113.587 24.0104C114.519 24.4256 114.665 24.356 114.233 23.3875C113.659 21.9355 110.433 19.653 105.343 20.6899C105.199 20.6899 105.127 20.7595 104.984 20.7595C105.414 18.9594 105.844 17.0946 106.421 15.2957C106.923 13.6361 108.286 10.8004 104.624 10.3168C103.477 10.1092 103.979 10.6624 103.546 12.184C102.827 14.9501 101.969 18.5442 101.323 22.2115C98.0002 24.1064 95.2885 26.9143 93.5082 30.3033C93.9222 28.7349 94.2336 27.141 94.4404 25.532C94.4806 25.1343 94.3704 24.7359 94.1314 24.4157C93.8924 24.0955 93.5422 23.8768 93.1499 23.8027C92.3615 23.5951 91.3526 23.9408 90.4252 25.2548C88.2025 28.2981 85.4071 33.0694 81.1055 35.0747C78.0225 36.5267 76.6601 35.0747 76.5894 32.7946C77.1289 32.6525 77.6562 32.4675 78.1663 32.2414C83.7583 29.8905 85.6228 26.294 84.2604 24.0812C82.898 22.0063 79.0985 22.6291 76.0155 25.7408C74.3913 27.5384 73.4079 29.8245 73.2188 32.2414C71.9284 32.5186 70.4941 32.7214 68.8454 32.9326C71.4263 28.8525 71.2118 23.3191 67.4075 22.3519C62.9621 21.2455 60.7395 25.3952 59.8084 28.8525C60.1679 24.98 60.7407 21.1063 61.4572 17.3034C61.8167 15.6437 62.9621 12.808 59.3004 12.3244C58.1537 12.1168 58.2963 12.67 58.3682 14.1917C58.512 16.2665 56.1455 28.6461 57.3641 34.0402C55.7872 34.5202 55.1414 35.6999 57.1484 36.8759C58.3625 37.3816 59.673 37.6128 60.9865 37.5531C62.3 37.4933 63.5842 37.1441 64.7475 36.5303C65.8289 36.0016 66.8016 35.2742 67.6148 34.3858C69.4792 34.1782 71.4143 33.8326 73.2069 33.5554C73.4932 35.9759 75.1432 37.7735 78.8708 37.4279C84.1765 36.9479 88.9083 30.6501 90.7008 27.608C90.3413 30.8589 88.1917 37.9811 91.9194 37.6355C93.3572 37.4975 92.7797 37.2899 92.8516 36.0455C93.211 31.7578 96.8668 28.0929 100.52 25.8788C99.8743 31.1349 100.09 35.8391 102.599 37.2899C107.187 40.056 113.569 32.7946 117.153 28.3689C115.355 32.311 114.356 37.2899 117.009 38.0507C120.164 38.9496 122.673 33.8326 125.612 29.9589C125.971 32.725 127.907 37.5659 135.649 37.5659C143.966 37.4963 149.2 32.6554 148.984 27.4688L149 27.4712ZM36.7117 36.1091C33.9173 35.1299 31.1875 33.9747 28.5387 32.6506C30.939 31.8034 33.2854 30.8103 35.565 29.6769C35.8138 31.8427 36.1968 33.9909 36.7117 36.1091ZM57.8817 39.9888C57.8098 39.7812 57.2359 40.0584 56.735 39.9888C55.2289 39.7812 53.2219 37.7759 52.6479 34.525C51.5695 28.6449 52.2178 22.8379 54.0103 14.1929C54.3698 12.5332 55.5164 9.69756 51.8535 9.14435C50.7068 9.00634 51.2796 9.55956 50.9932 11.0116C49.5553 17.4438 44.1106 22.0771 38.6624 25.1888C38.0884 17.8578 38.3029 9.62796 39.7408 4.64903C40.9629 0.430912 42.396 1.19173 40.6035 0.292908C38.8109 -0.605916 36.732 0.568916 35.0833 3.7478C33.4346 6.92669 25.9122 24.014 13.8629 35.5631C7.69931 41.4408 2.10485 38.3987 1.02886 37.4999C0.0966476 36.7391 -0.189725 37.9151 0.885072 39.09C5.8325 44.3461 13.1452 41.37 15.7968 38.8128C23.1059 31.759 31.6408 16.5438 35.0881 10.1128C34.6816 15.735 34.7775 21.3824 35.3745 26.9876C32.6035 28.2941 29.7251 29.3585 26.7713 30.1689C25.0507 30.5841 23.9747 31.2753 23.9747 32.0362C23.9747 32.797 25.1213 33.5578 26.7713 34.3162C29.7105 35.6999 38.3856 39.5724 40.4645 40.8168C42.2618 41.8536 43.1892 41.0244 43.6913 39.918C44.4102 38.4659 42.4727 37.6379 40.6083 37.1519C39.7869 34.1144 39.2115 31.0154 38.8876 27.8853C43.2611 25.2572 47.6346 21.7999 50.0718 17.445C49.4271 21.0451 47.8491 33.421 51.8691 38.6076C52.4249 39.3234 53.1422 39.8971 53.9622 40.2815C54.7822 40.666 55.6816 40.8502 56.5864 40.8192C57.5905 40.7496 58.0243 40.128 57.8769 39.9888' fill='%23545860'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_74_4890'%3E%3Crect width='154.804' height='42' fill='white' transform='translate(0.195801)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A";

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
    if (el) {
      _menuLinks.push(el?.shadowRoot.querySelector("a"));
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
          <img alt="GoA Logo" class="logo" src={_logo} />
          <goa-text mt="0" mb="0" class="title">{title}</goa-text>
          {#if subtitle}
            <goa-text mt="0" mb="0" class="subtitle">{subtitle}</goa-text>
          {/if}
        </a>
      {:else}
        <div class="header">
          <img alt="GoA Logo" class="logo" src={_logo} />
          <goa-text mt="0" mb="0" class="title">{title}</goa-text>
                    {#if subtitle}
            <goa-text mt="0" mb="0" class="subtitle">{subtitle}</goa-text>
          {/if}
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

          <button class="profile" on:click={handleProfileClick}>
            <div class="profile-image">
              <goa-icon size="large" type="person-circle" fillcolor="white" />
            </div>

            <div class="profile-details">
              <div class="profile-name">{username}</div>
              <div class="profile-email">{useremail}</div>
            </div>
            <div class="profile-chevron">
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
        <goa-icon
          size="small"
          type={_isClosed ? "chevron-forward" : "chevron-back"}
        />
      </button>
    </div>
  </div>
</div>

<style>
  /* TO DO: Move component tokens into style dictionary */
  :host {
    --goa-work-side-menu-border-radius: 8px;
    --goa-work-side-menu-color-bg: #F2F0F0;
    --goa-work-side-menu-width-open: 316px;
    --goa-work-side-menu-width-closed: 90px;
    --goa-work-side-menu-shadow: 0px 4px 6px -2px rgba(26, 26, 26, 0.2);
    --goa-work-side-menu-toggle-border: 1px solid
      var(--goa-color-greyscale-200, rgba(220, 220, 220, 1));
    --goa-work-side-menu-toggle-shadow: 0px 1px 0px 0px rgba(26, 26, 26, 0.25);
    --goa-work-side-menu-account-shadow: 0px 12px 20px -8px
      rgba(26, 26, 26, 0.24);
    --goa-work-side-menu-border: var(--goa-border-width-s) solid
      var(--goa-color-greyscale-200);
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
    width: var(--goa-work-side-menu-width-open);
    background-color: var(--goa-work-side-menu-color-bg);
    box-shadow: var(--goa-work-side-menu-shadow);
    transition: width 100ms ease-out;
  }

  .scrolling .container {
    width: calc(var(--goa-work-side-menu-width-open) + 1px);
  }

  .closed .container {
    width: var(--goa-work-side-menu-width-closed);
  }

  .closed.scrolling .container {
    width: var(--goa-work-side-menu-width-closed);
  }

  .header {
    container: heading / inline-size;
    display: flex;
    flex-direction: column;
    padding: var(--goa-space-l);
    gap: var(--goa-space-xs);
    align-items: center;
    border-bottom: var(--goa-border-width-s) solid
      #E1DEDD;
    text-decoration: none;
    transition: padding 100ms ease-out;
  }

  a.header:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  .logo {
    padding-bottom: var(--goa-space-s);
  }

  .title, .subtitle {
    display: block;
    visibility: visible;
    opacity: 1;
    animation: delayText 100ms;
  }

  .title {
    font-size: var(--goa-font-size-2, 14px);
    line-height: 1.4;
    font-weight: var(--goa-font-weight-medium, 600);
    color: var(--goa-color-text-default, #000000);
  }

  .subtitle {
    font-size: var(--goa-font-size-1, 12px);
    line-height: 1.5;
    font-weight: var(--goa-font-weight-regular, 400);
    color: var(--goa-color-text-default, #000000);
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
    min-height: calc(100vh - 137px);
    flex-direction: column;
    align-items: stretch;
    transition: padding 100ms ease-out;
  }

  .closed .menu {
    padding: var(--goa-space-l) var(--goa-space-2xs);
  }

  .primary-menu {
    flex: 1 0 min-content;
    padding: var(--goa-space-l) var(--goa-space-l) 0 0;
  }

  .secondary-menu {
    border-top: var(--goa-border-width-s) solid #E1DEDD;;
    margin: var(--goa-space-xs) 0 0;
    padding: var(--goa-space-l) var(--goa-space-l) 0 0;
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
    border-radius: var(--goa-work-side-menu-border-radius);
    cursor: pointer;
    height: var(--goa-space-xl);
    width: var(--goa-space-xl);
    border: var(--goa-work-side-menu-toggle-border);
    box-shadow: var(--goa-work-side-menu-toggle-shadow);
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
    box-shadow: var(--goa-work-side-menu-account-shadow);
    border-radius: var(--goa-work-side-menu-border-radius);
    border: var(--goa-work-side-menu-toggle-border);
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
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-700, #948F8F);
    background-color: var(--goa-color-greyscale-white);
    margin-top: var(--goa-space-xs);
    padding: var(--goa-space-xs);
    margin: var(--goa-space-l);
    border-radius: var(--goa-work-side-menu-border-radius);
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
    font-size: var(--goa-font-size-3, 16px);
    margin-bottom: var(--goa-space-2xs);
    line-height: 1.4;
    text-align: left;
    color: var(--goa-color-text-secondary, #676363);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    animation: delayText 100ms;
  }

  .profile-email {
    font-size: var(--goa-font-size-2, 14px);
    line-height: 1.4;
    color: var(--goa-color-text-secondary, #676363);
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
