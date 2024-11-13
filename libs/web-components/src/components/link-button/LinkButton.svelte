<svelte:options customElement="goa-link-button" />

<script lang="ts" context="module">
  export type LinkButtonType = "get-started" | "primary" | "secondary" | "tertiary";
</script>

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";
  import { dispatch } from "../../common/utils";
  import { GoAIconType } from "../icon/Icon.svelte";

  export let type: LinkButtonType = "tertiary"
  export let leadingicon: GoAIconType;
  export let trailingicon: GoAIconType;
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  let _el: HTMLButtonElement;

  function onClick(e: Event) {
    dispatch(_el, "_click", null, { bubbles: true })
    e.stopPropagation();
  }
</script>

<button
  bind:this={_el}
  class={`link-button ${type}`}
  style={calculateMargin(mt, mr, mb, ml)}
  on:click={onClick}
>
  {#if leadingicon}<goa-icon type={leadingicon} fillcolor="#0070C4" />{/if}
  <slot />
  {#if trailingicon}<goa-icon type={trailingicon} fillcolor="#0070C4" />{/if}
</button>

<style>
  .link-button {
    display: inline-flex;
    align-items: center;
    color: var(--goa-color-interactive-default);
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font: var(--goa-typography-body-m);
    text-decoration: underline;
  }

  :global(::slotted(a)) {
    color: var(--goa-color-interactive-default);
  }
</style>

