<svelte:options tag="goa-form-item" />

<!-- Script -->
<script lang="ts">
  export let helptext: string = "";
  export let name: string = "";
  export let error: string = "";
  export let label: string = "";
  export let optional: boolean = false;
</script>

<!-- HTML -->
<div class="goa-form-item">
  {#if label}
    <label for={name}>
      {label}
      {#if optional}
        <em>(optional)</em>
      {/if}
    </label>
  {/if}
  <slot />
  {#if error}
    <div class="error-msg">{error}</div>
  {/if}
  {#if helptext }
    <div class="help-msg">{helptext}</div>
  {/if}
</div>

<!-- Style -->
<style>
  :host {
    flex: 1 1 auto;
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
    color: var(--color-gray-700);
    font-weight: var(--fw-regular);
    font-size: var(--fs-sm);
    font-style: normal;
  }

  .help-msg {
    font-size: var(--fs-sm);
    color: var(--color-gray-900);
    line-height: calc(var(--fs-sm) + 0.5rem);
  }

  .error-msg {
    font-size: var(--fs-sm);
    line-height: calc(var(--fs-sm) + 0.5rem);
    color: var(--color-red);
  }
</style>
