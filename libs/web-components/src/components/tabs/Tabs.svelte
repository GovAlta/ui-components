<svelte:options
  customElement={{
    tag: "goa-tabs",
  }}
/>

<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { clamp, ensureSlotExists, fromBoolean } from "../../common/utils";
  import { GoATabProps } from "../tab/Tab.svelte";

  /** The initially active tab (1-based index). If not set, the first tab is active. */
  export let initialtab: number = -1;
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** @internal Design system version for styling. */
  export let version: "1" | "2" = "1";
  /** Visual style variant. "segmented" shows pill-style tabs with animation. */
  export let variant: "default" | "segmented" = "default";
  /** Tab layout orientation. "auto" stacks vertically on mobile, "horizontal" keeps horizontal on all screen sizes. */
  export let orientation: "auto" | "horizontal" = "auto";
  export let navigation: "hash" | "none" = "hash";

  // Private
  let _rootEl: HTMLElement;
  let _tabsEl: HTMLElement;
  let _slotEl: HTMLElement;
  let _currentTab: number = 1;
  let _tabProps: (GoATabProps & { bound: boolean })[] = [];
  let _bindTimeoutId: any;
  let _initialLoad: boolean = true;

  let _segmentedIndicatorLeft: number = 0;
  let _segmentedIndicatorWidth: number = 0;
  let _segmentedIndicatorHeight: number = 30; // 30px is a default height, real value will be calculated later
  let _segmentedTransitionDuration: number = 0;
  let _previousTabIndex: number = 1;
  let _visibilityObserver: IntersectionObserver | null = null;

  const MIN_TRANSITION_DURATION = 200;
  const DURATION_PER_PIXEL = 0.2;
  const MAX_TRANSITION_DURATION = 400;

  // ========
  // Hooks
  // ========

  onMount(() => {
    ensureSlotExists(_rootEl);
    addChildMountListener();
    addKeyboardEventListeners();
    if (navigation !== "none") {
      addHashChangeListener();
    }
  });

  onDestroy(() => {
    removeKeyboardEventListeners();
    if (navigation !== "none") {
      removeHashChangeListener();
    }
    if (_visibilityObserver) {
      _visibilityObserver.disconnect();
      _visibilityObserver = null;
    }
  });

  // =========
  // Functions
  // =========

  function getFirstEnabledTab(): number {
    for (let i = 0; i < _tabProps.length; i++) {
      if (!_tabProps[i].disabled) {
        return i + 1;
      }
    }
    return 1;
  }

  function isTabDisabled(tabIndex: number): boolean {
    const index = tabIndex - 1;
    return index >= 0 && index < _tabProps.length && _tabProps[index].disabled;
  }

  function findNextEnabledTab(
    currentIndex: number,
    direction: "left" | "right",
  ): number {
    const totalTabs = _tabProps.length;
    let nextIndex = currentIndex;

    for (let i = 0; i < totalTabs; i++) {
      nextIndex += direction === "right" ? 1 : -1;

      if (nextIndex > totalTabs) nextIndex = 1;
      if (nextIndex < 1) nextIndex = totalTabs;

      if (!isTabDisabled(nextIndex)) {
        return nextIndex;
      }
    }
    return currentIndex;
  }

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

          let targetTab = tabIndexFromHash ?? (initialtab || 1);

          if (isTabDisabled(targetTab)) {
            targetTab = getFirstEnabledTab();
          }

          setCurrentTab(targetTab, { skipFocus: true });
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
        tabSlug = tabProps.slug;
      } else {
        const heading = tabProps.heading as string;

        headingEl = document.createElement("div");
        headingEl.textContent = heading;
        tabSlug = tabProps.slug || toSlug(heading);
      }

      headingEl.classList.add("tab");
      tabSlug ||= "tab-" + index;

      // create tab link
      const link = document.createElement("a");
      link.setAttribute("id", `tab-${index + 1}`);
      link.setAttribute("data-testid", `tab-${index + 1}`);
      link.setAttribute("role", "tab");
      if (navigation !== "none") {
        link.setAttribute("href", `${path}${search}#${tabSlug}`);
      }
      link.setAttribute("aria-controls", `tabpanel-${index + 1}`);

      // Store text content for CSS pseudo-element (prevents layout shift when font-weight changes)
      if (variant === "segmented") {
        const textContent = headingEl.textContent?.trim() || "";
        if (textContent) {
          link.setAttribute("data-text", textContent);
        }
      }

      if (tabProps.disabled) {
        link.setAttribute("aria-disabled", "true");
        link.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
        });
      } else {
        link.addEventListener("click", () => setCurrentTab(index + 1));
      }

      link.appendChild(headingEl);

      _tabsEl?.appendChild(link);
    });

    if (variant === "segmented") {
      // wait for DOM to finish render before calculating position
      requestAnimationFrame(() => {
        updateSegmentedIndicatorPosition({ withAnimation: false });
        // if the tab isn't visible (inside a popover-WorkspaceNotificationPopover), observe for when it becomes visible to re-calculate the segmented indicator width & position
        if (_segmentedIndicatorWidth === 0 && _tabsEl) {
          _visibilityObserver = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting) {
              updateSegmentedIndicatorPosition({ withAnimation: false });
              _visibilityObserver?.disconnect();
              _visibilityObserver = null;
            }
          });
          _visibilityObserver.observe(_tabsEl);
        }
      });
    }
  }

  function addKeyboardEventListeners() {
    _rootEl.addEventListener("focus", handleKeydownEvents, true);
  }

  function removeKeyboardEventListeners() {
    _rootEl.removeEventListener("focus", handleKeydownEvents, true);
  }

  function handleHashChange() {
    const tabIndexFromHash = getTabIndexFromHash();
    if (tabIndexFromHash !== null && tabIndexFromHash !== _currentTab) {
      if (!isTabDisabled(tabIndexFromHash)) {
        setCurrentTab(tabIndexFromHash);
      }
    }
  }

  function addHashChangeListener() {
    window.addEventListener("hashchange", handleHashChange);
  }

  function removeHashChangeListener() {
    window.removeEventListener("hashchange", handleHashChange);
  }

  /**
   * Updates the segmented indicator position with velocity-based animation.
   * @param withAnimation - Whether to animate the transition (false on first load, true on tab change)
   */
  function updateSegmentedIndicatorPosition({
    withAnimation,
  }: {
    withAnimation: boolean;
  }) {
    if (!_tabsEl || variant !== "segmented") return;

    const tabs = _tabsEl.querySelectorAll('[role="tab"]');
    const selectedTab = tabs[_currentTab - 1] as HTMLElement;

    if (!selectedTab) return;

    const tabsRect = _tabsEl.getBoundingClientRect();
    const selectedRect = selectedTab.getBoundingClientRect();

    // Element not visible yet (e.g., inside a popover with display:none)
    if (selectedRect.width === 0) return;

    if (withAnimation) {
      const previousTab = tabs[_previousTabIndex - 1] as HTMLElement;
      if (previousTab) {
        const tabDistance = Math.abs(
          selectedRect.left - previousTab.getBoundingClientRect().left,
        );
        const calculatedDuration =
          MIN_TRANSITION_DURATION + DURATION_PER_PIXEL * tabDistance;
        _segmentedTransitionDuration =
          Math.min(calculatedDuration, MAX_TRANSITION_DURATION) / 1000;
      } else {
        _segmentedTransitionDuration = 0;
      }
    } else {
      _segmentedTransitionDuration = 0;
    }

    _segmentedIndicatorLeft = selectedRect.left - tabsRect.left - 1;
    _segmentedIndicatorWidth = selectedRect.width;
    _segmentedIndicatorHeight = selectedRect.height;

    _previousTabIndex = _currentTab;
  }

  function setCurrentTab(tab: number, options: { skipFocus?: boolean } = {}) {
    const { skipFocus = false } = options;
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

    // send message to each tab to set visibility within
    [..._tabsEl.querySelectorAll<HTMLElement>("[role=tab]")].map((el, index) => {
      const isCurrent = index + 1 === +_currentTab; // currentTab is 1-based

      el.setAttribute("aria-selected", fromBoolean(isCurrent));
      el.setAttribute("tabindex", isCurrent ? "0" : "-1");

      if (isCurrent) {
        currentLocation = (el as HTMLLinkElement).href;
        if (!skipFocus) {
          el.focus();
        }
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

    // update the browser's url with the new hash (skip when navigation is "none")
    if (currentLocation && navigation !== "none") {
      const url = new URL(currentLocation);
      // to make sure we preserve multiple #, for example /#tab-1#example
      const allHashes = window.location.href.split("#").slice(1);
      const otherHashes = allHashes.filter((hash) => !hash.startsWith("tab-")); // #example
      const uniqHashes = [...new Set([url.hash.substring(1), ...otherHashes])];
      const newHash = uniqHashes.filter(Boolean).join("#");

      history.replaceState(
        {},
        "",
        url.pathname + url.search + (newHash ? "#" + newHash : ""),
      );

      if (_initialLoad) {
        const anchorHash = otherHashes[0];
        if (anchorHash) {
          tick().then(() => {
            const element =
              document.getElementById(anchorHash) ||
              document.querySelector(`[name="${anchorHash}"]`);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          });
        }
      }
    }

    if (variant === "segmented") {
      updateSegmentedIndicatorPosition({ withAnimation: true });
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
        setCurrentTab(findNextEnabledTab(_currentTab, "left"));
        isHandled = true;
        break;
      case "ArrowDown":
      case "ArrowRight":
        setCurrentTab(findNextEnabledTab(_currentTab, "right"));
        isHandled = true;
        break;
      case "Home":
        setCurrentTab(getFirstEnabledTab());
        isHandled = true;
        break;
      case "End":
        // Find last enabled tab
        for (let i = _tabProps.length; i >= 1; i--) {
          if (!isTabDisabled(i)) {
            setCurrentTab(i);
            break;
          }
        }
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

  /** Converts the input string to a kebab format url encoded string */
  function toSlug(input: string): string {
    const parts = input.toLowerCase().split(" ");
    const str = parts.map((val) => val.toLowerCase()).join("-");
    return encodeURIComponent(str);
  }
</script>

<!--HTML-->

<div
  role="tablist"
  bind:this={_rootEl}
  class:v2={version === "2"}
  class:horizontal={orientation === "horizontal"}
  class:segmented={variant === "segmented"}
  data-testid={testid}
>
  <div
    class="tabs"
    bind:this={_tabsEl}
    style="--segmented-indicator-left: {_segmentedIndicatorLeft}px; --segmented-indicator-width: {_segmentedIndicatorWidth}px; --segmented-indicator-height: {_segmentedIndicatorHeight}px; --segmented-transition-duration: {_segmentedTransitionDuration}s;"
  >
    {#if variant === "segmented" && _segmentedIndicatorWidth > 0}
      <div class="segmented-indicator"></div>
    {/if}
  </div>
  <!-- When navigation="none", remove from tab order : when tabs are used as a UI switcher inside a WorkspaceNotificationPanel , so we can tab to focus on Notification Item (inside the tab) -->
  <div
    class="tabpanel"
    tabindex={navigation === "none" ? -1 : 0}
    bind:this={_slotEl}
    role="tabpanel"
  >
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

  /* ========================================
     Base Styles (Token-driven, works for V1 and V2)
     ======================================== */

  :global([role="tab"]) {
    display: flex;
    background: none;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    font: var(--goa-tab-typography);
    color: var(--goa-tab-color-text-not-selected, var(--goa-tab-text-color));
    text-decoration: none;
  }

  :global([role="tab"][aria-selected="true"]) {
    font: var(--goa-tab-typography-selected);
    color: var(--goa-tab-color-text-selected, var(--goa-tab-text-color));
  }

  :global([role="tab"]:focus-visible) {
    outline: var(--goa-tab-border-focus);
  }

  :global(
    [role="tab"]:hover:not([aria-selected="true"]):not([aria-disabled="true"])
  ) {
    color: var(--goa-tab-color-text-hover, var(--goa-tab-text-color));
  }

  /* Disabled tab styles */
  :global([role="tab"][aria-disabled="true"]) {
    color: var(--goa-color-greyscale-400, #949494);
    cursor: not-allowed;
    pointer-events: none;
  }

  :global([role="tabpanel"]:focus-visible) {
    outline: var(--goa-tab-border-focus);
    outline-offset: 4px;
  }
  .segmented .tabpanel:focus-visible {
    outline: none;
  }

  @media (--not-mobile) {
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
      justify-content: center;
    }
    :global([role="tab"][aria-selected="true"]) {
      border-bottom: var(--goa-tab-border-selected);
    }
    :global(
      [role="tab"]:hover:not([aria-selected="true"]):not([aria-disabled="true"])
    ) {
      border-bottom: var(--goa-tab-border-hover);
    }

    :global([role="tab"][aria-disabled="true"]) {
      border-bottom: var(--goa-tab-border-not-selected);
    }
  }

  @media (--mobile) {
    .tabs {
      border-left: var(--goa-tabs-bottom-border);
      border-bottom: var(--goa-tabs-bottom-border);
      display: flex;
      flex-direction: column;
      gap: var(--goa-tabs-gap-small-screen);
      padding-bottom: var(
        --goa-tabs-padding-bottom-small-screen,
        var(--goa-space-m)
      );
    }
    :global([role="tab"]) {
      padding: var(--goa-tab-padding-mobile);
      border-left: var(--goa-tab-border-not-selected);
      text-overflow: wrap;
      white-space: normal;
      word-break: break-word;
      overflow-wrap: break-word;
    }
    :global([role="tab"][aria-selected="true"]) {
      border-left: var(--goa-tab-border-selected);
      background: var(--goa-tab-color-bg-selected-small-screen);
    }
    :global(
      [role="tab"]:hover:not([aria-selected="true"]):not([aria-disabled="true"])
    ) {
      border-left: var(--goa-tab-border-hover);
      background: var(--goa-tab-color-bg-hover-small-screen, transparent);
    }

    :global([role="tab"][aria-disabled="true"]) {
      border-left: var(--goa-tab-border-not-selected);
    }

    /* horizontal: override mobile styles to use desktop layout */
    .horizontal .tabs {
      border-left: none;
      border-bottom: var(--goa-tabs-bottom-border);
      flex-direction: row;
      gap: var(--goa-tabs-gap);
      padding-bottom: 0;
      margin-bottom: var(--goa-space-xl);
    }
    .horizontal :global([role="tab"]) {
      padding: var(--goa-tab-padding);
      border-left: none;
      border-bottom: var(--goa-tab-border-not-selected);
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: var(--goa-space-2xl);
      justify-content: center;
    }
    .horizontal :global([role="tab"][aria-selected="true"]) {
      border-left: none;
      border-bottom: var(--goa-tab-border-selected);
      background: transparent;
    }
    .horizontal
      :global(
        [role="tab"]:hover:not([aria-selected="true"]):not(
            [aria-disabled="true"]
          )
      ) {
      border-left: none;
      border-bottom: var(--goa-tab-border-hover);
      background: transparent;
    }
  }

  .v2 :global([role="tab"]) {
    position: relative; /* Required for ::after positioning */
  }

  .v2 :global([role="tab"]:focus-visible) {
    border-radius: var(--goa-border-radius-xs);
  }

  .v2
    :global(
      [role="tab"]:hover:not([aria-selected="true"]):not([aria-disabled="true"])
    ) {
    border-bottom: none;
  }

  @media (--not-mobile) {
    .v2 :global([role="tab"]) {
      border-bottom: none; /* Remove V1 border, replaced with ::after */
    }

    /* V2 uses ::after pseudo-element for rounded corner indicators */
    .v2 :global([role="tab"]::after) {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--goa-tab-indicator-width, 3px);
      background: transparent;
      border-radius: var(
        --goa-tab-indicator-border-radius-desktop,
        6px 6px 0 0
      );
    }
    .v2 :global([role="tab"][aria-selected="true"]::after) {
      background: var(--goa-tab-indicator-color-active, #0070c4);
    }
    .v2
      :global(
        [role="tab"]:hover:not([aria-selected="true"]):not(
            [aria-disabled="true"]
          )::after
      ) {
      background: var(--goa-tab-indicator-color-hover, #dcdcdc);
    }
  }

  @media (--mobile) {
    .v2 :global([role="tab"]) {
      border-left: none; /* Remove V1 border, replaced with ::after */
    }
    .v2 :global([role="tab"][aria-selected="true"]) {
      border-left: none;
    }
    .v2
      :global(
        [role="tab"]:hover:not([aria-selected="true"]):not(
            [aria-disabled="true"]
          )
      ) {
      border-left: none;
    }

    /* V2 uses ::after pseudo-element for rounded corner indicators */
    .v2 :global([role="tab"]::after) {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: var(--goa-tab-indicator-width, 3px);
      background: transparent;
      border-radius: var(
        --goa-tab-indicator-border-radius-small-screen,
        0 6px 6px 0
      );
    }
    .v2 :global([role="tab"][aria-selected="true"]::after) {
      background: var(--goa-tab-indicator-color-active, #0070c4);
    }
    .v2
      :global(
        [role="tab"]:hover:not([aria-selected="true"]):not(
            [aria-disabled="true"]
          )::after
      ) {
      background: var(--goa-tab-indicator-color-hover, #dcdcdc);
    }

    /* V2 horizontal on mobile: remove V1 borders, use ::after bottom indicator instead */
    .horizontal.v2 :global([role="tab"]) {
      border-bottom: none;
    }
    .horizontal.v2 :global([role="tab"][aria-selected="true"]) {
      border-bottom: none;
    }
    .horizontal.v2
      :global(
        [role="tab"]:hover:not([aria-selected="true"]):not(
            [aria-disabled="true"]
          )
      ) {
      border-bottom: none;
    }
    /* V2 horizontal: switch ::after from left indicator to bottom indicator */
    .horizontal.v2 :global([role="tab"]::after) {
      top: auto;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      height: var(--goa-tab-indicator-width, 3px);
      border-radius: var(
        --goa-tab-indicator-border-radius-desktop,
        6px 6px 0 0
      );
    }
  }

  /* ========================================
     Segmented Variant (Pill/Button style tabs)
     ======================================== */

  /* Container - gray background with rounded corners */
  .segmented .tabs {
    position: relative;
    background: var(--goa-color-greyscale-50, #f8f8f8);
    border: 1px solid var(--goa-color-greyscale-150, #dcdcdc);
    border-bottom: 1px solid var(--goa-color-greyscale-150, #dcdcdc); /* Override base border-bottom */
    border-radius: var(--goa-border-radius-m, 10px);
    padding: 3px;
    gap: var(--goa-space-3xs);
    margin-bottom: var(--goa-tabs-margin-bottom, 2rem);
    flex-direction: row;
    flex-wrap: nowrap;
    width: fit-content;
  }

  /* Animated background indicator for selected tab */
  .segmented .segmented-indicator {
    position: absolute;
    top: 3px;
    left: var(--segmented-indicator-left, 0);
    width: var(--segmented-indicator-width, 0);
    height: var(--segmented-indicator-height, 30px);
    background: var(--goa-color-greyscale-white, #ffffff);
    border: var(--goa-border-width-s) solid
      var(--goa-color-greyscale-150, #dcdcdc);
    border-radius: var(--goa-border-radius-xl);
    pointer-events: none;
    z-index: 0;
    box-sizing: border-box;

    transition:
      left var(--segmented-transition-duration, 0s) ease-out,
      width var(--segmented-transition-duration, 0s) ease-out;
  }

  /* Individual tabs - segmented style */
  .segmented :global([role="tab"]) {
    position: relative;
    z-index: 1;
    background: transparent;
    /* Override base border-bottom and border-left (mobile) */
    border: var(--goa-border-width-s) solid transparent;
    border-radius: var(--goa-border-radius-xl);
    min-height: 30px;
    padding: 0 var(--goa-space-s, 12px);
    /* Typography */
    font: var(--goa-typography-body-s);
    color: var(--goa-color-greyscale-600, #666666);
    /* Ensure proper alignment */
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: normal;
    text-align: center;
    min-width: auto;
    /* Smooth transition for color changes */
    transition: color 0.15s ease;
  }

  /* Hide the ::after indicator for segmented variant */
  .segmented :global([role="tab"]::after) {
    display: none;
  }

  /* Prevent layout shift when font-weight changes */
  .segmented :global([role="tab"][data-text]) {
    flex-direction: column;
  }

  .segmented :global([role="tab"][data-text]::before) {
    content: attr(data-text);
    font: var(--goa-typography-body-s);
    font-weight: 600;
    height: 0;
    visibility: hidden;
    overflow: hidden;
  }

  .segmented :global([role="tab"][aria-selected="true"]) {
    background: transparent;
    border: var(--goa-border-width-s) solid transparent;
    color: var(--goa-color-text-secondary, #666666);
    font: var(--goa-typography-body-s);
    font-weight: 600;
  }

  .segmented
    :global(
      [role="tab"]:hover:not([aria-selected="true"]):not([aria-disabled="true"])
    ) {
    background: var(--goa-color-greyscale-150, #dcdcdc);
    border: var(--goa-border-width-s) solid transparent;
    color: var(--goa-color-text-default, #353535);
  }

  .segmented :global([role="tab"][aria-disabled="true"]) {
    color: var(--goa-color-greyscale-400, #949494);
    cursor: not-allowed;
    pointer-events: none;
    background: transparent;
  }

  .segmented :global([role="tab"]:focus-visible) {
    outline: var(--goa-border-width-l, 3px) solid
      var(--goa-color-interactive-focus);
    outline-offset: 1px;
    border-radius: var(--goa-border-radius-s, 8px);
  }

  /* Mobile - segmented tabs stay horizontal */
  @media (--mobile) {
    .segmented .tabs {
      flex-direction: row;
      padding-bottom: var(--goa-space-2xs, 4px);
    }

    .segmented :global([role="tab"]) {
      border-left: none;
    }

    .segmented :global([role="tab"][aria-selected="true"]) {
      border-left: none;
    }
  }
</style>
