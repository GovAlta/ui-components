<svelte:options tag="goa-radio-group" />

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { messageChannel } from './common/radio-store';
  import { toBoolean } from './common/utils';

  export let name: string;
  export let value: string;
  export let orientation = 'vertical';
  export let disabled: string;
  export let error: string;

  // private
  let isError: boolean

  $: isDisabled = toBoolean(disabled);
  $: {
    isError = toBoolean(error);
    messageChannel.update((prev) => {
      return {
        ...prev,
        [name]: {
          tag: name,
          payload: {
            value,
            disabled: isDisabled,
            error: isError,
          },
        },
      };
    });
  };

  let el: HTMLElement;
  let unsubscribe;
  onMount(() => {
    // set initial state
    messageChannel.update((prev) => {
      return {
        ...prev,
        [name]: {
          tag: name,
          payload: {
            value,
            disabled: isDisabled,
            error: isError,
          },
        },
      };
    });

    unsubscribe = messageChannel.subscribe((state) => {
      const payload = state[name].payload;
      if (payload.value !== value) {
        value = payload.value;
        el.dispatchEvent(new CustomEvent('_change', {
          composed: true,
          detail: { name, value: payload.value}
        }))
      }
    })
  });

  onDestroy(unsubscribe);
</script>

<!-- Html -->
<div>
  <div bind:this={el} class={`goa-radio-group--${orientation}`}>
    <slot />
  </div>
</div>

<style>
  .goa-radio-group--horizontal {
    display: flex;
    flex-direction: row;
  }

  .goa-radio-group--vertical {
    display: inline-flex;
    flex-direction: column;
  }
</style>
