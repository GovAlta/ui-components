<svelte:options customElement="goa-accordion" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import {
    typeValidator,
    toBoolean,
    validateRequired,
    generateRandomId,
    ensureSlotExists,
    dispatch,
    parseCssTimeToMilliseconds,
  } from "../../common/utils";
  import type { Spacing } from "../../common/styling";
  import { Once } from "@abgov/ui-components-common";

  // Validators

  const [HeadingSizes, validateHeadingSize] = typeValidator(
    "Accordion heading size",
    ["small", "medium"],
  );

  const [IconPositions, validateIconPosition] = typeValidator(
    "Accordion icon position",
    ["left", "right"],
  );

  // Types

  type HeadingSize = (typeof HeadingSizes)[number];
  type IconPosition = (typeof IconPositions)[number];

  // Props

  /** Sets the state of the accordion container open or closed. */
  export let open: string = "false";
  /** @required Sets the heading text. */
  export let heading: string = "";
  /** Sets secondary text. */
  export let secondarytext: string = "";
  /** Sets the heading size of the accordion container heading. */
  export let headingsize: HeadingSize = "small";
  /** Unique identifier for the accordion. */
  export let id: string = "";
  /** Sets the maximum width of the accordion. */
  export let maxwidth: string = "none";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = "xs";
  /** Left margin. */
  export let ml: Spacing = null;
  /** Sets the position of the expand/collapse icon. */
  export let iconposition: IconPosition = "left";

  // Private

  let _hovering: boolean = false;
  let _titleEl: HTMLElement;
  let _rootEl: HTMLElement;
  let _detailsEl: HTMLDetailsElement;
  let _summaryEl: HTMLElement;
  let _slotEl: HTMLElement;
  let _headingSlotChildren: Element[] = [];
  let _accordionId: string = "";

  // Store the animation object (so we can cancel it if needed)
  let _animation: Animation | null = null;
  // Store if the element is closing
  let _isClosing = false;
  // Store if the element is expanding
  let _isExpanding = false;
  // Show error messages only once
  let _once: Once = new Once();

  // Reactive

  $: isOpen = toBoolean(open);

  // Functions

  onMount(() => {
    validateRequired("GoAAccordion", { heading });
    validateHeadingSize(headingsize);
    validateIconPosition(iconposition);
    ensureSlotExists(_slotEl);

    _headingSlotChildren = getHeadingChildren();
    _accordionId = `accordion-${generateRandomId()}`;
  });

  function getHeadingChildren(): Element[] {
    if (_titleEl) {
      const slot = _titleEl.querySelector("slot") as HTMLSlotElement;
      if (slot) {
        return slot.assignedElements();
      } else {
        return [..._titleEl.children] as Element[]; // unit tests
      }
    }
    return [];
  }

  function dispatchChangeEvent(accordionIsOpen: boolean) {
    if (!_rootEl) return;

    dispatch(
      _rootEl,
      "_change",
      {
        open: accordionIsOpen,
      },
      { bubbles: true },
    );
  }

  function onAccordionToggle(target: Event) {
    // Stop default behaviour from the browser
    target.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    _detailsEl.style.overflow = "hidden";

    // Check if the element is being closed or is already closed
    if (_isClosing || !_detailsEl.open) {
      openAccordion();
      // Check if the element is being openned or is already open
    } else if (_isExpanding || _detailsEl.open) {
      shrink();
    }
  }

  function shrink() {
    // Set the element as "being closed"
    _isClosing = true;

    // Store the current height of the element
    const startHeight = `${_detailsEl.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${_summaryEl.offsetHeight}px`;

    // If there is already an animation running
    if (_animation) {
      // Cancel the current animation
      _animation.cancel();
    }

    // Start a WAAPI animation
    const duration = getAnimationDuration();
    const easing = getAnimationEasingExit();
    _animation = _detailsEl.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight],
      },
      {
        duration,
        easing,
      },
    );

    // When the animation is complete, call onAnimationFinish()
    _animation.onfinish = () => onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    _animation.oncancel = () => (_isClosing = false);
  }

  function openAccordion() {
    // Apply a fixed height on the element
    _detailsEl.style.height = `${_detailsEl.offsetHeight}px`;
    // Force the [open] attribute on the details element
    _detailsEl.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => expand());
  }

  function expand() {
    // Set the element as "being expanding"
    _isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${_detailsEl.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${_summaryEl.offsetHeight + _slotEl.offsetHeight}px`;

    // If there is already an animation running
    if (_animation) {
      // Cancel the current animation
      _animation.cancel();
    }

    // Start a WAAPI animation
    const duration = getAnimationDuration();
    const easing = getAnimationEasingReveal();
    _animation = _detailsEl.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight],
      },
      {
        duration,
        easing,
      },
    );
    // When the animation is complete, call onAnimationFinish()
    _animation.onfinish = () => onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    _animation.oncancel = () => (_isExpanding = false);

    open = "true";
  }

  function onAnimationFinish(isAccordionOpen: boolean) {
    // Set the open attribute based on the parameter
    _detailsEl.open = isAccordionOpen;
    // Clear the stored animation
    _animation = null;
    // Reset isClosing & isExpanding
    _isClosing = false;
    _isExpanding = false;
    // Remove the overflow hidden and the fixed height
    _detailsEl.style.height = _detailsEl.style.overflow = "";

    dispatchChangeEvent(isAccordionOpen);

    open = isAccordionOpen ? "true" : "false";
  }

  // Because the animation is done using JavaScript we can't use CSS variables
  // in the animation, this helps to work around that.
  function getCssVariableValue(variableName: string): string | null {
    const value = getComputedStyle(_rootEl)
      .getPropertyValue(variableName)
      .trim();

    if (!value || value === "") {
      // Show a warning only once
      _once.do(variableName, () =>
        console.warn(
          `CSS variable ${variableName} is not defined. Please make sure you're using the correct version of @abgov/design-tokens`,
        ),
      );
      return null;
    }
    return value;
  }

  function getAnimationDuration(): number {
    const durationValueStr =
      getCssVariableValue("--goa-motion-duration-short-3") ?? "100ms";

    return parseCssTimeToMilliseconds(durationValueStr, 100);
  }

  function getAnimationEasingReveal(): string {
    return (
      getCssVariableValue("--goa-motion-curve-expressive-reveal") ??
      "cubic-bezier(0.7, 0, 0.25, 1)"
    );
  }

  function getAnimationEasingExit(): string {
    return (
      getCssVariableValue("--goa-motion-curve-expressive-exit") ??
      "cubic-bezier(0.42, 0, 1, 1)"
    );
  }
