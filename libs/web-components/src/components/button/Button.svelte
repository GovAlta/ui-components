<svelte:options tag="goa-button" />

<script lang="ts">
  import { onMount } from "svelte";
  import { toBoolean } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";

  const BUTTON_TYPES = ["primary", "secondary", "tertiary", "start"];
  type ButtonType = (typeof BUTTON_TYPES)[number];

  const SIZES = ["", "compact"];
  type Size = (typeof SIZES)[number];

  const VARIANTS = ["", "destructive"];
  type Variant = (typeof VARIANTS)[number];

  // type check functions

  function isButtonType(value: string): value is ButtonType {
    return BUTTON_TYPES.includes(value);
  }

  function isSize(value: string): value is Size {
    return SIZES.includes(value);
  }

  function isVariant(value: string): value is Variant {
    return VARIANTS.includes(value);
  }

  // optional
  export let type: ButtonType = "primary";
  export let size: Size = "";
  export let variant: Variant = "";
  export let title: string = "";
  export let disabled: string = "false";
  export let leadingicon: GoAIconType = null;
  export let trailingicon: GoAIconType = null;
  export let testid: string = "";

  $: isDisabled = toBoolean(disabled);
  $: isButtonDark = type === "primary" || type === "start"

  function clickHandler(e: Event) {
    this.dispatchEvent(new CustomEvent("_click", { composed: true, bubbles: true }));
    e.stopPropagation();
  }

  onMount(() => {
    if (!isButtonType(type)) {
      throw "Invalid button type";
    }
    if (!isSize(size)) {
      throw "Invalid button size";
    }
    if (!isVariant(variant)) {
      throw "Invalid button variant";
    }
  })
</script>

<button
  class="{type} {size} {variant}"
  class:leading={leadingicon}
  class:trailing={trailingicon || type === "start"}
  {title}
  on:click={clickHandler}
  disabled={isDisabled}
  data-testid={testid}
>
  {#if type === "start"}
    <div class="text">
      <slot />
    </div>
    <goa-icon id="trailing-icon" type="arrow-forward" inverted="true" />
  {:else}
    {#if leadingicon}
      <goa-icon id="leading-icon" type={leadingicon} inverted={isButtonDark} />
    {/if}
    <div class="text">
      <slot />
    </div>
    {#if trailingicon}
      <goa-icon id="trailing-icon" type={trailingicon} inverted={isButtonDark} />
    {/if}
  {/if}
</button>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  @media (max-width: 480px) {
    /* expand the button and :host container on small screens  */
    :host {
      width: 100%;
    }
    button {
      width: 100%;
    }
  }

  button {
    display: flex;
    box-sizing: border-box;
    border-radius: 0.25rem;
    border: 2px solid var(--goa-color-interactive);
    box-sizing: border-box;
    cursor: pointer;
    font-family: var(--font-family);
    font-size: var(--fs-lg);
    font-weight: 400;
    height: var(--button-height);
    letter-spacing: 0.5px;
    line-height: 100%;
    padding: 0 0.75rem;

    /* for leading and trailing icon vertical alignment */
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s ease-in-out, background-color 0.2s ease-in-out,
      border-color 0.2s ease-in-out;
  }

  .text {
    padding-bottom: var(--font-valign-fix);  /* acumin font requires this to allow for vertical alignment  */
  }

  button:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  button.compact {
    height: var(--button-height-compact);
    font-size: var(--fs-base);
  }

  button.start {
    height: var(--button-height-tall);
    font-weight: var(--fw-bold);
  }

  /* Primary */
  button.start,
  button.primary {
    border: 2px solid var(--goa-color-interactive);
    background: var(--goa-color-interactive);
    color: var(--goa-color-text-light);
  }

  button.start:hover,
  button.primary:hover {
    border-color: var(--goa-color-interactive--hover);
    background: var(--goa-color-interactive--hover);
  }

  button.start:focus,
  button.start:active,
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

  .primary.destructive {
    color: var(--color-white);
    background: var(--goa-color-status-emergency);
    border-color: var(--goa-color-status-emergency);
  }
  .primary.destructive:hover {
    background: var(--goa-color-status-emergency-dark);
    border-color: var(--goa-color-status-emergency-dark);
  }
  .primary.destructive:focus,
  .primary.destructive:active {
    background: var(--goa-color-status-emergency-dark);
    border-color: var(--goa-color-status-emergency-dark);
  }

  .secondary.destructive {
    color: var(--goa-color-status-emergency);
    border-color: var(--goa-color-status-emergency);
    background: var(--color-white);
  }
  .secondary.destructive:hover {
    border-color: var(--goa-color-status-emergency-dark);
    color: var(--goa-color-status-emergency-dark);
    background: var(--color-white);
  }
  .secondary.destructive:focus,
  .secondary.destructive:active {
    color: var(--goa-color-status-emergency-dark);
    border-color: var(--goa-color-status-emergency-dark);
    background: var(--color-white);
  }

  .tertiary.destructive {
    color: var(--goa-color-status-emergency);
    border-color: var(--color-gray-200);
    background: var(--color-white);
  }
  .tertiary.destructive:hover {
    border-color: var(--goa-color-status-emergency-dark);
    color: var(--goa-color-status-emergency-dark);
    background: var(--color-white);
  }
  .tertiary.destructive:focus,
  .tertiary.destructive:active {
    color: var(--goa-color-status-emergency-dark);
    border-color: var(--goa-color-status-emergency-dark);
    background: var(--color-white);
  }
</style>
