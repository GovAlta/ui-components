<svelte:options customElement="test-goa-work-side-notification-panel" />

<script lang="ts">
  import WorkSideNotificationPanel from "./WorkSideNotificationPanel.svelte";

  export let heading: string = "Notifications";
  export let activeTab: "unread" | "urgent" | "all" = "unread";
  export let testid: string = "";
</script>

<WorkSideNotificationPanel {heading} {activeTab} {testid}>
  <goa-work-side-notification-item
    title="Item 1"
    description="First notification"
    read-status="unread"
    priority="normal"
    timestamp="2026-01-15T10:00:00Z"
  ></goa-work-side-notification-item>
  <goa-work-side-notification-item
    title="Item 2"
    description="Urgent notification"
    read-status="unread"
    priority="urgent"
    timestamp="2026-01-15T09:00:00Z"
  ></goa-work-side-notification-item>
</WorkSideNotificationPanel>
