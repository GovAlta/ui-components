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
    gap: var(--goa-space-m);
    align-items: center;
    padding: var(--goa-space-m) var(--goa-space-l);
    min-width: 360px;
    max-width: 640px;
    background: var(--goa-color-greyscale-black); /* Basic */
    color: var(--goa-color-text-light);
    border-radius: var(--goa-border-radius-m);
    transition: opacity 0.3s ease, transform 0.3s ease;
    overflow: hidden;
  }

  progress {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  progress[value], progress[value]::-webkit-progress-bar {
    background-color: #fff;
    border-radius: 0;
    box-shadow: none;
  }

  .show {
    opacity: 1;
    transform: translateY(0);
  }

  .hide {
    opacity: 0;
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
