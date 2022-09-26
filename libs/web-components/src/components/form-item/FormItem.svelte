<svelte:options tag="goa-form-item" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";

  // Optional
  export let label: string = "";
  export let helptext: string = "";
  export let error: string = "";
  export let optional: string = "false";

  $: isOptional = toBoolean(optional);
</script>

<!-- HTML -->
<div class="goa-form-item">
  {#if label}
    <div class="label">
      {label}
      {#if isOptional}
        <em>(optional)</em>
      {/if}
    </div>
  {/if}
  <div class="form-item-input">
    <slot />
  </div>
  {#if error}
    <div class="error-msg">{error}</div>
  {/if}
  {#if helptext}
    <div class="help-msg">{helptext}</div>
  {/if}
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  * {
    box-sizing: border-box;
  }

  .label {
    display: block;
    font-weight: var(--fw-bold);
    color: var(--goa-color-text);
    font-size: var(--fs-base);
    padding: 0.5rem 0;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .label em {
    color: var(--color-gray-600);
    font-weight: var(--fw-regular);
    font-size: var(--fs-sm);
    line-height: var(--lh-sm);
    font-style: normal;
  }

  .form-item-input {
    margin-bottom: 0.25rem;
  }

  .help-msg {
    font-size: var(--fs-sm);
    color: var(--goa-color-text);
    margin-right: 56px;
  }

  .error-msg {
    font-size: var(--fs-sm);
    color: var(--goa-color-interactive--error);
    margin-bottom: 0.25rem;
  }
</style>
