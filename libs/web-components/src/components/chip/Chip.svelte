<svelte:options tag="goa-chip" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";

  import type { GoAIconType } from "../icon/Icon.svelte";

  export let leadingicon: GoAIconType;
  export let error: string;
  export let deletable: string;
  export let content: string;

  // booleans
  let _error: boolean;
  let _deletable: boolean;

  $: _error = toBoolean(error);
  $: _deletable = toBoolean(deletable);

  function onDelete(e: Event) {
    this.dispatchEvent(
      new CustomEvent("_onDeleteIconClick", { composed: true, bubbles: true }),
    );
    e.stopPropagation();
  }
</script>

<!-- HTML -->
<div class="chip" tabindex="0">
  {#if leadingicon}
    <goa-icon class="leading-icon" size="medium" type={leadingicon} />
  {/if}
  {content}
  {#if _deletable}
    <goa-icon
      class="delete-icon"
      size="medium"
      theme="filled"
      fillcolor="var(--color-gray-600)"
      hovercolor="var(--goa-color-interactive--hover)"
      type="close-circle"
      on:click={onDelete}
    />
  {/if}
</div>

<!-- Style -->
<style>
  .leading-icon {
    margin-left: -0.25rem;
  }

  .chip {
    vertical-align: middle;
    align-items: center;
    background-color: var(--color-gray-100);
    border-radius: 99px;
    box-sizing: border-box;
    color: var(--goa-color-text);
    display: inline-flex;
    flex-direction: row;
    font-size: var(--fs-sm);
    font-weight: var(--fw-regular);
    gap: 0.25rem;
    height: 2rem;
    justify-content: center;
    margin: 0.25rem;
    padding: 0 0.75rem;
  }

  .chip:hover {
    background-color: var(--color-gray-200);
  }

  .chip:focus {
    outline: 2px solid var(--goa-color-interactive--focus);
  }

  .delete-icon {
    cursor: pointer;
    margin-right: -0.25rem;
  }

  .error {
    background-color: var(--goa-color-status-emergency-light);
  }
</style>
