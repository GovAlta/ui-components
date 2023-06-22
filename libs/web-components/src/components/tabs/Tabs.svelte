<svelte:options tag="goa-tabs"/>

<script lang="ts">
  import {onDestroy, onMount, tick} from 'svelte';

  let _rootEl: HTMLElement;
  let _tabItemsEl: Element[];
  let _tabPanelEl: HTMLElement;
  let _contentItemsEl: Map<number, HTMLElement[]> = new Map();

  // ========
  // Reactive
  // ========

  $: {
    if (_tabItemsEl) {
      init();
      addKeyboardEventListeners();
    }
  }

  onMount(async () => {
    await tick();
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (slot) {
      _tabItemsEl = slot.assignedElements();
    } else {
      _tabItemsEl = [..._rootEl.querySelectorAll("goa-tab")] as Element[]; // for unit tests
    }
    _rootEl.addEventListener("open", (e: Event) => {
      const openingIndex = +(e as CustomEvent).detail.childIndex;
      replacePanel(openingIndex);
      _tabItemsEl.map((el, index) => {
        el.setAttribute("open", index === openingIndex ? "true" : "false");
      });
    });

  });

  onDestroy(() => {
    removeKeyboardEventListeners();
  });

  function init() {
    if (!_tabItemsEl) {
      return;
    }
    _tabItemsEl.map((el, index) => {
      _contentItemsEl.set(index, getTabContent(el));
      el.setAttribute("childindex", index.toString());
      if (el.getAttribute("open") === "true") {
        replacePanel(index);
      }
    });
  }

  function getTabContent(el: Element) {
    let content = Array.from(el.children)
      .filter(child => child.slot !== 'heading') as HTMLElement[];
    if (content.length === 0 && el.textContent) {
      // If the default slot is not wrapped within HTML node
      let textElement = document.createElement("p");
      textElement.textContent = el.textContent;
      content = [textElement];
    }
    return content;
  }

  function replacePanel(index: number) {
    if (!_tabPanelEl) {
      return;
    }
    // Clear the current content
    while (_tabPanelEl.firstChild) {
      _tabPanelEl.removeChild(_tabPanelEl.firstChild);
    }
    for (const contentElement of _contentItemsEl.get(index)) {
      _tabPanelEl.appendChild(contentElement);
    }
    _tabPanelEl.id = `tabpanel-${index}`;
    _tabPanelEl.setAttribute("aria-labelledby", `tab-${index}`);
  }

  function addKeyboardEventListeners() {
    _rootEl.addEventListener("focus", onFocus, true);
  }

  function removeKeyboardEventListeners() {
    _rootEl.removeEventListener("focus", onFocus, true);
  }

  function onFocus() {
    _rootEl.addEventListener("keydown", onKeyDown);
  }

  function setSelectedToPreviousTab(target: HTMLElement) {
    const currentIndex = +target.getAttribute("childindex");
    if (currentIndex === 0) {
      setSelectedTab(_tabItemsEl.length - 1);
    } else {
      setSelectedTab(currentIndex - 1);
    }
  }

  function setSelectedToNextTab(target: HTMLElement) {
    const currentIndex = +target.getAttribute("childindex");
    if (currentIndex === _tabItemsEl.length - 1) {
      setSelectedTab(0);
    } else {
      setSelectedTab(currentIndex + 1);
    }
  }

  function setSelectedTab(index: number) {
    const tabItemEl = _tabItemsEl[index] as HTMLElement
    const button = tabItemEl.shadowRoot.querySelector("button") as HTMLButtonElement;
    button.focus();
    _tabItemsEl[index].setAttribute("open", "true");
  }

  function onKeyDown(e: KeyboardEvent) {
    let isHandled = false;
    let target = e.target as HTMLElement;
    switch (e.key) {
      case 'ArrowLeft':
        setSelectedToPreviousTab(target);
        isHandled = true;
        break;
      case 'ArrowRight':
        setSelectedToNextTab(target);
        isHandled = true;
        break;
      case 'Home':
        setSelectedTab(0);
        isHandled = true;
        break;
      case 'End':
        setSelectedTab(_tabItemsEl.length - 1);
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
  <slot/>
</div>
<div bind:this={_tabPanelEl}
     role="tabpanel"
     tabindex="0">
</div>

<style>
  :host {
    box-sizing: border-box;
    font: var(--goa-typography-body-m);
  }

  [role="tablist"] {
    border-bottom: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
  }

  [role="tabpanel"] {
    background: var(--goa-color-greyscale-white);
    width: 100%;
    overflow: auto;
  }

  @media (min-width: 640px) {
    [role="tablist"] {
      display: flex;
      border-bottom: none;
      gap: var(--goa-space-xl);
    }
    [role="tabpanel"] {
      border-top: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
      position: relative;
      top: var(--goa-border-width-l);
    }
  }
</style>

