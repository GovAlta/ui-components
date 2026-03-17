<svelte:options
  customElement={{
    tag: "goa-popover",
    props: {
      open: { reflect: true, type: "String" },
    },
  }}
/>

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import {
    dispatch,
    generateRandomId,
    style,
    styles,
    toBoolean,
  } from "../../common/utils";
  import type { Spacing } from "../../common/styling";

  // Public

  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "popover";
  /** Provides control to where the popover content is positioned. */
  export let position: "above" | "below" | "right" | "auto" = "auto";
  /** Sets the maximum width of the popover container. */
  export let maxwidth: string | "none" = "320px";
  /** Sets the minimum width of the popover container. */
  export let minwidth: string = "";
  /** Sets a fixed width for the popover container. */
  export let width: string = "";
  /** Controls the height behavior. 'full' stretches to parent height, 'wrap-content' fits content. */
  export let height: "full" | "wrap-content" = "wrap-content";
  /** Sets if the popover has padding. Use false when content needs to be flush with boundaries. */
  export let padded: string = "true";
  /** Sets the tabindex. Use -1 to skip tabbing when a parent handles keyboard events. */
  export let tabindex: number = 0;
  /** @deprecated This property has no effect and will be removed in a future version. */
  export let relative: string = "";
  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  // Exposed privates - used internally by other components
  /** Controls the open state of the popover programmatically. Used by Dropdown, AppHeaderMenu. */
  export let open: string = "false";
  /** Disables the popover interaction. Used by parent components like Dropdown. */
  export let disabled: string = "false";
  /** Additional vertical offset added to the popover's position. */
  export let voffset = "";
  /** Additional horizontal offset added to the popover's position. */
  export let hoffset = "";
  /** Width of the focus outline border. */
  export let focusborderwidth = "var(--goa-border-width-l)";
  /** Border radius of the popover window. */
  export let borderradius = "var(--goa-border-radius-m)";
  /** Indicates the popover is used within a filterable context like a combobox. */
  export let filterablecontext: string = "false";

  // Private
  let _rootEl: HTMLElement;
  let _popoverEl: HTMLElement;
  const _needsPositionPolyfill =
    typeof document !== "undefined" &&
    !("anchorName" in document.documentElement.style);
  let _positionRafId: number | null = null;

  // Reactive
  let _targetEl: HTMLElement;
  let _isOpen = false;
  let _autoPosition: "above" | "below" = "below";
  const _popoverId = `goa-popover-${generateRandomId()}`;

  $: _disabled = toBoolean(disabled);
  $: _padded = toBoolean(padded);
  $: _filterableContext = toBoolean(filterablecontext);

  $: syncPopoverOpenState(_popoverEl, open);

  function syncPopoverOpenState(
    popoverEl: HTMLElement | undefined,
    openProp: string,
  ) {
    if (!popoverEl) return;

    const shouldBeOpen = toBoolean(openProp);
    const actuallyOpen = isPopoverOpen();

    if (shouldBeOpen && !actuallyOpen) {
      popoverEl.showPopover();
    } else if (!shouldBeOpen && actuallyOpen) {
      popoverEl.hidePopover();
    }
  }

  // Close the popover on URL changes (e.g. clicking a link inside the popover)
  $: {
    if (_isOpen) {
      window.addEventListener("popstate", handleUrlChange, true);
    } else {
      window.removeEventListener("popstate", handleUrlChange, true);
    }
  }

  onMount(() => {
    _popoverEl?.addEventListener("toggle", handleNativeToggle);

    // add keybinding to open the popover
    _targetEl?.addEventListener("keydown", onTargetEvent);
    // listener for `close` events emitted from child components
    _rootEl.addEventListener("close", (e) => {
      closePopover();
      e.stopPropagation();
    });

    showDeprecationWarnings();
    addGlobalCloseListener();
    window.addEventListener("resize", updateAutoPosition);
  });

  onDestroy(() => {
    stopManualPositioning();
    window.removeEventListener("resize", updateAutoPosition);
    // true was passed when the listener was added, so it's necesary to be passed here as well
    window.removeEventListener("popstate", handleUrlChange, true);
  });

  // Functions

  function updatePopoverPosition() {
    if (!_isOpen || !_targetEl || !_popoverEl) return;

    const targetRect = _targetEl.getBoundingClientRect();
    const xOffset = hoffset ? parseFloat(hoffset) : 0;
    const yOffset = voffset ? parseFloat(voffset) : 3;

    // Recalculate auto position based on current viewport space
    if (position === "auto") {
      const popoverRect = _popoverEl.getBoundingClientRect();
      const spaceAbove = targetRect.top;
      const spaceBelow = window.innerHeight - targetRect.bottom;

      _autoPosition =
        spaceBelow < popoverRect.height && spaceAbove > spaceBelow
          ? "above"
          : "below";
    }

    const isAbove =
      position === "above" ||
      (position === "auto" && _autoPosition === "above");

    if (isAbove) {
      _popoverEl.style.top = `${targetRect.top - yOffset}px`;
      _popoverEl.style.left = `${targetRect.left + xOffset}px`;
      _popoverEl.style.transform = "translateY(-100%)";
    } else {
      _popoverEl.style.top = `${targetRect.bottom + yOffset}px`;
      _popoverEl.style.left = `${targetRect.left + xOffset}px`;
      _popoverEl.style.transform = "";
    }
  }

  function startManualPositioning() {
    if (!_needsPositionPolyfill) return;

    const loop = () => {
      updatePopoverPosition();
      _positionRafId = requestAnimationFrame(loop);
    };
    _positionRafId = requestAnimationFrame(loop);
  }

  function stopManualPositioning() {
    if (_positionRafId !== null) {
      cancelAnimationFrame(_positionRafId);
      _positionRafId = null;
    }
  }

  function isPopoverOpen(): boolean {
    try {
      return _popoverEl.matches(":popover-open");
    } catch {
      return _popoverEl.getAttribute("data-popover-open") === "true";
    }
  }

  // When one popover is opened it dispatches a `goa:closePopover` to the document.body element, so adding a listener
  // here will allow any other popover that is currently open to be closed
  function addGlobalCloseListener() {
    document.body.addEventListener("goa:closePopover", (e: Event) => {
      if (!_isOpen) {
        return;
      }

      const { target } = (e as CustomEvent).detail;

      // the popover that is being opened will, at that time have the an open state, so we need to prevent
      // that one that is being opened be immediately closed.
      if (target !== _targetEl) {
        closePopover();
      }
    });
  }

  function showDeprecationWarnings() {
    if (relative !== "") {
      console.warn(
        "Popover `relative` property is deprecated. It should be removed from your code because it is no longer needed to help with positioning.",
      );
    }
  }

  // Called on window popstate changes. This allows for clicking links within
  // the popover to close the popover
  function handleUrlChange(_e: Event) {
    if (_popoverEl && isPopoverOpen()) {
      _popoverEl.hidePopover();
    }
  }

  function onTargetEvent(e: KeyboardEvent) {
    switch (e.key) {
      case " ":
        if (_filterableContext) {
          break;
        }
        // Prevent the button's native click from firing on Space keyup,
        // which would immediately toggle the popover closed again.
        e.preventDefault();
        if (!_isOpen) {
          _popoverEl?.showPopover();
        }
        e.stopPropagation();
        break;
    }
  }

  function handleNativeToggle(toggleEvent: ToggleEvent) {
    if (toggleEvent.newState === "open") {
      _isOpen = true;
    } else if (toggleEvent.newState === "closed") {
      _isOpen = false;
    } else {
      _isOpen = isPopoverOpen();
    }

    open = _isOpen ? "true" : "false";

    // Dispatch _open/_close events for consumer components
    // (MenuButton, AppHeader, AppHeaderMenu, Dropdown)
    if (_isOpen) {
      dispatch(_rootEl, "_open", {}, { bubbles: true });
      requestAnimationFrame(updateAutoPosition); // same vs await tick(), make sure popover element is fully rendered before we measure its dimension
      startManualPositioning();
    } else {
      stopManualPositioning();
      _targetEl?.focus();
      dispatch(_rootEl, "_close", {}, { bubbles: true });
    }
  }

  function closePopover() {
    if (_isOpen) {
      _popoverEl?.hidePopover(); // browser will fire and trigger handleNativeToggle
      // If the browser doesn't support the API we have to trigger the toggle event manually.
      if (_needsPositionPolyfill) {
        const event = new ToggleEvent("toggle", {
          bubbles: true,
          newState: "closed",
          oldState: "open",
        });
        handleNativeToggle(event); // in case the browser doesn't fire toggle event, we need to manually update the state
      }
    }
  }

  function togglePopover(e: MouseEvent) {
    e.stopPropagation();
    if (_disabled || !_popoverEl) {
      return;
    }

    if (_isOpen) {
      _popoverEl.hidePopover();
      _isOpen = false;
    } else {
      // If the Popover API is not supported, we need to manually close other
      // popovers before opening a new one.
      if (_needsPositionPolyfill) {
        document.body.dispatchEvent(
          new CustomEvent("goa:closePopover", {
            detail: { target: _targetEl },
            bubbles: true,
          }),
        );
      }
      _popoverEl.showPopover();
      _isOpen = true;
      requestAnimationFrame(updateAutoPosition);
    }
  }

  function updateAutoPosition() {
    if (!_isOpen || !_targetEl || !_popoverEl) {
      return;
    }

    if (position !== "auto") {
      return;
    }

    const targetRect = _targetEl.getBoundingClientRect();
    const popoverRect = _popoverEl.getBoundingClientRect();
    const spaceAbove = targetRect.top;
    const spaceBelow = window.innerHeight - targetRect.bottom;

    _autoPosition =
      spaceBelow < popoverRect.height && spaceAbove > spaceBelow
        ? "above"
        : "below";
  }
