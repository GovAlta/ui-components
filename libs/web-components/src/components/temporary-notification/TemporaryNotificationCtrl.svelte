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
  export type GoabNotification = {
    type: "success" | "failure" | "information";
    message: string;
    duration?: number; // in milliseconds
    actionText?: string; // Optional text for an action button
    action?: () => void; // Optional task to run when the notification is dismissed
    progress?: number;
    visible?: boolean;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { receive, typeValidator } from "../../common/utils";

  type SnackbarVerticalPosition = "top" | "bottom";
  type SnackbarHorizontalPosition = "left" | "center" | "right";

  export let vPosition: SnackbarVerticalPosition = "bottom";
  export let hPosition: SnackbarHorizontalPosition = "center";
  export let testid: string;

  let _container: HTMLElement;
  let _notification: GoabNotification | null = null;

  function handleNotification(notification: GoabNotification) {
    notification.visible = true;

    if (_notification) {
      _notification.visible = false;
      setTimeout(() => setNotification(notification), 300)
    } else {
      setNotification(notification);
    }
  }

  function setNotification(notification: GoabNotification) {
    _notification = notification;

    if (_notification.duration > 0) {
      setTimeout(() => {
        _notification.visible = false;
        setTimeout(() => {
          _notification = null
        }, 300)
      }, notification.duration)
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
      type={_notification.type}
      duration={_notification.duration}
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
