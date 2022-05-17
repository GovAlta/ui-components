<svelte:options tag="goa-button" />

<script lang="ts">
  import type { IconSize, IconTheme, GoAIconType } from "../icon/Icon.svelte";
  // import { ButtonSize, ButtonType, ButtonVariant, WCBoolean, WC_FALSE } from "@abgov/shared/common";

  import { toBoolean } from "../../common/utils";

  export let type = "primary"; // primary, secondary, tertiary, start
  export let size = "normal"; // normal, compact
  export let variant = "default"; // default, danger
  export let title: string = "";
  export let disabled: string = "false";
  export let leadingicon: GoAIconType = null;
  export let trailingicon: GoAIconType = null;

  //optional
  export let testid: string = "";

  // export let type: ButtonType = "primary";
  // export let size: ButtonSize =  "medium";
  // export let variant: ButtonVariant = "default";
  // export let title: string = "";
  // export let disabled: WCBoolean = WC_FALSE;

  $: isDisabled = toBoolean(disabled);

  function clickHandler(e) {
    this.dispatchEvent(new CustomEvent("_click", { composed: true, bubbles: true }));
    e.stopPropagation();
  }
</script>

<button
  class="{type} {size} {variant}"
  {title}
  on:click={clickHandler}
  disabled={isDisabled}
  data-testid={testid}
>
  {#if type === "get-started"}
    <slot />
    <goa-icon type="arrow-forward" inverted="true" />
  {:else}
    {#if leadingicon}
      <goa-icon type={leadingicon} inverted="true" />
    {/if}
    <slot />
    {#if trailingicon}
      <goa-icon type={trailingicon} inverted="true" />
    {/if}
  {/if}
</button>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  @media (max-width: 320px) {
    /* expand the button and :host container on small screens  */
    :host {
      width: 100%;
    }
    button {
      width: 100%;
    }
  }

  button {
    border-radius: 0.25rem;
    border: 2px solid var(--goa-color-interactive);
    box-sizing: border-box;
    cursor: pointer;
    font-size: var(--fs-lg);
    font-weight: 400;
    height: var(--button-height);
    padding: 0 0.75rem;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s ease-in-out, background-color 0.2s ease-in-out,
      border-color 0.2s ease-in-out;
    /* transform: scale(1); */
  }

  /* button:active {
    transform: scale(0.99);
  } */

  button:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  button.compact {
    height: var(--button-height-compact);
    font-size: var(--fs-base);
  }

  button.get-started {
    height: var(--button-height-tall);
    font-weight: var(--fw-bold);
  }

  /* Primary */
  button.get-started,
  button.primary {
    border: 2px solid var(--goa-color-interactive);
    background: var(--goa-color-interactive);
    color: var(--color-white, white);
  }

  button.get-started:hover,
  button.primary:hover {
    border-color: var(--goa-color-interactive--hover);
    background: var(--goa-color-interactive--hover);
  }

  button.get-started:focus,
  button.get-started:active,
  button.primary:focus,
  button.primary:active {
    box-shadow: 0 0 0 3px var(--goa-color-interactive--focus);
    border-color: var(--goa-color-interactive--active);
    background: var(--goa-color-interactive--active);
    outline: none;
  }

  /* Secondary */

  button.secondary {
    border: 2px solid var(--goa-color-interactive);
    background: var(--color-white);
    color: var(--goa-color-interactive);
  }

  button.secondary:hover {
    border-color: var(--goa-color-interactive--hover);
    color: var(--goa-color-interactive--hover);
    background: var(--color-gray-100);
  }

  button.secondary:focus,
  button.secondary:active {
    border-color: var(--goa-color-interactive--active);
    box-shadow: 0 0 0 3px var(--goa-color-interactive--focus);
    background: var(--color-gray-100);
    outline: none;
  }

  /* Tertiary */

  button.tertiary {
    border: 1px solid transparent;
    background: var(--color-white);
    color: var(--goa-color-interactive);
    text-decoration: underline;
  }

  button.tertiary:hover {
    border-color: var(--color-gray-100);
    color: var(--goa-color-interactive--hover);
    background: var(--color-gray-100);
  }

  button.tertiary:focus,
  button.tertiary:active {
    border-color: var(--color-gray-100);
    background: var(--color-gray-100);
    color: var(--goa-color-interactive--active);
    box-shadow: 0 0 0 3px var(--goa-color-interactive--focus);
    outline: none;
  }

  .primary.danger {
    color: var(--color-white);
    background: var(--goa-color-status-emergency);
    border-color: var(--goa-color-status-emergency);
  }
  .primary.danger:hover {
    background: var(--goa-color-status-emergency-dark);
    border-color: var(--goa-color-status-emergency-dark);
  }
  .primary.danger:focus,
  .primary.danger:active {
    background: var(--goa-color-status-emergency-dark);
    border-color: var(--goa-color-status-emergency-dark);
  }

  .secondary.danger {
    color: var(--goa-color-status-emergency);
    border-color: var(--goa-color-status-emergency);
    background: var(--color-white);
  }
  .secondary.danger:hover {
    border-color: var(--goa-color-status-emergency-dark);
    color: var(--goa-color-status-emergency-dark);
    background: var(--color-white);
  }
  .secondary.danger:focus,
  .secondary.danger:active {
    color: var(--goa-color-status-emergency-dark);
    border-color: var(--goa-color-status-emergency-dark);
    background: var(--color-white);
  }

  .tertiary.danger {
    color: var(--goa-color-status-emergency);
    border-color: var(--color-gray-200);
    background: var(--color-white);
  }
  .tertiary.danger:hover {
    border-color: var(--goa-color-status-emergency-dark);
    color: var(--goa-color-status-emergency-dark);
    background: var(--color-white);
  }
  .tertiary.danger:focus,
  .tertiary.danger:active {
    color: var(--goa-color-status-emergency-dark);
    border-color: var(--goa-color-status-emergency-dark);
    background: var(--color-white);
  }

</style>
