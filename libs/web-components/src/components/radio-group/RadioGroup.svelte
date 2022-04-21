<svelte:options tag="goa-radio-group" />

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { deleteContext, ContextStore, createContext } from '../../common/context-store';
  import { OPTION_CHANGE, RadioMessage } from "./types";
  import { toBoolean } from '../../common/utils';
  import { PROP_CHANGE } from './types';

  export let name: string;
  export let value: string;
  export let orientation = 'vertical';
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";

  // private
  let isError: boolean
  let ctx: ContextStore;

  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);

  // reactive updates to exposed properties
  $: {
    ctx?.notify({
      type: PROP_CHANGE,
      value,
      disabled: isDisabled,
      error: isError,
    });
  }

  let el: HTMLElement;

  onMount(() => {
    ctx = createContext(name);
    ctx.subscribe((state) => {
      switch (state?.type) {
        case OPTION_CHANGE: {
          const _state = state as RadioMessage;
          // This isn't required when the component is properly bound, but this
          // will make the component appear to work properly before the component
          // is properly bound.
          ctx.notify({
            type: PROP_CHANGE,
            value: _state.value,
            disabled: _state.disabled,
            error: _state.error,
          });

          el.dispatchEvent(new CustomEvent('_change', {
            composed: true,
            detail: { name, value: state.value}
          }))
        }
      }
    });

  });

  onDestroy(() => {
    deleteContext(name);
  });

</script>

<!-- Html -->
<div
  bind:this={el}
  class={`goa-radio-group--${orientation}`}
  data-testid={testid}
>
  <slot />
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  .goa-radio-group--horizontal {
    display: flex;
    flex-direction: row;
  }

  .goa-radio-group--vertical {
    display: inline-flex;
    flex-direction: column;
  }
</style>
