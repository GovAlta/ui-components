<svelte:options tag="goa-textarea" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "./common/utils";

  export let name: string;
  export let value: string;
  export let placeholder: string;
  export let rows: number;

  export let disabled: string;

  $: isDisabled = toBoolean(disabled);

  function onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    e.target.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: false,
        cancelable: true,
        detail: { event: e, data: { name, value} },
      })
    );
    e.stopPropagation();
  }

</script>

<!-- HTML -->
<textarea
  name={name}
  class="goa-textarea"
  placeholder={placeholder}
  value={value || ""}
  rows={rows || 3}
  disabled={isDisabled}
  on:keyup={onChange}
></textarea>

<!-- Style -->
<style>
  .goa-textarea {
    display: block;
    width: 100%;

    box-sizing: border-box;

    outline: none;
    transition: box-shadow 0.1s ease-in;
    border: 1px solid var(--color-gray-700);
    border-radius: 3px;
    background: var(--color-white);
    color: var(--color-gray-900, #ccc);
    padding: var(--input-padding, 0.5rem);
    font-size: var(--input-font-size);
    font-family: var(--font-family);
  }

  .goa-textarea[readonly] {
    cursor: pointer;
  }

  .goa-textarea:hover {
    border-color: var(--color-blue-600);
  }
  .goa-textarea:active,
  .goa-textarea:focus,
  .goa-textarea:focus-within {
    box-shadow: 0 0 0 3px var(--color-orange);
  }
  .goa-textarea:disabled {
    border-color: var(--color-gray-200);
  }
  .goa-textarea:disabled:hover {
    border-color: var(--color-gray-200);
  }
  .goa-textarea:disabled:focus,
  .goa-textarea:disabled:active {
    box-shadow: none;
  }
</style>
