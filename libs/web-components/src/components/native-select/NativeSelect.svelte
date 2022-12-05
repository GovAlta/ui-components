<svelte:options tag="goa-select" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  import { ContextStore, getContext } from "../../common/context-store";
  import { toBoolean, validateRequired } from "../../common/utils";
  import type { SelectMessage } from "./types";

  // Public
  export let name: string;
  export let value: string;
  export let disabled: string = "false";
  export let error: string = "false";
  export let arialabel: string = "";

  // Private
  $: _disabled = toBoolean(disabled);
  $: _error = toBoolean(error);

  let _selectEl: HTMLSelectElement;
  let _ctx: ContextStore;
  let _options: SelectMessage[] = [];
  let _bound = false;
  $: {
    (async () => {
      await tick();
      if (name && !_bound) {
        _bound = true;
        _ctx = getContext(name);
        _ctx.subscribe(msg => {
          if (!msg) return;
          _options = [..._options, msg as SelectMessage];
        });
      }
    })();
  }

  onMount(() => {
    validateRequired("goa-select", { name, value });
  });

  function onChange(e) {
    e.target.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: false,
        cancelable: true,
        detail: { name, value: _selectEl.value },
      }),
    );
  }
</script>

<div class="wrapper" class:error={_error} class:disabled={_disabled}>
  <select
    on:change={onChange}
    bind:this={_selectEl}
    disabled={_disabled}
    aria-label={arialabel || name}
  >
    {#each _options as option (option.value)}
      <option selected={option.value === value} value={option.value}>
        {option.label || option.value}
      </option>
    {/each}
  </select>
</div>

<style>
  .wrapper {
    display: inline-block;
    border: 1px solid var(--color-gray-600);
    border-radius: var(--input-border-radius);
    background-color: var(--color-white);
    position: relative;
  }

  .wrapper.disabled {
    border-color: var(--color-gray-200);
    background-color: var(--color-gray-100);
  }

  select {
    border: none;
    background-color: transparent;
    color: var(--goa-color-text);
    font-size: var(--input-font-size);
    appearance: none;
    padding: calc(var(--input-padding) + 2px);
    outline: none;
    padding-right: 2rem;
  }

  .wrapper::after {
    position: absolute;
    right: 0;
    top: 0.5rem;
    vertical-align: middle;
    content: "";
    pointer-events: none;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.3rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='none' stroke='%23333333' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' /%3E%3C/svg%3E");
    background-repeat: none;
  }

  .wrapper:focus-within {
    box-shadow: 0 0 0 3px var(--goa-color-interactive--focus);
  }

  .wrapper.disabled::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='none' stroke='%23858585' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' /%3E%3C/svg%3E");
  }
</style>
