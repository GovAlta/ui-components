<svelte:options customElement={{
 tag: "goa-link",
  props: {
    action: { type: "String", attribute: "action", reflect: true},
    actionArg: { type: "String", attribute: "action-arg", reflect: true},
    actionArgs: { type: "Object", attribute: "action-args", reflect: true},
  }
}}/>

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";
  import { dispatch, styles } from "../../common/utils";
  import { GoAIconType } from "../icon/Icon.svelte";
  import { onMount } from "svelte";

  export let leadingicon: GoAIconType | null = null;
  export let trailingicon: GoAIconType | null = null;
  export let color: "interactive" | "light" = "interactive";

  export let action: string = "";
  export let actionArg: string = "";
  export let actionArgs: Record<string, unknown> = {};

  export let testid: string = "";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  let _rootEl: HTMLElement;

  onMount(() => {
    if (action) {
      _rootEl.addEventListener("click", handleClick);
    }
  })

  function handleClick(e: Event) {
    e.preventDefault();
    dispatch(e.target as Element, action, actionArg || actionArgs, { bubbles: true });
  }
</script>

<div
  class="link"
  class:interactive={color === "interactive"}
  class:light={color === "light"}
  bind:this={_rootEl}
  style={styles(calculateMargin(mt, mr, mb, ml))}
  data-testid={testid}
>
  {#if leadingicon}<goa-icon data-testid="leading-icon" type={leadingicon} />{/if}
  <slot />
  {#if trailingicon}<goa-icon data-testid="trailing-icon" type={trailingicon} />{/if}
</div>

<style>
  :global(::slotted(a)) {
    color: var(--goa-color-interactive-default);
  }

  .link {
    display: inline-flex;
    align-items: center;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font: var(--goa-typography-body-m);
    text-decoration: underline;
    gap: 8px;
  }

  .link.interactive {
    color: var(--goa-color-interactive-default);
  }
  .link.interactive:hover {
    color: var(--goa-color-interactive-hover);
  }

  .link.light {
    color: var(--goa-color-text-light);
  }
  .link.light:hover {
    color: var(--goa-color-text-light);
  }
</style>
