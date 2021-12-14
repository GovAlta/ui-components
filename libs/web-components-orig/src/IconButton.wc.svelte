<svelte:options tag="goa-icon-button" />

<script lang="ts">
  import { toBoolean } from "./common/utils";
  import type { IconSize, IconStyle, GoAIconType } from "./Icon.wc.svelte";

  // required
  export let type: GoAIconType;

  // optional
  export let size: IconSize = "medium";
  export let style: IconStyle = "outline";
  export let title: string = "";
  export let testId: string = "";
  export let disabled: string = "";
  export let inverted: string;

  $: isInverted = toBoolean(inverted);

  // private
  $: css = `goa-icon-button goa-icon-button-primary ${isInverted ? 'goa-icon-button--inverted' : ''}`;
  $: isDisabled = toBoolean(disabled);

  $: _size = {
    small: '1rem',
    medium: '1.5rem',
    large: '2rem',
  }[size];

  function clickHandler(e) {
    e.target.dispatchEvent(new CustomEvent("on:click", { composed: true, detail: { event: e } }));
  }
</script>

<button style="--size: {_size}" {title} disabled={isDisabled} class={css} data-testid={testId} on:click={clickHandler}>
  <goa-icon {type} {size} {style} inverted={isInverted} />
</button>

<style>
  .goa-icon-button {
    display: inline-flex;
    align-items: center;
    border-radius: 0.5rem;
    box-sizing: border-box;
    background: transparent;
    cursor: pointer;
    border: none;
    padding: calc(var(--size) / 4)
  }

  /* Primary */
  .goa-icon-button-primary {
    border-radius: 0.5rem;
    color: var(--color-blue-500);
    fill: var(--color-blue-500);
    cursor: pointer;
    transition: background-color 100ms ease-in, transform 100ms ease-in;
  }

  .goa-icon-button-primary:active {
    transform: scale(0.9);
  }

  .goa-icon-button-primary:hover {
    background-color: var(--color-blue-100);
  }

  .goa-icon-button-primary.goa-icon-button--inverted:hover {
    background-color: var(--color-blue);
    filter: brightness(1.5);
  }
</style>
