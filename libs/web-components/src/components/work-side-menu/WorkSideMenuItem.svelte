<svelte:options customElement="goa-work-side-menu-item" />


<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { dispatch, getSlottedChildren, toBoolean } from "../../common/utils";

  type WorkSideMenuItemType = "normal" | "emergency" | "success";

  // ******
  // Public
  // ******

  export let label: string;
  export let url: string;

  // optional
  export let badge: string = "";
  export let current: boolean = false;
  export let divider: boolean = false;
  export let icon: string = "";
  export let testid: string = "";
  export let type: WorkSideMenuItemType = "normal";

  // *******
  // Private
  // *******

  let _rootEl: HTMLElement;
  let _linkEl: HTMLAnchorElement;

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
    addEventListeners();
    dispatch(_rootEl, "work-side-menu-item:mount", {}, { bubbles: true });
  });

  onDestroy(() => {
    removeEventListeners();
  });

  // *********
  // Functions
  // *********

  function handleClick(e: Event) {
    dispatch(_rootEl, "work-side-menu:update", {}, { bubbles: true });
  }

  function handleUpdateItem(e: CustomEvent) {
    let currentLink = e.detail.current;
    current = _linkEl === currentLink;
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
    _linkEl.addEventListener(
      "work-side-menu-item:update",
      handleUpdateItem as EventListener,
    );
  }

  function removeEventListeners() {
    _linkEl.removeEventListener(
      "work-side-menu-item:update",
      handleUpdateItem as EventListener,
    );
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
  {#if $$slots.popoverContent}
    <div class="popover-wrapper">
      <goa-popover
        position="right"
        maxwidth="500px"
        minwidth="500px"
        maxheight="calc(100vh - 40px)"
        padded="false"
        hoffset="40px"
        voffset="0px">
        <a
          slot="target"
          class="menu-item"
          class:current
          role="menuitem"
          href={url !== "none" ? url : undefined}
          bind:this={_linkEl}
          on:click={handleClick}
          on:keydown={(e) => {
      if (e.key === "Enter") {
        handleClick(e);
    }}}
          tabindex="0"
        >
          <goa-icon size="small" theme={current ? "filled" : "outline"} type={icon} />
          <div class="menu-item-label">
            {label}
          </div>
          {#if badge}
            <div
              class="badge"
              class:emergency={type == "emergency"}
              class:success={type == "success"}
              class:alwaysvisible={_alwaysVisible}
            >
              {badge}
            </div>
          {/if}
        </a>
        <slot name="popoverContent"></slot>
      </goa-popover>
    </div>
  {:else}
    <a
      class="menu-item"
      class:current
      role="menuitem"
      href={url !== "none" ? url : undefined}
      bind:this={_linkEl}
      on:click={handleClick}
      on:keydown={(e) => {
      if (e.key === "Enter") {
        handleClick(e);
    }}}
      tabindex="0"
    >
      <goa-icon size="small" theme={current ? "filled" : "outline"} type={icon} />
      <div class="menu-item-label">
        {label}
      </div>
      {#if badge}
        <div
          class="badge"
          class:emergency={type == "emergency"}
          class:success={type == "success"}
          class:alwaysvisible={_alwaysVisible}
        >
          {badge}
        </div>
      {/if}
    </a>
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
    gap: var(--goa-space-m);
    border-radius: var(
      --goa-work-side-menu-item-border-radius,
      var(--goa-border-radius-m)
    );
    text-decoration: none;
    align-items: center;
    padding: var(
      --goa-work-side-menu-item-padding,
      var(--goa-space-xs) var(--goa-space-xs) var(--goa-space-xs)
        calc(var(--goa-space-xs) + var(--goa-space-3xs))
    );
    color: var(
      --goa-work-side-menu-item-text-color,
      var(--goa-color-greyscale-600)
    );
    min-height: 40px;
  }

  .menu-item:hover {
    background: var(
      --goa-work-side-menu-item-color-bg-hover,
      var(--goa-color-greyscale-100)
    );
    color: var(
      --goa-work-side-menu-item-text-color-hover,
      var(--goa-color-text-default)
    );
    cursor: pointer;
  }

  .menu-item:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    background: var(
      --goa-work-side-menu-item-color-bg-focus,
      var(--goa-color-greyscale-100)
    );
    color: var(
      --goa-work-side-menu-item-text-color-hover,
      var(--goa-color-text-default)
    );
    outline-offset: 0;
  }

  /* Divider */
  .divider {
    padding-bottom: var(--goa-space-s);
    margin-bottom: var(--goa-space-xs);
    border-bottom: var(--goa-border-width-s) solid
      var(--goa-color-greyscale-200);
  }

  /* Menu item label */
  .menu-item-label {
    flex-grow: 1;
    font: var(
      --goa-work-side-menu-item-text-size,
      var(--goa-typography-body-s)
    );
    animation: delayText 100ms;
  }

  /* Current item */
  .current {
    background: var(
      --goa-work-side-menu-item-color-bg-current,
      var(--goa-color-greyscale-100)
    );
    color: var(
      --goa-work-side-menu-item-text-color-current,
      var(--goa-color-text-default)
    );
    border-radius: var(
      --goa-work-side-menu-item-border-radius,
      var(--goa-border-radius-m)
    );
  }

  .current .menu-item-label {
    font-weight: var(--goa-font-weight-semi-bold);
  }

  /* Badge */
  .badge {
    color: var(--goa-color-text-light);
    height: 1.25rem;
    min-width: 1.25rem;
    line-height: 1.3;
    text-align: center;
    font-size: var(
      --goa-work-side-menu-item-badge-text-size,
      var(--goa-font-size-2)
    );
    background-color: var(
      --goa-work-side-menu-item-badge-background-color,
      var(--goa-color-success-default)
    );
    border-radius: 1.25rem;
    padding: 0 6px;
  }

  .badge.success {
    background-color: var(
      --goa-work-side-menu-item-badge-success-background-color,
      var(--goa-color-success-default)
    );
  }

  .badge.emergency {
    background-color: var(
      --goa-work-side-menu-item-badge-emergency-background-color,
      var(--goa-color-emergency-default)
    );
  }

  /* Icon-only items when menu is closed */
  @container (max-width: 160px) {
    .menu-item {
      height: 36px;
      margin: 0;
      align-items: center;
      padding-left: calc(var(--goa-space-xs) + 2px);
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
      font-size: var(--goa-font-size-1);
    }

    .badge:not(.alwaysvisible) {
      font-size: 0;
      color: transparent;
    }

    @keyframes delayText {
      0% {
        opacity: 0;
        font-size: 0;
      }
      99% {
        opacity: 0;
        font-size: 0;
      }
      100% {
        opacity: 1;
        font-size: var(--goa-font-size-2);
      }
    }
  }
</style>
