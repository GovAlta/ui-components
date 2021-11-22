<svelte:options tag="goa-button" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  export let text = "";

  function clickHandler(e) {
    this.dispatchEvent(new CustomEvent("on:click", { composed: true }));
    e.stopPropagation();
  }

  onMount(async () => {
    await tick();
  });
</script>

<button class="primary" on:click={clickHandler}>
  {#if text}
    {text}
  {:else}
    <slot />
  {/if}
</button>

<style>
  button {
    border-radius: 0.25rem;
    border: 2px solid var(--color-blue-500, "blue");
    box-sizing: border-box;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    line-height: 2.375rem;
    padding: 0 0.75rem;

    transition: transform 0.1s ease-in-out, background-color 0.2s ease-in-out;
    transform: scale(1);
  }

  button:disabled {
    pointer-events: none;
    color: var(--color-gray-700);
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-100);
  }

  button:active {
    transform: scale(0.98);
  }

  button.primary {
    border: 2px solid var(--color-blue-500, blue);
    background: var(--color-blue-500, blue);
    color: var(--color-white, white);
  }

  button:hover {
    border-color: var(--color-blue-600);
    background: var(--color-blue-600);
  }

  button:focus,
  button:active {
    border-color: var(--color-blue-600);
    box-shadow: 0 0 0 3px var(--color-orange-500);
    background: var(--color-blue-600);
    outline: none;
  }
</style>
