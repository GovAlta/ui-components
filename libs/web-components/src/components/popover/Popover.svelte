<svelte:options
  customElement={{
    tag: "goa-popover",
    props: {
      open: { reflect: true, type: "String" },
      disableGlobalClosePopover: {
        reflect: true,
        type: "Boolean",
        attribute: "disable-global-close-popover",
      },
      preventScrollIntoView: {
        attribute: "prevent-scroll-into-view",
        type: "Boolean",
      },
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
    dispatch,
    isPointInRectangle,
  } from "../../common/utils";
  import type { Spacing } from "../../common/styling";

  // Public

  export let testid: string = "popover";
  export let position: "above" | "below" | "auto" = "auto";
  export let maxwidth: string = "320px";
  export let minwidth: string = "";
  export let width: string = "";
  export let height: "full" | "wrap-content" = "wrap-content";

  // flag passed to the FocusTrap that will prevent unwanted scrolling
  export let preventScrollIntoView: boolean = false;

  // allows to override the default padding when content needs to be flush with boundries
  export let padded: string = "true";

  // allows tabindex to be set to -1 to skip tabbing if a parent is handling events
  export let tabindex: number = 0;

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

  export let disableGlobalClosePopover: boolean = false;

  // allow for outside control of whether popover is open/closed (see AppHeaderMenu)
  export let open: string = "false";

  // allows outside control of the `open` property ex. when used within dropdown
  export let disabled: string = "false";

  // additional vertical offset that is added to popover's position
  export let voffset = "";

  // additional horizontal offset that is added to popover's position
  export let hoffset = "";

  // width of outline seen when focused
  export let focusborderwidth = "var(--goa-border-width-l)";

  // border radius of popover window
  export let borderradius = "var(--goa-border-radius-m)";

  export let closeOnClickWithinBounds = false;

  export let filterablecontext: string = "false";

  // Private

  let _rootEl: HTMLElement;
  let _targetEl: HTMLElement;
  let _popoverEl: HTMLElement;
  let _focusTrapEl: HTMLElement;
  let _sectionHeight: number;
  let _contentFitsWidth: boolean = false;

  // Reactive

  $: _padded = toBoolean(padded);
  $: _open = toBoolean(open);
  $: _disabled = toBoolean(disabled);
  $: _filterableContext = toBoolean(filterablecontext);

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

    // to make the popover content fit its contents instead of the target width
    const hostElement = _rootEl?.getRootNode() as ShadowRoot;
    _contentFitsWidth =
      hostElement?.host?.getAttribute("data-content-fits-width") === "true";

    // add keybinding to open the popover
    _targetEl.addEventListener("keydown", onTargetEvent);

    // listener for `close` events emitted from child components
    _rootEl.addEventListener("close", (e) => {
      closePopover();
      e.stopPropagation();
    });

    showDeprecationWarnings();
    addGlobalCloseListener();
  });

  // Functions

  // Since the focused element is being changed when the popover is open, the scoped keybinding for the escape key may
  // no longer work, so the binding must be done on the document.body
  function addGlobalEscapeKeybinding() {
    document.body.addEventListener("keydown", handleGlobalEscapeKeybinding);
  }

  function handleGlobalEscapeKeybinding(e: KeyboardEvent) {
    if (e.key === "Escape") {
      if (_open) {
        closePopover();
      }
      e.stopPropagation();
    }
  }

  function removeGlobalEscapeKeybinding() {
    document.body.removeEventListener("keydown", handleGlobalEscapeKeybinding);
  }

  // When one popover is opened it dispatches a `goa:closePopover` to the document.body element, so adding a listener
  // here will allow any other popover that is currently open to be closed
  function addGlobalCloseListener() {
    document.body.addEventListener("goa:closePopover", (e: Event) => {
      if (!_open) {
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
        if (_filterableContext) {
          break;
        }
        // case "Enter":
        openPopover();
        e.stopPropagation();
        break;
    }
  }

  // Opens the popover and adds the required binding to the new slot element
  function openPopover() {
    if (_disabled) return;

    // close any other open popovers
    if (!disableGlobalClosePopover) {
      dispatch(document.body, "goa:closePopover", { target: _targetEl });
    }

    // open this popover
    _open = true;

    addGlobalEscapeKeybinding();
    // keep current tab within the bounds of the wrapping focustrap component
    // _focusTrapEl.addEventListener("keydown", onFocusTrapEvent, true);

    // notify parent components of the status change
    dispatch(_rootEl, "_open");

    // find the element that will have initial focus when the popover is shown
    setTimeout(() => {
      const firstFocusableEl = getFirstFocusableEl(_focusTrapEl);
      firstFocusableEl?.focus();
    }, 0);

    document.body.addEventListener("click", handleClick);
  }

  /**
   * Recursively retrieves the first focusable element within a given HTML element.
   * A focusable element is determined by having a non-negative tabIndex.
   *
   * @param {HTMLElement} el - The root HTML element to search within for focusable elements.
   * @return {HTMLElement | null} - Returns the first focusable HTML element found within the given element,
   * or null if no focusable element is found.
   */
  function getFirstFocusableEl(el: HTMLElement): HTMLElement | null {
    if (el.tabIndex >= 0) {
      return el;
    }
    const children = [
      ...el.children,
      ...getSlottedChildren(el),
      el.shadowRoot,
    ].filter(Boolean) as HTMLElement[];
    for (const child of children) {
      const firstFocusable = getFirstFocusableEl(child);
      if (firstFocusable) {
        return firstFocusable;
      }
    }
    return null;
  }

  function handleClick(e: MouseEvent) {
    e.stopPropagation();

    if (!_popoverEl) return;

    const rect = _popoverEl.getBoundingClientRect();
    const clickedInPopover = isPointInRectangle(
      e.clientX,
      e.clientY,
      rect.x,
      rect.y,
      rect.width,
      rect.height,
    );
    const onlyCloseWhenClickedOutside = !closeOnClickWithinBounds;

    // keep open on click
    if (onlyCloseWhenClickedOutside && clickedInPopover) {
      return;
    }

    if (_open) {
      closePopover();
    }
  }

  // Ensures that upon closing of the popover that the element that triggered
  // the popover to be shown re-attains focus and that any window event binding
  // is removed (it may not have been added if target was clicked)
  function closePopover() {
    if (!_open) {
      return;
    }

    if (!_rootEl || !_targetEl || !_popoverEl) {
      return;
    }

    _open = false;

    removeGlobalEscapeKeybinding();

    window.removeEventListener("popstate", handleUrlChange, true);
    dispatch(_rootEl, "_close");
    _targetEl.focus();

    document.body.removeEventListener("click", handleClick);
  }

  function togglePopover(e: Event) {
    _open ? closePopover() : openPopover();
    e.stopPropagation();
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
  <button
    class="popover-target"
    bind:this={_targetEl}
    {tabindex}
    on:click={togglePopover}
    on:keyup={(e) => {
      e.preventDefault();
    }}
    data-testid="popover-target"
  >
    <slot name="target" />
  </button>

  <div style={style("display", _open ? "block" : "none")}>
    <section
      bind:clientHeight={_sectionHeight}
      bind:this={_popoverEl}
      data-testid="popover-content"
      class="popover-content"
      style={styles(
        // For certain contexts (e.g., DatePicker) when the internal data-content-fits-width
        // attribute is set, the content width is set to fit-content instead of inheriting the target width.
        style("width", _contentFitsWidth ? "fit-content" : width),
        style("min-width", minwidth),
        style("max-width", _contentFitsWidth ? maxwidth : width ? `max(${width}, ${maxwidth})` : maxwidth),
        style("padding", _padded ? "var(--goa-space-m)" : "0"),
      )}
    >
      <goa-focus-trap open="true" prevent-scroll-into-view={preventScrollIntoView || undefined}>
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
    display: inline;
    align-items: center;
    height: 100%;
    position: relative;
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
    overflow: visible;
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
