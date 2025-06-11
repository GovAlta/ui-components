<svelte:options customElement={{
  tag: "goa-temp-notification-ctrl",
  props: {
    vPosition: { type: "String", attribute: "vertical-position" },
    hPosition: { type: "String", attribute: "horizontal-position" },
    testid: { type: "String", attribute: "testid" },
  }
}}
/>

<script lang="ts" context="module">
  export type GoabTemporaryNotificationType = "basic" | "success" | "failure" | "indeterminate" | "progress";
  export type GoabTemporaryNotificationDuration = "short" | "medium" | "long" | number;

  export type GoabNotification = {
    type: GoabTemporaryNotificationType;
    message: string;
    duration?: GoabTemporaryNotificationDuration;
    actionText?: string; // Optional text for an action button
    action?: () => void; // Optional task to run when the notification is dismissed
    progress?: number;
    visible?: boolean;
    testId?: string;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { receive } from "../../common/utils";

  const MIN_DISPLAY_TIME = 2000;
  const DEFAULT_DURATION = 4000;

  type SnackbarVerticalPosition = "top" | "bottom";
  type SnackbarHorizontalPosition = "left" | "center" | "right";

  export let vPosition: SnackbarVerticalPosition = "bottom";
  export let hPosition: SnackbarHorizontalPosition = "center";
  export let testid: string;

  let _container: HTMLElement;
  let _notification: GoabNotification | null = null;
  let _lastNotificationShownAt: number;

  function handleNotification(notification: GoabNotification) {
    // ensure every notification is shown for a minimum amount of time
    const delay = _notification && (notification.duration > 0)
      ? Math.max(Date.now() - _lastNotificationShownAt, MIN_DISPLAY_TIME)
      : 0 // don't delay since no message is currently being shown
    _lastNotificationShownAt = Date.now();

    setTimeout(() => {
      if (_notification) {
        // hide the current message, show the next message with a delay to allow for transitions to complete
        _notification.visible = false;
        setTimeout(() => setNotification(notification), 300)
      } else {
        setNotification(notification);
      }
    }, delay)
  }

  function getDuration(duration?: GoabTemporaryNotificationDuration): number {
    switch (duration) {
      case "short":
        return 2000;
      case "medium":
        return 4000;
      case "long":
        return 6000;
      default:
        return duration as number;
    }
  }

  function setNotification(notification: GoabNotification) {
    // set the displayed notification
    _notification = notification;
    _notification.visible = true;

    // if notification type needs a duration
    if (_notification.duration === 0 && ["basic", "success", "failure"].includes(notification.type)) {
      _notification.duration = DEFAULT_DURATION;
    }

    // set timer to hide notification if duration is set
    if (_notification.duration) {
      setTimeout(() => {
        _notification.visible = false;
        setTimeout(() => {
          _notification = null
        }, 300)
      }, getDuration(notification.duration))
    }
  }

  function handleNotificationProgress(detail: {progress: number}) {
    const { progress } = detail;
    if (_notification) {
      _notification.progress = progress;
    }
    if (progress > 100) {
      _notification = null;
    }
  }

  onMount(() => {
    return receive(window.document.body, (action, data, event) => {
      switch (action) {
        case "goa:temp-notification":
          handleNotification(data as GoabNotification);
          break;
        case "goa:temp-notification:progress":
          handleNotificationProgress(data as {progress: number});
          break;
      }
    });
  });
</script>

<div
  bind:this={_container}
  data-testid={testid}
  class="notification-container"
  class:pos-left={hPosition === "left"}
  class:pos-right={hPosition === "right"}
  class:pos-center={hPosition === "center"}
  class:pos-bottom={vPosition === "bottom"}
  class:pos-top={vPosition === "top"}
>
  {#if _notification}
    <goa-temp-notification
      message={_notification.message}
      testid={_notification.testId}
      type={_notification.type}
      action-text={_notification.actionText}
      progress={_notification.progress}
      visible={_notification.visible}
      animation-direction={vPosition === "top" ? "up" : "down"}
      on:action={_notification.action}
    />
  {/if}
</div>

<style>
  .notification-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 1000;
  }

  .pos-top {
    top: 20px;
  }
  .pos-bottom {
    bottom: 20px;
  }
  .pos-left {
    left: 20px;
    transform: none;
  }
  .pos-center {
    left: 50%;
    transform: translateX(-50%);
  }
  .pos-right {
    right: 20px;
    transform: none;
  }
</style>
