<!-- svelte-ignore missing-custom-element-compile-options -->
<svelte:options customElement="goa-app-header" />

<!-- Script -->
<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { MOBILE_BP, TABLET_BP } from "../../common/breakpoints";
  import { getSlottedChildren, styles } from "../../common/utils";
  import { isUrlMatch, getMatchedLink } from "../../common/urls";
  import { AppHeaderMenuProps } from "../app-header-menu/AppHeaderMenu.svelte";

  // optional
  export let heading: string = "";
  export let url: string = "";
  export let testid: string = "";
  export let maxcontentwidth = "";
  export let fullmenubreakpoint: number = TABLET_BP; // minimum window width to show all menu links

  // Private

  const _mobileLogo =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32' height='32' viewBox='0 0 16 16'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:none;%7D.b%7Bfill:%2300aad2;%7D.c%7Bclip-path:url(%23a);%7D.d%7Bfill:%23fff;%7D%3C/style%3E%3CclipPath id='a'%3E%3Crect class='a' width='14' height='14' transform='translate(-0.345 -0.21)'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg transform='translate(0 -0.135)'%3E%3Ccircle class='b' cx='8' cy='8' r='8' transform='translate(0 0.135)'/%3E%3Cg transform='translate(1.345 1.344)'%3E%3Cg class='c' transform='translate(0 0)'%3E%3Cpath class='d' d='M12.612,13.636a16.24,16.24,0,0,1-1.86-.822,13.436,13.436,0,0,0,1.6-.708,11.312,11.312,0,0,0,.264,1.53M16.032,7.3c-.266-.034-.128.091-.2.442a5.465,5.465,0,0,1-2.8,3.338,16.141,16.141,0,0,1,.249-4.84c.275-1,.6-.813.2-1.022-.427-.22-.887.071-1.258.813A27.247,27.247,0,0,1,7.4,13.522a2.141,2.141,0,0,1-2.918.461c-.206-.174-.282.095-.026.37a2.412,2.412,0,0,0,3.387-.082A32.715,32.715,0,0,0,12.219,7.51a23.541,23.541,0,0,0,.063,3.971,11.464,11.464,0,0,1-1.964.749c-.388.1-.628.26-.635.439-.007.2.253.363.63.541.67.318,2.633,1.246,3.117,1.527.414.24.616.053.739-.207.16-.338-.279-.533-.7-.661a13.175,13.175,0,0,1-.382-2.179,7.143,7.143,0,0,0,2.547-2.454,4.7,4.7,0,0,0,.4-1.133,2.125,2.125,0,0,0,.048-.742s-.007-.054-.048-.059' transform='translate(-3.51 -3.943)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
  const _desktopLogo =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='149.351' height='42' viewBox='0 0 149.351 42'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:none;%7D.b%7Bclip-path:url(%23a);%7D.c%7Bfill:%2300aad2;%7D.d%7Bfill:%235f6a72;%7D%3C/style%3E%3CclipPath id='a'%3E%3Crect class='a' width='149.351' height='42'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg class='b'%3E%3Crect class='c' width='13.555' height='13.555' transform='translate(135.796 21.524)'/%3E%3Cpath class='d' d='M63.082,33.088c-1.383.138-2.835.277-4.357.346.553-4.357,2.835-10.373,5.671-9.405,1.66.553.761,5.671-1.314,9.059m-3.527,2.974a3.761,3.761,0,0,1-1.245,0,.851.851,0,0,0,.346-.692v-.553c.761,0,1.936-.138,3.389-.277a4.327,4.327,0,0,1-2.49,1.521M76.844,25.688c1.8-1.66,2.7-1.521,2.9-1.106.484.968-1.591,4.357-5.671,6.224a10.328,10.328,0,0,1,2.766-5.118m66.736,1.66c-.207-3.389-3.181-3.942-3.6-2.974-.138.346,1.106.207,1.106,2.628,0,3.942-4.011,9.129-9.129,9.129-5.532,0-6.985-4.357-7.261-6.432-.207-1.452.138-3.458-2.351-3.181-1.729.207-3.25,3.527-5.463,6.362-1.867,2.42-2.7,2.213-2.282.138.553-2.628,2.7-8.714,5.187-9.129,1.176-.207,1.591,1.8,2.075.553s.069-4.011-2.559-4.011c-1.8,0-3.942,1.936-5.74,4.08-1.521,1.936-9.336,13.416-12.656,10.927-1.521-1.176-1.383-5.878-.415-11.411,3.873-1.521,7.123-1.037,8.921-.138.9.415,1.037.346.622-.622-.553-1.452-3.665-3.734-8.575-2.7-.138,0-.207.069-.346.069.415-1.8.83-3.665,1.383-5.463.484-1.66,1.8-4.5-1.729-4.979-1.106-.207-.622.346-1.037,1.867-.692,2.766-1.521,6.362-2.144,10.028a19.745,19.745,0,0,0-7.538,8.091,38.59,38.59,0,0,0,.9-4.772,1.589,1.589,0,0,0-1.245-1.729c-.761-.207-1.729.138-2.628,1.452-2.144,3.043-4.841,7.815-8.99,9.82-2.974,1.452-4.288,0-4.357-2.282a9.869,9.869,0,0,0,1.521-.553c5.394-2.351,7.192-5.947,5.878-8.16-1.314-2.075-4.979-1.452-7.953,1.66a11.175,11.175,0,0,0-2.7,6.5c-1.245.277-2.628.484-4.219.692,2.49-4.08,2.282-9.613-1.383-10.581-4.288-1.106-6.432,3.043-7.331,6.5.346-3.873.9-7.745,1.591-11.549.346-1.66,1.452-4.5-2.075-4.979-1.106-.207-.968.346-.9,1.867.138,2.075-2.144,14.454-.968,19.848-1.521.484-2.144,1.66-.207,2.835,1.383.83,4.357,1.106,7.331-.346a9.3,9.3,0,0,0,2.766-2.144c1.8-.207,3.665-.553,5.394-.83.277,2.42,1.867,4.219,5.463,3.873,5.118-.484,9.682-6.777,11.411-9.82-.346,3.25-2.42,10.373,1.176,10.028,1.383-.138.83-.346.9-1.591.346-4.288,3.873-7.953,7.4-10.166-.622,5.256-.415,9.958,2.006,11.411,4.426,2.766,10.581-4.5,14.039-8.921-1.729,3.942-2.7,8.921-.138,9.682,3.043.9,5.463-4.219,8.3-8.091.346,2.766,2.213,7.607,9.682,7.607,8.022-.069,13.071-4.91,12.863-10.1m-108.3,8.645A66.439,66.439,0,0,1,27.4,32.534a59.168,59.168,0,0,0,6.777-2.974,54.453,54.453,0,0,0,1.106,6.432m20.4,3.873c-.069-.207-.622.069-1.106,0-1.452-.207-3.389-2.213-3.942-5.463-1.037-5.878-.415-11.687,1.314-20.332.346-1.66,1.452-4.5-2.075-5.048-1.106-.138-.553.415-.83,1.867C47.66,17.32,42.4,21.954,37.149,25.066,36.6,17.735,36.8,9.505,38.186,4.526c1.176-4.219,2.559-3.458.83-4.357s-3.734.277-5.325,3.458S24.839,23.89,13.221,35.439C7.273,41.317,1.879,38.274.842,37.375c-.9-.761-1.176.415-.138,1.591,4.772,5.256,11.826,2.282,14.384-.277,7.054-7.054,15.283-22.268,18.6-28.7a98.251,98.251,0,0,0,.277,16.874,50.129,50.129,0,0,1-8.3,3.181c-1.66.415-2.7,1.106-2.7,1.867s1.106,1.521,2.7,2.282c2.835,1.383,11.2,5.256,13.209,6.5,1.729,1.037,2.628.207,3.112-.9.692-1.452-1.176-2.282-2.974-2.766a60.545,60.545,0,0,1-1.66-9.267c4.219-2.628,8.437-6.086,10.788-10.443C47.522,20.916,46,33.3,49.873,38.482a5.451,5.451,0,0,0,4.564,2.213c.968-.069,1.383-.692,1.245-.83' transform='translate(-0.038 0.124)'/%3E%3C/g%3E%3C/svg%3E";

  let _slotParentEl: HTMLElement;
  let _rootEl: HTMLElement;
  let _windowWidth = window.innerWidth;
  let _showToggleMenu = false;
  let _showMenu = false;

  let _appHeaderLinks: Element[] = [];
  let _appHeaderMenuItems: AppHeaderMenuProps[] = [];

  // Reactive

  $: _mobile = _windowWidth < MOBILE_BP;
  $: _tablet = _windowWidth >= MOBILE_BP && _windowWidth < fullmenubreakpoint;
  $: _desktop = _windowWidth >= +fullmenubreakpoint;
  $: (async () => {
    _showToggleMenu = _desktop ? false : ((await hasChildren()) as boolean);
    onShowToggleMenuChange();
  })();

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
        <button on:click={toggleMenu} data-testid="menu-toggle">
          Menu
          <goa-icon type={_showMenu ? "chevron-up" : "chevron-down"} mt="1" />
        </button>
      </div>
    {/if}

    <!-- Menu and menu button for tablet -->
    {#if _showToggleMenu && _tablet}
      <goa-popover
        class="menu"
        open={_showMenu}
        minwidth="16rem"
        context="app-header-menu"
        focusborderwidth="0"
        borderradius="0"
        padded="false"
        tabindex="-1"
        height="full"
        position="below"
        on:_close={hideMenu}
      >
        <div
          slot="target"
          style={styles("height: 100%")}
          class="menu-toggle-area"
        >
          <button on:click={toggleMenu} data-testid="menu-toggle">
            Menu
            <goa-icon type={_showMenu ? "chevron-up" : "chevron-down"} mt="1" />
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
    {#if (_showMenu && _mobile) || _desktop}
      <div bind:this={_slotParentEl} data-testid="slot" class="content-area">
        <slot />
      </div>
    {/if}
  </div>
</div>

<!-- Style -->

<style>
  *,
  :global(::slotted(*)) {
    font: var(--goa-typography-body-s);
  }

  /* =============== */
  /* Common          */
  /* =============== */

  /* spans the full page width */
  .container {
    border-bottom: var(--goa-border-width-s) solid
      var(--goa-color-greyscale-200);
    background-color: var(--goa-color-greyscale-white);
  }

  .title {
    margin-left: var(--goa-space-s);
    color: var(--goa-color-text-default);
    font: var(--goa-typography-body-s);
    max-width: 624px;
  }

  /* contains all children within component */
  .layout {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "header menu"
      "links links";
  }

  .header-logo-title-area {
    grid-area: header;

    display: flex;
    text-decoration: none;
    padding: var(--goa-space-m);
    align-items: flex-start;
  }

  .tablet .header-logo-title-area,
  .desktop .header-logo-title-area {
    min-height: calc(
      4rem - 2 * (var(--goa-spacing-m))
    ); /* desired min-height minus the required padding */
  }

  .header-logo-title-area:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: calc(-1 * var(--goa-border-width-l));
  }

  .header-logo-title-area .title {
    font: var(--goa-typography-body-s);
    margin-left: var(--goa-space-xs);
  }

  .menu-toggle-area {
    grid-area: menu;
    display: flex;
    align-items: flex-end;
    justify-content: right;
    gap: var(--goa-space-2xs);
  }

  .menu-toggle-area button {
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    color: var(--goa-color-text-default);
    cursor: pointer;
    text-decoration: underline;
    padding-left: var(--goa-space-m);
  }

  .menu-toggle-area goa-icon {
    scale: 0.8;
  }

  .menu-toggle-area:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: calc(-1 * var(--goa-border-width-l));
  }

  .image-desktop {
    height: 2rem;
  }

  .content-area {
    grid-area: links;
  }

  :global(::slotted(a)) {
    display: block;
    margin: 0;
    font: var(--goa-typography-body-m);
    text-decoration: none;
    color: var(--goa-color-text-default);
    padding: calc((3rem - var(--goa-line-height-3)) / 2) var(--goa-space-m);
    cursor: pointer;
    white-space: nowrap;
  }

  :global(::slotted(a:hover)) {
    background-color: var(--goa-color-greyscale-100);
    color: var(--goa-color-interactive-hover);
  }

  :global(::slotted(a:focus-visible)) {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: calc(-1 * var(--goa-border-width-l));
    background: var(--goa-color-greyscale-100);
    color: var(--goa-color-interactive-hover);
  }

  :global(::slotted(a.interactive)) {
    text-decoration: underline;
    color: var(--goa-color-interactive-default);
  }

  /* Mobile */

  .mobile :global(::slotted(a)) {
    box-shadow: inset 0 var(--goa-border-width-s) 0 0
      var(--goa-color-greyscale-200);
  }

  .mobile .image-desktop {
    display: none;
  }

  .mobile .image-mobile {
    display: block;
    width: var(--goa-icon-size-l);
  }

  .mobile.show-menu {
    border-bottom: var(--goa-border-width-m) solid
      var(--goa-color-greyscale-200);
  }

  .mobile .menu-toggle-area button {
    height: 3.375rem;
    margin: 0 var(--goa-space-xs);
  }

  /* Tablet */

  .tablet *,
  .tablet:global(::slotted(*)) {
    font: var(--goa-typography-body-m);
  }

  .tablet :global(::slotted(a)) {
    box-shadow: inset 0 var(--goa-border-width-s) 0 0
      var(--goa-color-greyscale-200);
  }

  .tablet .image-desktop {
    display: block;
  }

  .tablet .image-mobile {
    display: none;
  }

  .tablet .header-logo-title-area {
    padding: var(--goa-space-m) 0;
    min-height: calc(4rem - 2 * var(--goa-space-m)); /* - top/bottom padding */
  }

  .tablet .title {
    margin-left: var(--goa-space-m);
    font: var(--goa-typography-body-m);
  }

  .tablet .menu-toggle-area button {
    height: 4rem;
  }

  @media (--tablet) {
    /* padding is independent from fullmenubreakpoint, should use media query */
    .container {
      padding: 0 var(--goa-space-xl);
    }
  }

  /* Desktop */

  .desktop .content-area {
    grid-area: menu;
    display: flex;
    align-items: stretch;
  }

  .desktop .header-logo-title-area {
    grid-area: header;
    display: flex;
    align-items: flex-start;
    color: inherit;
    flex: 1 1 auto;
    padding: var(--goa-space-m) 0;
    min-height: calc(4rem - 2 * var(--goa-space-m)); /* - top/bottom padding */
  }

  .desktop .image-desktop {
    display: block;
  }

  .desktop .image-mobile {
    display: none;
  }

  .desktop .title {
    margin-left: var(--goa-space-m);
    font: var(--goa-typography-body-m);
  }

  .desktop .layout {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto;
    grid-template-areas: "header . menu";
    margin: 0 auto;
    width: min(var(--max-content-width), 100%);
  }

  .desktop :global(::slotted(goa-app-header-menu)),
  .desktop :global(::slotted(a)),
  .desktop :global(::slotted(a:visited)) {
    color: var(--goa-color-text-default);
    font-weight: var(--goa-font-weight-bold);
    display: inline-flex;
    align-items: center;
    padding: var(--goa-space-m) var(--goa-space-s);
  }

  .desktop :global(::slotted(goa-app-header-menu)) {
    padding: 0;
  }

  .desktop :global(::slotted(a:focus-visible)),
  .desktop :global(::slotted(a:hover)) {
    background: var(--goa-color-greyscale-100);
    cursor: pointer;
    color: var(--goa-color-interactive-hover);
  }

  .desktop :global(::slotted(a:focus-visible)),
  .desktop :global(::slotted(goa-app-header-menu:focus-visible)) {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: calc(-1 * var(--goa-border-width-l));
  }

  .desktop :global(::slotted(a.current)) {
    border-top: 4px solid var(--goa-color-interactive-default);
    border-bottom: 4px solid transparent;
  }

  .desktop :global(::slotted(a.current:hover)) {
    border-top: 4px solid var(--goa-color-interactive-hover);
  }

  .desktop :global(::slotted(a.interactive)) {
    font-weight: var(--goa-font-weight-medium);
    text-decoration: underline;
    color: var(--goa-color-interactive-default);
    padding: 0 var(--goa-space-m);
  }

  .desktop :global(::slotted(a.interactive:hover)) {
    color: var(--goa-color-interactive-hover);
  }

  .desktop :global(::slotted(a.interactive.current)) {
    border-color: transparent;
    margin-left: var(--goa-space-m);
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

  :global(::slotted(a.current.inside-collapse-menu)) {
    color: var(--goa-color-text-light);
    background-color: var(--goa-color-interactive-default);
  }

  :global(::slotted(a.current.inside-collapse-menu:hover)) {
    background-color: var(--goa-color-interactive-hover);
  }
</style>
