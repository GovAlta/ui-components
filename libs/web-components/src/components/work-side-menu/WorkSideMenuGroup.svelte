<svelte:options customElement="goa-work-side-menu-group" />

<script lang="ts">
  import type { GoAIconType } from "../icon/Icon.svelte";
  import { toBoolean, dispatch } from "../../common/utils";

  export let heading: string;
  export let icon: GoAIconType;
  export let testid: string = "";

  let _open = false;
  let _rootEl: HTMLElement;

  function handleMouseEnter() {
    dispatch(_rootEl, "_hoverItem", { el: _rootEl, label: heading }, { bubbles: true });
  }
</script>

<div class="root" data-testid={testid} bind:this={_rootEl}>
  <details
    open={_open}
    aria-label={_open ? "Close group" : "Open group"}
    on:toggle={({ target }) => (_open = toBoolean(`${target?.open}`))}
    on:mouseenter={handleMouseEnter}
  >
    <summary aria-expanded={_open}>
      <goa-icon type={icon} size="small" theme={_open ? "filled" : "outline"} />
      <span class="label">{heading}</span>
      <goa-icon class="marker-icon" type="chevron-forward" size="small" />
    </summary>
    <div class="group" data-testid="group">
      <slot />
    </div>
  </details>
</div>

<style>
  :host * {
    box-sizing: border-box;
  }

  .root {
    container-type: inline-size;
    position: relative;
  }
  summary {
    display: flex;
    cursor: pointer;
    list-style: none;
    gap: var(--goa-space-m);
    align-items: flex-start;
    border-radius: var(
      --goa-work-side-menu-item-border-radius,
      var(--goa-border-radius-m)
    );
    align-items: flex-start;
    padding: var(
      --goa-work-side-menu-item-padding,
      var(--goa-space-xs) var(--goa-space-xs) var(--goa-space-xs)
        calc(var(--goa-space-xs) + var(--goa-space-3xs))
    );
    color: var(
      --goa-work-side-menu-item-text-color,
      var(--goa-color-greyscale-600)
    );
    min-height: var(--goa-work-side-menu-item-min-height, 40px);
  }

  /* Hide native icon on iOS */
  summary::-webkit-details-marker {
    display: none;
  }

  summary:hover,
  details[open] summary {
    background: var(
      --goa-work-side-menu-item-color-bg-hover,
      var(--goa-color-greyscale-100)
    );
    color: var(
      --goa-work-side-menu-item-text-color-hover,
      var(--goa-color-text-default)
    );
  }

  details[open] .marker-icon {
    transform: rotate(90deg);
  }

  summary:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: 2px;
  }
  summary goa-icon {
    margin-top: 3px;
  }
  .group {
    border-left: var(
      --goa-work-side-menu-group-border,
      var(--goa-border-width-xl) solid var(--goa-color-greyscale-100)
    );
    margin: var(
      --goa-work-side-menu-group-margin,
      var(--goa-space-xs) 0 0.375rem 1.125rem
    );
    padding: var(--goa-work-side-menu-group-padding, 0 0 0 0.75rem);
    display: flex;
    flex-direction: column;
    gap: 2px;

    /* Menu item styling */
    --goa-work-side-menu-item-icon-display: none;
    --goa-work-side-menu-item-padding: var(
      --goa-work-side-menu-group-item-padding,
      0.25rem 0.5rem
    );
    --goa-work-side-menu-item-min-height: var(
      --goa-work-side-menu-group-item-min-height,
      1.75rem
    );
    --goa-work-side-menu-item-text-size: var(
      --goa-work-side-menu-group-item-text-size,
      var(--goa-typography-body-xs)
    );
  }

  .label {
    flex-grow: 1;
    font: var(
      --goa-work-side-menu-item-text-size,
      var(--goa-typography-body-s)
    );
    animation: delayText 100ms;
  }

  @container (max-width: 160px) {
    .group,
    .label,
    .marker-icon {
      display: none;
    }

    summary {
      height: 36px;
      margin: 0;
      padding-left: calc(var(--goa-space-xs) + 2px);
    }

    details[open] summary {
      background: transparent;
      color: var(
      --goa-work-side-menu-item-text-color,
      var(--goa-color-greyscale-600)
    );
    }
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
</style>
