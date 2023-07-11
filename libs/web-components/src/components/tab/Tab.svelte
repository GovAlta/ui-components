<svelte:options tag="goa-tab"/>

<script lang="ts">
  import {toBoolean} from "../../common/utils";

  // ======
  // Public
  // ======

  export let heading: string = "";

  // =======
  // Private
  // =======

  export let open: string = "false";

  let _isOpen: boolean;
  $: _isOpen = toBoolean(open);

</script>

<slot style="display:none" name="heading">{heading}</slot>
{#if _isOpen}
  <div role="tabpanel">
    <slot />
  </div>
{/if}

<style>
  [role=tabpanel] {
    padding-top: 2rem;
  }
</style>