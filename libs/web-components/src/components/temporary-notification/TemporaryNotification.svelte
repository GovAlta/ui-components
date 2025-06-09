<svelte:options customElement={{
  tag: "goa-temp-notification",
  props: {
    message: { type: "String", attribute: "message" },
    type: { type: "String", attribute: "type" },
    duration: { type: "Number", attribute: "duration" },
    progress: { type: "Number", attribute: "progress" },
    testid: { type: "String", attribute: "testid" },
    actionText: { type: "String", attribute: "action-text" },
    visible: { type: "Boolean", attribute: "visible" },
    animationDirection: { type: "String", attribute: "animation-direction" },
  },
}} />

<script lang="ts">
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";

  // Validators
  const [Types, validateType] = typeValidator("Snackbar type", [
    "basic",
    "success",
    "failure",
  ]);

  // Types
  type SnackbarType = (typeof Types)[number];

  // Props
  export let message: string = "";
  export let type: SnackbarType = "basic";
  export let duration: number;
  export let progress: number = -1; // -1 = hidden, 0-100 = show
  export let testid: string = "";
  export let actionText: string = "";
  export let visible: boolean = true;
  export let animationDirection: "up" | "down" = "down";

  onMount(() => {
    validateType(type);
  });
</script>

<div
  class="snackbar"
  class:basic={type === "basic"}
  class:success={type === "success"}
  class:failure={type === "failure"}
  class:show={visible}
  class:hide={!visible}
  class:animate-up={animationDirection === "up"}
  class:animate-down={animationDirection === "down"}
  data-testid={testid}
>
  {#if type === "success"}
    <goa-icon type="checkmark-circle" />
  {/if}

  {#if type === "failure"}
    <goa-icon type="close-circle" />
  {/if}

  <span class="message">
    {message}
  </span>

  {#if actionText}
    <div class="action">
      <goa-link color="light" action="action">{actionText}</goa-link>
    </div>
  {/if}

  {#if progress >= 0 && progress < 100}
    <progress value={progress} max="100" />
  {:else if typeof(duration) === "undefined"}
    <progress />
  {/if}
</div>

<style>
  .snackbar {
    position: relative;
    display: flex;
    border-radius: var(--goa-border-radius-m);
    gap: var(--goa-space-m);
    align-items: center;
    padding: var(--goa-space-m) var(--goa-space-l);
    min-width: 360px;
    max-width: 640px;
    background: var(--goa-color-greyscale-black); /* Basic */
    color: var(--goa-color-text-light);
    transition: opacity 0.3s ease, transform 0.3s ease;
    overflow: hidden;
  }

  .snackbar.basic {
    border: 1px solid var(--goa-color-greyscale-700);
  }

  /* Base progress element styling */
  progress {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    /*border-radius: 0;*/
    /*border: none;*/
    /*appearance: none;*/
    /*-webkit-appearance: none;*/
    /*-moz-appearance: none;*/
    /*background-color: var(--goa-temp-notification-progress-background, var(--goa-color-greyscale-400));*/
    /*color: var(--goa-color-greyscale-white);*/
  }

  /* WebKit (Chrome, Safari) specific styling */
  progress::-webkit-progress-bar {
    /*border: none;*/
    /*background-color: var(--goa-color-greyscale-400);*/
    /*border-radius: 0;*/
    /*box-shadow: none;*/
  }

  progress::-webkit-progress-value {
    /*background-color: var(--goa-color-greyscale-white);*/
    /*border-radius: 0;*/
  }

  /* Firefox specific styling */
  progress::-moz-progress-bar {
    /*background-color: var(--goa-color-greyscale-white);*/
    /*border-radius: 0;*/
  }

  /* Styling for indeterminate progress */
  progress:not([value]) {
    /*appearance: initial;*/
    /*-webkit-appearance: initial;*/
    /*-moz-appearance: initial;*/
    /*background-color: var(--goa-color-greyscale-400);*/
  }

  /* WebKit indeterminate progress */
  progress:not([value])::-webkit-progress-bar {
    /*background-color: var(--goa-color-greyscale-400);*/
  }

  progress:not([value])::-webkit-progress-value {
    /*background-color: var(--goa-color-greyscale-white);*/
  }

  /* Firefox indeterminate progress */
  progress:not([value])::-moz-progress-bar {
    /*background-color: var(--goa-color-greyscale-white);*/
  }

  /* Styling for progress with value attribute */
  progress[value] {
    /*background-color: var(--goa-color-greyscale-400);*/
    /*border-radius: 0;*/
    /*box-shadow: none;*/
  }

  .show {
    opacity: 1;
    transform: translateY(0);
  }

  .hide {
    opacity: 0;
  }
  .hide.animate-up {
    transform: translateY(-50px);
  }
  .hide.animate-down {
    transform: translateY(50px);
  }

  .action a {
    color: white;
  }

  .snackbar.success {
    background: var(--goa-color-success-default);
  }

  .snackbar.failure {
    background: var(--goa-color-emergency-default);
  }

  .message {
    flex: 1 1 auto;
    font: var(--goa-typography-body-m);
  }
</style>
