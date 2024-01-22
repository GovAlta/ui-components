<svelte:options customElement="goa-tabs" />

<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { clamp, fromBoolean } from "../../common/utils";

  export let initialtab: number = 1; // 1-based

  // Private
  let _rootEl: HTMLElement;
  let _tabs: Element[] = [];
  let _tabsEl: HTMLElement;
  let _panelEl: HTMLElement;
  let _currentTab: number = 1;

  // ========
  // Hooks
  // ========

  onMount(async () => {
    // init listeners
    addKeyboardEventListeners();

    // setup tabs
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (slot) {
      slot.addEventListener("slotchange", () => {
        _tabs = slot.assignedElements();
        bindTabs(_tabs);
      });
    } else {
      // @ts-expect-error
      _tabs = [..._rootEl.querySelectorAll("goa-tab")] as Element[]; // for unit tests
      bindTabs(_tabs);
    }

    setTimeout(() => {
      // HACK: this is done to get the initial tab set when using angular
      setCurrentTab(+initialtab);
    }, 1)
    setCurrentTab(+initialtab);
  });

  function bindTabs(tabs: Element[]) {
    // create buttons (tabs) for each of the tab contents elements
    tabs.forEach((tab, index) => {
      // @ts-expect-error
      let headingEl = [...tab.children].find(
        (child) => child.getAttribute("slot") === "heading",
      ) as HTMLElement;

      if (headingEl) {
        // slot exists
        headingEl?.classList.add("tab");
      } else {
        // heading prop is set
        const headingDataEl = (tab.shadowRoot || tab)?.querySelector(
          "[data-heading]",
        ) as HTMLElement;

        const heading =
          headingDataEl?.dataset["heading"] || tab.getAttribute("heading");
        if (heading) {
          headingEl = document.createElement("div");
          headingEl.classList.add("tab");
          headingEl.textContent = heading;
        }
      }

      if (headingEl) {
        const button = document.createElement("button");
        button.setAttribute("id", `tab-${index + 1}`);
        button.setAttribute("data-testid", `tab-${index + 1}`);
        button.setAttribute("role", "tab");
        button.addEventListener("click", () => setCurrentTab(index + 1));
        button.setAttribute("aria-controls", `tabpanel-${index + 1}`);
        button.appendChild(headingEl);

        _tabsEl.appendChild(button);
      }
    });
  }

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
    // TODO: determine if this is ever being called
    _rootEl.removeEventListener("focus", handleKeydownEvents, true);
  }

  function setCurrentTab(tab: number) {
    // prevent tab from exceeding limits
    _currentTab = clamp(tab, 1, _tabs.length);

    // HACK: this only exists due to the `setTimeout` on line , which is required to allow the 
    // initialtab to be properly set in Angular, causes null errors.
    if (!_tabsEl) return;

    // @ts-expect-error
    [..._tabsEl.querySelectorAll("[role=tab]")].map((el, index) => {
      const isCurrent = index + 1 === _currentTab; // currentTab is 1-based
      _tabs[index].setAttribute("open", "false");
      el.setAttribute("aria-selected", fromBoolean(isCurrent));
      el.setAttribute("tabindex", isCurrent ? "0" : "-1");
      if (isCurrent) {
        el.focus();
        el.removeAttribute("tabindex"); // allow tabbing to the button when the tab is active
        _tabs[index].setAttribute("open", "true"); // display tab content
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
    const isTabButtonFocused = e.target && _tabsEl.contains(e.target as Node);

    if (!isTabButtonFocused) {
      return;
    }

    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
        if (_currentTab === 1) {
          setCurrentTab(_tabs.length);
        } else {
          setCurrentTab(_currentTab - 1);
        }
        isHandled = true;
        break;
      case "ArrowDown":
      case "ArrowRight":
        if (_currentTab === _tabs.length) {
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
        setCurrentTab(_tabs.length);
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
    background: none;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    font: var(--goa-typography-body-m);
    color: var(--goa-color-text-default);
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

  @media not (--mobile) {
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
