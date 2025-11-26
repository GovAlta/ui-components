<svelte:options customElement="goa-work-side-menu-group" />

<script lang="ts">
  import { dispatch } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";

  export let heading: string;
  export let icon: GoAIconType;
  export let testid: string = "";

  let _open = false;
  let _rootEl: HTMLElement;

  $: _slug = toSlug(heading);

  function toSlug(path: string): string {
    return path?.toLowerCase().replace(/ /g, "-");
  }

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    _open = !_open;
    dispatch(_rootEl, "_groupOpen", { open: _open });
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }
</script>

<div
  bind:this={_rootEl}
  class="root"
  data-testid={testid}
>
  <goa-work-side-menu-item
    {icon}
    label={heading}
    url={`#${_slug}`}
    role="button"
    aria-expanded={_open}
    aria-label={_open ? "Close group" : "Open group"}
    tabindex="0"
    on:click={handleClick}
    on:keydown={handleKeyDown}
  >
    <div slot="trailingContent" class="trailing-icon">
      {#if _open}
        <goa-icon type="chevron-down" size="3" />
      {:else}
        <goa-icon type="chevron-forward" size="3" />
      {/if}
    </div>
  </goa-work-side-menu-item>
  <div class:hidden={!_open} class="group" data-testid="group">
    <slot />
  </div>
</div>

<style>
  :host * {
    box-sizing: border-box;
  }

  .root {
    container-type: inline-size;
    position: relative;
  }

  .trailing-icon {
    display: flex;
  }

  .group {
    border-left: var(--goa-side-menu-child-border-width) solid
      var(--goa-color-greyscale-100);
    margin-left: var(--goa-side-menu-group-container-margin-left);
    padding-left: var(--goa-space-s);
    margin-top: var(--goa-space-xs);
    margin-bottom: var(--goa-side-menu-group-container-margin-bottom);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .group {
    --goa-work-side-menu-item-icon-display: none;
    --goa-work-side-menu-item-padding: 4px 8px;
    --goa-work-side-menu-item-min-height: 28px;
    --goa-work-side-menu-item-text-size: var(--goa-typography-body-xs);
  }

  .hidden {
    display: none;
  }

  @container (max-width: 160px) {
    .group {
      display: none;
    }
  }
</style>
