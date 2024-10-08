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
      mt="1"
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
    font-family: var(--goa-font-family-sans);
  }

  details {
    position: relative;
  }
  details :global(::slotted(*)) {
    font: var(--goa-typography-body-m);
  }
  details[open] goa-icon {
    transform: translateX(-1px) rotate(90deg);
    top: 0.75rem;
  }
  /* Hide native icon on iOS */
  details summary::-webkit-details-marker {
    display: none;
  }

  summary {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: flex-start;
    border-radius: var(--goa-border-radius-m);
  }
  summary:focus-visible {
    outline: 3px solid var(--goa-color-interactive-focus);
  }
  summary:focus,
  summary:active {
    border-radius: var(--goa-border-radius-m);
    color: var(--goa-color-interactive-hover);
    background-color: var(--goa-color-greyscale-100);
  }
  summary:hover {
    background-color: var(--goa-color-greyscale-100);
  }

  summary span {
    margin-left: 2rem;
    text-decoration: underline;
    color: var(--goa-color-interactive-default);
    padding-bottom: var(--font-valign-fix);
    line-height: var(--goa-line-height-3);
  }
  summary:hover span {
    color: var(--goa-color-interactive-hover);
  }

  .content {
    border-left: 4px solid var(--goa-color-greyscale-200);
    padding: 1rem;
    margin-left: 1.1rem;
    margin-bottom: var(--goa-space-s);
  }
  .content :global(::slotted(p:last-child)) {
    margin-bottom: 0 !important;
  }

  goa-icon {
    /* transition: transform 80ms ease; */
    position: absolute;
  }
</style>
