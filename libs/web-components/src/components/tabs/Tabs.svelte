<svelte:options tag="goa-tabs"/>

<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte';

  export let current: number = 1;

  let _rootEl: HTMLElement;
  let _tabItems: Element[];
  let _tabs: HTMLElement;

  // ========
  // Hooks
  // ========

  onMount(async () => {
    await tick();

    // init listeners
    _rootEl.addEventListener("focus", handleKeydownEvents, true);
    
    // setup tabs
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    
    if (slot) {
      _tabItems = slot.assignedElements();
    } else {
      _tabItems = [..._rootEl.querySelectorAll("goa-tab")] as Element[]; // for unit tests
    }

    _tabItems.map((el, index) => {
      const tab = [...el.children].find(child => child.getAttribute("slot") === "heading") as HTMLElement;
      const button = document.createElement("button")

      tab.classList.add("tab")
      button.appendChild(tab);
      button.setAttribute("role", "tab")
      button.addEventListener("click", () => setCurrentTab(index + 1))

      _tabs.appendChild(button)
    });

    setCurrentTab(current);
  });

  onDestroy(() => {
    _rootEl.removeEventListener("focus", handleKeydownEvents, true);
  });

  // =========
  // Functions
  // =========

  function setCurrentTab(tab: number) {
    if (tab > _tabItems.length) {
      tab = _tabItems.length;
    }
    if (tab < 1) {
      tab = 1;
    }
    current = +tab;

    _tabItems.map((el, index) => {
      el.setAttribute("open", (index + 1) === current ? "true" : "false");
    });

    [..._tabs.querySelectorAll("[role=tab]")].map((el, index) => {
      el.setAttribute("aria-selected", (index + 1) === current ? "true" : "false");
    });
  }

  function handleKeydownEvents() {
    _rootEl.addEventListener("keydown", onKeyDown);
  }

  function onKeyDown(e: KeyboardEvent) {
    let isHandled = false;
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        setCurrentTab(current - 1)
        isHandled = true;
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        setCurrentTab(current + 1)
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

<div role="tablist" bind:this={_rootEl}>
  <div class="tabs" bind:this={_tabs}></div>
  <div class="tabpanel">
    <slot/>
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

  .tab {
    display: flex;
    gap: 1rem;  
  }

  [role="tab"] {
    background: none;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    font: var(--goa-typography-body-m);
    color: var(--goa-color-text-default);
  }

  [role="tab"][aria-selected="true"] {
    font: var(--goa-typography-heading-s);
  }

  [role="tab"]:hover:not([aria-selected="true"]), 
  [role="tab"]:focus:not([aria-selected="true"]) {
    border-color: var(--goa-color-greyscale-200);
  }

  [role="tab"]:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  @media(min-width: 640px) {
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

  @media(max-width: 639px) {
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

