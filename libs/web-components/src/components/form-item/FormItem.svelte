<svelte:options tag="goa-form-item" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";

  // Optional
  export let label: string = "";
  export let helptext: string = "";
  export let error: string = "";
  export let optional: string;

  $: isOptional = toBoolean(optional);
</script>

<!-- HTML -->
<div class="goa-form-item">
  {#if label}
    <label for="">
      {label}
      {#if isOptional}
        <em>(optional)</em>
      {/if}
    </label>
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
    flex: 1 1 auto;
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  * {
    box-sizing: border-box;
  }

  label {
    display: block;
    font-weight: bold;
    color: #333;
    font-size: var(--fs-base);
    padding: 0.5rem 0;
    max-height: 2.5rem;
  }

  label em {
    color: var(--color-gray-600);
    font-weight: var(--fw-regular);
    font-size: var(--fs-sm);
    font-style: normal;
  }

  .form-item-input {
    margin-bottom: 0.25rem;
  }

  .help-msg {
    font-size: var(--fs-sm);
    color: var(--color-black);
    /* margin-top: 0.25rem; */
  }

  .error-msg {
    font-size: var(--fs-sm);
    color: var(--goa-color-status-emergency);
    margin-bottom: 0.25rem;
  }
</style>
