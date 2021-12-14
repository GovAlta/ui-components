<svelte:options tag="goa-page-loader" />

<!-- Script -->
<script lang="ts">
import { fade } from "svelte/transition";

  import noScroll from "./common/no-scroll";
import { fromBoolean, toBoolean } from "./common/utils";
  import type { SpinnerType } from "./Spinner.wc.svelte";

  export let type: SpinnerType;
  export let message: string;
  export let progress: number = 0;
  export let show: string;
  export let variant: "fullscreen" | "inline";

  $: isVisible = toBoolean(show);
  $: fullscreen = variant === "fullscreen";
  $: inline = variant === "inline";


  $: {
    // automatically show if it is an inline spinner
    if (inline) {
      show = fromBoolean(true);
    }
  }

  $: ready = type && isVisible;
</script>

<!-- HTML -->
{#if ready}
  {#if fullscreen}
    <div transition:fade={{duration: 300}} use:noScroll={{enable: true}} class:fullscreen>
      <goa-spinner type={type} size="xlarge" progress={progress} />
      <div class="message">{message}</div>
    </div>
  {:else}
    <div class:inline>
      <goa-spinner type={type} size="xlarge" progress={progress} />
      <div class="message">{message}</div>
    </div>
  {/if}
{/if}

<!-- Style -->
<style>
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
