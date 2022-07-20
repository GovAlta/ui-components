<svelte:options tag="goa-circular-progress" />

<!-- Script -->
<script lang="ts">
import { onMount, tick } from "svelte";

  import { fade } from "svelte/transition";

  import noScroll from "../../common/no-scroll";
  import { toBoolean } from "../../common/utils";
  import type { SpinnerType } from "../spinner/Spinner.svelte";

  // Optional
  export let type: SpinnerType = "infinite";
  export let variant: "fullscreen" | "inline" = "inline";
  export let size: "small" | "large" = "large";
  export let message: string = "";
  export let progress: number = 0;
  export let visible: string = "false";

  $: isVisible = toBoolean(visible);
  $: fullscreen = variant === "fullscreen";
  $: inline = variant === "inline";
  $: spinnerSize = size === "small" ? "large" : "xlarge"

  let ready: boolean = false;

  onMount(async () => {
    // there needs to be a slight delay in the render to prevent an invalid spinner size from being shown
    await tick();  
    ready = isVisible;
  })

</script>

<!-- HTML -->
{#if ready}
  {#if fullscreen}
    <div
      transition:fade={{ duration: 300 }}
      use:noScroll={{ enable: true }}
      class:fullscreen
    >
      <goa-spinner {type} size={spinnerSize} progress={progress || 0} />
      {#if message}
        <div class="message">{message}</div>
      {/if}
    </div>
  {:else if inline}
    <div class:inline class={"spinner-"+spinnerSize}>
      <goa-spinner {type} size={spinnerSize} progress={progress || 0} />
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
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.9);
  }

  .inline {
    margin: 3.5rem;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .spinner-large .message {
    margin-top: 1.5rem;
    font-size: 1.2rem;
  }
  .spinner-xlarge .message {
    margin-top: 2rem;
    font-size: 1.5rem;
  }
</style>
