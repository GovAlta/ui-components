<svelte:options tag="goa-tooltip" />

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { typeValidator } from "../../common/utils";
  import { Spacing, calculateMargin } from "../../common/styling";

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
        console.error(`[${align}] is an invalid option for position ${position}`);
      }
    }
  };

  //Types
  type Position = typeof Positions[number];
  type Alignment = typeof Alignment[number];

  export let content = "";
  export let testid: string = "";
  export let position: Position = "top";
  export let halign: Alignment = "center"; // default to center

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  let _screenSize = 0;
  let _rootEl: HTMLElement;
  let _tooltipEl: HTMLElement;
  let _initialPosition: Position;
  let _tooltipVisible = false;
  let _showTooltipTimeout = null;
  let _hideTooltipTimeout = null;
  /**
   * Use a unique id for each tooltip instance.
   * So screen readers can identify the tooltip instance when
   * there are multiple tooltips on the same page
   */
  let _tooltipInstanceId: string;

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
    content;
    checkAndAdjustPosition();
  }

  const showTooltip = () => {
    _showTooltipTimeout = setTimeout(() => {
      _tooltipVisible = true;
      checkAndAdjustPosition();
    }, 300); // delay of 0.3s
  };

  const hideTooltip = () => {
    clearTimeout(_showTooltipTimeout); // cancel any pending show action
    _hideTooltipTimeout = setTimeout(() => {
      _tooltipVisible = false;
      position = _initialPosition; // reset position back to initial
    }, 500); // delay of 0.5s
  };

  function checkAndAdjustPosition() {
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
      newWidth > rootRect.width || newWidth > spaceLeft || newWidth > spaceRight;
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
    _tooltipEl.className = `tooltiptext ${newPosition} align-${newAlign}`;
  }
</script>

<svelte:window bind:innerWidth={_screenSize} />
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
  <div class="tooltiptarget">
    <slot />
  </div>
  <span
    id="{_tooltipInstanceId}-tooltip"
    class="tooltiptext {position} align-{halign}"
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
    cursor: pointer;
  }

  .tooltiptext {
    visibility: hidden;
    font: var(--goa-typography-body-s);
    background-color: var(--goa-color-greyscale-700);
    color: var(--goa-color-text-light);
    text-align: center;
    border-radius: var(--goa-border-radius-m);
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
    padding: var(--goa-space-xs) var(--goa-space-m);
    text-align: left;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
  }

  .tooltiptarget {
    margin: 4px;
  }

  .tooltiptext.bottom {
    top: calc(100% + 10px);
  }

  .tooltiptext.top {
    bottom: calc(100% + 10px);
  }

  .tooltiptext.right {
    left: calc(100% + 10px);
  }

  .tooltiptext.left {
    right: calc(100% + 10px);
  }

  .tooltip:hover .tooltiptext,
  .tooltip:focus .tooltiptext {
    opacity: 1;
  }

  .tooltiptext.bottom::before,
  .tooltiptext.top::before,
  .tooltiptext.left::before,
  .tooltiptext.right::before {
    content: "";
    position: absolute;
    border-style: solid;
    aria-hidden: true;
  }

  .tooltiptext.bottom::before {
    top: -10px;
    left: 50%;
    border-width: 0 10px 10px 10px;
    transform: translateX(-50%);
    border-color: transparent transparent var(--goa-color-greyscale-700) transparent;
  }
  .tooltiptext.top::before {
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px 10px 0 10px;
    border-color: var(--goa-color-greyscale-700) transparent transparent transparent;
  }
  .tooltiptext.left::before {
    top: 50%;
    right: -10px;
    transform: translateY(-50%);
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent var(--goa-color-greyscale-700);
  }
  .tooltiptext.right::before {
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
    border-width: 10px 10px 10px 0;
    border-style: solid;
    border-color: transparent var(--goa-color-greyscale-700) transparent transparent;
  }

  .tooltiptext.bottom.align-left::before,
  .tooltiptext.top.align-left::before {
    left: calc(100% - (var(--target-width) + 1rem));
  }

  .tooltiptext.bottom.align-right::before,
  .tooltiptext.top.align-right::before {
    left: calc(var(--target-width) + 1rem);
  }

  .tooltip.align-right {
    justify-content: flex-start;
  }
  .tooltip.align-left {
    justify-content: flex-end;
  }

  .tooltiptext.align-right {
    left: 0;
    margin-left: -1rem;
  }
  .tooltiptext.align-left {
    right: 0;
    margin-right: -1rem;
  }
</style>
