<svelte:options customElement="goa-tabs" />

<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { clamp, ensureSlotExists, fromBoolean } from "../../common/utils";
  import { GoATabProps } from "../tab/Tab.svelte";

  export let initialtab: number = -1; // 1-based
  export let testid: string = "";

  // Private

  let _rootEl: HTMLElement;
  let _tabsEl: HTMLElement;
  let _slotEl: HTMLElement;
  let _currentTab: number = 1;
  let _tabProps: (GoATabProps & { bound: boolean })[] = [];
  let _bindTimeoutId: any;
  let _initialLoad: boolean = true;

  // ========
  // Hooks
  // ========

  onMount(() => {
    ensureSlotExists(_rootEl);
    addChildMountListener();
    addKeyboardEventListeners();
  });

  onDestroy(() => {
    removeKeyboardEventListeners();
  });

  // =========
  // Functions
  // =========

  function getTabIndexFromHash() {
    // We need to see the full hash in order to open the correct tab and scroll down to the anchor if there is
    const fullHash = window.location.href.split("#").slice(1).join("#"); // Ex: tab-1#example1

    if (!fullHash) return null;

    // Find the matching tab based on href
    const tabs = _tabsEl?.querySelectorAll('[role="tab"]') || [];

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i] as HTMLAnchorElement;

      const tabHref = tab.getAttribute("href");
      const tabHash = tabHref?.split("#")[1] || "";

      if (fullHash.split("#").includes(tabHash)) {
        return i + 1;
      }
    }
    return null;
  }

  function addChildMountListener() {
    _rootEl.addEventListener("tab:mounted", (e: Event) => {
      const detail = (e as CustomEvent<GoATabProps>).detail;

      // tabs initially marked as unbound
      _tabProps = [..._tabProps, { ...detail, bound: false }];

      if (_bindTimeoutId) {
        clearTimeout(_bindTimeoutId);
      }
      _bindTimeoutId = setTimeout(() => {
        bindChildren();

        // Check URL hash on initial load
        if (_initialLoad) {
          const tabIndexFromHash = getTabIndexFromHash();
          // We don't override the URL if user doesn't set initialTab or using href
          // It will help prevent scrolling to tabs if it is located in the bottom of the page
          if (tabIndexFromHash == null && initialtab === -1) return;

          setCurrentTab(tabIndexFromHash ?? (initialtab || 1));
          _initialLoad = false;
        }
      }, 1);
      e.stopPropagation();
    });
  }

  function bindChildren() {
    const path = window.location.pathname;
    const search = window.location.search; // Get current query string

    // create buttons (tabs) for each of the tab contents elements
    _tabProps.forEach((tabProps, index) => {
      let tabSlug: string = "";
      let headingEl: HTMLElement;

      // ensure that any previously bound tabs are not re-bound
      if (tabProps.bound) return;

      // set bound status to prevend possible later rebinding
      tabProps.bound = true;

      // sync all tabs to open tab
      tabProps.el.dispatchEvent(
        new CustomEvent("tabs:set-open", {
          composed: true,
          detail: {
            open: index + 1 === _currentTab,
          },
        }),
      );

      // create tabs
      if (tabProps.headingType === "slot") {
        headingEl = tabProps.heading as HTMLElement;
      } else {
        const heading = tabProps.heading as string;
        headingEl = document.createElement("div");
        headingEl.textContent = heading;
        tabSlug = heading;
      }

      headingEl.classList.add("tab");
      tabSlug ||= "tab-" + index;

      // create tab link
      const link = document.createElement("a");
      link.setAttribute("id", `tab-${index + 1}`);
      link.setAttribute("data-testid", `tab-${index + 1}`);
      link.setAttribute("role", "tab");
      link.setAttribute("href", `${path}${search}#${tabSlug}`);
      link.addEventListener("click", () => setCurrentTab(index + 1));
      link.setAttribute("aria-controls", `tabpanel-${index + 1}`);
      link.appendChild(headingEl);

      _tabsEl?.appendChild(link);
    });
  }

  function addKeyboardEventListeners() {
    _rootEl.addEventListener("focus", handleKeydownEvents, true);
  }

  function removeKeyboardEventListeners() {
    _rootEl.removeEventListener("focus", handleKeydownEvents, true);
  }

  function setCurrentTab(tab: number) {
    if (!_tabsEl) return;

    const previousTab = _currentTab;

    // prevent tab from exceeding limits
    _currentTab = clamp(tab, 1, _tabProps.length);

    if (previousTab != _currentTab) {
      _rootEl.dispatchEvent(
        new CustomEvent("_change", {
          composed: true,
          bubbles: true,
          detail: { tab: _currentTab },
        }),
      );
    }

    let currentLocation = "";
    // @ts-expect-error
    [..._tabsEl.querySelectorAll("[role=tab]")].map((el, index) => {
      const isCurrent = index + 1 === +_currentTab; // currentTab is 1-based
      el.setAttribute("aria-selected", fromBoolean(isCurrent));
      el.setAttribute("tabindex", isCurrent ? "0" : "-1");
      if (isCurrent) {
        currentLocation = (el as HTMLLinkElement).href;
        el.focus();
      }
    });

    for (const [i, props] of _tabProps.entries()) {
      props.el.dispatchEvent(
        new CustomEvent("tabs:set-open", {
          composed: true,
          detail: {
            open: i + 1 === +tab,
          },
        }),
      );
    }

    _slotEl.setAttribute("aria-labelledby", `tab-${_currentTab}`);
    _slotEl.setAttribute("id", `tabpanel-${_currentTab}`);

    // update the browswers url with the new hash
    if (currentLocation) {
      const url = new URL(currentLocation);
      // to make sure we preserve multiple #, for example /#tab-1#example
      const currentHash = url.hash.substring(1);
      const allHashes = window.location.href.split('#').slice(1);
      const otherHashes = allHashes.filter(hash => !hash.startsWith('tab-')); // #example
      const newHash = [currentHash, ...otherHashes].filter(Boolean).join('#');

      history.replaceState({}, "", url.pathname + url.search + (newHash ? '#' + newHash : ''));

      if (_initialLoad) {
        const anchorHash = otherHashes[0];
        if (anchorHash) {
          tick().then(() => {
            const element = document.getElementById(anchorHash) || document.querySelector(`[name="${anchorHash}"]`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          });
        }
      }
    }
  }

  function handleKeydownEvents() {
    _rootEl.addEventListener("keydown", onKeyDown);
  }

  function onKeyDown(e: KeyboardEvent) {
    let isHandled = false;
    const isTabButtonFocused = e.target && _tabsEl.contains(e.target as Node);

    if (!isTabButtonFocused) {
      return;
    }

    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
        if (_currentTab === 1) {
          setCurrentTab(_tabProps.length);
        } else {
          setCurrentTab(_currentTab - 1);
        }
        isHandled = true;
        break;
      case "ArrowDown":
      case "ArrowRight":
        if (_currentTab === _tabProps.length) {
          setCurrentTab(1);
        } else {
          setCurrentTab(_currentTab + 1);
        }
        isHandled = true;
        break;
      case "Home":
        setCurrentTab(1);
        isHandled = true;
        break;
      case "End":
        setCurrentTab(_tabProps.length);
        isHandled = true;
        break;
      default:
        break;
    }

    if (isHandled) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
</script>

<!--HTML-->

<div role="tablist" bind:this={_rootEl} data-testid={testid}>
  <div class="tabs" bind:this={_tabsEl}></div>
  <div class="tabpanel" tabindex="0" bind:this={_slotEl} role="tabpanel">
    <slot />
  </div>
</div>

<style>

  :host {
    box-sizing: border-box;
    font: var(--goa-tab-typography);
  }

  :global(.tab) {
    display: flex;
    align-items: center;
    gap: var(--goa-space-xs);
  }

  :global([role="tab"]) {
    display: flex;
    background: none;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    font: var(--goa-tab-typography);
    color: var(--goa-tab-text-color);
    text-decoration: none;
  }

  :global([role="tab"][aria-selected="true"]) {
    font: var(--goa-tab-typography-selected);
  }

  :global([role="tab"]:focus-visible) {
    outline: var(--goa-tab-border-focus);
  }

  :global([role="tab"]:hover:not([aria-selected="true"])) {
    border-bottom: var(--goa-tab-border-hover);
  }

  :global([role="tabpanel"]:focus-visible) {
    outline: var(--goa-tab-border-focus);
    outline-offset: 4px; /* Adjust as needed */
  }


  @media (--not-mobile) {
    :global([role="tablist"]) {

    }
    .tabs {
      border-bottom: var(--goa-tabs-bottom-border);
      display: flex;
      gap: var(--goa-tabs-gap);
      margin-bottom: 2rem;
    }
    :global([role="tab"]) {
      padding: var(--goa-tab-padding);
      border-bottom: var(--goa-tab-border-not-selected);
      text-overflow: ellipsis;
      min-width: var(--goa-space-2xl);
      justify-content: center; /* Horizontally center content */
    }
    :global([role="tab"][aria-selected="true"]) {
      border-bottom: var(--goa-tab-border-selected);
    }
  }

  @media (--mobile) {

    .tabs {
      border-left: var(--goa-tabs-bottom-border);
      border-bottom: var(--goa-tabs-bottom-border);
      display: flex;
      flex-direction: column;
      gap: var(--goa-tabs-gap-small-screen);
      padding-bottom: var(--goa-space-m);
      margin-bottom: 2rem;
    }

    :global([role="tab"]) {
      padding: var(--goa-tab-padding-mobile);
      border-left: var(--goa-tab-border-not-selected);
      text-overflow: wrap;
      white-space: normal; /* Allows text to wrap */
      word-break: break-word; /* Ensures long words break onto the next line */
      overflow-wrap: break-word; /* Alternative for word wrapping */
    }
    :global([role="tab"][aria-selected="true"]) {
      border-left: var(--goa-tab-border-selected);
      background: var(--goa-tab-color-bg-selected-small-screen);
    }
    :global([role="tab"]:hover:not([aria-selected="true"])) {
    border-left: var(--goa-tab-border-hover);
    border-bottom: none;
    }
  }
</style>
