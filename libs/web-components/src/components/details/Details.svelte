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
    font-family: var(--goa-font-family-serif);
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

  /* Summary == detail heading */
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
    color: var(--goa-details-color-text-hover);
    background-color: var(--goa-details-color-bg-hover);
  }
  summary:hover {
    background-color: var(--goa-details-color-bg-hover);
  }

  summary span {
    margin-left: var(--goa-space-xl);
    text-decoration: var(--goa-details-text-decoration);
    color: var(--goa-details-color-text);
    font: var(--goa-details-typeface);
  }
  summary:hover span {
    color: var(--goa-details-color-text-hover);
  }

  /* Content == expanded content */
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
