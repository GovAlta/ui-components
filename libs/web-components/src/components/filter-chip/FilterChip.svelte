<svelte:options customElement="goa-filter-chip" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";

  type ChipVariant = "filter";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Props
  export let error: string = "false";
  export let content: string;
  export let variant: ChipVariant;
  export let testid: string = "";
  export let ariaLabel: string = "";

  // Private variables
  let el: HTMLElement;
  let _hovering: boolean = false;
  let _focused: boolean = false;

  // booleans
  let _error: boolean;

  // Reactive declarations
  $: _error = toBoolean(error);
  $: chipAriaLabel = ariaLabel || `${content}, removable`;

  // Event handlers
  function onDelete(e: Event) {
    el.dispatchEvent(
      new CustomEvent("_click", { composed: true, bubbles: true }),
    );
    e.stopPropagation();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      onDelete(e);
      e.preventDefault();
    }
  }
</script>

<!-- HTML -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  bind:this={el}
  data-testid={testid}
  class="chip"
  class:error={_error}
  class:variant
  class:focused={_focused}
  style={calculateMargin(mt, mr, mb, ml)}
  tabindex="0"
  role="button"
  aria-label={chipAriaLabel}
  on:click={onDelete}
  on:keydown={handleKeyDown}
  on:mouseover={() => (_hovering = true)}
  on:mouseout={() => (_hovering = false)}
  on:focus={() => (_focused = true)}
  on:blur={() => (_focused = false)}
>
  <div class="text">
    {content}
  </div>
  <goa-icon
    class="delete-icon"
    size="small"
    theme={_error ? "filled" : _hovering || _focused ? "filled" : "outline"}
    type="close-circle"
    fillcolor={_error
      ? "var(--goa-color-emergency-default)"
      : "var(--goa-color-greyscale-700)"}
    aria-hidden="true"
    opacity={_error ? (_hovering || _focused ? 1 : 0.5) : 1}
  />
</div>

<!-- Style -->
<style>
  .chip {
    /* vertical-align: middle; */
    display: inline-flex;
    /* flex-direction: row; */
    align-items: center;
    background-color: var(--goa-color-greyscale-white);
    border-radius: 1rem;
    border-radius: var(--Border-Radius-Round, 99px);
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-700);
    box-sizing: border-box;
    color: var(--goa-color-text-default);

    /* font-size: var(--goa-font-size-3); */
    /* font-weight: var(--goa-font-weight-regular); */
    font: var(--goa-typography-body-s);
    gap: 0.5rem;
    min-height: 2rem;

    /* padding: 3px 12px; */
    padding: 3px 8px 3px 12px;

    min-width: 56px;
    /* max-width: 100%; */

    cursor: pointer;
    touch-action: manipulation; /* Verify with Chris if we want to keep it */

    /* white-space: normal; */
    /* word-wrap: break-word; */
  }

  .chip.focused {
    /* Figma says 3px */
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  .chip.error {
    background-color: var(--goa-color-emergency-light);
    border-color: var(--goa-color-emergency-default);
    color: var(--goa-color-emergency-default);
  }

  .delete-icon {
    flex-shrink: 0;
    /* align-self: center; */
  }

  .text {
    line-height: var(--goa-line-height-2); /* 24px */
    padding-top: 2px;
    padding-bottom: var(
      --font-valign-fix,
      0
    ); /* acumin font requires this to allow for vertical alignment  */
    overflow-wrap: break-word;
    word-wrap: break-word; /* if we need to support very old browsers */
    /* hyphens: auto; */ /* This is not in Figma */
    /* max-width: 288px; */ /* Should we set a max-width for long content? */
  }

  .error:hover {
    background-color: var(--goa-color-emergency-light);
  }
</style>
