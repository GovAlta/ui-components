<svelte:options tag="goa-callout" />

<!-- Script -->
<script lang="ts">
  // import type { CalloutType } from "@abgov/shared/common";
  export let type: "emergency" | "caution" | "information" | "event" | "success";

  // export let type: CalloutType = "";
  export let title: string;

  $: iconType =
    type === "emergency"
      ? "warning"
      : type === "caution"
      ? "alert-circle"
      : type === "information"
      ? "information-circle"
      : type === "success"
      ? "checkmark-circle"
      : type === "event"
      ? "calendar"
      : "";
</script>

<!-- HTML -->
<div class="notification">
  <span class="icon {type}">
    <goa-icon type={iconType} inverted />
  </span>
  <span class="content">
    <h2>{title}</h2>
    <slot />
  </span>
</div>

<!-- Style -->
<style>
  .notification {
    display: flex;
    align-items: stretch;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1.75rem;
  }

  h2 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-regular);
    margin-top: 0;
  }

  .emergency {
    background-color: var(--goa-color-status-emergency);
    color: var(--color-white);
  }
  .caution {
    background-color: var(--goa-color-status-warning);
  }
  .information {
    background-color: var(--goa-color-status-info);
    color: var(--color-white);
  }
  .event {
    background-color: var(--goa-color-status-info);
    color: var(--color-white);
  }
  .success {
    background-color: var(--goa-color-status-success);
    color: var(--color-white);
  }

  .icon {
    flex: 0 0 3rem;
    text-align: center;
    padding-top: 1.75rem;
  }
  .content {
    flex: 1 1 auto;
    background-color: var(--color-gray-100);
    padding: 1.75rem;
  }
</style>
