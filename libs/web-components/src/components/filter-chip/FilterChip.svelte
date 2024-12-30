<svelte:options customElement="goa-filter-chip" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Props
  export let error: string = "false";
  export let content: string;
  export let testid: string = "";
  export let ariaLabel: string = "";

  // Private variables
  let el: HTMLElement;

  // booleans
  let _hovering: boolean = false;
  let _focused: boolean = false;
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
<div
  bind:this={el}
  data-testid={testid}
  class="chip"
  class:error={_error}
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
    opacity={_error ? (_hovering || _focused ? 1 : 0.5) : 1}
  />
</div>

<!-- Style -->
<style>
  .chip {
    display: inline-flex;
    align-items: center;
    background-color: var(--goa-color-greyscale-white);
    border-radius: 1rem;
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-700);
    box-sizing: border-box;
    color: var(--goa-color-text-default);
    font: var(--goa-typography-body-s);
    gap: 0.5rem;
    min-height: 2rem;
    padding: 3px 8px 3px 12px;
    min-width: 56px;
    cursor: pointer;
    touch-action: manipulation;
  }

  .chip.focused {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  .chip.error {
    background-color: var(--goa-color-emergency-light);
    border-color: var(--goa-color-emergency-default);
    color: var(--goa-color-emergency-default);
  }

  .delete-icon {
    flex-shrink: 0;
  }

  .chip,
  .text {
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .text {
    line-height: var(--goa-line-height-2); /* 24px */
    padding-top: 2px;
    padding-bottom: var(
      --font-valign-fix,
      0
    ); /* acumin font requires this to allow for vertical alignment  */
  }

  .error:hover {
    background-color: var(--goa-color-emergency-light);
  }
</style>
