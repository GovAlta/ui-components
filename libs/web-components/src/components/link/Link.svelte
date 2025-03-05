<svelte:options customElement="goa-link" />

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";
  import { styles } from "../../common/utils";
  import { GoAIconType } from "../icon/Icon.svelte";

  export let leadingicon: GoAIconType;
  export let trailingicon: GoAIconType;
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
</script>

<div class={`link`} style={styles(calculateMargin(mt, mr, mb, ml))}>
  {#if leadingicon}<goa-icon
      class="leading-icon"
      type={leadingicon}
    />{/if}
  <slot />
  {#if trailingicon}<goa-icon type={trailingicon} />{/if}
</div>

<style>

  :global(::slotted(a)) {
    color: var(--goa-color-interactive-default);
  }

  .link {
    display: inline-flex;
    align-items: center;
    color: var(--goa-color-interactive-default);
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font: var(--goa-typography-body-m);
    text-decoration: underline;
    gap: 8px;
  }

  .link:hover {
    color: var(--goa-color-interactive-hover);
  }

</style>
