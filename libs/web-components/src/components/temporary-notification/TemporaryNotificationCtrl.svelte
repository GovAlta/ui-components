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
  export type GoabNotificationDuration = "long" | "medium" | "short" | number;

  export type GoabNotification = {
    uuid: string;
    message: string;
    type: GoabTemporaryNotificationType
    cancelUUID?: string;
    duration?: GoabNotificationDuration;
    actionText?: string;
    action?: () => void;
    visible: boolean;
    testId?: string;
  }
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { receive } from "../../common/utils";

  type SnackbarVerticalPosition = "top" | "bottom";
  type SnackbarHorizontalPosition = "left" | "center" | "right";

  export let vPosition: SnackbarVerticalPosition = "bottom";
  export let hPosition: SnackbarHorizontalPosition = "center";
  export let testid: string;

  let _notificationQueue: GoabNotification[] = [];
  let _notification: GoabNotification | undefined = undefined;
  let _intervalId: any;

  onMount(() => {
    return receive(window.document.body, (action, data, event) => {
      switch (action) {
        case "goa:temp-notification":
          handleNotification(data as GoabNotification);
          break;
        case "goa:temp-notification:dismiss":
          dismissNotification(data as string);
          break;
        case "goa:temp-notification:progress":
          handleNotificationProgress(data as { uuid: string, progress: number });
          break;
      }
    });
  });

  onDestroy(() => {
    if (_intervalId) {
      clearInterval(_intervalId);
    }
  });

  // *********
  // Functions
  // *********

  function handleNotification(notification: GoabNotification) {
    if (_notification && notification.cancelUUID === _notification.uuid) {
      replaceCurrentNotification(notification);
    } else {
      _notificationQueue = [..._notificationQueue, notification];
      startNotificationWatcher();
    }
  }

  function dismissNotification(uuid: string) {
    // dismiss from queue first to prevent missing the notification if it gets dequeued
    for (const n of _notificationQueue) {
      if (n.uuid === uuid) {
        _notificationQueue = [..._notificationQueue.slice(0, _notificationQueue.indexOf(n)), ..._notificationQueue.slice(_notificationQueue.indexOf(n) + 1)];
        return;
      }
    }
    if (uuid === _notification.uuid) {
      removeCurrentNotification(0);
    }
  }

  function handleNotificationProgress(detail: { uuid: string, progress: number }) {
    const { uuid, progress } = detail;

    // progress is for currently shown notification
    if (_notification && _notification.uuid === uuid) {
      _notification.progress = progress;
      if (progress >= 100) {
        removeCurrentNotification(0);
      }
    } else {
      // remove notification from the queue
      let index = 0;
      for (let n of _notificationQueue) {
        if (n.uuid === uuid) {
          n.progress = progress;
          if (progress >= 100) {
            _notificationQueue = [..._notificationQueue.slice(0, index), ..._notificationQueue.slice(index + 1)];
          }
          break;
        }
      }
      index++;
    }
  }

  function replaceCurrentNotification(notification: GoabNotification) {
    _notification.visible = false;
    setTimeout(() => {
      _notification = notification;
      _notification.visible = true;
      if (_notification.duration) {
        removeCurrentNotification(getDuration(_notification.duration));
      }
    }, 300);
  }

  function getDuration(duration: GoabNotificationDuration): number {
    if (typeof duration === "string") {
      switch (duration) {
        case "long":
          return 6000;
        case "medium":
          return 4000;
        case "short":
          return 3000;
        default:
          return 3000;
      }
    }
    return duration as number;
  }

  function removeCurrentNotification(duration: GoabNotificationDuration) {
    setTimeout(() => {
      // notification may be null if it was dismissed
      if (!_notification) {
        return;
      }
      // allow animation to render
      _notification.visible = false;
      // reset notification once animation is complete
      setTimeout(() => {
        _notification = undefined;
      }, 300);
    }, duration as number);
  }

  function startNotificationWatcher() {
    // don't start more than one timer
    if (_intervalId) {
      return;
    }

    _intervalId = setInterval(() => {
      // don't show the next notification until this one is complete
      if (_notification) {
        return;
      }
      if (_notificationQueue.length === 0) {
        return;
      }

      _notification = _notificationQueue.shift();
      // allow setting of visibility to trigger css animation
      setTimeout(() => {
        _notification.visible = true;
      }, 10)

      if (_notification.duration) {
        removeCurrentNotification(getDuration(_notification.duration));
      }
    }, 200);
  }

</script>

<div
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
  <span
    class="sr-only"
    role="status"
    aria-live={_notification
      ? _notification.type === "failure"
        ? "assertive"
        : "polite"
      : undefined}
  >
    {_notification?.message || ""}
  </span>
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

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
