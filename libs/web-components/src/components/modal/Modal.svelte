<svelte:options customElement="goa-modal" />

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import noscroll from "../../common/no-scroll";
  import { toBoolean, typeValidator } from "../../common/utils";
  import { onDestroy, onMount, tick } from "svelte";

  type CalloutVariant = (typeof CALLOUT_VARIANT)[number];
  type Transition = (typeof Transitions)[number];

  // ******
  // Public
  // ******

  export let heading: string = "";
  export let closable: string = "false";
  export let open: string = "false";
  export let transition: Transition = "none";
  export let calloutvariant: CalloutVariant | null = null;
  export let maxwidth: string = "60ch";

  // @deprecated: use maxwidth
  export let width: string = "";

  // *******
  // Private
  // *******

  let _rootEl: HTMLElement | null = null;
  let _scrollPos: "top" | "middle" | "bottom" = "top";
  let _scrollEl: HTMLElement | null = null;
  let _headerEl: HTMLElement | null = null;
  let _isOpen: boolean = false;
  let _requiresTopPadding: boolean;

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
    if (hasScroll) {
      _scrollPos = "top";
    }
  }

  $: if (_isOpen && _rootEl) {
    _requiresTopPadding =
      !!_headerEl?.querySelector("div.modal-title")?.textContent ||
      !!_headerEl?.querySelector("div.modal-close") ||
      getChildren().length > 0;
  }

  $: _transitionTime =
    transition === "none" ? 0 : transition === "slow" ? 400 : 200;

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

    // event listenerts
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
      return;
    }

    // bottom
    if (
      Math.abs(
        e.detail.scrollHeight - e.detail.scrollTop - e.detail.offsetHeight,
      ) < 1
    ) {
      _scrollPos = "bottom";
      return;
    }

    _scrollPos = "middle";
  }

  function getChildren(): Element[] {
    const slot = _headerEl?.querySelector("slot") as HTMLSlotElement;
    if (slot) {
      return [...slot.assignedElements()];
    } else {
      // @ts-expect-error
      return [..._headerEl.children] as Element[]; // unit tests
    }
  }
</script>

{#if _isOpen}
  <goa-focus-trap {open}>
    <div
      use:noscroll={{ enable: _isOpen }}
      in:fade={{ duration: _transitionTime }}
      out:fade={{ delay: _transitionTime, duration: _transitionTime }}
      data-testid="modal"
      class={`modal ${_scrollPos}`}
      style={`--maxwidth: ${maxwidth};`}
      bind:this={_rootEl}
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div data-testid="modal-overlay" class="modal-overlay" on:click={close} />
      <div
        in:fly={{ duration: _transitionTime, y: 200 }}
        out:fly={{ delay: _transitionTime, duration: _transitionTime, y: -100 }}
        class="modal-pane"
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
          <header bind:this={_headerEl} class:has-content={_requiresTopPadding}>
            <div data-testid="modal-title" class="modal-title">
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
                  data-testid="modal-close-button"
                  icon="close"
                  on:click={close}
                  variant="nocolor"
                />
              </div>
            {/if}
          </header>
          <div data-testid="modal-content" class="modal-content">
            <goa-scrollable
              direction="vertical"
              hpadding="1.9rem"
              maxheight="70vh"
              bind:this={_scrollEl}
              on:_scroll={handleScroll}
            >
              <slot />
            </goa-scrollable>
          </div>
          <div class="modal-actions" data-testid="modal-actions">
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
    z-index: 100;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

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
    padding-top: 2rem;
    border-radius: 4px 0px 0px 4px;
  }
  .content {
    flex: 1 1 auto;
    width: 100%;
    margin: var(--goa-space-xl);
  }

  .content header {
    display: flex;
    justify-content: space-between;
  }

  header.has-content {
    margin-bottom: var(--goa-space-l);
  }

  @media (--mobile) {
    .content {
      margin: var(--goa-space-l);
    }
    header.has-content {
      margin-bottom: var(--goa-space-m);
    }

    .modal-actions :global(::slotted(*)) {
      padding: var(--goa-space-l) 0 0;
    }
  }

  @media (--desktop) {
    .modal-pane {
      max-width: var(--maxwidth);
    }
  }

  .modal-pane {
    background-color: #fff;
    z-index: 1001;
    width: 90%;
    display: flex;
    box-shadow: var(--goa-shadow-modal);
    border-radius: 4px;
    border: 1px solid var(--goa-color-greyscale-700);
  }

  .modal-actions :global(::slotted(*)) {
    padding: var(--goa-space-xl) 0 0;
  }

  .modal-content {
    margin: 0 -2rem;
    line-height: 1.75rem;
  }

  .modal-content :global(::slotted(:last-child)) {
    margin-bottom: 0 !important;
  }

  .modal-title {
    font: var(--goa-typography-heading-m);
  }

  .modal-close {
    padding-left: var(--goa-space-m);
    margin-top: var(--goa-space-2xs);
  }

  .scroll-top {
    box-shadow: inset 0px -8px 6px -6px rgba(0, 0, 0, 0.1);
  }

  .scroll-middle {
    box-shadow:
      inset 0px -8px 6px -6px rgba(0, 0, 0, 0.1),
      inset 0px 8px 6px -6px rgba(0, 0, 0, 0.1);
  }

  .scroll-bottom {
    box-shadow: inset 0px 8px 6px -6px rgba(0, 0, 0, 0.1);
  }
</style>
