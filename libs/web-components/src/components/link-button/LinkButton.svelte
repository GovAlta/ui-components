<svelte:options customElement={{
  tag: "goa-link-button",
  props: {
    action: { type: "String", attribute: "action", reflect: true},
    actionArg: { type: "String", attribute: "action-arg", reflect: true},
    actionArgs: { type: "Object", attribute: "action-args", reflect: true},
  }
}}/>

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";
  import { dispatch } from "../../common/utils";
  import { GoAIconType } from "../icon/Icon.svelte";

  export let color: "interactive" | "light" = "interactive";
  export let leadingicon: GoAIconType;
  export let trailingicon: GoAIconType;
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  export let action: string = "";
  export let actionArg: string = "";
  export let actionArgs: Record<string, unknown> = {};

  let _el: HTMLButtonElement;

  function onClick(e: Event) {
    dispatch(_el, "_click", null, { bubbles: true })
    if (action) {
      dispatch(e.target as Element, action, actionArg || actionArgs, { bubbles: true });
    }
    e.stopPropagation();
  }
</script>

<button
  bind:this={_el}
  class="link-button"
  class:interactive={color === "interactive"}
  class:light={color === "light"}
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

  button.interactive {
    color: var(--goa-color-interactive-default);
  }
  button.interactive:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--goa-border-width-l) var(--goa-color-interactive-focus);
  }

  button.light {
    color: var(--goa-color-text-light);
  }
  button.light:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--goa-border-width-l) var(--goa-color-interactive-focus);
  }
</style>

