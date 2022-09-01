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
  $: css = `${variant} ${isInverted ? "inverted" : ""}`;
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
  title={title}
  disabled={isDisabled}
  class={css}
  data-testid={testId}
  on:click={handleClick}
>
  <goa-icon title={title} {type} {size} {theme} inverted={isInverted} />
</button>

<style>
  :host {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  button,
  button * {
    box-sizing: border-box;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    cursor: pointer;
    border: none;
  }

  .color {
    border-radius: 0.5rem;
    padding: calc(var(--size) / 4);
  }

  /* Primary */
  .color {
    border-radius: 0.5rem;
    color: var(--goa-color-interactive);
    fill: var(--goa-color-interactive);
    cursor: pointer;
    transition: background-color 100ms ease-in, transform 100ms ease-in;
  }

  .color:active,
  .nocolor:active {
    transform: scale(0.9);
    border: none;
  }

  .color:hover {
    background-color: var(--goa-color-primary-light);
  }

  .color.inverted:hover {
    background-color: var(--goa-color-primary-dark);
  }

  button:disabled {
    color: var(--color-gray-200);
    fill: var(--color-gray-200);
    transform: none;
    cursor: default;
  }
  button:disabled:hover {
    background-color: transparent;
  }
</style>
