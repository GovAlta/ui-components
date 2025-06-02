<svelte:options customElement={{
  tag: "goa-temp-notification-ctrl",
  props: {

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

  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";

  const [VerticalPositions, validateVerticalPosition] = typeValidator("Snackbar vertical position", [
    "top",
    "bottom",
  ]);

  const [HorizontalPositions, validateHorizontalPosition] = typeValidator("Snackbar horizontal position", [
    "left",
    "center",
    "right",
  ]);

  type SnackbarVerticalPosition = (typeof VerticalPositions)[number];
  type SnackbarHorizontalPosition = (typeof HorizontalPositions)[number];

  export let verticalPosition: SnackbarVerticalPosition = "bottom";
  export let horizontalPosition: SnackbarHorizontalPosition = "left";

  let _container: HTMLElement;
  let _notifications: GoabNotification[] = [];

  function handleNotification(event: CustomEvent<GoabNotification>) {
    _notifications = [..._notifications, event.detail]
  }

  onMount(() => {
    window.document.body.addEventListener("goa:temp-notification", handleNotification);

    return () => {
      window.document.body.removeEventListener("goa:temp-notification", handleNotification);
    };
  });
</script>

<div
  bind:this={_container}
  class="notification-container"
  class:horizontal-left={horizontalPosition === "left"}
  class:horizontal-right={horizontalPosition === "right"}
  class:horizontal-center={horizontalPosition === "center"}
  class:vertical-bottom={verticalPosition === "bottom"}
  class:vertical-top={verticalPosition === "top"}
>
  {#each _notifications as notification (notification.message)}
    <goa-temp-notification
      message={notification.message}
      type={notification.type}
      duration={notification.duration}
      action-text={notification.actionText}
      on:action={notification.action}
    />
  {/each}
</div>

<style>
  .notification-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
