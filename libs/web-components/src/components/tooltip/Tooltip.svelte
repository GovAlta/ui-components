<svelte:options customElement="goa-tooltip" />

<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { typeValidator } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";

  // Public

  /** The content of the tooltip. */
  export let content: string = "";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Position with respect to the child element. */
  export let position: Position = "top";
  /** Horizontal alignment to the child element. */
  export let halign: Alignment = "center";
  /** Sets the maximum width of the tooltip. Must use 'px' unit. */
  export let maxwidth: string = "";
  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  // Types

  type Position = (typeof Positions)[number];
  type Alignment = (typeof Alignment)[number];

  // Validator

  const [Positions, validatePosition] = typeValidator(
    "Tooltip positions",
    ["top", "bottom", "left", "right"],
    false,
  );

  const [Alignment, validateAlignment] = typeValidator(
    "Tooltip alignment",
    ["left", "right", "center"],
    false,
  );

  const validateMaxWidth = (maxwidth: string): string => {
    if (!maxwidth) return "";

    // Check for 'px' unit
    if (!maxwidth.endsWith("px")) {
      return "";
    }

    // Check for valid value
    const numericValue = parseFloat(maxwidth);
    if (isNaN(numericValue) || numericValue <= 0) {
      return "";
    }

    return maxwidth;
  };

  const validator = (position: Position, align: Alignment) => {
    if (position === "left" || position === "right") {
      if (align !== "center") {
        console.error(
          `[${align}] is an invalid option for position ${position}`,
        );
      }
    }
  };

  // Private

  let _screenSize = 0;
  let _rootEl: HTMLElement;
  let _tooltipEl: HTMLElement;
  let _targetEl: HTMLElement;
  let _initialPosition: Position;
  let _computedAlign: Alignment = "center";
  let _tooltipVisible = false;
  let _showTooltipTimeout: ReturnType<typeof setTimeout> | undefined;
  let _hideTooltipTimeout: ReturnType<typeof setTimeout> | undefined;
  let _positionRafId: number | null = null;
  const _needsManualPositioning =
    typeof document !== "undefined" &&
    !("anchorName" in document.documentElement.style);
  const _manualGap = 12;
  const _manualOffset = 16;

  // Use a unique id for each tooltip instance.
  // So screen readers can identify the tooltip instance when
  // there are multiple tooltips on the same page
  let _tooltipInstanceId: string;

  // Reactive

  $: {
    content && reconcileTooltipLayout(); // Check position when content changes.
  }

  // Hooks

  onMount(() => {
    validatePosition(position);
    validateAlignment(halign);
    validator(position, halign);
    maxwidth = validateMaxWidth(maxwidth);

    _initialPosition = position;
    _computedAlign = halign;
    _tooltipInstanceId = Math.random().toString(36);

    window.addEventListener("resize", onWindowResize);
  });

  onDestroy(() => {
    window.removeEventListener("resize", onWindowResize);

    clearTimeout(_showTooltipTimeout);
    clearTimeout(_hideTooltipTimeout);

    if (_needsManualPositioning || _positionRafId !== null) {
      stopManualPositioning();
    }
  });

  // Functions

  const showTooltip = () => {
    _showTooltipTimeout = setTimeout(() => {
      // Measure target width here — layout is guaranteed to be available on hover
      updateTargetWidth();
      _tooltipVisible = true;

      // Popover promotion to the top layer can require one paint before
      // dimensions are stable, so size/position on the next frame.
      requestAnimationFrame(() => {
        reconcileTooltipLayout();
        if (_needsManualPositioning) {
          startManualPositioning();
        }
      });
    }, 300);
  };

  const hideTooltip = () => {
    clearTimeout(_showTooltipTimeout);

    _hideTooltipTimeout = setTimeout(() => {
      _tooltipVisible = false;
      position = _initialPosition;
      _computedAlign = halign;
      if (_needsManualPositioning || _positionRafId !== null) {
        stopManualPositioning();
      }
    }, 500);
  };

  function startManualPositioning() {
    if (!_needsManualPositioning || _positionRafId !== null) {
      return;
    }

    const loop = () => {
      updateManualPopoverCoordinates();
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

  function onWindowResize() {
    reconcileTooltipLayout();
  }

  // Mouse click also fires on:focus on a tabindex=0 element, but we only want
  // to reveal the tooltip on keyboard-driven focus so JS state stays aligned
  // with the CSS :focus-visible rule that drives opacity.
  function handleFocus(e: FocusEvent) {
    const target = e.currentTarget as HTMLElement | null;
    if (!target?.matches?.(":focus-visible")) return;
    clearTimeout(_hideTooltipTimeout);
    showTooltip();
  }

  function applyTooltipWidth(
    tooltipRect: DOMRect,
    targetRect: DOMRect,
    spaceLeft: number,
    spaceRight: number,
  ) {
    const viewportWidth = _screenSize || window.innerWidth;
    const calculatedMaxWidth =
      maxwidth && maxwidth.endsWith("px") ? parseFloat(maxwidth) : 400;
    const newWidth = Math.min(
      viewportWidth * 0.8,
      calculatedMaxWidth,
      tooltipRect.width,
      Math.max(spaceLeft, spaceRight) - 10,
    );
    const shouldWrapContent =
      (maxwidth && maxwidth.endsWith("px")) ||
      newWidth > targetRect.width ||
      newWidth > spaceLeft ||
      newWidth > spaceRight;

    _tooltipEl.style.width = `${Math.ceil(Math.max(newWidth - 32, 1))}px`;
    _tooltipEl.style.whiteSpace = shouldWrapContent ? "normal" : "nowrap";
  }

  function getAdjustedPosition(
    currentPosition: Position,
    tooltipRect: DOMRect,
    spaceTop: number,
    spaceBottom: number,
    spaceLeft: number,
    spaceRight: number,
  ): Position {
    let adjustedPosition = currentPosition;

    if (currentPosition === "bottom" && tooltipRect.height > spaceBottom) {
      adjustedPosition = "top";
    } else if (currentPosition === "top" && tooltipRect.height > spaceTop) {
      adjustedPosition = "bottom";
    }

    if (currentPosition === "right" && tooltipRect.width > spaceRight) {
      adjustedPosition = "left";
    } else if (currentPosition === "left" && tooltipRect.width > spaceLeft) {
      adjustedPosition = "right";
    }

    return adjustedPosition;
  }

  function resolveTopBottomAlign(
    requestedAlign: Alignment,
    targetRect: DOMRect,
    tooltipRect: DOMRect,
    offset: number,
  ): Alignment {
    const viewportWidth = window.innerWidth;
    const centerLeft =
      targetRect.left + (targetRect.width - tooltipRect.width) / 2;
    const rightLeft = targetRect.left - offset;
    const leftLeft = targetRect.right - tooltipRect.width + offset;

    const projectedLeftByAlign = (align: Alignment): number => {
      if (align === "left") return leftLeft;
      if (align === "right") return rightLeft;
      return centerLeft;
    };

    const overflowsViewport = (left: number): boolean => {
      const right = left + tooltipRect.width;
      return left < 0 || right > viewportWidth;
    };

    const overflowAmount = (left: number): number => {
      const right = left + tooltipRect.width;
      return Math.max(0, -left) + Math.max(0, right - viewportWidth);
    };

    const requestedLeft = projectedLeftByAlign(requestedAlign);
    const requestedOverflows = overflowsViewport(requestedLeft);

    if (!requestedOverflows) {
      return requestedAlign;
    }

    if (requestedAlign === "right" || requestedAlign === "left") {
      const oppositeAlign: Alignment =
        requestedAlign === "right" ? "left" : "right";
      const oppositeLeft = projectedLeftByAlign(oppositeAlign);

      if (!overflowsViewport(oppositeLeft)) {
        return oppositeAlign;
      }

      if (overflowAmount(oppositeLeft) < overflowAmount(requestedLeft)) {
        return oppositeAlign;
      }

      return requestedAlign;
    }

    const leftOverflow = overflowAmount(leftLeft);
    const rightOverflow = overflowAmount(rightLeft);
    return leftOverflow <= rightOverflow ? "left" : "right";
  }

  async function reconcileTooltipLayout() {
    // angular needs time to render the _tooltipEl
    await tick();

    if (!_tooltipEl || !_rootEl || !_targetEl || !_tooltipVisible) {
      return;
    }

    // Clear any width/white-space set by a previous reconcile so the
    // natural size for the current content is measured, not a size left
    // over from earlier content (e.g. "Copy" -> "Copied").
    _tooltipEl.style.width = "";
    _tooltipEl.style.whiteSpace = "";

    // determine the bounding rectangle of the tooltip and target element
    let tooltipRect = _tooltipEl.getBoundingClientRect();
    const targetRect = _targetEl.getBoundingClientRect();

    const spaceTop = targetRect.top;
    const spaceBottom = window.innerHeight - targetRect.bottom;
    const spaceLeft = targetRect.left;
    const spaceRight = window.innerWidth - targetRect.right;
    applyTooltipWidth(tooltipRect, targetRect, spaceLeft, spaceRight);

    // Re-measure the tooltip rect after applying width/white-space
    // since text wrapping can change the tooltip's dimensions
    tooltipRect = _tooltipEl.getBoundingClientRect();

    const newPosition = getAdjustedPosition(
      position,
      tooltipRect,
      spaceTop,
      spaceBottom,
      spaceLeft,
      spaceRight,
    );

    const newAlign =
      newPosition === "top" || newPosition === "bottom"
        ? resolveTopBottomAlign(halign, targetRect, tooltipRect, _manualOffset)
        : "center";

    // update tooltip position
    position = newPosition;
    _computedAlign = newAlign;
  }

  function updateManualPopoverCoordinates() {
    if (!_tooltipVisible || !_tooltipEl || !_targetEl) return;

    const targetRect = _targetEl.getBoundingClientRect();
    const tooltipRect = _tooltipEl.getBoundingClientRect();
    const gap = _manualGap;
    const offset = _manualOffset;

    if (position === "top") {
      _tooltipEl.style.top = `${targetRect.top - tooltipRect.height - gap}px`;
      _tooltipEl.style.left = `${targetRect.left + (targetRect.width - tooltipRect.width) / 2}px`;
    } else if (position === "bottom") {
      _tooltipEl.style.top = `${targetRect.bottom + gap}px`;
      _tooltipEl.style.left = `${targetRect.left + (targetRect.width - tooltipRect.width) / 2}px`;
    } else if (position === "left") {
      _tooltipEl.style.top = `${targetRect.top + (targetRect.height - tooltipRect.height) / 2}px`;
      _tooltipEl.style.left = `${targetRect.left - tooltipRect.width - gap}px`;
    } else if (position === "right") {
      _tooltipEl.style.top = `${targetRect.top + (targetRect.height - tooltipRect.height) / 2}px`;
      _tooltipEl.style.left = `${targetRect.right + gap}px`;
    }

    // Adjust horizontal alignment for top/bottom positions
    if (position === "top" || position === "bottom") {
      if (_computedAlign === "left") {
        // tooltip's right edge aligns with target's right edge
        _tooltipEl.style.left = `${targetRect.right - tooltipRect.width + offset}px`;
      } else if (_computedAlign === "right") {
        // tooltip's left edge aligns with target's left edge
        _tooltipEl.style.left = `${targetRect.left - offset}px`;
      }
    }
  }

  function updateTargetWidth() {
    if (!_rootEl || !_tooltipEl || !_targetEl) return;

    const targetHalfWidth = `${_targetEl.getBoundingClientRect().width / 2}px`;
    _rootEl.style.setProperty("--target-width", targetHalfWidth);
  }
</script>

<svelte:window bind:innerWidth={_screenSize} />

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="tooltip"
  class:use-anchor-based-positioning={!_needsManualPositioning}
  class:use-manual-positioning={_needsManualPositioning}
  bind:this={_rootEl}
  on:mouseenter={() => {
    clearTimeout(_hideTooltipTimeout);
    showTooltip();
  }}
  on:mouseleave={hideTooltip}
  on:focus={handleFocus}
  on:blur={hideTooltip}
  data-testid={testid}
  aria-describedby="{_tooltipInstanceId}-tooltip"
  tabindex="0"
  style={calculateMargin(mt, mr, mb, ml)}
>
  <div
    class="tooltip-target"
    bind:this={_targetEl}
    aria-describedby="{_tooltipInstanceId}-tooltip"
  >
    <slot />
  </div>
  <span
    id="{_tooltipInstanceId}-tooltip"
    class="tooltip-text {position} align-{_computedAlign}"
    bind:this={_tooltipEl}
    role="tooltip"
    aria-hidden={!_tooltipVisible}
    class:show={_tooltipVisible}
  >
    {#if $$slots.content}
      <slot name="content" />
    {:else}
      {content}
    {/if}
  </span>
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  .tooltip {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .tooltip:focus-visible {
    outline: var(--goa-tooltip-border-focus);
    outline-offset: -4px;
    border-radius: 8px;
  }

  .tooltip-text {
    pointer-events: none;
    font: var(--goa-tooltip-text-size);
    background-color: var(--goa-tooltip-color-bg);
    color: var(--goa-tooltip-color-text);
    text-align: center;
    border-radius: var(--goa-tooltip-border-radius);
    position: fixed;
    z-index: 9999;
    opacity: 0;
    transition: opacity var(--goa-motion-duration-medium-2)
      var(--goa-motion-curve-productive);
    padding: var(--goa-tooltip-padding);
    text-align: left;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    overflow: visible;
    border-width: 0;
  }

  .show.tooltip-text {
    opacity: 1;
  }

  .use-manual-positioning .tooltip-text {
    position: fixed;
    z-index: 9999;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
  }

  .use-anchor-based-positioning .tooltip-text {
    position-anchor: --goa-tooltip-target;
    margin: 0;
    inset-block-start: anchor(bottom);
    inset-inline-start: anchor(left);
  }

  .tooltip-target {
    margin: var(--goa-tooltip-gap);
    height: auto;
    display: flex;
    cursor: pointer;
  }

  .use-anchor-based-positioning .tooltip-target {
    anchor-name: --goa-tooltip-target;
  }

  /* Positions */

  .use-anchor-based-positioning .tooltip-text.bottom {
    inset-block-start: anchor(bottom);
    inset-inline-start: anchor(center);
    translate: -50% var(--goa-space-s);
  }

  .use-anchor-based-positioning .tooltip-text.top {
    inset-block-start: anchor(top);
    inset-inline-start: anchor(center);
    translate: -50% calc(-100% - var(--goa-space-s));
  }

  .use-anchor-based-positioning .tooltip-text.right {
    inset-block-start: anchor(center);
    inset-inline-start: anchor(right);
    translate: var(--goa-space-s) -50%;
  }

  .use-anchor-based-positioning .tooltip-text.left {
    inset-block-start: anchor(center);
    inset-inline-start: anchor(left);
    translate: calc(-100% - var(--goa-space-s)) -50%;
  }

  /* Alignments */
  .use-anchor-based-positioning .tooltip-text.bottom.align-right {
    inset-inline-start: anchor(left);
    translate: calc(var(--goa-space-m) * -1) var(--goa-space-s);
  }

  .use-anchor-based-positioning .tooltip-text.top.align-right {
    inset-inline-start: anchor(left);
    translate: calc(var(--goa-space-m) * -1) calc(-100% - var(--goa-space-s));
  }

  .use-anchor-based-positioning .tooltip-text.bottom.align-left {
    inset-inline-start: anchor(right);
    translate: calc(-100% + var(--goa-space-m)) var(--goa-space-s);
  }

  .use-anchor-based-positioning .tooltip-text.top.align-left {
    inset-inline-start: anchor(right);
    translate: calc(-100% + var(--goa-space-m)) calc(-100% - var(--goa-space-s));
  }

  /* Overflow fallbacks: flip to opposite alignment when tooltip goes off-screen */
  @position-try --align-right-flipped-bottom {
    inset-inline-start: anchor(right);
    translate: calc(-100% + var(--goa-space-m)) var(--goa-space-s);
  }
  @position-try --align-right-flipped-top {
    inset-inline-start: anchor(right);
    translate: calc(-100% + var(--goa-space-m)) calc(-100% - var(--goa-space-s));
  }
  @position-try --align-left-flipped-bottom {
    inset-inline-start: anchor(left);
    translate: calc(var(--goa-space-m) * -1) var(--goa-space-s);
  }
  @position-try --align-left-flipped-top {
    inset-inline-start: anchor(left);
    translate: calc(var(--goa-space-m) * -1) calc(-100% - var(--goa-space-s));
  }

  /* Callout */

  .tooltip-text.bottom::before,
  .tooltip-text.top::before,
  .tooltip-text.left::before,
  .tooltip-text.right::before {
    content: "";
    position: absolute;
    border-style: solid;
  }

  .tooltip-text.bottom::before {
    top: -9px;
    left: 50%;
    border-width: 0 10px 10px 10px;
    transform: translateX(-50%);
    border-color: transparent transparent var(--goa-tooltip-color-bg)
      transparent;
  }
  .tooltip-text.top::before {
    bottom: -9px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px 10px 0 10px;
    border-color: var(--goa-tooltip-color-bg) transparent transparent
      transparent;
  }
  .tooltip-text.left::before {
    top: 50%;
    right: -9px;
    transform: translateY(-50%);
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent
      var(--goa-tooltip-color-bg);
  }
  .tooltip-text.right::before {
    top: 50%;
    left: -9px;
    transform: translateY(-50%);
    border-width: 10px 10px 10px 0;
    border-style: solid;
    border-color: transparent var(--goa-tooltip-color-bg) transparent
      transparent;
  }

  .tooltip-text.bottom.align-left::before,
  .tooltip-text.top.align-left::before {
    left: calc(100% - (var(--target-width) + var(--goa-space-m)));
  }

  .tooltip-text.bottom.align-right::before,
  .tooltip-text.top.align-right::before {
    left: calc(var(--target-width) + var(--goa-space-m));
  }

  .use-anchor-based-positioning .tooltip-text.bottom.align-right::before,
  .use-anchor-based-positioning .tooltip-text.top.align-right::before {
    left: calc(var(--target-width) + var(--goa-space-m));
  }

  .use-anchor-based-positioning .tooltip-text.bottom.align-left::before,
  .use-anchor-based-positioning .tooltip-text.top.align-left::before {
    left: calc(100% - var(--target-width) - var(--goa-space-m));
  }
</style>
