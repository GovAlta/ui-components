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

  /** The notification message text to display. */
  export let message: string = "";
  /** The notification type which determines the visual style and icon. */
  export let type: TemporaryNotificationType = "basic";
  /** Progress value from 0-100. Use -1 to hide the progress bar. Only applies when type is "progress". */
  export let progress: number = -1; // -1 = hidden, 0-100 = show
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Text for the optional action button. When provided, displays a clickable link button. */
  export let actionText: string = "";
  /** Controls whether the notification is visible. */
  export let visible: boolean = true;
  /** Direction the notification animates from when appearing or disappearing. */
  export let animationDirection: TemporaryNotificationAnimationDirection =
    "down";

  // Icon size for success/failure icons
  const iconSize = "large";

  let _rootEl: HTMLElement;

  function handleActionClick() {
    _rootEl?.dispatchEvent(
      new CustomEvent("action", { bubbles: true, composed: true }),
    );
  }
</script>

<div
  bind:this={_rootEl}
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
      <goa-button
        testid="action"
        type="tertiary"
        size="compact"
        version="2"
        variant="inverse"
        on:_click={handleActionClick}
      >
        {actionText}
      </goa-button>
    </div>
  {/if}

  {#if type === "progress"}
    <progress data-testid="progress" value={progress} max="100" />
  {:else if type === "indeterminate"}
    <div class="indeterminate-bar" role="progressbar" aria-label="Loading" />
  {/if}
</div>

<style>
  .snackbar {
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    border-radius: var(
      --goa-temporary-notification-borderRadius,
      var(--goa-border-radius-l)
    );
    gap: var(
      --goa-temporary-notification-row-gap,
      var(--goa-space-m)
    ); /* 16px between content and action */
    padding: var(
      --goa-temporary-notification-padding,
      var(--goa-space-m) var(--goa-space-l)
    );
    max-width: var(--goa-temporary-notification-max-width, 640px);
    color: var(
      --goa-temporary-notification-color-text,
      var(--goa-color-text-light)
    );
    transition:
      transform var(--goa-temporary-notification-transition-duration, 0.3s) ease,
      opacity var(--goa-temporary-notification-transition-duration, 0.3s) ease;
    overflow: hidden;
    /* TODO: replace with token once shadow values are finalized */
    box-shadow:
      0px 0px 2px 0px rgba(0, 0, 0, 0.3),
      0px 16px 32px -8px rgba(0, 0, 0, 0.35);
    min-height: 3.75rem;
    min-width: var(--goa-temporary-notification-min-width-desktop, 360px);
  }

  .snackbar:has(.action) {
    min-height: 4.5rem;
    padding-top: 0.9375rem;
    padding-bottom: 0.9375rem;
  }

  /* Add extra bottom padding when progress bar is present */
  .snackbar.progress,
  .snackbar.indeterminate {
    padding: var(
      --goa-temporary-notification-padding-with-progress,
      var(--goa-space-m) var(--goa-space-l) 1.375rem var(--goa-space-l)
    );
    min-height: 4.125rem;
  }

  /* Content wrapper keeps icon and message together as a single flex item */
  .content {
    display: flex;
    align-items: flex-start; /* Icon aligns with first line of text */
    gap: var(--goa-temporary-notification-column-gap, var(--goa-space-s));
    flex: 1 1 auto;
    min-width: 0; /* Allow content to shrink */
  }

  @media (--mobile) {
    .snackbar {
      flex-wrap: wrap;
    }
  }

  .snackbar.basic {
    border: var(
        --goa-temporary-notification-borderWidth,
        var(--goa-border-width-s)
      )
      solid
      var(
        --goa-temporary-notification-color-border,
        var(--goa-color-greyscale-700)
      );
    background: var(
      --goa-temporary-notification-color-bg-basic,
      var(--goa-color-greyscale-black)
    );
  }

  .snackbar.indeterminate,
  .snackbar.progress {
    background: var(
      --goa-temporary-notification-color-bg-basic,
      var(--goa-color-greyscale-black)
    );
  }

  .action {
    flex: 0 0 auto;
    margin-left: auto;
    align-self: flex-end;
  }

  /* Base progress element styling */
  progress {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--goa-temporary-notification-progress-bar-height, 6px);
    border-radius: 0 0
      var(--goa-temporary-notification-progress-bar-borderRadius, 0)
      var(--goa-temporary-notification-progress-bar-borderRadius, 0);
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  /* Indeterminate bar with accessible role */
  .indeterminate-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--goa-temporary-notification-progress-bar-height, 6px);
    background-color: var(
      --goa-temporary-notification-progress-bar-color-bg,
      var(--goa-color-greyscale-300)
    );
    border-radius: 0 0
      var(--goa-temporary-notification-progress-bar-borderRadius, 0)
      var(--goa-temporary-notification-progress-bar-borderRadius, 0);
    overflow: hidden;
  }

  .indeterminate-bar::after {
    content: "";
    display: block;
    width: 45%;
    height: 100%;
    background-color: var(
      --goa-temporary-notification-progress-bar-color-fill,
      white
    );
    border-radius: var(--goa-border-radius-m);
    animation: indeterminate 2.5s ease-in-out infinite;
  }

  @keyframes indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(222%);
    }
  }

  /* Determinate progress bar browser-specific styling */
  progress::-webkit-progress-bar {
    background-color: var(
      --goa-temporary-notification-progress-bar-color-bg,
      #adadad
    );
    border-radius: 0 0
      var(--goa-temporary-notification-progress-bar-borderRadius, 0)
      var(--goa-temporary-notification-progress-bar-borderRadius, 0);
  }

  progress::-webkit-progress-value {
    background-color: var(
      --goa-temporary-notification-progress-bar-color-fill,
      white
    );
    border-radius: var(--goa-border-radius-m);
    transition: width 0.3s ease;
  }

  progress::-moz-progress-bar {
    background-color: var(
      --goa-temporary-notification-progress-bar-color-fill,
      white
    );
    border-radius: var(--goa-border-radius-m);
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
    transform: translateY(
      calc(-1 * var(--goa-temporary-notification-animation-distance, 100px))
    );
  }

  .hide.animate-down {
    transform: translateY(
      var(--goa-temporary-notification-animation-distance, 100px)
    );
  }

  .snackbar.success {
    background: var(
      --goa-temporary-notification-color-bg-success,
      var(--goa-color-success-default)
    );
  }

  .snackbar.failure {
    background: var(
      --goa-temporary-notification-color-bg-failure,
      var(--goa-color-emergency-default)
    );
  }

  .message {
    flex: 1 1 auto;
    font: var(
      --goa-temporary-notification-typography,
      var(--goa-typography-body-m)
    );
  }

  /* Add top margin to message when icon is present to vertically center first line with icon */
  .content:has(goa-icon) .message {
    margin-top: var(
      --goa-temporary-notification-padding-text-top,
      var(--goa-space-2xs)
    );
  }
</style>
