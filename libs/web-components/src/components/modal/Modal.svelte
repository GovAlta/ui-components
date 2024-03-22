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
  // accessibility
  export let arialabel: string = "";
  export let selectorprimaryfocus: string = undefined; // Specify a selector to be focused when opening the modal
  export let alert: string = "false";
  // *******
  // Private
  // *******

  let _rootEl: HTMLElement | null = null;
  let _closeButtonEl: HTMLElement | null = null;
  let _scrollPos: "top" | "middle" | "bottom" = "top";
  let _scrollEl: HTMLElement | null = null;
  let _actionEl: HTMLElement | null = null;
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
  $: isAlertDialog = toBoolean(alert);
  $: ariaLabel = arialabel || heading;

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
      getChildren(_headerEl).length > 0;

    // Focus the modal to allow screen reader announces
    const selectedEl = getNodeElementById(selectorprimaryfocus, _scrollEl) || getFirstFocusableElement();
    if (selectedEl) {
      focusElement(selectedEl);
    } else {
      console.warn("There is no focusable element to focus on when the modal opens, preventing the screen reader from announcing to the audience." +
        " Consider setting `alert` to true if this is an announcement, or ensure `closable` is set to true.");
    }
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

  function getChildren(element: HTMLElement): Element[] {
    const slot = element?.querySelector("slot") as HTMLSlotElement;
    if (slot) {
      return [...slot.assignedElements()];
    } else {
      // @ts-expect-error
      return [...element.children] as Element[]; // unit tests
    }
  }

  function getNodeElementById(id: string, node: HTMLElement) {
    if (!id) return null;

    if (!node) return null;

    const children = getChildren(node);
    for (let child of children) {
      if (child.id === id) {
        return child as HTMLElement;
      }
      const selectedNode = getNodeElementById(id, child as HTMLElement);
      if (selectedNode) return selectedNode;
    }

    return null;
  }

  function getFirstFocusableElement() {
    // close button
    if (_closeButtonEl) {
      return _closeButtonEl;
    }
    // if no close button, find in scroll element
    const children = getChildren(_scrollEl);
    for (let child of children) {
      if (isFocusable(child as HTMLElement)) {
        return child as HTMLElement;
      }
    }
    // if no scroll element, find in actions
    const actionChildren = getChildren(_actionEl);
    if (actionChildren.length > 0) {
      const slotContent = actionChildren[0] as HTMLElement;
      const allSubElements = slotContent.querySelectorAll(':scope > *');
      for (let child of allSubElements) {
        if (isFocusable(child as HTMLElement)) {
          return child as HTMLElement;
        }
      }
    }

    return null;
  }

  function isGoaWrapperElement(node: HTMLElement) {
    if (!node) return false;

    return node.tagName.toLowerCase() === "goa-form-item" ||
      node.tagName.toLowerCase() === "goa-button-group";
  }

  function focusElement(node: HTMLElement) {
    if (isNativeHTMLFocusable(node)) {
      node.focus();
    } else {
      let selectedNode = node;
      if (isGoaWrapperElement(node)) {
        const children = getChildren(node);
        for (let child of children) {
          if (isFocusable(child as HTMLElement)) {
            selectedNode = child as HTMLElement;
            break;
          }
        }
      }
      selectedNode.setAttribute("focused", "true");
    }
  }

  function isFocusable(node: HTMLElement) {
    var nodeName = node.tagName.toLowerCase();
    if (nodeName.startsWith("goa-")) {
      return isGoaFocusableElement(node);
    } else {
      return isNativeHTMLFocusable(node);
    }
  }

  function isGoaFocusableElement(node: HTMLElement) {
    let selectedNode = node;

    if (isGoaWrapperElement(node)) {
      const children = getChildren(node);
      for (let child of children) {
        if (isFocusable(child)) {
          selectedNode = child;
          break;
        }
      }
    }

    if (selectedNode.getAttribute("disabled") === "true") {
      return false;
    }

    switch (selectedNode.tagName.toLowerCase()) {
      case "goa-input":
      case "goa-checkbox":
      case "goa-button":
      case "goa-icon-button":
      case "goa-dropdown":
      case "goa-date-picker":
      case "goa-chip":
      case "goa-radio-group":
      case "goa-radio-item":
      case "goa-textarea":
        return true;
      default:
        return false;
    }
  }

  function isNativeHTMLFocusable(node: HTMLElement) {
    if (node.tabIndex < 0) {
      return false;
    }
    if (node.disabled) {
      return false;
    }
    switch (node.tagName.toLowerCase()) {
      case "a":
        return !!node.href && node.rel !== "ignore";
      case "input":
        return node.type !== "hidden" && node.type !== "file";
      case "button":
      case "select":
      case "textarea":
        return true;
      default:
        return false;
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
        role={isAlertDialog ? "alertdialog" : "dialog"}
        aria-modal="true"
        aria-label={ariaLabel}
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
                  arialabel="Close the modal"
                  icon="close"
                  on:click={close}
                  variant="nocolor"
                  bind:this={_closeButtonEl}
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
          <div class="modal-actions" data-testid="modal-actions" bind:this={_actionEl}>
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
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
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
    z-index: 2;
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
