<svelte:options
  customElement={{
    tag: "goa-temp-notification",
    props: {
      message: { type: "String", attribute: "message" },
      type: { type: "String", attribute: "type" },
      progress: { type: "Number", attribute: "progress" },
      testid: { type: "String", attribute: "testid", reflect: true },
      actionText: { type: "String", attribute: "action-text" },
      visible: { type: "Boolean", attribute: "visible" },
      animationDirection: { type: "String", attribute: "animation-direction" },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";

  type TemporaryNotificationType =
    | "basic"
    | "success"
    | "failure"
    | "indeterminate"
    | "progress";
  type TemporaryNotificationAnimationDirection = "up" | "down";

  // Props
  export let message: string = "";
  export let type: TemporaryNotificationType = "basic";
  export let progress: number = -1; // -1 = hidden, 0-100 = show
  export let testid: string = "";
  export let actionText: string = "";
  export let visible: boolean = true;
  export let animationDirection: TemporaryNotificationAnimationDirection = "down";

  onMount(() => {
    if (type !== "basic") {
      if (actionText) {
        console.warn("Actions are only supported for basic notifications");
      }
    }
  });
</script>

<div
  class="snackbar"
  class:basic={type === "basic"}
  class:success={type === "success"}
  class:failure={type === "failure"}
  class:indeterminate={type === "indeterminate"}
  class:progress={type === "progress"}
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
    <goa-link-button testid="link" color="light" action="action">
      {actionText}
    </goa-link-button>
  {/if}

  {#if type === "progress"}
    <progress value={progress} max="100" />
  {:else if type === "indeterminate"}
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
    color: var(--goa-color-text-light);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
    overflow: hidden;
  }

  .snackbar.basic,
  .snackbar.indeterminate,
  .snackbar.progress {
    border: 1px solid var(--goa-color-greyscale-700);
    background: var(--goa-color-greyscale-black);
  }

  /* Base progress element styling */
  progress {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
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
