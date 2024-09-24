<svelte:options customElement="goa-link" />

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";
  import { styles } from "../../common/utils";
  import { GoAIconType } from "../icon/Icon.svelte";

  export let leadingicon: GoAIconType;
  export let trailingicon: GoAIconType;
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

</script>

<div 
  class={`link`}
  style={styles(
    calculateMargin(mt, mr, mb, ml),
  )}
>
  {#if leadingicon}<goa-icon type={leadingicon} fillcolor="#0070C4" />{/if}
  <slot />
  {#if trailingicon}<goa-icon type={trailingicon} fillcolor="#0070C4" />{/if}
</div>

<style>
  .link {
    display: inline-flex;
    align-items: center;
    color: var(--goa-color-interactive-default);
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font: var(--goa-typography-body-m);
  }

  .link:hover {
    text-decoration: underline;  
  }

  :global(::slotted(a)) {
    color: var(--goa-color-interactive-default);
  }
</style>

