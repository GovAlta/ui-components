<svelte:options customElement="goa-popover" />

<!-- Script -->
<script lang="ts">
  import { onMount, tick } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import { cssVar, toBoolean } from "../../common/utils";
  import type { Spacing } from "../../common/styling";

  // Public

  // to allow for data-testid queries within tests
  export let testid: string = "popover";
  // prevents the popover from exceeding this width
  export let maxwidth: string = "320px";
  // allow width to be hardcoded
  export let width: string = "";
  // allows to override the default padding when content needs to be flush with boundries
  export let padded: string = "true";
  // provides control to where the popover content is positioned
  export let position: "above" | "below" | "auto" = "auto";
  // ajust positioning when popover component is contained within a relative positioned parent
  export let relative: string = "false";

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
  $: _relative = toBoolean(relative);

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

    const slot = _targetEl.querySelector("slot");
    let children: Element[];
    if (slot) {
      children = slot.assignedElements();
    } else {
      // for unit tests only
      // @ts-expect-error
      children = [..._targetEl.children] as Element[];
    }

    _initFocusedEl =
      (children.find(
        (el) => (el as HTMLElement).tabIndex >= 0,
      ) as HTMLElement) || _targetEl;
  });

  // Functions

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
    (async () => {
      _open = true;
      await tick();
      _focusTrapEl.addEventListener("keydown", onFocusTrapEvent, true);
      _rootEl.dispatchEvent(new CustomEvent("_open", { composed: true }));
    })();
  }

  // Ensures that upon closing of the popover that the element that triggered
  // the popover to be shown re-attains focus and that any window event binding
  // is removed (it may not have been added if target was clicked)
  function closePopover() {
    _initFocusedEl.focus();
    _open = false;
    window.removeEventListener("popstate", handleUrlChange, true);
    _rootEl.dispatchEvent(new CustomEvent("_close", { composed: true }));
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
    const rootRect = _rootEl.getBoundingClientRect();
    const targetRect = getBoundingClientRectWithMargins(_targetEl);
    const contentRect = getBoundingClientRectWithMargins(_popoverEl);

    // Calculate available space above and below the target element
    const spaceAbove = targetRect.top;
    const spaceBelow = window.innerHeight - targetRect.bottom;

    // Determine if there's more space above or below the target element
    const displayOnTop =
      position === "auto"
        ? spaceBelow < contentRect.height &&
          spaceAbove > contentRect.height &&
          spaceAbove > spaceBelow
        : position === "above";

    // when popover is within a modal and the scrollbars are hidden we don't need to take into
    // account the scroll offset
    const usingNoScroll = document.body.style.overflow === "hidden";
    const windowOffset = usingNoScroll ? 0 : window.scrollY;

    // If there's more space above, display the popover above the target element
    if (_relative) {
      _popoverEl.style.top = displayOnTop
        ? `-${contentRect.height}px`
        : `${rootRect.height}px`;
    } else {
      _popoverEl.style.top = displayOnTop
        ? `${rootRect.top - contentRect.height + windowOffset}px`
        : `${rootRect.top + rootRect.height + windowOffset}px`;
    }

    // Move the popover to the left if it is too far to the right and only if there is space to the left
    const displayOnRight =
      document.body.clientWidth - targetRect.left < contentRect.width &&
      targetRect.left > contentRect.width;

    if (_relative) {
      if (displayOnRight) {
        _popoverEl.style.right = "0";
      } else {
        _popoverEl.style.left = "0";
      }
    } else {
      _popoverEl.style.left = displayOnRight
        ? `${rootRect.left + targetRect.width - contentRect.width}px`
        : `${rootRect.left}px`;
    }
  }
</script>

<!-- HTML -->

<div
  bind:this={_rootEl}
  data-testid={testid}
  style={`
    ${(_relative && "position: relative;") || ""}
    ${calculateMargin(mt, mr, mb, ml)}
    ${cssVar("--offset-top", voffset)}
    ${cssVar("--offset-bottom", voffset)}
    ${cssVar("--offset-left", hoffset)}
    ${cssVar("--offset-right", hoffset)}
    ${cssVar("--focus-border-width", focusborderwidth)}
    ${cssVar("--border-radius", borderradius)}
`}
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

  {#if _open}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      data-testid="popover-background"
      class="popover-background"
      on:click={closePopover}
    />
    <div class="popover-container">
      <section
        bind:clientHeight={_sectionHeight}
        bind:this={_popoverEl}
        data-testid="popover-content"
        class="popover-content"
        style={`
          ${cssVar("width", width)}
          max-width: ${maxwidth};
          padding: ${_padded ? "var(--goa-space-m)" : "0"};
        `}
      >
        <goa-focus-trap open="true">
          <div bind:this={_focusTrapEl}>
            <slot />
          </div>
        </goa-focus-trap>
      </section>
    </div>
  {/if}
</div>

<!-- Style -->

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    font-size: var(--goa-font-size-4);
    display: flex;
    align-items: center;
  }

  .popover-target {
    cursor: pointer;
  }

  .popover-target:focus {
    outline: var(--focus-border-width) solid var(--goa-color-interactive-focus);
  }

  .popover-content {
    color: var(--goa-color-text-default);
    position: absolute;
    width: fit-content;
    list-style-type: none;
    background: var(--goa-color-greyscale-white);
    border-radius: var(--border-radius);
    outline: none;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
    z-index: 99;
    width: max-content;

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

  .popover-background {
    cursor: default;
    position: fixed;
    z-index: 98;
    inset: 0;
  }
</style>
