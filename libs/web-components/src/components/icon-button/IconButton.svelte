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
    ["color", "nocolor", "dark", "destructive"],
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
  }[size];

  function handleClick(e) {
    e.target.dispatchEvent(
      new CustomEvent("_click", { composed: true, detail: { event: e } }),
    );
  }

  onMount(() => {
    validateVariant(variant);
  });
</script>

<button
  style="{calculateMargin(mt, mr, mb, ml)}; --pading-size: {_paddingSize}"
  {title}
  disabled={isDisabled}
  class={css}
  data-testid={testid}
  on:click={handleClick}
>
  <goa-icon {title} type={icon} {size} {theme} inverted={isInverted} />
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
  }

  /* Primary */
  .color,
  .dark {
    color: var(--goa-color-interactive-default);
    fill: var(--goa-color-interactive-default);
    cursor: pointer;
    transition:
      background-color 100ms ease-in,
      transform 100ms ease-in;
  }

  .dark:not(.inverted) {
    color: unset;
  }

  button:hover:not(.destructive) {
    background-color: var(--goa-color-greyscale-100);
    border-color: var(--goa-color-greyscale-100);
    color: var(--goa-color-interactive-hover);
    outline: none;
  }

  button:focus:not(.destructive),
  button:active:not(.destructive) {
    background-color: var(--goa-color-greyscale-100);
    border-color: var(--goa-color-interactive-focus);
    color: var(--goa-color-interactive-focus);
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
    outline: none;
  }

  .color.inverted:hover {
    background-color: var(--goa-color-interactive-hover);
  }

  .destructive {
    color: var(--goa-color-emergency-dark);
    fill: var(--goa-color-emergency-dark);
  }

  .destructive:hover {
    background-color: var(--goa-color-emergency-light);
    border-color: var(--goa-color-emergency-light);
    outline: none;
  }

  .destructive:focus,
  .destructive:active {
    background-color: var(--goa-color-emergency-light);
    border-color: var(--goa-color-interactive-focus);
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
    outline: none;
  }

  button:disabled {
    pointer-events: none;
    opacity: 0.5;
    transform: none;
    cursor: default;
  }

  button:disabled:hover {
    background-color: transparent;
  }

  button.dark:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  button.dark:focus,
  button.dark:active {
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 0 3px var(--goa-color-greyscale-white);
  }
</style>
