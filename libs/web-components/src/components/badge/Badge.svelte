<svelte:options tag="goa-badge" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";
 
  export let type: "success" | "warning" | "information" | "emergency" | "inactive" | "dark" | "midtone" | "light";
  export let content: string;

  // optional
  export let testId: string = "";
  export let icon: string;

  $: showIcon = toBoolean(icon)

  $: iconType = {
    success: "checkmark-circle",
    warning: "alert-circle",
    information: "information-circle",
    emergency: "warning",
    inactive: "information-circle",
    dark: "information-circle",
    midtone: "information-circle",
    light: "information-circle"
  }[type];

</script>

<!-- HTML -->
<div
  data-testid={testId}
  data-type="goa-badge"
  class="goa-badge badge-{type}"
  class:icon-only={showIcon && !content}
  >
  {#if showIcon}
    <goa-icon type={iconType} size="small" />
  {/if}
  {#if content}
  <div class="goa-badge-content">
    {content}
  </div>
  {/if}
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
  }

  .goa-badge {
    display: inline-flex;
    align-items: center;
    border-radius: 0.25rem;
    padding: 3px 0.5rem; /* is calc(3 / 16 * 1rem) better for scaling? */
    gap: 0.25rem;
  }

  .icon-only {
    padding: 0.25rem;
  }

  .goa-badge-content {
    text-transform: capitalize;
    font-size: var(--fs-sm);
    line-height: var(--lh-sm);
  }

  .goa-badge.badge-information {
    background-color: var(--color-white);
    color: var(--color-blue);
  }

  .goa-badge.badge-success {
    background-color: var(--color-green);
    color: var(--color-white);
  }

  .goa-badge.badge-warning {
    background-color: var(--color-orange);
    color: var(--color-black);
  }

  .goa-badge.badge-emergency {
    background-color: var(--color-red);
    color: var(--color-white);
  }

  .goa-badge.badge-dark {
    background-color: var(--color-gray-900);
    color: var(--color-white);
  }

  .goa-badge.badge-midtone {
    background-color: var(--color-gray-600);
    color: var(--color-white);
  }

  .goa-badge.badge-light {
    background-color: var(--color-white);
    color: var(--color-black);
  }

  .goa-badge.badge-inactive {
    background-color: var(--color-white);
    color: var(--color-black);
  }
</style>
