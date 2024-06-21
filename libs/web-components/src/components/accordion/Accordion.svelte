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
  } from "../../common/utils";
  import type { Spacing } from "../../common/styling";

  // Validator
  const [HeadingSizes, validateHeadingSize] = typeValidator(
    "Accordion heading size",
    ["small", "medium"],
  );

  // Types
  type HeadingSize = (typeof HeadingSizes)[number];

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

  // Private

  let _hovering: boolean = false;
  let _titleEl: HTMLElement;
  let _headingContentSlotChildren: Element[] = [];
  let _accordionId: string = "";
  // Reactive

  $: isOpen = toBoolean(open);

  // Functions

  onMount(() => {
    validateRequired("GoAAccordion", { heading });
    validateHeadingSize(headingsize);
    _headingContentSlotChildren = getChildren();
    _accordionId = `accordion-${generateRandomId()}`;
  });

  function getChildren(): Element[] {
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
</script>

<!-- HTML -->
<div
  style={`
    ${calculateMargin(mt, mr, mb, ml)};
    max-width: ${maxwidth};
  `}
  class="goa-accordion"
  data-testid={testid}
>
  <details open={isOpen} on:toggle={({ target }) => (open = `${target?.open}`)}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <summary
      class={`container-${headingsize}`}
      on:mouseover={() => (_hovering = true)}
      on:mouseout={() => (_hovering = false)}
      on:focus={() => (_hovering = false)}
      on:blur={() => (_hovering = false)}
      aria-controls={`${_accordionId}-content`}
      aria-expanded={open === "true"}
    >
      <goa-icon
        type="chevron-forward"
        fillcolor={_hovering
          ? "var(--goa-color-interactive-hover)"
          : "var(--goa-color-interactive-default)"}
      ></goa-icon>
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
          class:heading-content-top={_headingContentSlotChildren.length}
        >
          <slot name="headingcontent" />
        </div>
      </div>
    </summary>
    <div
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

  .goa-accordion,
  .goa-accordion * {
    box-sizing: border-box;
  }

  .goa-accordion {
    container: self / inline-size;
  }

  summary {
    min-height: 3.5rem;
    padding: var(--goa-space-s) var(--goa-space-m) var(--goa-space-s) 0;
    border-width: var(--goa-border-width-s);
    border-style: solid;
    border-radius: var(--goa-border-radius-m);
    background-color: var(--goa-color-greyscale-100);
    border-color: var(--goa-color-greyscale-200);
    color: var(--goa-color-text-default);
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: flex-start;

    /* safari hack (see below) */
    position: relative;
  }

  summary:hover {
    background-color: var(--goa-color-greyscale-200);
  }
  summary:focus-visible,
  summary:active {
    background-color: var(--goa-color-greyscale-100);
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
    border-radius: 4px;
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
    font: var(--goa-typography-heading-s);
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
    border-bottom: var(--goa-border-width-s) solid
      var(--goa-color-greyscale-200);
    border-left: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    border-right: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    border-bottom-left-radius: var(--goa-border-radius-m);
    border-bottom-right-radius: var(--goa-border-radius-m);
  }

  .content :global(::slotted(*:last-child)) {
    margin-bottom: 0 !important;
  }

  details[open] goa-icon {
    transform: rotate(90deg);
  }

  details[open] summary {
    border-bottom-left-radius: var(--goa-border-radius-none);
    border-bottom-right-radius: var(--goa-border-radius-none);
  }

  /* Sizes */
  .heading-medium {
    line-height: 2rem;
    font: var(--goa-typography-heading-m);
  }

  @container self (--mobile) {
    .content {
      padding: 1.5rem;
    }
    .title {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @container self (--not-mobile) {
    .content {
      padding: 1.5rem 2rem 1.5rem 3.5rem;
    }
    .title {
      align-items: center;
    }
  }
</style>
