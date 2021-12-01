<svelte:options tag="goa-checkbox" />

<!-- Script -->
<script lang="ts">
  import { isTruthy } from './common/utils';

  // Required
  export let name: string;

  // Optional falsey values
  export let ischecked: string = '';
  export let isdisabled: string = '';
  export let isindeterminate: string = '';
  export let iserror: string = '';

  // Optional values
  export let content: string = '';
  export let value: string = '';

  // 'false' values make there way in, so these internal values prevent mixups
  let _checked,
    _disabled,
    _indeterminate,
    _error = false;

  $: _checked = isTruthy(ischecked);
  $: _disabled = isTruthy(isdisabled);
  $: _indeterminate = isTruthy(isindeterminate);
  $: _error = isTruthy(iserror);

  $: id = `id-${name}`;

  function onChange(e: Event) {
    const newStatus = !_checked;

    // An empty string is required as setting the second value to `null` caused the data to get
    // out of sync with the events.
    const _value = newStatus ? `${value}` : '';

    // Changing the internal state is ok, as it will be overridden with the propogated state.
    // This will allow the checkbox to behave like the native version in seeing the check state
    // change when the component is not bound to a data source.
    _checked = newStatus;
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
  class:goa-checkbox--disabled={_disabled}
  class:goa-checkbox--error={_error}
>
  <div class="goa-checkbox-container" class:goa-checkbox--selected={_checked}>
    <input
      {id}
      {name}
      checked={_checked}
      disabled={_disabled}
      type="checkbox"
      value={`${value}`}
      on:change={onChange}
    />
    {#if _checked}
      {#if _indeterminate}
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
