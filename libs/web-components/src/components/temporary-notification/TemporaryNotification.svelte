<svelte:options customElement={{
  tag: "goa-temp-notification",
  props: {
    message: { type: "String", attribute: "message" },
    type: { type: "String", attribute: "type" },
    duration: { type: "Number", attribute: "duration" },
    progress: { type: "Number", attribute: "progress" },
    testid: { type: "String", attribute: "testid" },
    actionText: { type: "String", attribute: "action-text" },
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
  export let duration: number = 4000;
  export let progress: number = -1; // -1 = hidden, 0-100 = show
  export let testid: string = "";
  export let actionText: string = "";

  let visible: boolean = true;

  // Reactive
  $: isShowProgress = progress >= 0 && progress <= 100;

  onMount(() => {
    validateType(type);

    if (duration > 0) {
      setTimeout(() => {
        visible = false;
      }, duration);

      setTimeout(() => {

      }, duration + 300);
    }
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
      <!--
      // should the link allow color to be set?
      // should I just replace this with an anchor and manually dispatch the action?
      -->
      <goa-link action="action">{actionText}</goa-link>
    </div>
  {/if}

  {#if isShowProgress}
    <div class="progress-bar" style="width: {progress}%"></div>
  {/if}
</div>

<style>
  .snackbar {
    display: flex;
    position: relative;
    align-items: center;
    min-width: 360px;
    max-width: 640px;
    background: var(--goa-color-greyscale-black); /* Basic */
    color: var(--goa-color-text-light);
    padding: var(--goa-space-m) var(--goa-space-l);
    border-radius: var(--goa-border-radius-m);
    gap: var(--goa-space-m);
    transition: opacity 0.3s ease;
    overflow: hidden;
  }

  .show {
    opacity: 1;
  }

  .hide {
    opacity: 0;
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
