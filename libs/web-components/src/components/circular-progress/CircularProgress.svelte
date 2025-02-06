<svelte:options customElement="goa-circular-progress" />

<!-- Script -->
<script lang="ts">
  import { onMount, tick } from "svelte";
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
  export let testid: string = "";

  $: isVisible = toBoolean(visible);

  let spinnerSize: "large" | "xlarge";
  let fullscreen: boolean;
  let inline: boolean;

  onMount(async () => {
    validateVariant(variant);
    validateSize(size);
    await tick(); // needed to ensure Angular's delay, when rendering within a route, doesn't break things
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
      data-testid={testid}
    >
      <goa-spinner size={spinnerSize} {progress} />
      {#if message}
        <div class="message">{message}</div>
      {/if}
    </div>
  {:else if inline}
    <div
      class:inline
      class={"spinner-" + spinnerSize}
      data-testid={testid}
    >
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
    background-color: var(--goa-circular-progress-color-background);
  }

  .inline {
    margin: 3.5rem;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .spinner-large .message {
    margin-top: var(--goa-circular-progress-small-margin-top);
    font: var(--goa-circular-progress-medium-text);
  }
  .spinner-xlarge .message {
    margin-top: var(--goa-circular-progress-large-margin-top);
    font: var(--goa-circular-progress-large-text);
  }
</style>
