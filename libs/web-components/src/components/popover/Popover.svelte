<svelte:options
  customElement={{
    tag: "goa-popover",
    props: {
      open: { reflect: true, type: "String" },
    },
  }}
/>

<!-- Script -->
<script lang="ts">
  import { onMount, tick } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import {
    style,
    getSlottedChildren,
    styles,
    toBoolean,
  } from "../../common/utils";
  import type { Spacing } from "../../common/styling";

  // Public

  export let testid: string = "popover";
  export let position: "above" | "below" | "auto" = "auto";
  export let maxwidth: string = "320px";
  export let minwidth: string = "";
  export let width: string = "";
  export let height: "full" | "wrap-content" = "wrap-content";

  // allows to override the default padding when content needs to be flush with boundries
  export let padded: string = "true";

  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  export let relative: string = "";

  // margins
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Exposed privates
  // **Required only to allow popover position to be customized when used within
  // other components. These props should _not_ be documented.**

  // allow for outside control of whether popover is open/closed (see AppHeaderMenu)
  export let open: string = "false";

  // allows outside control of the `open` property ex. when used within dropdown
  export let disabled: string = "false";

  // allows tabindex to be set to -1 to skip tabbing if a parent is handling events
  export let tabindex: string = "0";

  // additional vertical offset that is added to popover's position
  export let voffset = "";

  // additional horizontal offset that is added to popover's position
  export let hoffset = "";

  // width of outline seen when focused
  export let focusborderwidth = "var(--goa-border-width-l)";

  // border radius of popover window
  export let borderradius = "var(--goa-border-radius-m)";

  // Private

  let _rootEl: HTMLElement;
  let _targetEl: HTMLElement;
  let _popoverEl: HTMLElement;
  let _focusTrapEl: HTMLElement;
  let _initFocusedEl: HTMLElement;
  let _sectionHeight: number;

  // Reactive

  $: _padded = toBoolean(padded);
  $: _open = toBoolean(open);
  $: _disabled = toBoolean(disabled);

  $: (async () => _open && (await setPopoverPosition()))();
  $: (async () => _sectionHeight && (await setPopoverPosition()))();
  $: {
    if (_open) {
      window.addEventListener("popstate", handleUrlChange, true);
    } else {
      window.removeEventListener("popstate", handleUrlChange, true);
    }
  }

  // Hooks

  onMount(async () => {
    await tick();
    _targetEl.addEventListener("keydown", onTargetEvent);

    // listener for `close` events emitted from child components
    _rootEl.addEventListener("close", (e) => {
      _open = false;
      e.stopPropagation();
    })

    // find the element that will have initial focus when the popover is shown
    const children = getSlottedChildren(_targetEl);
    _initFocusedEl =
      (children.find(
        (el) => (el as HTMLElement).tabIndex >= 0,
      ) as HTMLElement) || _targetEl;

    showDeprecationWarnings();
  });

  // Functions

  function showDeprecationWarnings() {
    if (relative != "") {
      console.warn(
        "Popover `relative` property is deprecated. It should be removed from your code because it is no longer needed to help with positioning.",
      );
    }
  }

  // Called on window popstate changes. This allows for clicking links within
  // the popover to close the popover
  function handleUrlChange(_e: Event) {
    closePopover();
  }

  // Handles events when the targetEl has focus
  function onTargetEvent(e: KeyboardEvent) {
    switch (e.key) {
      case " ":
      case "Enter":
        openPopover();
        break;
      case "Escape":
        closePopover();
        break;
    }
  }

  // Event binding when the focusTrapEl has focus. This is required since the
  // popover exists within the slot of the FocusTrap which prevents the existing
  // targetEl eventing binding from "hearing" the events
  function onFocusTrapEvent(e: KeyboardEvent) {
    switch (e.key) {
      case "Escape":
        closePopover();
        break;
    }
  }

  // Opens the popover and adds the required binding to the new slot element
  function openPopover() {
    if (_disabled) return;

    _open = true;
    _focusTrapEl.addEventListener("keydown", onFocusTrapEvent, true);
    _rootEl.dispatchEvent(new CustomEvent("_open", { composed: true }));
    _initFocusedEl.focus();
    makeEventsBubbleUpFromSlottedElements();
  }

  // Ensures that upon closing of the popover that the element that triggered
  // the popover to be shown re-attains focus and that any window event binding
  // is removed (it may not have been added if target was clicked)
  function closePopover() {
    if (_disabled) return;

    _open = false;
    window.removeEventListener("popstate", handleUrlChange, true);
    _rootEl.dispatchEvent(new CustomEvent("_close", { composed: true }));
    _initFocusedEl.focus({ preventScroll: true });
  }

  // Ensures that all immediate children of the popover target and content are included
  // in event.relatedTarget that bubbles up to popover 'focusout' event handler
  function makeEventsBubbleUpFromSlottedElements() {
    const immediateChildren = getSlottedChildren(_targetEl);
    immediateChildren.forEach((child) => {
      if ((child as HTMLElement).tabIndex < 0) {
        (child as HTMLElement).tabIndex = -1;
      }
    });
    const content = $$slots.default;
    if (content && _focusTrapEl) {
      const immediateChildren = getSlottedChildren(_focusTrapEl);
      immediateChildren.forEach((child) => {
        if ((child as HTMLElement).tabIndex < 0) {
          (child as HTMLElement).tabIndex = -1;
        }
      });
    }
  }

  function handleFocusOut(e: FocusEvent) {
    if (_disabled || !_open) return;

    const activeElement = e.relatedTarget;
    const isFocusInPopover =
      activeElement instanceof Element &&
      isElementContainedInSlotsRecursive(_rootEl, activeElement);
    if (!isFocusInPopover) {
      closePopover();
    }
  }

  export function isElementContainedInSlotsRecursive(
    rootEl: Element,
    childEl: Element,
    depth = 15,
  ): boolean {
    if (rootEl.contains(childEl)) {
      return true;
    }
    if (depth <= 0) {
      return false;
    }
    const slots = rootEl.querySelectorAll("slot");
    for (const slot of Array.from(slots)) {
      const assigned = slot.assignedElements();
      for (const el of assigned) {
        if (isElementContainedInSlotsRecursive(el, childEl, depth - 1)) {
          return true;
        }
      }
    }
    return false;
  }

  function getBoundingClientRectWithMargins(
    el: Element,
  ): Omit<DOMRect, "toJSON"> {
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const mTop = parseInt(style.marginTop, 10) || 0;
    const mRight = parseInt(style.marginRight, 10) || 0;
    const mBottom = parseInt(style.marginBottom, 10) || 0;
    const mLeft = parseInt(style.marginLeft, 10) || 0;

    return {
      top: rect.top - mTop,
      right: rect.right + mRight,
      bottom: rect.bottom + mBottom,
      left: rect.left - mLeft,
      width: rect.width + mLeft + mRight,
      height: rect.height + mTop + mBottom,
      x: rect.x - mLeft,
      y: rect.y - mTop,
    };
  }

  async function setPopoverPosition() {
    await tick();

    // Get target and content rectangles
    const targetRect = getBoundingClientRectWithMargins(_targetEl);
    const popoverRect = getBoundingClientRectWithMargins(_popoverEl);

    // exit if the popover hasn't yet been filled
    if (popoverRect.height < 20) return;

    // Calculate available space above and below the target element
    const spaceAbove = targetRect.top;
    const spaceBelow = window.innerHeight - targetRect.bottom;

    // Determine if there's more space above or below the target element
    const displayOnTop =
      position === "auto"
        ? spaceBelow < popoverRect.height &&
          spaceAbove > popoverRect.height &&
          spaceAbove > spaceBelow
        : position === "above";

    if (displayOnTop) {
      _popoverEl.style.bottom = `${targetRect.height}px`;
    } else {
      _popoverEl.style.bottom = "auto"; // In case this is triggered by _sectionHeight is changed
    }

    // Move the popover to the left if it is too far to the right and only if there is space to the left
    const rightAligned =
      document.body.clientWidth - targetRect.left < popoverRect.width &&
      targetRect.left > popoverRect.width;

    if (rightAligned) {
      _popoverEl.style.left = `${targetRect.x - (popoverRect.width - targetRect.width)}px`;
    }
  }
