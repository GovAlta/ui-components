<svelte:options customElement={{
 tag: "goa-link",
  props: {
    action: { type: "String", attribute: "action", reflect: true},
    actionArg: { type: "String", attribute: "action-arg", reflect: true},
    actionArgs: { type: "Object", attribute: "action-args", reflect: true},
  }
}}/>

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";
  import { dispatch, styles } from "../../common/utils";
  import { GoAIconType } from "../icon/Icon.svelte";
  import { onMount } from "svelte";

  export let leadingicon: GoAIconType | null = null;
  export let trailingicon: GoAIconType | null = null;
  export let color: "interactive" | "dark" | "light" = "interactive";
  export let size: "xsmall" | "small" | "medium" | "large" = "medium";

  export let action: string = "";
  export let actionArg: string = "";
  export let actionArgs: Record<string, unknown> = {};

  export let testid: string = "";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  let _rootEl: HTMLElement;

  $: _iconSize = {
    xsmall: "2xsmall", // 12px
    small: "xsmall", // 16px
    medium: "small", // 18px
    large: "medium", // 20px
  }[size];

  onMount(() => {
    if (action) {
      _rootEl.addEventListener("click", handleClick);
    }
  })

  function handleClick(e: Event) {
    e.preventDefault();
    dispatch(e.target as Element, action, actionArg || actionArgs, { bubbles: true });
  }

  function getIconSize(linkSize: string): string {
    const sizeMap: Record<string, string> = {
      xsmall: "2xsmall",  // 12px
      small: "xsmall",    // 16px
      medium: "small",    // 18px
      large: "medium"     // 20px
    };
    return sizeMap[linkSize] || "small";
  }
</script>

<div
  class="link"
  class:interactive={color === "interactive"}
  class:dark={color === "dark"}
  class:light={color === "light"}
  class:xsmall={size === "xsmall"}
  class:small={size === "small"}
  class:medium={size === "medium"}
  class:large={size === "large"}
  bind:this={_rootEl}
  style={styles(calculateMargin(mt, mr, mb, ml))}
  data-testid={testid}
>
  {#if leadingicon}<goa-icon data-testid="leading-icon" type={leadingicon} size={_iconSize} />{/if}
  <slot />
  {#if trailingicon}<goa-icon data-testid="trailing-icon" type={trailingicon} size={_iconSize} />{/if}
</div>

<style>
  /* Base link styles */
  .link {
    display: inline-flex;
    align-items: center;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    text-decoration: underline;
    /* V1: Default gap fallback (4px) */
    gap: var(--goa-link-gap, 0.25rem);
    /* V2: Size-specific gaps override below */
  }

  /* Size variants - Typography and Gap */
  .link.xsmall {
    font: var(--goa-link-typography-xsmall);
    gap: var(--goa-link-gap-xsmall, 0.125rem);
  }

  .link.small {
    font: var(--goa-link-typography-small);
    gap: var(--goa-link-gap-small, 0.1875rem);
  }

  .link.medium {
    font: var(--goa-link-typography-medium);
    gap: var(--goa-link-gap-medium, 0.25rem);
  }

  .link.large {
    font: var(--goa-link-typography-large);
    gap: var(--goa-link-gap-large, 0.3125rem);
  }

  /* Color variant: Interactive (Blue) */
  .link.interactive {
    color: var(--goa-link-color-interactive-default, var(--goa-color-interactive-default));
  }

  .link.interactive :global(::slotted(a)) {
    color: var(--goa-link-color-interactive-default, var(--goa-color-interactive-default)) !important;
  }

  .link.interactive:hover {
    color: var(--goa-link-color-interactive-hover, var(--goa-color-interactive-hover));
  }

  .link.interactive:hover :global(::slotted(a)) {
    color: var(--goa-link-color-interactive-hover, var(--goa-color-interactive-hover)) !important;
  }

  .link.interactive :global(a:visited) {
    color: var(--goa-link-color-interactive-visited, var(--goa-color-interactive-visited)) !important;
  }

  /* Color variant: Dark (Black) */
  .link.dark {
    color: var(--goa-link-color-dark-default, var(--goa-color-greyscale-black));
  }

  .link.dark :global(::slotted(a)) {
    color: var(--goa-link-color-dark-default, var(--goa-color-greyscale-black)) !important;
  }

  .link.dark:hover {
    color: var(--goa-link-color-dark-hover, var(--goa-color-greyscale-700));
  }

  .link.dark:hover :global(::slotted(a)) {
    color: var(--goa-link-color-dark-hover, var(--goa-color-greyscale-700)) !important;
  }

  .link.dark :global(a:visited) {
    color: var(--goa-link-color-dark-visited, var(--goa-color-interactive-visited)) !important;
  }

  /* Color variant: Light (White) */
  .link.light {
    color: var(--goa-link-color-light-default, var(--goa-color-text-light));
  }

  .link.light :global(::slotted(a)) {
    color: var(--goa-link-color-light-default, var(--goa-color-text-light)) !important;
  }

  .link.light:hover {
    color: var(--goa-link-color-light-hover, var(--goa-color-greyscale-200));
  }

  .link.light:hover :global(::slotted(a)) {
    color: var(--goa-link-color-light-hover, var(--goa-color-greyscale-200)) !important;
  }

  .link.light :global(a:visited) {
    color: var(--goa-link-color-light-visited, #9D8EBB) !important;
  }

  /* Focus */
  .link:focus-within {
    border-radius: var(--goa-link-border-radius-focus, var(--goa-border-radius-s));
    outline: var(--goa-link-border-focus, var(--goa-border-width-l) solid var(--goa-color-interactive-focus));
    outline-offset: var(--goa-link-focus-offset, var(--goa-space-3xs));
  }

  .link :global(::slotted(a:focus-visible)) {
    outline: none;
  }
</style>
