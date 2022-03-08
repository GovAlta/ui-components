<svelte:options tag="goa-button" />

<script lang="ts">
  // import { ButtonSize, ButtonType, ButtonVariant, WCBoolean, WC_FALSE } from "@abgov/shared/common";

  import { toBoolean } from "../../common/utils";

  export let type = "primary"; // primary, secondary, tertiary, borderless
  export let size = "medium"; // small, medium, large
  export let variant = "default"; // default, danger
  export let title: string = "";
  export let disabled: string = "false";

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
  <slot />
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
    font-size: var(--fs-base, 1rem);
    font-weight: 700;
    line-height: 2.375rem;
    padding: 0 0.75rem;

    transition: transform 0.1s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    transform: scaleX(1);
  }

  button:active {
    transform: scale(0.95);
  }

  /* Primary */
  button.primary {
    border: 2px solid var(--goa-color-interactive);
    background: var(--goa-color-interactive);
    color: var(--color-white, white);
  }

  button.primary:hover {
    border-color: var(--goa-color-interactive--hover);
    background: var(--goa-color-interactive--hover);
  }

  button.primary:focus,
  button.primary:active {
    box-shadow: 0 0 0 3px var(--goa-color-interactive--highlight);
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
  }

  button.secondary:focus,
  button.secondary:active {
    border-color: var(--goa-color-interactive--active);
    box-shadow: 0 0 0 3px var(--goa-color-interactive--highlight);
    background: var(--color-gray-100);
    outline: none;
  }

  /* Tertiary */

  button.tertiary {
    border-color: var(--color-gray-200);
    background: var(--color-white);
    color: var(--goa-color-interactive);
  }

  button.tertiary:hover {
    color: var(--goa-color-interactive--hover);
  }

  button.tertiary:focus,
  button.tertiary:active {
    border-color: var(--goa-color-interactive--active);
    color: var(--goa-color-interactive--active);
    box-shadow: 0 0 0 3px var(--goa-color-interactive--highlight);
    outline: none;
  }

  /* Borderless */

  button.borderless {
    background: none;
    color: var(--goa-color-interactive);
    border: none;
  }
  button.borderless:hover {
    background-color: var(--goa-color-primary-light);
    color: var(--goa-color-interactive--hover);
  }

  button.borderless:focus,
  button.borderless:active {
    outline: none;
    box-shadow: none;
    background-color: var(--goa-color-primary-light);
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

  button:disabled {
    pointer-events: none;
    /* TODO: should have a disabled color */
    color: var(--color-gray-600);
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-100);
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

  .borderless.danger {
    color: var(--goa-color-status-emergency);
  }
  .borderless.danger:hover {
    background: var(--goa-color-emergency-light);
    color: var(--goa-color-status-emergency-dark);
  }
  .borderless.danger:focus,
  .borderless.danger:active {
    background: var(--goa-color-emergency-light);
    color: var(--goa-color-status-emergency-dark);
  }

  /* Sizes */

  .large {
    font-size: var(--fs-lg);
    line-height: 3rem;
  }

  .large.borderless {
    line-height: calc(3rem + 4px);
  }

  .medium {
    font-size: var(--fs-base);
    line-height: 2.375rem;
  }

  .medium.borderless {
    line-height: calc(2.375rem + 4px);
  }

  .small {
    font-size: var(--fs-sm);
    line-height: 1.75rem;
  }

  .small.borderless {
    line-height: calc(1.75rem + 4px);
  }
</style>
