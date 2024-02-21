<svelte:options customElement="goa-button" />

<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { typeValidator, toBoolean } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";

  // Validators
  const [Types, validateType] = typeValidator(
    "Button type",
    ["primary", "submit", "secondary", "tertiary", "start"],
    true,
  );
  const [Sizes, validateSize] = typeValidator(
    "Button size",
    ["normal", "compact"],
    true,
  );
  const [Variants, validateVariant] = typeValidator(
    "Button variant",
    ["normal", "destructive"],
    true,
  );

  // Types
  type ButtonType = (typeof Types)[number];
  type Size = (typeof Sizes)[number];
  type Variant = (typeof Variants)[number];

  // optional
  export let type: ButtonType = "primary";
  export let size: Size = "normal";
  export let variant: Variant = "normal";
  export let disabled: string = "false";
  export let leadingicon: GoAIconType | null = null;
  export let trailingicon: GoAIconType | null = null;
  export let testid: string = "";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  $: isDisabled = toBoolean(disabled);
  $: isButtonDark = type === "primary" || type === "start";

  function clickHandler(_e: Event) {
    // TODO: use e.target??
    if (!isDisabled) {
      // @ts-expect-error
      this.dispatchEvent(
        new CustomEvent("_click", { composed: true, bubbles: true }),
      );
    }
  }

  onMount(() => {
    validateType(type);
    validateSize(size);
    validateVariant(variant);
  });
</script>

<button
  class="{type} {size} {variant}"
  class:leading={leadingicon}
  class:trailing={trailingicon || type === "start"}
  style={calculateMargin(mt, mr, mb, ml)}
  on:click={clickHandler}
  disabled={isDisabled}
  on:click={clickHandler}
  data-testid={testid}
  type={type == "submit" ? type : "button"}
>
  {#if type === "start"}
    <span class="text">
      <slot />
    </span>
    <goa-icon id="trailing-icon" type="arrow-forward" inverted="true" />
  {:else}
    {#if leadingicon}
      <goa-icon id="leading-icon" type={leadingicon} inverted={isButtonDark} />
    {/if}
    <span class="text">
      <slot />
    </span>
    {#if trailingicon}
      <goa-icon
        id="trailing-icon"
        type={trailingicon}
        inverted={isButtonDark}
      />
    {/if}
  {/if}
</button>

<style>
  :host {
    --button-height: 2.625rem; /* 42px */
    --button-height-compact: 2rem; /* 32px */
    --button-height-tall: 3.25rem; /* 52px */

    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  @media (--mobile) {
    /* expand the button and :host container on small screens  */
    :host {
      width: 100%;
    }
    button {
      width: 100%;
    }
  }

  button {
    display: inline-flex;
    box-sizing: border-box;
    border-radius: 0.25rem;
    border: 2px solid var(--goa-color-interactive-default);
    box-sizing: border-box;
    cursor: pointer;
    font-family: var(--goa-font-family-sans);
    font-size: var(--goa-font-size-5);
    font-weight: 400;
    height: var(--button-height);
    letter-spacing: var(--goa-letter-spacing-button);
    line-height: 100%;
    padding: 0 0.75rem;
    white-space: nowrap;

    /* for leading and trailing icon vertical alignment */
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.1s ease-in-out,
      background-color 0.2s ease-in-out,
      border-color 0.2s ease-in-out;
  }

  .text {
    padding-bottom: var(
      --font-valign-fix,
      0
    ); /* acumin font requires this to allow for vertical alignment  */
  }

  button:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  button.compact {
    height: var(--button-height-compact);
    font-size: var(--goa-font-size-4);
    padding-left: var(--goa-space-xs);
    padding-right: var(--goa-space-xs);
  }

  button.start {
    height: var(--button-height-tall);
    font-weight: var(--goa-font-weight-bold);
  }

  /* Primary */
  button.start,
  button.submit,
  button.primary {
    border: 2px solid var(--goa-color-interactive-default);
    background-color: var(--goa-color-interactive-default);
    color: var(--goa-color-text-light);
  }

  button.start:hover,
  button.submit:hover,
  button.primary:hover {
    border-color: var(--goa-color-interactive-hover);
    background-color: var(--goa-color-interactive-hover);
  }

  button.start:focus,
  button.start:active,
  button.submit:focus,
  button.submit:active,
  button.primary:focus,
  button.primary:active {
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
    border-color: var(--goa-color-interactive-hover);
    background-color: var(--goa-color-interactive-hover);
    outline: none;
  }

  /* Secondary */

  button.secondary {
    border: 2px solid var(--goa-color-interactive-default);
    background-color: var(--goa-color-greyscale-white);
    color: var(--goa-color-interactive-default);
  }

  button.secondary:hover {
    border-color: var(--goa-color-interactive-hover);
    color: var(--goa-color-interactive-hover);
    background-color: var(--goa-color-greyscale-100);
  }

  button.secondary:focus,
  button.secondary:active {
    border-color: var(--goa-color-interactive-hover);
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
    background-color: var(--goa-color-greyscale-100);
    outline: none;
  }

  /* Tertiary */

  button.tertiary {
    border: 1px solid transparent;
    background-color: transparent;
    color: var(--goa-color-interactive-default);
    text-decoration: underline;
  }

  button.tertiary:hover {
    border-color: var(--goa-color-greyscale-100);
    color: var(--goa-color-interactive-hover);
    background-color: var(--goa-color-greyscale-100);
  }

  button.tertiary:focus,
  button.tertiary:active {
    border-color: var(--goa-color-greyscale-100);
    background-color: var(--goa-color-greyscale-100);
    color: var(--goa-color-interactive-hover);
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
    outline: none;
  }

  .submit.destructive,
  .primary.destructive {
    color: var(--goa-color-greyscale-white);
    background-color: var(--goa-color-emergency-default);
    border-color: var(--goa-color-emergency-default);
  }
  .submit.destructive:hover,
  .primary.destructive:hover {
    background-color: var(--goa-color-emergency-dark);
    border-color: var(--goa-color-emergency-dark);
  }
  .submit.destructive:focus,
  .primary.destructive:focus,
  .primary.destructive:active {
    background-color: var(--goa-color-emergency-dark);
    border-color: var(--goa-color-emergency-dark);
  }

  .secondary.destructive {
    color: var(--goa-color-emergency-default);
    border-color: var(--goa-color-emergency-default);
    background-color: var(--goa-color-greyscale-white);
  }
  .secondary.destructive:hover {
    border-color: var(--goa-color-emergency-dark);
    color: var(--goa-color-emergency-dark);
    background-color: var(--goa-color-greyscale-white);
  }
  .secondary.destructive:focus,
  .secondary.destructive:active {
    color: var(--goa-color-emergency-dark);
    border-color: var(--goa-color-emergency-dark);
    background-color: var(--goa-color-greyscale-white);
  }

  .tertiary.destructive {
    color: var(--goa-color-emergency-default);
    border-color: transparent;
  }
  .tertiary.destructive:hover {
    color: var(--goa-color-emergency-dark);
  }
  .tertiary.destructive:focus,
  .tertiary.destructive:active {
    color: var(--goa-color-emergency-dark);
  }
</style>
