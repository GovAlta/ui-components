<svelte:options customElement="goa-work-side-menu-item" />

<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { dispatch, getSlottedChildren } from "../../common/utils";

  type WorkSideMenuItemVariation = "normal" | "submenu";
  type WorkSideMenuItemType =
    | "information"
    | "important"
    | "emergency"
    | "success";

  // ******
  // Public
  // ******

  export let label: string;
  export let url: string;

  // optional
  export let badge: string = undefined;
  export let current: boolean = false;
  export let divider: boolean = false;
  export let icon: string = undefined;
  export let testid: string = "";
  export let type: WorkSideMenuItemType = "information";
  export let variation: WorkSideMenuItemVariation = "normal";

  // *******
  // Private
  // *******

  let _rootEl: HTMLElement;
  let _linkEl: HTMLAnchorElement;
  let _subMenuEl: HTMLElement;
  let _submenuLinks: HTMLAnchorElement[];

  // ========
  // Reactive
  // ========

  $: _alwaysVisible =
    !isNaN(parseInt(badge)) && parseInt(badge) > 0 && parseInt(badge) < 10;

  // *****
  // Hooks
  // *****

  onMount(async () => {
    await tick();
    getChildren();
    addEventListeners();
    dispatch(_rootEl, "work-side-menu-item:mount", {}, { bubbles: true });
  });

  onDestroy(() => {
    removeEventListeners();
  });

  // *********
  // Functions
  // *********

  function getChildren() {
    if (!_subMenuEl) return;

    const slotChildren = getSlottedChildren(_subMenuEl);
    if (slotChildren.length === 0) return;

    _submenuLinks = slotChildren
      .filter((el) => el.tagName === "GOA-WORK-SIDE-MENU-ITEM")
      .map((el) => {
        return el.shadowRoot.querySelector("a");
      });
  }

  function handleClick() {
    if (_submenuLinks) {
      setTimeout(() => {
        _submenuLinks[0].click(); // select first submenu item
      });
    }
    dispatch(_rootEl, "work-side-menu:update", {}, { bubbles: true });
  }

  function handleUpdateItem(e: CustomEvent) {
    let currentLink = e.detail.current;
    current = _linkEl === currentLink || _submenuLinks?.includes(currentLink);
  }

  function handleMouseEnter() {
    dispatch(
      _rootEl,
      "work-side-menu-item:hover",
      { el: _linkEl, label: label },
      { bubbles: true },
    );
  }

  function addEventListeners() {
    _linkEl.addEventListener("work-side-menu-item:update", handleUpdateItem);
  }

  function removeEventListeners() {
    _linkEl.removeEventListener("work-side-menu-item:update", handleUpdateItem);
  }
</script>

<div
  class="root"
  class:divider
  role="none"
  data-testid={testid}
  on:mouseenter={handleMouseEnter}
  bind:this={_rootEl}
>
  <a
    class="menu-item"
    class:current
    class:sub-menu-item={variation == "submenu"}
    role="menuitem"
    href={url}
    bind:this={_linkEl}
    on:click={handleClick}
  >
    {#if variation == "normal"}
      <div aria-hidden="true">
        <goa-icon
          size="small"
          theme={current ? "filled" : "outline"}
          type={icon}
        />
      </div>
    {/if}
    <div class="menu-item-label">
      {label}
    </div>
    {#if badge}
      <div
        class="badge"
        class:emergency={type == "emergency"}
        class:success={type == "success"}
        class:important={type == "important"}
        class:alwaysvisible={_alwaysVisible}
      >
        {badge}
      </div>
    {/if}
  </a>
  {#if $$slots.default}
    <div class="sub-menu" bind:this={_subMenuEl}>
      <slot />
    </div>
  {/if}
</div>

<style>
  :host * {
    box-sizing: border-box;
  }

  .root {
    container-type: inline-size;
    position: relative;
  }

  /* Menu item */
  .menu-item {
    position: relative;
    display: flex;
    gap: var(--goa-space-xs);
    border-radius: var(--goa-work-side-menu-item-border-radius, 8px);
    text-decoration: none;
    align-items: flex-start;
    padding: var(--goa-work-side-menu-item-padding, var(--goa-space-xs));
    color: var(
      --goa-work-side-menu-item-text-color,
      var(--goa-color-text-default)
    );
  }

  .sub-menu-item {
    padding: var(--goa-space-3xs) var(--goa-space-xs);
  }

  .menu-item:hover {
    background: var(
      --goa-work-side-menu-item-color-bg-hover,
      var(--goa-color-greyscale-100)
    );
  }

  .menu-item:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    background: var(
      --goa-work-side-menu-item-color-bg-focus,
      var(--goa-color-greyscale-100)
    );
  }

  /* Divider */
  .divider {
    padding-bottom: var(--goa-space-s);
    margin-bottom: var(--goa-space-xs);
    border-bottom: var(--goa-border-width-s) solid
      var(--goa-color-greyscale-200);
  }

  /* Sub-menu */
  .sub-menu {
    display: none;
  }

  /* Menu item label */
  .menu-item-label {
    flex-grow: 1;
    font: var(--goa-typography-body-xs);
  }

  /* Current item */
  .current {
    background: var(
      --goa-work-side-menu-item-color-bg-current,
      var(--goa-color-greyscale-100)
    );
    border-radius: 8px;
  }

  .current .menu-item-label {
    font-weight: bold;
  }

  .current + .sub-menu {
    display: flex;
    flex-direction: column;
    gap: var(--goa-space-3xs);
    border-left: var(--goa-space-2xs) solid var(--goa-color-greyscale-100);
    margin: var(--goa-space-xs) 0 0 var(--goa-space-m);
    padding: 0 0 0 var(--goa-space-s);
  }

  /* Badge */
  .badge {
    color: var(--goa-color-text-light);
    height: 20px;
    min-width: 20px;
    line-height: 1.5;
    text-align: center;
    font-size: var(--goa-font-size-1);
    font-weight: 400;
    background-color: var(--goa-color-info-default);
    border-radius: 32px;
    padding: 0 6px;
    max-width: 20ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .badge.success {
    background-color: var(--goa-color-success-default);
  }

  .badge.emergency {
    background-color: var(--goa-color-emergency-default);
  }

  .badge.important {
    background-color: var(--goa-color-warning-default);
    color: var(--goa-color-text-default);
  }

  /* Icon-only items when menu is closed */
  @container (max-width: 160px) {
    .menu-item {
      margin: 0 var(--goa-space-3xs);
      height: 36px;
      padding: 0 0 0 var(--goa-space-xs);
      align-items: center;
    }

    .menu-item-label {
      display: none;
    }
    .badge {
      position: absolute;
      height: var(--goa-space-m);
      width: var(--goa-space-m);
      min-width: auto;
      padding: 0;
      top: var(--goa-space-3xs);
      right: var(--goa-space-3xs);
      text-align: center;
      line-height: 1.2;
    }

    .badge:not(.alwaysvisible) {
      font-size: 0;
      color: transparent;
    }

    .current + .sub-menu {
      display: none;
      visibility: hidden;
    }

    @keyframes delayVisibility {
      0% {
        visibility: hidden;
      }
      99% {
        visibility: hidden;
      }
      100% {
        visibility: visible;
      }
    }
  }
</style>
