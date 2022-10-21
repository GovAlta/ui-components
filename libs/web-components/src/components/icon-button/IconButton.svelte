<svelte:options tag="goa-icon-button" />

<script lang="ts">
  import { toBoolean } from "../../common/utils";
  import type { IconSize, IconTheme, GoAIconType } from "../icon/Icon.svelte";

  type IconButtonVariant = "color" | "nocolor" | "dark";

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
</script>

<button
  style="--pading-size: {_paddingSize}"
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
    border-radius: 0.5rem;
    padding: var(--pading-size);
  }

  /* Primary */
  .color,.dark {
    color: var(--goa-color-interactive);
    fill: var(--goa-color-interactive);
    cursor: pointer;
    transition: background-color 100ms ease-in, transform 100ms ease-in;
  }

  .dark:not(.inverted){
    color: unset;
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

  button.dark:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  button.dark:focus,
  button.dark:active {
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 0 3px var(--color-white);
  }

</style>
