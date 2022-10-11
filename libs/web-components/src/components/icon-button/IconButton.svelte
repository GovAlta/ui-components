<svelte:options tag="goa-icon-button" />

<script lang="ts">
  import { toBoolean } from "../../common/utils";
  import type { IconSize, IconTheme, GoAIconType } from "../icon/Icon.svelte";

  type IconButtonVariant = "color" | "nocolor";

  // required
  export let icon: GoAIconType;

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
  <goa-icon title={title} type={icon} {size} {theme} inverted={isInverted} />
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
    box-sizing: border-box;
    justify-content: center;
    background: transparent;
    cursor: pointer;
    border: none;
    padding: 0 0.75rem;
  }

  /* Primary */
  .color {
    border-radius: 0.5rem;
    padding: calc(var(--size) / 4);
    color: var(--goa-color-interactive);
    fill: var(--goa-color-interactive);
    cursor: pointer;
    transition: background-color 100ms ease-in, transform 100ms ease-in;
  }

  .nocolor {
    border-radius: 0.5rem;
    padding: calc(var(--size) / 4);
  }

  button:hover {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-100);
    color: var(--goa-color-interactive--hover);
    outline: none;

  }

  button:focus,
  button:active {
    background-color: var(--color-gray-100);
    border-color: var(--goa-color-interactive--active);
    color: var(--goa-color-interactive--active);
    box-shadow: 0 0 0 3px var(--goa-color-interactive--focus);
    outline: none;
  }

  .color.inverted:hover {
    background-color: var(--goa-color-primary-dark);
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
</style>
