<svelte:options customElement="goa-tooltip" />

<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { typeValidator } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";

  // Public

  export let content = "";
  export let testid: string = "";
  export let position: Position = "top";
  export let halign: Alignment = "center";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
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
  let _initialPosition: Position;
  let _tooltipVisible = false;
  let _showTooltipTimeout: string | number | NodeJS.Timeout | undefined;
  let _hideTooltipTimeout: string | number | NodeJS.Timeout | undefined;

  // Use a unique id for each tooltip instance.
  // So screen readers can identify the tooltip instance when
  // there are multiple tooltips on the same page
  let _tooltipInstanceId: string;

  // Reactive

  $: {
    if (_rootEl && _tooltipEl) {
      _rootEl.style.setProperty(
        "--target-width",
        `${_rootEl.getBoundingClientRect().width / 2}px`,
      );
    }
  }

  // call checkAndAdjustPosition function when content changes
  $: {
    content && checkAndAdjustPosition();
  }

  // Hooks

  onMount(() => {
    setTimeout(() => {
      validatePosition(position);
      validateAlignment(halign);
      validator(position, halign);
    }, 1);

    _initialPosition = position;
    _tooltipInstanceId = Math.random().toString(36);

    window.addEventListener("resize", checkAndAdjustPosition);
    checkAndAdjustPosition();
  });

  onDestroy(() => {
    window.removeEventListener("resize", checkAndAdjustPosition);
    clearTimeout(_showTooltipTimeout);
    clearTimeout(_hideTooltipTimeout);
  });

  // Functions

  const showTooltip = () => {
    _showTooltipTimeout = setTimeout(() => {
      _tooltipVisible = true;
      checkAndAdjustPosition();
    }, 300);
  };

  const hideTooltip = () => {
    clearTimeout(_showTooltipTimeout);

    _hideTooltipTimeout = setTimeout(() => {
      _tooltipVisible = false;
      position = _initialPosition;
    }, 500);
  };

  async function checkAndAdjustPosition() {
    // angular needs time to render the _tooltipEl
    await tick();

    if (!_tooltipEl || !_rootEl) {
      return;
    }

    // determine the bounding rectangle of the tooltip and root element
    const tooltipRect = _tooltipEl.getBoundingClientRect();
    const rootRect = _rootEl.getBoundingClientRect();

    const spaceTop = rootRect.top;
    const spaceBottom = window.innerHeight - rootRect.bottom;
    const spaceLeft = rootRect.left;
    const spaceRight = window.innerWidth - rootRect.right;

    const newWidth = Math.min(
      _screenSize * 0.8,
      400,
      tooltipRect.width,
      Math.max(spaceLeft, spaceRight) - 10,
    );
    const shouldWrapContent =
      newWidth > rootRect.width ||
      newWidth > spaceLeft ||
      newWidth > spaceRight;
    _tooltipEl.style.width = `${newWidth - 32}px`;

    if (shouldWrapContent) {
      _tooltipEl.style.whiteSpace = "normal";
    } else {
      _tooltipEl.style.whiteSpace = "nowrap";
    }

    let newPosition = position; // use a local variable to determine the new position
    let newAlign = halign; // use a local variable to determine the new position

    // check if there is enough space for the tooltip in the initial position
    if (position === "bottom" && tooltipRect.height > spaceBottom) {
      newPosition = "top";
    } else if (position === "top" && tooltipRect.height > spaceTop) {
      newPosition = "bottom";
    }

    // similar check for left and right position
    if (position === "right" && tooltipRect.width > spaceRight) {
      newPosition = "left";
    } else if (position === "left" && tooltipRect.width > spaceLeft) {
      newPosition = "right";
    }

    // similar check for left and right alignmewnt
    if (halign === "right" && tooltipRect.width > spaceRight) {
      newAlign = "left";
    } else if (halign === "left" && tooltipRect.width > spaceLeft) {
      newAlign = "right";
    } else if (
      halign === "center" &&
      (position === "top" || position === "bottom") &&
      (tooltipRect.width / 2 > spaceLeft || tooltipRect.width / 2 > spaceRight)
    ) {
      newAlign = spaceLeft > spaceRight ? "left" : "right";
    }

    // update tooltip position
    position = newPosition;
    halign = newAlign;
  }
</script>

<svelte:window bind:innerWidth={_screenSize} />

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class="tooltip align-{halign}"
  bind:this={_rootEl}
  on:mouseenter={() => {
    clearTimeout(_hideTooltipTimeout);
    showTooltip();
  }}
  on:mouseleave={hideTooltip}
  on:focus={() => {
    clearTimeout(_hideTooltipTimeout);
    showTooltip();
  }}
  on:blur={hideTooltip}
  data-testid={testid}
  role="tooltip"
  aria-describedby="{_tooltipInstanceId}-tooltip"
  tabindex="0"
  style={calculateMargin(mt, mr, mb, ml)}
>
  <div class="tooltip-target">
    <slot />
  </div>
  <span
    id="{_tooltipInstanceId}-tooltip"
    class="tooltip-text {position} align-{halign}"
    bind:this={_tooltipEl}
    style="visibility: {_tooltipVisible ? 'visible' : 'hidden'}">{content}</span
  >
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
    visibility: hidden;
    font: var(--goa-tooltip-text-size);
    background-color: var(--goa-tooltip-color-bg);
    color: var(--goa-tooltip-color-text);
    text-align: center;
    border-radius: var(--goa-tooltip-border-radius);
    position: absolute;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s;
    padding: var(--goa-tooltip-padding);
    text-align: left;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
  }

  .tooltip-target {
    margin: var(--goa-tooltip-gap);
    height: auto;
    display: flex;
  }

  .tooltip-text.bottom {
    top: calc(100% + 10px);
  }

  .tooltip-text.top {
    bottom: calc(100% + 10px);
  }

  .tooltip-text.right {
    left: calc(100% + 10px);
  }

  .tooltip-text.left {
    right: calc(100% + 10px);
  }

  .tooltip:hover .tooltip-text,
  .tooltip:focus .tooltip-text {
    opacity: 1;
  }

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
    left: calc(100% - (var(--target-width) + 1rem));
  }

  .tooltip-text.bottom.align-right::before,
  .tooltip-text.top.align-right::before {
    left: calc(var(--target-width) + 1rem);
  }

  .tooltip.align-right {
    justify-content: flex-start;
  }
  .tooltip.align-left {
    justify-content: flex-end;
  }

  .tooltip-text.align-right {
    left: 0;
    margin-left: -1rem;
  }
  .tooltip-text.align-left {
    right: 0;
    margin-right: -1rem;
  }
</style>
