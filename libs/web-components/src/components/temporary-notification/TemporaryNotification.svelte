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
  /** Progress value from 0-100. Only applies when type is "progress". */
  export let progress: number = -1;
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Text for the optional action button. When provided, displays a tertiary action button. */
  export let actionText: string = "";
  /** Controls whether the notification is visible. */
  export let visible: boolean = true;
  /** Direction the notification animates from when appearing or disappearing. */
  export let animationDirection: TemporaryNotificationAnimationDirection =
    "down";

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
      <goa-icon type="checkmark-circle" size="large" />
    {/if}

    {#if type === "failure"}
      <goa-icon type="close-circle" size="large" />
    {/if}

    <span class="message">
      {message}
    </span>

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
  </div>

  {#if type === "progress"}
    <goa-linear-progress
      {progress}
      percent-visibility="hidden"
      aria-label={message}
    />
  {:else if type === "indeterminate"}
    <goa-linear-progress
      percent-visibility="hidden"
      aria-label={message}
    />
  {/if}
</div>

<style>
  .snackbar {
    position: relative;
    box-sizing: border-box;
    border-radius: var(
      --goa-temporary-notification-borderRadius,
      var(--goa-border-radius-l)
    );
    max-width: var(--goa-temporary-notification-max-width, 640px);
    min-height: 3.75rem;
    /* TODO: replace with token once shadow values are finalized */
    box-shadow:
      0px 0px 2px 0px rgba(0, 0, 0, 0.3),
      0px 16px 32px -8px rgba(0, 0, 0, 0.35);
    transition:
      transform var(--goa-temporary-notification-transition-duration, 0.3s) ease,
      opacity var(--goa-temporary-notification-transition-duration, 0.3s) ease;
  }

  .snackbar:has(.action) {
    min-height: 4.5rem;
  }

  .snackbar:has(.action) .content {
    padding-block: 0.9375rem;
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

  /** Visibility **/

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

  /** State **/

  .basic,
  .indeterminate,
  .progress {
    background: var(
      --goa-temporary-notification-color-bg-basic,
      var(--goa-color-greyscale-black)
    );
  }
  .success {
    background: var(
      --goa-temporary-notification-color-bg-success,
      var(--goa-color-success-default)
    );
  }
  .failure {
    background: var(
      --goa-temporary-notification-color-bg-failure,
      var(--goa-color-emergency-default)
    );
  }

  /** Details **/

  .content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: var(
      --goa-temporary-notification-row-gap,
      var(--goa-space-m)
    );
    padding: var(
      --goa-temporary-notification-padding,
      var(--goa-space-m) var(--goa-space-l)
    );
    color: var(
      --goa-temporary-notification-color-text,
      var(--goa-color-text-light)
    );
    overflow: hidden;
  }

  .action {
    flex-grow: 1;
    text-align: right;
  }

  .message {
    flex: 1 1 auto;
    font: var(
      --goa-temporary-notification-typography,
      var(--goa-typography-body-m)
    );
    line-height: var(--goa-line-height-3);
  }

  /* Add top margin to message when icon is present to vertically center first line with icon */
  .content:has(goa-icon) .message {
    margin-top: var(
      --goa-temporary-notification-padding-text-top,
      var(--goa-space-2xs)
    );
  }

  /* Override goa-linear-progress tokens so the bar reads against the dark snackbar */
  .progress goa-linear-progress,
  .indeterminate goa-linear-progress {
    --goa-linear-progress-color-indicator: var(--goa-color-text-light);
    --goa-linear-progress-color-track: var(--goa-color-greyscale-400);
  }
</style>
