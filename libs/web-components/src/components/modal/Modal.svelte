<svelte:options customElement="goa-modal" />

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import noscroll from "../../common/no-scroll";
  import {
    getSlottedChildren,
    toBoolean,
    typeValidator,
  } from "../../common/utils";
  import { onDestroy, onMount, tick } from "svelte";

  type CalloutVariant = (typeof CALLOUT_VARIANT)[number];
  type Transition = (typeof Transitions)[number];
  type Role = (typeof Role)[number];

  // ******
  // Public
  // ******

  export let heading: string = "";
  export let closable: string = "false";
  export let open: string = "false";
  export let transition: Transition = "none";
  export let calloutvariant: CalloutVariant | null = null;
  export let maxwidth: string = "60ch";
  export let testid: string = "modal";

  // @deprecated: use maxwidth
  export let width: string = "";
  // accessibility
  export let role: Role = "dialog";

  // *******
  // Private
  // *******

  let _rootEl: HTMLElement | null = null;
  let _scrollPos: "top" | "middle" | "bottom" | null = "top";
  let _scrollEl: HTMLElement | undefined;
  let _headerEl: HTMLElement | undefined;
  let _isOpen: boolean = false;
  let _requiresTopPadding: boolean;
  let _actionsHeight: number;
  let _actionsSlotHasContent = false;
  let _headerHeight: number;
  let _edgeMargin: number = 128; //64px top edge + 64px bottom edge

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

  const [Role, validateRole] = typeValidator("Modal Role", [
    "dialog",
    "alertdialog",
  ]);

  // ********
  // Reactive
  // ********

  $: _isClosable = toBoolean(closable);

  // Moving the reactive var into a timeout prevents accessing null stylesheet
  // reference to allow for creation of the @keyframes for the in:fade and out:fade transitions.
  // DDIDS-1288
  $: setTimeout(() => (_isOpen = toBoolean(open)), 1);

  // Show the shadow at the top of the content after scrolling down
  $: if (_isOpen && _scrollEl) {
    const hasScroll = _scrollEl.scrollHeight > _scrollEl.offsetHeight;
    _scrollPos = hasScroll ? "top" : null;
  }

  $: if (_isOpen && _rootEl && _headerEl) {
    _requiresTopPadding =
      !!_headerEl?.querySelector("div.modal-title")?.textContent ||
      !!_headerEl?.querySelector("div.modal-close") ||
      getSlottedChildren(_headerEl).length > 0;
  }

  $: _transitionTime =
    transition === "none" ? 0 : transition === "slow" ? 400 : 200;

  $: if (_isOpen) {
    checkActionsSlotContent();
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

  onMount(async () => {
    await tick();
    validateCalloutVariant(calloutvariant);
    validateTransition(transition);
    validateRole(role);

    // event listeners
    window.addEventListener("keydown", onInputKeyDown);

    if (width) {
      maxwidth = width;
      console.warn("`width` is deprecated. Please use `maxwidth` instead.");
    }
  });

  onDestroy(() => {
    window.removeEventListener("keydown", onInputKeyDown);
  });

  // *********
  // Functions
  // *********

  async function checkActionsSlotContent() {
    await tick();
    _actionsSlotHasContent = !!_rootEl?.querySelector('[name="actions"]');
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

  function handleScroll(e: CustomEvent) {
    const hasScroll = e.detail.scrollHeight > e.detail.offsetHeight;
    if (!_isOpen || !hasScroll) return;

    // top
    if (e.detail.scrollTop == 0) {
      _scrollPos = "top";
    } else if (
      // bottom
      Math.abs(
        e.detail.scrollHeight - e.detail.scrollTop - e.detail.offsetHeight,
      ) < 1
    ) {
      _scrollPos = "bottom";
    } else {
      _scrollPos = "middle";
    }
  }
</script>

{#if _isOpen}
  <goa-focus-trap {open}>
    <div
      use:noscroll={{ enable: _isOpen }}
      in:fade={{ duration: _transitionTime }}
      out:fade={{ delay: _transitionTime, duration: _transitionTime }}
      data-testid={testid}
      class={`modal ${_scrollPos ?? ""}`}
      style={`--maxwidth: ${maxwidth}; --actions-height: ${_actionsHeight}px; --header-height: ${_headerHeight}`}
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
        tabindex="-1"
        {role}
        aria-modal="true"
        aria-labelledby="goa-modal-heading"
      >
        {#if calloutvariant !== null}
          <div class="callout-bar {calloutvariant}">
            <goa-icon
              type={_iconType}
              inverted={calloutvariant === "important" ? "false" : "true"}
            />
          </div>
        {/if}
        <div class="content">
          {#if heading || _isClosable || $$slots.heading}
            <header
              bind:this={_headerEl}
              class:has-content={_requiresTopPadding}
              bind:clientHeight={_headerHeight}
            >
              <div
                data-testid="modal-title"
                class="modal-title"
                id="goa-modal-heading"
              >
                {#if heading}
                  {heading}
                {:else}
                  <slot name="heading" />
                {/if}
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
          {/if}
          <div data-testid="modal-content" class="modal-content">
            <goa-scrollable
              direction="vertical"
              hpadding="var(--scrollable-padding)"
              maxheight="calc(100vh - {_headerHeight}px - var(--goa-space-xl) - {_actionsHeight}px - {_edgeMargin}px)"
              bind:this={_scrollEl}
              on:_scroll={handleScroll}
            >
              <slot name="content">
                <slot />
              </slot>
            </goa-scrollable>
          </div>
          <div
            bind:clientHeight={_actionsHeight}
            class="modal-actions"
            class:empty-actions={!_actionsSlotHasContent}
            data-testid="modal-actions"
          >
            <slot name="actions" />
          </div>
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
    position: relative;
    z-index: 99999;
  }

  :host * {
    box-sizing: border-box;
  }

  .modal {
    font-family: var(--goa-font-family-sans);
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    z-index: 3;
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
    border-radius: var(--goa-modal-border-radius) 0px 0px var(--goa-modal-border-radius);
  }

  .content {
    flex: 1 1 auto;
    width: 100%;
    padding: var(--goa-modal-padding) var(--goa-modal-padding) 0 var(--goa-modal-padding);
  }

  .content header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--goa-modal-padding);
  }

  header.has-content {
    margin-bottom: var(--goa-modal-content-gap); /* space under heading */
  }

  @media (--mobile) {
    .content {
      padding: var(--goa-modal-padding-small-screen) var(--goa-modal-padding-small-screen) 0 var(--goa-modal-padding-small-screen);
    }
    header.has-content {
      margin-bottom: var(--goa-modal-content-gap-small-screen); /* space under heading */
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
      border-radius: var(--goa-modal-border-radius) var(--goa-modal-border-radius) 0px 0px;
      height: var(--goa-space-2xl);
    }

    .modal-content {
    margin: 0 -1.5rem;
    box-shadow: none;
    }

    :host {
      --scrollable-padding: var(--goa-scrollable-padding-mobile);
    }

  }

  @media (--not-mobile) {
    .modal-pane {
      max-width: var(--maxwidth);
    }

    .modal-content {
    margin: 0 -2rem;
    box-shadow: none;
    }

    :host {
      --scrollable-padding: var(--goa-scrollable-padding-desktop);
    }

  }

  .modal-pane {
    background-color: #fff;
    z-index: 2;
    width: 90%;
    display: flex;
    box-shadow: var(--goa-shadow-modal);
    border-radius: var(--goa-modal-border-radius);
  }

  .modal-content :global(::slotted(:last-child)) {
    margin-bottom: var(--goa-space-m) !important;
  }

  .modal-title {
    font: var(--goa-modal-header-typography);
  }

  .modal-close {
    padding-left: var(--goa-space-m);
  }

  .modal-actions {
    width: 100%;
    padding: var(--goa-space-m) 0 var(--goa-modal-padding) 0;
    margin: auto 0 0 0;
    text-align: right;
  }

  .modal-actions.empty-actions {
    padding: 0 0 var(--goa-modal-padding) 0;
  }

  .modal.top .modal-content {
    box-shadow: inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  }

  .modal.bottom .modal-content {
    box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3);
  }

  .modal.middle .modal-content {
    box-shadow:
      inset 0 8px 8px -8px rgba(0, 0, 0, 0.2),
      inset 0 -8px 8px -8px rgba(0, 0, 0, 0.2);
  }
</style>
