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

  // Icon size for success/failure icons
  const iconSize = "large";
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
  <div class="content">
    {#if type === "success"}
      <goa-icon type="checkmark-circle" size={iconSize} />
    {/if}

    {#if type === "failure"}
      <goa-icon type="close-circle" size={iconSize} />
    {/if}

    <span class="message">
      {message}
    </span>
  </div>

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
    border-radius: var(--goa-temporary-notification-borderRadius, var(--goa-border-radius-m));
    gap: var(--goa-temporary-notification-row-gap, var(--goa-space-m)); /* 16px between content and action */
    padding: var(--goa-temporary-notification-padding, var(--goa-space-m) var(--goa-space-l));
    max-width: var(--goa-temporary-notification-max-width, 640px);
    color: var(--goa-temporary-notification-color-text, var(--goa-color-text-light));
    transition:
      transform var(--goa-temporary-notification-transition-duration, 0.3s) ease,
      opacity var(--goa-temporary-notification-transition-duration, 0.3s) ease;
    overflow: hidden;
  }

  /* Add extra bottom padding when progress bar is present */
  .snackbar.progress,
  .snackbar.indeterminate {
    padding: var(--goa-temporary-notification-padding-with-progress, var(--goa-space-m) var(--goa-space-l) 22px var(--goa-space-l));
  }

  /* Content wrapper keeps icon and message together as a single flex item */
  .content {
    display: flex;
    align-items: flex-start; /* Icon aligns with first line of text */
    gap: var(--goa-temporary-notification-column-gap, var(--goa-space-s));
    flex: 1 1 auto;
    min-width: 0; /* Allow content to shrink */
  }

  @media (--not-mobile) {
    .snackbar {
      min-width: var(--goa-temporary-notification-min-width-desktop, 360px);
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
    border: var(--goa-temporary-notification-borderWidth, var(--goa-border-width-s)) solid var(--goa-temporary-notification-color-border, var(--goa-color-greyscale-700));
    background: var(--goa-temporary-notification-color-bg-basic, var(--goa-color-greyscale-black));
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
    height: var(--goa-temporary-notification-progress-bar-height, 6px);
    border-radius: 0 0 var(--goa-temporary-notification-progress-bar-borderRadius, 0) var(--goa-temporary-notification-progress-bar-borderRadius, 0);
  }

  /* Progress bar browser-specific styling */
  progress::-webkit-progress-bar {
    background-color: var(--goa-temporary-notification-progress-bar-color-bg, #adadad);
    border-radius: 0 0 var(--goa-temporary-notification-progress-bar-borderRadius, 0) var(--goa-temporary-notification-progress-bar-borderRadius, 0);
  }

  progress::-webkit-progress-value {
    background-color: var(--goa-temporary-notification-progress-bar-color-fill, white);
    border-radius: 0 0 var(--goa-temporary-notification-progress-bar-borderRadius, 0) var(--goa-temporary-notification-progress-bar-borderRadius, 0);
  }

  progress::-moz-progress-bar {
    background-color: var(--goa-temporary-notification-progress-bar-color-fill, white);
    border-radius: 0 0 var(--goa-temporary-notification-progress-bar-borderRadius, 0) var(--goa-temporary-notification-progress-bar-borderRadius, 0);
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
    transform: translateY(calc(-1 * var(--goa-temporary-notification-animation-distance, 100px)));
  }

  .hide.animate-down {
    transform: translateY(var(--goa-temporary-notification-animation-distance, 100px));
  }

  .snackbar.success {
    background: var(--goa-temporary-notification-color-bg-success, var(--goa-color-success-default));
  }

  .snackbar.failure {
    background: var(--goa-temporary-notification-color-bg-failure, var(--goa-color-emergency-default));
  }

  .message {
    flex: 1 1 auto;
    font: var(--goa-temporary-notification-typography, var(--goa-typography-body-m));
  }

  /* Add top margin to message when icon is present to vertically center first line with icon */
  .content:has(goa-icon) .message {
    margin-top: var(--goa-temporary-notification-padding-text-top, var(--goa-space-2xs));
  }
</style>