</script>

<div
  bind:this={_rootEl}
  data-testid={testid}
  style={styles(
    "display: inline-block",
    height === "full" && "height: 100%;",
    calculateMargin(mt, mr, mb, ml),
    style("--offset-top", voffset),
    style("--offset-bottom", voffset),
    style("--offset-left", hoffset),
    style("--offset-right", hoffset),
    style("--focus-border-width", focusborderwidth),
    style("--border-radius", borderradius),
    style("width", width),
  )}
>
  <button
    class="popover-target"
    bind:this={_targetEl}
    aria-haspopup="dialog"
    aria-controls={_popoverId}
    {tabindex}
    disabled={_disabled}
    on:click={togglePopover}
    on:keyup={(e) => {
      e.preventDefault();
    }}
    data-testid="popover-target"
  >
    <slot name="target" />
  </button>

  <section
    id={_popoverId}
    popover="auto"
    bind:this={_popoverEl}
    data-testid="popover-content"
    class="popover-content"
    class:is-open={_isOpen}
    class:position-above={position === "above" ||
      (position === "auto" && _autoPosition === "above")}
    class:position-below={position === "below" ||
      (position === "auto" && _autoPosition === "below")}
    class:position-right={position === "right"}
    style={styles(
      style("width", position !== "right" ? width : undefined),
      style("min-width", minwidth),
      style(
        "max-width",
        position !== "right" && width ? `max(${width}, ${maxwidth})` : maxwidth,
      ),
      style("padding", _padded ? "var(--goa-space-m)" : "0"),
    )}
  >
    <goa-focus-trap open={_isOpen}>
      <slot />
    </goa-focus-trap>
  </section>
