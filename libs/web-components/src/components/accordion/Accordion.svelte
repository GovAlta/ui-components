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
  } from "../../common/utils";
  import type { Spacing } from "../../common/styling";

  // Validators

  const [HeadingSizes, validateHeadingSize] = typeValidator(
    "Accordion heading size",
    ["small", "medium"],
  );

  // Types

  type HeadingSize = (typeof HeadingSizes)[number];

  // Props

  export let open: string = "false";
  export let heading: string = "";
  export let secondarytext: string = "";
  export let headingsize: HeadingSize = "small";
  export let id: string = "";
  export let maxwidth: string = "none";
  export let testid: string = "";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "xs";
  export let ml: Spacing = null;
  export let iconposition: "left" | "right" = "left";

  // Private

  let _hovering: boolean = false;
  let _titleEl: HTMLElement;
  let _rootEl: HTMLElement;
  let _slotEl: HTMLElement;
  let _headingSlotChildren: Element[] = [];
  let _accordionId: string = "";

  // Reactive

  $: isOpen = toBoolean(open);

  // Functions

  onMount(() => {
    validateRequired("GoAAccordion", { heading });
    validateHeadingSize(headingsize);
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
        // @ts-expect-error
        return [..._titleEl.children] as Element[]; // unit tests
      }
    }
    return [];
  }

  function dispatchClickEvent(open?: boolean, event?: Event) {
    if (!_rootEl) return;

    _rootEl.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: true,
        detail: { open: open, event },
      }),
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
>
<details open={isOpen} on:toggle={(e) => { open = `${e.target?.open}`; dispatchClickEvent(e.target?.open, e); }}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <summary
      class={`container-${headingsize}`}
      on:mouseover={() => (_hovering = true)}
      on:mouseout={() => (_hovering = false)}
      on:focus={() => (_hovering = false)}
      on:blur={() => (_hovering = false)}
      aria-controls={`${_accordionId}-content`}
      aria-expanded={open === "true"}
      class:iconRight={iconposition === "right"}
    >

      {#if iconposition === "left"}
        <goa-icon
          type="chevron-forward"
          fillcolor={_hovering
      ? "var(--goa-color-interactive-hover)"
      : "var(--goa-color-interactive-default)"}
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
        >
          <slot name="headingcontent" />
        </div>
      </div>

      {#if iconposition === "right"}
        <goa-icon
          type="chevron-down"
          fillcolor={_hovering
      ? "var(--goa-color-interactive-hover)"
      : "var(--goa-color-interactive-default)"}
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
    min-height: 3.5rem;
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
  }

  summary.iconRight {
    padding: var(--goa-accordion-padding-heading-icon-right);
  }

  summary:hover {
    background-color: var(--goa-accordion-color-bg-heading-hover);
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
    padding: 0.125rem 1rem;
  }

  .title {
    display: flex;
    flex: 1;
  }

  .title span {
    padding-bottom: var(--goa-space-2xs, 0);
  }

  .heading {
    font: var(--goa-accordion-heading-s);
    padding-right: 1rem;
  }

  .secondary-text {
    font: var(--goa-typography-body-s);
    line-height: 1.5rem;
    padding-right: 1rem;
  }

  .heading-content {
    flex: 1;
  }

  goa-icon {
    padding: 0.125rem 1rem;
  }

  .container-medium {
    min-height: 4rem;
  }

  .container-medium goa-icon {
    padding: 0.375rem 1rem;
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

  /* Sizes */
  .heading-medium {
    line-height: 2rem;
    font: var(--goa-accordion-heading-m);
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
      align-items: center;
    }
  }
</style>
