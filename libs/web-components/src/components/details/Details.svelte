<svelte:options customElement="goa-details" />

<script lang="ts">
  import { onMount } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import {
    toBoolean,
    validateRequired,
    generateRandomId,
  } from "../../common/utils";
  import type { Spacing } from "../../common/styling";

  export let heading: string;
  export let maxwidth: string = "75ch";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
  export let open: string = "false";
  export let testid: string = "";

  let _isMouseOver: boolean = false;
  let _summaryEl: HTMLElement;
  let _detailsId: string = "";

  $: _isOpen = toBoolean(open);

  onMount(() => {
    validateRequired("Details", { heading });
    _detailsId = `details-${generateRandomId()}`;

    _summaryEl.addEventListener("mouseover", () => {
      _isMouseOver = true;
    });

    _summaryEl.addEventListener("mouseout", () => {
      _isMouseOver = false;
    });
  });
</script>

<details
  open={_isOpen}
  on:toggle={({ target }) => (open = `${target?.open}`)}
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    max-width: ${maxwidth};
  `}
  data-testid={testid}
>
  <summary
    bind:this={_summaryEl}
    aria-expanded={open === "true"}
    aria-controls={`${_detailsId}-content`}
  >
    <goa-icon
      mt="2"
      mr="2"
      type="chevron-forward"
      fillcolor={_isMouseOver
        ? "var(--goa-color-interactive-hover)"
        : "var(--goa-color-interactive-default)"}
    />
    <span id={`${_detailsId}-heading`}>{heading}</span>
  </summary>
  <div
    class="content"
    role="region"
    aria-labelledby={`${_detailsId}-heading`}
    id={`${_detailsId}-content`}
  >
    <slot />
  </div>
</details>

<style>
  :host {
  /* TODO: Component tokens, to move to design tokens file ------------------------------------------------------- */
    --goa-details-max-width: 0px;
    --goa-details-border-radius: var(--goa-border-radius-m);  /* 4px */
    --goa-details-margin-bottom: var(--goa-space-xs);

    --goa-details-typography: var(--goa-typography-body-m);
    --goa-details-text-decoration: underline;
    --goa-details-text-color: var(--goa-color-interactive-default);
    --goa-details-text-color-hover: var(--goa-color-interactive-hover);
    --goa-details-padding-top: 6px;
    --goa-details-padding-right: var(--goa-space-s);
    --goa-details-padding-bottom: var(--goa-space-xs);
    --goa-details-padding-left: var(--goa-space-xs);
    --goa-details-hover-color-bg: var(--goa-color-greyscale-100);

    --goa-details-content-left-border: 4px solid var(--goa-color-greyscale-200);
    --goa-details-content-padding-top: var(--goa-space-s);
    --goa-details-content-padding-right: var(--goa-space-m);
    --goa-details-content-padding-bottom: var(--goa-space-s);
    --goa-details-content-padding-left: 19px;
    --goa-details-content-margin-left: 17px;

    --goa-details-focus-border: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);

  /*  ------------------------------------------------------- */


    font-family: var(--goa-font-family-serif); /* do we need this? If we wanted to make a typeface change globally, this would need to be overriden */
  }

  details {
    position: relative;
  }
  details :global(::slotted(*)) {
    font: var(--goa-typography-body-m);
  }
  details[open] goa-icon {
    transform: translateX(-1px) translateY(-0px) rotate(90deg);
    margin-top: var(--goa-space-2xs);
  }
  /* Hide native icon on iOS */
  details summary::-webkit-details-marker {
    display: none;
  }

  /* Summary is the detail heading */

  summary {
    padding-top: var(--goa-details-padding-top);
    padding-right: var(--goa-details-padding-right);
    padding-left: var(--goa-details-padding-left);
    padding-bottom: var(--goa-details-padding-bottom);
    margin-bottom: var(--goa-details-margin-bottom);
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: flex-start;
    border-radius: var(--goa-details-border-radius); /* 4px */
  }
  summary:focus-visible {
    outline: var(--goa-details-focus-border);
    color: var(--goa-color-interactive-hover);

  }
  summary:focus,
  summary:active {
    border-radius: var(--goa-details-border-radius);
    color: var(--goa-color-interactive-hover);
    background-color: var(--goa-details-hover-color-bg);
  }
  summary:hover {
    background-color: var(--goa-details-hover-color-bg);
  }

  summary span {
    margin-left: var(--goa-space-xl);
    text-decoration: var(--goa-details-text-decoration);
    color: var(--goa-details-text-color);
    font: var(--goa-details-typeface);
  }
  summary:hover span {
    color: var(--goa-details-text-color-hover);
  }

  /* Content is the expanded content */

  .content {
    border-left: var(--goa-details-content-left-border);
    padding-left: var(--goa-details-content-padding-left);
    padding-top: var(--goa-details-content-padding-top);
    padding-bottom: var(--goa-details-content-padding-bottom);
    padding-right: var(--goa-details-content-padding-right);
    margin-left: var(--goa-details-content-margin-left);
    margin-bottom: var(--goa-details-margin-bottom);
  }
  .content :global(::slotted(p:last-child)) {
    margin-bottom: 0 !important;
  }

  goa-icon {
    /* transition: transform 80ms ease; */
    position: absolute;
  }
</style>
