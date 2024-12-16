<svelte:options customElement="goa-side-menu" />

<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { getSlottedChildren } from "../../common/utils";
  import { isUrlMatch, getMatchedLink } from "../../common/urls";
  import { SideMenuGroupProps } from "../side-menu-group/SideMenuGroup.svelte";

  export let testid: string = "";

  let _rootEl: HTMLElement;
  let _sideMenuLinks: Element[] = [];
  let _sideMenuGroupItems: SideMenuGroupProps[] = [];
  let observer: MutationObserver | null = null;

  onMount(async () => {
    await tick();
    getChildren();
    addEventListeners();
  });

  onDestroy(() => {
    removeEventListeners();
  });

  function getChildren() {
    if (!_rootEl) return;

    const slotChildren = getSlottedChildren(_rootEl);

    if (slotChildren.length === 0) return;

    _sideMenuLinks = slotChildren
      .filter((el) => el.tagName === "A")
      .map((el) => {
        el.classList.remove("current");
        return el;
      });

    _rootEl.addEventListener("sidemenugroup:mounted", handleSideMenuGroupMount);
  }

  function handleSideMenuGroupMount(e: Event) {
    const sideMenuGroupProps = (e as CustomEvent<SideMenuGroupProps>).detail;
    _sideMenuGroupItems = [..._sideMenuGroupItems, sideMenuGroupProps];
    setCurrentUrl();
  }

  function setCurrentUrl() {
    const url = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    // check all links under SideMenu and SideMenuGroups
    let links = [..._sideMenuLinks];
    _sideMenuGroupItems.forEach((el) => {
      links = [...links, ...el.links];
    });

    links.forEach((link) => link.classList.remove("current"));

    const currentEl = getMatchedLink(links, window.location);
    currentEl?.classList.add("current");

    // even nothing is matched, we should inform side menu group to close and remove current
    dispatchCurrentUrl(currentEl?.getAttribute("href") || "");
  }

  function dispatchCurrentUrl(href: string) {
    _sideMenuGroupItems.forEach((item) => {
      item.el.dispatchEvent(
        new CustomEvent("sidemenu:current:change", {
          composed: true,
          detail: href,
        }),
      );
    });
  }

  function addEventListeners() {
    // watch path changes
    let currentLocation = document.location.href;
    observer = new MutationObserver((_mutationList) => {
      if (isUrlMatch(document.location, currentLocation)) {
        currentLocation = document.location.href;
        setCurrentUrl();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // watch hash / browser history changes
    window.addEventListener("popstate", setCurrentUrl);
  }

  function removeEventListeners() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    window.removeEventListener("popstate", setCurrentUrl);
    if (_rootEl) {
      _rootEl.removeEventListener(
        "sidemenugroup:mounted",
        handleSideMenuGroupMount,
      );
    }
  }
</script>

<div bind:this={_rootEl} class="side-menu" data-testid={testid}>
  <slot />
</div>

<style>

  /* TODO: Component tokens, to move to design tokens file ------------------------------------------------------- */
  :host {
    --goa-side-menu-color-bg: var(--goa-color-greyscale-white); /*The background color of the overall side menu container.*/
    --goa-side-menu-color-menu-item: var(--goa-color-text-default);
    --goa-side-menu-color-bg-menu-item-hover: #cedfee; /*The background color of the menu items on hover.*/
    --goa-side-menu-color-bg-menu-item-current: #cedfee; /*The background color of the current menu item.*/

    --goa-side-menu-typography-item: var(--goa-typography-body-m); /*The typography of the menu items.*/
    --goa-side-menu-typography-item-current: var(--goa-typography-heading-s); /*The typography of the current page.*/

    --goa-side-menu-items-gap: var(--goa-space-none); /*The gap between the menu items.*/

    --goa-side-menu-padding: var(--goa-space-m) var(--goa-space-none) var(--goa-space-l) var(--goa-space-none); /*Padding around the main side menu*/
		--goa-side-menu-border-right: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);; /*Border color around the side menu*/
		--goa-side-menu-width: 256px; /*(The fixed width of the side menu.*/

    --goa-side-menu-padding-item: 8px var(--goa-space-s) 10px var(--goa-space-xl);

    --goa-side-menu-item-focus-border: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);


    /* Heading */
    --goa-side-menu-heading-margin: var(--goa-space-none) 0 0 0;
    --goa-side-menu-heading-padding: var(--goa-space-s) var(--goa-space-s) var(--goa-space-xs) var(--goa-space-l);
    --goa-side-menu-heading-color: var(--goa-color-text-secondary);
    --goa-side-menu-heading-color-bg: var(--goa-color-greyscale-100);
    --goa-side-menu-heading-typography: var(--goa-typography-heading-s);
    --goa-side-menu-heading-border: var(--goa-border-width-m) solid var(--goa-color-greyscale-200);
    --goa-side-menu-heading-icon-gap: var(--goa-space-xs);
    --goa-side-menu-icon-size: var(--goa-icon-size-l);
    --goa-side-menu-icon-color: var(--goa-color-text-secondary);

    /* Group */
    --goa-side-menu-sub-item-margin: var(--goa-space-m);
    --goa-side-menu-padding-sub-item: 8px var(--goa-space-s) 10px var(--goa-space-m);
    --goa-side-menu-sub-item-border-left: 4px solid var(--goa-color-greyscale-100);
    --goa-side-menu-sub-item-border-left-hover: 4px solid var(--goa-color-greyscale-200);
    --goa-side-menu-sub-item-border-left-current: 4px solid var(--goa-color-interactive-disabled);

    --goa-side-menu-sub-item-color-bg: none;
    --goa-side-menu-sub-item-color-bg-hover: var(--goa-color-info-background);
    --goa-side-menu-sub-item-color-bg-current: var(--goa-color-info-background);

  }

  :global(::slotted(a)),
  :global(::slotted(a:visited)) {
    /* required to override base styles */
    color: var(--goa-side-menu-color-menu-item) !important;
    display: block;
    font: var(--goa-side-menu-typography-item);
    padding: var(--goa-side-menu-padding-item);
    text-decoration: none;
  }

  :global(::slotted(a.current)) {
    font: var(--goa-side-menu-typography-item-active);
    background: var(--goa-side-menu-color-bg-menu-item-hover);
  }

  :global(::slotted(a:hover:not(.current))) {
    background: var(--goa-side-menu-color-bg-menu-item-hover);
  }

  :global(::slotted(a:focus-visible)) {
    outline: var(--goa-side-menu-item-focus-border);
  }

  .side-menu {
    width: var(--goa-side-menu-width);
    display: flex;
    height: 100%;
    flex-direction: column;
    gap: var(--goa-side-menu-items-gap);
    border-right: var(--goa-side-menu-border-right); /* should this happen on the parent div on the page? */  }
</style>