</script>

<!-- HTML -->
<div
  style={`
    ${calculateMargin(mt, mr, mb, ml)};
    max-width: ${maxwidth};
    --icon-rotate: ${iconposition === "right" ? "180deg" : "90deg"}
  `}
  class="goa-accordion"
  bind:this={_rootEl}
  data-testid={testid}
  {id}
>
  <details
    bind:this={_detailsEl}
    open={isOpen}
    data-testid={`${testid}-details`}
  >
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <summary
      class={`container-${headingsize}`}
      on:mouseover={() => (_hovering = true)}
      on:mouseout={() => (_hovering = false)}
      on:focus={() => (_hovering = false)}
      on:blur={() => (_hovering = false)}
      aria-controls={`${_accordionId}-content`}
      aria-expanded={isOpen}
      class:iconRight={iconposition === "right"}
      bind:this={_summaryEl}
      on:click={onAccordionToggle}
      data-testid={`${testid}-summary`}
    >
      {#if iconposition === "left"}
        <goa-icon
          type="chevron-forward"
          fillcolor={_hovering
            ? "var(--goa-accordion-icon-color-hover, var(--goa-color-interactive-hover))"
            : "var(--goa-accordion-icon-color, var(--goa-color-interactive-default))"}
        ></goa-icon>
      {/if}

      <div class="title" bind:this={_titleEl} id={`${_accordionId}-heading`}>
        <span
          class="heading heading-{headingsize}"
          data-testid={`${testid}-heading`}>{heading}</span
        >
        {#if secondarytext}
          <span class="secondary-text">{secondarytext}</span>
        {/if}
        <div
          class="heading-content"
          class:heading-content-top={_headingSlotChildren.length}
          on:click|stopPropagation
        >
          <slot name="headingcontent" />
        </div>
      </div>

      {#if iconposition === "right"}
        <goa-icon
          type="chevron-down"
          fillcolor={_hovering
            ? "var(--goa-accordion-icon-color-hover, var(--goa-color-interactive-hover))"
            : "var(--goa-accordion-icon-color, var(--goa-color-interactive-default))"}
        ></goa-icon>
      {/if}
    </summary>
    <div
      bind:this={_slotEl}
      class="content"
      role="region"
      aria-labelledby={`${_accordionId}-heading`}
      id={`${_accordionId}-content`}
    >
      <slot />
    </div>
  </details>
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    font-size: var(--goa-font-size-4);
  }

  .goa-accordion {
    border-radius: var(--goa-accordion-border-radius);
    box-shadow: var(--goa-accordion-shadow);
  }

  .goa-accordion,
  .goa-accordion * {
    box-sizing: border-box;
  }

  .goa-accordion {
    container: self / inline-size;
  }

  summary {
    min-height: var(--goa-accordion-heading-min-height, 3.5rem);
    padding: var(--goa-accordion-padding-heading-icon-left);
    border: var(--goa-accordion-border);
    border-radius: var(--goa-accordion-border-radius);
    background-color: var(--goa-accordion-color-bg-heading);
    color: var(--goa-accordion-color-heading);
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: flex-start;

    /* safari hack (see below) */
    position: relative;
    transition: var(--goa-motion-duration-short-2) background-color
      var(--goa-motion-curve-expressive);
  }

  summary.iconRight {
    padding: var(--goa-accordion-padding-heading-icon-right);
  }

  summary:hover {
    background-color: var(--goa-accordion-color-bg-heading-hover);
    border: var(--goa-accordion-border-hover, var(--goa-accordion-border));
    color: var(--goa-accordion-color-heading-hover);
  }
  summary:focus-visible,
  summary:active {
    background-color: var(--goa-accordion-color-bg-heading);
    outline: none;
  }

  /* Hack to make outline radius work on Safari */
  summary:focus-visible::before {
    content: "";
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    border: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    border-radius: var(--goa-accordion-border-radius);
  }

  summary::marker, /* Latest Chrome, Edge, Firefox */
  summary::-webkit-details-marker /* Safari */ {
    display: none;
  }

  summary goa-icon {
    padding: 0.25rem 1rem;
  }

  .title {
    display: flex;
    flex: 1;
  }

  .heading {
    font: var(--goa-accordion-heading);
    padding: 0.125rem 1rem 0 0;
  }

  .heading-small {
    padding-top: 0.25rem;
    line-height: 1.75rem;
    font: var(--goa-accordion-heading);
  }

  .heading-medium {
    line-height: 2rem;
    font: var(--goa-accordion-heading-m);
  }

  .secondary-text {
    font: var(
      --goa-accordion-heading-secondary-text,
      var(--goa-typography-body-s)
    );
    color: var(
      --goa-accordion-heading-secondary-text-color,
      var(--goa-color-text-default)
    );
    line-height: 1.5rem;
    padding-right: 1rem;
  }

  .heading-medium + .secondary-text {
    font: var(
      --goa-accordion-heading-m-secondary-text,
      var(--goa-typography-body-s)
    );
  }

  .heading-content {
    flex: 1;
  }

  .container-medium {
    min-height: var(--goa-accordion-heading-m-min-height, 4rem);
  }

  .container-medium goa-icon {
    padding: 0.5rem 1rem;
  }

  .content {
    border-bottom: var(--goa-accordion-border);
    border-left: var(--goa-accordion-border);
    border-right: var(--goa-accordion-border);
    border-bottom-left-radius: var(--goa-accordion-border-radius);
    border-bottom-right-radius: var(--goa-accordion-border-radius);
    background-color: var(--goa-accordion-color-bg-content);
  }

  .content :global(::slotted(*:last-child)) {
    margin-bottom: 0 !important;
  }

  details[open] goa-icon {
    transform: rotate(var(--icon-rotate));
  }

  details[open] summary {
    border-bottom-left-radius: var(--goa-border-radius-none);
    border-bottom-right-radius: var(--goa-border-radius-none);
    border-bottom: var(--goa-accordion-divider);
  }

  details[open] summary:hover {
    border-bottom: var(
      --goa-accordion-divider-hover,
      var(--goa-accordion-divider)
    );
  }

  details[open] summary:focus-visible::before {
    border-radius: var(
      --goa-accordion-border-radius-focus,
      var(--goa-accordion-border-radius)
    );
  }

  .container-medium {
    padding: var(
      --goa-accordion-padding-heading-m-icon-left,
      var(--goa-accordion-padding-heading-icon-left)
    );
  }

  .container-medium.iconRight {
    padding: var(
      --goa-accordion-padding-heading-m-icon-right,
      var(--goa-accordion-padding-heading-icon-right)
    );
  }

  @container self (--mobile) {
    .content {
      padding: var(--goa-accordion-padding-content-narrow);
    }
    .title {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @container self (--not-mobile) {
    .content {
      padding: var(--goa-accordion-padding-content-wide);
    }
    .title {
      align-items: baseline;
    }
  }
</style>
