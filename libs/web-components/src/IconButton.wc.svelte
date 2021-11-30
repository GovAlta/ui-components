<svelte:options tag="goa-icon-button" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import type { IconSize, IconVariant, IconStyle, GoAIconType } from "./Icon.wc.svelte";

  // required
  export let type: GoAIconType;

  // optional
  export let size: IconSize = "medium";
  export let variant: IconVariant = "primary";
  export let style: IconStyle = "outline";
  export let title: string = "";
  export let disabled: string = "";
  export let testId: string = "";
  export let inverted: boolean = false;

  // private
  let css: string;
  $: css = `goa-icon-button goa-icon-button-${variant} ${inverted ? 'goa-icon--inverted' : ''}`;
  $: _disabled = disabled !== "false" && disabled !== "";

  onMount(async () => {
    await tick();
  });

  function clickHandler(e) {
    e.target.dispatchEvent(new CustomEvent("on:click", { composed: true, detail: { event: e } }));
  }
</script>

<button {title} disabled={_disabled} class={css} data-testid={testId} on:click={clickHandler}>
  <goa-icon {type} {size} {style} {inverted} />
</button>

<style>
  .goa-icon-button {
    box-sizing: border-box;
    background: transparent;
    cursor: pointer;
    border: none;
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

  /* Secondary */
  .goa-icon-button-secondary {
    border-radius: 0.5rem;
    transition: background-color 100ms ease-in, transform 100ms ease-in;
    cursor: pointer;
  }

  .goa-icon-button-secondary:active {
    transform: scale(0.9);
  }

  .goa-icon-button-secondary:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #000;
    fill: #000;
  }

  /* tertiary */
  .goa-icon-button-tertiary {
    transition: background-color 100ms ease-in, transform 100ms ease-in;
    cursor: pointer;
    color: var(--color-black);
    fill: var(--color-black);
  }

  .goa-icon-button-tertiary:active {
    transform: scale(0.9);
  }

  .goa-icon-button-tertiary:hover {
    color: #000;
    fill: #000;
  }

  .goa-icon--inverted:hover {
    background: rgba(0, 0, 0, 0.1);
  }
</style>
