<svelte:options customElement="goa-filter-chip" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import type { GoAIconType } from "../icon/Icon.svelte";

  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  // Props
  /** Shows an error state. */
  export let error: string = "false";
  /** @required Content displayed in the chip. Use the content slot for custom HTML. */
  export let content: string = "";
  /** Secondary text displayed in a smaller size before the main content. */
  export let secondarytext: string = "";
  /** Icon displayed at the start of the chip. */
  export let leadingicon: GoAIconType | null = null;
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Accessible content used to label the filter chip controls. */
  export let ariaLabel: string = "";

  // Private variables
  let el: HTMLElement;

  // booleans
  let _error: boolean;
  let _slottedContent: string = "";

  // Reactive declarations
  $: _error = toBoolean(error);
  $: accessibleContent = ariaLabel || content || _slottedContent;
  $: removeFilterAriaLabel = accessibleContent
    ? `Remove filter: ${accessibleContent}`
    : "Remove filter";

  // Event handlers
  function onDelete(e: Event) {
    el.dispatchEvent(
      new CustomEvent("_click", { composed: true, bubbles: true }),
    );
    e.stopPropagation();
  }

  function handleContentSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    _slottedContent = slot
      .assignedNodes({ flatten: true })
      .map((node) => node.textContent || "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }
</script>

<!-- HTML -->
<div
  bind:this={el}
  data-testid={testid}
  class="chip"
  class:error={_error}
  role="presentation"
  style={calculateMargin(mt, mr, mb, ml)}
>
  <div class="label-container">
    {#if leadingicon}
      <goa-icon
        class="leading-icon"
        size="small"
        type={leadingicon}
        fillcolor={_error
          ? "var(--goa-filter-chip-icon-color-error)"
          : "var(--goa-filter-chip-icon-color)"}
      />
    {/if}
    {#if secondarytext}
      <div class="secondary-text">
        {secondarytext}
      </div>
    {/if}
    <div class="text" on:slotchange={handleContentSlotChange}>
      {#if $$slots.content}
        <slot name="content" />
      {:else}
        {content}
      {/if}
    </div>
  </div>
  <goa-icon-button
    size="3"
    icon="close"
    on:_click={onDelete}
    arialabel={removeFilterAriaLabel}
    variant={_error ? "destructive" : "dark"}
    testid="delete-button"
  >
  </goa-icon-button>
</div>

<!-- Style -->
<style>
  .chip {
    display: inline-flex;
    align-items: center;
    background-color: var(--goa-filter-chip-bg-color);
    border-radius: var(--goa-filter-chip-border-radius);
    border: var(--goa-filter-chip-border);
    box-sizing: border-box;
    color: var(--goa-filter-chip-text-color);
    font: var(--goa-filter-chip-typography);
    gap: var(--goa-filter-chip-gap);
    min-height: var(--goa-filter-chip-min-height);
    padding-top: var(--goa-filter-chip-padding-vertical);
    padding-right: var(--goa-filter-chip-padding-horizontal-right);
    padding-bottom: var(--goa-filter-chip-padding-vertical);
    padding-left: var(--goa-filter-chip-padding-horizontal-left);
    min-width: var(--goa-filter-chip-min-width);
  }

  .chip.error {
    background-color: var(--goa-filter-chip-bg-color-error);
    border-color: var(--goa-filter-chip-border-color-error);
    color: var(--goa-filter-chip-text-color-error);
  }

  .label-container {
    display: flex;
    align-items: center;
    gap: var(--goa-filter-chip-label-gap);
  }

  .text {
    line-height: var(--goa-filter-chip-line-height); /* 24px */
    padding-top: 0;
    display: flex;
    align-items: center;
    padding-bottom: var(
      --font-valign-fix,
      0
    ); /* acumin font requires this to allow for vertical alignment  */
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .leading-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  .secondary-text {
    line-height: var(--goa-filter-chip-line-height);
    color: var(--goa-filter-chip-secondary-text-color);
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .error .secondary-text {
    color: var(--goa-filter-chip-secondary-text-color-error);
  }

  .text,
  .secondary-text {
    padding-bottom: 0;
  }

  .chip {
    --padding: 0.125rem;
    --goa-icon-button-destructive-hover-color-bg: var(
      --goa-filter-chip-close-button-error-hover-bg-color
    );
  }
</style>
