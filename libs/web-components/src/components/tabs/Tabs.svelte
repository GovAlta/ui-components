<svelte:options customElement="goa-tabs" />

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { clamp, fromBoolean } from "../../common/utils";
  import { GoATabProps } from "../tab/Tab.svelte";

  export let initialtab: number = 1; // 1-based

  // Private

  let _rootEl: HTMLElement;
  let _tabsEl: HTMLElement;
  let _panelEl: HTMLElement;
  let _currentTab: number = 1;

  let _tabProps: GoATabProps[] = [];
  let _bindTimeoutId: any;

  // ========
  // Hooks
  // ========

  onMount(() => {
    getChildren();
    addKeyboardEventListeners();
  });

  onDestroy(() => {
    removeKeyboardEventListeners();
  });

  // =========
  // Functions
  // =========

  function getChildren() {
    _rootEl.addEventListener("tab:mounted", (e: Event) => {
      const detail = (e as CustomEvent<GoATabProps>).detail;
      _tabProps = [..._tabProps, detail];

      if (_bindTimeoutId) {
        clearTimeout(_bindTimeoutId);
      }
      _bindTimeoutId = setTimeout(() => {
        bindChildren();
        setCurrentTab(initialtab || 1);
      });
    });
  }

  function bindChildren() {
    const path = window.location.pathname;

    // create buttons (tabs) for each of the tab contents elements
    _tabProps.forEach((tabProps, index) => {
      let tabSlug: string = "";
      let headingEl: HTMLElement;

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
      link.setAttribute("href", path + "#" + tabSlug);
      link.addEventListener("click", () => setCurrentTab(index + 1));
      link.setAttribute("aria-controls", `tabpanel-${index + 1}`);
      link.appendChild(headingEl);

      _tabsEl.appendChild(link);
    });
  }

  function addKeyboardEventListeners() {
    _rootEl.addEventListener("focus", handleKeydownEvents, true);
  }

  function removeKeyboardEventListeners() {
    // TODO: determine if this is ever being called
    _rootEl.removeEventListener("focus", handleKeydownEvents, true);
  }

  function setCurrentTab(tab: number) {
    // prevent tab from exceeding limits
    _currentTab = clamp(tab, 1, _tabProps.length);

    let currentLocation = "";
    [..._tabsEl.querySelectorAll("[role=tab]")].map((el, index) => {
      const isCurrent = index + 1 === _currentTab; // currentTab is 1-based
      el.setAttribute("aria-selected", fromBoolean(isCurrent));
      el.setAttribute("tabindex", isCurrent ? "0" : "-1");
      if (isCurrent) {
        currentLocation = (el as HTMLLinkElement).href;
        // @ts-expect-error
        el.focus();
      }
    });

    for (const [i, props] of _tabProps.entries()) {
      props.el.dispatchEvent(
        new CustomEvent("tabs:set-open", {
          composed: true,
          detail: {
            open: i + 1 === tab,
          },
        }),
      );
    }

    _panelEl.setAttribute("aria-labelledby", `tab-${_currentTab}`);
    _panelEl.setAttribute("id", `tabpanel-${_currentTab}`);

    // update the browswers url with the new hash
    if (currentLocation) {
      document.location = currentLocation;
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

<div role="tablist" bind:this={_rootEl}>
  <div class="tabs" bind:this={_tabsEl}></div>
  <div class="tabpanel" tabindex="0" bind:this={_panelEl} role="tabpanel">
    <slot />
  </div>
</div>

<style>
  :host {
    box-sizing: border-box;
    font: var(--goa-typography-body-m);
  }

  :global(.tab) {
    display: flex;
    gap: var(--goa-space-xs);
  }

  :global([role="tab"]) {
    display: block;
    background: none;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    font: var(--goa-typography-body-m);
    color: var(--goa-color-text-default);
    text-decoration: none;
    letter-spacing: 0.03125rem;
  }

  :global([role="tab"][aria-selected="true"]) {
    font: var(--goa-typography-heading-s);
  }

  :global([role="tab"]:focus-visible) {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  :global([role="tab"]:hover:not([aria-selected="true"])),
  :global([role="tab"]:focus:not([aria-selected="true"])),
  :global([role="tab"]:focus-visible:not([aria-selected="true"])) {
    border-color: var(--goa-color-greyscale-200);
  }

  @media (--not-mobile) {
    :global([role="tablist"]) {
      border-bottom: none;
    }
    .tabs {
      border-bottom: var(--goa-border-width-s) solid
        var(--goa-color-greyscale-200);
      display: flex;
      gap: var(--goa-space-xl);
    }
    :global([role="tab"]) {
      padding: var(--goa-space-s) var(--goa-space-m);
      border-bottom: 4px solid transparent;
    }
    :global([role="tab"][aria-selected="true"]) {
      border-color: var(--goa-color-interactive-default);
    }
  }

  @media (--mobile) {
    :global([role="tab"]) {
      width: 100%;
      padding: var(--goa-space-xs) 0;
      padding-left: 12px;
      border-left: 4px solid transparent;
    }
    :global([role="tab"][aria-selected="true"]) {
      border-color: var(--goa-color-interactive-default);
      background: var(--goa-color-info-background);
    }
  }
</style>
