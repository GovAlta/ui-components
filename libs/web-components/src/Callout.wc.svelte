<svelte:options tag="goa-callout" />

<!-- Script -->
<script lang="ts">
  export let type: "emergency" | "caution" | "information" | "event" | "success";
  $: iconType =
    type === "emergency"
      ? "warning"
      : type === "caution"
      ? "alert-circle"
      : type === "information"
      ? "information-circle"
      : type === "success"
      ? "checkmark-circle"
      : "calendar";

</script>

<!-- HTML -->
<div class="notification">
  <span class="icon {type}">
    <goa-icon type={iconType} inverted />
  </span>
  <span class="content">
    <slot />
  </span>
</div>

<!-- Style -->
<style>
  .notification {
    display: flex;
    align-items: stretch;
    margin-bottom: 1rem;
    border-radius: 3px;
    overflow: hidden;
  }

  .emergency {
    background-color: var(--color-red);
    color: var(--color-white);
  }
  .caution {
    background-color: var(--color-orange);
  }
  .information {
    background-color: var(--color-blue);
    color: var(--color-white);
  }
  .event {
    background-color: var(--color-blue);
    color: var(--color-white);
  }
  .success {
    background-color: var(--color-green);
    color: var(--color-white);
  }

  .icon {
    flex: 0 0 3rem;
    text-align: center;
    padding-top: 1.5rem;
  }
  .content {
    flex: 1 1 auto;
    background-color: var(--color-gray-100);
    padding: 1.5rem;
  }
</style>
