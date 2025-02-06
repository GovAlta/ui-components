<!-- svelte-ignore missing-custom-element-compile-options -->
<svelte:options customElement="goa-app-header" />

<!-- Script -->
<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { MOBILE_BP, TABLET_BP } from "../../common/breakpoints";
  import { getSlottedChildren, styles, toBoolean } from "../../common/utils";
  import { isUrlMatch, getMatchedLink } from "../../common/urls";
  import { AppHeaderMenuProps } from "../app-header-menu/AppHeaderMenu.svelte";

  // optional
  export let heading: string = "";
  export let url: string = "";
  export let testid: string = "";
  export let maxcontentwidth = "";
  export let fullmenubreakpoint: number = TABLET_BP; // minimum window width to show all menu links
  export let hasmenuclickhandler: string = "false"; // If this is yes, we will not expand menu when clicking a toggle button

  // Private

  const _mobileLogo =
    "data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 35 35' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_252_21401)'%3E%3Cpath d='M17.5 0C20.9612 0 24.3446 1.02636 27.2225 2.94928C30.1003 4.87221 32.3434 7.60533 33.6679 10.803C34.9924 14.0007 35.339 17.5194 34.6637 20.9141C33.9885 24.3087 32.3218 27.4269 29.8744 29.8744C27.4269 32.3218 24.3087 33.9885 20.9141 34.6637C17.5194 35.339 14.0007 34.9924 10.803 33.6679C7.60533 32.3434 4.87221 30.1003 2.94928 27.2225C1.02636 24.3446 0 20.9612 0 17.5C0 12.8587 1.84374 8.40752 5.12563 5.12563C8.40752 1.84374 12.8587 0 17.5 0V0Z' fill='%2300B6ED'/%3E%3Cpath d='M23.8045 24.8037C22.2993 24.2487 20.8302 23.6001 19.4059 22.8618C20.6989 22.3869 21.9597 21.8286 23.1803 21.1903C23.3048 22.4081 23.5131 23.6159 23.8036 24.8051M31.8873 9.83681C31.2574 9.7572 31.5846 10.0501 31.4091 10.8801C30.6504 14.4588 27.7236 17.0381 24.7854 18.7685C24.4775 14.6704 24.6033 10.1205 25.3748 7.33228C26.0258 4.97862 26.7999 5.41055 25.8397 4.91616C24.828 4.39581 23.7438 5.0833 22.8654 6.83656C21.987 8.58982 17.9421 18.1074 11.4762 24.5341C8.16898 27.8238 5.17753 26.1295 4.57844 25.6236C4.09108 25.2119 3.91118 25.8475 4.51598 26.4985C7.19074 29.3826 11.0984 27.7279 12.5213 26.3058C16.4536 22.3753 21.0255 13.9143 22.8751 10.3242C22.6597 13.451 22.7093 16.5904 23.0233 19.7089C21.5336 20.4399 19.98 21.0325 18.382 21.4793C17.4653 21.7195 16.8983 22.0929 16.8816 22.5174C16.8636 22.9823 17.4789 23.3747 18.3688 23.7969C19.9522 24.5491 24.5918 26.7409 25.735 27.4037C26.7137 27.9716 27.1914 27.5286 27.4812 26.9155C27.8599 26.1163 26.8215 25.6544 25.8151 25.3536C25.3709 23.6667 25.0692 21.9455 24.9129 20.2081C27.2714 18.7566 29.5934 16.8213 30.9319 14.4078C31.3641 13.5596 31.6853 12.6593 31.8877 11.7291C32.0278 11.1562 32.0661 10.5632 32.0007 9.97712C32.0007 9.97712 31.9831 9.84913 31.8877 9.83681' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_252_21401'%3E%3Crect width='35' height='35' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A";
  const _desktopLogo =
    "data:image/svg+xml,%3Csvg width='118' height='32' viewBox='0 0 155 42' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_74_4890)'%3E%3Cpath d='M155 21H140.6V35.4004H155V21Z' fill='%2300B6ED'/%3E%3Cpath d='M65.5539 33.211C64.116 33.349 62.6147 33.4882 61.0366 33.5566C61.6106 29.2005 63.9758 23.1883 66.915 24.1484C68.6357 24.7016 67.7035 29.8197 65.5527 33.2086L65.5539 33.211ZM61.8957 36.1823C61.4683 36.2514 61.0326 36.2514 60.6053 36.1823C60.7165 36.1047 60.8073 36.0013 60.8699 35.881C60.9325 35.7606 60.965 35.6268 60.9647 35.4911V34.9378C61.7531 34.9378 62.9717 34.7998 64.4779 34.6606C63.8154 35.4471 62.9038 35.9839 61.8957 36.1823ZM79.8198 25.8116C81.6842 24.1484 82.6164 24.29 82.8273 24.7052C83.3294 25.6736 81.1786 29.0625 76.9489 30.9297C77.3845 28.9796 78.3814 27.2002 79.8162 25.8116H79.8198ZM149 27.4712C148.784 24.0824 145.702 23.5291 145.272 24.4976C145.128 24.8432 146.419 24.7052 146.419 27.1256C146.419 31.0677 142.261 36.2543 136.953 36.2543C135.111 36.3656 133.298 35.7577 131.894 34.5583C130.49 33.3589 129.605 31.6613 129.425 29.8221C129.209 28.3701 129.568 26.3636 126.988 26.6408C125.19 26.8484 123.618 30.1677 121.324 33.001C119.387 35.4215 118.527 35.2139 118.957 33.139C119.531 30.5109 121.754 24.4256 124.335 24.0104C125.553 23.8027 125.983 25.8104 126.491 24.5636C126.674 24.1246 126.746 23.6475 126.701 23.1742C126.655 22.7009 126.495 22.246 126.233 21.8497C125.97 21.4533 125.615 21.1276 125.197 20.9012C124.78 20.6749 124.313 20.5549 123.839 20.5519C121.974 20.5519 119.751 22.4887 117.888 24.632C116.311 26.5688 108.209 38.0483 104.768 35.5595C103.191 34.3834 103.33 29.6793 104.338 24.1484C105.794 23.5168 107.361 23.1795 108.948 23.1559C110.536 23.1322 112.112 23.4226 113.587 24.0104C114.519 24.4256 114.665 24.356 114.233 23.3875C113.659 21.9355 110.433 19.653 105.343 20.6899C105.199 20.6899 105.127 20.7595 104.984 20.7595C105.414 18.9594 105.844 17.0946 106.421 15.2957C106.923 13.6361 108.286 10.8004 104.624 10.3168C103.477 10.1092 103.979 10.6624 103.546 12.184C102.827 14.9501 101.969 18.5442 101.323 22.2115C98.0002 24.1064 95.2885 26.9143 93.5082 30.3033C93.9222 28.7349 94.2336 27.141 94.4404 25.532C94.4806 25.1343 94.3704 24.7359 94.1314 24.4157C93.8924 24.0955 93.5422 23.8768 93.1499 23.8027C92.3615 23.5951 91.3526 23.9408 90.4252 25.2548C88.2025 28.2981 85.4071 33.0694 81.1055 35.0747C78.0225 36.5267 76.6601 35.0747 76.5894 32.7946C77.1289 32.6525 77.6562 32.4675 78.1663 32.2414C83.7583 29.8905 85.6228 26.294 84.2604 24.0812C82.898 22.0063 79.0985 22.6291 76.0155 25.7408C74.3913 27.5384 73.4079 29.8245 73.2188 32.2414C71.9284 32.5186 70.4941 32.7214 68.8454 32.9326C71.4263 28.8525 71.2118 23.3191 67.4075 22.3519C62.9621 21.2455 60.7395 25.3952 59.8084 28.8525C60.1679 24.98 60.7407 21.1063 61.4572 17.3034C61.8167 15.6437 62.9621 12.808 59.3004 12.3244C58.1537 12.1168 58.2963 12.67 58.3682 14.1917C58.512 16.2665 56.1455 28.6461 57.3641 34.0402C55.7872 34.5202 55.1414 35.6999 57.1484 36.8759C58.3625 37.3816 59.673 37.6128 60.9865 37.5531C62.3 37.4933 63.5842 37.1441 64.7475 36.5303C65.8289 36.0016 66.8016 35.2742 67.6148 34.3858C69.4792 34.1782 71.4143 33.8326 73.2069 33.5554C73.4932 35.9759 75.1432 37.7735 78.8708 37.4279C84.1765 36.9479 88.9083 30.6501 90.7008 27.608C90.3413 30.8589 88.1917 37.9811 91.9194 37.6355C93.3572 37.4975 92.7797 37.2899 92.8516 36.0455C93.211 31.7578 96.8668 28.0929 100.52 25.8788C99.8743 31.1349 100.09 35.8391 102.599 37.2899C107.187 40.056 113.569 32.7946 117.153 28.3689C115.355 32.311 114.356 37.2899 117.009 38.0507C120.164 38.9496 122.673 33.8326 125.612 29.9589C125.971 32.725 127.907 37.5659 135.649 37.5659C143.966 37.4963 149.2 32.6554 148.984 27.4688L149 27.4712ZM36.7117 36.1091C33.9173 35.1299 31.1875 33.9747 28.5387 32.6506C30.939 31.8034 33.2854 30.8103 35.565 29.6769C35.8138 31.8427 36.1968 33.9909 36.7117 36.1091ZM57.8817 39.9888C57.8098 39.7812 57.2359 40.0584 56.735 39.9888C55.2289 39.7812 53.2219 37.7759 52.6479 34.525C51.5695 28.6449 52.2178 22.8379 54.0103 14.1929C54.3698 12.5332 55.5164 9.69756 51.8535 9.14435C50.7068 9.00634 51.2796 9.55956 50.9932 11.0116C49.5553 17.4438 44.1106 22.0771 38.6624 25.1888C38.0884 17.8578 38.3029 9.62796 39.7408 4.64903C40.9629 0.430912 42.396 1.19173 40.6035 0.292908C38.8109 -0.605916 36.732 0.568916 35.0833 3.7478C33.4346 6.92669 25.9122 24.014 13.8629 35.5631C7.69931 41.4408 2.10485 38.3987 1.02886 37.4999C0.0966476 36.7391 -0.189725 37.9151 0.885072 39.09C5.8325 44.3461 13.1452 41.37 15.7968 38.8128C23.1059 31.759 31.6408 16.5438 35.0881 10.1128C34.6816 15.735 34.7775 21.3824 35.3745 26.9876C32.6035 28.2941 29.7251 29.3585 26.7713 30.1689C25.0507 30.5841 23.9747 31.2753 23.9747 32.0362C23.9747 32.797 25.1213 33.5578 26.7713 34.3162C29.7105 35.6999 38.3856 39.5724 40.4645 40.8168C42.2618 41.8536 43.1892 41.0244 43.6913 39.918C44.4102 38.4659 42.4727 37.6379 40.6083 37.1519C39.7869 34.1144 39.2115 31.0154 38.8876 27.8853C43.2611 25.2572 47.6346 21.7999 50.0718 17.445C49.4271 21.0451 47.8491 33.421 51.8691 38.6076C52.4249 39.3234 53.1422 39.8971 53.9622 40.2815C54.7822 40.666 55.6816 40.8502 56.5864 40.8192C57.5905 40.7496 58.0243 40.128 57.8769 39.9888' fill='%23545860'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_74_4890'%3E%3Crect width='154.804' height='42' fill='white' transform='translate(0.195801)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A";

  let _slotParentEl: HTMLElement;
  let _rootEl: HTMLElement;
  let _windowWidth = window.innerWidth;
  let _showToggleMenu = false;
  let _showMenu = false;

  let _appHeaderLinks: Element[] = [];
  let _appHeaderMenuItems: AppHeaderMenuProps[] = [];
  let _menuButton: HTMLButtonElement;

  // Reactive

  $: _mobile = _windowWidth < MOBILE_BP;
  $: _tablet = _windowWidth >= MOBILE_BP && _windowWidth < fullmenubreakpoint;
  $: _desktop = _windowWidth >= +fullmenubreakpoint;
  $: (async () => {
    _showToggleMenu = _desktop ? false : ((await hasChildren()) as boolean);
    onShowToggleMenuChange();
  })();
  $: _hasMenuClickHandler = toBoolean(hasmenuclickhandler);

  // Hooks

  onMount(() => {
    getChildren();
    addEventListeners();
  });

  onDestroy(() => {
    window.removeEventListener("popstate", onRouteChange, true);
  });

  // Functions

  const toggleMenu = () => (_showMenu = !_showMenu);
  const hideMenu = () => (_showMenu = false);

  const dispatchMenuClick = () => {
    if (_hasMenuClickHandler) {
      _menuButton.dispatchEvent(
        new CustomEvent("_menuClick", { composed: true, bubbles: true }),
      );
    }
  };

  function getChildren() {
    if (!_slotParentEl) return;

    const slotChildren = getSlottedChildren(_slotParentEl);
    if (slotChildren.length === 0) return;

    _appHeaderLinks = slotChildren
      .filter((el) => el.tagName === "A")
      .map((el) => {
        el.classList.remove("current");
        return el;
      });
  }

  function addEventListeners() {
    if (!_rootEl) return;

    _rootEl.addEventListener("app-header-menu:mounted", (e: Event) => {
      const appHeaderMenuProps = (e as CustomEvent<AppHeaderMenuProps>).detail;
      _appHeaderMenuItems = [..._appHeaderMenuItems, appHeaderMenuProps];
      setCurrentLink();
    });

    // watch path changes
    let currentLocation = document.location.href;
    const observer = new MutationObserver((_mutationList) => {
      if (isUrlMatch(document.location, currentLocation)) {
        currentLocation = document.location.href;
        onRouteChange();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("popstate", onRouteChange, true);
  }

  function onRouteChange() {
    setCurrentLink();
    hideMenu();
  }

  function setCurrentLink() {
    const url = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    // Combine all links
    let links = [..._appHeaderLinks];
    _appHeaderMenuItems.forEach((el) => {
      links = [...links, ...el.links];
    });

    links.forEach((link) => link.classList.remove("current"));

    const matchedLink = getMatchedLink(links, window.location);
    if (matchedLink) {
      matchedLink.classList.add("current");
    }

    dispatchCurrentLink(matchedLink?.getAttribute("href") || "");
  }

  function dispatchCurrentLink(href: string) {
    _appHeaderMenuItems.forEach((item) => {
      item.el.dispatchEvent(
        new CustomEvent("app-header:changed", {
          composed: true,
          detail: href,
        }),
      );
    });
  }

  function onShowToggleMenuChange() {
    if (!_slotParentEl) return;

    const slot = _slotParentEl.querySelector("slot") as HTMLSlotElement;
    if (!slot) return;

    slot
      .assignedElements()
      .filter((el) => el.tagName === "A")
      .map((el) => {
        if (_showToggleMenu) el.classList.add("inside-collapse-menu");
        else el.classList.remove("inside-collapse-menu");
      });
  }

  // *Menu* children count
  // When in mobile mode, while the children are not visible the children are rendered in a div[display: none]
  // element to allow for the children count to be obtained.
  async function hasChildren() {
    await tick();

    if (!_slotParentEl) return false;
    const slot = _slotParentEl?.childNodes[0] as HTMLSlotElement;
    const children = slot?.assignedElements?.();
    if (children) {
      return children.length > 0;
    } else {
      // testing
      // @ts-expect-error
      return [..._slotParentEl?.querySelectorAll("a")].length > 0;
    }
  }
</script>

<svelte:window bind:innerWidth={_windowWidth} />

<!-- HTML -->
<div
  class="container"
  bind:this={_rootEl}
  data-testid={testid}
  style={`
  --max-content-width: ${maxcontentwidth || "100%"};
  --desktop-padding: ${maxcontentwidth && maxcontentwidth !== "100%" && _windowWidth > +maxcontentwidth ? "0" : "var(--goa-space-3xl)"};
`}
  class:show-menu={_showMenu}
  class:mobile={_mobile}
  class:tablet={_tablet}
  class:desktop={_desktop}
>
  <div class="layout">
    <!-- Logo and optional heading link -->
    {#if url}
      <a href={url} class="header-logo-title-area" data-testid="url">
        <img alt="GoA Logo" class="image-mobile" src={_mobileLogo} />
        <img alt="GoA Logo" class="image-desktop" src={_desktopLogo} />
        {#if heading}
          <span data-testid="title" class="title">{heading}</span>
        {/if}
      </a>
    {:else}
      <div class="header-logo-title-area">
        <img alt="GoA Logo" class="image-mobile" src={_mobileLogo} />
        <img alt="GoA Logo" class="image-desktop" src={_desktopLogo} />
        {#if heading}
          <span data-testid="title" class="title">{heading}</span>
        {/if}
      </div>
    {/if}

    <!-- Menu button for mobile -->
    {#if _showToggleMenu && _mobile}
      <div class="menu-toggle-area">
        <button
          on:click={_hasMenuClickHandler ? dispatchMenuClick : toggleMenu}
          data-testid="menu-toggle"
          bind:this={_menuButton}
          class:menu-open={_showMenu}
        >
          Menu
          {#if !_hasMenuClickHandler}
            <goa-icon type={_showMenu ? "chevron-up" : "chevron-down"} mt="2" />
          {/if}
        </button>
      </div>
    {/if}

    <!-- Menu and menu button for tablet -->
    {#if _showToggleMenu && _tablet}
      <goa-popover
        class="menu"
        open={_showMenu}
        minwidth="16rem"
        context="menu-toggle-area"
        focusborderwidth="0"
        borderradius="4"
        padded="false"
        tabindex="-1"
        height="full"
        position="below"
        on:_close={hideMenu}
      >
        <div
          slot="target"
          class="menu-toggle-area"
        >
          <button
            on:click={_hasMenuClickHandler ? dispatchMenuClick : toggleMenu}
            data-testid="menu-toggle"
            bind:this={_menuButton}
            class:menu-open={_showMenu}
          >
            Menu
            {#if !_hasMenuClickHandler}
              <goa-icon
                type={_showMenu ? "chevron-up" : "chevron-down"}
                mt="2"
              />
            {/if}
          </button>
        </div>

        {#if _showMenu}
          <div bind:this={_slotParentEl} data-testid="slot">
            <slot />
          </div>
        {/if}
      </goa-popover>
    {/if}

    <!--
      Need to render slot content to allow mobile and tablet views to
      know whether or not to show the Menu button. `_slotContainer` provides
      a reference to determine if any slot children exist.
    -->
    {#if !_showMenu && (_mobile || _tablet)}
      <div bind:this={_slotParentEl} style="display: none">
        <slot />
      </div>
    {/if}

    <!-- Mobile and desktop slot content -->
    {#if (_showMenu && _mobile && !_hasMenuClickHandler) || _desktop}
      <div bind:this={_slotParentEl} data-testid="slot" class="content-area">
        <slot />
      </div>
    {/if}
  </div>
</div>

<!-- Style -->

<style>
  /* General App header styling -------------------------------------- */
  *,
  :global(::slotted(*)) {
    font: var(--goa-app-header-typography-service-name);
  }

  /* Spans the full page width */
  .container {
    border-bottom: var(--goa-app-header-border-bottom);
    background-color: var(--goa-app-header-color-bg);
  }

  @media (--desktop) {
    /* padding is independent from fullmenubreakpoint, should use media query */
    .container.tablet {
      padding: 0 var(--goa-space-3xl);
    }

    .container.desktop {
      padding: 0 var(--desktop-padding);
    }
  }

  @media (--tablet) {
    /* padding is independent from fullmenubreakpoint, should use media query */
    .container {
      padding: 0 var(--goa-space-xl); /* 32px */
    }
  }

  /* Contains all children within component */
  .layout {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "header menu"
      "links links";
  }

  .content-area {
    grid-area: links;
  }

  .desktop .layout {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto;
    grid-template-areas: "header . menu";
    margin: 0 auto;
    width: min(var(--max-content-width), 100%);
  }

  /* Logo and service name */
  .title {
    color: var(--goa-app-header-color-service-name);
  }

  .header-logo-title-area {
    grid-area: header;
    display: flex;
    text-decoration: none;
    align-items: flex-start;
  }

  /* Logo and service name --Focus */
  .header-logo-title-area:focus-visible {
    outline: var(--goa-app-header-service-name-border-focus);
    z-index: 100;
    position: relative;
  }

  /* Menu items (+ in collapsed menu) */
  :global(::slotted(a)) {
    display: flex;
    align-items: center;
    margin: 0;
    padding: var(--goa-app-header-padding-nav-item-in-menu);
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
    overflow: hidden;
  }

  /* Menu items (+ in collapsed menu) --Focus */
  :global(::slotted(a:focus-visible)) {
    outline: var(--goa-app-header-border-focus);
    outline-offset: 0px;
    z-index: 100;
    position: relative;
  }

  /* Menu items in collapsed menu */
  :global(::slotted(a.inside-collapse-menu)) {
    color: var(--goa-app-header-color-text-nav-item);
    background-color: var(--goa-app-header-color-bg-nav-item);
  }

  /* Menu items in collapsed menu --Hover */
  :global(::slotted(a.inside-collapse-menu:hover)) {
    color: var(--goa-app-header-color-text-nav-item-hover) !important;
    background-color: var(--goa-app-header-color-bg-nav-item-child-hover);
  }

  /* Menu items in collapsed menu --Focus */
  :global(::slotted(a.inside-collapse-menu:focus-visible)) {
    outline-offset: -3px;
    background-color: var(
      --goa-app-header-color-bg-nav-item-child-focus
    ) !important;
    color: var(--goa-app-header-color-text-nav-item-focus) !important;
  }

  /* Menu items in collapsed menu --Interactive */
  :global(::slotted(a.interactive)) {
    color: var(--goa-app-header-nav-color-text-link-item) !important;
    text-decoration: underline !important;
    white-space: nowrap;
  }

  /* Menu items in collapsed menu --Interactive--Hover */
  :global(::slotted(a.interactive:hover)) {
    color: var(--goa-app-header-nav-color-text-link-item-hover) !important;
  }

  /* Menu items in collapsed menu --Interactive--Focus */
  :global(::slotted(a.interactive:focus-visible)) {
    color: var(--goa-app-header-nav-color-text-link-item-focus) !important;
    background-color: var(
      --goa-app-header-color-bg-nav-item-child-focus
    ) !important;
  }

  /* Menu items in collapsed menu -- Current */
  :global(::slotted(a.inside-collapse-menu.current)) {
    color: var(app-header-color-text-nav-item-in-menu-current);
    background-color: var(--goa-app-header-color-bg-nav-item-in-menu-current) !important;
  }

  /* Menu items in collapsed menu -- Current -- Hover */
  :global(::slotted(a.inside-collapse-menu.current:hover)) {
    color: var(app-header-color-text-nav-item-in-menu-current-hover) !important;
    background-color: var(--goa-app-header-color-bg-nav-item-in-menu-current-hover) !important;
  }

  /*------------------------------------------------*/

  /* DESKTOP -------------------------------------- */

  /* Container for all navigation items */
  .desktop .content-area {
    grid-area: menu;
    display: flex;
    align-items: stretch;
  }

  /* Hides menu button on desktop */
  .desktop .menu-toggle-area {
    display: none;
  }

  /* Service name and logo */
  .desktop .title {
    padding-top: 5.5px;
    max-width: var(--goa-app-header-max-width-service-name);
    min-width: var(--goa-app-header-min-width-service-name);
    font: var(--goa-app-header-typography-service-name);
  }

  .desktop .header-logo-title-area {
    grid-area: header;
    display: flex;
    align-items: flex-start;
    color: inherit;
    flex: 1 1 auto;
    min-height: var(--goa-app-header-size-logo);
    margin: var(--goa-app-header-padding-logo);
    gap: var(--goa-app-header-space-btw-logo-service-name);
  }

  .desktop .image-desktop {
    display: block;
  }

  .desktop .image-mobile {
    display: none;
  }

  /* Header nav item (on desktop)

  --Default */
  .desktop :global(::slotted(a)),
  .desktop :global(::slotted(a:visited)) {
    font: var(--goa-app-header-typography-nav-item);
    display: block;
    align-items: center;
    padding: var(--goa-app-header-padding-nav-item);
    text-decoration: none;
    height: var(--goa-app-header-height-nav-item);
    border-top: var(--goa-app-header-border-nav-item-default);
    border-bottom: var(--goa-app-header-border-nav-item-default);
  }

  /* Header nav item --Hover */
  .desktop :global(::slotted(a:hover)) {
    cursor: pointer;
    color: var(--goa-app-header-color-text-nav-item-hover) !important;
    background: var(--goa-app-header-color-bg-nav-item-hover);
    border-top: var(--goa-app-header-border-nav-item-default);
    border-bottom: var(--goa-app-header-border-nav-item-hover);
  }

  /* Header nav item --Focus */
  .desktop :global(::slotted(a:focus-visible)) {
    cursor: pointer;
    color: var(--goa-app-header-color-text-nav-item-focus) !important;
    background: var(--goa-app-header-color-bg-nav-item-focus);
    border-top: var(--goa-app-header-border-nav-item-default);
    border-bottom: var(--goa-app-header-border-nav-item-focus);
  }

  /* Header nav item --Current */
  .desktop :global(::slotted(a.current)) {
    border-top: var(--goa-app-header-border-nav-item-default) !important;
    border-bottom: var(--goa-app-header-border-nav-item-current);
  }

  /* Header nav item --Current--Hover */
  .desktop :global(::slotted(a.current:hover)) {
    border-top: var(--goa-app-header-border-nav-item-default) !important;
    border-bottom: var(--goa-app-header-border-nav-item-current-hover);
  }

  /* Header nav item --Current--Focus */
  .desktop :global(::slotted(a.current:focus-visible)) {
    border-top: var(--goa-app-header-border-nav-item-default) !important;
    border-bottom: var(--goa-app-header-border-nav-item-current-focus);
  }

  /* Header nav item with children (app header menu) --Default */
  .desktop :global(::slotted(goa-app-header-menu)) {
    height: var(--goa-app-header-height-nav-item);
  }

  /* Header nav item with children (app header menu) --Hover */
  .desktop :global(::slotted(goa-app-header-menu:hover)) {
    background: var(--goa-app-header-color-bg-nav-item-hover);
    cursor: pointer;
    color: var(--goa-app-header-color-text-nav-item-hover) !important;
    overflow: hidden !important;
  }

  /* Link item styling */
  .desktop :global(::slotted(a.interactive)) {
    font: var(--goa-app-header-typography-link-item);
    padding: var(--goa-app-header-padding-link-item);
  }

  /* Link item styling --Hover */
  .desktop :global(::slotted(a.interactive:hover)) {
    border-top: var(--goa-app-header-border-nav-item-default);
    border-bottom: var(--goa-app-header-border-nav-item-default);
    background-color: var(--goa-app-header-nav-color-bg-link-item-hover);
  }

  /* Link item styling --Focus */
  .desktop :global(::slotted(a.interactive:focus-visible)) {
    border-top: var(--goa-app-header-border-nav-item-default) !important;
    border-bottom: var(--goa-app-header-border-nav-item-default) !important;
    background-color: var(
      --goa-app-header-nav-color-bg-link-item-focus
    ) !important;
  }

  /* Link item styling --Current */
  .desktop :global(::slotted(a.interactive.current)) {
    border-top: var(--goa-app-header-border-nav-item-default) !important;
    border-bottom: var(--goa-app-header-border-nav-item-default) !important;
  }

  /*------------------------------------------------*/

  /* TABLET -------------------------------------- */

  /* Service name and logo */
  .tablet .header-logo-title-area {
    margin: var(--goa-app-header-padding-logo);
    min-height: var(--goa-app-header-size-logo); /* - top/bottom padding */
    gap: var(--goa-app-header-space-btw-logo-service-name);
  }

  .tablet .title {
    padding-top: 5.5px;
    font: var(--goa-app-header-typography-service-name);
    max-width: var(--goa-app-header-max-width-service-name);
    min-width: var(--goa-app-header-min-width-service-name);
  }

  .tablet .image-desktop {
    display: block;
  }

  .tablet .image-mobile {
    display: none;
  }

  /* Menu button (for collapsed menu) */
  .menu-toggle-area {
    grid-area: menu;
    display: flex;
    position: relative;
  }

  .menu-toggle-area button {
    display: flex;
    background: transparent;
    border: none;
    cursor: pointer;
    height: var(--goa-app-header-height-nav-item);
    align-items: center;
    gap: 6px;
    font: var(--goa-app-header-typography-menu-button);
    padding: var(--goa-app-header-padding-menu-button);
    text-decoration: none;
    color: var(--goa-app-header-color-menu-button);
  }

  /* Menu button (for collapsed menu) --Hover */
  .menu-toggle-area button:hover {
    color: var(--goa-app-header-color-menu-button-hover);
    box-shadow: inset 0 -4px 0 0 var(--goa-color-interactive-hover); /* Adds a 4px bottom border using box shadow */
  }

  /* Menu button (for collapsed menu) --Focus */
  .menu-toggle-area button:focus-visible {
    outline: var(--goa-app-header-border-focus);
    z-index: 100;
    position: relative;

    color: var(--goa-app-header-color-menu-button-focus);
    box-shadow: inset 0 -4px 0 0 var(--goa-color-interactive-hover);
  }

  /* Menu button (for collapsed menu) --Open */
  .menu-toggle-area button.menu-open {
    background-color: var(--goa-app-header-color-bg-menu-button-focus);
    color: var(--goa-app-header-color-menu-button-focus);
    box-shadow: inset 0 -4px 0 0 var(--goa-color-interactive-hover);
  }

  /* Size of icon in collapsed menu button */
  .menu-toggle-area goa-icon {
    scale: 1;
  }

  /* Menu button (for collapsed menu) */
  .tablet .menu-toggle-area {
    padding-left: var(--goa-app-header-space-btw-service-name-nav-items-in-menu); /* Space between service name and menu button */
    height: 100%;
    display: flex;
    align-items: end;
  }

  /* Link menu items in collapsed menu --Focus */
  :global(::slotted(a.interactive:focus-visible)) {
    color: var(--goa-app-header-nav-color-text-link-item-focus) !important;
    background-color: var(--goa-app-header-nav-color-bg-link-item-in-menu-focus) !important;
    border-top: none !important;
    border-bottom: none;
  }

  /* Add top border to all menu items in popover menu (except first) */
  .tablet :global(::slotted(a:not(:first-child))) {
    box-shadow: inset 0 var(--goa-border-width-s) 0 0
      var(--goa-color-greyscale-200);
  }

  /*------------------------------------------------*/

  /* MOBILE --------------------------------------*/

  /* Service name and logo */
  .mobile .title {
    margin-top: -1px;
    color: var(--goa-app-header-color-service-name);
    max-width: var(--goa-app-header-max-width-service-name);
    min-width: var(--goa-app-header-min-width-service-name);
    font: var(--goa-app-header-typography-service-name-mobile);
  }

  .mobile .header-logo-title-area {
    display: flex;
    align-items: start;
    padding: var(--goa-app-header-padding-logo-mobile);
    gap: var(--goa-app-header-space-btw-logo-service-name-mobile);
  }

  .mobile .image-desktop {
    display: none;
  }

  .mobile .image-mobile {
    display: block;
    width: var(--goa-app-header-size-logo-mobile);
  }

  /* Menu button styling */
  .mobile .menu-toggle-area button {
    height: var(--goa-app-header-height-nav-item-mobile);
    font: var(--goa-app-header-typography-menu-button-mobile);
    display: flex;
    align-items: center;
  }

  /* Mobile Menu Button area */
  .mobile .menu-toggle-area {
    display: flex;
    align-items: end; /* Aligns the button to the bottom */
    position: relative; /* Ensure this provides positioning context for children */
  }

  /* Menu button (for collapsed menu) --Open */
  .mobile .menu-toggle-area button.menu-open {
    background-color: var(--goa-app-header-color-bg-menu-button-focus);
    color: var(--goa-app-header-color-menu-button-focus);
    box-shadow: inset 0 -4px 0 0 var(--goa-color-interactive-hover);
  }

  /* Size of icon in mobile menu button */
  .mobile .menu-toggle-area goa-icon {
    scale: 0.8;
  }

  /* Menu items in popover */
  .mobile :global(::slotted(a)) {
    box-shadow: inset 0 var(--goa-border-width-s) 0 0
      var(--goa-color-greyscale-200);
    font: var(--goa-app-header-typography-menu-item);
    padding-left: var(--goa-space-2xl);
    padding-right: var(--goa-space-xl);
  }

  /* Bottom border for mobile menu */
  .mobile.show-menu {
    border-bottom: var(--goa-border-width-m) solid
      var(--goa-color-greyscale-200);
  }

  /*------------------------------------------------*/
</style>
