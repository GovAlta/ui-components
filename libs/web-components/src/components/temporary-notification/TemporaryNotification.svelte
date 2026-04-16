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
  import { generateRandomId } from "../../common/utils";

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

  const _messageId = `temporary-notification-message-${generateRandomId()}`;
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
      <goa-icon type="checkmark-circle" size="large" />
    {/if}

    {#if type === "failure"}
      <goa-icon type="close-circle" size="large" />
    {/if}

    <span id={_messageId} class="message">
      {message}
    </span>

    {#if actionText}
      <div class="action">
        <goa-link-button testid="link" color="light" action="action">
          {actionText}
        </goa-link-button>
      </div>
    {/if}
  </div>

  {#if type === "progress"}
    <goa-linear-progress
      {progress}
      percent-visibility="hidden"
      aria-labelledby={_messageId}
    />
  {:else if type === "indeterminate"}
    <goa-linear-progress
      percent-visibility="hidden"
      aria-labelledby={_messageId}
    />
  {/if}
</div>

<style>
  .snackbar {
    position: relative;
    box-sizing: border-box;
    border-radius: var(
      --goa-temporary-notification-borderRadius,
      var(--goa-border-radius-m)
    );
    max-width: var(--goa-temporary-notification-max-width, 640px);
    transition:
      transform var(--goa-temporary-notification-transition-duration, 0.3s) ease,
      opacity var(--goa-temporary-notification-transition-duration, 0.3s) ease;
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
    ); /* 16px between content and action */
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
</style>
