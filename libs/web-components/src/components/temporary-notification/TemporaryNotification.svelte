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
      maxWidth: { type: "String", attribute: "max-width" },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";

  type TemporaryNotificationAnimationDirection = "up" | "down";
  type TemporaryNotificationType =
    | "basic"
    | "success"
    | "failure"
    | "indeterminate"
    | "progress";

  // Props
  export let message: string = "";
  export let type: TemporaryNotificationType = "basic";
  export let progress: number = -1; // -1 = hidden, 0-100 = show
  export let testid: string = "";
  export let actionText: string = "";
  export let visible: boolean = true;
  export let animationDirection: TemporaryNotificationAnimationDirection = "down";
  export let maxWidth: string = "640px";
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
  style="max-width: {maxWidth};"
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
      <goa-link-button testid="link" color="light" action="action">
        {actionText}
      </goa-link-button>
    </div>
  {/if}

  {#if type === "progress"}
    <progress data-testid="progress" value={progress} max="100" />
  {:else if type === "indeterminate"}
    <progress />
  {/if}
</div>

<style>
  .snackbar {
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    border-radius: var(--goa-border-radius-m);
    gap: var(--goa-space-m);
    padding: var(--goa-space-m) var(--goa-space-l);
    color: var(--goa-color-text-light);
    transition: transform 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
  }

  @media (--not-mobile) {
    .snackbar {
      min-width: 360px;
    }
  }

  @media (--mobile) {
    .snackbar {
      margin: 0 var(--goa-space-m);
      width: calc(100vw - var(--goa-space-m) * 2);
    }
  }

  .snackbar.basic,
  .snackbar.indeterminate,
  .snackbar.progress {
    border: 1px solid var(--goa-color-greyscale-700);
    background: var(--goa-color-greyscale-black);
  }

  .action {
    flex-grow: 1;
    text-align: right;
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
  }

  .show.animate-up {
    transform: translateY(0);
  }

  .show.animate-down {
    transform: translateY(0);
  }

  .hide {
    opacity: 0;
  }

  .hide.animate-up {
    transform: translateY(-100px);
  }

  .hide.animate-down {
    transform: translateY(100px);
  }

  .snackbar.success {
    background: var(--goa-color-success-default);
  }

  .snackbar.failure {
    background: var(--goa-color-emergency-default);
  }

  .message {
    flex: 1 1 auto;
    min-width: 0;
    font: var(--goa-typography-body-m);
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
</style>
