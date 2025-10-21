<svelte:options customElement={{
  tag: "goa-icon-button",
  props: {
    actionArg: { type: "String", attribute: "action-arg"},
    actionArgs: { type: "Object", attribute: "action-args"},
  }
}} />

<script lang="ts">
  import { typeValidator, toBoolean, dispatch } from "../../common/utils";

  import type { IconSize, IconTheme, GoAIconType } from "../icon/Icon.svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount } from "svelte";

  // Validator
  const [Variants, validateVariant] = typeValidator(
    "Icon Button Variant",
    ["color", "nocolor", "light", "dark", "destructive"],
    true,
  );

  type Variant = (typeof Variants)[number];

  // required
  export let icon: GoAIconType;

  // optional
  export let size: IconSize = "medium";
  export let theme: IconTheme = "outline";
  export let variant: Variant = "color";
  export let title: string = "";
  export let testid: string = "";
  export let disabled: string = "false";
  export let inverted: string = "false";
  export let arialabel: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  export let action: string = "";
  export let actionArg: string = "";
  export let actionArgs: Record<string, unknown> = {};

  // private
  $: css = `${variant} ${isInverted ? "inverted" : ""}`;
  $: isDisabled = toBoolean(disabled);
  $: isInverted = toBoolean(inverted);

  function handleClick(e: Event) {
    e.target?.dispatchEvent(
      new CustomEvent("_click", { composed: true, detail: { event: e } }),
    );

    if (action) {
      dispatch(e.target as Element, action, actionArg || actionArgs, { bubbles: true });
    }
  }

  onMount(() => {
    validateVariant(variant);

    if (variant == "nocolor") {
      console.warn(
        "goa-icon-button nocolor variant is deprecated. Instead use dark.",
      );
    }

    if (isInverted) {
      console.warn(
        "goa-icon-button inverted is deprecated. Instead use light variant.",
      );
    }
  });
</script>

<button
  class={`goa-icon-button goa-icon-button--${size} ${css}`}
  style={calculateMargin(mt, mr, mb, ml)}
  {title}
  disabled={isDisabled}
  data-testid={testid}
  on:click={handleClick}
  aria-label={arialabel}
>
  <goa-icon {title} type={icon} {size} {theme} />
</button>

<style>
  :host {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  :host:focus-within,
  :host:focus-visible {
    outline: none !important;
  }

  .goa-icon-button--small {
    padding: var(--goa-icon-button-small-padding, var(--goa-icon-button-medium-padding));
  }

  .goa-icon-button--medium {
    padding: var(--goa-icon-button-medium-padding);
  }

  .goa-icon-button--large {
    padding: var(--goa-icon-button-large-padding);
  }

  button {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    background: transparent;
    cursor: pointer;
    border: none;
    border-radius: var(--goa-icon-button-border-radius, var(--goa-icon-button-medium-border-radius));
    transition: background-color 0.2s ease-in-out,
    color 0.2s ease-in-out,
    transform 0.1s ease-in-out;
  }

  button:active {
    transform: translateY(2px);
  }

  button:hover {
    outline: none;
  }

  button:focus-visible {
    box-shadow: 0 0 0 var(--goa-icon-button-focus-border-width, 3px) var(--goa-icon-button-focus-border-color, var(--goa-color-interactive-focus));
    outline: none;
  }

  button:disabled {
    pointer-events: none;
    transform: none;
    cursor: default;
    opacity: 1;
  }

  button:disabled:hover {
    background-color: transparent;
  }

  /*  Type: color */
  .color {
    color: var(--goa-icon-button-default-color);
    fill: var(--goa-icon-button-default-color);
  }

  .color:hover:not(:focus-visible) {
    color: var(--goa-icon-button-default-hover-color);
    fill: var(--goa-icon-button-default-hover-color);
    background-color: var(--goa-icon-button-default-hover-color-bg);
  }

  .color:disabled {
    color: var(--goa-icon-button-default-disabled-color);
    fill: var(--goa-icon-button-default-disabled-color);
  }

  /*  Type: dark */
  .dark {
    color: var(--goa-icon-button-dark-color);
    fill: var(--goa-icon-button-dark-color);
  }

  .dark:hover:not(:focus-visible),
  .dark:active {
    background-color: var(--goa-icon-button-dark-hover-color-bg);
  }

  .dark:disabled {
    color: var(--goa-icon-button-dark-disabled-color, var(--goa-icon-button-dark-disabled-color-bg));
    fill: var(--goa-icon-button-dark-disabled-color, var(--goa-icon-button-dark-disabled-color-bg));
  }

  /*  Type: nocolor (same as dark, not documented) */
  .nocolor {
    color: var(--goa-icon-button-dark-color);
    fill: var(--goa-icon-button-dark-color);
  }

  .nocolor:hover:not(:focus-visible),
  .nocolor:active {
    background-color: var(--goa-icon-button-dark-hover-color-bg);
  }

  /*  Type: destructive */
  .destructive {
    color: var(--goa-icon-button-destructive-color);
    fill: var(--goa-icon-button-destructive-color);
  }

  .destructive:hover:not(:focus-visible),
  .destructive:active {
    color: var(--goa-icon-button-destructive-hover-color);
    fill: var(--goa-icon-button-destructive-hover-color);
    background-color: var(--goa-icon-button-destructive-hover-color-bg);
  }

  .destructive:disabled {
    color: var(--goa-icon-button-destructive-disabled-color);
    fill: var(--goa-icon-button-destructive-disabled-color);
  }

  /*  Type: light */
  .light {
    color: var(--goa-icon-button-light-color);
    fill: var(--goa-icon-button-light-color);
  }

  .light:hover:not(:focus-visible),
  .light:active {
    background-color: var(--goa-icon-button-light-hover-color-bg);
  }

  .light:disabled {
    color: var(--goa-icon-button-light-disabled-color);
    fill: var(--goa-icon-button-light-disabled-color);
  }

  /*  Type: inverted (same as light, not documented) */
  .inverted {
    color: var(--goa-icon-button-light-color);
    fill: var(--goa-icon-button-light-color);
  }

  .inverted:hover:not(:focus-visible),
  .inverted:active {
    background-color: var(--goa-icon-button-light-hover-color-bg);
  }

</style>
