<svelte:options tag="goa-callout" />

<!-- Script -->
<script lang="ts">
  export let type: "emergency" | "caution" | "information" | "event" | "success";
  export let title: string;

  // optional
  export let testId: string = "";
  
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
<div class="notification" data-testid={testId}>
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
    padding-top: 1.75rem;
  }
  .content {
    flex: 1 1 auto;
    background-color: var(--color-gray-100);
    padding: 1.75rem;
  }
</style>
