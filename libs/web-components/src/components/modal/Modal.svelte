<svelte:options customElement="goa-modal" />

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import noscroll from "../../common/no-scroll";
  import {
    getSlottedChildren,
    typeValidator,
    toBoolean,
    relay,
    generateRandomId,
  } from "../../common/utils";
  import { WorkspaceScrollLockMsg } from "../../types/relay-types";
  import { onDestroy, onMount, tick } from "svelte";

  type CalloutVariant = (typeof CALLOUT_VARIANT)[number];
  type Transition = (typeof Transitions)[number];
  type VersionType = (typeof Version)[number];

  // ******
  // Public
  // ******

  /** The heading text displayed at the top of the modal. */
  export let heading: string = "";
  /** Show close icon and allow clicking the background to close the modal. */
  export let closable: string = "false";
  /** Controls if modal is visible or not. */
  export let open: string = "false";
  /** Sets the animation transition when opening/closing. 'fast' or 'slow' for animated, 'none' for instant. */
  export let transition: Transition = "none";
  /** Define the context and colour of the callout modal. It is required when type is set to callout. */
  export let calloutvariant: CalloutVariant | null = null;
  /** Set the max allowed width of the modal. */
  export let maxwidth: string = "60ch";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "modal";
  /** @internal Design system version for styling. */
  export let version: VersionType = "1";

  /** @deprecated Use maxwidth instead. */
  export let width: string = "";

  // *******
  // Private
  // *******

  let _rootEl: HTMLElement | null = null;
  let _isOpen: boolean = false;
  let _headingSlotHasContent = false;
  let _actionsSlotHasContent = false;
  const _scrollLockId = generateRandomId();
  let _scrollLocked = false;
  let _hostEl: HTMLElement | null = null;

  // Type verification
  const [CALLOUT_VARIANT, validateCalloutVariant] = typeValidator(
    "Callout variant",
    ["emergency", "important", "information", "success", "event"],
  );

  const [Transitions, validateTransition] = typeValidator("Modal transition", [
    "fast",
    "slow",
    "none",
  ]);

  const [Version, validateVersion] = typeValidator("Version", ["1", "2"]);

  // ********
  // Reactive
  // ********

  $: _isClosable = toBoolean(closable);
  $: _headingExists =
    heading !== "" || ($$slots.heading && _headingSlotHasContent);
  $: _headerHasContent = _headingExists || _isClosable;

  // Moving the reactive var into a timeout prevents accessing null stylesheet
  // reference to allow for creation of the @keyframes for the in:fade and out:fade transitions.
  // DDIDS-1288
  $: setTimeout(() => (_isOpen = toBoolean(open)), 1);

  $: syncScrollLock(_isOpen, _rootEl);

  $: _transitionTime =
    transition === "none" ? 0 : transition === "slow" ? 400 : 200;

  $: if (_isOpen) {
    checkSlotsContent();
  }

  $: _iconType =
    calloutvariant === "emergency"
      ? "warning"
      : calloutvariant === "important"
        ? "alert-circle"
        : calloutvariant === "information"
          ? "information-circle"
          : calloutvariant === "success"
            ? "checkmark-circle"
            : calloutvariant === "event"
              ? "calendar"
              : "";

  // *****
  // Hooks
  // *****

  onMount(() => {
    validateCalloutVariant(calloutvariant);
    validateTransition(transition);
    validateVersion(version);

    // event listeners
    window.addEventListener("keydown", onInputKeyDown);

    if (width) {
      maxwidth = width;
      console.warn("`width` is deprecated. Please use `maxwidth` instead.");
    }
  });

  onDestroy(() => {
    window.removeEventListener("keydown", onInputKeyDown);
    // Safety net: release the lock if the modal is torn down while still open.
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

  // *********
  // Functions
  // *********

  // Tell an ancestor WorkspaceLayout to lock its scroll container while the modal
  // is open. The layout scrolls an inner element, so the modal's own body scroll
  // lock has no effect there. Relayed from _rootEl, which is present while open
  // and during the closing flush, so the unlock still reaches the layout before
  // the node leaves the DOM. The _scrollLocked guard skips the initial closed
  // state and avoids duplicate messages.
  function syncScrollLock(isOpen: boolean, rootEl: HTMLElement | null) {
    const locked = isOpen && !!rootEl;
    if (locked === _scrollLocked || !rootEl) {
      return;
    }
    _scrollLocked = locked;
    _hostEl = (rootEl.getRootNode() as ShadowRoot).host as HTMLElement;
    relay(
      rootEl,
      WorkspaceScrollLockMsg,
      { id: _scrollLockId, locked },
      { bubbles: true },
    );
  }

  async function checkSlotsContent() {
    await tick();

    _headingSlotHasContent = !isEmptySlot(".modal-title", "heading");
    _actionsSlotHasContent = !isEmptySlot(".modal-actions", "actions");
  }

  /**
   * This check is currently Angular specific, to check that the specified slot contains
   * more than an emtpy <div> element, as that is what Angular is currently injecting
   * when the ng-template is not defined.
   * @param selector
   * @param slotName
   */
  function isEmptySlot(selector: string, slotName: string): boolean {
    const el = _rootEl?.querySelector(selector);
    const children = el && getSlottedChildren(el);

    // If no children at all, it's empty
    if (!children || children.length === 0) {
      return true;
    }

    // If the only child is an iframe, it's empty
    if (children?.length === 1 && children[0].tagName === "IFRAME") {
      return true;
    }

    return (
      children?.length === 1 && // there should only be one child element
      children[0].tagName === "DIV" && // angular renders a <div>
      children[0].getAttribute("slot") === slotName && // the div is a slot
      children[0]?.textContent?.trim() === ""
    ); // the div is empty
  }

  function close(e: Event) {
    if (!_isClosable) {
      return;
    }
    _rootEl?.dispatchEvent(new CustomEvent("_close", { composed: true }));
    e.stopPropagation();
  }

  const onInputKeyDown = (e: KeyboardEvent) => {
    if (!_isOpen) {
      return;
    }
    switch (e.key) {
      case "Escape":
        close(e);
        e.preventDefault();
        break;
    }
  };
</script>

{#if _isOpen}
  <goa-focus-trap {open}>
    <div
      use:noscroll={{ enable: _isOpen }}
      in:fade={{ duration: _transitionTime }}
      out:fade={{ delay: _transitionTime, duration: _transitionTime }}
      data-testid={testid}
      class="modal"
      style={`--maxwidth: ${maxwidth}`}
      role="presentation"
      bind:this={_rootEl}
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div data-testid="modal-overlay" class="modal-overlay" on:click={close} />
      <div
        in:fly={{ duration: _transitionTime, y: 200 }}
        out:fly={{ delay: _transitionTime, duration: _transitionTime, y: -100 }}
        class="modal-pane"
        class:v2={version === "2"}
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="goa-modal-heading"
        data-first-focus="true"
      >
        {#if calloutvariant !== null && version !== "2"}
          <div class="callout-bar {calloutvariant}">
            <goa-icon
              type={_iconType}
              inverted={calloutvariant === "important" ? "false" : "true"}
            />
          </div>
        {/if}
        <div class="content">
          <goa-scroll-panel>
            <header
              slot="header"
              class:has-content={_headerHasContent}
              class:callout={calloutvariant !== null}
              class={version === "2" && calloutvariant ? calloutvariant : ""}
            >
              <div class="modal-heading-content">
                {#if version === "2" && _iconType}
                  <goa-icon type={_iconType} size="medium" theme="filled" />
                {/if}
                <div
                  data-testid="modal-title"
                  class="modal-title"
                  id="goa-modal-heading"
                  aria-label={_headingExists ? undefined : "Modal"}
                >
                  {#if heading}
                    {heading}
                  {:else if $$slots.heading}
                    <slot name="heading" />
                  {/if}
                </div>
              </div>
              {#if _isClosable}
                <div class="modal-close">
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <goa-icon-button
                    size="medium"
                    data-ignore-focus="true"
                    data-testid="modal-close-button"
                    arialabel="Close the modal"
                    icon="close"
                    theme="filled"
                    on:click={close}
                    variant="dark"
                  />
                </div>
              {/if}
            </header>
            <div data-testid="modal-content" class="modal-content">
              <slot name="content">
                <slot />
              </slot>
            </div>
            <div
              slot="footer"
              class="modal-actions"
              class:empty-actions={!_actionsSlotHasContent}
              data-testid="modal-actions"
            >
              {#if $$slots.actions}
                <slot name="actions" />
              {/if}
            </div>
          </goa-scroll-panel>
        </div>
      </div>
    </div>
  </goa-focus-trap>
{/if}

<!-- ======================================================================= -->
<!-- Css -->
<!-- ======================================================================= -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  :host * {
    box-sizing: border-box;
  }

  /* z-index lives here (not on :host) so the stacking context it establishes is
     rooted at a box already sized to the viewport. :host is in normal flow and
     often collapses to ~0 size (it has no in-flow content of its own, just this
     fixed child), and a stacking context rooted at a collapsed, off-viewport box
     can fail to composite correctly over unrelated fixed/sticky content
     elsewhere on the page (e.g. a WorkspaceLayout side menu). See #1528 for why
     the modal needs to outrank other components' z-index. */
  .modal {
    font-family: var(--goa-font-family-sans);
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    z-index: 99999;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--goa-modal-overlay-color);
    z-index: 1;
    opacity: var(--goa-modal-overlay-opacity);
  }

  /* Callout types */
  .emergency {
    background-color: var(--goa-color-emergency-default);
  }

  .important {
    background-color: var(--goa-color-warning-default);
  }

  .information {
    background-color: var(--goa-color-info-default);
  }

  .event {
    background-color: var(--goa-color-info-default);
  }

  .success {
    background-color: var(--goa-color-success-default);
  }

  .callout-bar {
    flex: 0 0 3rem;
    text-align: center;
    padding: var(--goa-modal-callout-bar-padding) 0 0 0;
    border-radius: var(--goa-modal-border-radius) 0px 0px
      var(--goa-modal-border-radius);
  }

  .content {
    flex: 1 1 auto;
    width: 100%;
    padding: var(
      --goa-modal-content-wrapper-padding,
      var(--goa-modal-padding) var(--goa-modal-padding) 0
        var(--goa-modal-padding)
    );
  }

  .content header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: var(--goa-modal-heading-padding, 0);
    border-bottom: var(--goa-modal-heading-border-bottom, none);
  }

  .content header.has-content {
    margin-bottom: var(--goa-modal-content-gap); /* space under heading */
  }

  .content header .modal-heading-content {
    margin-top: var(--goa-space-2xs);
  }

  @media (--mobile) {
    .content {
      padding: var(
        --goa-modal-content-wrapper-padding,
        var(--goa-modal-padding-small-screen)
          var(--goa-modal-padding-small-screen) 0
          var(--goa-modal-padding-small-screen)
      );
    }

    .content header.has-content {
      margin-bottom: var(
        --goa-modal-content-gap-small-screen
      ); /* space under heading */
    }

    .modal-actions :global(::slotted(*)) {
      padding: 0;
    }

    .modal-content :global(::slotted(:last-child)) {
      margin-bottom: var(--goa-space-xs) !important;
    }

    .modal-pane {
      flex-direction: column;
    }

    .callout-bar {
      text-align: left;
      padding: var(--goa-modal-callout-bar-padding-small-screen);
      border-radius: var(--goa-modal-border-radius)
        var(--goa-modal-border-radius) 0px 0px;
      height: var(--goa-space-2xl);
    }

    .modal-content {
      margin: 0;
      padding: 0 var(--goa-modal-scrollable-padding-mobile, var(--goa-space-m));
      box-shadow: none;
    }

    /* V2 Mobile Overrides */
    .v2 .content header {
      padding: var(--goa-modal-heading-padding-mobile, var(--goa-space-m));
    }

    .v2 .content header.callout {
      padding: var(
        --goa-modal-callout-heading-padding-mobile,
        var(--goa-space-m)
      );
    }

    .v2 .modal-content {
      padding: var(
        --goa-modal-content-padding-mobile,
        var(--goa-space-xl) var(--goa-space-m) var(--goa-space-xl)
          var(--goa-space-m)
      );
    }

    .v2 .modal-actions {
      padding: var(
        --goa-modal-actions-padding-mobile,
        0 var(--goa-space-m) var(--goa-space-m) var(--goa-space-m)
      );
    }
  }

  @media (--not-mobile) {
    .modal-pane {
      max-width: var(--maxwidth);
    }

    .modal-content {
      margin: 0;
      padding: 0 var(--goa-modal-scrollable-padding-desktop, var(--goa-space-l));
      box-shadow: none;
    }

    .v2 .modal-content {
      padding: var(
        --goa-modal-content-padding-desktop,
        var(--goa-space-l) var(--goa-space-l) var(--goa-space-xl)
          var(--goa-space-l)
      );
    }
  }

  .modal-pane {
    background-color: var(--goa-modal-color-bg, #fff);
    border: var(--goa-modal-border, none);
    z-index: 2;
    width: var(--goa-modal-pane-width, 90%);
    display: flex;
    box-shadow: var(--goa-shadow-modal);
    border-radius: var(--goa-modal-border-radius);
  }

  .v2.modal-pane {
    border: none;
  }

  /* Bound the pane so scroll-panel inside has a flex height context. 160px =
     128px edge margin (64px top + 64px bottom) + 32px (matches the prior V1
     maxheight calc's extra --goa-space-xl term), */
  .modal-pane {
    max-height: calc(100vh - 160px);
    overflow: hidden;
  }

  .content {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }

  goa-scroll-panel {
    flex: 1 1 auto;
    min-height: 0;
  }

  .modal-content :global(::slotted(:last-child)) {
    margin-bottom: var(--goa-space-m) !important;
  }
  /* V2: Remove margins from slotted content to prevent spacing issues */
  .v2 .modal-content :global(::slotted(:first-child)) {
    margin-top: 0 !important;
  }

  .modal-title {
    font: var(--goa-modal-header-typography);
  }

  .modal-close {
    padding-left: var(--goa-space-m);
  }

  .modal-actions {
    width: 100%;
    padding: var(
      --goa-modal-actions-padding,
      var(--goa-space-m) 0 var(--goa-modal-padding) 0
    );
    margin: auto 0 0 0;
    text-align: right;
  }

  .modal-actions.empty-actions {
    padding: 0 0 var(--goa-modal-padding) 0;
  }

  /* V2: Empty actions should take no space */
  .v2 .modal-actions.empty-actions {
    padding: 0;
  }

  /* V2 Callout Styles */
  .v2 .modal-heading-content {
    display: flex;
    align-items: start;
    gap: var(--goa-space-xs);
  }

  .v2 .content header.callout {
    padding: var(--goa-modal-callout-heading-padding);
    border-radius: var(--goa-modal-border-radius) var(--goa-modal-border-radius)
      0 0;
  }

  .v2 header.callout goa-icon {
    margin-top: 1px;
  }

  .v2 header.information {
    background-color: var(--goa-modal-callout-information-bg);
    border-bottom-color: var(--goa-modal-callout-information-border);
  }

  .v2 header.information goa-icon {
    color: var(--goa-modal-callout-information-icon);
  }

  .v2 header.success {
    background-color: var(--goa-modal-callout-success-bg);
    border-bottom-color: var(--goa-modal-callout-success-border);
  }

  .v2 header.success goa-icon {
    color: var(--goa-modal-callout-success-icon);
  }

  .v2 header.important {
    background-color: var(--goa-modal-callout-important-bg);
    border-bottom-color: var(--goa-modal-callout-important-border);
  }

  .v2 header.important goa-icon {
    color: var(--goa-modal-callout-important-icon);
  }

  .v2 header.emergency {
    background-color: var(--goa-modal-callout-emergency-bg);
    border-bottom-color: var(--goa-modal-callout-emergency-border);
  }

  .v2 header.emergency goa-icon {
    color: var(--goa-modal-callout-emergency-icon);
  }

  .v2 header.event {
    background-color: var(--goa-modal-callout-event-bg);
    border-bottom-color: var(--goa-modal-callout-event-border);
  }

  .v2 header.event goa-icon {
    color: var(--goa-modal-callout-event-icon);
  }

  /* V2 callout close button hover colors — override icon-button's dark hover bg */
  .v2 header.information .modal-close goa-icon-button {
    --goa-icon-button-dark-hover-color-bg: var(
      --goa-modal-callout-information-close-bg-hover
    );
  }

  .v2 header.success .modal-close goa-icon-button {
    --goa-icon-button-dark-hover-color-bg: var(
      --goa-modal-callout-success-close-bg-hover
    );
  }

  .v2 header.important .modal-close goa-icon-button {
    --goa-icon-button-dark-hover-color-bg: var(
      --goa-modal-callout-important-close-bg-hover
    );
  }

  .v2 header.emergency .modal-close goa-icon-button {
    --goa-icon-button-dark-hover-color-bg: var(
      --goa-modal-callout-emergency-close-bg-hover
    );
  }
</style>
