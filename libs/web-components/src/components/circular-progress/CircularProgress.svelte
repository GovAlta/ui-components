<svelte:options customElement="goa-circular-progress" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import noScroll from "../../common/no-scroll";
  import { typeValidator, toBoolean } from "../../common/utils";

  // Validators
  const [Variants, validateVariant] = typeValidator(
    "Circular progress variant",
    ["fullscreen", "inline"],
  );
  const [Sizes, validateSize] = typeValidator("Button size", [
    "small",
    "large",
  ]);

  // Types
  type Size = (typeof Sizes)[number];
  type Variant = (typeof Variants)[number];

  // Optional
  export let variant: Variant = "inline";
  export let size: Size = "large";
  export let message: string = "";
  export let progress: number = -1;
  export let visible: string = "false";

  $: isVisible = toBoolean(visible);

  let spinnerSize: "large" | "xlarge";
  let fullscreen: boolean;
  let inline: boolean;

  onMount(async () => {
    validateVariant(variant);
    validateSize(size);
    spinnerSize = size === "small" ? "large" : "xlarge";
    fullscreen = variant === "fullscreen";
    inline = variant === "inline";
  });
</script>

<!-- HTML -->
{#if isVisible}
  {#if fullscreen}
    <div
      transition:fade={{ duration: 300 }}
      use:noScroll={{ enable: true }}
      class:fullscreen
    >
      <goa-spinner size={spinnerSize} {progress} />
      {#if message}
        <div class="message">{message}</div>
      {/if}
    </div>
  {:else if inline}
    <div class:inline class={"spinner-" + spinnerSize}>
      <goa-spinner size={spinnerSize} {progress} />
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
    font-family: var(--goa-font-family-sans);
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
