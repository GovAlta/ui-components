<svelte:options customElement="goa-icon-button" />

<script lang="ts">
  import { typeValidator, toBoolean } from "../../common/utils";
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

  // private
  $: css = `${variant} ${isInverted ? "inverted" : ""}`;
  $: isDisabled = toBoolean(disabled);
  $: isInverted = toBoolean(inverted);
  $: _paddingSize = {
    small: "0.25rem",
    medium: "0.25rem",
    large: "0.5rem",
    xlarge: "0.5rem",
  }[size];

  function handleClick(e) {
    e.target.dispatchEvent(
      new CustomEvent("_click", { composed: true, detail: { event: e } }),
    );
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
  style="{calculateMargin(mt, mr, mb, ml)}; --pading-size: {_paddingSize}"
  {title}
  disabled={isDisabled}
  class={css}
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

  button,
  button * {
    box-sizing: border-box;
  }

  button {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    background: transparent;
    cursor: pointer;
    border: none;
    border-radius: var(--goa-border-radius-m);
    padding: var(--pading-size);
    cursor: pointer;
    transition:
      background-color 100ms ease-in,
      transform 100ms ease-in-out;
  }

  button:active {
    transform: translateY(2px);
  }
  button:hover {
    outline: none;
  }

  button:focus,
  button:active {
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
    outline: none;
  }

  button:disabled {
    pointer-events: none;
    transform: none;
    cursor: default;
  }

  button:disabled:hover {
    background-color: transparent;
  }

  .color {
    color: var(--goa-color-interactive-default);
    fill: var(--goa-color-interactive-default);
  }

  .dark,
  .nocolor {
    color: var(--goa-color-greyscale-black);
    fill: var(--goa-color-greyscale-black);
  }

  .destructive {
    color: var(--goa-color-emergency-dark);
    fill: var(--goa-color-emergency-dark);
  }

  .light,
  .inverted {
    color: var(--goa-color-greyscale-white);
    fill: var(--goa-color-greyscale-white);
  }

  .color:hover,
  .color:focus,
  .color:active {
    color: var(--goa-color-interactive-hover);
    fill: var(--goa-color-interactive-hover);
  }

  .color:hover,
  .color:focus,
  .color:active,
  .nocolor:hover,
  .nocolor:focus,
  .nocolor:active,
  .dark:hover,
  .dark:focus,
  .dark:active {
    background-color: var(--goa-color-greyscale-100);
  }

  .destructive:hover,
  .destructive:focus,
  .destructive:active {
    background-color: var(--goa-color-emergency-light);
  }

  .light:hover,
  .light:focus,
  .light:active,
  .inverted:hover,
  .inverted:focus,
  .inverted:active {
    color: var(--goa-color-greyscale-white);
    fill: var(--goa-color-greyscale-white);
    background-color: var(--goa-color-greyscale-700);
  }

  .color:disabled {
    color: var(--goa-color-interactive-disabled);
    fill: var(--goa-color-interactive-disabled);
  }

  .destructive:disabled {
    opacity: 0.5;
  }

  .light:disabled,
  .dark:disabled,
  .nocolor:disabled,
  .inverted:disabled {
    opacity: 1;
    color: var(--goa-color-greyscale-500);
    fill: var(--goa-color-greyscale-500);
  }
</style>
