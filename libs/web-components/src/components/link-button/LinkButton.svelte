<svelte:options
  customElement={{
    tag: "goa-link-button",
    props: {
      action: { type: "String", attribute: "action", reflect: true },
      actionArg: { type: "String", attribute: "action-arg", reflect: true },
      actionArgs: { type: "Object", attribute: "action-args", reflect: true },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";

  import { calculateMargin, Spacing } from "../../common/styling";
  import { dispatch } from "../../common/utils";
  import { GoAIconType } from "../icon/Icon.svelte";

  /** @deprecated Use GoabButton instead. Sets the color theme. 'interactive' for blue, 'light' for white on dark backgrounds. */
  export let color: "interactive" | "light" = "interactive";
  /** @deprecated Use GoabButton instead. Icon displayed before the button text. */
  export let leadingicon: GoAIconType;
  /** @deprecated Use GoabButton instead. Icon displayed after the button text. */
  export let trailingicon: GoAIconType;
  /** @deprecated Use GoabButton instead. When true, prevents user interaction and applies disabled styling. */
  export let disabled: boolean = false;
  /** @deprecated Use GoabButton instead. Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** @deprecated Use GoabButton instead. Top margin. */
  export let mt: Spacing = null;
  /** @deprecated Use GoabButton instead. Right margin. */
  export let mr: Spacing = null;
  /** @deprecated Use GoabButton instead. Bottom margin. */
  export let mb: Spacing = null;
  /** @deprecated Use GoabButton instead. Left margin. */
  export let ml: Spacing = null;
  /** @deprecated Use GoabButton instead. Action identifier passed in click events for event delegation patterns. */
  export let action: string = "";
  /** @deprecated Use GoabButton instead. Single argument value passed with the action in click events. */
  export let actionArg: string = "";
  /** @deprecated Use GoabButton instead. Multiple argument values passed with the action in click events. */
  export let actionArgs: Record<string, unknown> = {};

  onMount(() => {
    console.warn(
      "GoabLinkButton is deprecated and will be removed in a future release. Use GoabButton instead.",
    );
  });

  let _el: HTMLButtonElement;

  function onClick(e: Event) {
    if (disabled) return;
    dispatch(_el, "_click", null, { bubbles: true });
    if (action) {
      dispatch(e.target as Element, action, actionArg || actionArgs, {
        bubbles: true,
      });
    }
    e.stopPropagation();
  }
</script>

<button
  bind:this={_el}
  class="link-button"
  class:interactive={color === "interactive"}
  class:light={color === "light"}
  class:disabled={disabled}
  disabled={disabled || undefined}
  data-testid={testid || null}
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
    box-shadow: 0 0 0 var(--goa-border-width-l)
      var(--goa-color-interactive-focus);
  }

  button.light {
    color: var(--goa-color-text-light);
  }
  button.light:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--goa-border-width-l)
      var(--goa-color-interactive-focus);
  }

  button.disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
  }
</style>
