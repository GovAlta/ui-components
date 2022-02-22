<svelte:options tag="goa-icon-button" />

<script lang="ts">
  import { toBoolean } from "../../common/utils";
  import type { IconSize, IconTheme, GoAIconType } from "../icon/Icon.svelte";

  type IconButtonVariant = "color" | "nocolor";

  // required
  export let type: GoAIconType;

  // optional
  export let size: IconSize = "medium";
  export let theme: IconTheme = "outline";
  export let variant: IconButtonVariant = "color";

  export let title: string = "";
  export let testId: string = "";
  export let disabled: string;
  export let inverted: string;

  // private
  $: css = `goa-icon-button goa-icon-button--${variant} ${
    isInverted ? "goa-icon-button--inverted" : ""
  }`;
  $: isDisabled = toBoolean(disabled);
  $: isInverted = toBoolean(inverted);

  $: _size = {
    small: "1rem",
    medium: "1.5rem",
    large: "2rem",
  }[size];

  function handleClick(e) {
    e.target.dispatchEvent(
      new CustomEvent("_click", { composed: true, detail: { event: e } }),
    );
  }
</script>

<button
  style="--size: {_size}"
  {title}
  disabled={isDisabled}
  class={css}
  data-testid={testId}
  on:click={handleClick}
>
  <goa-icon {type} {size} {theme} inverted={isInverted} />
</button>

<style>
  :host {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  .goa-icon-button,
  .goa-icon-button * {
    box-sizing: border-box;
  }

  .goa-icon-button {
    display: inline-flex;
    align-items: center;
    background: transparent;
    cursor: pointer;
    padding: 0;
    border: none;
  }

  .goa-icon-button--color {
    border-radius: 0.5rem;
    padding: calc(var(--size) / 4);
  }

  /* Primary */
  .goa-icon-button--color {
    border-radius: 0.5rem;
    color: var(--goa-color-interactive);
    fill: var(--goa-color-interactive);
    cursor: pointer;
    transition: background-color 100ms ease-in, transform 100ms ease-in;
  }

  .goa-icon-button--color:active,
  .goa-icon-button--nocolor:active {
    transform: scale(0.9);
  }

  .goa-icon-button--color:hover {
    background-color: var(--goa-color-primary-light);
  }

  .goa-icon-button--color.goa-icon-button--inverted:hover {
    background-color: var(--goa-color-primary-dark);
  }

  .goa-icon-button:disabled {
    color: var(--color-gray-200);
    fill: var(--color-gray-200);
    transform: none;
    cursor: default;
  }
  .goa-icon-button:disabled:hover {
    background-color: transparent;
  }
</style>
