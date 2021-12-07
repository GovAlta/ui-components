<svelte:options tag="goa-radio-item" />

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { isTruthy } from './common/utils';
  import { messageChannel } from './common/radio-store';

  export let value: string;
  export let label: string;
  export let name: string;
  export let isdisabled = '';
  export let ischecked: '';
  export let iserror: '';

  $: _disabled = isTruthy(isdisabled);
  $: _checked = isTruthy(ischecked);
  $: _error = isTruthy(iserror);

  let unsubscribe;

  // Hooks

  onMount(() => {
    unsubscribe = messageChannel.subscribe((channel) => {
      const msg = channel[name]
      if (msg?.tag !== name) {
        return;
      }
      _checked = msg.payload === value;
    });
  });

  onDestroy(unsubscribe);

  // Events

  function onChange(e) {
    _checked = !_checked;
    if (_checked) {
      messageChannel.update((prev) => {
        return {
          ...prev,
          [name]: {
            tag: name,
            payload: value,
          },
        };
      });
    }
  }
</script>

<!-- HTML -->

<label
  class="goa-radio"
  class:goa-radio--disabled={_disabled}
  class:goa-radio--error={_error}
  >
  <input
    type="radio"
    {name}
    {value}
    checked={_checked}
    disabled={_disabled}
    on:change={onChange}
  />
  <div class="goa-radio-icon" />
  <span class="goa-radio-label">
    <slot>
      {label}
    </slot>
  </span>
</label>

<style>
  label.goa-radio {
    --goa-border-color: var(--color-gray-700);
    --goa-border-color--checked: var(--color-blue-500);
    --goa-radio-color--error: var(--color-red);
    --goa-radio-outline-color: var(--color-orange);
    --goa-radio-outline-width: 3px;
    --goa-radio-diameter: 1.5rem;
    --goa-radio-border-width: 1px;
    --goa-radio-border-width--checked: 7px;

    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    min-height: 3rem;
  }

  .goa-radio:hover {
    cursor: pointer;
  }

  .goa-radio *,
  .goa-radio *:before,
  .goa-radio *:after {
    box-sizing: border-box;
  }

  .goa-radio input[type='radio'] {
    display: none;
  }

  .goa-radio-label {
    padding: 0.5rem;
    font-weight: var(--fw-regular);
  }

  .goa-radio-icon {
    display: inline-block;
    height: var(--goa-radio-diameter);
    width: var(--goa-radio-diameter);
    border-radius: 50%;
    background-color: #fff;
    transition: box-shadow 100ms ease-in-out;
  }

  .goa-radio:focus > input:not(:disabled) ~ .goa-radio-icon {
    box-shadow: 0 0 0 var(--goa-radio-outline-width)
      var(--goa-radio-outline-color);
  }

  .goa-radio--disabled:hover {
    cursor: default;
  }

  /* States */

  /* Checked */
  input[type='radio']:checked ~ .goa-radio-icon {
    border: var(--goa-radio-border-width--checked) solid
      var(--goa-border-color--checked);
  }

  /* Not checked */
  input[type='radio']:not(:checked) ~ .goa-radio-icon {
    border: var(--goa-radio-border-width) solid var(--goa-border-color);
  }

  /* Disabled */
  input[type='radio']:disabled ~ .goa-radio-icon {
    border: var(--goa-radio-border-width) solid var(--goa-border-color);
    opacity: 0.3;
  }

  /* Disabled and checked */
  input[type='radio']:disabled:checked ~ .goa-radio-icon {
    border: var(--goa-radio-border-width--checked) solid
      var(--goa-border-color--checked);
    opacity: 0.3;
  }

  /* Error */
  .goa-radio--error input[type='radio']:checked ~ .goa-radio-icon {
    border: 7px solid var(--goa-radio-color--error);
  }
  .goa-radio--error input[type='radio']:not(:checked) ~ .goa-radio-icon {
    border: 2px solid var(--goa-radio-color--error);
  }
</style>
