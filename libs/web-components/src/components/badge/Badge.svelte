<svelte:options tag="goa-badge" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";
  // import { BadgeType, WCBoolean, WC_FALSE } from "@abgov/shared/common";

  export let type:
    | "success"
    | "warning"
    | "information"
    | "emergency"
    | "inactive"
    | "dark"
    | "midtone"
    | "light";

  // optional
  export let testid: string = "";
  export let icon: string = "false";

  // required
  // export let type: BadgeType;

  // optional
  export let content: string = "";
  // export let icon: WCBoolean = WC_FALSE;

  $: showIcon = toBoolean(icon);

  $: iconType = {
    success: "checkmark-circle",
    warning: "alert-circle",
    information: "information-circle",
    emergency: "warning",
    inactive: "information-circle",
    dark: "information-circle",
    midtone: "information-circle",
    light: "information-circle",
  }[type];
</script>

<!-- HTML -->
<div
  data-testid={testid}
  data-type="goa-badge"
  class="goa-badge badge-{type}"
  class:icon-only={showIcon && !content}
>
  {#if showIcon}
    <goa-icon type={iconType} size="small" />
  {:else}
    <div style="height: 1.2rem; margin-left:-0.25rem;"></div>
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
    font-family: var(--font-family);
  }

  .goa-badge {
    display: inline-flex;
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
    background-color: var(--color-gray-100);
    color: var(--color-status-info);
  }

  .goa-badge.badge-success {
    background-color: var(--goa-color-status-success);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-warning {
    background-color: var(--goa-color-status-warning);
    color: var(--goa-color-text);
  }

  .goa-badge.badge-emergency {
    background-color: var(--goa-color-status-emergency);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-dark {
    background-color: var(--color-black);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-midtone {
    background-color: var(--color-gray-600);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-light {
    background-color: var(--color-white);
    color: var(--goa-color-text);
  }

  .goa-badge.badge-inactive {
    background-color: var(--color-white);
    color: var(--goa-color-text);
  }
</style>
