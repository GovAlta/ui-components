<svelte:options customElement="goa-filter-chip" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import type { GoAIconType } from "../icon/Icon.svelte";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Props
  export let error: string = "false";
  export let content: string;
  export let secondarytext: string = "";
  export let leadingicon: GoAIconType | null = null;
  export let testid: string = "";
  export let ariaLabel: string = "";
  export let version: "1" | "2" = "1";

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
{#if version === "2"}
  <div
    bind:this={el}
    data-testid={testid}
    class="v2 chip"
    class:error={_error}
    role="presentation"
    aria-label={chipAriaLabel}
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
      <div class="text">
        {content}
      </div>
    </div>
    <goa-icon-button
      size="3"
      icon="close"
      onclick={onDelete}
      arialabel="Remove filter"
      variant={_error ? "destructive" : "dark"}
      testid="delete-button"
    >
    </goa-icon-button>
  </div>
{:else}
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
      size="medium"
      theme={_error ? "filled" : _hovering || _focused ? "filled" : "outline"}
      type="close-circle"
      fillcolor={_error
        ? "var(--goa-color-emergency-default)"
        : "var(--goa-color-greyscale-700)"}
      opacity={_error ? (_hovering || _focused ? 1 : 0.5) : 1}
    />
  </div>
{/if}

<!-- Style -->
<style>
  .chip {
    display: inline-flex;
    align-items: center;
    background-color: var(
      --goa-filter-chip-bg-color,
      var(--goa-color-greyscale-white)
    );
    border-radius: var(--goa-filter-chip-border-radius, 1rem);
    border: var(
      --goa-filter-chip-border,
      var(--goa-border-width-s) solid var(--goa-color-greyscale-700)
    );
    box-sizing: border-box;
    color: var(--goa-filter-chip-text-color, var(--goa-color-text-default));
    font: var(--goa-filter-chip-typography, var(--goa-typography-body-s));
    gap: var(--goa-filter-chip-gap, 0.5rem);
    min-height: var(--goa-filter-chip-min-height, 2rem);
    padding-top: var(--goa-filter-chip-padding-vertical, 3px);
    padding-right: var(--goa-filter-chip-padding-horizontal-right, 8px);
    padding-bottom: var(--goa-filter-chip-padding-vertical, 3px);
    padding-left: var(--goa-filter-chip-padding-horizontal-left, 12px);
    min-width: var(--goa-filter-chip-min-width, 56px);
  }

  /* V1: Entire chip is clickable */
  .chip[role="button"] {
    cursor: pointer;
    touch-action: manipulation;
  }

  .chip.focused {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  .chip.error {
    background-color: var(
      --goa-filter-chip-bg-color-error,
      var(--goa-color-emergency-light)
    );
    border-color: var(
      --goa-filter-chip-border-color-error,
      var(--goa-color-emergency-default)
    );
    color: var(
      --goa-filter-chip-text-color-error,
      var(--goa-color-emergency-default)
    );
  }

  .chip:not(.v2).error:hover {
    background-color: var(--goa-color-emergency-light);
  }

  .delete-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .label-container {
    display: flex;
    align-items: center;
    gap: var(--goa-filter-chip-label-gap, 6px);
  }

  .text {
    line-height: var(
      --goa-filter-chip-line-height,
      var(--goa-line-height-2)
    ); /* 24px */
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

  /* Version 2 */

  .v2 .leading-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  .v2 .secondary-text {
    line-height: var(--goa-filter-chip-line-height);
    color: var(--goa-filter-chip-secondary-text-color);
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .v2.error .secondary-text {
    color: var(--goa-filter-chip-secondary-text-color-error);
  }

  .v2 .text,
  .v2 .secondary-text {
    padding-bottom: 0;
  }

  /* V2 Icon Button */
  .v2 {
    --padding: 0.125rem;
    --goa-icon-button-destructive-hover-color-bg: var(
      --goa-filter-chip-close-button-error-hover-bg-color
    );
  }
</style>
