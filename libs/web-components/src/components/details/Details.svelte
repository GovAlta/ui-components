<svelte:options customElement="goa-details" />

<script lang="ts">
  import { onMount } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import { toBoolean, validateRequired} from "../../common/utils";
  import type { Spacing } from "../../common/styling";

  export let heading: string;
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
  export let open: string = "false";

  let _isMouseOver: boolean = false
  let _summaryEl: HTMLElement;
  let _detailsEl: HTMLElement;

  $: _isOpen = toBoolean(open);


  onMount(() => {
    validateRequired("Details", { heading });

    _summaryEl.addEventListener("mouseover", () => {
      _isMouseOver = true;
    });

    _summaryEl.addEventListener("mouseout", () => {
      _isMouseOver = false;
    });
  });
</script>

<style>
  :host {
    font-family: var(--goa-font-family-sans);
  }

  details {
    max-width: 75ch;
    position: relative;
  }

  details :global(::slotted(*)) {
    font: var(--goa-typography-body-m);
  }

  summary {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: flex-start;
  }

  goa-icon {
    /* transition: transform 80ms ease; */
    position: absolute;
  }

  details[open] goa-icon {
    transform: translateX(-1px) rotate(90deg);
    top: 0.75rem;
  }

  /* Hide native icon on iOS */
  details summary::-webkit-details-marker {
    display:none;
  }

  summary {
    border-radius: var(--goa-border-radius-m);
  }
  summary:focus,
  summary:active {
    outline: 3px solid var(--goa-color-interactive-focus);
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
</style>

<details
  bind:this={_detailsEl}
  open={_isOpen}
  on:toggle={({target}) => open = `${target.open}`}
  style={calculateMargin(mt, mr, mb, ml)}>
  <summary bind:this={_summaryEl}>
    <goa-icon
      mt="1"
      mr="2"
      type="chevron-forward"
      fillcolor={_isMouseOver ? "var(--goa-color-interactive-hover)" : "var(--goa-color-interactive-default)"}
    />
    <span>{heading}</span>
  </summary>
  <div class="content">
    <slot />
  </div>
</details>

