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
  :global(::slotted(a)),
  :global(::slotted(a:visited)) {
    /* required to override base styles */
    color: var(--goa-color-text-default) !important;

    display: block;
    font: var(--goa-typography-body-m);
    padding: 0.5rem 1rem 0.5rem 2rem;
    text-decoration: none;
  }

  :global(::slotted(a.current)) {
    font: var(--goa-typography-heading-s);
    background: #cedfee;
  }

  :global(::slotted(a:hover:not(.current))) {
    background: #cedfee;
  }

  :global(::slotted(a:focus-visible)) {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  .side-menu {
    display: block;
  }
</style>
