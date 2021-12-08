<svelte:options tag="goa-page-loader" />

<!-- Script -->
<script lang="ts">
import { fade } from "svelte/transition";

  import noScroll from "./common/no-scroll";
  import type { SpinnerType } from "./Spinner.wc.svelte";

  export let type: SpinnerType;
  export let show: boolean = false;
  export let message: string;
  export let progress: number = 0;
  export let fullscreen: boolean = false;

  $: ready = type && show;
</script>

<!-- HTML -->
{#if ready}
  <div use:noScroll={{enable: fullscreen}}
    class:fullscreen
    class:inline={!fullscreen}
  >
    <goa-spinner type={type} size="xlarge" progress={progress} />
    <div class="message">{message}</div>
  </div>
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