</script>

<!-- HTML -->

<div
  bind:this={_rootEl}
  data-testid={testid}
  on:focusout={handleFocusOut}
  style={styles(
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
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class="popover-target"
    tabindex={+tabindex}
    bind:this={_targetEl}
    on:click={openPopover}
    data-testid="popover-target"
  >
    <slot name="target" />
  </div>

  <div
    class="popover-container"
    style={!_open && styles(style("display", "none"))}
  >
    <section
      bind:clientHeight={_sectionHeight}
      bind:this={_popoverEl}
      data-testid="popover-content"
      tabindex="-1"
      class="popover-content"
      style={styles(
        style("width", width),
        style("min-width", minwidth),
        style("max-width", width ? `max(${width}, ${maxwidth})` : maxwidth),
        style("padding", _padded ? "var(--goa-space-m)" : "0"),
      )}
    >
      <goa-focus-trap open="true">
        <div bind:this={_focusTrapEl}>
          <slot />
        </div>
      </goa-focus-trap>
    </section>
  </div>
</div>

<!-- Style -->

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    font: var(--goa-typography-body-m);
    display: flex;
    align-items: center;
    height: 100%;
    position: relative;
  }

  .popover-target {
    cursor: pointer;
    height: 100%;
    outline: none;
  }

  .popover-target:has(:focus-visible) {
    outline: var(--goa-popover-border-focus);
  }

  .popover-content {
    color: var(--goa-color-text-default);
    position: absolute;
    z-index: 99;
    width: fit-content;
    list-style-type: none;
    background: var(--goa-popover-color-bg);
    border-radius: var(--goa-popover-border-radius);
    outline: none;
    filter: var(--goa-popover-shadow);
    margin-top: var(--offset-top, 3px);
    margin-bottom: var(--offset-bottom, 3px);
    margin-left: var(--offset-left, 0);
    margin-right: var(--offset-right, 0);
  }

  :global(::slotted(ul)) {
    display: block;
    padding: 0;
    margin: 0;
    list-style-type: none;
    line-height: 2rem;
  }
</style>
