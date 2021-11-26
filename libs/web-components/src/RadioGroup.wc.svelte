<svelte:options tag="goa-radio-group" />

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { messageChannel } from './common/radio-store';

  export let name: string;
  export let value: string;
  export let orientation = 'vertical';
  export let isdisabled = 'false';

  let el: HTMLElement;
  let unsubscribe;
  onMount(() => {
    // set initial state
    messageChannel.update((prev) => {
      return {
        ...prev,
        [name]: {
          tag: name,
          payload: value,
        },
      };
    });

    unsubscribe = messageChannel.subscribe((state) => {
      const _value = state[name].payload;
      if (_value !== value) {
        value = _value;
        el.dispatchEvent(new CustomEvent('on:change', { composed: true, detail: { name, value: _value } }))
      }
    })
  });

  onDestroy(unsubscribe);
</script>

<!-- Html -->
<div bind:this={el} class={`goa-radio-group--${orientation}`}>
  <slot />
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