</div>

<!-- Style -->

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    font: var(--goa-typography-body-m);
    display: inline;
    align-items: center;
    height: 100%;
  }

  .popover-target {
    cursor: pointer;
    display: block;
    height: 100%;
    outline: none;
    border: none;
    padding: 0;
    background-color: transparent;
    width: inherit;
    text-align: inherit;
    anchor-name: --goa-popover-target;
  }

  .popover-target:has(:focus-visible) {
    outline: var(
      --goa-popover-border-focus,
      var(--focus-border-width) solid var(--goa-color-interactive-default)
    );
  }

  .popover-content {
    color: var(--goa-color-text-default);
    width: fit-content;
    list-style-type: none;
    background: var(--goa-popover-color-bg);
    border-radius: var(--border-radius, var(--goa-popover-border-radius));
    outline: none;
    overflow: visible;
    box-shadow: var(--goa-popover-box-shadow, none);
    filter: var(--goa-popover-shadow, none);
    border: var(--goa-popover-border, none);
    margin: 0;
    inset: auto;
  }

  @supports (anchor-name: --a) {
    .popover-content {
      position-anchor: --goa-popover-target;
      inset-block-start: anchor(bottom);
      inset-inline-start: anchor(left);
      --popover-translate-x: var(--offset-left, 0);
      --popover-translate-y: var(--offset-top, 3px);
      translate: var(--popover-translate-x) var(--popover-translate-y);
    }

    .popover-content.position-above {
      inset-block-start: anchor(top);
      --popover-translate-y: calc(-100% - var(--offset-bottom, 3px));
      position-try-fallbacks: none;
    }

    .popover-content.position-below {
      inset-block-start: anchor(bottom);
      --popover-translate-y: var(--offset-top, 3px);
    }
  }

  .popover-content.position-right {
    inset-block-start: unset;
    inset-block-end: max(8px, anchor(bottom));
    inset-inline-start: anchor(right);
    --popover-translate-x: var(--offset-left, 8px);
    --popover-translate-y: var(--offset-bottom, 0px);
    position-try-fallbacks: none;
  }

  :global(::slotted(ul)) {
    display: block;
    padding: 0;
    margin: 0;
    list-style-type: none;
    line-height: 2rem;
  }
</style>
