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

  export type GoabNotification = {
    uuid: string;
    message: string;
    type:  GoabTemporaryNotificationType
    cancelUUID?: string;
    duration?: number;
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
        case "goa:temp-notification:progress":
          handleNotificationProgress(data as {progress: number});
          break;
      }
    });
  });

  onDestroy(() => {
    if (_intervalId) {
      clearInterval(_intervalId);
    }
  })

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

  function handleNotificationProgress(detail: {progress: number}) {
    const { progress } = detail;
    if (_notification) {
      _notification.progress = progress;
    }
    if (progress >= 100) {
      removeCurrentNotification(0);
    }
  }

  function replaceCurrentNotification(notification: GoabNotification) {
    _notification.visible = false;
    setTimeout(() => {
      _notification = notification;
      _notification.visible = true;
      if (notification.duration) {
        removeCurrentNotification(_notification.duration);
      }
    }, 300)
  }

  function removeCurrentNotification(timeout) {
    setTimeout(() => {
      _notification.visible = false;
      setTimeout(() => {
        _notification = undefined;
      }, 300)
    }, timeout)
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
      _notification.visible = true;
      if (_notification.duration) {
        removeCurrentNotification(_notification.duration);
      }
    }, 200)
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
