<svelte:options customElement="goa-circular-progress" />

<!-- Script -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import noScroll from "../../common/no-scroll";
  import {
    typeValidator,
    toBoolean,
    relay,
    generateRandomId,
  } from "../../common/utils";
  import { WorkspaceScrollLockMsg } from "../../types/relay-types";

  // Validators
  const [Variants, validateVariant] = typeValidator(
    "Circular progress variant",
    ["fullscreen", "inline"],
  );
  const [Sizes, validateSize] = typeValidator("Button size", [
    "small",
    "large",
  ]);

  // Types
  type Size = (typeof Sizes)[number];
  type Variant = (typeof Variants)[number];

  // Optional
  /** Stretch across the full screen or use it inline */
  export let variant: Variant = "inline";
  /** Size of the progress indicator */
  export let size: Size = "large";
  /** Loading message displayed under the progress indicator */
  export let message: string = "";
  /** Set the progress value. Setting this value will change the type from infinite to progress */
  export let progress: number = -1;
  /** Show/hide the page loader. This allows for fade transition to be applied in each transition. */
  export let visible: string = "false";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";

  $: isVisible = toBoolean(visible);

  let spinnerSize: "large" | "xlarge";
  let fullscreen: boolean;
  let inline: boolean;
  let _overlayEl: HTMLElement | null = null;
  let _hostEl: HTMLElement | null = null;
  const _scrollLockId = generateRandomId();
  let _scrollLocked = false;

  $: syncScrollLock(isVisible && fullscreen, _overlayEl);

  onMount(() => {
    validateVariant(variant);
    validateSize(size);
    spinnerSize = size === "small" ? "large" : "xlarge";
    fullscreen = variant === "fullscreen";
    inline = variant === "inline";
  });

  onDestroy(() => {
    // Safety net: release the lock if torn down while still visible.
    if (_scrollLocked && _hostEl) {
      relay(
        _hostEl,
        WorkspaceScrollLockMsg,
        { id: _scrollLockId, locked: false },
        { bubbles: true },
      );
      _scrollLocked = false;
    }
  });

  // Tell an ancestor WorkspaceLayout to lock its scroll container while the
  // fullscreen loader is visible. The layout scrolls an inner element, so the
  // loader's own body scroll lock has no effect there. Relayed from the overlay
  // element, which is present while visible and during the fade-out flush, so
  // the unlock still reaches the layout before the node leaves the DOM.
  function syncScrollLock(locked: boolean, overlayEl: HTMLElement | null) {
    if (locked === _scrollLocked || !overlayEl) {
      return;
    }
    _scrollLocked = locked;
    _hostEl = (overlayEl.getRootNode() as ShadowRoot).host as HTMLElement;
    relay(
      overlayEl,
      WorkspaceScrollLockMsg,
      { id: _scrollLockId, locked },
      { bubbles: true },
    );
  }
</script>

<!-- HTML -->
{#if isVisible}
  {#if fullscreen}
    <div
      transition:fade={{ duration: 300 }}
      use:noScroll={{ enable: true }}
      bind:this={_overlayEl}
      class:fullscreen
      data-testid={testid}
    >
      <goa-spinner size={spinnerSize} {progress} />
      {#if message}
        <div class="message">{message}</div>
      {/if}
    </div>
  {:else if inline}
    <div
      class:inline
      class={"spinner-" + spinnerSize}
      data-testid={testid}
    >
      <goa-spinner size={spinnerSize} {progress} />
      {#if message}
        <div class="message">{message}</div>
      {/if}
    </div>
  {/if}
{/if}

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  .fullscreen {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: var(--goa-circular-progress-color-background);
  }

  .inline {
    margin: 3.5rem;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .spinner-large .message {
    margin-top: var(--goa-circular-progress-small-margin-top);
    font: var(--goa-circular-progress-small-text);
  }
  .spinner-xlarge .message {
    margin-top: var(--goa-circular-progress-large-margin-top);
    font: var(--goa-circular-progress-large-text);
  }
</style>
