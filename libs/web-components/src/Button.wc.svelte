<svelte:options tag="goa-button" />

<script lang="ts">
  // import { ButtonSize, ButtonType, ButtonVariant, WCBoolean, WC_FALSE } from "@abgov/shared/common";

  import { toBoolean } from "./common/utils";


  export let type = "primary"; // primary, secondary, tertiary, borderless
  export let size = "medium"; // small, medium, large
  export let variant = "default"; // default, danger
  export let title: string;
  export let disabled: string;

  // export let type: ButtonType = "primary";
  // export let size: ButtonSize =  "medium";
  // export let variant: ButtonVariant = "default";
  // export let title: string = "";
  // export let disabled: WCBoolean = WC_FALSE;

  $: isDisabled = toBoolean(disabled);

  function clickHandler(e) {
    this.dispatchEvent(new CustomEvent("_click", { composed: true, bubbles: true}));
    e.stopPropagation();
  }
</script>

<button
  class="{type} {size} {variant}"
  {title}
  on:click={clickHandler}
  disabled={isDisabled}
>
  <slot />
</button>

<style>
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
    border: 2px solid var(--color-blue-500, "blue");
    box-sizing: border-box;
    cursor: pointer;
    font-size: var(--fs-base, 1rem);
    font-weight: 700;
    line-height: 2.375rem;
    padding: 0 0.75rem;
    min-width: 5rem;

    transition: transform 0.1s ease-in-out, background-color 0.2s ease-in-out,
      border-color 0.2s ease-in-out;
    transform: scaleX(1);
  }

  button:active {
    transform: scale(0.95);
  }

  /* Primary */
  button.primary {
    border: 2px solid var(--color-blue-500, blue);
    background: var(--color-blue-500, blue);
    color: var(--color-white, white);
  }

  button.primary:hover {
    border-color: var(--color-blue-600);
    background: var(--color-blue-600);
  }

  button.primary:focus,
  button.primary:active {
    border-color: var(--color-blue-600);
    box-shadow: 0 0 0 3px var(--color-orange-500);
    background: var(--color-blue-600);
    outline: none;
  }

  /* Secondary */

  button.secondary {
    border: 2px solid var(--color-blue-500, blue);
    background: var(--color-blue-500, blue);
    color: var(--color-white, white);
  }

  button.secondary:hover {
    border-color: var(--color-blue-600);
    background: var(--color-blue-600);
  }

  button.secondary:focus,
  button.secondary:active {
    border-color: var(--color-blue-600);
    box-shadow: 0 0 0 3px var(--color-orange-500);
    background: var(--color-blue-600);
    outline: none;
  }

  /* Tertiary */

  button.tertiary {
    border-color: var(--color-gray-200);
    background: var(--color-white);
    color: var(--color-blue-500);
  }

  button.tertiary:hover {
    color: var(--color-blue-600);
  }

  button.tertiary:focus,
  button.tertiary:active {
    border-color: var(--color-blue-600);
    color: var(--color-blue-600);
    box-shadow: 0 0 0 3px var(--color-orange-500);
    outline: none;
  }

  /* Borderless */

  button.borderless {
    background: none;
    color: var(--color-blue-500);
    border: none;
  }
  button.borderless:hover {
    background-color: var(--color-blue-100);
    color: var(--color-blue-500);
  }

  button.borderless:focus,
  button.borderless:active {
    outline: none;
    box-shadow: none;
    background-color: var(--color-blue-100);
  }

  .primary.danger {
    color: var(--color-white);
    background: var(--color-red-500);
    border-color: var(--color-red-500);
  }
  .primary.danger:hover {
    background: var(--color-red-600);
    border-color: var(--color-red-600);
  }
  .primary.danger:focus,
  .primary.danger:active {
    background: var(--color-red-600);
    border-color: var(--color-red-600);
  }

  .secondary.danger {
    color: var(--color-red-500);
    border-color: var(--color-red-500);
    background: var(--color-white);
  }
  .secondary.danger:hover {
    border-color: var(--color-red-600);
    color: var(--color-red-600);
    background: var(--color-white);
  }
  .secondary.danger:focus,
  .secondary.danger:active {
    color: var(--color-red-600);
    border-color: var(--color-red-600);
    background: var(--color-white);
  }

  button:disabled {
    pointer-events: none;
    color: var(--color-gray-700);
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-100);
  }

  .tertiary.danger {
    color: var(--color-red-500);
    border-color: var(--color-gray-200);
    background: var(--color-white);
  }
  .tertiary.danger:hover {
    border-color: var(--color-red-600);
    color: var(--color-red-600);
    background: var(--color-white);
  }
  .tertiary.danger:focus,
  .tertiary.danger:active {
    color: var(--color-red-600);
    border-color: var(--color-red-600);
    background: var(--color-white);
  }

  .borderless.danger {
    color: var(--color-red-500);
  }
  .borderless.danger:hover {
    background: var(--color-red-100);
    color: var(--color-red-500);
  }
  .borderless.danger:focus,
  .borderless.danger:active {
    background: var(--color-red-100);
    color: var(--color-red-500);
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
