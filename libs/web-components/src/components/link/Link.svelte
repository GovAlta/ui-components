<svelte:options
  customElement={{
    tag: "goa-link",
    props: {
      action: { type: "String", attribute: "action", reflect: true },
      actionArg: { type: "String", attribute: "action-arg", reflect: true },
      actionArgs: { type: "Object", attribute: "action-args", reflect: true },
    },
  }}
/>

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";
  import { dispatch, styles } from "../../common/utils";
  import { GoAIconType } from "../icon/Icon.svelte";
  import { onMount } from "svelte";

  /** Icon displayed before the link text. */
  export let leadingicon: GoAIconType | null = null;
  /** Icon displayed after the link text. */
  export let trailingicon: GoAIconType | null = null;
  /** Sets the color theme. 'interactive' for blue, 'dark' for black, 'light' for white text. */
  export let color: "interactive" | "dark" | "light" = "interactive";
  /** Sets the text size and corresponding icon size. */
  export let size: "xsmall" | "small" | "medium" | "large" = "medium";

  /** Custom action event name to dispatch when the link is clicked. */
  export let action: string = "";
  /** Single argument to pass with the action event (deprecated, use actionArgs). */
  export let actionArg: string = "";
  /** Object of arguments to pass with the action event. */
  export let actionArgs: Record<string, unknown> = {};

  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";

  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  let _rootEl: HTMLElement;
  // Tracks keyboard-driven focus on the slotted anchor. Bound to a state class
  // so the visible ring wraps the whole link (icon + text) like it did pre-#3605,
  // without triggering on mouse click the way :focus-within did.
  let _keyboardFocused = false;

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
    _rootEl.addEventListener("focusin", handleFocusIn);
    _rootEl.addEventListener("focusout", handleFocusOut);
  });

  function handleClick(e: Event) {
    e.preventDefault();
    dispatch(e.target as Element, action, actionArg || actionArgs, {
      bubbles: true,
    });
  }

  function handleIconClick() {
    if (action) return; // Let click bubble to the container action handler
    const host = (_rootEl.getRootNode() as ShadowRoot)?.host as HTMLElement;
    host?.querySelector("a")?.click();
  }

  function handleFocusIn(event: FocusEvent) {
    // composedPath()[0] returns the actual focused element across the slot
    // boundary; event.target is retargeted to the host inside shadow DOM.
    const focused = event.composedPath()[0] as HTMLElement | undefined;
    if (!focused || focused.tagName !== "A") return;
    if (focused.matches(":focus-visible")) {
      _keyboardFocused = true;
    }
  }

  function handleFocusOut() {
    _keyboardFocused = false;
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
  class:keyboard-focused={_keyboardFocused}
  bind:this={_rootEl}
  style={styles(calculateMargin(mt, mr, mb, ml))}
  data-testid={testid}
>
  {#if leadingicon}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <goa-icon
      data-testid="leading-icon"
      type={leadingicon}
      size={_iconSize}
      on:click={handleIconClick}
    />
  {/if}
  <slot />
  {#if trailingicon}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <goa-icon
      data-testid="trailing-icon"
      type={trailingicon}
      size={_iconSize}
      on:click={handleIconClick}
    />
  {/if}
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
    gap: var(--goa-link-gap);
  }

  /* Size variants - Typography and Gap */
  .link.xsmall {
    font: var(--goa-link-typography-xsmall);
    gap: var(--goa-link-gap-xsmall);
  }

  .link.small {
    font: var(--goa-link-typography-small);
    gap: var(--goa-link-gap-small);
  }

  .link.medium {
    font: var(--goa-link-typography-medium);
    gap: var(--goa-link-gap-medium);
  }

  .link.large {
    font: var(--goa-link-typography-large);
    gap: var(--goa-link-gap-large);
  }

  /* Color variant: Interactive (Blue) */
  .link.interactive {
    color: var(--goa-link-color-interactive-default);
  }

  .link.interactive :global(::slotted(a)) {
    color: var(--goa-link-color-interactive-default) !important;
  }

  .link.interactive:hover {
    color: var(--goa-link-color-interactive-hover);
  }

  .link.interactive:hover :global(::slotted(a)) {
    color: var(--goa-link-color-interactive-hover) !important;
  }

  .link.interactive :global(a:visited) {
    color: var(--goa-link-color-interactive-visited) !important;
  }

  /* Color variant: Dark (Black) */
  .link.dark {
    color: var(--goa-link-color-dark-default);
  }

  .link.dark :global(::slotted(a)) {
    color: var(--goa-link-color-dark-default) !important;
  }

  .link.dark:hover {
    color: var(--goa-link-color-dark-hover);
  }

  .link.dark:hover :global(::slotted(a)) {
    color: var(--goa-link-color-dark-hover) !important;
  }

  .link.dark :global(a:visited) {
    color: var(--goa-link-color-dark-visited) !important;
  }

  /* Color variant: Light (White) */
  .link.light {
    color: var(--goa-link-color-light-default);
  }

  .link.light :global(::slotted(a)) {
    color: var(--goa-link-color-light-default) !important;
  }

  .link.light:hover {
    color: var(--goa-link-color-light-hover);
  }

  .link.light:hover :global(::slotted(a)) {
    color: var(--goa-link-color-light-hover) !important;
  }

  .link.light :global(a:visited) {
    color: var(--goa-link-color-light-visited) !important;
  }

  /* Suppress browser-default rings on the slotted anchor — the container draws
     the visible ring via .keyboard-focused below. */
  .link :global(::slotted(a:focus)),
  .link :global(::slotted(a:focus-visible)) {
    outline: none !important;
    box-shadow: none !important;
  }

  /* Focus ring on the outer container. The .keyboard-focused class is toggled in
     handleFocusIn / handleFocusOut, gated by the slotted anchor's :focus-visible
     match. This keeps the pre-#3605 visual (ring wraps icon + text) while only
     showing on keyboard-driven focus. */
  .link.keyboard-focused {
    border-radius: var(--goa-link-border-radius-focus);
    outline: var(--goa-link-border-focus);
    outline-offset: var(--goa-link-focus-offset);
  }
</style>
