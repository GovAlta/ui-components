<svelte:options customElement="goa-button" />

<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { typeValidator, toBoolean, dispatch } from "../../common/utils";
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
    ["normal", "destructive", "inverse"],
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
  export let width: string = "";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // ========
  // Reactive
  // ========

  $: isDisabled = toBoolean(disabled);
  $: isButtonDark = type === "primary" || type === "start";

  // =====
  // Hooks
  // =====

  onMount(() => {
    validateType(type);
    validateSize(size);
    validateVariant(variant);
  });

  // =========
  // Functions
  // =========

  function clickHandler(e: Event) {
    if (!isDisabled && e.target) {
      dispatch(e.target as Element, "_click", null, { bubbles: true });
    }
  }
</script>

<button
  class="{type} {size} {variant}"
  style={`
      ${calculateMargin(mt, mr, mb, ml)};
      --width: ${width};
    `}
  disabled={isDisabled}
  on:click={clickHandler}
  data-testid={testid}
  type={type == "submit" ? type : "button"}
>
  {#if type === "start"}
    <span class="text">
      <slot />
    </span>
    <goa-icon
      id="trailing-icon"
      size="4"
      type="arrow-forward"
      inverted="true"
    />
  {:else}
    {#if leadingicon}
      <goa-icon
        id="leading-icon"
        size="3"
        type={leadingicon}
        inverted={isButtonDark}
      />
    {/if}
    <span class="text">
      <slot />
    </span>
    {#if trailingicon}
      <goa-icon
        id="trailing-icon"
        size="3"
        type={trailingicon}
        inverted={isButtonDark}
      />
    {/if}
  {/if}
</button>

<style>
  button {
    display: inline-flex;
    box-sizing: border-box;
    border-radius: var(--goa-button-border-radius);
    cursor: pointer;
    font: var(--goa-button-text);
    height: var(--goa-button-height);
    letter-spacing: var(--goa-letter-spacing-button);
    padding: 0 var(--goa-button-padding-lr);
    white-space: nowrap;
    gap: var(--goa-button-gap);
    align-items: center; /* for leading and trailing icon vertical alignment */
    justify-content: center;
    transition:
      transform 0.1s ease-in-out,
      background-color 0.2s ease-in-out,
      border-color 0.2s ease-in-out,
      color 0.2s ease-in-out;
    width: var(--width, auto);
  }

  button:active {
    transform: translateY(2px);
  }

  button:focus-visible {
    box-shadow: 0 0 0 var(--goa-border-width-l)
      var(--goa-color-interactive-focus);
  }

  @media (--mobile) {
    :host {
      width: 100%;
    }
    button {
      width: 100%;
      display: flex;
    }
    button.tertiary {
      background-color: var(--goa-button-tertiary-color-bg-mobile) !important;
    }
    button.tertiary:hover {
      background-color: var(--goa-color-greyscale-200) !important;
    }
    button.tertiary.inverse {
      background-color: var(--goa-button-tertiary-color-bg) !important;
    }
    button.tertiary.inverse:hover {
      background-color: var(--goa-color-greyscale-200) !important;
    }
  }

  .icon {
    /* Default icon size */
    width: var(--goa-button-icon-size);
    height: var(--goa-button-icon-size);
  }
  .icon.compact {
    /* Compact icon size */
    width: var(--goa-button-compact-icon-size);
    height: var(--goa-button-compact-icon-size);
  }

  .text {
    padding-bottom: 0.2rem; /* acumin font requires this to allow for vertical alignment  */
  }

  button.compact {
    height: var(--goa-button-height-compact);
    font: var(--goa-button-text-compact);
    padding: var(--goa-button-padding-lr-compact);
    gap: var(--goa-button-compact-gap);
  }

  button.start {
    height: var(--goa-button-start-height);
    font: var(--goa-button-text-start);
    padding: var(--goa-button-padding-lr-start);
    letter-spacing: var(--goa-letter-spacing-button);
  }

  /* Primary */
  button.start,
  button.submit,
  button.primary {
    border: var(--goa-button-primary-border);
    background-color: var(--goa-button-primary-color-bg);
    color: var(--goa-button-primary-color-text);
  }
  button:hover {
    background-color: var(--goa-button-primary-hover-color-bg);
  }
  button:focus,
  button:active {
    border-color: var(--goa-button-primary-hover-border);
    background-color: var(--goa-button-primary-focus-color-bg);
    outline: none;
  }

  /* Secondary */
  button.secondary {
    border: var(--goa-button-secondary-border);
    background-color: var(--goa-button-secondary-color-bg);
    color: var(--goa-button-secondary-color-text);
  }
  button.secondary:hover {
    border: var(--goa-button-secondary-hover-border);
    color: var(--goa-button-secondary-hover-color-text);
    background-color: var(--goa-button-secondary-hover-color-bg);
  }
  button.secondary:focus,
  button.secondary:active {
    border: var(--goa-button-secondary-focus-border);
    background-color: var(--goa-button-secondary-focus-color-bg);
    color: var(--goa-button-secondary-focus-color-text);
    outline: none;
  }

  /* Tertiary */
  button.tertiary {
    border: var(--goa-button-tertiary-border);
    background-color: var(--goa-button-tertiary-color-bg);
    color: var(--goa-button-tertiary-color-text);
    text-decoration: underline;
  }
  button.tertiary:hover {
    background-color: var(--goa-button-tertiary-hover-color-bg);
    color: var(--goa-button-tertiary-hover-color-text);
  }
  button.tertiary:focus,
  button.tertiary:active {
    background-color: var(--goa-button-tertiary-focus-color-bg);
    color: var(--goa-button-tertiary-focus-color-text);
    outline: none;
  }

  /* Destructive Primary */
  .submit.destructive,
  .primary.destructive {
    background-color: var(--goa-button-primary-destructive-color-bg);
  }
  .submit.destructive:hover,
  .primary.destructive:hover {
    background-color: var(--goa-button-primary-destructive-hover-color-bg);
  }
  .submit.destructive:focus,
  .submit.destructive:active,
  .primary.destructive:focus,
  .primary.destructive:active {
    background-color: var(--goa-button-primary-destructive-focus-color-bg);
  }

  /* Destructive Secondary */
  .secondary.destructive {
    color: var(--goa-button-secondary-destructive-color-text);
    border: var(--goa-button-secondary-destructive-border);
  }
  .secondary.destructive:hover {
    color: var(--goa-button-secondary-destructive-hover-color-text);
    border: var(--goa-button-secondary-destructive-hover-border);
  }
  .secondary.destructive:focus,
  .secondary.destructive:active {
    color: var(--goa-button-secondary-destructive-focus-color-text);
    border: var(--goa-button-secondary-destructive-focus-border);
  }

  /* Destructive Tertiary */
  .tertiary.destructive {
    color: var(--goa-button-tertiary-destructive-color-text);
  }
  .tertiary.destructive:hover {
    color: var(--goa-button-tertiary-destructive-hover-color-text);
  }
  .tertiary.destructive:focus,
  .tertiary.destructive:active {
    color: var(--goa-button-tertiary-destructive-focus-color-text);
  }

  /* Inverse Primary */
  .submit.inverse,
  .primary.inverse {
    background-color: var(--goa-button-primary-inverse-color-bg);
    color: var(--goa-button-primary-inverse-color-text);
  }
  .submit.inverse:hover,
  .primary.inverse:hover {
    background-color: var(--goa-button-primary-inverse-hover-color-bg);
    color: var(--goa-button-primary-inverse-hover-color-text);
  }
  .submit.inverse:focus,
  .submit.inverse:active,
  .primary.inverse:focus,
  .primary.inverse:active {
    background-color: var(--goa-button-primary-inverse-focus-color-bg);
  }

  /* Inverse Secondary */
  .secondary.inverse {
    color: var(--goa-button-secondary-inverse-color-text);
    border: var(--goa-button-secondary-inverse-border);
    background-color: var(--goa-button-secondary-inverse-color-bg);
  }
  .secondary.inverse:hover {
    color: var(--goa-button-secondary-inverse-hover-color-text);
    border: var(--goa-button-secondary-inverse-hover-border);
  }
  .secondary.inverse:focus,
  .secondary.inverse:active {
    color: var(--goa-button-secondary-inverse-focus-color-text);
    border: var(--goa-button-secondary-inverse-focus-border);
  }

  /* Inverse Tertiary */
  .tertiary.inverse {
    color: var(--goa-button-tertiary-inverse-color-text);
  }
  .tertiary.inverse:hover {
    color: var(--goa-button-tertiary-inverse-hover-color-text);
  }
  .tertiary.inverse:focus,
  .tertiary.inverse:active {
    color: var(--goa-button-tertiary-inverse-focus-color-text);
  }

  /* Disabled */
  button:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
