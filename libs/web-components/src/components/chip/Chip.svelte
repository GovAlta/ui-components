<svelte:options customElement="goa-chip" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";
  import type { GoAIconType, IconTheme } from "../icon/Icon.svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount } from "svelte";

  type ChipVariant = "filter";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  export let leadingicon: GoAIconType | null = null;
  export let icontheme: IconTheme = "outline";
  export let error: string = "false";
  export let deletable: string = "false";
  export let content: string;
  export let variant: ChipVariant;
  export let testid: string = "";

  let el: HTMLElement;
  let _hovering: boolean = false;

  // booleans
  let _error: boolean;
  let _deletable: boolean;

  $: _error = toBoolean(error);
  $: _deletable = toBoolean(deletable);

  onMount(async () => {
    console.warn("GoAChip is deprecated. Instead use GoAFilterChip.");
  });

  function onDelete(e: Event) {
    el.dispatchEvent(
      new CustomEvent("_click", { composed: true, bubbles: true }),
    );
    e.stopPropagation();
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
  class:deletable={_deletable}
  class:error={_error}
  class:variant
  style={calculateMargin(mt, mr, mb, ml)}
  tabindex="0"
  on:click={(e) => _deletable && onDelete(e)}
  on:mouseover={() => (_hovering = true)}
  on:mouseout={() => (_hovering = false)}
  on:focus={() => (_hovering = false)}
  on:blur={() => (_hovering = false)}
>
  {#if leadingicon}
    <goa-icon
      class="leading-icon"
      size="medium"
      type={leadingicon}
      theme={icontheme}
    />
  {/if}
  <div class="text">
    {content}
  </div>
  {#if _deletable}
    <goa-icon
      class="delete-icon"
      size="medium"
      theme="filled"
      type="close-circle"
      fillcolor={_error
        ? "var(--goa-color-emergency-default)"
        : _hovering
          ? "var(--goa-color-interactive-hover)"
          : "var(--goa-color-greyscale-700)"}
      opacity={_error ? (_hovering ? 1 : 0.5) : 1}
    />
  {/if}
</div>

<!-- Style -->
<style>
  .leading-icon {
    margin-left: -0.25rem;
  }

  .chip {
    vertical-align: middle;
    align-items: center;
    background-color: var(--goa-color-greyscale-white);
    border-radius: 1rem;
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-500);
    box-sizing: border-box;
    color: var(--goa-color-text-default);
    display: inline-flex;
    flex-direction: row;
    font-size: var(--goa-font-size-3);
    font-weight: var(--goa-font-weight-regular);
    gap: 0.25rem;
    min-height: 2rem;
    justify-content: center;
    padding: 0 0.75rem;
    cursor: default;
    white-space: normal;
    word-wrap: break-word;
  }

  .text {
    padding-bottom: var(
      --font-valign-fix,
      0
    ); /* acumin font requires this to allow for vertical alignment  */
  }

  .chip:focus {
    outline: var(--goa-border-width-m) solid var(--goa-color-interactive-focus);
    background-color: var(--goa-color-greyscale-white);
  }

  .chip:hover {
    background-color: var(--goa-color-greyscale-200);
  }

  .deletable {
    cursor: pointer;
  }

  .delete-icon {
    margin-right: -0.25rem;
  }

  .error,
  .error:hover {
    background-color: var(--goa-color-emergency-light);
  }
</style>
