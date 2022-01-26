<svelte:options tag="goa-page-loader" />

<!-- Script -->
<script lang="ts">
  import { fade } from "svelte/transition";

  import noScroll from "../../common/no-scroll";
  import { fromBoolean, toBoolean } from "../../common/utils";
  import type { SpinnerType } from "../spinner/Spinner.svelte";

  export let type: SpinnerType = 'infinite';
  export let message: string;
  export let progress: number = 0;
  export let visible: string;
  export let variant: "fullscreen" | "inline" = "inline";

  $: isVisible = toBoolean(visible) || variant === "inline";
  $: fullscreen = variant === "fullscreen";
  $: inline = variant === "inline";
  $: ready = type && isVisible;
</script>

<!-- HTML -->
{#if ready}
  {#if fullscreen}
    <div transition:fade={{duration: 300}} use:noScroll={{enable: true}} class:fullscreen>
      <goa-spinner type={type} size="xlarge" progress={progress || 0} />
      {#if message}
        <div class="message">{message}</div>
      {/if}
    </div>
  {:else}
    <div class:inline>
      <goa-spinner type={type} size="xlarge" progress={progress || 0} />
      {#if message}
        <div class="message">{message}</div>
      {/if}
    </div>
  {/if}
{/if}

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.9);
  }

  .inline {
    margin: 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .message {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
</style>
