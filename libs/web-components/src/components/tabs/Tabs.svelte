<svelte:options tag="goa-tabs"/>

<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte';

  export let initialtab: number = 1; // 1-based

  // Private
  let _rootEl: HTMLElement;
  let _tabItems: Element[] = [];
  let _tabs: HTMLElement;
  let _panelEl: HTMLElement;
  let _currentTab: number = 1;

  // ========
  // Hooks
  // ========

  onMount(async () => {
    await tick();

    // init listeners
    addKeyboardEventListeners();

    // setup tabs
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;

    if (slot) {
      _tabItems = slot.assignedElements();
    } else {
      _tabItems = [..._rootEl.querySelectorAll("goa-tab")] as Element[]; // for unit tests
    }
    _tabItems.map((el, index) => {
      let tab = [...el.children].find(child => child.getAttribute("slot") === "heading") as HTMLElement;
      if (!tab && el.getAttribute("heading")) {
        // If heading is not a slot, create a new element
        tab = document.createElement("div")
        tab.textContent = el.getAttribute("heading")
      }
      const button = document.createElement("button")
      tab.classList.add("tab")
      button.appendChild(tab)
      button.setAttribute("id", `tab-${index + 1}`)
      button.setAttribute("role", "tab")
      button.addEventListener("click", () => setCurrentTab(index + 1))
      button.setAttribute("aria-controls", `tabpanel-${index + 1}`)

      _tabs.appendChild(button)
    });

    setCurrentTab(initialtab);
  });

  onDestroy(() => {
    removeKeyboardEventListeners();
  });

  // =========
  // Functions
  // =========

  function addKeyboardEventListeners() {
    _rootEl.addEventListener("focus", handleKeydownEvents, true);
  }

  function removeKeyboardEventListeners() {
    _rootEl.removeEventListener("focus", handleKeydownEvents, true);
  }

  function setCurrentTab(tab: number) {
    if (tab > _tabItems.length) {
      tab = _tabItems.length;
    }
    if (tab < 1) {
      tab = 1;
    }
    _currentTab = +tab;

    [..._tabs.querySelectorAll("[role=tab]")].map((el, index) => {
      _tabItems[index].setAttribute("open", "false");
      el.setAttribute("aria-selected", (index + 1) === _currentTab ? "true" : "false");
      el.setAttribute("tabindex", (index + 1) === _currentTab ? "0" : "-1");
      if ((index + 1) === _currentTab) {
        el.focus();
        el.removeAttribute("tabindex"); // allow tabbing to the button when the tab is active
        _tabItems[index].setAttribute("open", "true"); // display tab content
      }
    });
    _panelEl.setAttribute("aria-labelledby", `tab-${_currentTab}`);
    _panelEl.setAttribute("id", `tabpanel-${_currentTab}`);
  }

  function handleKeydownEvents() {
    _rootEl.addEventListener("keydown", onKeyDown);
  }

  function onKeyDown(e: KeyboardEvent) {
    let isHandled = false;
    const isTabButtonFocused = e.target && _tabs.contains(e.target as Node);

    if (!isTabButtonFocused) {
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        if (_currentTab === 1) {
          setCurrentTab(_tabItems.length)
        } else {
          setCurrentTab(_currentTab - 1)
        }
        isHandled = true;
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        if (_currentTab === _tabItems.length) {
          setCurrentTab(1);
        } else {
          setCurrentTab(_currentTab + 1)
        }
        isHandled = true;
        break;
      case 'Home':
        setCurrentTab(1);
        isHandled = true;
        break;
      case 'End':
        setCurrentTab(_tabItems.length);
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

<div id="container">
  <div role="tablist" bind:this={_rootEl}>
    <div class="tabs" bind:this={_tabs}></div>
    <div class="tabpanel" tabindex="0" bind:this={_panelEl} role="tabpanel">
      <slot/>
    </div>
  </div>
</div>

<!-- prevent certain styles from being stripped out -->
<template>
  <button role="tab" aria-selected="false" style="display:none">
    <div class="tab" />
  </button>
  <button role="tab" aria-selected="true" style="display:none" />
</template>

<style>
  :host {
    box-sizing: border-box;
    font: var(--goa-typography-body-m);
  }

  #container {
    container: self / inline-size;
  }

  .tab {
    display: flex;
    gap: var(--goa-space-xs);
  }

  [role="tab"] {
    background: none;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    font: var(--goa-typography-body-m);
    color: var(--goa-color-text-default);
    letter-spacing: 0.03125rem;
  }

  [role="tab"][aria-selected="true"] {
    font: var(--goa-typography-heading-s);
  }

  [role="tab"]:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  [role="tab"]:hover:not([aria-selected="true"]),
  [role="tab"]:focus:not([aria-selected="true"]),
  [role="tab"]:focus-visible:not([aria-selected="true"]) {
    border-color: var(--goa-color-greyscale-200);
  }

  @container self (--container-not-mobile) {
    [role="tablist"] {
      border-bottom: none;
    }
    .tabs {
      border-bottom: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
      display: flex;
      gap: var(--goa-space-xl);
    }
    [role="tab"] {
      padding: var(--goa-space-s) var(--goa-space-m);
      border-bottom: 4px solid transparent;
    }
    [role="tab"][aria-selected="true"] {
      border-color: var(--goa-color-interactive-default);
    }
  }

  @container self (--container-mobile) {
    [role="tab"] {
      width: 100%;
      padding: var(--goa-space-xs) 0;
      padding-left: 12px;
      border-left: 4px solid transparent;
    }
    [role="tab"][aria-selected="true"] {
      border-color: var(--goa-color-interactive-default);
      background: var(--goa-color-info-background);
    }
  }

</style>

