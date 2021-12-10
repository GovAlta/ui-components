<svelte:options tag="goa-checkbox" />

<!-- Script -->
<script lang="ts">
  // Required
  export let name: string;

  // Optional values
  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let indeterminate: boolean = false;
  export let error: boolean = false;
  export let content: string = '';
  export let value: string = '';

  $: id = `id-${name}`;

  function onChange(e: Event) {
    const newStatus = !checked;

    // An empty string is required as setting the second value to `null` caused the data to get
    // out of sync with the events.
    const _value = newStatus ? `${value}` : '';

    // Changing the internal state is ok, as it will be overridden with the propogated state.
    // This will allow the checkbox to behave like the native version in seeing the check state
    // change when the component is not bound to a data source.
    checked = newStatus;
    e.target.dispatchEvent(
      new CustomEvent('on:change', {
        composed: true,
        detail: { name, value: _value },
      })
    );
  }
</script>

<!-- View -->

<label
  for={id}
  class="goa-checkbox"
  class:goa-checkbox--disabled={disabled}
  class:goa-checkbox--error={error}
>
  <div class="goa-checkbox-container" class:goa-checkbox--selected={checked}>
    <input
      {id}
      {name}
      checked={checked}
      disabled={disabled}
      type="checkbox"
      value={`${value}`}
      on:change={onChange}
    />
    {#if checked}
      {#if indeterminate}
        <svg
          id="dashmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 15 2"
        >
          <rect width="15" height="2" />
        </svg>
      {:else}
        <svg
          id="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 12.18"
        >
          <path d="M5.09,9.64,1.27,5.82,0,7.09l5.09,5.09L16,1.27,14.73,0Z" />
        </svg>
      {/if}
    {/if}
  </div>
  <div class="goa-checkbox-text">
    <slot name="main">
      {content}
    </slot>
  </div>
</label>

<!-- Styles -->
<style>
  .goa-checkbox {
    display: inline-flex;
    align-items: center;
    min-height: calc(3rem - 4px);
    cursor: pointer;
  }
  .goa-checkbox input[type='checkbox'] {
    /* hide the input, but still make it tab-able */
    opacity: 0;
    position: absolute;
  }

  /* disabled state */
  .goa-checkbox--disabled {
    opacity: 30%;
  }

  label.goa-checkbox--disabled {
    cursor: default;
  }

  .goa-checkbox-container {
    box-sizing: border-box;
    border: 1px solid var(--color-gray-700);
    border-radius: 2px;
    background-color: var(--color-white);
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    justify-content: center;
    padding: 3px;
  }
  .goa-checkbox-container svg {
    fill: var(--color-white);
  }

  .goa-checkbox-container.goa-checkbox--selected {
    background-color: var(--color-blue-500);
  }

  .goa-checkbox-container:hover:not(.goa-checkbox--selected) {
    background-color: var(--color-gray-100);
  }

  .goa-checkbox-container:focus-within {
    box-shadow: 0 0 0 3px var(--color-orange-500);
    outline: none;
  }

  .goa-checkbox-text {
    padding-left: 0.5rem;
    user-select: none;
    font-weight: var(--fw-regular);
  }

  /* Error state */
  .goa-checkbox--error .goa-checkbox-container {
    border: 2px solid var(--color-red-500);
  }
</style>
